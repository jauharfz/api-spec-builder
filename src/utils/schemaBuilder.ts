/**
 * Converts a Property definition into an OpenAPI-compatible JSON Schema object,
 * and generates example values for Postman / Markdown output.
 */

import type { Property, SubProperty } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────────

type JsonSchemaObject = Record<string, unknown>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildSubPropertySchema(p: SubProperty): JsonSchemaObject {
    const schema: JsonSchemaObject = { type: p.type };
    if (p.description) schema.description = p.description;
    if (p.example !== "" && p.example !== undefined) schema.example = p.example;
    return schema;
}

function buildObjectSchema(subProperties: SubProperty[]): JsonSchemaObject {
    const named = subProperties.filter((sp) => sp.name);
    if (!named.length) return { type: "object" };

    const schema: JsonSchemaObject = { type: "object", properties: {} };
    const required: string[] = [];

    named.forEach((sp) => {
        (schema.properties as Record<string, unknown>)[sp.name] =
            buildSubPropertySchema(sp);
        if (sp.required) required.push(sp.name);
    });

    if (required.length) schema.required = required;
    return schema;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Builds an OpenAPI JSON Schema node from a Property definition.
 * Handles nested array<object> and object with sub-properties.
 */
export function buildPropertySchema(p: Property): JsonSchemaObject {
    const schema: JsonSchemaObject = { type: p.type };

    if (p.description) schema.description = p.description;
    if (p.example !== "" && p.example !== undefined) schema.example = p.example;

    if (p.type === "array") {
        const itemType = p.itemType ?? "string";
        schema.items =
            itemType === "object"
                ? buildObjectSchema(p.itemProperties ?? [])
                : { type: itemType };
    }

    if (p.type === "object") {
        const nested = buildObjectSchema(p.subProperties ?? []);
        if (nested.properties) {
            schema.properties = nested.properties;
            if (nested.required) schema.required = nested.required;
        }
    }

    return schema;
}

/**
 * Generates a representative example value for a property.
 * Used in Postman body generation and Markdown code blocks.
 */
export function buildExampleValue(p: Property): unknown {
    if (p.type === "array") {
        const itemType = p.itemType ?? "string";
        if (itemType === "object") {
            const obj: Record<string, unknown> = {};
            (p.itemProperties ?? [])
                .filter((ip) => ip.name)
                .forEach((ip) => {
                    obj[ip.name] = ip.example || `<${ip.type}>`;
                });
            return [Object.keys(obj).length ? obj : { field: "<value>" }];
        }
        return [p.example || `<${itemType}>`];
    }

    if (p.type === "object") {
        const obj: Record<string, unknown> = {};
        (p.subProperties ?? [])
            .filter((sp) => sp.name)
            .forEach((sp) => {
                obj[sp.name] = sp.example || `<${sp.type}>`;
            });
        return Object.keys(obj).length ? obj : {};
    }

    return p.example || `<${p.type}>`;
}