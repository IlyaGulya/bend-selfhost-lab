---
name: Bend Compiler Lab
description: An evidence-led measurement folio for the self-hosted Bend compiler.
colors:
  paper: "#f2f4f3"
  ink: "#1c2826"
  muted: "#53675e"
  line: "#bac5bf"
  yellow: "#d9ef57"
  positive: "#23543c"
  warning: "#823b24"
  warning-paper: "#f1e3d9"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(4.4rem, 7.2vw, 6rem)"
    fontWeight: 650
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.7rem)"
    fontWeight: 600
    lineHeight: 1.07
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 600
    lineHeight: 1.07
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Fragment Mono, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  data:
    fontFamily: "Fragment Mono, monospace"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "normal"
    letterSpacing: "normal"
rounded:
  square: "0"
spacing:
  tight: "12px"
  compact: "16px"
  base: "24px"
  loose: "40px"
  chapter: "93px"
components:
  action-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "12px 19px"
  action-primary-hover:
    backgroundColor: "{colors.positive}"
    textColor: "{colors.paper}"
  verdict-strip:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    padding: "24px 28px"
  stage:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "12px 15px"
  stage-selected:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
  status-accepted:
    backgroundColor: "transparent"
    textColor: "{colors.positive}"
    typography: "{typography.label}"
    padding: "6px 8px"
  status-rejected:
    backgroundColor: "{colors.warning-paper}"
    textColor: "{colors.warning}"
    typography: "{typography.label}"
    padding: "6px 8px"
  segmented-active:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "9px 13px"
  duration-bar:
    backgroundColor: "{colors.ink}"
    height: "29px"
  duration-bar-accepted:
    backgroundColor: "{colors.yellow}"
    height: "29px"
---

# Design System: Bend Compiler Lab

## Overview

**Creative North Star: "The Instrument Run Sheet"**

The system reads like a measurement instrument's printed run sheet: cool off-white paper, green-black ink, sparse hairline rules, and a single acid-yellow band reserved for evidence, not acceptance alone. Nothing floats. Sections open directly on the paper rather than sitting inside cards, and every comparison is drawn with the same square-ended bar, table rule, and mono number so results can be read down a column instead of admired as decoration.

Archivo carries the reading voice: tightly tracked headlines and a steady 17px body held to a 68-character measure. Fragment Mono appears only where a value, identifier, status, or source file has to look recorded, which keeps argument and evidence visually separable without adding a third decorative face.

Motion acknowledges state and stops there. A stage button changes fill in 180ms; a comparison bar changes its transform scale over 500ms; both vanish under reduced motion. Depth is carried by rules and fills, never shadows, and every control ends square.

**Key Characteristics:**
- Cool off-white field, green-black ink, one acid-yellow evidence fill.
- Open ruled sections: no cards, shadows, gradients, blur, or rounding.
- Two typographic registers: Archivo for prose, Fragment Mono for recorded values.
- Explicit status words, with square marks on status stamps; hue is never the sole carrier.
- Transform-only data animation, with a global reduced-motion stop.
- Square-ended controls, visible ink focus rings, and 44px minimum heights on action, copy, and segmented controls—not all links or navigation.

## Colors

The palette is a cool neutral field with one loud evidence color and a restrained pair of verdict colors; the loudest color is also the rarest.

### Primary
- **Evidence Acid** (#d9ef57): the only saturated fill. It marks evidence, selection, and control states: the checkpoint band, the selected architecture stage, the accepted duration bar, text selection, the skip link, and the copy-button hover. The band contains both historical accepted R12 and G79 NOT ACCEPTED; yellow does not independently denote acceptance. It is a strip and a state, never a page wash.

### Secondary
- **Pass Green** (#23543c): the accepted status ink, passing measurement cells, and primary-action hover. It confirms a verdict that words already state.
- **Rejection Rust** (#823b24): rejected status ink and failing measurement cells.
- **Rejection Wash** (#f1e3d9): the tint behind a rejected status stamp only. It never fills a section or a table row.

### Neutral
- **Cool Folio Paper** (#f2f4f3): page field, scrollbar track, and the label knockouts on connectors.
- **Green-Black Ink** (#1c2826): body text, headlines, primary control fill, active underlines, bar fill, and focus outline. It is the structural color, not a soft "almost black."
- **Sage Annotation** (#53675e): secondary prose, captions, mono metadata, scrollbar thumb, and table header labels.
- **Hairline Lead** (#bac5bf): section dividers, table row rules, stage borders, and container chrome. Structure is drawn at 1px, never boxed with heavy strokes.

### Named Rules
**The One Signal Rule.** Acid yellow marks evidence, selection, or a control state—not acceptance exclusively. It appears as the checkpoint band, one selected stage, one accepted bar, or a control state, never as a page wash or a second band. The checkpoint band includes historical accepted R12 alongside G79 NOT ACCEPTED; explicit words, not the yellow fill, distinguish their verdicts.

**The Words Before Hue Rule.** Every status carries explicit words; status stamps also carry a square mark, but the checkpoint labels inside the yellow band do not. Green and rust reinforce verdicts, while yellow marks evidence or selection: the verdict must survive grayscale, color-blindness, or forced-colors rendering.

## Typography

**Display Font:** Archivo (with system-ui, sans-serif)
**Body Font:** Archivo (with system-ui, sans-serif)
**Label/Mono Font:** Fragment Mono (with monospace)

**Character:** One variable grotesk does all reading, from 96px thesis lines to 13px notes; one monospace does all recording. The contrast comes from role assignment, not from a decorative third family. Both faces are self-hosted under the SIL Open Font License 1.1.

### Hierarchy
- **Display** (650, clamp(4.4rem, 7.2vw, 6rem), 0.98, -0.04em): the page thesis only. Lines are balanced and tightly stacked.
- **Headline** (600, clamp(2rem, 4vw, 3.7rem), 1.07, -0.035em): chapter openers. Chapter headlines set their line breaks in the markup.
- **Title** (600, 1.35rem, 1.07, -0.02em): note, figure, and experiment headings. Local contexts narrow this to 18–27px; the global ramp is not redefined by those local sizes.
- **Body** (400, 17px, 1.65): running prose, capped at 68ch. Secondary explanatory paragraphs drop to 15px in the annotation color; captions and table cells sit at 12–14px.
- **Label** (400, 12px, mono): status stamps, source filenames, captions, and metadata keys. Uppercase stamps may add 0.025em tracking; ordinary labels do not.
- **Data** (400, 15px, mono, normal line-height): duration values use the font shorthand's normal line-height, not 1. Table counts use the mono register at their local table size. The prominent delta and fixedpoint figures stay in Archivo; checksums may drop to 12px and wrap anywhere.

### Named Rules
**The Two-Register Rule.** Archivo carries everything read as prose. Fragment Mono is confined to recorded values, identifiers, source stamps, and status labels. A paragraph is never set in Fragment Mono, and visible text never drops below 12px; the only smaller marks are aria-hidden stage symbols at 10-11px.

**The Tabular Record Rule.** Tabular duration values and numeric table cells use Fragment Mono with tabular figures. Prominent delta and fixedpoint figures, as well as prose percentages, stay in Archivo; the mono data role does not cover every displayed number.

## Layout

The page is a single centered folio: `min(calc(100% - 96px), 1248px)` wide, narrowing to `calc(100% - 64px)` at 1050px and `calc(100% - 40px)` at 760px. Desktop compositions are two-column splits with an 8% gutter and fractional tracks (roughly 1.42/1, 1.5/1, and 1/1.5) rather than a literal 12-column grid; three- and four-column bands appear only for short parallel notes and environment facts.

Vertical rhythm is deliberate and open: 93px chapter padding on desktop, 60px on mobile, 46px from chapter intro to content, and 1px rules between chapters. Reading paragraphs cap at 68ch; the hero copy caps at 47ch. Density increases only inside data regions, where tables use 12–14px type and 12–15px vertical padding.

Responsive behavior changes composition, not scale:

- **1450px and wider:** slightly deeper hero padding and a 48ch copy measure.
- **1050px and below:** the brand sub-label disappears, navigation tightens, the checkpoint band drops its third column to a second row, and result tracks narrow.
- **760px and below:** every split becomes one reading column. The header becomes a two-row grid with navigation spanning the full width; chapter intros, results, method, closing, and footer stack; experiment summaries move their status under the title; the architecture trace becomes a two-column mini-diagram with detail beside it; wide tables scroll inside a focusable `role="region"` with `tabindex="0"`.
- **370px and below:** stage symbols are suppressed, gaps and paddings tighten, and the largest numbers step down one size.

**The Deliberate Mobile Column Rule.** Mobile is a recomposed reading column, not a scaled desktop. Preserve the reading order and the complete verdict before long diagrams; never compress a two-column ledger into unreadable side-by-side text.

## Elevation & Depth

The system is flat. There is no `box-shadow`, gradient, blur, or texture anywhere in the shipped stylesheet. Depth is conveyed by structural rules (1px Hairline Lead for ordinary division, 1px Green-Black Ink at the active edge), by a one-step darker paper fill on hover, and by the single Evidence Acid band. The only motion applied to a data mark is the 500ms scale of a duration bar.

**The Ruled-Not-Lifted Rule.** Separate with a rule, a fill, or spacing. Never with a shadow. Hover states darken the paper one step; they do not lift the element or add a halo. Focus is an outline, not a glow.

## Shapes

The form language is square. Radius is 0 on buttons, panels, bars, status stamps, and copy controls. Borders are 1px; active tabs use a 3px underline flush with the baseline rule; status marks are 5px squares; stage symbols sit inside 25px outlined squares; the experiment disclosure uses an 18px drawn plus whose vertical stroke disappears when open. Duration bars and all data marks end square.

No pills, rounded chips, rounded cards, dashed ornament, or circular icon buttons exist in the system.

**The Square-End Rule.** Every corner is 0. A new surface inherits square edges unless the entire world is being replaced, and a rounded variant is not an acceptable "softening" of an existing one.

## Components

### Buttons
- **Shape:** square (0 radius), no shadow.
- **Primary:** Green-Black Ink fill on paper text, 15px/600, 12px 19px padding, 44px minimum height, 12px gap to an 18px line icon. Hover fills Pass Green; focus uses the global 2px ink outline at 5px offset.
- **Secondary:** inline text action at 15px/600 with a 1px ink bottom border and a 44px minimum height. It has no fill and no hover lift; focus uses the global outline. The secondary action is the source link, never a second filled button.
- **Copy control:** 44×44px square bordered in Hairline Lead; hover fills Evidence Acid. Feedback text sits below at 12px and reserves its line height.
- **Segmented control:** a bottom-ruled group of text buttons with a 44px minimum height at 13px; the pressed button gets a 3px ink underline pulled over the 1px rule and weight 650; hover fills one step darker paper.

### Status Stamps
- **Style:** 12px Fragment Mono, 6px 8px padding, 1px border in `currentColor`, square 5px `::before` mark, 7px gap. Accepted uses Pass Green on transparent; rejected uses Rejection Rust on Rejection Wash; diagnostic uses Sage Annotation on transparent.
- **State:** words always accompany the mark ("HISTORICAL · ACCEPTED", "NOT ACCEPTED", "NOT PROMOTED", "DIAGNOSTIC"). There is no icon-only status.

### Containers
- **Corner Style:** none (0 radius).
- **Background:** Cool Folio Paper for pages; Rejection Wash only behind rejected stamps; Evidence Acid only for the checkpoint band.
- **Shadow Strategy:** none; see Elevation & Depth.
- **Border:** 1px Hairline Lead between sections and rows, 1px ink for table heads, active edges, and the accepted bar outline.
- **Internal Padding:** chapter blocks 93px vertical (60px mobile); table cells 12–15px vertical; the checkpoint band 24px 28px (22px 20px mobile). Content is never boxed inside a card.

### Inputs / Fields
No text-entry fields, selects, or forms ship. Interactive action, copy, and segmented controls are documented under Buttons, stage buttons under Architecture Trace, and native disclosures under Experiment Disclosure.

### Navigation
- **Style:** a 98px header rule-separated from the report: "bend." wordmark at 31px/800 with -0.04em tracking, a 12px mono two-line "COMPILER / LAB" sub-label divided by a 1px rule, 14px section links at 30px gaps, and a 14px GitHub link with an 18px arrow icon.
- **States:** default is unadorned; hover underlines; focus uses the global outline. No active-page fill.
- **Mobile:** the header becomes two rows at 760px; navigation spans the full width at 13px with `space-between`, and the mono sub-label is already hidden below 1050px.
- **Sizing:** the 44px minimum applies to action, copy, and segmented controls, not to all navigation or source links. Non-action source links use a 24px minimum height.

### Architecture Trace
A focusable sequence of square stage buttons (source → checked FIR → shared lowering → BIR → fork to C/JS) with a 52px minimum height, connected by 1px drawn rules and labelled connectors. The selected stage fills Evidence Acid with an ink border; hover moves to a darker paper. A sibling detail panel, marked `aria-live="polite"`, swaps the stage title, description, and source link. Symbols are aria-hidden; full stage names remain visible.

### Checkpoint Band
The one yellow region: a three-column grid of mono stamp, verdict sentence, and source link, 24px gaps and 24px 28px padding. It names separate checkpoints side by side, each with its own status word, and never merges their cohorts. At 1050px it collapses to two columns with the link on a second row; at 760px it becomes one column.

### Duration Comparison
A two-row table with a fixed layout box per bar. Bars are 29px tall, square, ink by default and Evidence Acid with a 1px ink outline for the accepted candidate; they animate only `transform: scaleX(var(--duration-ratio))` from a left origin over 500ms. Durations are 15px mono with normal line-height, right-aligned. Table heads are 12px annotation text; cells are 14px with Hairline Lead row rules.

### Experiment Disclosure
A native `<details>` per experiment, ruled top and bottom: a four-column summary (70px mono id, title, status stamp, 18px drawn plus) with 25px vertical padding. Open hides the plus's vertical stroke and reveals a body inset 86px from the left on desktop (full width on mobile). Hover underlines the title.

### Data Tables
14px tables with 12px ink-ruled headers, Hairline Lead row rules, 12px mono numeric cells, and right-aligned final columns. Verdict cells use Pass Green or Rejection Rust; captions are 12px annotation text. Wide tables live inside a horizontally scrolling, keyboard-focusable region.

## Do's and Don'ts

### Do:
- **Do** keep body text at 17px/1.65 with a 68ch measure, and keep all visible text at 12px or larger.
- **Do** reserve Evidence Acid for evidence, selection, and control states: the checkpoint band, one selected stage, or one accepted bar, never a page wash. Keep accepted and unaccepted checkpoint verdicts explicit within the shared band.
- **Do** pair every status with explicit words and add square marks to status stamps; checkpoint labels in the yellow band convey their verdicts through words without those marks.
- **Do** divide sections with 1px rules and 60-93px chapter padding; let content open on the paper.
- **Do** animate comparison bars with transform: scaleX(var(--duration-ratio)) only, and honor the global reduced-motion stop.
- **Do** use 2px ink focus outlines at 5px offset, 44px minimum heights on action, copy, and segmented controls, and arrow icons at 18px with 1.7 stroke.
- **Do** keep Fragment Mono on values, identifiers, stamps, and source names, with tabular figures in numeric tables.
- **Do** label separate checkpoints individually when accepted and rejected results appear together.

### Don't:
- **Don't** add border-radius, box-shadow, gradients, blur, glass, or paper texture; the world is flat and square.
- **Don't** use color alone for accepted, rejected, or diagnostic status.
- **Don't** set paragraphs in Fragment Mono or visible text below 12px.
- **Don't** animate width, height, top, or left on data marks; use transform.
- **Don't** style rejected diagnostics with accepted treatment: no yellow accepted bar, no pass-green status, no merged denominator.
- **Don't** introduce KPI card grids, pill dashboards, fake live counters, or ambient loops.
- **Don't** box reading content in cards or give a hover state a shadow halo.
