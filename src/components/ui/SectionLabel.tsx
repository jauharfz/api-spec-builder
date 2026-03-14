import type { ReactNode } from "react";

interface SectionLabelProps {
    children: ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
    return (
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)]">
            {children}
        </div>
    );
}