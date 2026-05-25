import { useEffect, useState } from "react";

interface Props {
  count: number;
  onReview: () => void;
  onDismiss: () => void;
}

export function MemoryToast({ count, onReview, onDismiss }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="animate-slide-up fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg"
      style={{
        background: "rgba(22, 27, 34, 0.95)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(124, 199, 160, 0.15)",
        color: "#c9d1d9",
      }}
    >
      <span>
        <span className="font-medium text-[#7cc7a0]">{count} memories</span> extracted — review when ready
      </span>
      <button
        onClick={onReview}
        className="rounded px-2 py-0.5 text-xs font-medium text-[#7cc7a0] hover:bg-[#7cc7a008]"
      >
        Review
      </button>
      <button
        onClick={() => { setVisible(false); onDismiss(); }}
        className="text-xs text-[#484f58] hover:text-[#8b949e]"
      >
        Dismiss
      </button>
    </div>
  );
}