/**
 * Clipboard copy hook with temporary "copied" feedback state.
 */

import { useState, useCallback } from "react";

const RESET_DELAY_MS = 2000;

export function useClipboard() {
    const [copied, setCopied] = useState(false);

    const copy = useCallback((text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), RESET_DELAY_MS);
        });
    }, []);

    return { copied, copy };
}