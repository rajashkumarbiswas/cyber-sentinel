"use client";
import { useEffect, useRef } from "react";

export default function CyberBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    const chars = "01ABCDEF<>/\\{}[]#$%";
    let w, h, drops, raf, last = 0;

    const resize = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
      drops = Array(Math.floor(w / 18)).fill(0).map(() => Math.random() * (h / 18));
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (t) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 60) return;
      last = t;
      ctx.fillStyle = "rgba(11,15,25,0.12)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = "14px monospace";
      drops.forEach((y, i) => {
        ctx.fillStyle = Math.random() > 0.97 ? "#00E5FF" : "#00FF66";
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 18, y * 18);
        if (y * 18 > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      });
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas ref={ref} className="fixed inset-0 -z-10 opacity-[0.13] pointer-events-none" />
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="fixed -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-neon/10 blur-[140px] -z-10 pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-ice/10 blur-[140px] -z-10 pointer-events-none" />
    </>
  );
}