import {createHash} from 'node:crypto';
import {closeSync, copyFileSync, existsSync, mkdirSync, mkdtempSync, openSync, readFileSync, readSync, realpathSync, statSync, writeFileSync} from 'node:fs';
import {dirname, join, relative, resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {spawn, execFileSync} from 'node:child_process';
import os from 'node:os';

// Run with REPO, NODE and BUN pointing at the retained compiler checkout and
// digest-bound runtimes. OUT_PARENT optionally selects a private temporary root.
// This is an artifact-bound check-only experiment, not current-source acceptance.
const required = name => {
  if (!process.env[name]) throw Error('Missing environment variable ' + name);
  return realpathSync(process.env[name]);
};
const REPO = required('REPO'), NODE = required('NODE'), BUN = required('BUN');
const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = mkdtempSync(join(process.env.OUT_PARENT ?? '/private/tmp', 'bend-matched-check-'));
console.log('PRIVATE_OUTPUT ' + OUT);
const assert = (condition, message) => { if (!condition) throw Error(message); };
const save = (name, value) => writeFileSync(join(OUT, name), JSON.stringify(value, null, 2) + '\n', {flag: 'wx', mode: 0o600});
function hash(path) {
  const descriptor = openSync(path, 'r'), buffer = Buffer.allocUnsafe(65536), digest = createHash('sha256');
  try {
    for (;;) {
      const length = readSync(descriptor, buffer, 0, buffer.length, null);
      if (!length) break;
      digest.update(buffer.subarray(0, length));
    }
    return digest.digest('hex');
  } finally { closeSync(descriptor); }
}
const hashText = text => createHash('sha256').update(text).digest('hex');
const pins = {};
function pin(path, expected) {
  path = realpathSync(path);
  const actual = hash(path);
  assert(!expected || actual === expected, 'Identity drift: ' + path);
  pins[path] = actual;
  return path;
}
function verify() {
  for (const [path, expected] of Object.entries(pins)) assert(hash(path) === expected, 'Input drift: ' + path);
}
function preserve(path, destination) {
  const target = join(OUT, destination);
  mkdirSync(dirname(target), {recursive: true, mode: 0o700});
  copyFileSync(path, target);
  assert(hash(target) === hash(path), 'Private preservation mismatch');
}
const planPath = pin(join(REPO, 'checkpoints/local2039g56-corpus.json'), '9390ec6d6d352293009a6a161bcf9daaef770eea593174835047de6bf43e8fdb');
const native = pin(join(REPO, 'checkpoints/local2039g24r12/native'), 'b3459184f37d3159f44e9b7f67642ad6c3850dc806ae5f7837f348fc842b3f71');
const buildReceipt = pin(join(REPO, 'checkpoints/local2039g24r12/root-native-build.json'), '3b41f94b3d60d5a9177452c11b525b371e1c8b17584f388dff61edc071b5886b');
const acceptanceReceipt = pin(join(REPO, 'evals/receipts/root2039g24r12_native_fixedpoint.json'));
pin(NODE, 'ead5889f15f4e17b37f941c7d9e92b624396786bd74d8155ef470f6381f032c5');
pin(BUN);
const plan = JSON.parse(readFileSync(planPath, 'utf8'));
const repository = realpathSync(join(REPO, 'checkpoints', plan.sourceUniverse.directory));
for (const row of plan.sourceUniverse.files) pin(resolve(repository, row.path), row.sha256);
const kernel = pin(join(repository, 'bend2/bend.ts'), '22b5915cd7cccd23b6aa28849b23a7f1e3549333cdd0954ab48103ddd0777e9e');
const currentKernel = pin(join(REPO, 'bend2/bend.ts'), pins[kernel]);
const root = realpathSync(join(REPO, 'checkpoints', plan.candidates[0].root));
const base = realpathSync(join(repository, 'bend2/base.bend'));
const runtimeHelper = pin(join(REPO, 'evals/native_seed_runtime.mjs'));
const gate = pin(join(REPO, 'evals/heavy_gate.ts'));
const gateSource = pin(join(REPO, 'evals/heavy_gate_native.c'));
const adapter = pin(join(HERE, 'official-check.mjs'));
const protocol = pin(fileURLToPath(import.meta.url));
// Refuse to trigger even a guardian-helper build during the experiment.
const gateKey = createHash('sha256').update(readFileSync(gateSource)).update(process.platform).update(process.arch).digest('hex').slice(0, 24);
const gateBinary = pin(join(os.tmpdir(), `bend-heavy-gate-${process.getuid()}`, `supervisor-${gateKey}`));
process.chdir(repository);
const {workloadRows, corpusFor, runtimeManifest, ABI} = await import(pathToFileURL(runtimeHelper));
const corpus = corpusFor(workloadRows(root, 'js'));
assert(corpus.files.length === 52 && corpus.files.filter(row => !row.external).length === 17 && corpus.files.filter(row => row.external).length === 35, 'Unexpected source closure');
const inputs = Object.fromEntries(corpus.files.map(row => [realpathSync(resolve(repository, row.path)), row.sha256]));
for (const [path, expected] of Object.entries(inputs)) pin(path, expected);
const sourceTuples = corpus.files.map(row => [row.path, row.sha256, row.namespace ?? null, row.external === true]).sort((a, b) => a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0);
const sourceTupleSha256 = hashText(JSON.stringify(sourceTuples));
const limits = {memoryMiB: 8192, rssMiB: 8192, pollMs: 10, timeoutMs: 600000, termGraceMs: 1000};
const nodeOptions = ['--experimental-strip-types', '--max-old-space-size=6144', '--max-semi-space-size=128'];
const workerLimits = {stackSizeMb: 256, maxOldGenerationSizeMb: 6144, maxYoungGenerationSizeMb: 128};
const request = {schemaVersion: 1, repository, root, kernel, inputs, limits, stopAfter: 'check'};
save('corpus.json', corpus);
save('request.json', request);
writeFileSync(join(OUT, 'runtime.tsv'), runtimeManifest(corpus), {flag: 'wx', mode: 0o600});
writeFileSync(join(OUT, 'exports.txt'), ABI.join('\n') + '\n', {flag: 'wx', mode: 0o600});
for (const name of ['corpus.json', 'request.json', 'runtime.tsv', 'exports.txt']) pin(join(OUT, name));
for (const row of corpus.files) preserve(resolve(repository, row.path), 'source/' + row.path);
preserve(kernel, 'source/bend2/bend.ts');
for (const path of [runtimeHelper, gate, gateSource, adapter, protocol, planPath, buildReceipt, acceptanceReceipt]) {
  preserve(path, 'protocol/' + (path.startsWith(REPO + '/') ? relative(REPO, path) : 'measurement/' + relative(HERE, path)));
}
const exec = (program, args) => execFileSync(program, args, {encoding: 'utf8'}).trim();
const nodeVersion = exec(NODE, ['--version']), bunVersion = exec(BUN, ['--version']);
assert(nodeVersion === 'v23.11.0' && bunVersion === '1.4.3', 'Runtime version drift');
const sysctl = name => exec('/usr/sbin/sysctl', ['-n', name]);
const host = {platform: process.platform, architecture: process.arch, osRelease: os.release(), osBuild: sysctl('kern.osversion'),
  macOSVersion: exec('/usr/bin/sw_vers', ['-productVersion']), hardwareModel: sysctl('hw.model'),
  cpu: sysctl('machdep.cpu.brand_string'), logicalCpus: Number(sysctl('hw.ncpu')), memoryBytes: Number(sysctl('hw.memsize'))};
const environment = {...process.env, BEND_NO_TELEMETRY: '1'};
for (const key of ['SELFHOST_CPU_PROFILE_DIR', 'NODE_OPTIONS', 'HEAVY_GATE_LEASE_TOKEN', 'HEAVY_GATE_LEASE_PATH']) delete environment[key];
const gateOptions = ['--memory-mib', '8192', '--rss-mib', '8192', '--poll-ms', '10', '--timeout-ms', '600000', '--term-grace-ms', '1000'];
const order = ['official', 'selfhostNative', 'selfhostNative', 'official', 'official', 'selfhostNative'];
const startedAt = new Date().toISOString();
save('preflight.json', {startedAt, host, nodeVersion, bunVersion, pins, sourceTupleSha256, sourceTuples, order, limits, nodeOptions, workerLimits});
const lines = (text, prefix) => text.split('\n').filter(line => line.startsWith(prefix)).map(line => JSON.parse(line.slice(prefix.length)));
const finite = value => typeof value === 'number' && Number.isFinite(value) && value >= 0;
const samples = [], counts = {official: 0, selfhostNative: 0};
for (const role of order) {
  const ordinal = ++counts[role], name = `${role}-${ordinal}`;
  verify();
  const report = join(OUT, name + '.json'), unused = join(OUT, name + '.unused-output');
  const command = role === 'official'
    ? [NODE, ...nodeOptions, adapter, join(OUT, 'request.json'), report]
    : [native, '+RTS', '--threads', '1', '--gpu', 'off', '--RTS', root, base, join(OUT, 'runtime.tsv'), join(OUT, 'exports.txt'), 'check', unused];
  const launch = [BUN, '--smol', gate, ...gateOptions, '--', ...command];
  save(name + '.command.json', {command: launch, cwd: repository, startedAt: new Date().toISOString(), environmentOverrides: {BEND_NO_TELEMETRY: '1'}, environmentRemoved: ['SELFHOST_CPU_PROFILE_DIR', 'NODE_OPTIONS', 'HEAVY_GATE_LEASE_TOKEN', 'HEAVY_GATE_LEASE_PATH']});
  const stdoutPath = join(OUT, name + '.stdout'), stderrPath = join(OUT, name + '.stderr');
  const stdout = openSync(stdoutPath, 'wx', 0o600), stderr = openSync(stderrPath, 'wx', 0o600);
  const sampleStartedAt = new Date().toISOString(), launchStart = performance.now();
  let termination;
  try {
    termination = await new Promise((resolveRun, reject) => {
      const child = spawn(launch[0], launch.slice(1), {cwd: repository, env: environment, stdio: ['ignore', stdout, stderr]});
      child.once('error', reject);
      child.once('close', (code, signal) => resolveRun({code, signal}));
    });
  } finally { closeSync(stdout); closeSync(stderr); }
  const fullLauncherElapsedMs = performance.now() - launchStart;
  const output = readFileSync(stdoutPath, 'utf8'), errors = readFileSync(stderrPath, 'utf8');
  const gates = lines(errors, 'HEAVY_GATE ');
  assert(termination.code === 0 && termination.signal === null && gates.length === 1, 'Command failed: ' + name);
  const guardian = gates[0];
  assert(guardian.status === 'PASS' && guardian.reportPhase === 'complete' && guardian.ownedTreeStopped === true && guardian.commandExitCode === 0 && guardian.commandSignal === 0 && guardian.exitCode === 0 && guardian.supervisorExitCode === 0, 'Incomplete guardian: ' + name);
  assert(guardian.memoryLimitBytes === 8192 * 1048576 && guardian.rssLimitBytes === 8192 * 1048576 && guardian.timeoutMs === 600000, 'Guardian policy drift');
  let phases, coverage, nativeEvidence;
  if (role === 'official') {
    const observed = JSON.parse(readFileSync(report, 'utf8'));
    assert(observed.status === 'PASS' && observed.stopAfter === 'check' && observed.inputFiles === 52 && observed.holes === 0 && observed.uncheckedBodies === 0 && observed.checksExcluded === 0 && observed.outputPatches === 0, 'Official coverage failed');
    assert(JSON.stringify(observed.observedInputs) === JSON.stringify(Object.keys(inputs).sort()), 'Official input equality failed');
    assert(JSON.stringify(observed.phases.map(row => row.phase)) === JSON.stringify(['startup', 'load-parse-expand', 'check']), 'Official phase order failed');
    phases = observed.phases;
    coverage = {inputFiles: observed.inputFiles, checkedDefinitions: observed.checkedDefinitions, validationEvents: observed.validationEvents, holes: 0, uncheckedBodies: 0, checksExcluded: 0, outputPatches: 0};
    coverage.runtime = observed.runtime;
  } else {
    const begins = lines(errors, 'NATIVE_BEGIN '), starts = lines(errors, 'NATIVE_PHASE_START '), fuel = lines(errors, 'NATIVE_FUEL ');
    phases = lines(errors, 'NATIVE_PHASE ');
    const results = lines(output + '\n' + errors, 'NATIVE_RESULT ');
    assert(begins.length === 1 && begins[0].computeThreads === 1 && begins[0].phaseTraceVersion === 3, 'Native runtime evidence failed');
    const expectedPhases = JSON.stringify(['parse', 'expand', 'check']);
    assert(JSON.stringify(starts.map(row => row.phase)) === expectedPhases && JSON.stringify(phases.map(row => row.phase)) === expectedPhases, 'Native phase order failed');
    const events = errors.split('\n').filter(line => line.startsWith('NATIVE_PHASE_START ') || line.startsWith('NATIVE_PHASE ')).map(line => [line.startsWith('NATIVE_PHASE_START ') ? 'start' : 'complete', JSON.parse(line.slice(line.indexOf(' ') + 1)).phase]);
    assert(JSON.stringify(events) === JSON.stringify(['parse', 'expand', 'check'].flatMap(phase => [['start', phase], ['complete', phase]])), 'Native phase boundaries overlap');
    assert(fuel.length === 17 && fuel.every(row => row.cells === 8000000 && finite(row.elapsedMs) && finite(row.processPeakRssBeforeBytes) && finite(row.processPeakRssAfterBytes)), 'Native eager fuel coverage failed');
    assert(results.length === 1 && results[0].result === 'CheckSuccess' && results[0].modules === 17, 'Native typed check failed');
    assert(!existsSync(unused), 'Unexpected check-only emission');
    nativeEvidence = {begin: begins[0], phaseStarts: starts, fuel, result: results[0]};
    coverage = {inputFiles: 52, modules: 17, result: 'CheckSuccess', eagerFuelRows: fuel.length, eagerFuelCellsPerModule: 8000000, checksExcluded: 0, outputPatches: 0, emittedOutput: false};
    save(name + '.json', {status: 'PASS', phases, ...nativeEvidence, guardian, coverage});
  }
  assert(phases.every(row => finite(row.elapsedMs) && finite(row.userCpuMs) && finite(row.systemCpuMs)), 'Malformed phase timings');
  verify();
  const sourceProcessingElapsedMs = phases.filter(row => row.phase !== 'startup').reduce((sum, row) => sum + row.elapsedMs, 0);
  const {command: privateCommand, reportPath: privateReportPath, ...publicGuardian} = guardian;
  const sample = {role, ordinal, sequence: samples.length + 1, startedAt: sampleStartedAt, completedAt: new Date().toISOString(), sourceProcessingElapsedMs,
    fullCommandElapsedMs: guardian.elapsedMs, fullLauncherElapsedMs, phases, guardian: publicGuardian, coverage,
    ...(nativeEvidence ? {nativeEvidence} : {}),
    rawEvidence: {stdoutSha256: hash(stdoutPath), stderrSha256: hash(stderrPath), reportSha256: hash(report), commandSha256: hash(join(OUT, name + '.command.json'))}};
  samples.push(sample);
  save(name + '.admitted.json', sample);
  console.log('ADMITTED ' + JSON.stringify({role, ordinal, sourceProcessingElapsedMs, peakRssBytes: guardian.peakRssBytes, fullCommandElapsedMs: guardian.elapsedMs}));
}
verify();
const stats = values => {
  const sorted = [...values].sort((a, b) => a - b);
  return {n: sorted.length, median: sorted[Math.floor(sorted.length / 2)], min: sorted[0], max: sorted.at(-1)};
};
const summary = Object.fromEntries(['official', 'selfhostNative'].map(role => {
  const rows = samples.filter(sample => sample.role === role);
  return [role, {sourceProcessingElapsedMs: stats(rows.map(row => row.sourceProcessingElapsedMs)),
    sampledPeakRssBytes: stats(rows.map(row => row.guardian.peakRssBytes)), sampledPeakFootprintBytes: stats(rows.map(row => row.guardian.peakFootprintBytes)),
    fullCommandElapsedMs: stats(rows.map(row => row.fullCommandElapsedMs))}];
}));
summary.nativeToOfficialTimeRatio = summary.selfhostNative.sourceProcessingElapsedMs.median / summary.official.sourceProcessingElapsedMs.median;
const publicPins = [
  ['officialKernel', kernel], ['currentOfficialKernel', currentKernel], ['nativeCompiler', native], ['nativeBuildReceipt', buildReceipt],
  ['nativeAcceptanceReceipt', acceptanceReceipt], ['retainedCorpusPlan', planPath], ['nodeRuntime', NODE], ['bunRuntime', BUN],
  ['nativeRuntimeHelper', runtimeHelper], ['guardianScript', gate], ['guardianSource', gateSource], ['guardianExecutable', gateBinary],
  ['officialAdapter', adapter], ['cohortProtocol', protocol],
].map(([role, path]) => ({role, path: path.startsWith(REPO + '/') ? relative(REPO, path) : path.startsWith(HERE + '/') ? 'measurement/' + relative(HERE, path) : role, sha256: pins[path], bytes: statSync(path).size}));
const result = {
  schemaVersion: 2, status: 'PASS', startedAt, completedAt: new Date().toISOString(),
  scope: {operation: 'front-end/check-only', description: 'Parse, template expansion and complete checking of the same retained 52-file source closure; no emission.',
    headline: 'Sum of source-processing phase wall times, excluding startup and process launch.',
    officialPhases: ['load-parse-expand', 'check'], selfhostNativePhases: ['parse', 'expand', 'check'],
    artifactBound: true, freshBuild: false, currentSourceAuthentication: false, emission: false},
  workload: {root: corpus.root, inputFiles: 52, bendModules: 17, foreignJSFiles: 35, sourceUniverseFilesVerified: plan.sourceUniverse.files.length,
    sourceDeclarations: null, sourceDeclarationsNote: 'Not independently counted in this check-only cohort; no historical declaration count is substituted.',
    sourceTupleSha256, sourceTupleEncoding: 'SHA-256 of UTF-8 JSON.stringify(sorted [relativePath, sha256, namespaceOrNull, externalBoolean] tuples); path order is Unicode code-point order.',
    sourceTuples, retainedSourceOriginCheckpoint: 'd1a2fd48', privateManifestSha256: pins[join(OUT, 'corpus.json')], privateRequestSha256: pins[join(OUT, 'request.json')]},
  host, runtime: {node: nodeVersion, bun: bunVersion, nodeOptions, workerLimits, nativeOptions: ['+RTS', '--threads', '1', '--gpu', 'off', '--RTS'], nativeBuild: 'Cached historically validated -O1 split-LLVM artifact; not rebuilt.'},
  limits, methodology: {samplesPerRole: 3, order, serial: true, freshProcesses: true, forcedGC: false, profiling: false,
    inputValidation: 'Every source-universe file, selected input, kernel, runtime, compiler artifact, receipt, manifest and protocol helper rehashed before and after every sample and after the cohort. Bounded 64 KiB hashing occurs only in the unmeasured parent.',
    rssScope: '10 ms guardian sampling of the entire owned compiler-command process tree from launch through exit. Includes Node main and worker for official; native process for selfhostNative. Excludes the Bun launcher, guardian supervisor and cohort parent in both roles.',
    footprintScope: 'Same owned process tree and sampling interval; Darwin physical-footprint ledger, including compressed pages.',
    fullCommandScope: 'Guardian elapsedMs, including process startup, source processing and command teardown. Separate from source-processing phase sums.',
    cpuScope: 'Official CPU is process-wide Node CPU including helper threads; native CPU is RUSAGE_SELF across compute threads. Not equivalent to wall time.',
    ratio: 'Ratio of source-processing medians; no historical timing denominator.',
    guards: 'Sampled stop guards, not hard allocation quotas.'},
  samples, summary, provenance: {artifacts: publicPins, checksExcluded: 0, outputPatches: 0, sourcesPreservedPrivately: true, rawLogsPreservedPrivately: true,
    currentSourceAuthenticationLimitation: 'The historical native build no longer authenticates against current lexer/driver sources. That known wrapper failure was not rerun, patched or bypassed as a qualification claim. Execution uses the explicitly digest-bound raw native CLI.',
    sourceReferences: ['evals/native_seed_runtime.mjs:18-109', 'evals/native_seed_runtime.mjs:190-191', 'evals/native_compiler_experiment.ts:598-633', 'evals/heavy_gate.ts', 'evals/heavy_gate_native.c', 'bend2/bend.ts:3804']},
  reproducibility: {
    prerequisites: 'Retained source corpus, pinned cached compiler and receipts, matching Node/Bun runtimes, and existing guardian helper. No rebuild is performed.',
    cohort: 'REPO="$COMPILER_CHECKOUT" NODE="$NODE_23_11_0" BUN="$BUN_1_4_3" "$BUN_1_4_3" measurement/run-matched.mjs',
    official: '"$BUN" --smol "$REPO/evals/heavy_gate.ts" --memory-mib 8192 --rss-mib 8192 --poll-ms 10 --timeout-ms 600000 --term-grace-ms 1000 -- "$NODE" --experimental-strip-types --max-old-space-size=6144 --max-semi-space-size=128 measurement/official-check.mjs "$OUT/request.json" "$OUT/official-N.json"',
    native: '"$BUN" --smol "$REPO/evals/heavy_gate.ts" --memory-mib 8192 --rss-mib 8192 --poll-ms 10 --timeout-ms 600000 --term-grace-ms 1000 -- "$REPO/checkpoints/local2039g24r12/native" +RTS --threads 1 --gpu off --RTS "$SOURCE/checkpoints/local2039g49-compiler-root.bend" "$SOURCE/bend2/base.bend" "$OUT/runtime.tsv" "$OUT/exports.txt" check "$OUT/native-N.unused-output"',
    environment: {BEND_NO_TELEMETRY: '1', removed: ['SELFHOST_CPU_PROFILE_DIR', 'NODE_OPTIONS', 'HEAVY_GATE_LEASE_TOKEN', 'HEAVY_GATE_LEASE_PATH']},
  },
  limitations: ['Single host and selected frozen compiler-source workload; not a universal performance proxy.', 'Check-only: not end-to-end compilation, code generation, C compilation, fixedpoint or fresh current-source build qualification.', 'Template expansion is interleaved differently; checker-only phase ratios are not comparable.', 'Three fresh processes per role; filesystem and OS caches were not flushed and no warmup samples were discarded.', 'Sampled process-tree peaks are not exact allocation peaks or end-of-phase heap sizes.', 'Fresh measurements do not replace separate historical self-hosting validation.'],
};
const serialized = JSON.stringify(result);
assert(!serialized.includes(REPO) && !serialized.includes(OUT) && !serialized.includes(os.homedir()) && !serialized.includes(os.hostname()), 'Public result contains private identity');
assert(!serialized.includes('/Users/') && !serialized.includes('/private/') && !serialized.includes('/var/folders/'), 'Public result contains private paths');
save('postflight.json', {completedAt: result.completedAt, pins, allPinsUnchanged: true});
save('public-result.json', result);
console.log('RESULT ' + JSON.stringify({path: join(OUT, 'public-result.json'), summary}));
