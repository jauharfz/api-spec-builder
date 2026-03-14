import type { ReactNode } from "react";

type ButtonVariant = "default" | "primary" | "danger" | "ghost";

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: ButtonVariant;
    disabled?: boolean;
    title?: string;
    className?: string;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
    default: [
        "bg-[var(--bg-primary)] text-[var(--text-secondary)]",
        "border border-[var(--border-light)]",
    ].join(" "),
    primary: [
        "bg-[var(--info-bg)] text-[var(--info-text)]",
        "border border-[var(--info-border)]",
    ].join(" "),
    danger: [
        "bg-transparent text-[var(--danger-text)]",
        "border border-[var(--danger-border)]",
    ].join(" "),
    ghost: [
        "bg-transparent text-[var(--text-secondary)]",
        "border border-transparent",
    ].join(" "),
};

export function Button({
                           children,
                           onClick,
                           variant = "default",
                           disabled = false,
                           title,
                           className = "",
                       }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={[
                "inline-flex items-center justify-center rounded-md px-2.5 py-1",
                "text-xs font-sans cursor-pointer transition-opacity",
                "disabled:opacity-55 disabled:cursor-not-allowed",
                VARIANT_CLASSES[variant],
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {children}
        </button>
    );
}