const stages = {
  source: {
    title: "Bend source",
    description:
      "adder receives k now and returns a function receiving x later. The body uses both values, so the returned function must retain k from its enclosing scope. This is the source-level closure, before target representation choices.",
    file: "bend2/selfhost/FIR_LAWS.md",
    label: "Read the front-end contract",
  },
  fir: {
    title: "Checked program",
    description:
      "For adder, checking retains the U32 types, the resolved k and x bindings, and permitted uses. These facts travel with one owned source arena into lowering.",
    file: "bend2/selfhost/checked_frontend.bend",
    label: "Inspect the checked program",
  },
  lower: {
    title: "Shared lowering",
    description:
      "In this example, lowering makes the captured k and the closure application explicit. It preserves lexical identity and evaluation order. This shared semantic work happens once, before the driver selects C or JavaScript.",
    file: "bend2/selfhost/backend_lower.bend",
    label: "Inspect shared lowering",
  },
  bir: {
    title: "Executable program",
    description:
      "Think of code for adding x to captured k, a closure carrying k, and a call using x. This is an explanatory operation shape, not a dump of this program’s IR. Actual backend blocks express bindings, branches, returns, tail calls and lexical regions.",
    file: "bend2/selfhost/backend_ir.bend",
    label: "Inspect the backend representation",
  },
  c: {
    title: "C backend",
    description:
      "For a closure like adder, C still needs physical representations, sharing plans and its runtime calling convention. The C backend computes those plans, runtime tables, executable segments and continuations. This page does not include a compiled C example.",
    file: "bend2/selfhost/c_backend.bend",
    label: "Inspect the C backend",
  },
  js: {
    title: "JavaScript backend",
    description:
      "The downloaded JavaScript module is actual compiler output for the closure example. This backend plans captures and region frames, emits functions and runtime helpers, and adapts host values. The browser runs that precompiled artifact; it never runs the Bend compiler.",
    file: "bend2/selfhost/js_backend.bend",
    label: "Inspect the JavaScript backend",
  },
};
const sourceBase =
  "https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/";
const stageButtons = [...document.querySelectorAll("[data-stage]")];
for (const button of stageButtons) {
  button.disabled = false;
  button.addEventListener("click", () => {
    const stage = stages[button.dataset.stage];
    if (!stage) return;
    for (const other of stageButtons)
      other.setAttribute("aria-pressed", String(other === button));
    document.querySelector("#trace-title").textContent = stage.title;
    document.querySelector("#trace-description").textContent = stage.description;
    const source = document.querySelector("#trace-source");
    source.href = sourceBase + stage.file;
    source.querySelector("span").textContent = stage.label;
  });
}
const copy = document.querySelector("#copy-checksum");
if (copy) {
  copy.hidden = false;
  copy.addEventListener("click", async () => {
    const output = document.querySelector("#copy-feedback");
    try {
      if (!navigator.clipboard?.writeText) throw Error("Clipboard unavailable");
      await navigator.clipboard.writeText(
        document.querySelector("#fixedpoint-sha").textContent.trim(),
      );
      output.textContent = "SHA-256 copied.";
    } catch {
      output.textContent = "Clipboard unavailable. Select the checksum to copy it manually.";
    }
  });
}

const runExample = document.querySelector("#run-example");
if (runExample) {
  const result = document.querySelector("#example-result");
  runExample.disabled = false;
  runExample.addEventListener("click", async (event) => {
    if (runExample.disabled) return;
    const restoreKeyboardFocus = event.detail === 0;
    runExample.disabled = true;
    runExample.setAttribute("aria-busy", "true");
    result.dataset.state = "loading";
    result.textContent = "Loading emitted JavaScript for compute(5, 3)…";
    let operation = "load";
    try {
      const { default: generated } = await import("/examples/closure.generated.mjs");
      operation = "run";
      const value = generated.compute(5, 3);
      result.dataset.state = "success";
      result.textContent = `Executed in this browser: compute(5, 3) → ${value}.`;
    } catch {
      result.dataset.state = "error";
      result.textContent = operation === "load"
        ? "Could not load the emitted module. Reload this page and try again. Source and module downloads remain available."
        : "The emitted compute(5, 3) call failed. Reload this page and try again. Source and module downloads remain available.";
    } finally {
      runExample.disabled = false;
      runExample.removeAttribute("aria-busy");
      if (restoreKeyboardFocus && document.activeElement === document.body)
        runExample.focus({ preventScroll: true });
    }
  });
}
