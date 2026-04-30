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
      { kind: "small", label: "Format", icon: "🧹" },
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
      { kind: "small", label: "Color", icon: "A" },
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
      { kind: "small", label: "Replace", icon: "ab" },
      { kind: "small", label: "Select", icon: "⌖" },
    ],
  },
];

const panelTokens = [
  ["Orb", ".r-orb"],
  ["QAT", ".r-qat"],
  ["Ribbon", ".r-ribbon"],
  ["Group", ".r-group"],
  ["Command", ".r-command"],
  ["Surface", ".r-surface"],
  ["Status Bar", ".r-status"],
];

const componentTargets = [
  ["AppWindow", ".r-app"],
  ["RibbonTabs", ".r-tabs"],
  ["RibbonGroup", ".r-group"],
  ["RibbonButton", ".r-btn"],
  ["RibbonGallery", ".r-gallery"],
  ["StatusBar", ".r-status"],
  ["DocumentSurface", ".r-surface"],
];

function RibbonItem({ item }) {
  if (item.kind === "large") {
    return (
      <button type="button" className="ribbon-command ribbon-command--large" aria-label={item.label}>
        <span className="ribbon-command-icon ribbon-command-icon--large" aria-hidden="true">{item.icon}</span>
        <span className="ribbon-command-label">{item.label}</span>
      </button>
    );
  }

  if (item.kind === "field") {
    return (
      <div className="ribbon-field" aria-label={item.label}>
        <span>{item.label}</span>
        <span aria-hidden="true" className="ribbon-caret">▼</span>
      </div>
    );
  }

  if (item.kind === "style") {
    return (
      <div className="ribbon-style" aria-label={item.label}>
        <div className="ribbon-style-sample">Aa</div>
        <div className="ribbon-style-label">{item.label}</div>
      </div>
    );
  }

  return (
    <button type="button" className="ribbon-command ribbon-command--small" aria-label={item.label}>
      <span className="ribbon-command-icon" aria-hidden="true">{item.icon}</span>
      <span className="ribbon-command-label">{item.label}</span>
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
  statusBarMeta = "Words: 245 (demo)",
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
    statusBarItems.map((item) => (typeof item === "string" ? { value: item } : item)),
    (item) => item.id || item.value
  );

  return (
    <div className="ribbon-app-bg">
      <div className="ribbon-shell">
        <header className="ribbon-titlebar">
          <div className="ribbon-title-row">
            <div className="ribbon-title-left">
              <button type="button" className="ribbon-orb" aria-label="Application Orb" />
              <div className="ribbon-qta-title-wrap">
                <div className="ribbon-qta" aria-label="Quick access toolbar">
                  {resolvedQuickAccessItems.map((item) => (
                    <button key={item._key} type="button" className="ribbon-btn ribbon-btn--icon" aria-label={item.label}>
                      {item.icon}
                    </button>
                  ))}
                  <button type="button" className="ribbon-btn ribbon-btn--icon" aria-label="Quick Access Toolbar options">▾</button>
                </div>
                <div className="ribbon-title-text">{title}</div>
              </div>
            </div>
            <div className="ribbon-win-controls" aria-label="Window controls">
              {["Minimize", "Maximize", "Close"].map((label) => (
                <button key={label} type="button" className={`ribbon-btn ribbon-btn--window ${label === "Close" ? "is-close" : ""}`} aria-label={label}>
                  {label === "Minimize" ? "—" : label === "Maximize" ? "▢" : "✕"}
                </button>
              ))}
            </div>
          </div>

          <div className="ribbon-tabs" role="tablist" aria-label="Ribbon Tabs">
            {tabs.map((tab) => (
              <button key={tab} type="button" className="ribbon-tab" role="tab" aria-selected={tab === activeTab}>
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

        <section className="ribbon-workspace" aria-label="Document workspace">
          <div className="ribbon-ruler" aria-hidden="true" />
          <div className="ribbon-workspace-main">
            <article className="ribbon-document r-surface">
              <h1>Component Library Reference Sheet</h1>
              <p className="ribbon-lead">
                This canvas showcases the building blocks of a retro ribbon-inspired UI library.
              </p>
              <h2>CSS Primitives</h2>
              <div className="ribbon-chip-list">
                {[".r-app", ".r-ribbon", ".r-group", ".r-btn", ".r-gallery", ".r-surface", ".r-status"].map((chip) => (
                  <span key={chip} className="ribbon-chip">{chip}</span>
                ))}
              </div>
              <h2>Interaction Notes</h2>
              <ul>
                <li>Hover states brighten with a soft white sheen.</li>
                <li>Pressed states should feel slightly inset.</li>
                <li>All interactive items should preserve keyboard access.</li>
              </ul>
            </article>

            <aside className="ribbon-sidepane">
              <div className="ribbon-pane-card">
                <div className="ribbon-pane-title">Visual Tokens</div>
                {panelTokens.map(([name, klass]) => (
                  <div key={name} className="ribbon-pane-row">
                    <span>{name}</span>
                    <code>{klass}</code>
                  </div>
                ))}
              </div>
              <div className="ribbon-pane-card">
                <div className="ribbon-pane-title">Components to Build</div>
                {componentTargets.map(([name, klass]) => (
                  <div key={name} className="ribbon-pane-row">
                    <span>{name}</span>
                    <code>{klass}</code>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <footer className="ribbon-statusbar r-status" aria-label="Status bar">
          <div className="ribbon-statusbar-left">
            {resolvedStatusBarItems.map((item) => (
              <span key={item._key}>{item.value}</span>
            ))}
          </div>
          <div className="ribbon-statusbar-right">
            <span>{statusBarMeta}</span>
            <button type="button" className="ribbon-status-btn" aria-label="Read mode">📖</button>
            <button type="button" className="ribbon-status-btn" aria-label="Print layout">▤</button>
            <span aria-label="Zoom level">100%</span>
            <div className="ribbon-zoom" aria-hidden="true"><span /></div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default RetroRibbon;
