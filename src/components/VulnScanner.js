"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanSearch, Loader2 } from "lucide-react";
import { rand } from "@/lib/data";

const STEPS = [
  "Resolving DNS records...",
  "Probing open ports...",
  "Fingerprinting services...",
  "Checking SSL/TLS configuration...",
  "Testing for known vulnerabilities...",
  "Compiling risk report...",
];

const RISKS = [
  { t: "Outdated TLS 1.0 enabled", s: "HIGH" },
  { t: "Missing X-Frame-Options header", s: "MEDIUM" },
  { t: "SSH port 22 exposed to public", s: "MEDIUM" },
  { t: "Weak password policy detected", s: "HIGH" },
  { t: "Server version disclosed in headers", s: "LOW" },
  { t: "No rate limiting on /login endpoint", s: "HIGH" },
  { t: "HSTS not enforced", s: "LOW" },
  { t: "Outdated library with known CVE", s: "CRITICAL" },
];

const SEV = { LOW: "#00E5FF", MEDIUM: "#FFD600", HIGH: "#FF7A00", CRITICAL: "#FF0055" };
const C = 2 * Math.PI * 54;

export default function VulnScanner() {
  const [target, setTarget] = useState("");
  const [phase, setPhase] = useState("idle"); // idle | scanning | done
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  const run = () => {
    if (!target.trim() || phase === "scanning") return;
    setPhase("scanning");
    setProgress(0);
    setResult(null);

    let p = 0;
    const id = setInterval(() => {
      p += 1.5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        const score = rand(38, 97);
        const count = score > 85 ? 2 : score > 65 ? 3 : 5;
        const risks = [...RISKS].sort(() => Math.random() - 0.5).slice(0, count);
        const ports = [22, 80, 443, 3306, 8080, 21].filter(() => Math.random() > 0.5);
        setResult({ score, risks, ports });
        setPhase("done");
      }
    }, 60);
  };

  const scoreColor = result ? (result.score > 80 ? "#00FF66" : result.score > 60 ? "#FFD600" : "#FF0055") : "#00FF66";
  const stepText = STEPS[Math.min(STEPS.length - 1, Math.floor(progress / (100 / STEPS.length)))];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left: input + animation */}
      <div className="space-y-5">
        <div className="flex gap-3">
          <input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run()}
            placeholder="Enter IP or domain (e.g. example.com)"
            className="flex-1 bg-ink/80 border border-ice/30 focus:border-neon focus:shadow-[0_0_16px_rgba(0,255,102,0.3)] outline-none rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 transition"
          />
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={run}
            className="flex items-center gap-2 bg-neon/10 border border-neon text-neon px-5 rounded-lg font-display text-xs tracking-widest hover:bg-neon/20 shadow-[0_0_18px_rgba(0,255,102,0.3)]"
          >
            {phase === "scanning" ? <Loader2 size={16} className="animate-spin" /> : <ScanSearch size={16} />}
            SCAN NOW
          </motion.button>
        </div>

        <div className="flex flex-col items-center gap-4 py-4">
          {phase === "scanning" ? (
            <>
              <div className="radar" />
              <p className="text-neon text-xs">{stepText}</p>
              <div className="w-full h-1.5 bg-neon/15 rounded overflow-hidden">
                <div className="h-full bg-neon shadow-[0_0_10px_#00ff66]" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-[10px] text-slate-500 tabular-nums">{Math.min(100, Math.round(progress))}%</p>
            </>
          ) : (
            <p className="text-xs text-slate-500 text-center py-10">
              {phase === "done" ? `Scan complete for ${target}` : "Enter a target and press SCAN NOW to begin simulation."}
            </p>
          )}
        </div>
      </div>

      {/* Right: result */}
      <div className="min-h-[260px]">
        <AnimatePresence mode="wait">
          {result && (
            <motion.div key={target + result.score} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-center gap-6 mb-5">
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 120 120" className="-rotate-90 w-full h-full">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                    <motion.circle
                      cx="60" cy="60" r="54" fill="none" stroke={scoreColor} strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={C}
                      initial={{ strokeDashoffset: C }}
                      animate={{ strokeDashoffset: C * (1 - result.score / 100) }}
                      transition={{ duration: 1.4, ease: "easeOut" }}
                      style={{ filter: `drop-shadow(0 0 6px ${scoreColor})` }}
                    />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-center">
                      <p className="font-display text-3xl font-bold" style={{ color: scoreColor }}>{result.score}</p>
                      <p className="text-[9px] text-slate-500">/ 100</p>
                    </div>
                  </div>
                </div>
                <div className="text-xs space-y-2">
                  <p className="text-slate-400">SECURITY SCORE</p>
                  <p className="font-display text-sm" style={{ color: scoreColor }}>
                    {result.score > 80 ? "LOW RISK" : result.score > 60 ? "MODERATE RISK" : "HIGH RISK"}
                  </p>
                  <p className="text-slate-500">Open ports: {result.ports.length ? result.ports.join(", ") : "none"}</p>
                </div>
              </div>

              <div className="space-y-2">
                {result.risks.map((r, i) => (
                  <motion.div
                    key={r.t}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.12 }}
                    className="flex items-center justify-between gap-3 bg-ink/60 border border-white/5 rounded-lg px-3 py-2 text-xs"
                  >
                    <span className="text-slate-300">{r.t}</span>
                    <span className="font-bold text-[10px]" style={{ color: SEV[r.s] }}>{r.s}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}