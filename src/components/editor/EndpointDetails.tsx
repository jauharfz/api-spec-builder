import type { Endpoint } from "@/types";
import { HTTP_METHODS } from "@/constants";
import { Card, FieldLabel, Input, Select, SectionLabel, Textarea } from "@/components/ui";

interface EndpointDetailsProps {
    endpoint: Endpoint;
    onChange: (changes: Partial<Endpoint>) => void;
}

export function EndpointDetails({ endpoint, onChange }: EndpointDetailsProps) {
    return (
        <Card>
            <SectionLabel>Endpoint Details</SectionLabel>

            {/* Method + Path */}
            <div className="mb-2.5 grid grid-cols-[120px_1fr] gap-2.5">
                <div>
                    <FieldLabel>Method</FieldLabel>
                    <Select
                        value={endpoint.method}
                        onChange={(v) => onChange({ method: v as Endpoint["method"] })}
                        options={HTTP_METHODS}
                        className="w-full"
                    />
                </div>
                <div>
                    <FieldLabel>Path</FieldLabel>
                    <Input
                        value={endpoint.path}
                        onChange={(v) => onChange({ path: v })}
                        placeholder="/resource/{id}"
                        mono
                    />
                </div>
            </div>

            {/* Summary + Tags */}
            <div className="mb-2.5 grid grid-cols-2 gap-2.5">
                <div>
                    <FieldLabel>Summary</FieldLabel>
                    <Input
                        value={endpoint.summary}
                        onChange={(v) => onChange({ summary: v })}
                        placeholder="Short summary"
                    />
                </div>
                <div>
                    <FieldLabel>Tags (comma-separated)</FieldLabel>
                    <Input
                        value={endpoint.tags}
                        onChange={(v) => onChange({ tags: v })}
                        placeholder="users, admin"
                    />
                </div>
            </div>

            {/* Operation ID */}
            <div className="mb-2.5">
                <FieldLabel>Operation ID</FieldLabel>
                <Input
                    value={endpoint.operationId}
                    onChange={(v) => onChange({ operationId: v })}
                    placeholder="Auto-generated if empty"
                    mono
                />
            </div>

            {/* Description */}
            <div>
                <FieldLabel>Description</FieldLabel>
                <Textarea
                    value={endpoint.description}
                    onChange={(v) => onChange({ description: v })}
                    placeholder="Detailed description..."
                />
            </div>
        </Card>
    );
}