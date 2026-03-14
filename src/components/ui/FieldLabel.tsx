import type { ReactNode } from "react";

interface FieldLabelProps {
    children: ReactNode;
}

/** Small label above an individual form field. */
export function FieldLabel({ children }: FieldLabelProps) {
    return (
        <div className="mb-1 text-[11px] text-[var(--text-tertiary)]">
            {children}
        </div>
    );
}