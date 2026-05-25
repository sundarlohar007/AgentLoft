import { useState, useEffect } from "react";
import { useSessionStore } from "@/stores/sessionStore";
import { useSettingsStore } from "@/stores/settingsStore";

export function StatusBar() {
  const { context, cost } = useSessionStore();
  const { expertise } = useSettingsStore();
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString()), 30000);
    return () => clearInterval(t);
  }, []);

  const healthColor = context.healthScore > 70 ? "#3fb950" : context.healthScore > 40 ? "#d29922" : "#f85149";

  if (expertise === "guided") {
    return (
      <div className="flex w-full items-center gap-4">
        <span>{time}</span>
        <span>Session: ${cost.totalUsd.toFixed(2)}</span>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center gap-4">
      <span>{time}</span>
      <span>Model: Claude Sonnet 4.6</span>
      <span>Tokens: {(context.used / 1000).toFixed(0)}k / {(context.limit / 1000).toFixed(0)}k</span>
      <span style={{ color: cost.cacheHitRate > 0.8 ? "#3fb950" : "#d29922" }}>
        Cache: {(cost.cacheHitRate * 100).toFixed(0)}%
      </span>
      <span>Cost: ${cost.totalUsd.toFixed(2)}</span>
      <span style={{ color: healthColor }}>Health: {context.healthScore}</span>
      <span>Git: main</span>
    </div>
  );
}