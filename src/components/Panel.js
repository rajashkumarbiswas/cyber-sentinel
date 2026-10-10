"use client";
import { motion } from "framer-motion";

export default function Panel({ id, title, icon: Icon, right, children, className = "" }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`panel rounded-xl p-4 scroll-mt-6 flex flex-col ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="flex items-center gap-2 font-display text-[11px] tracking-[0.25em] text-ice uppercase">
          {Icon && <Icon size={16} />}
          {title}
        </h2>
        {right}
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </motion.section>
  );
}