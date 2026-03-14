import type { Endpoint } from "@/types";
import { Badge, Button } from "@/components/ui";

interface EndpointListProps {
    endpoints: Endpoint[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    onAdd: () => void;
    onDuplicate: (id: string) => void;
    onDelete: (id: string) => void;
}

export function EndpointList({
                                 endpoints,
                                 selectedId,
                                 onSelect,
                                 onAdd,
                                 onDuplicate,
                                 onDelete,
                             }: EndpointListProps) {
    return (
        <>
            {/* List header */}
            <div className="flex flex-shrink-0 items-center justify-between px-3.5 pb-1.5 pt-2.5">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)]">
          Endpoints ({endpoints.length})
        </span>
                <Button onClick={onAdd}>+ Add</Button>
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto px-2 pb-2.5">
                {endpoints.length === 0 ? (
                    <p className="py-6 text-center text-xs text-[var(--text-tertiary)]">
                        No endpoints.
                        <br />
                        Click + Add to start.
                    </p>
                ) : (
                    endpoints.map((ep) => (
                        <EndpointListItem
                            key={ep.id}
                            endpoint={ep}
                            isSelected={ep.id === selectedId}
                            onSelect={() => onSelect(ep.id)}
                            onDuplicate={() => onDuplicate(ep.id)}
                            onDelete={() => onDelete(ep.id)}
                        />
                    ))
                )}
            </div>
        </>
    );
}

// ─── Single list item ─────────────────────────────────────────────────────────

interface EndpointListItemProps {
    endpoint: Endpoint;
    isSelected: boolean;
    onSelect: () => void;
    onDuplicate: () => void;
    onDelete: () => void;
}

function EndpointListItem({
                              endpoint,
                              isSelected,
                              onSelect,
                              onDuplicate,
                              onDelete,
                          }: EndpointListItemProps) {
    return (
        <div
            onClick={onSelect}
            className={[
                "mb-0.5 flex cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-1.5 transition-all",
                isSelected
                    ? "border-[var(--border-medium)] bg-[var(--bg-secondary)]"
                    : "border-transparent bg-transparent hover:bg-[var(--bg-secondary)]",
            ].join(" ")}
        >
            <Badge method={endpoint.method} />
            <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-xs text-[var(--text-secondary)]">
        {endpoint.path}
      </span>

            {/* Action buttons */}
            <div className="flex flex-shrink-0 gap-1 opacity-70">
                <button
                    title="Duplicate"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDuplicate();
                    }}
                    className="flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-[var(--border-light)] bg-transparent text-xs text-[var(--text-tertiary)]"
                >
                    ⊕
                </button>
                <button
                    title="Delete"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    className="flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-[var(--danger-border)] bg-transparent text-sm text-[var(--danger-text)]"
                >
                    ×
                </button>
            </div>
        </div>
    );
}