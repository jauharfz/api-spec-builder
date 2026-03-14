import type { SubProperty } from "@/types";
import { FIELD_TYPES } from "@/constants";
import { Input, Select, Button } from "@/components/ui";

interface SubFieldRowProps {
    field: SubProperty;
    onChange: (updated: SubProperty) => void;
    onDelete: () => void;
}

export function SubFieldRow({ field, onChange, onDelete }: SubFieldRowProps) {
    const update = (changes: Partial<SubProperty>) =>
        onChange({ ...field, ...changes });

    return (
        <div className="mb-1 grid grid-cols-[1fr_80px_50px_1fr_90px_28px] items-center gap-1.5">
            <Input
                value={field.name}
                onChange={(v) => update({ name: v })}
                placeholder="field"
                mono
            />
            <Select
                value={field.type}
                onChange={(v) => update({ type: v as SubProperty["type"] })}
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
            />
            <Button variant="danger" onClick={onDelete}>
                ×
            </Button>
        </div>
    );
}