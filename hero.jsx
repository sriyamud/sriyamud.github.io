// Sparkline + funnel visualization helpers
function Sparkline({ points, stroke = "var(--ink)", fill = "none", width = 120, height = 22 }) {
  if (!points || points.length < 2) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const step = width / (points.length - 1);
  const coords = points.map((p, i) => [i * step, height - ((p - min) / span) * (height - 4) - 2]);
  const d = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(" ");
  const area = `${d} L${width},${height} L0,${height} Z`;
  return (
    <svg className="sparkline" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      {fill !== "none" && <path d={area} fill={fill} opacity=".15" />}
      <path d={d} stroke={stroke} fill="none" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={coords[coords.length - 1][0]} cy={coords[coords.length - 1][1]} r="2" fill={stroke} />
    </svg>
  );
}

function HeroWindow() {
  const stack = ["Python","SQL","R","GCP / BigQuery","Spark","Databricks","PyTorch","XGBoost","scikit-learn","A/B Testing","Tableau"];
  return (
    <div className="hero-card">
      <div className="eyebrow">~/portfolio · readme.md</div>
      <h1>Sai Sriya Mudigonda — <em>data engineer / analyst</em> shipping data products at scale.</h1>
      <p className="hero-sub">
        I'm a data engineer at Wells Fargo, where I've supported enterprise cloud migration from Teradata to GCP across 90+ systems and built reusable Python ingestion frameworks. I'm finishing my Master of Information and Data Science at UC Berkeley in December 2026, and I'm looking for data scientist, data engineer, or technical PM roles where the pipeline meets the decision.
      </p>
      <div className="hero-stack">
        {stack.map((s) => <span key={s}>{s}</span>)}
      </div>
      <PathSoFar />
    </div>
  );
}

function PathSoFar() {
  const stages = [
    { stage: "BS Statistics & BA Economics", sub: "UC Davis · 2019–2023", w: 100 },
    { stage: "Data Engineer",                sub: "Wells Fargo · 2023–present", w: 86 },
    { stage: "Cloud migration",              sub: "Teradata → GCP · 90+ systems", w: 72 },
    { stage: "MIDS, UC Berkeley",            sub: "M.S. Data Science · 2025–2026", w: 58 },
    { stage: "Next chapter",                 sub: "Data Scientist / DE / Technical PM", w: 44 },
  ];
  const [armed, setArmed] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setArmed(true), 300); return () => clearTimeout(t); }, []);
  return (
    <div className="path-so-far">
      <div className="path-head">
        <div className="eyebrow">## the path so far</div>
      </div>
      <div className="path-rows">
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
      </div>
      <div className="path-note">
        Five years building data pipelines taught me how data moves. Berkeley is teaching me what to ask of it. I'm looking for roles where I get to do both.
      </div>
    </div>
  );
}

window.Sparkline = Sparkline;
window.HeroWindow = HeroWindow;
