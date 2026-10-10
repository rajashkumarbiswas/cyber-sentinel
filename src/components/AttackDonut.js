"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function AttackDonut({ categories }) {
  const total = categories.reduce((a, c) => a + c.value, 0);

  return (
    <div>
      <div className="relative h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categories}
              dataKey="value"
              nameKey="name"
              innerRadius="62%"
              outerRadius="88%"
              paddingAngle={4}
              stroke="none"
              isAnimationActive={false}
            >
              {categories.map((c) => (
                <Cell key={c.name} fill={c.color} style={{ filter: `drop-shadow(0 0 6px ${c.color})` }} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: "#0B0F19", border: "1px solid #00E5FF55", borderRadius: 8, fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="text-center">
            <p className="font-display text-2xl text-white tabular-nums">{total}</p>
            <p className="text-[9px] tracking-widest text-slate-500">EVENTS</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
        {categories.map((c) => (
          <div key={c.name} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color, boxShadow: `0 0 8px ${c.color}` }} />
            <span className="text-slate-400">{c.name}</span>
            <span className="ml-auto text-white tabular-nums">{Math.round((c.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}