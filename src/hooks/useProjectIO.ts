/**
 * Handles project import / export as JSON files.
 */

import { useCallback } from "react";
import type { Endpoint, ProjectInfo } from "@/types";
import { normalizeEndpoint } from "@/utils/normalize";

interface UseProjectIOOptions {
    info: ProjectInfo;
    endpoints: Endpoint[];
    onImport: (info: ProjectInfo, endpoints: Endpoint[]) => void;
    onError: (message: string) => void;
}

export function useProjectIO({
                                 info,
                                 endpoints,
                                 onImport,
                                 onError,
                             }: UseProjectIOOptions) {
    const exportProject = useCallback(() => {
        const data = JSON.stringify({ info, endpoints }, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "api-project.json";
        anchor.click();
        URL.revokeObjectURL(url);
    }, [info, endpoints]);

    const importProject = useCallback(() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (ev) => {
                try {
                    const data = JSON.parse(ev.target?.result as string);
                    if (data.info && Array.isArray(data.endpoints)) {
                        const normalized = data.endpoints.map(normalizeEndpoint);
                        onImport(data.info, normalized);
                    } else {
                        onError("Invalid project file format.");
                    }
                } catch {
                    onError("Failed to parse project file.");
                }
            };
            reader.readAsText(file);
        };

        input.click();
    }, [onImport, onError]);

    return { exportProject, importProject };
}