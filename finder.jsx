// Finder window — projects as files, list & grid views, detail pane
const { useState: useStateF } = React;

function Finder({ projects, selectedId, onSelect }) {
  const [view, setView] = useStateF("list");
  const sel = projects.find((p) => p.id === selectedId) || projects[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="finder-toolbar">
        <span className="crumbs">~/work/<b>uc-berkeley-mids</b></span>
        <div style={{ flex: 1 }} />
        <div className="seg">
          <button className={view === "list" ? "on" : ""} onClick={() => setView("list")}>≡ list</button>
          <button className={view === "grid" ? "on" : ""} onClick={() => setView("grid")}>▦ grid</button>
        </div>
        <span style={{ color: "var(--ink-3)" }}>{projects.length} items</span>
      </div>
      <div className="finder-split" style={{ flex: 1, minHeight: 0 }}>
        <div className="finder-rail">
          {view === "list" ? (
            <table className="finder-list">
              <thead>
                <tr>
                  <th></th><th>Name</th><th>Modified</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className={p.id === sel.id ? "sel" : ""} onClick={() => onSelect(p.id)}>
                    <td className="fl-icon">{kindIcon(p.kind)}</td>
                    <td className="fl-name">{p.name}</td>
                    <td className="fl-date">{p.modified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="finder-grid">
              {projects.map((p) => (
                <div key={p.id} className="fcard" onClick={() => onSelect(p.id)}>
                  <div className="fcard-thumb">
                    <div className="thumb-stripe" />
                    <div className="thumb-glyph">{p.glyph}</div>
                    <div className="thumb-mono">{p.kind}</div>
                  </div>
                  <div className="fcard-meta">
                    <div className="fcard-name">{p.name}</div>
                    <div className="fcard-tag">{p.modified} · {p.size}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="finder-detail">
          <div className="crumb-class">{sel.course}</div>
          <h2>{sel.title}</h2>
          <div style={{ display: "flex", gap: 6, margin: "10px 0 6px" }}>
            {sel.tags.map((t) => <span key={t} className={`tag ${sel.accent}`}>{t}</span>)}
          </div>
          <p style={{ marginTop: 14, fontSize: 14, color: "var(--ink-2)" }}>{sel.blurb}</p>
          <div className="keyfind"><b>Finding · </b>{sel.finding}</div>
          <div className="stack">
            {sel.stack.map((s) => <span key={s}>{s}</span>)}
          </div>
          <div>
            {sel.code && <a className="linkbtn" href={sel.code} target="_blank" rel="noreferrer">→ View code</a>}
            {sel.slides && <a className="linkbtn" href={sel.slides} target="_blank" rel="noreferrer">→ Slides / paper</a>}
          </div>
        </div>
      </div>
    </div>
  );
}

function kindIcon(kind) {
  const map = {
    notebook: "📓",
    graph: "◍",
    stats: "β",
    doc: "¶",
    python: "py",
    data: "▦",
  };
  return <span style={{ fontFamily: "var(--mono)", color: "var(--ink-3)" }}>{map[kind] || "•"}</span>;
}

window.Finder = Finder;
