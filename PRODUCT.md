# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated by the user. Chosen: static semantic HTML, CSS, and small vanilla JavaScript modules; structured JSON evidence; no runtime framework or build-time dependencies. Netlify hosts `public/`. The page is a technical report, not an application shell.

## Users

Confirmed: engineers reading in English. They need to understand the self-hosted Bend compiler architecture, compare measured results, and inspect the primary GitHub evidence.

## Product Purpose

Publish the compiler work and provide a beautiful, accessible public account of what was built, what was measured, what was accepted, and what was rejected. Success is a reader reaching the source evidence with the right interpretation, not assuming a diagnostic point result is a shipped speedup.

## Positioning

Evidence-led engineering on the dependently typed, affine Bend self-hosting compiler: shared Checked FIR to BIR lowering, C and JavaScript backends, authenticated self-hosting/fixedpoint evidence, and CPU/memory-qualified experiments.

## Operating Context

Source repository: https://github.com/IlyaGulya/bend, branch selfhost/integration. Completed work is committed through f63679c3. Experimental branches remain separate. New site source will live in its own repository, IlyaGulya/bend-selfhost-lab, to avoid changing the compiler repository's file allowlist or the existing Bend website. Deployment target explicitly requested: a NEW Netlify project in the authenticated user's own account; no existing site or domain is replaced.

## Capabilities and Constraints

Architecture explanation; sourced speed/memory comparisons; accepted versus diagnostic/rejected status; experiment evidence links; reproducibility context; responsive web layout and keyboard-accessible interactions. Preserve all named limits, sample counts, comparison denominators, and C/N versus C/A distinctions. Never fabricate performance, tests, fixedpoints, customer claims, or success status. No credentials, local absolute paths, raw heap data, internal host details, telemetry, or contact forms on the website. Do not include untracked source logs or .omp state in GitHub publication.

## Brand Commitments

Bend is the subject; this is an independent engineering report, not an official Bend release announcement. English technical copy, precise but approachable. Working editorial title: Bend Compiler Lab; the title is not a product rename or claim of official affiliation. No visual style has been approved yet.

## Evidence on Hand

- checkpoints/SELFHOST_IR_ARCHITECTURE.md and FIR_LAWS.md/BIR_LAWS.md for architecture and historical acceptance scope.
- G24 R12 primary fixedpoint, behavior, and same-host paired throughput receipts.
- G51/G56/G59/G60 representative iteration corpora and measured workflow receipts, to be checked before use.
- G73-G79 complete protocols/decisions/results, including explicit rejections.
- G79: 75,565,159 checker frame registrations elided; 108,851 unchanged fallbacks; six full selected-work checks; four counter-free C/N screening rows. CPU point -8.8%, median whole-tree physical point +1.5%; memory admission FAILED. This is NOT an accepted compiler optimization.
- G78: local verification CPU point -80.6%, median physical -26.7%; overall qualification FAILED; no source promotion.

## Product Principles

1. Put proof and its limitations beside each result.
2. Separate historical accepted work, current architecture, and rejected diagnostics.
3. Show mechanisms before claims; make source verification one action away.
4. Keep the delivery fast, durable, and understandable without JavaScript.

## Accessibility & Inclusion

Project choice: target WCAG 2.2 AA, semantic headings/tables, visible keyboard focus, reduced-motion support, and readable mobile layouts. No animation-dependent access to content.
