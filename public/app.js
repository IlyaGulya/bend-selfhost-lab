const stages = {
  source: {
    title: "Bend source",
    description:
      "adder(5) returns a closure with k = 5. A later call supplies x.",
    file: "bend2/selfhost/FIR_LAWS.md",
    label: "Source contract",
  },
  fir: {
    title: "FIR: checked program",
    description:
      "FIR stores resolved names, types and use limits. Lowering reads this checked data.",
    file: "bend2/selfhost/checked_frontend.bend",
    label: "FIR source",
  },
  lower: {
    title: "Lowering",
    description:
      "Lowering resolves captures, calls and pattern control. Both targets use this pass.",
    file: "bend2/selfhost/backend_lower.bend",
    label: "Lowering source",
  },
  bir: {
    title: "Backend IR",
    description:
      "Backend IR stores operands, ordered operations and control blocks. It does not store the source arena.",
    file: "bend2/selfhost/backend_ir.bend",
    label: "Backend IR source",
  },
  c: {
    title: "C backend",
    description:
      "The C backend plans layouts, sharing and runtime calls. It then generates C code.",
    file: "bend2/selfhost/c_backend.bend",
    label: "C backend source",
  },
  js: {
    title: "JavaScript backend",
    description:
      "The JavaScript backend plans captures and frames. It then generates functions and runtime calls.",
    file: "bend2/selfhost/js_backend.bend",
    label: "JavaScript backend source",
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
      output.textContent = "Cannot use the clipboard. Select and copy the checksum.";
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
    result.textContent = "Loading compiled JavaScript for compute(5, 3)…";
    let operation = "load";
    try {
      const { default: generated } = await import("/examples/closure.generated.mjs");
      operation = "run";
      const value = generated.compute(5, 3);
      result.dataset.state = "success";
      result.textContent = `Result: compute(5, 3) = ${value}.`;
    } catch {
      result.dataset.state = "error";
      result.textContent = operation === "load"
        ? "Cannot load compiled JavaScript. Reload the page and try again. You can also download the files."
        : "The compute(5, 3) call failed. Reload the page and try again. You can also download the files.";
    } finally {
      runExample.disabled = false;
      runExample.removeAttribute("aria-busy");
      if (restoreKeyboardFocus && document.activeElement === document.body)
        runExample.focus({ preventScroll: true });
    }
  });
}
