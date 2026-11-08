# IR/FIR walkthrough: primary-source facts

Source pin: `f63679c31e3219b9fbd119625d35ec03cb2ad224`, also the inspected compiler HEAD. Two independent read-only investigations checked current files with `git ls-tree` and `git hash-object`; assigned front-end, lowering and target files match the pin. No compiler edits, builds, tests or benchmark executions.

## FIR is an owned package and contextual facts

[CheckedProgram](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/bend2/selfhost/checked_frontend.bend#L8-L34) is affine (`is Type`) with source arena, modules, signatures and metadata. CheckFailure carries only a diagnostic; the record constructor alone is not a validity proof.

[Checked facts](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/bend2/selfhost/checker_ir.bend#L27-L85): TypedOccurrence has term/ty handles, formal quantity, optional global symbol, bindings and children. Ordinary parameter reads are typically TypedOccurrence. LocalReferenceOccurrence additionally retains a semantic substitution value: that is not an extra runtime argument. CheckedBinding has quantity/ty/type_depth, not a name or unique binder ID. Symbol identifies a global declaration, not a local binder.

[Term constructors](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/bend2/selfhost/checker_arena.bend#L8-L45) retain handles and lexical indices. TermVar.index selects the environment; key_id is spelling. [Producer wrapping](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/bend2/selfhost/checker.bend#L8950-L8974) makes definition binders lambdas. [Lambda facts](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/bend2/selfhost/checker.bend#L6546-L6574) retain checked domain, resolved quantity and body. The parser’s exact operator desugaring and actual occurrence IDs/quantities were not traced; the page's curried application topology is explicitly schematic. Never invent PrimitiveOccurrence or arithmetic TermAdd, a FIR capture list, or an observed U32.add owner.

## Lowering preserves lexical identity and discovers captures

[Slot/Frame and resolution](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/bend2/selfhost/backend_lower.bend#L20-L32): Slot carries owner/identity/value/use; Frame carries owner/instructions/captures/capture_count. [Resolution and closure construction](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/bend2/selfhost/backend_lower.bend#L141-L264) uses same-frame atoms directly, keys cross-frame captures by (owner,identity), reuses capture slots, and supplies parent-frame values as Args. Code.captures stores use metadata, while Closure.captures stores supplied Args. There is no runtime BIR Lambda variant.

## Backend IR is structured, not SSA/bytecode

[Atoms and arguments](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/bend2/selfhost/backend_ir.bend#L4-L35) include Local/Capture/Symbol/literals and Arg{use,value}; PrimU32Add is real. [Op/Block/Code](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/bend2/selfhost/backend_ir.bend#L188-L214): strict Let operations include Closure, PrimitiveCall, Direct and unary Apply; Return/TailDirect/TailApply terminate blocks. Region/LeaveRegion express lexical forward exits, not arbitrary CFG jumps. [Pattern lowering](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/bend2/selfhost/backend_lower.bend#L1224-L1259) stores remaining cases once in Region.next. Success Return does not continue into next.

[Program](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/bend2/selfhost/backend_ir.bend#L219-L249) has codes/declarations/constructors/families/type_functions/ending, no checker source arena. [Descriptors](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/bend2/selfhost/backend_ir.bend#L156-L186) are separate metadata, not an already-normalized FIR type table. Affine use is not caller-liveness or automatic freeability; atoms are not guaranteed allocation/effect-free in all target representations.

## Lifetimes and target work

[Entry points](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/bend2/selfhost/backend_lower.bend#L1962-L1992) consume checked ownership and return Lowered or LowerFailure. [Driver](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/bend2/selfhost/driver.bend#L122-L177) lowers once before target dispatch. Passive target files may be loaded separately. C still plans layouts/sharing/control/runtime; JS plans continuation captures/regions/frames and eligible scalar replacement.

[Rewind](https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/bend2/selfhost/checker_arena.bend#L1259-L1322) retains capacity and advances epochs. Published transient contents must move into retained storage before rewind; publication is not a bit flip. Bit31 tags transient handles; bit30 reverses tape cursors, not arbitrary nodes. Occurrence and Block structures remain recursive. Embedded source line numbers and memo-clearing prose in older laws can be stale; concrete pinned code takes precedence. No memory/performance/semantic-proof claim follows from these diagrams.

## Teaching model boundary

The page focuses adder's outer k and returned-lambda x, not same-spelled compute-wrapper binders. Synthetic IDs 10/20/100/101 and capture slot0 illustrate fields without claiming observed compiler output. Use annotations are deliberately not inferred. Actual declarations are labelled separately from schematic short-form examples. No compiler runs in the browser.
