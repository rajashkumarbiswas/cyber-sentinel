export const TARGET = { name: "Dhaka HQ", lat: 23.81, lng: 90.41 };

export const COUNTRIES = [
  { name: "Russia", lat: 61.5, lng: 105.3 },
  { name: "China", lat: 35.8, lng: 104.1 },
  { name: "USA", lat: 37.1, lng: -95.7 },
  { name: "Brazil", lat: -14.2, lng: -51.9 },
  { name: "Iran", lat: 32.4, lng: 53.7 },
  { name: "North Korea", lat: 40.3, lng: 127.5 },
  { name: "Germany", lat: 51.1, lng: 10.4 },
  { name: "Nigeria", lat: 9.1, lng: 8.7 },
  { name: "Ukraine", lat: 48.4, lng: 31.2 },
  { name: "Australia", lat: -25.2, lng: 133.7 },
];

export const ATTACK_TYPES = [
  { name: "DDoS", color: "#FF0055" },
  { name: "Malware", color: "#FFD600" },
  { name: "Phishing", color: "#00E5FF" },
  { name: "Brute Force", color: "#00FF66" },
];

export const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const randIP = () => `${rand(11, 223)}.${rand(0, 255)}.${rand(0, 255)}.${rand(1, 254)}`;

function buildMessage(type, ip, country, blocked) {
  const base = {
    DDoS: `DDoS flood detected: ${rand(20, 900)}k pkts/s from ${ip} (${country})`,
    Malware: `Malware payload signature matched from ${ip} (${country})`,
    Phishing: `Phishing campaign link intercepted, origin ${ip} (${country})`,
    "Brute Force": `Suspicious login attempt detected from IP: ${ip} (${country})`,
  }[type];
  return `${base} -> ${blocked ? "BLOCKED" : "UNDER REVIEW"}`;
}

export function makeAttack() {
  const c = pick(COUNTRIES);
  const t = pick(ATTACK_TYPES);
  const r = Math.random();
  const severity = r < 0.4 ? "LOW" : r < 0.7 ? "MEDIUM" : r < 0.9 ? "HIGH" : "CRITICAL";
  const blocked = Math.random() < 0.7;
  const ip = randIP();
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    ip,
    country: c.name,
    lat: c.lat + (Math.random() - 0.5) * 6,
    lng: c.lng + (Math.random() - 0.5) * 6,
    type: t.name,
    color: t.color,
    severity,
    blocked,
    message: buildMessage(t.name, ip, c.name, blocked),
  };
}

export function makeTrafficPoint(secAgo = 0) {
  const time = new Date(Date.now() - secAgo * 1000).toTimeString().slice(0, 8);
  const spike = Math.random() < 0.08;
  return {
    time,
    inbound: rand(300, 700),
    malicious: spike ? rand(300, 600) : rand(10, 120),
  };
}