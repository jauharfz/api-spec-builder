import { useMemo } from "react";
import type { Endpoint, OutputFormat, ProjectInfo } from "@/types";
import { OUTPUT_FORMATS, OUTPUT_FILE_NAMES } from "@/constants";
import { Button } from "@/components/ui";
import { generateOutput } from "@/utils/outputGenerator";
import { useClipboard } from "@/hooks/useClipboard";

interface OutputPanelProps {
    info: ProjectInfo;
    endpoints: Endpoint[];
    activeFormat: OutputFormat;
    onFormatChange: (format: OutputFormat) => void;
}

export function OutputPanel({
                                info,
                                endpoints,
                                activeFormat,
                                onFormatChange,
                            }: OutputPanelProps) {
    const output = useMemo(
        () => generateOutput(activeFormat, info, endpoints),
        [activeFormat, info, endpoints]
    );

    const lineCount = output.split("\n").length;
    const { copied, copy } = useClipboard();

    const handleDownload = () => {
        const blob = new Blob([output], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = OUTPUT_FILE_NAMES[activeFormat];
        anchor.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex min-h-0 flex-1 flex-col bg-[var(--bg-primary)]">
            {/* Toolbar */}
            <div className="flex flex-shrink-0 flex-wrap items-center gap-1.5 border-b border-[var(--border-light)] px-4 py-2.5">
                {OUTPUT_FORMATS.map((fmt) => (
                    <button
                        key={fmt.key}
                        onClick={() => onFormatChange(fmt.key)}
                        className={[
                            "rounded-md border px-3 py-1 text-xs cursor-pointer transition-colors",
                            activeFormat === fmt.key
                                ? "border-[var(--border-medium)] bg-[var(--bg-secondary)] font-semibold text-[var(--text-primary)]"
                                : "border-[var(--border-light)] bg-transparent font-normal text-[var(--text-secondary)]",
                        ].join(" ")}
                    >
                        {fmt.label}
                    </button>
                ))}

                <div className="ml-auto flex items-center gap-1.5">
          <span className="text-[11px] text-[var(--text-tertiary)]">
            {lineCount} lines
          </span>
                    <Button onClick={() => copy(output)}>
                        {copied ? "✓ Copied!" : "Copy"}
                    </Button>
                    <Button variant="primary" onClick={handleDownload}>
                        ⬇ Download
                    </Button>
                </div>
            </div>

            {/* Code output */}
            <div className="flex-1 overflow-auto bg-[var(--bg-secondary)]">
        <pre className="min-h-full whitespace-pre p-4 font-mono text-xs leading-relaxed text-[var(--text-primary)]">
          {output}
        </pre>
            </div>
        </div>
    );
}