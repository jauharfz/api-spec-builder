interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: (string | SelectOption)[];
    className?: string;
}

export function Select({ value, onChange, options, className = "" }: SelectProps) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={[
                "rounded-md border border-[var(--border-light)] bg-[var(--bg-primary)]",
                "px-1.5 py-1 text-xs text-[var(--text-primary)] outline-none cursor-pointer",
                "transition-colors focus:border-[var(--border-medium)]",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {options.map((opt) => {
                const val = typeof opt === "string" ? opt : opt.value;
                const label = typeof opt === "string" ? opt : opt.label;
                return (
                    <option key={val} value={val}>
                        {label}
                    </option>
                );
            })}
        </select>
    );
}