import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CLIENTS, MOTIVES, NATURE } from "@/lib/hora-extra";

const COLORS = ["#ffffff", "#c8c8c8", "#9a9a9a", "#6e6e6e", "#4a4a4a", "#333333", "#222222"];

const tooltipStyle = {
  backgroundColor: "#121212",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: 8,
  color: "#fff",
  fontSize: 12,
};

export function MotivesChart() {
  const data = MOTIVES.map((m) => ({
    name: m.label,
    horas: m.hours,
    pct: m.pct,
  }));

  return (
    <div className="h-72 w-full sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
          <XAxis type="number" stroke="#8d8d8d" tick={{ fill: "#8d8d8d", fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="name"
            width={110}
            stroke="#8d8d8d"
            tick={{ fill: "#e0e0e0", fontSize: 11 }}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value: number, _name: string, props: { payload?: { pct?: number } }) => [
              `${value.toLocaleString("pt-BR", { maximumFractionDigits: 0 })} h (${props.payload?.pct?.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}%)`,
              "Horas",
            ]}
          />
          <Bar dataKey="horas" radius={[0, 4, 4, 0]} maxBarSize={22}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function NatureChart() {
  const data = NATURE.map((n) => ({ name: n.label, value: n.pct }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="#000" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value: number) => [`${value.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}%`, "Participação"]}
          />
        </PieChart>
      </ResponsiveContainer>
      <ul className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted">
        {data.map((d, i) => (
          <li key={d.name} className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
            {d.name} {d.value.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ClientsChart() {
  const data = CLIENTS.map((c) => ({
    name: c.name,
    horas: c.hours,
  }));

  return (
    <div className="h-64 w-full sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <XAxis dataKey="name" stroke="#8d8d8d" tick={{ fill: "#e0e0e0", fontSize: 11 }} />
          <YAxis stroke="#8d8d8d" tick={{ fill: "#8d8d8d", fontSize: 11 }} />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value: number) => [
              `${value.toLocaleString("pt-BR", { maximumFractionDigits: 0 })} h`,
              "Horas",
            ]}
          />
          <Bar dataKey="horas" fill="#ffffff" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
