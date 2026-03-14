import { useState } from "react";
import type { AppTab, Endpoint, OutputFormat, ProjectInfo } from "@/types";
import { useEndpoints } from "@/hooks/useEndpoints";
import { useNotification } from "@/hooks/useNotification";
import { useProjectIO } from "@/hooks/useProjectIO";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NotificationToast } from "@/components/layout/Notification";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { EndpointEditor } from "@/components/editor/EndpointEditor";
import { OutputPanel } from "@/components/output/OutputPanel";
import { SAMPLE_ENDPOINTS, SAMPLE_PROJECT_INFO } from "@/data/sampleData";

export default function App() {
    const [info, setInfo] = useState<ProjectInfo>(SAMPLE_PROJECT_INFO);
    const [activeTab, setActiveTab] = useState<AppTab>("builder");
    const [activeFormat, setActiveFormat] = useState<OutputFormat>("openapi-json");

    const endpointStore = useEndpoints(SAMPLE_ENDPOINTS);
    const { notification, showNotification } = useNotification();

    const { exportProject, importProject } = useProjectIO({
        info,
        endpoints: endpointStore.endpoints,
        onImport: (importedInfo: ProjectInfo, importedEndpoints: Endpoint[]) => {
            setInfo(importedInfo);
            endpointStore.setEndpoints(importedEndpoints);
            if (importedEndpoints.length) {
                endpointStore.setSelectedId(importedEndpoints[0].id);
            }
            showNotification("Project imported successfully!", "success");
        },
        onError: (message: string) => showNotification(message, "error"),
    });

    return (
        <div className="flex h-screen flex-col bg-[var(--bg-tertiary)]">
            <Header
                title={info.title}
                version={info.version}
                endpointCount={endpointStore.endpoints.length}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onImport={importProject}
                onExport={exportProject}
            />

            {/* ── Builder tab ── */}
            {activeTab === "builder" && (
                <div className="grid min-h-0 flex-1 overflow-hidden [grid-template-columns:290px_1fr]">
                    <Sidebar
                        info={info}
                        endpoints={endpointStore.endpoints}
                        selectedId={endpointStore.selectedId}
                        onInfoChange={setInfo}
                        onSelect={endpointStore.setSelectedId}
                        onAdd={endpointStore.addEndpoint}
                        onDuplicate={endpointStore.duplicateEndpoint}
                        onDelete={endpointStore.deleteEndpoint}
                    />

                    {endpointStore.selected ? (
                        <EndpointEditor
                            endpoint={endpointStore.selected}
                            actions={{
                                updateSelected: endpointStore.updateSelected,
                                duplicateEndpoint: endpointStore.duplicateEndpoint,
                                deleteEndpoint: endpointStore.deleteEndpoint,
                                addParameter: endpointStore.addParameter,
                                updateParameter: endpointStore.updateParameter,
                                deleteParameter: endpointStore.deleteParameter,
                                updateRequestBody: endpointStore.updateRequestBody,
                                addRequestBodyProperty: endpointStore.addRequestBodyProperty,
                                updateRequestBodyProperty: endpointStore.updateRequestBodyProperty,
                                deleteRequestBodyProperty: endpointStore.deleteRequestBodyProperty,
                                addResponse: endpointStore.addResponse,
                                updateResponse: endpointStore.updateResponse,
                                deleteResponse: endpointStore.deleteResponse,
                                addResponseProperty: endpointStore.addResponseProperty,
                                updateResponseProperty: endpointStore.updateResponseProperty,
                                deleteResponseProperty: endpointStore.deleteResponseProperty,
                            }}
                        />
                    ) : (
                        <div className="flex items-center justify-center bg-[var(--bg-tertiary)] text-sm text-[var(--text-tertiary)]">
                            Select an endpoint from the sidebar
                        </div>
                    )}
                </div>
            )}

            {/* ── Output tab ── */}
            {activeTab === "output" && (
                <OutputPanel
                    info={info}
                    endpoints={endpointStore.endpoints}
                    activeFormat={activeFormat}
                    onFormatChange={setActiveFormat}
                />
            )}

            <Footer />
            <NotificationToast notification={notification} />
        </div>
    );
}