import { GlassPanel, GlassButton } from "@/components/shared/primitives";
import { useState } from "react";

interface ConnectionProfile {
  id: string;
  name: string;
  models: { primary: string; secondary?: string; tertiary?: string; fallback?: string };
  autoFallback: boolean;
  retryQueueMax: number;
  rateLimitDetection: Record<string, boolean>;
}

interface Props {
  profile: ConnectionProfile;
  onSave: (profile: ConnectionProfile) => void;
}

const ALL_MODELS = [
  "claude_code/claude-sonnet-4-6",
  "claude_code/claude-haiku-4-5",
  "codex_cli/gpt-4o",
  "codex_cli/gpt-4o-mini",
  "antigravity_cli/gemini-3-flash",
  "antigravity_cli/gemini-3-pro",
  "ollama/llama-3.3-70b",
  "ollama/qwen-3-14b",
  "groq/llama-3.3-70b",
  "together/mixtral-8x22b",
];

export function ConnectionProfileEditor({ profile: initial, onSave }: Props) {
  const [profile, setProfile] = useState<ConnectionProfile>(initial);

  return (
    <GlassPanel className="p-4 space-y-3" blur="medium">
      <h3 className="text-sm font-semibold text-[#c9d1d9]">Connection Profile</h3>

      <div>
        <label className="text-xs text-[#8b949e]">Profile Name</label>
        <input
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="w-full rounded border bg-[#0d1117] px-2 py-1 text-xs text-[#c9d1d9] outline-none font-mono mt-0.5"
          style={{ borderColor: "rgba(124, 199, 160, 0.12)" }}
        />
      </div>

      {(["primary", "secondary", "tertiary", "fallback"] as const).map((tier) => (
        <div key={tier}>
          <label className="text-xs text-[#8b949e]">{tier} model</label>
          <select
            value={(profile.models[tier] as string) || ""}
            onChange={(e) => setProfile({
              ...profile,
              models: { ...profile.models, [tier]: e.target.value || undefined },
            })}
            className="w-full rounded border bg-[#0d1117] px-2 py-1 text-xs text-[#c9d1d9] outline-none mt-0.5"
            style={{ borderColor: "rgba(124, 199, 160, 0.12)" }}
          >
            <option value="">None</option>
            {ALL_MODELS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      ))}

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={profile.autoFallback}
          onChange={(e) => setProfile({ ...profile, autoFallback: e.target.checked })}
          className="accent-[#7cc7a0]"
        />
        <label className="text-xs text-[#8b949e]">Auto-fallback on rate limit</label>
      </div>

      <div>
        <label className="text-xs text-[#8b949e]">Retry queue max</label>
        <input
          type="number"
          value={profile.retryQueueMax}
          onChange={(e) => setProfile({ ...profile, retryQueueMax: parseInt(e.target.value) || 10 })}
          className="w-20 rounded border bg-[#0d1117] px-2 py-1 text-xs text-[#c9d1d9] outline-none font-mono ml-2"
          style={{ borderColor: "rgba(124, 199, 160, 0.12)" }}
        />
      </div>

      <GlassButton variant="primary" onClick={() => onSave(profile)}>Save Profile</GlassButton>
    </GlassPanel>
  );
}