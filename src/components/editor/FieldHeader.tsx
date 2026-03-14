/** Column headers for the property field grid (7 columns). */
export function FieldHeader() {
    return (
        <div className="mb-1 grid grid-cols-[1fr_80px_50px_1fr_90px_28px_28px] gap-1.5 px-0.5 text-[10px] text-[var(--text-tertiary)]">
            <span>Name</span>
            <span>Type</span>
            <span>Req?</span>
            <span>Description</span>
            <span>Example</span>
            <span />
            <span />
        </div>
    );
}

/** Column headers for sub-property grid (6 columns, no expand toggle). */
export function SubFieldHeader() {
    return (
        <div className="mb-1 grid grid-cols-[1fr_80px_50px_1fr_90px_28px] gap-1.5 px-0.5 text-[10px] text-[var(--text-tertiary)]">
            <span>Name</span>
            <span>Type</span>
            <span>Req?</span>
            <span>Description</span>
            <span>Example</span>
            <span />
        </div>
    );
}