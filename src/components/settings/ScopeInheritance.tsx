import { useState } from 'react';

type Scope = 'global' | 'project' | 'session';

interface ScopeBadgeProps {
  scope: Scope;
  locked?: boolean;
  inheritedFrom?: Scope;
  onReset?: () => void;
}

const scopeConfig: Record<Scope, { emoji: string; label: string; color: string }> = {
  global: { emoji: '🌐', label: 'Global', color: '#7cc7a0' },
  project: { emoji: '📁', label: 'Project', color: '#5b9bd5' },
  session: { emoji: '🖥', label: 'Session', color: '#ed7d31' },
};

function ScopeBadge({ scope, locked = false, inheritedFrom, onReset }: ScopeBadgeProps) {
  const config = scopeConfig[scope];
  return (
    <span className="scope-badge" title={`${config.label} scope${locked ? ' (locked by higher scope)' : ''}${inheritedFrom ? ` — overrides ${scopeConfig[inheritedFrom].label}` : ''}`}>
      <span className="scope-emoji">{config.emoji}</span>
      <span className="scope-label" style={{ color: config.color }}>{config.label}</span>
      {locked && <span className="scope-lock">🔒</span>}
      {inheritedFrom && !locked && onReset && (
        <button className="scope-reset-btn" onClick={onReset} title={`Reset to ${scopeConfig[inheritedFrom].label} default`}>
          ↩
        </button>
      )}
    </span>
  );
}

interface Setting {
  key: string;
  value: unknown;
  scope: Scope;
  lockedByHigher?: boolean;
}

const SAMPLE_SETTINGS: Setting[] = [
  { key: 'model.default', value: 'Claude Sonnet 4.6', scope: 'global' },
  { key: 'context.budget_tokens', value: 32000, scope: 'project', lockedByHigher: false },
  { key: 'memory.injection_enabled', value: true, scope: 'session' },
  { key: 'theme.blur_level', value: 'medium', scope: 'project', lockedByHigher: true },
];

export default function ScopeInheritance() {
  const [settings] = useState<Setting[]>(SAMPLE_SETTINGS);

  const handleReset = (key: string) => {
    // In production: reset setting to inherited scope value
    console.log(`Reset ${key} to inherited value`);
  };

  const getInheritedScope = (scope: Scope): Scope | undefined => {
    if (scope === 'session') return 'project';
    if (scope === 'project') return 'global';
    return undefined;
  };

  return (
    <div className="scope-inheritance-panel" role="region" aria-label="Scope Inheritance Settings">
      <div className="scope-header">
        <h3>Scope Inheritance</h3>
        <p className="scope-description">Session overrides Project overrides Global</p>
      </div>

      <div className="scope-legend">
        {(['global', 'project', 'session'] as Scope[]).map((scope) => {
          const config = scopeConfig[scope];
          return (
            <div key={scope} className="scope-legend-item">
              <span className="legend-emoji">{config.emoji}</span>
              <span className="legend-label" style={{ color: config.color }}>{config.label}</span>
            </div>
          );
        })}
      </div>

      <div className="scope-settings-list">
        {settings.map((setting) => {
          const inheritedFrom = getInheritedScope(setting.scope);
          return (
            <div key={setting.key} className="scope-setting-row">
              <div className="setting-info">
                <span className="setting-key">{setting.key}</span>
                <span className="setting-value">{String(setting.value)}</span>
              </div>
              <div className="setting-scope-area">
                {inheritedFrom && !setting.lockedByHigher && (
                  <span className="scope-arrow" title={`Overrides ${scopeConfig[inheritedFrom].label}`}>
                    {scopeConfig[inheritedFrom].emoji} → {scopeConfig[setting.scope].emoji}
                  </span>
                )}
                <ScopeBadge
                  scope={setting.scope}
                  locked={setting.lockedByHigher}
                  inheritedFrom={setting.lockedByHigher ? undefined : inheritedFrom}
                  onReset={inheritedFrom && !setting.lockedByHigher ? () => handleReset(setting.key) : undefined}
                />
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .scope-inheritance-panel {
          padding: 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          backdrop-filter: blur(16px);
          color: #e0e0e0;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .scope-header { margin-bottom: 16px; }
        .scope-header h3 {
          margin: 0 0 4px 0;
          font-size: 14px;
          font-weight: 600;
          color: #f0f0f0;
        }
        .scope-description {
          font-size: 12px;
          color: #888;
          margin: 0;
        }
        .scope-legend {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
          padding: 10px;
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
        }
        .scope-legend-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
        }
        .legend-emoji { font-size: 14px; }
        .legend-label { font-weight: 500; }
        .scope-settings-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .scope-setting-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
        }
        .setting-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .setting-key {
          font-size: 12px;
          font-weight: 500;
          color: #ccc;
          font-family: 'JetBrains Mono', monospace;
        }
        .setting-value {
          font-size: 11px;
          color: #7cc7a0;
        }
        .setting-scope-area {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .scope-arrow {
          font-size: 14px;
          opacity: 0.6;
        }
        .scope-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 3px 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          font-size: 11px;
        }
        .scope-emoji { font-size: 12px; }
        .scope-label { font-weight: 500; }
        .scope-lock { font-size: 10px; margin-left: 2px; }
        .scope-reset-btn {
          background: none;
          border: none;
          color: #888;
          cursor: pointer;
          font-size: 12px;
          padding: 0 2px;
          margin-left: 2px;
        }
        .scope-reset-btn:hover { color: #7cc7a0; }
      `}</style>
    </div>
  );
}
