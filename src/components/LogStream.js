"use client";
import { useEffect, useRef, useState } from "react";

const COLORS = { INFO: "#00FF66", WARN: "#FFD600", ALERT: "#FF0055" };

function Line({ log }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (n >= log.text.length) return;
    const t = setTimeout(() => setN((v) => v + 2), 14);
    return () => clearTimeout(t);
  }, [n, log.text]);

  return (
    <div className="leading-relaxed break-words">
      <span className="text-slate-500">[{log.time}]</span>{" "}
      <span className="font-bold" style={{ color: COLORS[log.level] }}>{log.level}</span>{" "}
      <span className="text-slate-300">{log.text.slice(0, n)}</span>
      {n < log.text.length && <span className="blink text-neon">▌</span>}
    </div>
  );
}

export default function LogStream({ logs }) {
  const boxRef = useRef(null);

  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs]);

  return (
    <div ref={boxRef} className="h-full overflow-y-auto pr-2 text-xs space-y-1.5 font-mono">
      {logs.map((l) => (
        <Line key={l.id} log={l} />
      ))}
    </div>
  );
}