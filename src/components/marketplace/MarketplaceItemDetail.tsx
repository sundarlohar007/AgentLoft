import { GlassPanel, GlassButton, GlassBadge } from "@/components/shared/primitives";
import type { MarketplaceItem } from "@/lib/types";

interface Props {
  item: MarketplaceItem;
  installed: boolean;
  onInstall: () => void;
  onUninstall: () => void;
  onBack: () => void;
}

export function MarketplaceItemDetail({ item, installed, onInstall, onUninstall, onBack }: Props) {
  return (
    <GlassPanel className="flex flex-col p-4" blur="heavy">
      <button onClick={onBack} className="text-xs text-[#7cc7a0] hover:underline mb-2">
        {'←'} Back to Marketplace
      </button>

      <div className="flex items-center gap-2">
        <h3 className="text-base font-semibold text-[#c9d1d9]">{item.name}</h3>
        <GlassBadge color="default">{item.type}</GlassBadge>
        {item.verified_publisher && (
          <GlassBadge color="green">Verified</GlassBadge>
        )}
      </div>

      <p className="mt-1 text-sm text-[#8b949e]">{item.description}</p>

      {item.long_description && (
        <p className="mt-2 text-xs text-[#8b949e]">{item.long_description}</p>
      )}

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-[#484f58]">Author: </span>
          <span className="text-[#c9d1d9]">{item.author}</span>
        </div>
        <div>
          <span className="text-[#484f58]">Version: </span>
          <span className="font-mono text-[#c9d1d9]">{item.version}</span>
        </div>
        <div>
          <span className="text-[#484f58]">License: </span>
          <span className="text-[#c9d1d9]">{item.license}</span>
        </div>
        <div>
          <span className="text-[#484f58]">Rating: </span>
          <span className="text-[#c9d1d9]">
            {item.rating > 0 ? `${item.rating.toFixed(1)}/5 (${item.rating_count})` : "No ratings"}
          </span>
        </div>
        <div>
          <span className="text-[#484f58]">Source: </span>
          <a href={item.source_url} className="text-[#7cc7a0] hover:underline" target="_blank" rel="noreferrer">
            Repository
          </a>
        </div>
        <div>
          <span className="text-[#484f58]">Price: </span>
          <span className="text-[#c9d1d9]">{item.price_usd > 0 ? `$${item.price_usd}` : "Free"}</span>
        </div>
      </div>

      {/* Security scan */}
      <div className="mt-3 rounded-md border p-2 text-xs" style={{
        borderColor: item.security_scan.passed ? "rgba(63,185,80,0.15)" : "rgba(248,81,73,0.15)",
        background: item.security_scan.passed ? "rgba(63,185,80,0.03)" : "rgba(248,81,73,0.03)",
      }}>
        <span className="font-medium" style={{ color: item.security_scan.passed ? "#3fb950" : "#f85149" }}>
          {item.security_scan.passed ? "Security Scan: Passed" : "Security Scan: Issues Found"}
        </span>
        {item.security_scan.findings.length > 0 && (
          <ul className="mt-1 space-y-0.5">
            {item.security_scan.findings.map((f, i) => (
              <li key={i} className="text-[#f85149]">
                [{f.severity}] {f.description} — {f.location}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Tags */}
      <div className="mt-2 flex gap-1 flex-wrap">
        {item.tags.map((tag) => (
          <span key={tag} className="rounded px-1.5 py-0.5 text-xs font-mono text-[#7cc7a0]" style={{ background: "rgba(124,199,160,0.06)" }}>
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4">
        {installed ? (
          <GlassButton variant="secondary" onClick={onUninstall}>Uninstall</GlassButton>
        ) : (
          <GlassButton variant="primary" onClick={onInstall}>
            Install{item.price_usd > 0 ? ` — $${item.price_usd}` : ""}
          </GlassButton>
        )}
      </div>
    </GlassPanel>
  );
}