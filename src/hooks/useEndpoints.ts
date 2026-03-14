/**
 * Manages all endpoint CRUD operations and selection state.
 * Keeps business logic out of UI components.
 */

import { useState, useCallback } from "react";
import type { Endpoint, Parameter, Property, Response } from "@/types";
import { createEndpoint, createParameter, createProperty, createResponse } from "@/utils/factories";
import { uid } from "@/utils/uid";

export function useEndpoints(initialEndpoints: Endpoint[]) {
    const [endpoints, setEndpoints] = useState<Endpoint[]>(initialEndpoints);
    const [selectedId, setSelectedId] = useState<string | null>(
        initialEndpoints[0]?.id ?? null
    );

    const selected = endpoints.find((e) => e.id === selectedId) ?? null;

    // ─── Endpoint CRUD ──────────────────────────────────────────────────────────

    const updateEndpoint = useCallback(
        (id: string, changes: Partial<Endpoint>) => {
            setEndpoints((prev) =>
                prev.map((ep) => (ep.id === id ? { ...ep, ...changes } : ep))
            );
        },
        []
    );

    const updateSelected = useCallback(
        (changes: Partial<Endpoint>) => {
            if (selectedId) updateEndpoint(selectedId, changes);
        },
        [selectedId, updateEndpoint]
    );

    const addEndpoint = useCallback(() => {
        const ep = createEndpoint();
        setEndpoints((prev) => [...prev, ep]);
        setSelectedId(ep.id);
    }, []);

    const deleteEndpoint = useCallback(
        (id: string) => {
            setEndpoints((prev) => {
                const next = prev.filter((e) => e.id !== id);
                if (selectedId === id) {
                    setSelectedId(next[0]?.id ?? null);
                }
                return next;
            });
        },
        [selectedId]
    );

    const duplicateEndpoint = useCallback(
        (id: string) => {
            const source = endpoints.find((e) => e.id === id);
            if (!source) return;
            const copy: Endpoint = { ...JSON.parse(JSON.stringify(source)), id: uid() };
            setEndpoints((prev) => [...prev, copy]);
            setSelectedId(copy.id);
        },
        [endpoints]
    );

    // ─── Parameter operations ───────────────────────────────────────────────────

    const addParameter = useCallback(() => {
        if (!selected) return;
        updateSelected({ parameters: [...selected.parameters, createParameter()] });
    }, [selected, updateSelected]);

    const updateParameter = useCallback(
        (parameterId: string, changes: Partial<Parameter>) => {
            if (!selected) return;
            updateSelected({
                parameters: selected.parameters.map((p) => {
                    if (p.id !== parameterId) return p;
                    const merged = { ...p, ...changes };
                    // Path parameters are always required
                    if (merged.in === "path") merged.required = true;
                    return merged;
                }),
            });
        },
        [selected, updateSelected]
    );

    const deleteParameter = useCallback(
        (parameterId: string) => {
            if (!selected) return;
            updateSelected({
                parameters: selected.parameters.filter((p) => p.id !== parameterId),
            });
        },
        [selected, updateSelected]
    );

    // ─── Request body operations ────────────────────────────────────────────────

    const updateRequestBody = useCallback(
        (changes: Partial<Endpoint["requestBody"]>) => {
            if (!selected) return;
            updateSelected({
                requestBody: { ...selected.requestBody, ...changes },
            });
        },
        [selected, updateSelected]
    );

    const addRequestBodyProperty = useCallback(() => {
        if (!selected) return;
        updateRequestBody({
            properties: [...selected.requestBody.properties, createProperty()],
        });
    }, [selected, updateRequestBody]);

    const updateRequestBodyProperty = useCallback(
        (updated: Property) => {
            if (!selected) return;
            updateRequestBody({
                properties: selected.requestBody.properties.map((p) =>
                    p.id === updated.id ? updated : p
                ),
            });
        },
        [selected, updateRequestBody]
    );

    const deleteRequestBodyProperty = useCallback(
        (propertyId: string) => {
            if (!selected) return;
            updateRequestBody({
                properties: selected.requestBody.properties.filter(
                    (p) => p.id !== propertyId
                ),
            });
        },
        [selected, updateRequestBody]
    );

    // ─── Response operations ────────────────────────────────────────────────────

    const addResponse = useCallback(() => {
        if (!selected) return;
        updateSelected({ responses: [...selected.responses, createResponse()] });
    }, [selected, updateSelected]);

    const updateResponse = useCallback(
        (responseId: string, changes: Partial<Response>) => {
            if (!selected) return;
            updateSelected({
                responses: selected.responses.map((r) =>
                    r.id === responseId ? { ...r, ...changes } : r
                ),
            });
        },
        [selected, updateSelected]
    );

    const deleteResponse = useCallback(
        (responseId: string) => {
            if (!selected) return;
            updateSelected({
                responses: selected.responses.filter((r) => r.id !== responseId),
            });
        },
        [selected, updateSelected]
    );

    const addResponseProperty = useCallback(
        (responseId: string) => {
            if (!selected) return;
            updateSelected({
                responses: selected.responses.map((r) =>
                    r.id === responseId
                        ? { ...r, properties: [...r.properties, createProperty()] }
                        : r
                ),
            });
        },
        [selected, updateSelected]
    );

    const updateResponseProperty = useCallback(
        (responseId: string, updated: Property) => {
            if (!selected) return;
            updateSelected({
                responses: selected.responses.map((r) =>
                    r.id === responseId
                        ? {
                            ...r,
                            properties: r.properties.map((p) =>
                                p.id === updated.id ? updated : p
                            ),
                        }
                        : r
                ),
            });
        },
        [selected, updateSelected]
    );

    const deleteResponseProperty = useCallback(
        (responseId: string, propertyId: string) => {
            if (!selected) return;
            updateSelected({
                responses: selected.responses.map((r) =>
                    r.id === responseId
                        ? {
                            ...r,
                            properties: r.properties.filter((p) => p.id !== propertyId),
                        }
                        : r
                ),
            });
        },
        [selected, updateSelected]
    );

    return {
        // State
        endpoints,
        setEndpoints,
        selected,
        selectedId,
        setSelectedId,

        // Endpoint CRUD
        addEndpoint,
        deleteEndpoint,
        duplicateEndpoint,
        updateEndpoint,
        updateSelected,

        // Parameters
        addParameter,
        updateParameter,
        deleteParameter,

        // Request body
        updateRequestBody,
        addRequestBodyProperty,
        updateRequestBodyProperty,
        deleteRequestBodyProperty,

        // Responses
        addResponse,
        updateResponse,
        deleteResponse,
        addResponseProperty,
        updateResponseProperty,
        deleteResponseProperty,
    };
}