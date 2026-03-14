import type { Property, SubProperty } from "@/types";
import { FIELD_TYPES } from "@/constants";
import { Input, Select, Button } from "@/components/ui";
import { SubFieldRow } from "./SubFieldRow";
import { SubFieldHeader } from "./FieldHeader";
import { createSubProperty } from "@/utils/factories";

interface FieldRowProps {
    field: Property;
    onChange: (updated: Property) => void;
    onDelete: () => void;
}

export function FieldRow({ field, onChange, onDelete }: FieldRowProps) {
    const update = (changes: Partial<Property>) => onChange({ ...field, ...changes });

    const isExpandable = field.type === "array" || field.type === "object";
    const isExpanded = !!(field.expanded && isExpandable);

    // ─── Item properties (array<object>) ───────────────────────────────────────
    const addItemProp = () =>
        update({ itemProperties: [...(field.itemProperties ?? []), createSubProperty()] });
    const updateItemProp = (sub: SubProperty) =>
        update({ itemProperties: (field.itemProperties ?? []).map((ip) => (ip.id === sub.id ? sub : ip)) });
    const deleteItemProp = (id: string) =>
        update({ itemProperties: (field.itemProperties ?? []).filter((ip) => ip.id !== id) });

    // ─── Sub-properties (object) ────────────────────────────────────────────────
    const addSubProp = () =>
        update({ subProperties: [...(field.subProperties ?? []), createSubProperty()] });
    const updateSubProp = (sub: SubProperty) =>
        update({ subProperties: (field.subProperties ?? []).map((sp) => (sp.id === sub.id ? sub : sp)) });
    const deleteSubProp = (id: string) =>
        update({ subProperties: (field.subProperties ?? []).filter((sp) => sp.id !== id) });

    return (
        <div className="mb-1.5">
            {/* Main row — 7 cols */}
            <div className="grid grid-cols-[1fr_80px_50px_1fr_90px_28px_28px] items-center gap-1.5">
                <Input
                    value={field.name}
                    onChange={(v) => update({ name: v })}
                    placeholder="field"
                    mono
                />
                <Select
                    value={field.type}
                    onChange={(v) => update({ type: v as Property["type"], expanded: false })}
                    options={FIELD_TYPES}
                />
                <div className="flex justify-center">
                    <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => update({ required: e.target.checked })}
                        className="h-3.5 w-3.5 cursor-pointer"
                    />
                </div>
                <Input
                    value={field.description}
                    onChange={(v) => update({ description: v })}
                    placeholder="description"
                />
                <Input
                    value={field.example}
                    onChange={(v) => update({ example: v })}
                    placeholder="example"
                    disabled={field.type === "array" || field.type === "object"}
                />

                {/* Expand toggle */}
                <button
                    onClick={() => isExpandable && update({ expanded: !field.expanded })}
                    title={
                        isExpandable
                            ? isExpanded
                                ? "Collapse nested fields"
                                : "Expand to define nested fields"
                            : ""
                    }
                    className={[
                        "flex h-7 w-7 items-center justify-center rounded-md border text-[11px] transition-colors",
                        isExpandable
                            ? isExpanded
                                ? "border-[var(--border-medium)] bg-[var(--bg-tertiary)] text-[var(--text-secondary)] cursor-pointer"
                                : "border-[var(--border-light)] bg-transparent text-[var(--text-secondary)] cursor-pointer"
                            : "border-transparent bg-transparent text-transparent cursor-default",
                    ].join(" ")}
                >
                    {isExpandable ? (isExpanded ? "▲" : "▼") : ""}
                </button>

                <Button variant="danger" onClick={onDelete}>
                    ×
                </Button>
            </div>

            {/* Array items expansion */}
            {isExpanded && field.type === "array" && (
                <div className="ml-4 mt-1.5 rounded-lg border border-[var(--border-light)] border-l-[var(--info-border)] bg-[var(--bg-primary)] p-2.5 [border-left-width:3px]">
                    <div className="mb-2.5 flex flex-wrap items-center gap-2.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)] whitespace-nowrap">
              Items Type
            </span>
                        <Select
                            value={field.itemType ?? "string"}
                            onChange={(v) => update({ itemType: v as Property["itemType"] })}
                            options={FIELD_TYPES}
                            className="min-w-[90px]"
                        />
                        {field.itemType !== "object" && (
                            <span className="text-[11px] italic text-[var(--text-tertiary)]">
                Each item is of type{" "}
                                <code className="font-mono text-[11px]">{field.itemType}</code>
              </span>
                        )}
                    </div>

                    {field.itemType === "object" && (
                        <>
                            <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Item Object Fields
                </span>
                                <Button onClick={addItemProp}>+ Add Field</Button>
                            </div>
                            {(field.itemProperties ?? []).length > 0 && <SubFieldHeader />}
                            {(field.itemProperties ?? []).map((ip) => (
                                <SubFieldRow
                                    key={ip.id}
                                    field={ip}
                                    onChange={updateItemProp}
                                    onDelete={() => deleteItemProp(ip.id)}
                                />
                            ))}
                            {!(field.itemProperties ?? []).length && (
                                <p className="py-1.5 text-center text-[11px] text-[var(--text-tertiary)]">
                                    No item fields yet — click "+ Add Field"
                                </p>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* Object properties expansion */}
            {isExpanded && field.type === "object" && (
                <div className="ml-4 mt-1.5 rounded-lg border border-[var(--border-light)] border-l-[var(--warning-border)] bg-[var(--bg-primary)] p-2.5 [border-left-width:3px]">
                    <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
              Object Properties
            </span>
                        <Button onClick={addSubProp}>+ Add Property</Button>
                    </div>
                    {(field.subProperties ?? []).length > 0 && <SubFieldHeader />}
                    {(field.subProperties ?? []).map((sp) => (
                        <SubFieldRow
                            key={sp.id}
                            field={sp}
                            onChange={updateSubProp}
                            onDelete={() => deleteSubProp(sp.id)}
                        />
                    ))}
                    {!(field.subProperties ?? []).length && (
                        <p className="py-1.5 text-center text-[11px] text-[var(--text-tertiary)]">
                            No properties yet — click "+ Add Property"
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}