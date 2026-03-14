/**
 * Builds a full OpenAPI 3.0.3 specification object from project data.
 */

import type { Endpoint, ProjectInfo } from "@/types";
import { buildPropertySchema } from "./schemaBuilder";

type AnyObject = Record<string, unknown>;

function buildResponseSchema(
    properties: Endpoint["responses"][number]["properties"],
    responseType: "object" | "array"
): AnyObject {
    const named = properties.filter((p) => p.name);

    const objectSchema: AnyObject = { type: "object", properties: {} };
    const required = named.filter((p) => p.required).map((p) => p.name);

    named.forEach((p) => {
        (objectSchema.properties as AnyObject)[p.name] = buildPropertySchema(p);
    });

    if (required.length) objectSchema.required = required;

    return responseType === "array"
        ? { type: "array", items: objectSchema }
        : objectSchema;
}

function buildRequestBodySchema(
    properties: Endpoint["requestBody"]["properties"],
    bodyType: "object" | "array"
): AnyObject {
    const named = properties.filter((p) => p.name);
    const schema: AnyObject = { type: "object" };

    if (named.length) {
        schema.properties = {};
        named.forEach((p) => {
            (schema.properties as AnyObject)[p.name] = buildPropertySchema(p);
        });
        const required = named.filter((p) => p.required).map((p) => p.name);
        if (required.length) schema.required = required;
    }

    return bodyType === "array" ? { type: "array", items: schema } : schema;
}

function deriveOperationId(method: string, path: string): string {
    return (
        method.toLowerCase() +
        "_" +
        path
            .replace(/\//g, "_")
            .replace(/[{}]/g, "")
            .replace(/_+/g, "_")
            .replace(/^_|_$/g, "")
    );
}

export function buildOpenApiSpec(
    info: ProjectInfo,
    endpoints: Endpoint[]
): AnyObject {
    const spec: AnyObject = {
        openapi: "3.0.3",
        info: {
            title: info.title || "My API",
            version: info.version || "1.0.0",
            ...(info.description && { description: info.description }),
        },
        ...(info.baseUrl && { servers: [{ url: info.baseUrl }] }),
        paths: {},
    };

    // Collect unique tags
    const allTags = [
        ...new Set(
            endpoints.flatMap((e) =>
                e.tags
                    ? e.tags
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean)
                    : []
            )
        ),
    ];
    if (allTags.length) {
        spec.tags = allTags.map((name) => ({ name }));
    }

    const paths = spec.paths as AnyObject;

    endpoints.forEach((ep) => {
        const path = ep.path || "/";
        if (!paths[path]) paths[path] = {};

        const method = ep.method.toLowerCase();
        const operationId = ep.operationId || deriveOperationId(method, path);
        const tags = ep.tags
            ? ep.tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
            : [];

        const operation: AnyObject = {
            operationId,
            ...(ep.summary && { summary: ep.summary }),
            ...(ep.description && { description: ep.description }),
            ...(tags.length && { tags }),
            parameters: ep.parameters
                .filter((p) => p.name)
                .map((p) => ({
                    name: p.name,
                    in: p.in,
                    required: p.in === "path" ? true : p.required,
                    schema: { type: p.type },
                    ...(p.description && { description: p.description }),
                    ...(p.example && { example: p.example }),
                })),
            responses: {} as AnyObject,
        };

        // Build responses
        ep.responses.forEach((r) => {
            const named = r.properties.filter((p) => p.name);
            const responseObj: AnyObject = {
                description: r.description || "Response",
            };

            if (named.length) {
                responseObj.content = {
                    "application/json": {
                        schema: buildResponseSchema(r.properties, r.responseType),
                    },
                };
            }

            (operation.responses as AnyObject)[r.statusCode] = responseObj;
        });

        // Build request body (only for POST / PUT / PATCH)
        const bodyMethods = ["post", "put", "patch"];
        if (ep.requestBody.enabled && bodyMethods.includes(method)) {
            const named = ep.requestBody.properties.filter((p) => p.name);
            const schema = buildRequestBodySchema(
                ep.requestBody.properties,
                ep.requestBody.bodyType
            );

            operation.requestBody = {
                required: ep.requestBody.required,
                ...(ep.requestBody.description && {
                    description: ep.requestBody.description,
                }),
                ...(named.length && {
                    content: { "application/json": { schema } },
                }),
            };
        }

        (paths[path] as AnyObject)[method] = operation;
    });

    return spec;
}