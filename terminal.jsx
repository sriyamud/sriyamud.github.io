// Terminal — a real, tiny REPL
const { useState: useStateT, useRef: useRefT, useEffect: useEffectT } = React;

const COMMANDS = {
  help: () => [
    "available commands:",
    "  about            who is sai sriya",
    "  ls work/         list projects",
    "  cat <project>    print a project file",
    "  stack            tech stack",
    "  contact          email + socials",
    "  open <app>       open a window (projects, about, photos, contact)",
    "  whoami           ¯\\_(ツ)_/¯",
    "  clear            clear terminal",
  ],
  about: () => [
    "Sai Sriya Mudigonda",
    "Data Engineer @ Wells Fargo · MIDS @ UC Berkeley '26",
    "Looking for: data science / data engineering / technical PM",
  ],
  whoami: () => ["sai sriya mudigonda"],
  stack: () => [
    "languages : python · sql · r",
    "platforms : gcp · bigquery · databricks · spark",
    "ml        : xgboost · pytorch · scikit-learn · transformers",
    "viz       : tableau · matplotlib · ggplot2",
    "research  : a/b testing · power analysis · causal design",
  ],
  contact: () => [
    "smudigonda252@gmail.com",
    "github.com/sriyamud",
    "linkedin.com/in/saisriyamudigonda",
  ],
};

function Terminal({ onOpen }) {
  const [lines, setLines] = useStateT([
    { kind: "out", text: "sriya-os · v26.5 · build 0426" },
    { kind: "out", text: "type 'help' to begin." },
  ]);
  const [input, setInput] = useStateT("");
  const [history, setHistory] = useStateT([]);
  const [hIdx, setHIdx] = useStateT(-1);
  const scrollRef = useRefT();
  const inputRef = useRefT();

  useEffectT(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const focus = () => inputRef.current && inputRef.current.focus();
  useEffectT(() => { focus(); }, []);

  const run = (raw) => {
    const cmd = raw.trim();
    const newLines = [...lines, { kind: "cmd", text: cmd }];
    if (!cmd) { setLines(newLines); return; }
    const [head, ...rest] = cmd.split(/\s+/);
    let out = [];
    if (head === "clear") {
      setLines([]);
      return;
    } else if (COMMANDS[head]) {
      out = COMMANDS[head]();
    } else if (head === "ls") {
      out = window.PORTFOLIO_DATA.PROJECTS.map((p) => `  ${p.name.padEnd(34, " ")}${p.kind.padEnd(10," ")}${p.size}`);
    } else if (head === "cat") {
      const target = rest[0];
      const p = window.PORTFOLIO_DATA.PROJECTS.find((x) => x.name.startsWith(target) || x.id === target);
      if (!p) out = [`cat: ${target || "(no file)"}: no such file`];
      else out = [
        `# ${p.title}`,
        `> ${p.course}`,
        "",
        p.blurb,
        "",
        `[finding] ${p.finding}`,
        `[stack] ${p.stack.join(" · ")}`,
        `[code] ${p.code || "—"}`,
      ];
    } else if (head === "open") {
      const tgt = rest[0];
      const map = { finder: "finder", projects: "finder", work: "finder", about: "about", photos: "photos", contact: "contact", readme: "hero", hero: "hero" };
      if (map[tgt]) { onOpen(map[tgt]); out = [`opened ${tgt} →`]; }
      else out = [`open: unknown app '${tgt || ""}'`];
    } else if (head === "sudo") {
      out = ["sudo: permissions not required — this is a portfolio."];
    } else {
      out = [`zsh: command not found: ${head}`];
    }
    setLines([...newLines, ...out.map((t) => ({ kind: "out", text: t }))]);
    setHistory((h) => [cmd, ...h].slice(0, 30));
    setHIdx(-1);
  };

  const onKey = (e) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(hIdx + 1, history.length - 1);
      setHIdx(next);
      if (history[next] !== undefined) setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(hIdx - 1, -1);
      setHIdx(next);
      setInput(next === -1 ? "" : history[next]);
    }
  };

  const renderLine = (l, i) => {
    if (l.kind === "cmd") {
      return (
        <div className="term-line" key={i}>
          <span className="term-prompt">sriya@os</span>
          <span className="term-dim"> · </span>
          <span className="term-path">~</span>
          <span className="term-dim"> $ </span>
          <span className="term-cmd">{l.text}</span>
        </div>
      );
    }
    return <div className="term-line term-out" key={i}>{l.text}</div>;
  };

  return (
    <div ref={scrollRef} style={{ height: "100%", overflow: "auto", padding: "12px 16px" }} onClick={focus}>
      {lines.map(renderLine)}
      <div className="term-line">
        <span className="term-prompt">sriya@os</span>
        <span className="term-dim"> · </span>
        <span className="term-path">~</span>
        <span className="term-dim"> $ </span>
        <input
          ref={inputRef}
          className="term-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          autoFocus
          spellCheck={false}
        />
      </div>
    </div>
  );
}

window.Terminal = Terminal;
