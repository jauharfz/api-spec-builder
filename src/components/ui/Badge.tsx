import type { HttpMethod } from "@/types";
import { METHOD_BADGE_STYLES } from "@/constants";

interface BadgeProps {
    method: HttpMethod;
}

export function Badge({ method }: BadgeProps) {
    const { bg, color } = METHOD_BADGE_STYLES[method] ?? METHOD_BADGE_STYLES.GET;

    return (
        <span
            style={{ background: bg, color }}
            className="inline-block min-w-[52px] rounded px-1.5 py-0.5 text-center font-mono text-[10px] font-bold tracking-wider"
        >
      {method}
    </span>
    );
}