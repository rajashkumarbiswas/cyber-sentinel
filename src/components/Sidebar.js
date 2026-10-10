"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Globe, TerminalSquare, BarChart3, ScanSearch, Settings, ShieldCheck } from "lucide-react";

const items = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "map", label: "Attack Map", icon: Globe },
  { id: "logs", label: "Threat Logs", icon: TerminalSquare },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "scanner", label: "Scanner", icon: ScanSearch },
];

export default function Sidebar() {
  const [active, setActive] = useState("overview");

  const go = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 2.9, duration: 0.7 }}
      className="hidden lg:flex sticky top-0 h-screen w-64 shrink-0 flex-col border-r border-ice/15 bg-ink/70 backdrop-blur-md p-5"
    >
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-neon/10 border border-neon/40 shadow-[0_0_16px_rgba(0,255,102,0.35)]">
          <ShieldCheck className="text-neon" size={22} />
        </div>
        <div className="leading-tight">
          <p className="font-display text-[9px] tracking-[0.35em] text-ice">CYBER//</p>
          <p className="font-display font-black tracking-widest text-white">SENTINEL</p>
        </div>
      </div>

      <nav className="space-y-1 flex-1">
        {items.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => go(id)}
            className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-left transition-colors ${
              active === id ? "text-neon" : "text-slate-400 hover:text-white"
            }`}
          >
            {active === id && (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-0 rounded-lg bg-neon/10 border border-neon/30"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon size={18} className="relative" />
            <span className="relative">{label}</span>
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-3 px-4 py-3 text-sm text-slate-500">
        <Settings size={18} /> Settings
      </div>
      <p className="text-[10px] text-slate-600 px-4 mt-2">v1.0 • FRONTEND BUILD</p>
    </motion.aside>
  );
}