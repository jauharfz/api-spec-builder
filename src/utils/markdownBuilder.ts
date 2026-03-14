/**
 * Builds a Markdown documentation string from project data.
 */

import type { Endpoint, ProjectInfo, Property } from "@/types";
import { buildExampleValue } from "./schemaBuilder";

function buildPropertiesTable(properties: Property[]): string {
    let table =
        "| Name | Type | Required | Description |\n" +
        "|------|------|:--------:|-------------|\n";

    properties.forEach((p) => {
        const typeLabel =
            p.type === "array" ? `array\\<${p.itemType ?? "string"}\\>` : p.type;

        table += `| \`${p.name}\` | \`${typeLabel}\` | ${p.required ? "✓" : "—"} | ${p.description || ""} |\n`;

        // Show array item fields inline
        if (
            p.type === "array" &&
            p.itemType === "object" &&
            (p.itemProperties ?? []).some((ip) => ip.name)
        ) {
            table += `| *(item fields)* | | | |\n`;
            (p.itemProperties ?? [])
                .filter((ip) => ip.name)
                .forEach((ip) => {
                    table += `| &nbsp;&nbsp;\`${ip.name}\` | \`${ip.type}\` | ${ip.required ? "✓" : "—"} | ${ip.description || ""} |\n`;
                });
        }

        // Show object sub-properties inline
        if (
            p.type === "object" &&
            (p.subProperties ?? []).some((sp) => sp.name)
        ) {
            table += `| *(properties)* | | | |\n`;
            (p.subProperties ?? [])
                .filter((sp) => sp.name)
                .forEach((sp) => {
                    table += `| &nbsp;&nbsp;\`${sp.name}\` | \`${sp.type}\` | ${sp.required ? "✓" : "—"} | ${sp.description || ""} |\n`;
                });
        }
    });

    return table + "\n";
}

function buildPropertiesBlock(
    properties: Property[],
    bodyType: "object" | "array"
): string {
    const named = properties.filter((p) => p.name);
    if (!named.length) return "";

    const exampleObj: Record<string, unknown> = {};
    named.forEach((p) => {
        exampleObj[p.name] = buildExampleValue(p);
    });

    const wrapped = bodyType === "array" ? [exampleObj] : exampleObj;

    return (
        buildPropertiesTable(named) +
        "```json\n" +
        JSON.stringify(wrapped, null, 2) +
        "\n```\n\n"
    );
}

export function buildMarkdownDocs(
    info: ProjectInfo,
    endpoints: Endpoint[]
): string {
    let md = `# ${info.title || "API Documentation"}\n\n`;

    if (info.version) md += `**Version:** \`${info.version}\`  \n`;
    if (info.baseUrl) md += `**Base URL:** \`${info.baseUrl}\`  \n`;
    if (info.description) md += `\n${info.description}\n`;

    md += "\n---\n\n## Endpoints\n\n";

    endpoints.forEach((ep) => {
        md += `### \`${ep.method}\` ${ep.path}\n\n`;
        if (ep.summary) md += `**${ep.summary}**\n\n`;
        if (ep.description) md += `${ep.description}\n\n`;
        if (ep.tags) md += `**Tags:** ${ep.tags}\n\n`;

        // Parameters table
        const namedParams = ep.parameters.filter((p) => p.name);
        if (namedParams.length) {
            md +=
                "#### Parameters\n\n" +
                "| Name | In | Type | Required | Description |\n" +
                "|------|-----|------|:--------:|-------------|\n";
            namedParams.forEach((p) => {
                md += `| \`${p.name}\` | ${p.in} | \`${p.type}\` | ${p.required ? "✓" : "—"} | ${p.description || ""} |\n`;
            });
            md += "\n";
        }

        // Request body
        if (ep.requestBody.enabled) {
            md += "#### Request Body\n\n";
            if (ep.requestBody.description) md += `${ep.requestBody.description}\n\n`;
            md += buildPropertiesBlock(
                ep.requestBody.properties,
                ep.requestBody.bodyType
            );
        }

        // Responses
        if (ep.responses.length) {
            md += "#### Responses\n\n";
            ep.responses.forEach((r) => {
                md += `**\`${r.statusCode}\`** ${r.description}\n\n`;
                md += buildPropertiesBlock(r.properties, r.responseType);
            });
        }

        md += "---\n\n";
    });

    return md;
}