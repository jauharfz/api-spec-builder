/**
 * Normalization helpers for backward-compatible project import.
 * Ensures all required fields exist even when loading older saved files.
 */

import type { Endpoint, Property, SubProperty } from "@/types";
import { uid } from "./uid";

export function normalizeSubProperty(p: Partial<SubProperty>): SubProperty {
    return {
        id: p.id ?? uid(),
        name: p.name ?? "",
        type: p.type ?? "string",
        required: p.required ?? false,
        description: p.description ?? "",
        example: p.example ?? "",
    };
}

export function normalizeProperty(p: Partial<Property>): Property {
    return {
        id: p.id ?? uid(),
        name: p.name ?? "",
        type: p.type ?? "string",
        required: p.required ?? false,
        description: p.description ?? "",
        example: p.example ?? "",
        itemType: p.itemType ?? "string",
        itemProperties: (p.itemProperties ?? []).map(normalizeSubProperty),
        subProperties: (p.subProperties ?? []).map(normalizeSubProperty),
        expanded: false, // always reset UI state on import
    };
}

export function normalizeEndpoint(ep: Partial<Endpoint>): Endpoint {
    return {
        id: ep.id ?? uid(),
        method: ep.method ?? "GET",
        path: ep.path ?? "/resource",
        summary: ep.summary ?? "",
        description: ep.description ?? "",
        tags: ep.tags ?? "",
        operationId: ep.operationId ?? "",
        parameters: (ep.parameters ?? []).map((p) => ({
            id: p.id ?? uid(),
            name: p.name ?? "",
            in: p.in ?? "query",
            required: p.required ?? false,
            type: p.type ?? "string",
            description: p.description ?? "",
            example: p.example ?? "",
        })),
        requestBody: {
            enabled: ep.requestBody?.enabled ?? false,
            required: ep.requestBody?.required ?? true,
            description: ep.requestBody?.description ?? "",
            bodyType: ep.requestBody?.bodyType ?? "object",
            properties: (ep.requestBody?.properties ?? []).map(normalizeProperty),
        },
        responses: (ep.responses ?? []).map((r) => ({
            id: r.id ?? uid(),
            statusCode: r.statusCode ?? "200",
            description: r.description ?? "",
            responseType: r.responseType ?? "object",
            properties: (r.properties ?? []).map(normalizeProperty),
        })),
    };
}