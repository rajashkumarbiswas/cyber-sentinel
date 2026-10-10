"use client";
import { useEffect, useState } from "react";
import { ATTACK_TYPES, makeAttack, makeTrafficPoint, rand } from "@/lib/data";

const timeNow = () => new Date().toTimeString().slice(0, 8);

export function useThreatFeed() {
  const [s, setS] = useState({
    total: 12480,
    blocked: 8732,
    scans: 34,
    latency: 18,
    status: "SECURE",
    attacks: [],
    logs: [],
    traffic: [],
    categories: ATTACK_TYPES.map((t) => ({ name: t.name, value: 100, color: t.color })),
  });

  useEffect(() => {
    // client-এ এসে initial random data বসাচ্ছি (hydration error এড়াতে)
    setS((p) => ({
      ...p,
      traffic: Array.from({ length: 24 }, (_, i) => makeTrafficPoint((23 - i) * 2)),
      logs: [{ id: "boot", time: timeNow(), level: "INFO", text: "Sentinel node online. Live monitoring started..." }],
    }));

    const id = setInterval(() => {
      const a = makeAttack();
      setS((p) => {
        const attacks = [a, ...p.attacks].slice(0, 12);
        const severe = attacks.filter((x) => !x.blocked && (x.severity === "HIGH" || x.severity === "CRITICAL")).length;
        const status = severe >= 3 ? "CRITICAL ALERT" : severe === 2 ? "ELEVATED" : "SECURE";
        const level = a.blocked ? "INFO" : a.severity === "HIGH" || a.severity === "CRITICAL" ? "ALERT" : "WARN";

        return {
          ...p,
          total: p.total + 1,
          blocked: p.blocked + (a.blocked ? 1 : 0),
          scans: Math.max(15, Math.min(70, p.scans + rand(-3, 3))),
          latency: Math.max(8, Math.min(45, p.latency + rand(-4, 4))),
          status,
          attacks,
          logs: [...p.logs, { id: a.id, time: timeNow(), level, text: a.message }].slice(-40),
          categories: p.categories.map((c) => (c.name === a.type ? { ...c, value: c.value + 1 } : c)),
          traffic: [...p.traffic.slice(1), makeTrafficPoint()],
        };
      });
    }, 1800);

    return () => clearInterval(id);
  }, []);

  return s;
}