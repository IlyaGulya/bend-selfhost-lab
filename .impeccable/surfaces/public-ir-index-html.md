---
version: 1
slug: "public-ir-index-html"
primary_target: "public/ir/index.html"
related_targets: ["public/ir/ir.css", "public/ir/ir.js", "public/index.html"]
---

# Inside the compiler

Mode: Read. An English-language deep dive for someone who does not know this compiler's internal names. The user wants a separate, detailed IR/FIR explanation and says the overview is too dry. Keep the compact report intact and link it to this route.

## Direction contract

**THESIS:** Follow one function through changing representations instead of reading an acronym glossary. Explain each actual carrier with concrete structure. Reject another long column of paragraphs and tiny disconnected block diagrams.

**OWN-WORLD:** Inherit the Instrument Run Sheet palette, Archivo, Fragment Mono, square controls and ruled typography. Use the existing ink as a real graph-board surface, with readable paper labels and one yellow selected binding. No slogan, neon glow, decorative metrics, stock artwork or new brand. Code-led authored geometry; no new-world seed applies to this precisely scoped extension.

**STORY:** Understand what IR means; follow the captured `k` and later argument `x` in the existing `adder` function through source, checked FIR, shared lowering and backend IR. Then inspect source pools versus occurrence facts, the exact record/variant families, lexical regions and ownership. The wrapper's identically spelled parameters are different binders, not identities to conflate.

**FIRST VIEWPORT:** Literal heading, one definition, then a large translation workbench. A compact real-source excerpt is beside a readable selected-representation graph. Phase controls sit immediately above it; binding controls and a selected-node inspector make relationships explorable. On mobile the first FIR node remains visible in the opening; optional source context follows the workbench instead of pushing the graph below the fold.

**FORM:** An explorable source-to-representation workbench followed by annotated anatomy plates and ownership/control-flow strips. Primary explanations and actual declarations are authored HTML; with JavaScript disabled all representation panels remain available and native source details work. Source links use the verified pinned revision. Synthetic IDs and schematic operations are clearly distinguished from actual declarations and emitted compiler output.

**SIGNATURE:** Follow a binding. Selecting captured `k` or argument `x` highlights the corresponding source tokens, graph nodes and wires across phase changes. Selecting a node explains its genuine fields and links to the source. Mobile places the selected explanation immediately after its node; desktop uses the inspector shelf, restored when the breakpoint changes. Wires route around inline explanations. State changes acknowledge the visitor once; no autoplay, fake compilation progress or perpetual animation. Keyboard interaction and reduced motion are first-class.

## Truth and scope

The pinned source is `f63679c31e3219b9fbd119625d35ec03cb2ad224`; the relevant inspected front-end, lowering and target files were verified against matching Git blobs. Keep source arena storage, checked occurrences and backend blocks distinct. Do not claim FIR is only an AST with a type on each node, BIR is SSA/arbitrary CFG/bytecode, all storage is flat, captures imply a heap allocation, a carrier is a correctness proof, or ownership implies lower RSS. C and JavaScript still perform target analysis. The page explores a source-backed teaching model, not a browser compiler or captured live IR trace.

Actual full program and generated JavaScript remain the existing licensed artifacts under `/examples/`. Do not rebuild the compiler, edit its emitted output, invent new measurements or relax CSP. Keep this development contract outside `public/`.
