import type { ProjectInfo } from "@/types";
import { Input, SectionLabel, Textarea } from "@/components/ui";

interface ProjectInfoPanelProps {
    info: ProjectInfo;
    onChange: (info: ProjectInfo) => void;
}

export function ProjectInfoPanel({ info, onChange }: ProjectInfoPanelProps) {
    const update = (key: keyof ProjectInfo, value: string) =>
        onChange({ ...info, [key]: value });

    return (
        <div className="flex-shrink-0 border-b border-[var(--border-light)] p-3.5">
            <SectionLabel>Project Info</SectionLabel>
            <div className="flex flex-col gap-1.5">
                <Input
                    value={info.title}
                    onChange={(v) => update("title", v)}
                    placeholder="API Title"
                />
                <div className="grid grid-cols-2 gap-1.5">
                    <Input
                        value={info.version}
                        onChange={(v) => update("version", v)}
                        placeholder="1.0.0"
                    />
                    <Input
                        value={info.baseUrl}
                        onChange={(v) => update("baseUrl", v)}
                        placeholder="https://api..."
                    />
                </div>
                <Textarea
                    value={info.description}
                    onChange={(v) => update("description", v)}
                    placeholder="API description..."
                    minHeight={48}
                />
            </div>
        </div>
    );
}