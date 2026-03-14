/**
 * Single entry-point for generating all output formats.
 */

import type { Endpoint, OutputFormat, ProjectInfo } from "@/types";
import { buildOpenApiSpec } from "./openApiBuilder";
import { buildPostmanCollection } from "./postmanBuilder";
import { buildMarkdownDocs } from "./markdownBuilder";
import { toYaml } from "./yamlSerializer";

export function generateOutput(
    format: OutputFormat,
    info: ProjectInfo,
    endpoints: Endpoint[]
): string {
    switch (format) {
        case "openapi-json":
            return JSON.stringify(buildOpenApiSpec(info, endpoints), null, 2);

        case "openapi-yaml":
            return toYaml(buildOpenApiSpec(info, endpoints) as Parameters<typeof toYaml>[0]);

        case "postman":
            return JSON.stringify(buildPostmanCollection(info, endpoints), null, 2);

        case "markdown":
            return buildMarkdownDocs(info, endpoints);

        default:
            return "";
    }
}