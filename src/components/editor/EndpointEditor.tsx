import type { Endpoint } from "@/types";
import { BODY_METHODS } from "@/constants";
import { Badge, Button } from "@/components/ui";
import { EndpointDetails } from "./EndpointDetails";
import { ParametersSection } from "./ParametersSection";
import { RequestBodySection } from "./RequestBodySection";
import { ResponsesSection } from "./ResponsesSection";
import type { useEndpoints } from "@/hooks/useEndpoints";

type EndpointActions = Pick<
    ReturnType<typeof useEndpoints>,
    | "updateSelected"
    | "duplicateEndpoint"
    | "deleteEndpoint"
    | "addParameter"
    | "updateParameter"
    | "deleteParameter"
    | "updateRequestBody"
    | "addRequestBodyProperty"
    | "updateRequestBodyProperty"
    | "deleteRequestBodyProperty"
    | "addResponse"
    | "updateResponse"
    | "deleteResponse"
    | "addResponseProperty"
    | "updateResponseProperty"
    | "deleteResponseProperty"
>;

interface EndpointEditorProps {
    endpoint: Endpoint;
    actions: EndpointActions;
}

export function EndpointEditor({ endpoint, actions }: EndpointEditorProps) {
    const supportsBody = BODY_METHODS.includes(endpoint.method);

    return (
        <div className="overflow-y-auto bg-[var(--bg-tertiary)] px-5 py-4">
            {/* Editor header */}
            <div className="mb-4 flex items-center gap-2.5">
                <Badge method={endpoint.method} />
                <span className="flex-1 font-mono text-[15px] font-semibold text-[var(--text-primary)]">
          {endpoint.path}
        </span>
                <div className="ml-auto flex gap-1.5">
                    <Button onClick={() => actions.duplicateEndpoint(endpoint.id)}>
                        Duplicate
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => actions.deleteEndpoint(endpoint.id)}
                    >
                        Delete
                    </Button>
                </div>
            </div>

            {/* Sections */}
            <EndpointDetails
                endpoint={endpoint}
                onChange={actions.updateSelected}
            />

            <ParametersSection
                parameters={endpoint.parameters}
                onAdd={actions.addParameter}
                onUpdate={actions.updateParameter}
                onDelete={actions.deleteParameter}
            />

            {supportsBody && (
                <RequestBodySection
                    requestBody={endpoint.requestBody}
                    onUpdate={actions.updateRequestBody}
                    onAddProperty={actions.addRequestBodyProperty}
                    onUpdateProperty={actions.updateRequestBodyProperty}
                    onDeleteProperty={actions.deleteRequestBodyProperty}
                />
            )}

            <ResponsesSection
                responses={endpoint.responses}
                onAdd={actions.addResponse}
                onUpdate={actions.updateResponse}
                onDelete={actions.deleteResponse}
                onAddProperty={actions.addResponseProperty}
                onUpdateProperty={actions.updateResponseProperty}
                onDeleteProperty={actions.deleteResponseProperty}
            />
        </div>
    );
}