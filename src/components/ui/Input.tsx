interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    mono?: boolean;
    className?: string;
}

export function Input({
                          value,
                          onChange,
                          placeholder,
                          type = "text",
                          disabled = false,
                          mono = false,
                          className = "",
                      }: InputProps) {
    return (
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={[
                "w-full rounded-md border border-[var(--border-light)] bg-[var(--bg-primary)]",
                "px-2 py-1 text-xs text-[var(--text-primary)] outline-none",
                "transition-colors focus:border-[var(--border-medium)]",
                "disabled:opacity-50",
                mono ? "font-mono" : "font-sans",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        />
    );
}