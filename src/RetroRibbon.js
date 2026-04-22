import React from "react";
import "./ribbon.css";

export const defaultTabs = [
  "Home",
  "Insert",
  "Page Layout",
  "References",
  "Mailings",
  "Review",
  "View",
];

export const defaultGroups = [
  {
    title: "Clipboard",
    items: [
      { kind: "large", label: "Paste", icon: "📋" },
      { kind: "small", label: "Cut", icon: "✂️" },
      { kind: "small", label: "Copy", icon: "📄" },
      { kind: "small", label: "Format", icon: "🖌️" },
    ],
  },
  {
    title: "Font",
    items: [
      { kind: "field", label: "Calibri" },
      { kind: "field", label: "11" },
      { kind: "small", label: "B", icon: "B" },
      { kind: "small", label: "I", icon: "I" },
      { kind: "small", label: "U", icon: "U" },
      { kind: "small", label: "Color", icon: "🅰️" },
    ],
  },
  {
    title: "Paragraph",
    items: [
      { kind: "small", label: "Bullets", icon: "•" },
      { kind: "small", label: "Numbering", icon: "1." },
      { kind: "small", label: "Align", icon: "≡" },
      { kind: "small", label: "Indent", icon: "↦" },
      { kind: "small", label: "Sort", icon: "⇅" },
    ],
  },
  {
    title: "Styles",
    items: [
      { kind: "style", label: "Normal" },
      { kind: "style", label: "Heading 1" },
      { kind: "style", label: "Heading 2" },
    ],
  },
  {
    title: "Editing",
    items: [
      { kind: "large", label: "Find", icon: "🔎" },
      { kind: "small", label: "Replace", icon: "♻️" },
      { kind: "small", label: "Select", icon: "🖱️" },
    ],
  },
];

function RibbonItem({ item }) {
  if (item.kind === "large") {
    return (
      <button type="button" className="ribbon-command ribbon-command--large" aria-label={item.label}>
        <span aria-hidden="true" style={{ fontSize: 26 }}>{item.icon}</span>
        <span style={{ marginTop: 10 }}>{item.label}</span>
      </button>
    );
  }

  if (item.kind === "field") {
    return (
      <div className="ribbon-field" aria-label={item.label}>
        <span>{item.label}</span>
        <span aria-hidden="true" style={{ fontSize: 10 }}>▼</span>
      </div>
    );
  }

  if (item.kind === "style") {
    return (
      <div className="ribbon-style" aria-label={item.label}>
        <div style={{ fontSize: 15, fontWeight: 600 }}>AaBb</div>
        <div style={{ marginTop: 4 }}>{item.label}</div>
      </div>
    );
  }

  return (
    <button type="button" className="ribbon-command ribbon-command--small" aria-label={item.label}>
      <span aria-hidden="true">{item.icon}</span>
      <span>{item.label}</span>
    </button>
  );
}

export function RetroRibbon({
  tabs = defaultTabs,
  groups = defaultGroups,
  activeTab = tabs[0],
  title = "Retro Ribbon UI",
  quickAccessItems = ["💾", "↶", "↷"],
  statusBarItems = ["Ready", "Page 1 of 1", "English (Canada)"],
}) {
  const createStableKeys = (items, getBaseKey) => {
    const counts = new Map();
    return items.map((item) => {
      const baseKey = getBaseKey(item);
      const count = counts.get(baseKey) || 0;
      counts.set(baseKey, count + 1);
      return { ...item, _key: count ? `${baseKey}-${count}` : baseKey };
    });
  };

  const quickAccessLabelMap = {
    "💾": "Save",
    "↶": "Undo",
    "↷": "Redo",
  };

  const resolvedQuickAccessItems = createStableKeys(
    quickAccessItems.map((item, index) =>
      typeof item === "string"
        ? { icon: item, label: quickAccessLabelMap[item] || `Quick action ${index + 1}` }
        : item
    ),
    (item) => item.id || `${item.icon}-${item.label}`
  );

  const resolvedStatusBarItems = createStableKeys(
    statusBarItems.map((item) =>
      typeof item === "string"
        ? { value: item }
        : item
    ),
    (item) => item.id || item.value
  );

  return (
    <div style={{ background: "var(--ribbon-bg)", padding: 24 }}>
      <div className="ribbon-shell">
        <header className="ribbon-titlebar">
          <div className="ribbon-title-row">
            <div style={{ alignItems: "flex-start", display: "flex", gap: 12 }}>
              <div className="ribbon-orb" aria-label="Application Orb" />
              <div>
                <div className="ribbon-qta" aria-label="Quick access toolbar">
                  {resolvedQuickAccessItems.map((item) => (
                    <button key={item._key} type="button" className="ribbon-btn ribbon-btn--icon" aria-label={item.label}>
                      {item.icon}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>{title}</div>
              </div>
            </div>
            <div className="ribbon-win-controls" aria-label="Window controls">
              {[["—", "Minimize"], ["▢", "Maximize"], ["✕", "Close"]].map(([icon, label]) => (
                <button key={label} type="button" className="ribbon-btn ribbon-btn--window" aria-label={label}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="ribbon-tabs" role="tablist" aria-label="Ribbon Tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className="ribbon-tab"
                role="tab"
                aria-selected={tab === activeTab}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        <section className="ribbon-panel" aria-label="Ribbon Commands">
          <div className="ribbon-group-wrap">
            {groups.map((group, index) => (
              <React.Fragment key={group.title}>
                <div className="ribbon-group" role="group" aria-label={group.title}>
                  <div className="ribbon-commands">
                    {group.items.map((item, itemIndex) => (
                      <RibbonItem key={`${itemIndex}-${item.label}`} item={item} />
                    ))}
                  </div>
                  <div className="ribbon-group-title">{group.title}</div>
                </div>
                {index < groups.length - 1 && <div className="ribbon-group-sep" aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>
        </section>

        <footer className="ribbon-statusbar" aria-label="Status bar">
          <div className="ribbon-statusbar-left">
            {resolvedStatusBarItems.map((item) => (
              <span key={item._key}>{item.value}</span>
            ))}
          </div>
          <div className="ribbon-statusbar-right">
            <span aria-label="Zoom level">100%</span>
            <span aria-label="View mode">◉</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default RetroRibbon;
