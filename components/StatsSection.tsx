import type { StatItem } from "@/lib/data";

interface StatsSectionProps {
  stats?: StatItem[];
}

const fallback = [
  { _id:"1", icon: "icofont-people",          value: "25,000+", label: "Happy Customers",  color: "#2cbbdf", order: 1 },
  { _id:"2", icon: "icofont-money",            value: "$2B+",    label: "Loans Processed",  color: "#f0734a", order: 2 },
  { _id:"3", icon: "icofont-check-circled",    value: "98%",     label: "Approval Rate",    color: "#27ae60", order: 3 },
  { _id:"4", icon: "icofont-globe",            value: "50+",     label: "Cities Covered",   color: "#e91e8c", order: 4 },
];

export default function StatsSection({ stats }: StatsSectionProps) {
  const items = stats?.length ? stats : fallback;

  return (
    <section style={{ background: "#2cbbdf", position: "relative", overflow: "hidden", padding: "56px 0" }}>
      <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 1440 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <circle cx="-60" cy="90" r="180" fill="rgba(255,255,255,0.06)" />
        <circle cx="1500" cy="90" r="180" fill="rgba(255,255,255,0.06)" />
        <circle cx="720" cy="-60" r="200" fill="rgba(255,255,255,0.04)" />
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 20 }).map((_, col) => (
            <circle key={`${row}-${col}`} cx={50 + col * 72} cy={30 + row * 30} r="2" fill="rgba(255,255,255,0.07)" />
          ))
        )}
      </svg>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="row">
          {items.map((s, i) => (
            <div key={s._id ?? s.label} className="col-lg-3 col-md-6" style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18, borderRight: i < items.length - 1 ? "1px solid rgba(255,255,255,0.15)" : "none", paddingRight: 20 }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <i className={s.icon} style={{ fontSize: 28, color: "#fff" }}></i>
                </div>
                <div>
                  <div style={{ fontSize: 34, fontWeight: 800, color: "#fff", lineHeight: 1.1 }}>{s.value}</div>
                  <div style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", marginTop: 4 }}>{s.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
