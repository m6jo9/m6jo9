import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const login = process.argv[2] || "m6jo9";
const target = process.argv[3] || "public/stats.svg";
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

if (!token) {
  console.error("render-stats: GITHUB_TOKEN is required");
  process.exit(1);
}

const query = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{firstDay contributionDays{date contributionCount}}}}}}`;

const response = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: { authorization: `bearer ${token}`, "content-type": "application/json", "user-agent": `${login}-profile-stats` },
  body: JSON.stringify({ query, variables: { login } }),
});

if (!response.ok) {
  console.error(`render-stats: github answered ${response.status}`);
  process.exit(1);
}

const payload = await response.json();
if (payload.errors) {
  console.error(`render-stats: ${payload.errors.map((e) => e.message).join("; ")}`);
  process.exit(1);
}

const calendar = payload.data.user.contributionsCollection.contributionCalendar;
const weeks = calendar.weeks;
const days = weeks.flatMap((week) => week.contributionDays);
const total = calendar.totalContributions;

if (!total || !days.length) {
  console.error("render-stats: the calendar came back empty, refusing to publish a zeroed card");
  process.exit(1);
}

const activeDays = days.filter((day) => day.contributionCount > 0);
const best = activeDays.reduce((top, day) => (day.contributionCount > top.contributionCount ? day : top), activeDays[0]);

let longest = 0;
let running = 0;
for (const day of days) {
  running = day.contributionCount > 0 ? running + 1 : 0;
  if (running > longest) longest = running;
}

let current = 0;
for (let i = days.length - 1; i >= 0; i -= 1) {
  if (days[i].contributionCount > 0) current += 1;
  else if (i !== days.length - 1) break;
}

const weekly = weeks.map((week) => week.contributionDays.reduce((sum, day) => sum + day.contributionCount, 0));
const peak = Math.max(...weekly, 1);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const stamp = (iso) => `${MONTHS[Number(iso.slice(5, 7)) - 1]} ${Number(iso.slice(8, 10))}`;
const round = (value) => Math.round(value * 100) / 100;

const W = 900;
const H = 268;
const PAD = 32;
const BAR_W = 12;
const BAR_GAP = 4;
const FLOOR = 236;
const CEIL = 80;

const ink = { bg: "#0b0f14", edge: "#1f2b33", accent: "#26f7c7", violet: "#7c5cff", text: "#e6f7f3", dim: "#5a6b7b", muted: "#9fb3c8" };

const stats = [
  { value: total.toLocaleString("en-US"), label: "CONTRIBUTIONS / YEAR" },
  { value: String(current), label: "CURRENT STREAK" },
  { value: String(longest), label: "LONGEST STREAK" },
  { value: `${activeDays.length}/${days.length}`, label: "ACTIVE DAYS" },
];

const columns = stats.map((stat, index) => {
  const x = PAD + index * 218;
  const begin = round(0.05 + index * 0.12);
  return `<g opacity="1"><animate attributeName="opacity" values="0;1" dur=".6s" begin="${begin}s" fill="freeze"/><animateTransform attributeName="transform" type="translate" values="0 9;0 0" dur=".6s" begin="${begin}s" fill="freeze" calcMode="spline" keySplines="0.2 0 0.1 1" keyTimes="0;1"/><text x="${x}" y="122" font-size="33" font-weight="700" fill="${ink.text}">${stat.value}</text><text x="${x}" y="142" font-size="9.5" fill="${ink.dim}" letter-spacing="2.2">${stat.label}</text></g>`;
});

const dividers = [1, 2, 3].map((index) => `<rect x="${PAD + index * 218 - 22}" y="92" width="1" height="54" fill="${ink.accent}" fill-opacity=".14"/>`);

const bars = weekly.map((count, index) => {
  const x = PAD + index * (BAR_W + BAR_GAP);
  const norm = count ? Math.sqrt(count) / Math.sqrt(peak) : 0;
  const height = count ? Math.max(4, round(norm * CEIL)) : 2;
  const y = round(FLOOR - height);
  const heat = norm;
  const fill = count === 0 ? "#12202a" : heat > 0.66 ? ink.accent : heat > 0.33 ? "#1ac2a8" : "#127a6b";
  const glow = count === peak ? ` filter="url(#lift)"` : "";
  return `<rect x="${x}" y="${FLOOR - 2}" width="${BAR_W}" height="2" rx="2" fill="${fill}"${glow}><animate attributeName="height" to="${height}" dur=".7s" begin="${round(index * 0.024)}s" fill="freeze" calcMode="spline" keySplines="0.2 0 0.1 1" keyTimes="0;1" values="2;${height}"/><animate attributeName="y" to="${y}" dur=".7s" begin="${round(index * 0.024)}s" fill="freeze" calcMode="spline" keySplines="0.2 0 0.1 1" keyTimes="0;1" values="${FLOOR - 2};${y}"/></rect>`;
});

const labels = [];
let lastMonth = "";
weeks.forEach((week, index) => {
  const month = week.firstDay.slice(5, 7);
  if (month === lastMonth) return;
  const x = PAD + index * (BAR_W + BAR_GAP);
  if (labels.length && x - labels[labels.length - 1].x < 52) return;
  labels.push({ x, text: MONTHS[Number(month) - 1] });
  lastMonth = month;
});

const months = labels.map((label) => `<text x="${label.x}" y="256" font-size="9.5" fill="${ink.dim}" letter-spacing="1.4">${label.text}</text>`);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${login} contribution telemetry: ${total} contributions, ${current} day current streak, ${longest} day longest streak">
<title>${login} — ${total} contributions in the last year</title>
<defs>
<clipPath id="card"><rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="16"/></clipPath>
<filter id="lift" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<linearGradient id="rim" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="${ink.accent}" stop-opacity=".7"/><stop offset=".55" stop-color="${ink.violet}" stop-opacity=".35"/><stop offset="1" stop-color="${ink.accent}" stop-opacity=".1"/></linearGradient>
<radialGradient id="wash" cx=".12" cy="0" r=".9"><stop offset="0" stop-color="${ink.accent}" stop-opacity=".1"/><stop offset="1" stop-color="${ink.accent}" stop-opacity="0"/></radialGradient>
</defs>
<style>
text{font-family:"Fira Code","JetBrains Mono",ui-monospace,SFMono-Regular,Consolas,monospace}
.live{animation:live 2.6s ease-in-out infinite}
@keyframes live{0%,100%{opacity:.28}50%{opacity:1}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
</style>
<g clip-path="url(#card)">
<rect width="${W}" height="${H}" fill="${ink.bg}"/>
<rect width="${W}" height="${H}" fill="url(#wash)"/>
<text x="${PAD}" y="46" font-size="15" font-weight="700" fill="${ink.accent}" letter-spacing="1.2">contribution telemetry</text>
<text x="${PAD}" y="66" font-size="10" fill="${ink.dim}" letter-spacing="1.1">rolling 365 days · one bar per week, sqrt scale · rendered by this repository</text>
<circle cx="${W - PAD - 132}" cy="42" r="3.5" fill="${ink.accent}" class="live"/>
<text x="${W - PAD - 120}" y="46" font-size="10" fill="${ink.muted}" letter-spacing="1">peak ${best.contributionCount} on ${stamp(best.date)}</text>
${columns.join("")}
${dividers.join("")}
${bars.join("")}
<rect x="${PAD}" y="${FLOOR + 1}" width="${W - PAD * 2}" height="1" fill="${ink.accent}" fill-opacity=".16"/>
${months.join("")}
</g>
<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="16" fill="none" stroke="url(#rim)" stroke-width="1.4"/>
</svg>
`;

mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, svg);
console.log(`render-stats: ${target} — ${total} contributions, streak ${current}, longest ${longest}, active ${activeDays.length}/${days.length}, peak week ${peak}`);
