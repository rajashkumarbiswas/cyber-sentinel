"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINES = [
  "> INITIALIZING CYBER//SENTINEL KERNEL...",
  "> LOADING INTELLIGENCE MODULES ........ OK",
  "> CONNECTING TO GLOBAL SENSOR GRID .... OK",
  "> ENCRYPTING CHANNEL (AES-256) ........ OK",
  "> ACCESS GRANTED. WELCOME, ANALYST.",
];

export default function BootScreen() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCount((c) => c + 1), 450);
    const done = setTimeout(() => setShow(false), 2900);
    return () => {
      clearInterval(t);
      clearTimeout(done);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[100] bg-ink grid place-items-center p-6"
          exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-full max-w-xl font-mono text-sm text-neon space-y-2">
            {LINES.slice(0, count).map((l, i) => (
              <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                {l}
              </motion.p>
            ))}
            <span className="blink">█</span>
            <div className="h-1 mt-6 bg-neon/15 rounded overflow-hidden">
              <motion.div
                className="h-full bg-neon shadow-[0_0_12px_#00ff66]"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.7, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}