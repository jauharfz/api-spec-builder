import type { AppTab } from "@/types";
import { Button } from "@/components/ui";

interface HeaderProps {
    title: string;
    version: string;
    endpointCount: number;
    activeTab: AppTab;
    onTabChange: (tab: AppTab) => void;
    onImport: () => void;
    onExport: () => void;
}

const TABS: { key: AppTab; label: string }[] = [
    { key: "builder", label: "Builder" },
    { key: "output", label: "Output" },
];

export function Header({
                           title,
                           version,
                           endpointCount,
                           activeTab,
                           onTabChange,
                           onImport,
                           onExport,
                       }: HeaderProps) {
    return (
        <header className="flex flex-shrink-0 flex-wrap items-center gap-2 border-b border-[var(--border-light)] bg-[var(--bg-primary)] px-4 py-2.5">
            {/*  + title */}
            <div className="flex flex-none items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--info-border)] bg-[var(--info-bg)] text-sm font-bold tracking-tight text-[var(--info-text)]">
                    {/* Mengganti teks dengan Inline SVG Icon (Braces) */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" />
                        <path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
                    </svg>
                </div>
                <div>
                    <div className="text-sm font-semibold leading-tight text-[var(--text-primary)]">
                        {title || "API Spec Builder"}
                    </div>
                    <div className="text-[11px] leading-tight text-[var(--text-tertiary)]">
                        {endpointCount} endpoint{endpointCount !== 1 ? "s" : ""} · v
                        {version || "1.0.0"}
                    </div>
                </div>
            </div>

            {/* Tab switcher */}
            <nav className="flex flex-none gap-1">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => onTabChange(tab.key)}
                        className={[
                            "rounded-md border px-3.5 py-1.5 text-[13px] cursor-pointer transition-colors",
                            activeTab === tab.key
                                ? "border-[var(--border-medium)] bg-[var(--bg-secondary)] font-semibold text-[var(--text-primary)]"
                                : "border-transparent bg-transparent font-normal text-[var(--text-secondary)]",
                        ].join(" ")}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>

            {/* Actions */}
            <div className="ml-auto flex items-center gap-1.5">
                <Button onClick={onImport}>Import</Button>
                <Button onClick={onExport}>Export Project</Button>
            </div>
        </header>
    );
}
