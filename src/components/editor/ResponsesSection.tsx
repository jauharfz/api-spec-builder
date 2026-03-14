import type { Endpoint, Property, Response } from "@/types";
import { getStatusCodeStyle } from "@/constants";
import { Button, Card, Input, SectionLabel } from "@/components/ui";
import { FieldHeader } from "./FieldHeader";
import { FieldRow } from "./FieldRow";

interface ResponsesSectionProps {
    responses: Endpoint["responses"];
    onAdd: () => void;
    onUpdate: (id: string, changes: Partial<Response>) => void;
    onDelete: (id: string) => void;
    onAddProperty: (responseId: string) => void;
    onUpdateProperty: (responseId: string, updated: Property) => void;
    onDeleteProperty: (responseId: string, propertyId: string) => void;
}

export function ResponsesSection({
                                     responses,
                                     onAdd,
                                     onUpdate,
                                     onDelete,
                                     onAddProperty,
                                     onUpdateProperty,
                                     onDeleteProperty,
                                 }: ResponsesSectionProps) {
    return (
        <Card>
            <div className="mb-3 flex items-center justify-between">
                <SectionLabel>Responses</SectionLabel>
                <Button onClick={onAdd}>+ Add Response</Button>
            </div>

            {responses.map((response, index) => (
                <ResponseItem
                    key={response.id}
                    response={response}
                    canDelete={index > 0}
                    onUpdate={(changes) => onUpdate(response.id, changes)}
                    onDelete={() => onDelete(response.id)}
                    onAddProperty={() => onAddProperty(response.id)}
                    onUpdateProperty={(updated) => onUpdateProperty(response.id, updated)}
                    onDeleteProperty={(pid) => onDeleteProperty(response.id, pid)}
                />
            ))}
        </Card>
    );
}

// ─── Single response card ─────────────────────────────────────────────────────

interface ResponseItemProps {
    response: Response;
    canDelete: boolean;
    onUpdate: (changes: Partial<Response>) => void;
    onDelete: () => void;
    onAddProperty: () => void;
    onUpdateProperty: (updated: Property) => void;
    onDeleteProperty: (id: string) => void;
}

function ResponseItem({
                          response,
                          canDelete,
                          onUpdate,
                          onDelete,
                          onAddProperty,
                          onUpdateProperty,
                          onDeleteProperty,
                      }: ResponseItemProps) {
    const { color } = getStatusCodeStyle(response.statusCode);
    const isArray = response.responseType === "array";

    return (
        <div className="mb-2.5 rounded-lg border border-[var(--border-light)] bg-[var(--bg-primary)] p-3">
            {/* Response header */}
            <div className="mb-2.5 flex flex-wrap items-center gap-2">
                {/* Status code input */}
                <input
                    value={response.statusCode}
                    onChange={(e) => onUpdate({ statusCode: e.target.value })}
                    style={{ color }}
                    className="w-16 rounded-md border border-[var(--border-light)] bg-transparent px-2 py-1 text-center font-mono text-[13px] font-bold outline-none"
                />

                {/* Description */}
                <Input
                    value={response.description}
                    onChange={(v) => onUpdate({ description: v })}
                    placeholder="Response description"
                    className="min-w-[120px] flex-1"
                />

                {/* Object / Array toggle */}
                <div className="flex flex-shrink-0 overflow-hidden rounded-md border border-[var(--border-light)]">
                    {(["object", "array"] as const).map((type) => (
                        <button
                            key={type}
                            onClick={() => onUpdate({ responseType: type })}
                            className={[
                                "border-none px-2.5 py-1 text-[11px] cursor-pointer font-sans transition-colors",
                                response.responseType === type
                                    ? "bg-[var(--bg-secondary)] font-semibold text-[var(--text-primary)]"
                                    : "bg-transparent font-normal text-[var(--text-tertiary)]",
                            ].join(" ")}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>

                <Button onClick={onAddProperty}>+ Field</Button>
                {canDelete && (
                    <Button variant="danger" onClick={onDelete}>
                        ×
                    </Button>
                )}
            </div>

            {/* Field label */}
            {response.properties.length > 0 && (
                <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                    {isArray ? "Item Fields · array of objects" : "Fields · application/json"}
                </div>
            )}

            {response.properties.length > 0 && <FieldHeader />}

            {response.properties.map((p) => (
                <FieldRow
                    key={p.id}
                    field={p}
                    onChange={onUpdateProperty}
                    onDelete={() => onDeleteProperty(p.id)}
                />
            ))}

            {response.properties.length === 0 && (
                <p className="py-1.5 text-center text-xs text-[var(--text-tertiary)]">
                    No fields defined
                </p>
            )}
        </div>
    );
}