// Clean resume view — default landing for recruiters
function ProjectCard({ p }) {
  return (
    <div className={`rv-card rv-card--${p.accent}`}>
      <div className="rv-card-img">
        <img
          src={p.preview}
          alt={p.title}
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <div className="rv-card-img-fallback">
          <span>{p.glyph}</span>
        </div>
      </div>
      <div className="rv-card-body">
        <h3 className="rv-card-title">{p.title}</h3>
        <p className="rv-card-hook">{p.hook}</p>
        <div className="rv-card-tags">
          {p.tags.map((t) => (
            <span key={t} className={`rv-card-tag rv-card-tag--${p.accent}`}>{t}</span>
          ))}
        </div>
        <div className="rv-card-actions">
          {p.slides && (
            <a href={p.slides} target="_blank" rel="noreferrer" className="rv-card-btn">
              View Slides ↗
            </a>
          )}
          {p.code && (
            <a href={p.code} target="_blank" rel="noreferrer" className={`rv-card-btn rv-card-btn--filled rv-card-btn--${p.accent}`}>
              View Code ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ResumeView({ onSwitchOS }) {
  const D = window.PORTFOLIO_DATA;
  const C = D.CONTACT;
  return (
    <div className="resume-view">
      <header className="rv-top">
        <div className="rv-top-inner">
          <div>
            <div className="rv-name">Sai Sriya Mudigonda</div>
            <div className="rv-role">Data Engineer · Wells Fargo &nbsp;·&nbsp; MIDS '26 · UC Berkeley</div>
          </div>
          <div className="rv-top-right">
            <a href={`mailto:${C.email}`} className="rv-link">{C.email}</a>
            <a href={C.linkedin} target="_blank" rel="noreferrer" className="rv-link">LinkedIn</a>
            <a href={C.github} target="_blank" rel="noreferrer" className="rv-link">GitHub</a>
            <button className="rv-toggle" onClick={onSwitchOS} title="Switch to interactive desktop view">
              <span className="rv-toggle-glyph">▦</span> Try the desktop view
            </button>
          </div>
        </div>
      </header>

      <main className="rv-main">
        <section className="rv-hero">
          <h1>Sai Sriya Mudigonda — <em className="rv-em">data engineer / analyst</em> shipping data products at scale.</h1>
          <p>I'm a data engineer at <b>Wells Fargo</b>, where I've supported enterprise cloud migration from Teradata to GCP across 90+ systems and built reusable Python ingestion frameworks. I'm finishing my <b>Master of Information and Data Science at UC Berkeley</b> in December 2026, and I'm looking for data scientist, data engineer, or technical PM roles where the pipeline meets the decision.</p>
          <div className="rv-stack">
            <span>Python</span><span>SQL</span><span>R</span><span>GCP / BigQuery</span><span>Spark</span><span>Databricks</span><span>PyTorch</span><span>XGBoost</span><span>scikit-learn</span><span>A/B Testing</span><span>Tableau</span>
          </div>
        </section>

        <section className="rv-sec">
          <div className="rv-sec-head">
            <h2>Selected projects</h2>
            <span className="rv-sec-meta">UC Berkeley MIDS · 2025–2026</span>
          </div>
          <div className="rv-masonry">
            {D.PROJECTS.map((p) => <ProjectCard key={p.id} p={p} />)}
          </div>
        </section>

        <section className="rv-sec rv-grid-2">
          <div>
            <h2>Experience</h2>
            <div className="rv-job">
              <div className="rv-job-head">
                <b>Data Engineer</b><span>Wells Fargo · 2023 → present</span>
              </div>
              <ul>
                <li>Supported enterprise cloud migration from Teradata to GCP across <b>90+ systems</b>.</li>
                <li>Built reusable API ingestion frameworks in Python; integrated self-service analytics tools so business teams could ship decisions without engineering tickets.</li>
                <li>Board member, Wells Fargo Women in Technology.</li>
              </ul>
            </div>
            <div className="rv-job">
              <div className="rv-job-head">
                <b>BS Statistics &amp; BA Economics</b><span>UC Davis · 2019–2023</span>
              </div>
              <ul>
                <li>Director of Operations, HackDavis (750+ attendees).</li>
                <li>President, largest student business org (150+ members).</li>
                <li>Lead, OWN IT Women's Leadership Conference.</li>
                <li>Managed 10+ research interns in UC Davis Student Government.</li>
              </ul>
            </div>
          </div>
          <div>
            <h2>What I'm looking for</h2>
            <p>Data scientist, data engineer, or technical PM roles on teams building data products that solve real problems — where I can work the full pipeline from infrastructure to insight.</p>
            <h2 style={{marginTop: 28}}>Education</h2>
            <div className="rv-job">
              <div className="rv-job-head">
                <b>M.S., Information &amp; Data Science</b><span>UC Berkeley · 2025 – Dec 2026</span>
              </div>
              <p style={{fontSize: 13.5, color: "var(--ink-2)", marginTop: 4}}>Coursework: Applied ML, ML at Scale, Statistical Methods, Data Engineering, Research Design, Python for Data Science.</p>
            </div>
            <h2 style={{marginTop: 28}}>Get in touch</h2>
            <div className="rv-contact-row">
              <a href={`mailto:${C.email}`} className="rv-cta">{C.email} ↗</a>
            </div>
            <div className="rv-contact-row" style={{marginTop: 10}}>
              <a href={C.linkedin} target="_blank" rel="noreferrer" className="rv-link">LinkedIn</a>
              <a href={C.github} target="_blank" rel="noreferrer" className="rv-link">GitHub</a>
            </div>
          </div>
        </section>

        <footer className="rv-foot">
          <span>Sai Sriya Mudigonda · 2026</span>
          <button className="rv-toggle rv-toggle-foot" onClick={onSwitchOS}>
            <span className="rv-toggle-glyph">▦</span> Or — try the desktop view
          </button>
        </footer>
      </main>
    </div>
  );
}

window.ResumeView = ResumeView;
