"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert } from "lucide-react";

const CFG = {
  SECURE: { color: "#00FF66", Icon: ShieldCheck },
  ELEVATED: { color: "#FFD600", Icon: ShieldAlert },
  "CRITICAL ALERT": { color: "#FF0055", Icon: ShieldAlert },
};

export default function Header({ status }) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const { color, Icon } = CFG[status];

  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="glitch font-display font-black text-3xl md:text-5xl tracking-wider" data-text="CYBER//SENTINEL">
          CYBER//SENTINEL
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-2 tracking-widest">
          CYBER SECURITY &amp; THREAT INTELLIGENCE DASHBOARD
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="font-display text-xl text-white tabular-nums">{now ? now.toTimeString().slice(0, 8) : "--:--:--"}</p>
          <p className="text-[10px] text-slate-500 tracking-widest">{now ? now.toDateString().toUpperCase() : ""}</p>
        </div>

        <motion.div
          key={status}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-3 rounded-lg px-4 py-3 border"
          style={{ color, borderColor: color + "88", background: color + "14", boxShadow: `0 0 22px ${color}40` }}
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: color }} />
            <span className="relative inline-flex h-3 w-3 rounded-full" style={{ background: color }} />
          </span>
          <Icon size={18} />
          <div className="leading-tight">
            <p className="text-[9px] tracking-[0.25em] opacity-70">SYSTEM STATUS</p>
            <p className="font-display text-sm font-bold">{status}</p>
          </div>
        </motion.div>
      </div>
    </header>
  );
}