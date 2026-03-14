import type { Endpoint, Parameter, Property, Response, SubProperty } from "@/types";
import { uid } from "./uid";

/** Creates a blank sub-property (leaf-level field). */
export function createSubProperty(): SubProperty {
    return {
        id: uid(),
        name: "",
        type: "string",
        required: false,
        description: "",
        example: "",
    };
}

/** Creates a blank top-level property (supports nesting). */
export function createProperty(): Property {
    return {
        id: uid(),
        name: "",
        type: "string",
        required: false,
        description: "",
        example: "",
        itemType: "string",
        itemProperties: [],
        subProperties: [],
        expanded: false,
    };
}

/** Creates a blank query/path/header/cookie parameter. */
export function createParameter(): Parameter {
    return {
        id: uid(),
        name: "",
        in: "query",
        required: false,
        type: "string",
        description: "",
        example: "",
    };
}

/** Creates a blank response with a 200 status. */
export function createResponse(): Response {
    return {
        id: uid(),
        statusCode: "200",
        description: "Success",
        responseType: "object",
        properties: [],
    };
}

/** Creates a blank endpoint with sensible defaults. */
export function createEndpoint(): Endpoint {
    return {
        id: uid(),
        method: "GET",
        path: "/resource",
        summary: "",
        description: "",
        tags: "",
        operationId: "",
        parameters: [],
        requestBody: {
            enabled: false,
            required: true,
            description: "",
            bodyType: "object",
            properties: [],
        },
        responses: [
            {
                id: uid(),
                statusCode: "200",
                description: "Successful response",
                responseType: "object",
                properties: [],
            },
        ],
    };
}