// Funnel.app, About, Photos, Contact windows
const { useState: useStateO, useEffect: useEffectO } = React;

function FunnelApp() {
  const stages = [
    { stage: "BS Managerial Economics", sub: "UC Davis · 2017–2021", w: 100 },
    { stage: "Data Engineer",           sub: "Wells Fargo · 2021–present", w: 86 },
    { stage: "Cloud migration",         sub: "Teradata → GCP · 90+ systems", w: 72 },
    { stage: "MIDS, UC Berkeley",       sub: "M.S. Data Science · '24–'26", w: 58 },
    { stage: "Next chapter",            sub: "Data Scientist / DE / Technical PM", w: 44 },
  ];
  const [armed, setArmed] = useStateO(false);
  useEffectO(() => { const t = setTimeout(() => setArmed(true), 120); return () => clearTimeout(t); }, []);
  return (
    <div>
      <div className="funnel-head">
        <div>
          <h2>The path so far</h2>
          <div className="dim">2017 → present · narrowing toward the work I want next</div>
        </div>
      </div>
      <div className="funnel-canvas">
        {stages.map((s, i) => (
          <div className="funnel-row" key={s.stage}>
            <div className="funnel-stage">
              {s.stage}
              <span className="when">{s.sub}</span>
            </div>
            <div className="funnel-bar">
              <div className="fill" style={{ width: armed ? `${s.w}%` : "0%", transitionDelay: `${i * 120}ms` }} />
            </div>
            <div className="funnel-conv">
              <span style={{color:"var(--ink-4)"}}>step {i + 1}</span>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 18, fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)", padding: "12px 14px", background: "var(--bone)", borderRadius: 6, lineHeight: 1.6 }}>
          Five years building data pipelines taught me how data moves. Berkeley is teaching me what to ask of it. I'm looking for roles where I get to do both.
        </div>
      </div>
    </div>
  );
}

function AboutWindow() {
  const A = window.PORTFOLIO_DATA.ABOUT;
  return (
    <div className="about-win">
      <div className="win-body" style={{padding:"32px 36px"}}>
        <div className="eyebrow"># about · readme.md</div>
        <h2>The long version.</h2>
        {A.intro.map((p, i) => <p key={i}>{p}</p>)}
        <div className="divider" />
        <div className="about-grid">
          <div className="about-card">
            <h3>What I'm looking for</h3>
            <p style={{fontSize:13, color:"var(--ink-2)"}}>{A.looking}</p>
          </div>
          <div className="about-card">
            <h3>Beyond the data</h3>
            <ul>
              {A.beyond.map((b) => (
                <li key={b.what}><b>{b.what}</b> — {b.detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhotosWindow() {
  const tiles = window.PORTFOLIO_DATA.PHOTO_TILES;
  return (
    <div>
      <div className="photos-head">
        <div>
          <div className="eyebrow">/photos · 2024–2026</div>
          <h2>Off the clock.</h2>
        </div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)" }}>
          mostly 35mm · sometimes phone
        </div>
      </div>
      <div className="photos-grid">
        {tiles.map((t, i) => (
          <div key={i} className={`photo ${t.span || ""}`} style={{ background: t.color }}>
            <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
              <defs>
                <pattern id={`grain-${i}`} width="3" height="3" patternUnits="userSpaceOnUse">
                  <rect width="3" height="3" fill={t.color} />
                  <circle cx="1" cy="1" r="0.5" fill="rgba(255,255,255,.08)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grain-${i})`} />
            </svg>
            <div className="label">{t.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactWindow() {
  const C = window.PORTFOLIO_DATA.CONTACT;
  return (
    <div>
      <div className="contact-toolbar">
        <span>📨 New message</span>
        <span style={{ color: "var(--ink-4)" }}> · draft saved</span>
        <a className="send" href={`mailto:${C.email}`}>↗ Send to Sriya</a>
      </div>
      <div className="contact-fields">
        <div className="row"><b>To:</b><span>{C.email}</span></div>
        <div className="row"><b>From:</b><span>you@yourcompany.com</span></div>
        <div className="row"><b>Subject:</b><span>Re: opportunity at [your team]</span></div>
      </div>
      <div className="contact-body">
        <h2>Let's talk.</h2>
        <p>I read every email I get. If you're hiring for a data scientist, data engineer, or technical PM role — or if you just want to nerd out about funnels, fairness in ML, or 35mm film — I'd love to hear from you.</p>
        <p>I'm in San Francisco, available for coffee or video, and graduating in December 2026.</p>
        <div className="signoff">— Sriya</div>
        <div className="contact-links">
          <a href={`mailto:${C.email}`}>✉ {C.email}</a>
          <a href={C.linkedin} target="_blank" rel="noreferrer">↗ LinkedIn</a>
          <a href={C.github} target="_blank" rel="noreferrer">↗ GitHub</a>
        </div>
      </div>
    </div>
  );
}

window.FunnelApp = FunnelApp;
window.AboutWindow = AboutWindow;
window.PhotosWindow = PhotosWindow;
window.ContactWindow = ContactWindow;
