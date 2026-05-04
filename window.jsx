// Window component + window manager hook
const { useState, useRef, useEffect, useCallback } = React;

function useWindowManager(initial) {
  const [windows, setWindows] = useState(initial);
  const [zCounter, setZCounter] = useState(100);
  const [focusedId, setFocusedId] = useState(initial[0]?.id);

  const focus = useCallback((id) => {
    setZCounter((z) => {
      const next = z + 1;
      setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, z: next, open: true, minimized: false } : w)));
      return next;
    });
    setFocusedId(id);
  }, []);

  const open = useCallback((id) => {
    setWindows((ws) => {
      const exists = ws.find((w) => w.id === id);
      if (exists) {
        return ws.map((w) => (w.id === id ? { ...w, open: true, minimized: false } : w));
      }
      return ws;
    });
    focus(id);
  }, [focus]);

  const close = useCallback((id) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, open: false } : w)));
  }, []);

  const minimize = useCallback((id) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  }, []);

  const move = useCallback((id, x, y) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  return { windows, focusedId, focus, open, close, minimize, move };
}

function Window({ win, focused, onFocus, onClose, onMinimize, onMove, children, extraClass }) {
  const dragRef = useRef(null);
  const [drag, setDrag] = useState(null);

  const handleMouseDown = (e) => {
    if (e.target.closest(".traffic")) return;
    onFocus(win.id);
    setDrag({ ox: e.clientX - win.x, oy: e.clientY - win.y });
  };

  useEffect(() => {
    if (!drag) return;
    const onMove2 = (e) => {
      const x = Math.max(0, Math.min(window.innerWidth - 200, e.clientX - drag.ox));
      const y = Math.max(30, Math.min(window.innerHeight - 80, e.clientY - drag.oy));
      onMove(win.id, x, y);
    };
    const onUp = () => setDrag(null);
    window.addEventListener("mousemove", onMove2);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove2);
      window.removeEventListener("mouseup", onUp);
    };
  }, [drag, win.id, onMove]);

  if (!win.open || win.minimized) return null;

  return (
    <div
      className={`window ${extraClass || ""} ${focused ? "" : "unfocused"} ${drag ? "dragging" : ""}`}
      style={{
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
        zIndex: win.z,
      }}
      onMouseDown={() => onFocus(win.id)}
    >
      <div
        ref={dragRef}
        className={`win-titlebar ${drag ? "grabbing" : ""}`}
        onMouseDown={handleMouseDown}
      >
        <div className="traffic">
          <span className="t-close" onClick={(e) => { e.stopPropagation(); onClose(win.id); }} />
          <span className="t-min" onClick={(e) => { e.stopPropagation(); onMinimize(win.id); }} />
          <span className="t-zoom" onClick={(e) => e.stopPropagation()} />
        </div>
        <div className="win-title">{win.title}</div>
      </div>
      <div className="win-body">{children}</div>
    </div>
  );
}

window.useWindowManager = useWindowManager;
window.Window = Window;
