// Main shell: menubar + dock + windows
const { useState: useStateA, useEffect: useEffectA } = React;

function Menubar({ activeApp, time, onSwitchResume, onCloseAll }) {
  return (
    <div className="menubar">
      <div className="mb-left">
        <span className="mb-logo">Sriya</span>
        <span className="mb-item active">{activeApp}</span>
        <span className="mb-item">File</span>
        <span className="mb-item">Edit</span>
        <span className="mb-item">View</span>
        <span className="mb-item">Window</span>
        <span className="mb-item">Help</span>
      </div>
      <div className="mb-right">
        <button className="mb-mode-toggle mb-close-all" onClick={onCloseAll} title="Close all windows except readme.md">✕ Close all</button>
        <button className="mb-mode-toggle" onClick={onSwitchResume} title="Back to resume view">↩ Resume view</button>
        <span className="mb-status"><span className="mb-dot"></span>open to roles</span>
        <span className="mb-status">⌘K</span>
        <span>{time}</span>
      </div>
    </div>
  );
}

const APP_META = {
  hero:     { title: "readme.md",          glyph: "✦",  label: "Read me" },
  finder:   { title: "Projects",           glyph: "▦",  label: "Projects" },
  terminal: { title: "Terminal",           glyph: ">_", label: "Terminal" },
  about:    { title: "about-me.md",        glyph: "¶",  label: "About me" },
  photos:   { title: "Photos",             glyph: "◐",  label: "Photos" },
  contact:  { title: "Mail · Compose",     glyph: "✉",  label: "Contact" },
};

function Dock({ windows, onOpen, focusedId }) {
  const order = ["hero", "finder", "about", "terminal", "contact", "photos"];
  return (
    <div className="dock-wrap">
      <div className="dock">
        {order.map((id, i) => {
          const w = windows.find((w) => w.id === id);
          const isOpen = w && w.open && !w.minimized;
          return (
            <React.Fragment key={id}>
              <div
                className={`dock-item ${isOpen ? "open" : ""}`}
                onClick={() => onOpen(id)}
              >
                <span style={{ fontFamily: "var(--mono)", fontSize: 16 }}>{APP_META[id].glyph}</span>
                <div className="dock-tooltip">{APP_META[id].label}</div>
              </div>
              {(i === 0 || i === 3) && <div className="dock-divider" />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  const [mode, setMode] = useStateA(() => {
    const stored = (typeof localStorage !== "undefined") ? localStorage.getItem("portfolio_mode") : null;
    return stored === "os" ? "os" : "resume";
  });

  useEffectA(() => {
    document.body.classList.toggle("resume-mode", mode === "resume");
    if (typeof localStorage !== "undefined") localStorage.setItem("portfolio_mode", mode);
  }, [mode]);

  if (mode === "resume") {
    return <window.ResumeView onSwitchOS={() => setMode("os")} />;
  }
  return <OSShell onSwitchResume={() => setMode("resume")} />;
}

function OSShell({ onSwitchResume }) {
  const projects = window.PORTFOLIO_DATA.PROJECTS;
  const [selectedProject, setSelectedProject] = useStateA(projects[0].id);
  const [time, setTime] = useStateA(currentTime());

  useEffectA(() => {
    const t = setInterval(() => setTime(currentTime()), 30000);
    return () => clearInterval(t);
  }, []);

  // initial layout — only the readme/hero is open by default
  const initial = [
    { id: "hero",     title: APP_META.hero.title,     x: 120, y: 70,  w: 760, h: 540, z: 105, open: true,  minimized: false },
    { id: "finder",   title: APP_META.finder.title,   x: 200, y: 110, w: 880, h: 540, z: 104, open: false, minimized: false },
    { id: "terminal", title: APP_META.terminal.title, x: 240, y: 380, w: 540, h: 280, z: 103, open: false, minimized: false },
    { id: "about",    title: APP_META.about.title,    x: 180, y: 110, w: 760, h: 540, z: 102, open: false, minimized: false },
    { id: "photos",   title: APP_META.photos.title,   x: 220, y: 90,  w: 760, h: 560, z: 101, open: false, minimized: false },
    { id: "contact",  title: APP_META.contact.title,  x: 240, y: 100, w: 720, h: 540, z: 100, open: false, minimized: false },
  ];

  const wm = window.useWindowManager(initial);
  const focusedTitle = APP_META[wm.focusedId]?.label || "Sriya";

  const closeAll = React.useCallback(() => {
    wm.windows.forEach((w) => { if (w.id !== "hero") wm.close(w.id); });
    wm.focus("hero");
  }, [wm]);

  // Cmd+K opens terminal as a quick toggle
  useEffectA(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        wm.open("terminal");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [wm.open]);

  const Win = window.Window;

  return (
    <>
      <Menubar activeApp={focusedTitle} time={time} onSwitchResume={onSwitchResume} onCloseAll={closeAll} />
      <div className="desktop-icons">
        <div className="dicon" onClick={() => wm.open("finder")}>
          <div className="dicon-img">▦</div>
          <div className="dicon-label">Projects</div>
        </div>
        <div className="dicon" onClick={() => wm.open("about")}>
          <div className="dicon-img">¶</div>
          <div className="dicon-label">About me</div>
        </div>
        <div className="dicon" onClick={() => wm.open("contact")}>
          <div className="dicon-img">✉</div>
          <div className="dicon-label">Contact</div>
        </div>
      </div>
      <div className="desktop-icons desktop-icons-bottom">
        <div className="dicon" onClick={() => wm.open("photos")}>
          <div className="dicon-img">◐</div>
          <div className="dicon-label">Photos</div>
        </div>
      </div>

      {wm.windows.map((w) => {
        const focused = wm.focusedId === w.id;
        const baseProps = { win: w, focused, onFocus: wm.focus, onClose: wm.close, onMinimize: wm.minimize, onMove: wm.move, key: w.id };
        if (w.id === "hero") {
          return <Win {...baseProps} extraClass="hero-win">{window.HeroWindow()}</Win>;
        }
        if (w.id === "finder") {
          return <Win {...baseProps} extraClass="finder">{window.Finder({ projects, selectedId: selectedProject, onSelect: setSelectedProject })}</Win>;
        }
        if (w.id === "terminal") {
          return <Win {...baseProps} extraClass="terminal">{window.Terminal({ onOpen: wm.open })}</Win>;
        }
        if (w.id === "about") {
          return <Win {...baseProps} extraClass="about-win">{window.AboutWindow()}</Win>;
        }
        if (w.id === "photos") {
          return <Win {...baseProps} extraClass="photos">{window.PhotosWindow()}</Win>;
        }
        if (w.id === "contact") {
          return <Win {...baseProps} extraClass="contact">{window.ContactWindow()}</Win>;
        }
        return null;
      })}

      <Dock windows={wm.windows} onOpen={wm.open} focusedId={wm.focusedId} />
      <div className="boot-hint">drag windows · click dock · ⌘K for terminal</div>
    </>
  );
}

function currentTime() {
  const d = new Date();
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let h = d.getHours(); const m = d.getMinutes().toString().padStart(2,"0");
  const ap = h >= 12 ? "PM" : "AM"; h = h % 12 || 12;
  return `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}  ${h}:${m} ${ap}`;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
