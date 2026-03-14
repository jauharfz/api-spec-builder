/**
 * Builds a Postman Collection v2.1 object from project data.
 */

import type { Endpoint, ProjectInfo } from "@/types";
import { buildExampleValue } from "./schemaBuilder";

export function buildPostmanCollection(
    info: ProjectInfo,
    endpoints: Endpoint[]
) {
    return {
        info: {
            name: info.title || "API",
            schema:
                "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
        },
        variable: [
            {
                key: "baseUrl",
                value: info.baseUrl || "http://localhost:3000",
            },
        ],
        item: endpoints.map((ep) => {
            const namedProps = ep.requestBody.properties.filter((p) => p.name);

            // Build example request body
            const bodyObject: Record<string, unknown> = {};
            namedProps.forEach((p) => {
                bodyObject[p.name] = buildExampleValue(p);
            });
            const bodyRaw =
                ep.requestBody.bodyType === "array" ? [bodyObject] : bodyObject;

            return {
                name: ep.summary || `${ep.method} ${ep.path}`,
                request: {
                    method: ep.method,
                    header: [{ key: "Content-Type", value: "application/json" }],
                    url: {
                        raw: `{{baseUrl}}${ep.path}`,
                        host: ["{{baseUrl}}"],
                        path: ep.path.split("/").filter(Boolean),
                        query: ep.parameters
                            .filter((p) => p.in === "query" && p.name)
                            .map((p) => ({
                                key: p.name,
                                value: p.example || "",
                                description: p.description || "",
                            })),
                    },
                    ...(namedProps.length && {
                        body: {
                            mode: "raw",
                            raw: JSON.stringify(bodyRaw, null, 2),
                            options: { raw: { language: "json" } },
                        },
                    }),
                },
            };
        }),
    };
}