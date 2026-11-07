# Self-hosted Bend compiler

An independent engineering report explaining a compiler written in Bend, its checked program boundary and shared lowering into a structured backend representation, and the work still done by its C and JavaScript backends. It includes a fresh matched checking comparison with the official TypeScript implementation and separately labeled historical self-compilation evidence.

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

Open http://127.0.0.1:4173. The HTML contains the complete report and comparison table. JavaScript enhances pipeline-stage inspection and checksum copying; it does not fetch or populate the measurement data. Fonts are served locally. There are no analytics or remote runtime dependencies.

## Fresh checking comparison

On 7 November 2026, three fresh serial processes per implementation checked the same retained source closure: **17 Bend modules and 35 foreign JavaScript files**. Host: Apple M1 Max, 10 logical CPUs, 64 GiB RAM, macOS 26.6.2 / Darwin 25.6.0, arm64.

| Implementation | Source-processing median | Observed range | Time / official | Median sampled peak RSS |
|---|---:|---:|---:|---:|
| Official TypeScript | 2.588 s | 2.107–3.307 s | 1.000× | 744.8 MiB |
| Self-hosted native C | 27.707 s | 25.611–33.692 s | 10.705× | 296.2 MiB |

The native artifact took **10.705 times as long on this checking workload**. This is a ratio of the two medians, not an end-to-end compilation or build slowdown. The selected workload and single host are not universal performance proxies.

### Timing and memory boundaries

- Headline wall time sums official load/parse/expand + check and native parse + expand + check. Native eager parser-fuel setup is included. Startup, emission and external C compilation are excluded.
- Template work is differently interleaved, so isolated checker-phase ratios are not equivalent comparisons.
- Peak RSS is sampled every 10 ms across the owned compiler-command process tree, from launch to exit. Official includes Node main process and worker; native includes its process. Both exclude the Bun launcher, guardian and cohort parent. These peaks are not allocation counts or phase-local heaps.
- Whole-command median durations are separately recorded: 3.082 s official and 28.154 s native, including startup and teardown.
- Process order: official/native, native/official, official/native. Filesystem/OS caches were not flushed; no discarded warmups, forced GC, profiler or warm-process reuse.
- Guards: 8,192 MiB each for RSS and physical footprint, 600-second timeout, 10 ms sampling, 1-second termination grace. These are sampled stop guards, not hard allocation quotas.
- Node 23.11.0 uses `--experimental-strip-types --max-old-space-size=6144 --max-semi-space-size=128`; worker old/young/stack limits are 6,144/128/256 MiB. Native uses one compute thread with GPU off. The guardian launcher is Bun 1.4.3.

### Artifact identity and completion

The native compiler is a previously validated, cached diagnostic `-O1` split-LLVM artifact, SHA-256 `b3459184f37d3159f44e9b7f67642ad6c3850dc806ae5f7837f348fc842b3f71`. It was not rebuilt. Its historical build no longer authenticates against current lexer/driver sources. The experiment uses the documented raw artifact interface and does not claim new current-source build qualification.

The official checker source matches the retained kernel, SHA-256 `22b5915cd7cccd23b6aa28849b23a7f1e3549333cdd0954ab48103ddd0777e9e`. The selected closure’s sorted source-tuple digest is `2555918b9caf261ab6a85fad8ef8fb132a87d9c835b77ee3a86cdefaed1dca01`.

All six samples passed the measurement admission conditions. Official runs covered 2,420 definition bodies and 2,954 validation events, with no holes or unchecked bodies. Those are not a freshly counted source-declaration total. Native runs reported `CheckSuccess` for all 17 modules and retained 17 eager-fuel rows of 8,000,000 cells each. No checks were excluded, outputs patched or emitted images claimed. Files and protocol artifacts were hashed outside the measured process, before and after every sample and after the cohort.

## Evidence and reproducibility

- [`public/data/evidence.json`](public/data/evidence.json): schema-version-2 public evidence with actual samples, aggregates, host/runtime configuration, source tuples, hashes, admission results and separate historical validation.
- [`measurement/run-matched.mjs`](measurement/run-matched.mjs): retained cohort protocol.
- [`measurement/official-check.mjs`](measurement/official-check.mjs): official check-only adapter.
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

Keep the authored HTML table and public JSON synchronized from the same fresh, admitted measurements. Preserve operation boundaries, denominators, sample counts and artifact limitations. Do not restore the old backend toggle, historical timing substitutes, experiment-led navigation or slogan heading. The title naturally wraps at a maximum of about 52px desktop and 32–38px mobile.

Files: `public/index.html` (report), `public/styles.css` (quiet Instrument run sheet styling), `public/app.js` (pipeline and copy controls). Product intent is in `PRODUCT.md`; the surface brief is `.impeccable/surfaces/public-index-html.md`; `DESIGN.md` and `.impeccable/design.json` describe the integrated design.

Before publication, inspect the real page at desktop, compact desktop and 390px mobile, including keyboard controls, reduced motion, readable table overflow and the no-JavaScript report. Verify visible numbers against JSON and retain source links. Do not run browser or heavy verification work concurrently with a timing cohort.

## Deploy

Use Node 24 LTS and an isolated, pinned Netlify CLI installation. Authenticate outside this repository, then link only this report project:

```sh
npm exec --yes --package=netlify-cli@24.0.1 -- netlify link --id 1f78c7f8-9721-4827-bc9e-21afc66555c1
npm exec --yes --package=netlify-cli@24.0.1 -- netlify deploy --dir public --no-build
npm exec --yes --package=netlify-cli@24.0.1 -- netlify deploy --dir public --no-build --prod
```

Publish **`public/`**, never the repository root. `netlify.toml` sets the publish directory and browser-security headers. This project does not change or deploy an existing Bend website.

## Typography

Archivo and Fragment Mono are self-hosted, unmodified Fontsource 5.3.0 WOFF2 assets under the SIL Open Font License 1.1:

- [Archivo license](public/assets/fonts/archivo-LICENSE.txt)
- [Fragment Mono license](public/assets/fonts/fragment-mono-LICENSE.txt)

Exact asset hashes and source URLs are in `.impeccable/font-provenance.json`. The pipeline, small icons and favicon are authored HTML/vector geometry; no raster artwork ships.
