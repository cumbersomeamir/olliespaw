export default function FiltersBar() {
  const filters = ["Price", "Category", "Size"];
  return (
    <div className="flex flex-wrap items-center gap-3">
      {filters.map((f) => (
        <button
          key={f}
          className="inline-flex items-center gap-2 rounded-md border border-foreground/20 bg-background px-4 py-2 text-sm text-foreground hover:border-foreground/40"
        >
          <span>{f}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" className="opacity-70">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      ))}
    </div>
  );
}


