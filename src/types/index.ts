// ─── Sub-level field (no further nesting) ───────────────────────────────────
export interface SubProperty {
    id: string;
    name: string;
    type: FieldType;
    required: boolean;
    description: string;
    example: string;
}

// ─── Top-level field (supports array<object> and object nesting) ─────────────
export interface Property {
    id: string;
    name: string;
    type: FieldType;
    required: boolean;
    description: string;
    example: string;
    /** Used when type === 'array' */
    itemType: FieldType;
    /** Fields inside array items (when itemType === 'object') */
    itemProperties: SubProperty[];
    /** Fields inside object (when type === 'object') */
    subProperties: SubProperty[];
    /** UI state — whether nested panel is expanded */
    expanded: boolean;
}

// ─── Query / path / header / cookie parameter ────────────────────────────────
export interface Parameter {
    id: string;
    name: string;
    in: ParameterLocation;
    required: boolean;
    type: FieldType;
    description: string;
    example: string;
}

// ─── Request body definition ─────────────────────────────────────────────────
export interface RequestBody {
    enabled: boolean;
    required: boolean;
    description: string;
    bodyType: BodyType;
    properties: Property[];
}

// ─── Single response definition ──────────────────────────────────────────────
export interface Response {
    id: string;
    statusCode: string;
    description: string;
    responseType: BodyType;
    properties: Property[];
}

// ─── Full endpoint definition ─────────────────────────────────────────────────
export interface Endpoint {
    id: string;
    method: HttpMethod;
    path: string;
    summary: string;
    description: string;
    tags: string;
    operationId: string;
    parameters: Parameter[];
    requestBody: RequestBody;
    responses: Response[];
}

// ─── Top-level project info ───────────────────────────────────────────────────
export interface ProjectInfo {
    title: string;
    version: string;
    baseUrl: string;
    description: string;
}

// ─── Serializable project (for import/export) ────────────────────────────────
export interface ProjectData {
    info: ProjectInfo;
    endpoints: Endpoint[];
}

// ─── Literal union types ──────────────────────────────────────────────────────
export type HttpMethod =
    | "GET"
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE"
    | "HEAD"
    | "OPTIONS";

export type ParameterLocation = "query" | "path" | "header" | "cookie";

export type FieldType =
    | "string"
    | "integer"
    | "number"
    | "boolean"
    | "array"
    | "object";

export type BodyType = "object" | "array";

export type OutputFormat =
    | "openapi-json"
    | "openapi-yaml"
    | "postman"
    | "markdown";

export type NotificationType = "success" | "error";

export interface Notification {
    message: string;
    type: NotificationType;
}

export type AppTab = "builder" | "output";