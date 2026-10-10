"use client";
import { useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";

function Counter({ value }) {
  const prev = useRef(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const controls = animate(prev.current, value, {
      duration: 0.6,
      onUpdate: (v) => {
        prev.current = v;
        setDisplay(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [value]);

  return <>{display.toLocaleString("en-US")}</>;
}

export default function StatCard({ label, value, suffix = "", icon: Icon, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3 + delay, duration: 0.6 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="panel rounded-xl p-5 relative overflow-hidden"
      style={{ borderColor: color + "55" }}
    >
      <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-30" style={{ background: color }} />
      <div className="flex items-center justify-between mb-4" style={{ color }}>
        <span className="text-[10px] tracking-[0.25em] text-slate-400">{label}</span>
        <Icon size={20} />
      </div>
      <p className="font-display text-3xl font-bold tabular-nums" style={{ color, textShadow: `0 0 18px ${color}88` }}>
        <Counter value={value} />
        <span className="text-lg ml-1">{suffix}</span>
      </p>
    </motion.div>
  );
}