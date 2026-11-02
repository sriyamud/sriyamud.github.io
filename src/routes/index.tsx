import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Menu, Moon, Sun, X } from "lucide-react";
import { ABOUT, CONTACT, EDUCATION, EXPERIENCE, NAME, PROJECTS, STACK } from "@/lib/content";
import portraitCutout from "@/assets/portrait-cutout.png";
import binaryTexture from "@/assets/binary-texture.png";
import { Button } from "@/components/ui/button";

const DESC =
  "Sai Sriya Mudigonda — CTO at a stealth deep tech company, data engineer at Fremont Group, and Masters in DS at UC Berkeley. Selected data science, ML and data engineering projects.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sai Sriya Mudigonda — Data Engineer & Data Scientist" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Sai Sriya Mudigonda — Data Engineer & Data Scientist" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["education", "Education"],
  ["contact", "Contact"],
] as const;

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };
  return { dark, toggle };
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

function Eyebrow({ children }: { children: string }) {
  return <p className="eyebrow">// {children}</p>;
}

function Entry({ e }: { e: (typeof EXPERIENCE)[number] | (typeof EDUCATION)[number] }) {
  return (
    <article className="row">
      <div className="row-head">
        <h3 className="h3">{e.title}</h3>
        <span className="mono muted">
          {e.org} · {e.when}
        </span>
      </div>
      {e.points.length > 0 && <ul className="list">
        {e.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>}
    </article>
  );
}

function Index() {
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  useReveal();

  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <header className="nav">
        <div className="wrap nav-inner">
          <a href="#top" className="nav-name">
            {NAME}
          </a>
          <nav aria-label="Primary" className={open ? "nav-links open" : "nav-links"}>
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <button className="icon-btn" onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
              {dark ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
            </button>
            <button className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu">
              {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
            <Button asChild variant="outline" size="sm" className="nav-contact">
              <a href="#contact" onClick={() => setOpen(false)}>Get in touch</a>
            </Button>
          </div>
        </div>
      </header>

      <main id="main" className="wrap">
        <section id="top" className="hero reveal">
          <div className="hero-grid">
            <div>
              <h1 className="h1">
                Hi, I'm Sriya, shipping data products at <span className="mono-word">scale</span>
              </h1>
              <p className="hero-intro">
                {NAME}, <strong>CTO of a stealth deep tech company</strong> and{" "}
                <strong>data engineer at Fremont Group</strong>, previously at <strong>Wells Fargo</strong>.
              </p>
              <p className="hero-intro">
                <strong>Masters in DS · UC Berkeley</strong>.
              </p>
              <div className="actions">
                <a className="pill pill-solid" href={CONTACT.github} target="_blank" rel="noreferrer">
                  <Github size={16} strokeWidth={1.5} aria-hidden /> GitHub
                </a>
                <a className="pill" href={CONTACT.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={16} strokeWidth={1.5} aria-hidden /> LinkedIn
                </a>
                <a className="pill" href={`mailto:${CONTACT.email}`}>
                  <Mail size={16} strokeWidth={1.5} aria-hidden /> Email
                </a>
              </div>
            </div>
            <figure className="portrait-fig">
              <img src={binaryTexture} alt="" aria-hidden="true" className="portrait-texture" />
              <img src={portraitCutout} alt="Portrait of Sai Sriya Mudigonda" width={720} height={960} className="portrait" />
            </figure>
          </div>
          <div className="hero-meta mono">
            <span>UC Berkeley · Masters in DS</span>
            <span>↓ Scroll</span>
            <span>Data · ML</span>
          </div>
        </section>

        <section id="about" className="section reveal" aria-labelledby="about-h">
          <Eyebrow>About</Eyebrow>
          <h2 id="about-h" className="h2">Where the pipeline meets the decision.</h2>
          {ABOUT.map((p) => (
            <p key={p} className="body">
              {p}
            </p>
          ))}
          <ul className="tags mt" aria-label="Skills">
            {STACK.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <section id="experience" className="section reveal" aria-labelledby="exp-h">
          <Eyebrow>Experience</Eyebrow>
          <h2 id="exp-h" className="h2">Experience</h2>
          {EXPERIENCE.map((e) => (
            <Entry key={e.title + e.org} e={e} />
          ))}
        </section>

        <section id="projects" className="section reveal" aria-labelledby="proj-h">
          <Eyebrow>Projects</Eyebrow>
          <h2 id="proj-h" className="h2">Selected projects</h2>
          <p className="mono muted">UC Berkeley · Masters in DS · 2025–2026</p>
          <div className="projects">
            {PROJECTS.map((p, i) => (
              <article key={p.title} className="card reveal">
                <div className="card-body">
                  <p className="mono muted">{String(i + 1).padStart(2, "0")} — {p.course.toUpperCase()}</p>
                  <h3 className="h3">{p.title}</h3>
                  <p className="body">{p.hook}</p>
                  <ul className="tags">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <div className="links">
                    <a href={p.code} target="_blank" rel="noreferrer" className="link">
                      View code ↗
                    </a>
                    <a href={p.slides} target="_blank" rel="noreferrer" className="link">
                      View slides ↗
                    </a>
                  </div>
                </div>
                <figure className="shot-fig">
                  <a href={p.slides} target="_blank" rel="noreferrer" className="project-preview" aria-label={`View slides for ${p.title}`}>
                    <img src={p.preview} alt={`${p.title} preview`} loading="lazy" decoding="async" className="shot" />
                  </a>
                  <figcaption className="fig-cap">FIG.{String(i + 1).padStart(2, "0")}</figcaption>
                </figure>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section reveal" aria-labelledby="edu-h">
          <Eyebrow>Education</Eyebrow>
          <h2 id="edu-h" className="h2">Education</h2>
          {EDUCATION.map((e) => (
            <Entry key={e.title + e.org} e={e} />
          ))}
        </section>

        <section id="contact" className="section reveal" aria-labelledby="contact-h">
          <Eyebrow>Contact</Eyebrow>
          <h2 id="contact-h" className="h2">Get in touch</h2>
          <div className="actions">
            <a className="pill pill-solid" href={`mailto:${CONTACT.email}`}>
              <Mail size={16} strokeWidth={1.5} aria-hidden /> Email
            </a>
            <a className="pill" href={CONTACT.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={16} strokeWidth={1.5} aria-hidden /> LinkedIn
            </a>
            <a className="pill" href={CONTACT.github} target="_blank" rel="noreferrer">
              <Github size={16} strokeWidth={1.5} aria-hidden /> GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">{NAME} · 2026</div>
      </footer>
    </>
  );
}
