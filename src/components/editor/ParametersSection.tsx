import type { Endpoint, Parameter } from "@/types";
import { FIELD_TYPES, PARAMETER_LOCATIONS } from "@/constants";
import { Button, Card, Input, SectionLabel, Select } from "@/components/ui";

interface ParametersSectionProps {
    parameters: Endpoint["parameters"];
    onAdd: () => void;
    onUpdate: (id: string, changes: Partial<Parameter>) => void;
    onDelete: (id: string) => void;
}

export function ParametersSection({
                                      parameters,
                                      onAdd,
                                      onUpdate,
                                      onDelete,
                                  }: ParametersSectionProps) {
    return (
        <Card>
            <div className="mb-3 flex items-center justify-between">
                <SectionLabel>Parameters</SectionLabel>
                <Button onClick={onAdd}>+ Add Parameter</Button>
            </div>

            {parameters.length > 0 && (
                <div className="mb-1.5 grid grid-cols-[1fr_80px_80px_55px_1fr_80px_28px] gap-1.5 px-0.5 text-[10px] text-[var(--text-tertiary)]">
                    <span>Name</span>
                    <span>In</span>
                    <span>Type</span>
                    <span>Req?</span>
                    <span>Description</span>
                    <span>Example</span>
                    <span />
                </div>
            )}

            {parameters.map((p) => (
                <div
                    key={p.id}
                    className="mb-1.5 grid grid-cols-[1fr_80px_80px_55px_1fr_80px_28px] items-center gap-1.5"
                >
                    <Input
                        value={p.name}
                        onChange={(v) => onUpdate(p.id, { name: v })}
                        placeholder="name"
                        mono
                    />
                    <Select
                        value={p.in}
                        onChange={(v) => onUpdate(p.id, { in: v as Parameter["in"] })}
                        options={PARAMETER_LOCATIONS}
                    />
                    <Select
                        value={p.type}
                        onChange={(v) => onUpdate(p.id, { type: v as Parameter["type"] })}
                        options={FIELD_TYPES}
                    />
                    <div className="flex justify-center">
                        <input
                            type="checkbox"
                            checked={p.in === "path" ? true : p.required}
                            disabled={p.in === "path"}
                            onChange={(e) =>
                                p.in !== "path" && onUpdate(p.id, { required: e.target.checked })
                            }
                            title={p.in === "path" ? "Path parameters are always required" : ""}
                            className="h-3.5 w-3.5"
                            style={{
                                cursor: p.in === "path" ? "not-allowed" : "pointer",
                                opacity: p.in === "path" ? 0.5 : 1,
                            }}
                        />
                    </div>
                    <Input
                        value={p.description}
                        onChange={(v) => onUpdate(p.id, { description: v })}
                        placeholder="description"
                    />
                    <Input
                        value={p.example}
                        onChange={(v) => onUpdate(p.id, { example: v })}
                        placeholder="example"
                    />
                    <Button variant="danger" onClick={() => onDelete(p.id)}>
                        ×
                    </Button>
                </div>
            ))}

            {parameters.length === 0 && (
                <p className="py-2.5 text-center text-xs text-[var(--text-tertiary)]">
                    No parameters defined for this endpoint
                </p>
            )}
        </Card>
    );
}