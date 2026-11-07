import {createHash} from 'node:crypto';
import {readFileSync, writeFileSync, realpathSync, statSync, copyFileSync, openSync, closeSync, mkdtempSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {pathToFileURL, fileURLToPath} from 'node:url';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
// Artifact-bound reproduction only: never rebuilds or authenticates current compiler sources.
// REPO, NODE and BUN select the retained checkout and the digest-bound runtimes.
const required = name => {if (!process.env[name]) throw Error('Missing ' + name); return realpathSync(process.env[name]);};
const REPO = required('REPO');
const SITE = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = mkdtempSync(join(process.env.OUT_PARENT ?? tmpdir(), 'bend-closure-example-'));
console.log('PRIVATE_OUTPUT ' + OUT);
const assert = (ok, message) => {if (!ok) throw Error(message);};
const hash = file => createHash('sha256').update(readFileSync(file)).digest('hex');
const save = (name, data) => writeFileSync(join(OUT, name), JSON.stringify(data, null, 2) + '\n', {flag: 'wx', mode: 0o600});
const pins = {};
const pin = (file, expected) => {const real = realpathSync(file); const digest = hash(real); assert(!expected || digest === expected, 'Identity drift: ' + real); pins[real] = digest; return real;};
const verify = () => {for (const [file, digest] of Object.entries(pins)) assert(hash(file) === digest, 'Input drift: ' + file);};
const evidence = JSON.parse(readFileSync(join(SITE, 'public/data/evidence.json'), 'utf8'));
const artifacts = {};
for (const role of ['nativeCompiler', 'nativeBuildReceipt', 'nativeAcceptanceReceipt', 'retainedCorpusPlan', 'nativeRuntimeHelper', 'guardianScript', 'guardianSource']) {
  const row = evidence.provenance.artifacts.find(row => row.role === role);
  artifacts[role] = pin(join(REPO, row.path), row.sha256);
}
const NODE = pin(required('NODE'), evidence.provenance.artifacts.find(row => row.role === 'nodeRuntime').sha256);
const BUN = pin(required('BUN'), evidence.provenance.artifacts.find(row => row.role === 'bunRuntime').sha256);
const gateKey = createHash('sha256').update(readFileSync(artifacts.guardianSource)).update(process.platform).update(process.arch).digest('hex').slice(0, 24);
artifacts.guardianExecutable = pin(join(tmpdir(), `bend-heavy-gate-${process.getuid()}`, `supervisor-${gateKey}`), evidence.provenance.artifacts.find(row => row.role === 'guardianExecutable').sha256);
const repository = realpathSync(join(REPO, 'checkpoints/local2039g56-tail-complete-input'));
process.chdir(repository);
const {workloadRows, corpusFor, runtimeManifest, requireNativeRun} = await import(pathToFileURL(artifacts.nativeRuntimeHelper));
const base = pin(join(repository, 'bend2/base.bend'), '21baec76caf1a6cfd4a544340b291f7bb55bf30cc841f9f5f29e3b12a1a4d614');
const corpus = corpusFor(workloadRows(base, 'js'));
for (const row of corpus.files) {
  const reference = evidence.workload.sourceTuples.find(tuple => tuple[0] === row.path);
  assert(reference && reference[1] === row.sha256, 'Frozen input not in retained evidence');
  pin(join(repository, row.path), row.sha256);
}
const provenance = JSON.parse(readFileSync(join(SITE, 'public/examples/provenance.json'), 'utf8'));
const source = pin(join(SITE, 'public/examples/closure.bend'), provenance.source.sha256);
copyFileSync(source, join(OUT, 'closure.bend'));
const root = pin(join(OUT, 'closure.bend'), hash(source));
const manifest = join(OUT, 'runtime.tsv'), exports = join(OUT, 'exports.txt'), output = join(OUT, 'closure.generated.mjs');
writeFileSync(manifest, 'B\t\t' + root + '\n' + runtimeManifest(corpus), {flag: 'wx', mode: 0o600});
writeFileSync(exports, 'compute\n', {flag: 'wx', mode: 0o600});
pin(manifest); pin(exports); pin(fileURLToPath(import.meta.url));
const runtimeVersions = {node: spawnSync(NODE, ['--version'], {encoding: 'utf8'}).stdout.trim(), bun: spawnSync(BUN, ['--version'], {encoding: 'utf8'}).stdout.trim()};
assert(runtimeVersions.node === 'v23.11.0' && runtimeVersions.bun === '1.4.3', 'Runtime version drift');
const command = [BUN, '--smol', artifacts.guardianScript, '--memory-mib', '8192', '--rss-mib', '8192', '--poll-ms', '10', '--timeout-ms', '600000', '--term-grace-ms', '1000', '--', artifacts.nativeCompiler, '+RTS', '--threads', '1', '--gpu', 'off', '--RTS', root, base, manifest, exports, 'compile', output];
const removed = ['SELFHOST_CPU_PROFILE_DIR', 'NODE_OPTIONS', 'HEAVY_GATE_LEASE_TOKEN', 'HEAVY_GATE_LEASE_PATH'];
const env = {...process.env, BEND_NO_TELEMETRY: '1'};
for (const key of removed) delete env[key];
save('preflight.json', {pins, runtimeVersions, corpus, root, source, artifactBound: true, currentSourceAuthentication: false});
save('command.json', {command, cwd: repository, environmentOverrides: {BEND_NO_TELEMETRY: '1'}, environmentRemoved: removed});
verify();
const stdoutPath = join(OUT, 'emit.stdout'), stderrPath = join(OUT, 'emit.stderr');
const stdout = openSync(stdoutPath, 'wx', 0o600), stderr = openSync(stderrPath, 'wx', 0o600);
let run;
try {run = spawnSync(command[0], command.slice(1), {cwd: repository, env, stdio: ['ignore', stdout, stderr]});} finally {closeSync(stdout); closeSync(stderr);}
const outputText = readFileSync(stdoutPath, 'utf8'), errors = readFileSync(stderrPath, 'utf8');
const lines = (text, prefix) => text.split('\n').filter(line => line.startsWith(prefix)).map(line => JSON.parse(line.slice(prefix.length)));
const guardians = lines(errors, 'HEAVY_GATE ');
save('termination.json', {status: run.status, signal: run.signal, error: run.error ? String(run.error) : null, guardians});
assert(run.status === 0 && run.signal === null && guardians.length === 1, 'Emission failed; inspect private logs');
const guardian = guardians[0];
assert(guardian.status === 'PASS' && guardian.reportPhase === 'complete' && guardian.ownedTreeStopped === true && guardian.commandExitCode === 0 && guardian.commandSignal === 0 && guardian.exitCode === 0 && guardian.supervisorExitCode === 0, 'Incomplete guardian');
assert(guardian.memoryLimitBytes === 8192 * 1048576 && guardian.rssLimitBytes === 8192 * 1048576 && guardian.timeoutMs === 600000, 'Guard drift');
const nativeRun = {status: run.status, signal: run.signal, stderr: errors, stdout: outputText, begins: lines(errors, 'NATIVE_BEGIN '), phaseStarts: lines(errors, 'NATIVE_PHASE_START '), phases: lines(errors, 'NATIVE_PHASE '), fuel: lines(errors, 'NATIVE_FUEL '), results: lines(outputText + '\n' + errors, 'NATIVE_RESULT ')};
const emitted = requireNativeRun(nativeRun, {sources: 2, phases: ['parse', 'expand', 'check', 'emit'], output});
verify();
const result = {status: 'PASS', nativeRun, guardian, output: {path: output, sha256: hash(output), bytes: statSync(output).size}, source: {path: root, sha256: hash(root), bytes: statSync(root).size}, pinsUnchanged: true};
save('emission.json', result);
save('postflight.json', {pins, allPinsUnchanged: true});
console.log(JSON.stringify({status: result.status, emitted: result.output, result: emitted.emit}));

// This probe imports the emitted file, not the checked-in public module.
const runtimeProbe = "import {writeFileSync} from 'node:fs';\nconst runtime = process.version;\nconst forbidden = ['process', 'Buffer', 'require', 'Bun', 'eval', 'Function'];\nfor (const name of forbidden) Object.defineProperty(globalThis, name, {configurable: true, get() {throw Error('Forbidden global accessed: ' + name);}});\nconst module = await import('./closure.generated.mjs');\nconst observed = [[2,1,3],[5,3,8],[7,0,7],[0,0,0],[4294967295,1,0]].map(([k,x,expected]) => {\n  const actual = module.default.compute(k,x);\n  if (actual !== expected) throw Error('Unexpected result');\n  return {k,x,expected,actual};\n});\nconst report = {status:'PASS',runtime,moduleExports:Object.keys(module),defaultProperties:Object.keys(module.default),forbiddenGlobals:forbidden,cases:observed,scope:'Node import and compute execution with getters that throw on Node/Bun/dynamic-code globals; not a browser run.'};\nwriteFileSync(new URL('./browser-abi.json', import.meta.url), JSON.stringify(report,null,2)+'\\n', {flag:'wx',mode:0o600});\nconsole.log(JSON.stringify(report));\n";
const probe = join(OUT, "browser-abi.mjs");
writeFileSync(probe, runtimeProbe, {flag:"wx",mode:0o600});
const runtimeCommand = [NODE, probe];
save("runtime-command.json", {command: runtimeCommand, cwd: OUT});
const runtimeRun = spawnSync(NODE, [probe], {cwd:OUT,env,encoding:"utf8",timeout:30000});
save("runtime-termination.json", {status:runtimeRun.status,signal:runtimeRun.signal,stdout:runtimeRun.stdout,stderr:runtimeRun.stderr,error:runtimeRun.error?String(runtimeRun.error):null});
assert(runtimeRun.status === 0 && runtimeRun.signal === null, "Generated runtime probe failed; inspect private logs");
assert(hash(output) === provenance.module.sha256, "Emission differs from the published byte-preserved module");
verify();
console.log("RUNTIME " + readFileSync(join(OUT,"browser-abi.json"),"utf8"));
