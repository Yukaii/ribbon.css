import React from "react";
import "./ribbon.css";

export const defaultTabs = [
  "Home",
  "Insert",
  "Page Layout",
  "References",
  "Review",
  "View",
];

export const defaultGroups = [
  {
    title: "Clipboard",
    items: [
      { kind: "large", label: "Paste", icon: "paste" },
      { kind: "small", label: "Cut", icon: "cut" },
      { kind: "small", label: "Copy", icon: "copy" },
      { kind: "small", label: "Format Painter", icon: "format" },
    ],
  },
  {
    title: "Font",
    items: [
      { kind: "field", label: "Segoe UI" },
      { kind: "field", label: "11" },
      { kind: "small", label: "Bold", icon: "bold", showLabel: false },
      { kind: "small", label: "Italic", icon: "italic", showLabel: false },
      { kind: "small", label: "Underline", icon: "underline", showLabel: false },
      { kind: "small", label: "Strikethrough", icon: "strikethrough", showLabel: false },
      { kind: "small", label: "Text Color", icon: "font-color", showLabel: false },
      { kind: "small", label: "Highlight", icon: "highlight", showLabel: false },
      { kind: "small", label: "Subscript", icon: "subscript", showLabel: false },
      { kind: "small", label: "Superscript", icon: "superscript", showLabel: false },
      { kind: "small", label: "Change Case", icon: "change-case", showLabel: false },
      { kind: "small", label: "Clear Formatting", icon: "clear-format", showLabel: false },
    ],
  },
  {
    title: "Paragraph",
    items: [
      { kind: "small", label: "Bullets", icon: "bullets", showLabel: false },
      { kind: "small", label: "Numbering", icon: "numbering", showLabel: false },
      { kind: "small", label: "Multilevel List", icon: "multilevel", showLabel: false },
      { kind: "small", label: "Decrease Indent", icon: "decrease-indent", showLabel: false },
      { kind: "small", label: "Increase Indent", icon: "increase-indent", showLabel: false },
      { kind: "small", label: "Align Left", icon: "align-left", showLabel: false },
      { kind: "small", label: "Center", icon: "align-center", showLabel: false },
      { kind: "small", label: "Align Right", icon: "align-right", showLabel: false },
      { kind: "small", label: "Justify", icon: "justify", showLabel: false },
      { kind: "small", label: "Line Spacing", icon: "line-spacing", showLabel: false },
      { kind: "small", label: "Sort", icon: "sort", showLabel: false },
      { kind: "small", label: "Show Paragraph Marks", icon: "show-marks", showLabel: false },
      { kind: "small", label: "Shading", icon: "shading", showLabel: false },
      { kind: "small", label: "Borders", icon: "borders", showLabel: false },
    ],
  },
  {
    title: "Styles",
    items: [
      { kind: "style", label: "Normal", preview: "Aa" },
      { kind: "style", label: "Heading 1", preview: "Aa" },
      { kind: "style", label: "Heading 2", preview: "Aa" },
      { kind: "small", label: "Change Styles", icon: "change-styles" },
      { kind: "small", label: "Styles Pane", icon: "styles-pane" },
    ],
  },
  {
    title: "Editing",
    items: [
      { kind: "large", label: "Find", icon: "find" },
      { kind: "small", label: "Replace", icon: "replace" },
      { kind: "small", label: "Select", icon: "select" },
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
  ["StyleGallery", ".r-gallery"],
  ["StatusBar", ".r-status"],
  ["DocumentSurface", ".r-surface"],
];

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function createStableKeys(items, getBaseKey) {
  const counts = new Map();
  return items.map((item) => {
    const baseKey = getBaseKey(item);
    const count = counts.get(baseKey) || 0;
    counts.set(baseKey, count + 1);
    return { ...item, _key: count ? `${baseKey}-${count}` : baseKey };
  });
}

function RibbonCaret() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 4.5h8L6 8.5z" fill="currentColor" />
    </svg>
  );
}

function OfficeGlyph({ name, className = "" }) {
  const glyphs = {
    save: (
      <>
        <rect x="3" y="3" width="14" height="14" rx="1.5" fill="#5a9ae8" stroke="#1c4f8c" strokeWidth="1.2" />
        <rect x="6" y="3" width="8" height="5" rx="1" fill="#e8f1fc" stroke="#3a7bc8" strokeWidth="1" />
        <rect x="6" y="10" width="8" height="5" rx="1" fill="#f7fbff" stroke="#5a9ae8" strokeWidth="1" />
      </>
    ),
    undo: (
      <path d="M5 6c0-3 2.5-5 5.5-5s5.5 2.5 5 5.5M5 6l2.5-2.5M5 6l2.5 2.5" fill="none" stroke="#1c4f8c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    ),
    redo: (
      <path d="M15 6c0-3-2.5-5-5.5-5s-5.5 2.5-5 5.5M15 6l-2.5-2.5M15 6l-2.5 2.5" fill="none" stroke="#1c4f8c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    ),
    paste: (
      <>
        <rect x="3.5" y="3.5" width="13" height="14" rx="2" fill="#f5c34e" stroke="#8a5e0a" strokeWidth="1.3" />
        <rect x="6.5" y="1.5" width="7" height="5" rx="1.2" fill="#fff" stroke="#b0862a" strokeWidth="1.1" />
        <path d="M6.5 9.5h7M6.5 12.5h6" stroke="#5c4006" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
    cut: (
      <>
        <circle cx="6" cy="13" r="2.2" fill="none" stroke="#2e6bad" strokeWidth="1.4" />
        <circle cx="12" cy="13" r="2.2" fill="none" stroke="#2e6bad" strokeWidth="1.4" />
        <path d="M7.4 11.7 14 5M10.6 11.7 7 8.1" stroke="#2e6bad" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
    copy: (
      <>
        <rect x="5" y="5" width="8" height="10" rx="1" fill="#d7e6fb" stroke="#6c94c9" />
        <rect x="8" y="3" width="8" height="10" rx="1" fill="#f8fbff" stroke="#6c94c9" />
      </>
    ),
    format: (
      <>
        <path d="M5 5h8" stroke="#194f93" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M7.5 5v9" stroke="#194f93" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 8.5c2 0 3.2 1.2 3.2 2.8 0 1.2-.7 2-1.8 3.5-.6.8-.9 1.4-.9 2.2" fill="none" stroke="#d4880a" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
    growFont: (
      <>
        <path d="M5 14 8 5l3 9M6.2 11h3.6" stroke="#205899" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M13 9h3M14.5 7.5v3" stroke="#2a8a37" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
    shrinkFont: (
      <>
        <path d="M5 14 8 5l3 9M6.2 11h3.6" stroke="#205899" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M13 9h3" stroke="#c74a2b" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
    bold: <path d="M7 4h3.2c1.6 0 2.6.9 2.6 2.2 0 1-.5 1.8-1.5 2.1 1.2.3 1.9 1.1 1.9 2.4 0 1.8-1.3 3-3.4 3H7zM8.9 5.8v2h1.1c.8 0 1.3-.4 1.3-1s-.5-1-1.3-1zm0 3.7v2.3h1.4c.9 0 1.5-.4 1.5-1.2 0-.7-.6-1.1-1.5-1.1z" fill="#1c579c" />,
    italic: <path d="M8 4h5M7 14h5M10 4 8 14" fill="none" stroke="#1c579c" strokeWidth="1.7" strokeLinecap="round" />,
    underline: (
      <>
        <path d="M7 4v4.3c0 1.7 1.1 2.8 2.9 2.8s2.9-1.1 2.9-2.8V4" fill="none" stroke="#1c579c" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 14h8" stroke="#cf7a17" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
    strikethrough: (
      <>
        <path d="M12 5.2c-.5-.6-1.3-1-2.4-1-1.5 0-2.4.7-2.4 1.8 0 2.6 5.7 1.1 5.7 4.3 0 1.8-1.4 3-3.5 3-1.4 0-2.5-.4-3.3-1.2" fill="none" stroke="#1c579c" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M5.8 8.6h8.4" stroke="#cf7a17" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
    subscript: (
      <>
        <path d="M6 5 11 11M11 5 6 11" stroke="#1c579c" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12.3 10.8c.7-.6 1.8-.5 1.8.2 0 .4-.2.7-.8 1.3l-.6.6h1.5" fill="none" stroke="#cf7a17" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    superscript: (
      <>
        <path d="M6 7 11 13M11 7 6 13" stroke="#1c579c" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12.1 4.2c.6-.5 1.5-.4 1.5.2 0 .3-.2.6-.7 1.1l-.5.5h1.3" fill="none" stroke="#cf7a17" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    changeCase: (
      <>
        <path d="M5 13 8 5l3 8M6.2 10.4h3.6" stroke="#1c579c" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M12.4 11.5c.6-.8 1.7-.8 2.2 0 .4.6.2 1.3-.4 2l-.3.3h1" fill="none" stroke="#cf7a17" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    clearFormat: (
      <>
        <path d="M5 13 8 5l3 8M6.2 10.4h3.6" stroke="#1c579c" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M11.5 6.3 14.8 9.6" stroke="#c43a2b" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
    highlight: (
      <>
        <path d="M6 12.5 11.8 6.7l2.2 2.2-5.8 5.8H6z" fill="#f6ca43" stroke="#b98911" />
        <path d="M10.8 5.6 12 4.4l2.4 2.4-1.2 1.2z" fill="#e7eef8" stroke="#5f86ba" />
      </>
    ),
    fontColor: (
      <>
        <path d="M5.5 13.5 8.6 5h2.2l3.1 8.5M7 10.7h5.2" fill="none" stroke="#1c579c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.3 15h8.8" stroke="#d95b3d" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
    bullets: (
      <>
        <circle cx="6" cy="6" r="1.3" fill="#1c579c" />
        <circle cx="6" cy="10" r="1.3" fill="#1c579c" />
        <circle cx="6" cy="14" r="1.3" fill="#1c579c" />
        <path d="M9 6h5M9 10h5M9 14h5" stroke="#1c579c" strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
    numbering: (
      <>
        <path d="M5.4 6h1.4M5.8 5v2M5.2 10.8h1.6l-1.2 1.4h1.2M5.3 14h1.5M6.2 13.3v1.4" stroke="#1c579c" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 6h5M9 10h5M9 14h5" stroke="#1c579c" strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
    multilevel: (
      <>
        <circle cx="6.2" cy="6" r="1.1" fill="#1c579c" />
        <circle cx="8" cy="10" r="1.1" fill="#1c579c" />
        <circle cx="9.8" cy="14" r="1.1" fill="#1c579c" />
        <path d="M9 6h5M10.8 10H15M12.6 14H15" stroke="#1c579c" strokeWidth="1.2" strokeLinecap="round" />
      </>
    ),
    decreaseIndent: (
      <>
        <path d="M10 6h5M8 10h7M10 14h5" stroke="#1c579c" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M5.5 10h3M6.6 8.7 5 10l1.6 1.3" fill="none" stroke="#c96534" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    increaseIndent: (
      <>
        <path d="M10 6h5M8 10h7M10 14h5" stroke="#1c579c" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M5 10h3M6.4 8.7 8 10l-1.6 1.3" fill="none" stroke="#c96534" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    sort: (
      <>
        <path d="M7 5v8M5.5 11.5 7 13.2l1.5-1.7" fill="none" stroke="#1c579c" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 6h4M11 9h3M11 12h2" stroke="#c96534" strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
    showMarks: <path d="M7.2 4.7c1.7 0 2.9 1 2.9 2.6v5.8M10.1 4.7v9.4M7.2 9.5h4.4M5.6 4.7h5.6" fill="none" stroke="#1c579c" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />,
    alignLeft: <path d="M5 6h9M5 9h6.5M5 12h9M5 15h6" stroke="#1c579c" strokeWidth="1.4" strokeLinecap="round" />,
    alignCenter: <path d="M6 6h7M5 9h9M6 12h7M5 15h9" stroke="#1c579c" strokeWidth="1.4" strokeLinecap="round" />,
    alignRight: <path d="M6 6h9M8.5 9H15M6 12h9M9 15h6" stroke="#1c579c" strokeWidth="1.4" strokeLinecap="round" />,
    justify: <path d="M5 6h10M5 9h10M5 12h10M5 15h10" stroke="#1c579c" strokeWidth="1.4" strokeLinecap="round" />,
    lineSpacing: (
      <>
        <path d="M9 6h6M9 10h6M9 14h6" stroke="#1c579c" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M6 4.8v10.4M4.6 6.3 6 4.8l1.4 1.5M4.6 13.7 6 15.2l1.4-1.5" fill="none" stroke="#c96534" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    shading: (
      <>
        <rect x="5" y="6" width="10" height="8" rx="1" fill="#f4d272" stroke="#b1871d" />
        <path d="M5 8.5h10M5 11h10M8.4 6v8M11.7 6v8" stroke="#ffffff" strokeOpacity=".65" strokeWidth=".8" />
      </>
    ),
    borders: (
      <>
        <rect x="5" y="6" width="10" height="8" rx="1" fill="#f6fbff" stroke="#5d86b8" />
        <path d="M10 6v8M5 10h10" stroke="#1c579c" strokeWidth="1.1" />
      </>
    ),
    changeStyles: (
      <>
        <path d="M5 12.5 8 5h2l3 7.5M6.2 10.5h5.6" fill="none" stroke="#1c579c" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 7h2.5M13 10h2M13 13h1.6" stroke="#c96534" strokeWidth="1.2" strokeLinecap="round" />
      </>
    ),
    stylesPane: (
      <>
        <rect x="5" y="5" width="10" height="10" rx="1" fill="#f8fbff" stroke="#5d86b8" />
        <path d="M7 8h6M7 10.7h6M7 13.4h3.5" stroke="#1c579c" strokeWidth="1.1" strokeLinecap="round" />
      </>
    ),
    find: (
      <>
        <circle cx="8.5" cy="8.5" r="4.2" fill="#d4e7f9" stroke="#1c4f8c" strokeWidth="1.5" />
        <path d="m11.5 11.5 3.5 3.5" stroke="#c96534" strokeWidth="2.2" strokeLinecap="round" />
      </>
    ),
    replace: (
      <>
        <path d="M5 7h6M5 11h6" stroke="#1c579c" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M12.5 5.5h2.5m0 0L13.5 4m1.5 1.5L13.5 7M15 11.5h-2.5m0 0 1.5 1.5M15 11.5 13.5 10" fill="none" stroke="#c96534" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    select: (
      <>
        <path d="M5.5 4v9.5l2.3-2.3 1.5 3.2 1.8-.9-1.5-3.3h3.4z" fill="#e8f1fc" stroke="#1c4f8c" strokeWidth="1.3" strokeLinejoin="round" />
      </>
    ),
    bookView: (
      <>
        <path d="M5 5.5h4.7c1.2 0 2 .5 2.3 1.1.3-.6 1.1-1.1 2.3-1.1H15v8.8h-1.7c-.8 0-1.4.2-1.8.7-.4-.5-1-.7-1.8-.7H8z" fill="#f7fbff" stroke="#5d86b8" strokeWidth="1.1" />
      </>
    ),
    printView: (
      <>
        <rect x="5" y="5.5" width="10" height="8.8" rx="1" fill="#f7fbff" stroke="#5d86b8" strokeWidth="1.1" />
        <path d="M8.3 5.5v8.8M11.7 5.5v8.8M5 9.9h10" stroke="#86a8d4" strokeWidth=".9" />
      </>
    ),
    webView: (
      <>
        <circle cx="10" cy="10" r="4.6" fill="#f7fbff" stroke="#5d86b8" strokeWidth="1.1" />
        <path d="M5.8 10h8.4M10 5.4c1.3 1.4 2 3 2 4.6 0 1.6-.7 3.2-2 4.6M10 5.4C8.7 6.8 8 8.4 8 10c0 1.6.7 3.2 2 4.6" fill="none" stroke="#1c579c" strokeWidth="1" />
      </>
    ),
  };

  const normalizedName = name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  const icon = glyphs[normalizedName];

  if (!icon) {
    return <span className={`office-glyph office-glyph--text ${className}`}>{name}</span>;
  }

  return (
    <span className={`office-glyph ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 20 20">{icon}</svg>
    </span>
  );
}

function RibbonItem({ item }) {
  const slug = slugify(item.label);

  if (item.kind === "large") {
    return (
      <button
        type="button"
        className={`ribbon-command ribbon-command--large ribbon-command--${slug}`}
        aria-label={item.label}
      >
        <OfficeGlyph name={item.icon} className="office-glyph--large" />
        <span className="ribbon-command-label">{item.label}</span>
        <RibbonCaret />
      </button>
    );
  }

  if (item.kind === "field") {
    return (
      <button type="button" className={`ribbon-field ribbon-field--${slug}`} aria-label={item.label}>
        <span>{item.label}</span>
        <RibbonCaret />
      </button>
    );
  }

  if (item.kind === "style") {
    return (
      <button type="button" className={`ribbon-style ribbon-style--${slug}`} aria-label={item.label}>
        <div className="ribbon-style-preview">{item.preview || "AaBbCcDd"}</div>
        <div className="ribbon-style-label">{item.label}</div>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`ribbon-command ribbon-command--small ribbon-command--${slug} ${item.showLabel === false ? "is-icon-only" : ""}`}
      aria-label={item.label}
      title={item.label}
    >
      <OfficeGlyph name={item.icon} />
      {item.showLabel === false ? null : <span className="ribbon-command-label">{item.label}</span>}
    </button>
  );
}

function renderGroupBody(group) {
  const groupSlug = slugify(group.title);

  if (groupSlug === "clipboard") {
    const [primary, ...secondary] = group.items;
    return (
      <div className="ribbon-layout ribbon-layout--clipboard">
        <RibbonItem item={primary} />
        <div className="ribbon-stack">
          {secondary.map((item) => (
            <RibbonItem key={item.label} item={item} />
          ))}
        </div>
      </div>
    );
  }

  if (groupSlug === "font") {
    const fields = group.items.filter((item) => item.kind === "field");
    const commands = group.items.filter((item) => item.kind === "small");
    const row1 = commands.slice(0, 5);
    const row2 = commands.slice(5);
    return (
      <div className="ribbon-layout ribbon-layout--font">
        <div className="ribbon-font-fields">
          {fields.map((item) => (
            <RibbonItem key={item.label} item={item} />
          ))}
        </div>
        <div className="ribbon-font-row">
          {row1.map((item) => (
            <RibbonItem key={item.label} item={item} />
          ))}
        </div>
        <div className="ribbon-font-row">
          {row2.map((item) => (
            <RibbonItem key={item.label} item={item} />
          ))}
        </div>
      </div>
    );
  }

  if (groupSlug === "paragraph") {
    const row1 = group.items.slice(0, 5);
    const row2 = group.items.slice(5, 10);
    const row3 = group.items.slice(10);
    return (
      <div className="ribbon-layout ribbon-layout--paragraph">
        <div className="ribbon-para-row">
          {row1.map((item) => (
            <RibbonItem key={item.label} item={item} />
          ))}
        </div>
        <div className="ribbon-para-row">
          {row2.map((item) => (
            <RibbonItem key={item.label} item={item} />
          ))}
        </div>
        <div className="ribbon-para-row ribbon-para-row--last">
          {row3.map((item) => (
            <RibbonItem key={item.label} item={item} />
          ))}
        </div>
      </div>
    );
  }

  if (groupSlug === "styles") {
    const gallery = group.items.filter((item) => item.kind === "style");
    const actions = group.items.filter((item) => item.kind === "small");
    return (
      <div className="ribbon-layout ribbon-layout--styles">
        <div className="ribbon-style-gallery-wrap">
          <div className="ribbon-style-gallery">
            {gallery.map((item) => (
              <RibbonItem key={item.label} item={item} />
            ))}
          </div>
          <button type="button" className="ribbon-gallery-more" aria-label="More styles">
            <RibbonCaret />
          </button>
        </div>
        <div className="ribbon-style-actions">
          {actions.map((item) => (
            <RibbonItem key={item.label} item={item} />
          ))}
        </div>
      </div>
    );
  }

  if (groupSlug === "editing") {
    const [primary, ...secondary] = group.items;
    return (
      <div className="ribbon-layout ribbon-layout--editing">
        <RibbonItem item={primary} />
        {secondary.map((item) => (
          <RibbonItem key={item.label} item={item} />
        ))}
      </div>
    );
  }

  return (
    <div className="ribbon-commands">
      {group.items.map((item) => (
        <RibbonItem key={item.label} item={item} />
      ))}
    </div>
  );
}

export function RetroRibbon({
  tabs = defaultTabs,
  groups = defaultGroups,
  activeTab = tabs[0],
  title = "Retro Ribbon UI Reference Canvas",
  quickAccessItems = ["save", "undo", "redo"],
  statusBarItems = ["Ready", "Page 1 of 1", "English (Canada)", "Words: 245"],
  statusBarMeta = "100%",
}) {
  const resolvedQuickAccessItems = createStableKeys(
    quickAccessItems.map((item) => (typeof item === "string" ? { icon: item, label: item } : item)),
    (item) => item.id || `${item.icon}-${item.label}`
  );

  const resolvedStatusBarItems = createStableKeys(
    statusBarItems.map((item) => (typeof item === "string" ? { value: item } : item)),
    (item) => item.id || item.value
  );

  return (
    <div className="ribbon-app-bg">
      <div className="ribbon-shell r-app">
        <header className="ribbon-titlebar">
          <div className="ribbon-title-row">
            <div className="ribbon-title-left">
              <button type="button" className="ribbon-orb r-orb" aria-label="Application menu">
                <span className="ribbon-orb-mark" />
              </button>
              <div className="ribbon-qta r-qat" aria-label="Quick access toolbar">
                {resolvedQuickAccessItems.map((item) => (
                  <button key={item._key} type="button" className="ribbon-btn ribbon-btn--icon" aria-label={item.label}>
                    <OfficeGlyph name={item.icon} />
                  </button>
                ))}
                <button type="button" className="ribbon-btn ribbon-btn--icon" aria-label="Quick access options">
                  <RibbonCaret />
                </button>
              </div>
              <div className="ribbon-title-text">{title}</div>
            </div>
            <div className="ribbon-win-controls" aria-label="Window controls">
              <button type="button" className="ribbon-btn ribbon-btn--window" aria-label="Minimize">
                <span className="ribbon-window-mark ribbon-window-mark--minimize" />
              </button>
              <button type="button" className="ribbon-btn ribbon-btn--window" aria-label="Maximize">
                <span className="ribbon-window-mark ribbon-window-mark--maximize" />
              </button>
              <button type="button" className="ribbon-btn ribbon-btn--window is-close" aria-label="Close">
                <span className="ribbon-window-mark ribbon-window-mark--close" />
              </button>
            </div>
          </div>

          <div className="ribbon-tabs r-tabs" role="tablist" aria-label="Ribbon tabs">
            {tabs.map((tab) => (
              <button key={tab} type="button" className={`ribbon-tab ${tab === activeTab ? "is-active" : ""}`} role="tab" aria-selected={tab === activeTab}>
                {tab}
              </button>
            ))}
          </div>
        </header>

        <section className="ribbon-panel r-ribbon" aria-label="Ribbon">
          <div className="ribbon-group-wrap">
            {groups.map((group) => {
              const groupSlug = slugify(group.title);
              return (
                <div key={group.title} className={`ribbon-group r-group ribbon-group--${groupSlug}`} role="group" aria-label={group.title}>
                  {renderGroupBody(group)}
                  <div className="ribbon-group-title">{group.title}</div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="ribbon-workspace" aria-label="Document workspace">
          <div className="ribbon-ruler ribbon-ruler--top" aria-hidden="true">
            <span className="ribbon-ruler-marker" />
            {Array.from({ length: 25 }, (_, index) => (
              <span key={`top-${index}`} className={index % 4 === 0 ? "is-major" : ""}>
                {index > 0 && index < 25 && index % 4 === 0 ? <em>{index / 4}</em> : null}
              </span>
            ))}
          </div>
          <div className="ribbon-workspace-main">
            <div className="ribbon-canvas-frame">
              <div className="ribbon-ruler ribbon-ruler--side" aria-hidden="true">
                {Array.from({ length: 20 }, (_, index) => (
                  <span key={index} className={index % 5 === 0 ? "is-major" : ""}>
                    {index > 0 && index < 20 && index % 5 === 0 ? <em>{index / 5}</em> : null}
                  </span>
                ))}
              </div>
              <div className="ribbon-document-rail">
                <article className="ribbon-document r-surface">
                  <h1>Component Library Reference Sheet</h1>
                  <div className="ribbon-document-block">
                    <div className="ribbon-section-heading">
                      <span className="ribbon-section-icon ribbon-section-icon--doc" />
                      <h2>About</h2>
                    </div>
                    <p className="ribbon-lead">
                      This canvas showcases the building blocks of a retro ribbon-inspired UI library.
                    </p>
                    <p className="ribbon-lead">
                      Use these primitives to create nostalgic productivity experiences on the web.
                    </p>
                  </div>

                  <div className="ribbon-document-block">
                    <div className="ribbon-section-heading">
                      <span className="ribbon-section-icon ribbon-section-icon--gear" />
                      <h2>CSS Primitives</h2>
                    </div>
                    <p className="ribbon-lead">
                      Built on semantic HTML and utility classes. Key primitives include:
                    </p>
                    <div className="ribbon-chip-list">
                      {[".r-app", ".r-ribbon", ".r-group", ".r-btn", ".r-gallery", ".r-surface", ".r-status"].map((chip) => (
                        <span key={chip} className="ribbon-chip">{chip}</span>
                      ))}
                    </div>
                  </div>

                  <div className="ribbon-document-block">
                    <div className="ribbon-section-heading">
                      <span className="ribbon-section-icon ribbon-section-icon--bolt" />
                      <h2>Interaction Notes</h2>
                    </div>
                    <ul>
                      <li>Buttons use :hover for glow and :active for pressed state.</li>
                      <li>Dropdowns and galleries open with focus-visible styles.</li>
                      <li>All interactive elements support keyboard navigation and ARIA roles.</li>
                    </ul>
                  </div>

                  <div className="ribbon-document-block">
                    <div className="ribbon-section-heading">
                      <span className="ribbon-section-icon ribbon-section-icon--tag" />
                      <h2>Component Naming</h2>
                    </div>
                    <p className="ribbon-lead">
                      Follow the BEM-like pattern: <span className="ribbon-inline-chip">block__element--modifier</span>
                    </p>
                  </div>
                </article>
                <div className="ribbon-scrollbar ribbon-scrollbar--vertical" aria-hidden="true">
                  <span />
                </div>
              </div>
            </div>

            <aside className="ribbon-sidepane" aria-label="Reference panels">
              <div className="ribbon-pane-card">
                <div className="ribbon-pane-header">
                  <div className="ribbon-pane-title">Visual Tokens</div>
                  <div className="ribbon-pane-actions">
                    <span className="ribbon-pane-badge">i</span>
                    <span className="ribbon-pane-badge ribbon-pane-badge--chevron">^</span>
                  </div>
                </div>
                {panelTokens.map(([name, klass]) => (
                  <div key={name} className="ribbon-pane-row">
                    <span className={`ribbon-pane-preview ribbon-pane-preview--${slugify(klass.replace(".", ""))}`} aria-hidden="true" />
                    <span className="ribbon-pane-label">{name}</span>
                    <code>{klass}</code>
                  </div>
                ))}
              </div>
              <div className="ribbon-pane-card">
                <div className="ribbon-pane-header">
                  <div className="ribbon-pane-title">Components to Build</div>
                  <div className="ribbon-pane-actions">
                    <span className="ribbon-pane-badge">i</span>
                    <span className="ribbon-pane-badge ribbon-pane-badge--chevron">^</span>
                  </div>
                </div>
                {componentTargets.map(([name, klass]) => (
                  <div key={name} className="ribbon-pane-row">
                    <span className="ribbon-pane-cube" aria-hidden="true" />
                    <span className="ribbon-pane-label">{name}</span>
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
              <span key={item._key} className="ribbon-statusbar-item">{item.value}</span>
            ))}
          </div>
          <div className="ribbon-statusbar-right">
            <button type="button" className="ribbon-status-btn is-active" aria-label="Print layout">
              <OfficeGlyph name="print-view" />
            </button>
            <button type="button" className="ribbon-status-btn" aria-label="Read mode">
              <OfficeGlyph name="book-view" />
            </button>
            <button type="button" className="ribbon-status-btn" aria-label="Web layout">
              <OfficeGlyph name="web-view" />
            </button>
            <button type="button" className="ribbon-status-btn ribbon-status-btn--zoom" aria-label="Zoom out">-</button>
            <span className="ribbon-statusbar-zoom-label">{statusBarMeta}</span>
            <button type="button" className="ribbon-status-btn ribbon-status-btn--zoom" aria-label="Zoom in">+</button>
            <div className="ribbon-zoom" aria-hidden="true">
              <span />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default RetroRibbon;
