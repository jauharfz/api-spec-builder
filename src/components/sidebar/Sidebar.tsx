import type { Endpoint, ProjectInfo } from "@/types";
import { ProjectInfoPanel } from "./ProjectInfo";
import { EndpointList } from "./EndpointList";

interface SidebarProps {
    info: ProjectInfo;
    endpoints: Endpoint[];
    selectedId: string | null;
    onInfoChange: (info: ProjectInfo) => void;
    onSelect: (id: string) => void;
    onAdd: () => void;
    onDuplicate: (id: string) => void;
    onDelete: (id: string) => void;
}

export function Sidebar({
                            info,
                            endpoints,
                            selectedId,
                            onInfoChange,
                            onSelect,
                            onAdd,
                            onDuplicate,
                            onDelete,
                        }: SidebarProps) {
    return (
        <aside className="flex flex-col overflow-hidden border-r border-[var(--border-light)] bg-[var(--bg-primary)]">
            <ProjectInfoPanel info={info} onChange={onInfoChange} />
            <EndpointList
                endpoints={endpoints}
                selectedId={selectedId}
                onSelect={onSelect}
                onAdd={onAdd}
                onDuplicate={onDuplicate}
                onDelete={onDelete}
            />
        </aside>
    );
}