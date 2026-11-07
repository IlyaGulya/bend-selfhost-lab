import {readFileSync, realpathSync, writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {Worker, isMainThread, workerData} from 'node:worker_threads';

// Artifact and source hashes are validated by the cohort parent, outside the
// guarded compiler process. In particular, never read the Node image into RSS.
if (isMainThread) {
  const worker = new Worker(new URL(import.meta.url), {
    workerData: {request: process.argv[2], report: process.argv[3]},
    resourceLimits: {stackSizeMb: 256, maxOldGenerationSizeMb: 6144, maxYoungGenerationSizeMb: 128},
  });
  await new Promise((resolve, reject) => {
    worker.once('error', reject);
    worker.once('exit', code => code ? reject(Error('Worker exit ' + code)) : resolve());
  });
} else {
  const request = JSON.parse(readFileSync(workerData.request, 'utf8'));
  const phases = [];
  async function phase(name, operation) {
    const start = performance.now(), cpu = process.cpuUsage();
    const result = await operation();
    const usage = process.cpuUsage(cpu);
    phases.push({phase: name, elapsedMs: performance.now() - start,
      userCpuMs: usage.user / 1000, systemCpuMs: usage.system / 1000,
      memoryEnd: process.memoryUsage()});
    return result;
  }
  const start = performance.now();
  const kernel = await phase('startup', () => import(pathToFileURL(request.kernel)));
  const book = kernel.book_nil(), observed = new Set();
  class Inputs extends Map {
    set(path, namespace) {
      if (namespace === null) observed.add(realpathSync(path));
      return super.set(path, namespace);
    }
  }
  await phase('load-parse-expand', () => kernel.book_load(book, request.root, '', new Inputs()));
  for (const declaration of Object.values(book.tlds)) {
    if (declaration.$ === 'Def') {
      for (const path of declaration.i ?? []) {
        if (path.endsWith('.js')) observed.add(realpathSync(path));
      }
    }
  }
  const expected = Object.keys(request.inputs);
  if (observed.size !== expected.length || expected.some(path => !observed.has(path))) {
    throw Error('Official input closure differs from the authenticated manifest');
  }
  // No done/skip argument: validate every event, including template-generated work.
  await phase('check', () => kernel.book_valid(book));
  const definitions = Object.values(book.tlds).filter(d => d.$ === 'Def' && d.v !== null);
  if (book.hols !== 0 || definitions.some(d => d.e === undefined)) {
    throw Error('Unfilled hole or unchecked official definition body');
  }
  const report = {
    status: 'PASS', mode: 'official-ts', stopAfter: 'check', inputFiles: observed.size,
    observedInputs: [...observed].sort(), checkedDefinitions: definitions.length,
    validationEvents: book.order.length, holes: book.hols, uncheckedBodies: 0,
    pipelineElapsedMs: performance.now() - start, phases,
    runtime: {versions: process.versions, execArgv: process.execArgv},
    checksExcluded: 0, outputPatches: 0,
  };
  writeFileSync(workerData.report, JSON.stringify(report, null, 2) + '\n', {flag: 'wx', mode: 0o600});
  console.log(JSON.stringify(report));
}
