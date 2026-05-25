import { useSettingsStore } from "@/stores/settingsStore";
import type { ExpertiseLevel } from "@/stores/settingsStore";

export function ExpertiseToggle() {
  const { expertise, setExpertise } = useSettingsStore();

  const levels: { value: ExpertiseLevel; label: string; desc: string }[] = [
    {
      value: "guided",
      label: "Guided",
      desc: "Hides advanced cockpit panels but keeps RollbackBar visible. Collapses status bar to 3 indicators. Plain-English labels. Cost Calm Mode auto-on.",
    },
    {
      value: "standard",
      label: "Standard",
      desc: "Default view. All panels available. Mixed metric labels.",
    },
    {
      value: "expert",
      label: "Expert",
      desc: "Full metrics with raw token counts. Debug panels and IPC Inspector visible.",
    },
  ];

  return (
    <div className="p-3 text-xs space-y-2">
      <h3 className="font-medium text-[#8b949e]">Expertise Level</h3>
      <div className="space-y-1">
        {levels.map((level) => (
          <button
            key={level.value}
            onClick={() => setExpertise(level.value)}
            className={`w-full rounded border px-2.5 py-2 text-left transition-colors ${
              expertise === level.value
                ? "border-[#7cc7a030] bg-[#7cc7a008]"
                : "border-transparent hover:bg-[#7cc7a004]"
            }`}
          >
            <div className="flex items-center gap-2">
              <input type="radio" checked={expertise === level.value} readOnly className="accent-[#7cc7a0]" />
              <span className="font-medium text-[#c9d1d9]">{level.label}</span>
            </div>
            <p className="mt-0.5 ml-5 text-[#8b949e]">{level.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}