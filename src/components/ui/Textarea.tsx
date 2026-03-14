interface TextareaProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minHeight?: number;
    className?: string;
}

export function Textarea({
                             value,
                             onChange,
                             placeholder,
                             minHeight = 48,
                             className = "",
                         }: TextareaProps) {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{ minHeight }}
            className={[
                "w-full resize-y rounded-md border border-[var(--border-light)]",
                "bg-[var(--bg-primary)] px-2 py-1 text-xs text-[var(--text-primary)]",
                "font-sans outline-none transition-colors focus:border-[var(--border-medium)]",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        />
    );
}