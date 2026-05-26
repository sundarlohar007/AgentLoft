import { useState } from 'react';

interface BudgetAllocations {
  system_prompt: number;
  memory: number;
  files: number;
  conversation: number;
}

export default function ContextBudget() {
  const [allocations, setAllocations] = useState<BudgetAllocations>({
    system_prompt: 2000,
    memory: 4000,
    files: 16000,
    conversation: 10000,
  });
  const [usedTokens] = useState(0);
  const totalLimit = 32000;

  const usagePercent = (usedTokens / totalLimit) * 100;

  const categories = [
    { key: 'system_prompt' as const, label: 'System Prompt', color: '#7cc7a0' },
    { key: 'memory' as const, label: 'Memory', color: '#5b9bd5' },
    { key: 'files' as const, label: 'Files', color: '#ed7d31' },
    { key: 'conversation' as const, label: 'Conversation', color: '#a855f7' },
  ];

  const handleSliderChange = (key: keyof BudgetAllocations, value: number) => {
    const newAllocs = { ...allocations, [key]: value };
    const total = Object.values(newAllocs).reduce((a, b) => a + b, 0);
    if (total <= totalLimit * 2) {
      setAllocations(newAllocs);
    }
  };

  const handleOptimize = () => {
    // Smart prune: reset to defaults
    setAllocations({
      system_prompt: 2000,
      memory: 4000,
      files: 16000,
      conversation: 10000,
    });
  };

  return (
    <div className="context-budget-panel" role="region" aria-label="Context Budget">
      <div className="budget-header">
        <h3>Context Budget</h3>
        <span className={`budget-usage ${usagePercent > 80 ? 'warning' : usagePercent > 95 ? 'critical' : ''}`}>
          {usedTokens.toLocaleString()} / {totalLimit.toLocaleString()} tokens
        </span>
      </div>

      {/* Overall usage bar */}
      <div className="budget-bar-container" style={{ marginBottom: '16px' }}>
        <div className="budget-bar-track">
          <div
            className="budget-bar-fill"
            style={{
              width: `${Math.min(usagePercent, 100)}%`,
              backgroundColor: usagePercent > 95 ? '#ef4444' : usagePercent > 80 ? '#f59e0b' : '#7cc7a0',
            }}
          />
        </div>
        <span className="budget-bar-label">{usagePercent.toFixed(0)}% used</span>
      </div>

      {/* Per-category allocation */}
      <div className="budget-categories">
        <h4>Allocation</h4>
        {categories.map(({ key, label, color }) => (
          <div key={key} className="budget-category-row">
            <div className="category-header">
              <span className="category-dot" style={{ backgroundColor: color }} />
              <span className="category-label">{label}</span>
              <span className="category-tokens">{allocations[key].toLocaleString()} tokens</span>
            </div>
            <input
              type="range"
              min={500}
              max={totalLimit}
              step={500}
              value={allocations[key]}
              onChange={(e) => handleSliderChange(key, Number(e.target.value))}
              className="category-slider"
              aria-label={`${label} token allocation`}
              style={{ accentColor: color }}
            />
          </div>
        ))}
      </div>

      {/* Shared allocation bar (stacked) */}
      <div className="budget-stacked-bar" style={{ height: '8px', borderRadius: '4px', display: 'flex', overflow: 'hidden', marginTop: '12px' }}>
        {categories.map(({ key, color }) => {
          const pct = (allocations[key] / totalLimit) * 100;
          return (
            <div
              key={key}
              style={{ width: `${pct}%`, backgroundColor: color, minWidth: pct > 1 ? '2px' : '0' }}
              title={`${key}: ${allocations[key].toLocaleString()} tokens`}
            />
          );
        })}
      </div>

      <button className="budget-optimize-btn" onClick={handleOptimize} style={{ marginTop: '16px' }}>
        Optimize (Reset to Defaults)
      </button>

      <style>{`
        .context-budget-panel {
          padding: 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          backdrop-filter: blur(16px);
          color: #e0e0e0;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .budget-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 12px;
        }
        .budget-header h3 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          color: #f0f0f0;
        }
        .budget-usage {
          font-size: 12px;
          color: #7cc7a0;
          font-variant-numeric: tabular-nums;
        }
        .budget-usage.warning { color: #f59e0b; }
        .budget-usage.critical { color: #ef4444; }
        .budget-bar-track {
          height: 6px;
          background: rgba(255,255,255,0.08);
          border-radius: 3px;
          flex: 1;
          overflow: hidden;
        }
        .budget-bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.3s ease;
        }
        .budget-bar-container {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .budget-bar-label {
          font-size: 11px;
          color: #999;
          min-width: 40px;
          text-align: right;
        }
        .budget-categories h4 {
          font-size: 12px;
          font-weight: 600;
          color: #aaa;
          margin: 0 0 8px 0;
        }
        .budget-category-row {
          margin-bottom: 8px;
        }
        .category-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
        }
        .category-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .category-label {
          font-size: 12px;
          color: #ccc;
          flex: 1;
        }
        .category-tokens {
          font-size: 11px;
          color: #888;
          font-variant-numeric: tabular-nums;
        }
        .category-slider {
          width: 100%;
          height: 4px;
          cursor: pointer;
        }
        .budget-optimize-btn {
          width: 100%;
          padding: 8px;
          background: rgba(124,199,160,0.12);
          border: 1px solid rgba(124,199,160,0.25);
          border-radius: 6px;
          color: #7cc7a0;
          font-size: 12px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .budget-optimize-btn:hover {
          background: rgba(124,199,160,0.2);
        }
      `}</style>
    </div>
  );
}
