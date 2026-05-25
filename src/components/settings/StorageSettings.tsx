import { useState } from 'react';

interface StoragePath {
  key: string;
  envVar: string;
  label: string;
  defaultPath: string;
  currentPath: string;
  usedMB: number;
  limitMB: number;
}

export default function StorageSettings() {
  const [paths, setPaths] = useState<StoragePath[]>([
    { key: 'session', envVar: 'agentloft_SESSION_DIR', label: 'Sessions', defaultPath: '.claude/sessions/', currentPath: '.claude/sessions/', usedMB: 24, limitMB: 500 },
    { key: 'config', envVar: 'agentloft_CONFIG_DIR', label: 'Global Config', defaultPath: '~/.agentloft/', currentPath: '~/.agentloft/', usedMB: 2, limitMB: 100 },
    { key: 'memory', envVar: 'agentloft_MEMORY_DIR', label: 'Memory (LanceDB)', defaultPath: '~/.agentloft/memory/', currentPath: '~/.agentloft/memory/', usedMB: 128, limitMB: 1000 },
    { key: 'log', envVar: 'agentloft_LOG_DIR', label: 'Logs (IPC Frames)', defaultPath: '~/.agentloft/logs/', currentPath: '~/.agentloft/logs/', usedMB: 45, limitMB: 200 },
    { key: 'plugin', envVar: 'agentloft_PLUGIN_DIR', label: 'Plugins', defaultPath: '~/.agentloft/plugins/', currentPath: '~/.agentloft/plugins/', usedMB: 8, limitMB: 500 },
  ]);

  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState<string | null>(null);

  const totalUsedMB = paths.reduce((sum, p) => sum + p.usedMB, 0);
  const totalLimitMB = paths.reduce((sum, p) => sum + p.limitMB, 0);

  const handleEdit = (path: StoragePath) => {
    setEditingKey(path.key);
    setEditValue(path.currentPath);
  };

  const handleSave = () => {
    setPaths(paths.map(p => p.key === editingKey ? { ...p, currentPath: editValue } : p));
    setEditingKey(null);
  };

  const handleMoveData = (key: string) => {
    // In production: copy + verify + delete original
    console.log(`Move data for ${key} to new path`);
  };

  const handleClear = (key: string) => {
    setPaths(paths.map(p => p.key === key ? { ...p, usedMB: 0 } : p));
    setShowClearConfirm(null);
  };

  return (
    <div className="storage-settings-panel" role="region" aria-label="Storage Settings">
      <div className="storage-header">
        <h3>Storage</h3>
        <div className="storage-total-bar">
          <div className="storage-total-fill" style={{ width: `${(totalUsedMB / totalLimitMB) * 100}%` }} />
        </div>
        <span className="storage-total-label">
          {totalUsedMB} MB used of {totalLimitMB} MB
        </span>
      </div>

      <div className="storage-paths-list">
        {paths.map((path) => {
          const usagePercent = (path.usedMB / path.limitMB) * 100;
          return (
            <div key={path.key} className="storage-path-row">
              <div className="path-info">
                <div className="path-header-row">
                  <span className="path-label">{path.label}</span>
                  <code className="path-env">{path.envVar}</code>
                </div>

                {editingKey === path.key ? (
                  <div className="path-edit-row">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="path-edit-input"
                      autoFocus
                    />
                    <button className="path-save-btn" onClick={handleSave}>Save</button>
                    <button className="path-cancel-btn" onClick={() => setEditingKey(null)}>Cancel</button>
                    <button className="path-move-btn" onClick={() => handleMoveData(path.key)}>Move data →</button>
                  </div>
                ) : (
                  <div className="path-display-row">
                    <code className="path-value">{path.currentPath}</code>
                    <button className="path-edit-btn" onClick={() => handleEdit(path)}>Edit</button>
                    <button className="path-open-btn" onClick={() => console.log(`Open ${path.currentPath}`)}>Open</button>
                  </div>
                )}
              </div>

              {/* Usage bar */}
              <div className="path-usage">
                <div className="path-usage-bar-track">
                  <div
                    className="path-usage-bar-fill"
                    style={{
                      width: `${Math.min(usagePercent, 100)}%`,
                      backgroundColor: usagePercent > 80 ? '#ef4444' : usagePercent > 60 ? '#f59e0b' : '#7cc7a0',
                    }}
                  />
                </div>
                <span className="path-usage-label">{path.usedMB} MB / {path.limitMB} MB</span>
              </div>

              {/* Clear button */}
              <div className="path-actions">
                {showClearConfirm === path.key ? (
                  <div className="path-clear-confirm">
                    <span>Clear {path.usedMB} MB?</span>
                    <button className="confirm-yes" onClick={() => handleClear(path.key)}>Yes, clear</button>
                    <button className="confirm-no" onClick={() => setShowClearConfirm(null)}>No</button>
                  </div>
                ) : (
                  <button
                    className="path-clear-btn"
                    disabled={path.usedMB === 0}
                    onClick={() => setShowClearConfirm(path.key)}
                  >
                    Clear {path.label}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Portable mode indicator */}
      <div className="portable-mode-info" style={{ marginTop: '16px', padding: '10px', background: 'rgba(124,199,160,0.06)', borderRadius: '8px', fontSize: '12px', color: '#888' }}>
        <strong style={{ color: '#7cc7a0' }}>Portable mode</strong>: Launch with <code>--portable</code> flag to store all data alongside the executable.
        {paths.some(p => p.currentPath.startsWith('./')) && (
          <span style={{ display: 'block', marginTop: '4px', color: '#7cc7a0' }}>✓ Currently using portable paths</span>
        )}
      </div>

      <style>{`
        .storage-settings-panel {
          padding: 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          backdrop-filter: blur(16px);
          color: #e0e0e0;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .storage-header { margin-bottom: 16px; }
        .storage-header h3 {
          margin: 0 0 10px 0;
          font-size: 14px;
          font-weight: 600;
          color: #f0f0f0;
        }
        .storage-total-bar {
          height: 8px;
          background: rgba(255,255,255,0.08);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 6px;
        }
        .storage-total-fill {
          height: 100%;
          background: #7cc7a0;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        .storage-total-label {
          font-size: 11px;
          color: #999;
        }
        .storage-paths-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .storage-path-row {
          padding: 12px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
        }
        .path-header-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }
        .path-label {
          font-size: 12px;
          font-weight: 600;
          color: #ccc;
        }
        .path-env {
          font-size: 10px;
          color: #666;
          font-family: 'JetBrains Mono', monospace;
          background: rgba(255,255,255,0.04);
          padding: 1px 6px;
          border-radius: 3px;
        }
        .path-display-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .path-value {
          font-size: 11px;
          color: #aaa;
          font-family: 'JetBrains Mono', monospace;
          flex: 1;
        }
        .path-edit-btn, .path-open-btn {
          font-size: 10px;
          padding: 2px 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 4px;
          color: #aaa;
          cursor: pointer;
        }
        .path-edit-btn:hover, .path-open-btn:hover { color: #fff; background: rgba(255,255,255,0.1); }
        .path-edit-row {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .path-edit-input {
          flex: 1;
          padding: 4px 8px;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(124,199,160,0.3);
          border-radius: 4px;
          color: #f0f0f0;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
        }
        .path-save-btn, .path-cancel-btn, .path-move-btn {
          font-size: 10px;
          padding: 3px 8px;
          border-radius: 4px;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          color: #aaa;
        }
        .path-save-btn { color: #7cc7a0; border-color: rgba(124,199,160,0.3); }
        .path-move-btn { color: #5b9bd5; }
        .path-usage {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
        }
        .path-usage-bar-track {
          flex: 1;
          height: 4px;
          background: rgba(255,255,255,0.06);
          border-radius: 2px;
          overflow: hidden;
        }
        .path-usage-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        .path-usage-label {
          font-size: 10px;
          color: #777;
          min-width: 100px;
          text-align: right;
          font-variant-numeric: tabular-nums;
        }
        .path-actions { margin-top: 8px; }
        .path-clear-btn {
          font-size: 10px;
          padding: 3px 10px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 4px;
          color: #ef4444;
          cursor: pointer;
        }
        .path-clear-btn:disabled { opacity: 0.3; cursor: default; }
        .path-clear-confirm {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: #ef4444;
        }
        .confirm-yes, .confirm-no {
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 4px;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          color: #aaa;
        }
        .confirm-yes { color: #ef4444; border-color: rgba(239,68,68,0.4); }
      `}</style>
    </div>
  );
}
