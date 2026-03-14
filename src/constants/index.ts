import type { FieldType, HttpMethod, OutputFormat, ParameterLocation } from "@/types";

// ─── HTTP Methods ─────────────────────────────────────────────────────────────
export const HTTP_METHODS: HttpMethod[] = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "HEAD",
    "OPTIONS",
];

/** Methods that support a request body */
export const BODY_METHODS: HttpMethod[] = ["POST", "PUT", "PATCH"];

// ─── Parameter locations ──────────────────────────────────────────────────────
export const PARAMETER_LOCATIONS: ParameterLocation[] = [
    "query",
    "path",
    "header",
    "cookie",
];

// ─── Field / schema types ─────────────────────────────────────────────────────
export const FIELD_TYPES: FieldType[] = [
    "string",
    "integer",
    "number",
    "boolean",
    "array",
    "object",
];

// ─── Output formats ───────────────────────────────────────────────────────────
export const OUTPUT_FORMATS: { key: OutputFormat; label: string }[] = [
    { key: "openapi-json", label: "OpenAPI 3.0 JSON" },
    { key: "openapi-yaml", label: "OpenAPI 3.0 YAML" },
    { key: "postman", label: "Postman Collection" },
    { key: "markdown", label: "Markdown Docs" },
];

export const OUTPUT_FILE_NAMES: Record<OutputFormat, string> = {
    "openapi-json": "openapi-spec.json",
    "openapi-yaml": "openapi-spec.yaml",
    postman: "postman-collection.json",
    markdown: "api-docs.md",
};

// ─── Method badge styles ──────────────────────────────────────────────────────
export const METHOD_BADGE_STYLES: Record<
    HttpMethod,
    { bg: string; color: string }
> = {
    GET: { bg: "#eaf3de", color: "#3b6d11" },
    POST: { bg: "#e6f1fb", color: "#185fa5" },
    PUT: { bg: "#faeeda", color: "#854f0b" },
    PATCH: { bg: "#f1eefc", color: "#534ab7" },
    DELETE: { bg: "#fcebeb", color: "#a32d2d" },
    HEAD: { bg: "#f5f5f3", color: "#6b6b67" },
    OPTIONS: { bg: "#f5f5f3", color: "#6b6b67" },
};

// ─── Status code badge styles (by first digit) ───────────────────────────────
export const STATUS_CODE_STYLES: Record<
    string,
    { bg: string; color: string }
> = {
    "2": { bg: "#eaf3de", color: "#3b6d11" },
    "3": { bg: "#e6f1fb", color: "#185fa5" },
    "4": { bg: "#faeeda", color: "#854f0b" },
    "5": { bg: "#fcebeb", color: "#a32d2d" },
};

export const DEFAULT_STATUS_STYLE = { bg: "#f5f5f3", color: "#6b6b67" };

/** Returns the badge style for a given HTTP status code string */
export function getStatusCodeStyle(code: string) {
    return STATUS_CODE_STYLES[code[0]] ?? DEFAULT_STATUS_STYLE;
}

// ─── Notification auto-dismiss duration (ms) ─────────────────────────────────
export const NOTIFICATION_DURATION_MS = 3000;