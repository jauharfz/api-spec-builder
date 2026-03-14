/**
 * Minimal YAML serializer for OpenAPI spec output.
 * Handles strings, numbers, booleans, arrays, and nested objects.
 */

type YamlValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | YamlValue[]
    | { [key: string]: YamlValue };

const YAML_SPECIAL_CHARS = /[:{}[\],&*#?|<>=!%@`"']/;

function needsQuoting(str: string): boolean {
    return (
        !str ||
        YAML_SPECIAL_CHARS.test(str) ||
        str.startsWith("-") ||
        str.includes("\n") ||
        /^\s|\s$/.test(str)
    );
}

function serializeScalar(value: string | number | boolean | null | undefined): string {
    if (value === null || value === undefined) return "null";
    if (typeof value === "boolean" || typeof value === "number") return String(value);
    if (typeof value === "string") {
        if (needsQuoting(value)) return `'${value.replace(/'/g, "''")}'`;
        return value;
    }
    return String(value);
}

export function toYaml(value: YamlValue, depth = 0): string {
    const indent = "  ".repeat(depth);

    if (value === null || value === undefined) return "null";
    if (typeof value !== "object") return serializeScalar(value);

    if (Array.isArray(value)) {
        if (!value.length) return "[]";
        return value
            .map((item) => {
                if (typeof item === "object" && item !== null) {
                    const serialized = toYaml(item, depth + 1);
                    const lines = serialized.split("\n");
                    return `${indent}- ${lines[0].trimStart()}\n${lines.slice(1).join("\n")}`.trimEnd();
                }
                return `${indent}- ${serializeScalar(item as string | number | boolean | null)}`;
            })
            .join("\n");
    }

    const keys = Object.keys(value as object);
    if (!keys.length) return "{}";

    return keys
        .map((key) => {
            const val = (value as Record<string, YamlValue>)[key];
            if (typeof val === "object" && val !== null) {
                return `${indent}${key}:\n${toYaml(val, depth + 1)}`;
            }
            return `${indent}${key}: ${serializeScalar(val as string | number | boolean | null)}`;
        })
        .join("\n");
}