# Self-hosted Bend compiler

An independent, infographic-first engineering guide for readers new to Bend: a real program and captured-value diagram, a source-to-target pipeline, indexed storage and scratch reuse, measured checking time/memory, and historical self-compilation. Full contracts, caveats, hashes and protocol remain in native disclosures.

- Website: https://bend-selfhost-lab.netlify.app
- Website source: https://github.com/IlyaGulya/bend-selfhost-lab
- Compiler work: https://github.com/IlyaGulya/bend/tree/selfhost/integration
- Architecture source snapshot: [`f63679c31e3219b9fbd119625d35ec03cb2ad224`](https://github.com/IlyaGulya/bend/commit/f63679c31e3219b9fbd119625d35ec03cb2ad224)

This is not an official Bend release or a compiler download. Self-hosting is the ability to compile the compiler’s own source, not a performance claim. The official compiler already has checked terms and intermediate representations.

## Run locally

No dependency installation or build is required:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory public
```

Open http://127.0.0.1:4173. The HTML contains the complete report, source example, diagrams, phase labels and comparison table. JavaScript enhances stage inspection, checksum copying and an optional precompiled-example run; it does not fetch or populate primary report results. Fonts are served locally. There are no analytics or remote runtime dependencies.

## IR and lowering reference

Both pages use the same **Overview / IR and lowering** navigation. The overview also links directly to the lowering rules and operation catalog.

[`/ir/`](https://bend-selfhost-lab.netlify.app/ir/) is a static reference. It requires no JavaScript or content controls:

- Four `CheckedProgram` fields and all six checked occurrence variants.
- Eleven before/decision/after lowering diagrams: erasure, local values, captures, known and unknown calls, partial calls, over-application, tail calls, fields, patterns and descriptors.
- All nine `Op` constructors, eight `Block` constructors and ten `Atom` constructors.
- All 121 primitive names, grouped by purpose, with input/output shapes, meanings and relevant limits.
- A region diagram shows the shared failure exit and the separate successful return.

Implementation: `public/ir/index.html` and `public/ir/ir.css`. The former click-based explorer and its script were removed. Primary source links use revision `f63679c31e3219b9fbd119625d35ec03cb2ad224`. Diagrams use short notation and symbolic names. They are not compiler dumps.

Use Simplified Technical English on both pages, including descriptions, labels, disclosures and dynamic messages. Keep sentences short and direct. Define technical terms. Use one term for one concept. See the [ASD-STE100 writing rules](https://www.asd-ste100.org/assets/files/ASD-STE100_ISSUE9.pdf). The site does not claim formal dictionary certification.

## Real closure example

Below the literal title and short definition, [`public/examples/closure.bend`](public/examples/closure.bend) sits beside a capture/addition diagram: `adder(k)` returns a function remembering `k`, and `compute(k, x)` calls it once. “Run emitted JavaScript” dynamically imports the unchanged [`closure.generated.mjs`](public/examples/closure.generated.mjs), then calls its real synchronous `default.compute(5, 3)` export. Both arguments and the returned U32 use ordinary JavaScript numbers; there is no adapter or replacement arithmetic.

- Initial state: explicitly not run in this browser, with a labelled expected result of `8`. The control is disabled until enhancement is ready.
- Loading: the button is disabled and the polite status region names the module load and exact arguments. Keyboard activation restores focus if disabling the button left focus on the document body; it does not replace another focused control.
- Success: the actual returned value is shown beside `compute(5, 3)`.
- Failure: separate load/call messages explain reloading and preserve the download links. No fabricated fallback result.
- Without JavaScript: source, expected result, exact emitted excerpt, all report data, native disclosures and downloads remain usable.

The example executor observed Node results `(2, 1) → 3`, `(5, 3) → 8`, `(7, 0) → 7`, `(0, 0) → 0` and U32 wraparound `(4294967295, 1) → 0`; the same five cases were then verified in Chromium. These are verification results, not pre-populated visitor output. The UI deliberately runs only the fixed `(5, 3)` case, so asynchronous loading cannot associate a result with changed inputs.

Source: **130 bytes**, SHA-256 `1d0332a17a014d9f59137e5e67f6849423bd760510b005d8749eebb04681849e`. Emitted module: **384,999 bytes**, SHA-256 `3c99c414483ed5fe82f1f8006655d6ee07f1fd9c0b9ecea35e00f856f2c5b566`. The module includes Base/runtime code, including unused I/O bodies; the compute path does not invoke Node/Bun APIs. See [`public/examples/provenance.json`](public/examples/provenance.json) for the emission and execution record.

The unchanged generated module includes Bend code under Apache-2.0. Its [runtime license](public/examples/BEND-LICENSE.txt) and [attribution notice](public/examples/NOTICE.txt) ship alongside it.

This is precompiled output from the cached native compiler, not a browser compiler, a new compiler build qualification or a timing measurement. Its tiny input is different from the 17-module benchmark below. The explanatory closure flow is lexical semantics, not an IR dump or proof of heap allocation. The ownership diagram likewise describes pool/handle/slice and scratch lifetimes, not a heap profile or a promise that rewind reduces RSS.

## Fresh checking comparison

On 7 November 2026, three fresh serial processes per implementation checked the same retained source closure: **17 Bend modules and 35 foreign JavaScript files**. Host: Apple M1 Max, 10 logical CPUs, 64 GiB RAM, macOS 26.6.2 / Darwin 25.6.0, arm64.

| Implementation | Source-processing median | Observed range | Time / official | Median sampled peak RSS |
|---|---:|---:|---:|---:|
| Official TypeScript | 2.588 s | 2.107–3.307 s | 1.000× | 744.8 MiB |
| Self-hosted native C | 27.707 s | 25.611–33.692 s | 10.705× | 296.2 MiB |

The native artifact took **10.705 times as long on this checking workload**. This is a ratio of the two medians, not an end-to-end compilation or build slowdown. The selected workload and single host are not universal performance proxies.

The native runs processed 1,690,863 bytes of Bend source and 78,415 bytes of foreign JavaScript. A separate [retained-source structural audit](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/checkpoints/local2039g56-summary.json) records interfaces with up to 50 arguments and a complete 66,793-byte resume dispatcher, preserving namespaces and foreign alternatives without stubbed bodies/dependencies or AST replay. These source-shape facts explain “compiler-shaped,” not CPU representativeness: CPU-coverage analysis was inconclusive, and this is not an accepted universal performance proxy. The report keeps this detail in a native disclosure rather than conflating it with the tiny closure demo.

### Timing and memory boundaries

- Headline wall time sums official load/parse/expand + check and native parse + expand + check. Native eager parser-fuel setup is included. Startup, emission and external C compilation are excluded.
- Template work is differently interleaved, so isolated checker-phase ratios are not equivalent comparisons.
- Peak RSS is sampled every 10 ms across the owned compiler-command process tree, from launch to exit. Official includes Node main process and worker; native includes its process. Both exclude the Bun launcher, guardian and cohort parent. These peaks are not allocation counts or phase-local heaps.
- Whole-command median durations are separately recorded: 3.082 s official and 28.154 s native, including startup and teardown.
- Process order: official/native, native/official, official/native. Filesystem/OS caches were not flushed; no discarded warmups, forced GC, profiler or warm-process reuse.
- Guards: 8,192 MiB each for RSS and physical footprint, 600-second timeout, 10 ms sampling, 1-second termination grace. These are sampled stop guards, not hard allocation quotas.
- Node 23.11.0 uses `--experimental-strip-types --max-old-space-size=6144 --max-semi-space-size=128`; worker old/young/stack limits are 6,144/128/256 MiB. Native uses one compute thread with GPU off. The guardian launcher is Bun 1.4.3.

### Native phase-cost view

The proportional ribbon uses **one actual native run, sample 3**, whose total is the middle observed total: **27.706625 s**. Parse is 6.198936 s (22.37%), expansion 1.834936 s (6.62%), and checking 19.672753 s (71.00%). Widths use the unrounded shares; visible labels are rounded. This is not a sum of per-phase medians.

Parser-fuel setup is **1.318933 s inside parse** (4.76% of the total), not a fourth segment. The 136,000,000 fuel cells over 17 modules and 1,975,761 checking chunk advances are workload/protocol counts, not machine instructions or evidence of causality. The chart locates recorded native cost; it does not explain the entire 10.705× gap, predict optimization savings or support official/native checker-only ratios.

### Artifact identity and completion

The native compiler is a previously validated, cached diagnostic `-O1` split-LLVM artifact, SHA-256 `b3459184f37d3159f44e9b7f67642ad6c3850dc806ae5f7837f348fc842b3f71`. It was not rebuilt. Its historical build no longer authenticates against current lexer/driver sources. The experiment uses the documented raw artifact interface and does not claim new current-source build qualification.

The official checker source matches the retained kernel, SHA-256 `22b5915cd7cccd23b6aa28849b23a7f1e3549333cdd0954ab48103ddd0777e9e`. The selected closure’s sorted source-tuple digest is `2555918b9caf261ab6a85fad8ef8fb132a87d9c835b77ee3a86cdefaed1dca01`.

All six samples passed the measurement admission conditions. Official runs covered 2,420 definition bodies and 2,954 validation events, with no holes or unchecked bodies. Those are not a freshly counted source-declaration total. Native runs reported `CheckSuccess` for all 17 modules and retained 17 eager-fuel rows of 8,000,000 cells each. No checks were excluded, outputs patched or emitted images claimed. Files and protocol artifacts were hashed outside the measured process, before and after every sample and after the cohort.

## Evidence and reproducibility

- [`public/data/evidence.json`](public/data/evidence.json): schema-version-2 public evidence with actual samples, aggregates, host/runtime configuration, source tuples, hashes, admission results and separate historical validation.
- [`measurement/run-matched.mjs`](measurement/run-matched.mjs): retained cohort protocol.
- [`measurement/official-check.mjs`](measurement/official-check.mjs): official check-only adapter.
- [`measurement/compile-example.mjs`](measurement/compile-example.mjs): separately exercised end-to-end example emission and five-case runtime check; reproduces the exact published module without rebuilding the compiler.
- Architecture sources: [checked program](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/bend2/selfhost/checked_frontend.bend), [shared lowering](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/bend2/selfhost/backend_lower.bend), [backend IR](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/bend2/selfhost/backend_ir.bend), [C](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/bend2/selfhost/c_backend.bend) and [JavaScript](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/bend2/selfhost/js_backend.bend).

The recorded invocation uses environment-supplied paths rather than private machine paths:

```sh
REPO="$COMPILER_CHECKOUT" NODE="$NODE_23_11_0" BUN="$BUN_1_4_3" \
  "$BUN_1_4_3" measurement/run-matched.mjs
```

This requires the retained source corpus, exact cached native compiler and receipts, matching runtimes, and an existing guardian helper. It is not a clean-checkout compiler build recipe. Raw requests/reports/logs remain private; public JSON contains normalized provenance and per-sample evidence. Do not publish the repository root or private benchmark outputs.

## Historical validation

A native seed emitted a JavaScript compiler that emitted another compiler from the same source. The two self-produced JavaScript images were byte-identical: 31,758,507 bytes, SHA-256 `85aff9e534c18b4a1d6acac5f3237571dabc58f2c1a75a7ea2040f1c477ab60e`. The behavioral suite had **95 distinct fixtures across three compiler images: 285 executions, not 285 different tests**.

This historical evidence belongs to its recorded artifact, not automatically to current source or the fresh check-only run. It is not pure-C self-hosting, complete target parity or a semantic-preservation proof. Primary receipt: [`root2039g24r12_native_fixedpoint.json`](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/evals/receipts/root2039g24r12_native_fixedpoint.json).

## Maintaining the report

Keep the HTML comparison and public JSON synchronized. Preserve measurement boundaries, sample counts, hashes and limitations. Use static diagrams for the IR reference. Do not hide primary operation explanations behind clicks. Do not add slogans or experiment-history navigation. Titles are 28px desktop and 24px mobile. Chapter headings are 22px and 21px. Body text is 16px/24px.

Files: `public/index.html` (overview), `public/styles.css` (shared styles), `public/app.js` (overview actions), `public/ir/` (static operation and lowering reference), `public/examples/` (unchanged source, generated module and provenance). Product intent is in `PRODUCT.md`. Visual constraints are in `DESIGN.md` and `.impeccable/surfaces/`.

Before publication, inspect the real page at desktop, compact desktop and narrow mobile widths, including keyboard controls, reduced motion, table legibility, disclosure expansion and the no-JavaScript report. Exercise genuine module-load success, loading and failure states; initial text must never claim execution. Verify visible values against JSON and source/excerpts against the actual artifacts. No eval, dynamic Function constructor or CSP relaxation is needed.

## Deploy

Use Node 24 LTS and an isolated, pinned Netlify CLI installation. Authenticate outside this repository, then link only this report project:

```sh
npm exec --yes --package=netlify-cli@24.0.1 -- netlify link --id 1f78c7f8-9721-4827-bc9e-21afc66555c1
npm exec --yes --package=netlify-cli@24.0.1 -- netlify deploy --dir public --no-build
npm exec --yes --package=netlify-cli@24.0.1 -- netlify deploy --dir public --no-build --prod
```

Publish **`public/`**, never the repository root. `netlify.toml` sets the publish directory and browser-security headers. Deploy only this linked report project, not an official Bend website.

## Typography

Archivo and Fragment Mono are self-hosted, unmodified Fontsource 5.3.0 WOFF2 assets under the SIL Open Font License 1.1:

- [Archivo license](public/assets/fonts/archivo-LICENSE.txt)
- [Fragment Mono license](public/assets/fonts/fragment-mono-LICENSE.txt)

Exact asset hashes and source URLs are in `.impeccable/font-provenance.json`. The pipeline, small icons and favicon are authored HTML/vector geometry; no raster artwork ships.
