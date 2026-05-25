import React from "react";

// Glass panel with blur, border, rounded corners per PRD S20
export function GlassPanel({
  children, className = "", blur = "medium", rounded = "panel",
}: { children: React.ReactNode; className?: string; blur?: "heavy" | "medium" | "light" | "subtle"; rounded?: "badge" | "button" | "panel" }) {
  const blurMap = { heavy: 28, medium: 20, light: 10, subtle: 4 };
  const roundedMap = { badge: 4, button: 6, panel: 10 };

  return (
    <div
      className={`border ${className}`}
      style={{
        background: "rgba(22, 27, 34, 0.6)",
        backdropFilter: `blur(${blurMap[blur]}px)`,
        WebkitBackdropFilter: `blur(${blurMap[blur]}px)`,
        borderRadius: `${roundedMap[rounded]}px`,
        borderColor: "rgba(124, 199, 160, 0.08)",
      }}
    >
      {children}
    </div>
  );
}

export function GlassButton({
  children, onClick, variant = "primary", size = "md", disabled = false,
}: { children: React.ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "ghost"; size?: "sm" | "md" | "lg"; disabled?: boolean }) {
  const base = "rounded-md font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-opacity-50";
  const variants = {
    primary: "bg-[#7cc7a0] text-[#0d1117] hover:bg-[#6ab890] focus:ring-[#7cc7a0]",
    secondary: "border border-[#7cc7a033] text-[#c9d1d9] hover:bg-[#7cc7a010] focus:ring-[#7cc7a0]",
    ghost: "text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#ffffff05]",
  };
  const sizes = { sm: "px-2 py-1 text-xs", md: "px-3 py-1.5 text-sm", lg: "px-4 py-2 text-sm" };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function GlassInput({
  value, onChange, placeholder, className = "", type = "text",
}: { value: string; onChange: (v: string) => void; placeholder?: string; className?: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`rounded-md border px-3 py-1.5 text-sm text-[#c9d1d9] placeholder-[#484f58] outline-none focus:border-[#7cc7a040] focus:ring-1 focus:ring-[#7cc7a020] ${className}`}
      style={{
        background: "rgba(13, 17, 23, 0.8)",
        borderColor: "rgba(124, 199, 160, 0.12)",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    />
  );
}

export function GlassBadge({ children, color = "default" }: { children: React.ReactNode; color?: "default" | "green" | "red" | "yellow" }) {
  const colors = {
    default: { bg: "rgba(124,199,160,0.08)", text: "#7cc7a0" },
    green: { bg: "rgba(63,185,80,0.12)", text: "#3fb950" },
    red: { bg: "rgba(248,81,73,0.12)", text: "#f85149" },
    yellow: { bg: "rgba(210,153,34,0.12)", text: "#d29922" },
  };

  return (
    <span
      className="inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium"
      style={{ background: colors[color].bg, color: colors[color].text, fontFamily: "'JetBrains Mono', monospace" }}
    >
      {children}
    </span>
  );
}

export function Tooltip({ children, content }: { children: React.ReactNode; content: string }) {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full rounded-md px-2 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100 z-50 whitespace-nowrap"
        style={{ background: "rgba(13,17,23,0.95)", color: "#c9d1d9", borderColor: "rgba(124,199,160,0.12)", border: "1px solid" }}>
        {content}
      </div>
    </div>
  );
}