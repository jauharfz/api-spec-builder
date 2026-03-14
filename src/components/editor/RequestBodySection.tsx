import type { Endpoint, Property } from "@/types";
import { Button, Card, FieldLabel, Input, SectionLabel, Select } from "@/components/ui";
import { FieldHeader } from "./FieldHeader";
import { FieldRow } from "./FieldRow";

interface RequestBodySectionProps {
    requestBody: Endpoint["requestBody"];
    onUpdate: (changes: Partial<Endpoint["requestBody"]>) => void;
    onAddProperty: () => void;
    onUpdateProperty: (updated: Property) => void;
    onDeleteProperty: (id: string) => void;
}

const BODY_TYPE_OPTIONS = [
    { value: "object", label: "Object { }" },
    { value: "array", label: "Array [ { } ]" },
];

export function RequestBodySection({
                                       requestBody,
                                       onUpdate,
                                       onAddProperty,
                                       onUpdateProperty,
                                       onDeleteProperty,
                                   }: RequestBodySectionProps) {
    return (
        <Card>
            {/* Header row */}
            <div className="mb-3 flex flex-wrap items-center gap-4">
                <SectionLabel>Request Body</SectionLabel>
                <label className="mb-2 flex cursor-pointer items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                    <input
                        type="checkbox"
                        checked={requestBody.enabled}
                        onChange={(e) => onUpdate({ enabled: e.target.checked })}
                    />
                    Enable
                </label>
                {requestBody.enabled && (
                    <label className="mb-2 flex cursor-pointer items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                        <input
                            type="checkbox"
                            checked={requestBody.required}
                            onChange={(e) => onUpdate({ required: e.target.checked })}
                        />
                        Required
                    </label>
                )}
            </div>

            {requestBody.enabled && (
                <>
                    {/* Description + Body type */}
                    <div className="mb-2.5 grid grid-cols-2 gap-2.5">
                        <div>
                            <FieldLabel>Description</FieldLabel>
                            <Input
                                value={requestBody.description}
                                onChange={(v) => onUpdate({ description: v })}
                                placeholder="Request body description"
                            />
                        </div>
                        <div>
                            <FieldLabel>Body Type</FieldLabel>
                            <Select
                                value={requestBody.bodyType}
                                onChange={(v) =>
                                    onUpdate({ bodyType: v as Endpoint["requestBody"]["bodyType"] })
                                }
                                options={BODY_TYPE_OPTIONS}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Fields list */}
                    <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
              {requestBody.bodyType === "array"
                  ? "Item Fields · array of objects"
                  : "Fields · application/json"}
            </span>
                        <Button onClick={onAddProperty}>+ Add Field</Button>
                    </div>

                    {requestBody.properties.length > 0 && <FieldHeader />}

                    {requestBody.properties.map((p) => (
                        <FieldRow
                            key={p.id}
                            field={p}
                            onChange={onUpdateProperty}
                            onDelete={() => onDeleteProperty(p.id)}
                        />
                    ))}

                    {requestBody.properties.length === 0 && (
                        <p className="py-2 text-center text-xs text-[var(--text-tertiary)]">
                            No fields defined
                        </p>
                    )}
                </>
            )}
        </Card>
    );
}