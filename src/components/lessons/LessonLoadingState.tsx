export default function LessonLoadingState() {
  return (
    <div
      className="min-w-0 overflow-hidden rounded-2xl border border-base-300 bg-base-200/60 p-4 sm:p-5"
      role="status"
      aria-live="polite"
      aria-busy="true"
      data-lesson-loading-state
    >
      <span className="sr-only">Loading interactive lesson lab</span>

      <div className="animate-pulse space-y-4" aria-hidden="true">
        <div className="h-4 w-2/5 rounded bg-base-content/10" />
        <div className="grid gap-3 sm:grid-cols-[1.2fr_.8fr]">
          <div className="h-52 rounded-2xl bg-base-content/10" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
            <div className="h-20 rounded-2xl bg-base-content/10" />
            <div className="h-20 rounded-2xl bg-base-content/10" />
            <div className="h-20 rounded-2xl bg-base-content/10" />
          </div>
        </div>
        <div className="h-3 w-full rounded bg-base-content/10" />
        <div className="h-10 w-3/4 rounded bg-base-content/10" />
      </div>
    </div>
  );
}
