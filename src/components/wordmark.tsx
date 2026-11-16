export function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2 font-semibold tracking-tight">
      <svg aria-hidden viewBox="0 0 24 24" className="size-6 text-brand">
        <path
          d="M8 8V6.5a4 4 0 0 1 8 0V8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="3.5" y="8" width="17" height="13" rx="3" fill="currentColor" />
      </svg>
      <span className="text-lg">
        Better<span className="text-brand">Web</span>
      </span>
    </span>
  );
}
