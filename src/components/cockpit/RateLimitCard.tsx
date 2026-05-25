interface Props {
  provider: string;
  retryAfterSeconds: number;
  fallbackProvider?: string;
  isWeakerTier?: boolean;
  onSwitch: () => void;
}

export function RateLimitCard({ provider, retryAfterSeconds, fallbackProvider, isWeakerTier, onSwitch }: Props) {
  const minutes = Math.floor(retryAfterSeconds / 60);
  const seconds = retryAfterSeconds % 60;

  return (
    <div className="animate-slide-up fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-lg border px-5 py-3 text-sm shadow-lg"
      style={{
        background: "rgba(22, 27, 34, 0.98)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(210, 153, 34, 0.3)",
        color: "#c9d1d9",
      }}>
      <div className="flex items-center gap-3">
        <span className="text-lg">{'\u{1F6AB}'}</span>
        <div>
          <p className="font-medium text-[#d29922]">Rate Limited: {provider}</p>
          <p className="text-xs text-[#8b949e]">
            Retry in {minutes > 0 ? `${minutes}m ` : ""}{seconds}s
          </p>
        </div>
      </div>

      {fallbackProvider && (
        <div className="mt-2">
          {isWeakerTier && (
            <p className="text-xs text-[#d29922] mb-1">
              Warning: fallback model may produce different quality responses.
            </p>
          )}
          <button onClick={onSwitch}
            className="rounded px-3 py-1 text-xs font-medium bg-[#7cc7a010] text-[#7cc7a0] hover:bg-[#7cc7a020]">
            Switch to {fallbackProvider}
          </button>
        </div>
      )}
    </div>
  );
}