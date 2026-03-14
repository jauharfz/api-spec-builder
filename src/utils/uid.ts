/** Generates a short random alphanumeric ID (7 chars). */
export function uid(): string {
    return Math.random().toString(36).slice(2, 9);
}