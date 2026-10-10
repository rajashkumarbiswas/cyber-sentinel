"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function TrafficChart({ data }) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="gIn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gMal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF0055" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#FF0055" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(0,229,255,0.08)" strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 10 }} interval={3} stroke="#1e293b" />
          <YAxis tick={{ fill: "#64748b", fontSize: 10 }} stroke="#1e293b" />
          <Tooltip contentStyle={{ background: "#0B0F19", border: "1px solid #00E5FF55", borderRadius: 8, fontSize: 12 }} />
          <Area type="monotone" dataKey="inbound" name="Inbound" stroke="#00E5FF" strokeWidth={2} fill="url(#gIn)" isAnimationActive={false} />
          <Area type="monotone" dataKey="malicious" name="Malicious" stroke="#FF0055" strokeWidth={2} fill="url(#gMal)" isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}