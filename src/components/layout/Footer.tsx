export function Footer() {
    return (
        <footer className="flex flex-shrink-0 items-center justify-between border-t border-[var(--border-light)] bg-[var(--bg-primary)] px-4 py-1.5">
      <span className="text-[11px] text-[var(--text-tertiary)]">
        API Spec Builder · OpenAPI 3.0 · Postman · Markdown
      </span>
            <span className="text-[11px] text-[var(--text-tertiary)]">
         · Works offline
      </span>
        </footer>
    );
}