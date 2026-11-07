# Bend Compiler Lab

An independent, evidence-led report on self-hosting Bend: shared FIR/BIR architecture, historical accepted results, iteration cost, and rejected performance diagnostics.

- Website: https://bend-selfhost-lab.netlify.app
- Compiler work: https://github.com/IlyaGulya/bend/tree/selfhost/integration
- Evidence snapshot: [`f63679c3`](https://github.com/IlyaGulya/bend/commit/f63679c3)

This is not an official Bend release, a compiler download, or a benchmark against the upstream TypeScript compiler.

## Run locally

No dependency installation or build is required:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory public
```

Open http://127.0.0.1:4173. HTML carries the readable report; the small vanilla JavaScript file enhances stage inspection, the native/JS comparison and checksum copying. Fonts are served locally. There are no analytics or remote runtime dependencies.

## Deploy

Use Node 24 LTS and an isolated, pinned Netlify CLI installation. Authenticate outside this repository, then link only the new report project:

```sh
npm exec --yes --package=netlify-cli@24.0.1 -- netlify link --id 1f78c7f8-9721-4827-bc9e-21afc66555c1
npm exec --yes --package=netlify-cli@24.0.1 -- netlify deploy --dir public --no-build
npm exec --yes --package=netlify-cli@24.0.1 -- netlify deploy --dir public --no-build --prod
```

Publish **`public/`**, never the repository root. `netlify.toml` sets the publish directory and browser-security headers. Local Netlify state, review screenshots and direction-workshop material are ignored. This project does not change or deploy an existing Bend website.

## Reading the measurements

`public/data/evidence.json` is a curated public snapshot, not a dump of raw receipts. Its source URLs point to the original versioned evidence.

- **G24 R12:** historical accepted compiler source `5916d410`, compared with G23 `04e0b600` on a frozen G22 source closure. Three same-host pairs per execution runtime. The native executable used diagnostic `-O1`, not the official build default. Durations measure compiler execution, not a fresh C toolchain build. Native median RSS increased; the observed JS RSS ranges overlap. Native stage0 emitted JavaScript stage1/stage2 images: no pure-C self-hosting claim.
- **Original FAIL retained:** all twelve timed commands and runtime gates passed, but the orchestrator's final summary wrapper failed. Corrected aggregation ran offline against authenticated reports without timing reruns; separate parent acceptance did not rewrite the failed receipt.
- **G56 screening corpus:** 52 files means 17 Bend modules plus 35 foreign-JS files, with 2,954 source declarations. Its check-only iteration cost is not full-root qualification. Retained full-source timing cohorts are separate, not paired algorithm comparisons. The original 45-second target failed.
- **R12 full root:** 12,456 checked definitions and 13,050 validated events are a different checkpoint and measure from G56 source-declaration counts. The published JSON keeps the scopes separate.
- **G78:** the large verification-interval CPU reduction is local diagnostic work; overall gates failed. It is not an end-to-end compiler speedup.
- **G79:** two patched-candidate / matched-byte-neutral pairs produced a favorable CPU point but failed the physical-memory gate. Registration bookkeeping is not a count of heap allocations. No new compiler promotion or fixedpoint was earned.

Do not transfer historical fixedpoint bytes, test counts or timings to a later source revision. No formal FIR-to-BIR semantic-preservation proof, GPU/WASM parity, or universal screening-corpus representativeness is claimed.

## Maintaining the snapshot

Keep narrative, visible figures and JSON scopes aligned when updating the report. Cite an immutable compiler commit and primary receipt path for each new result. Preserve rejected statuses, comparison denominators, sample counts, original failures and memory costs; do not turn a local or separate-cohort observation into an accepted algorithm speedup.

Inspect the real page and controls at desktop, compact desktop, the current user viewport and 390-pixel mobile before publishing. Respect reduced motion, keyboard activation, semantic tables and no page-level horizontal overflow. The design contract is under `.impeccable/surfaces/`; `DESIGN.md` and `.impeccable/design.json` document the finished visual system.

## Typography

Archivo and Fragment Mono are self-hosted, unmodified Fontsource 5.3.0 WOFF2 assets under the SIL Open Font License 1.1. Redistribution licenses are included:

- [Archivo license](public/assets/fonts/archivo-LICENSE.txt)
- [Fragment Mono license](public/assets/fonts/fragment-mono-LICENSE.txt)

Exact downloaded-asset hashes and source URLs are in `.impeccable/font-provenance.json`. The architecture diagram, small icons and favicon are authored vector/HTML geometry; no raster artwork ships.
