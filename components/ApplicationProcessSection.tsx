import type { ProcessStepItem, HomeContentData } from "@/lib/data";

interface ApplicationProcessSectionProps {
  steps?: ProcessStepItem[];
  content?: HomeContentData;
}

const marginClasses = ["mr_40", "mlr_40", "ml_40"];

const defaultSteps: ProcessStepItem[] = [
  { _id:"1", num:"01", title:"Apply Bank Loan",    desc:"Fill out our simple online form in just a few minutes.",               icon:"icofont-paper",         order:1 },
  { _id:"2", num:"02", title:"Approved Bank Loan", desc:"Our team reviews and approves your application quickly.",              icon:"icofont-check-circled", order:2 },
  { _id:"3", num:"03", title:"Review Your Loan",   desc:"Receive funds and manage repayments with ease.",                       icon:"icofont-money",         order:3 },
];

export default function ApplicationProcessSection({ steps, content }: ApplicationProcessSectionProps) {
  const items = steps?.length ? steps : defaultSteps;
  const badge = content?.processBadge ?? `Simple ${items.length} Steps`;
  const heading = content?.processHeading ?? "Fast and very easy\napplication process here";
  const subtitle = content?.processSubtitle ?? "We are here to help you when you need your financial\nsupport, then we are help you.";

  return (
    <section className="commonSection applicatioProces" style={{ position: "relative", overflow: "hidden" }}>
      {/* ── SVG background ── */}
      <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <path d="M0 0 Q360 50 720 0 Q1080 -50 1440 0 L1440 60 Q1080 110 720 60 Q360 10 0 60 Z" fill="rgba(44,187,223,0.05)" />
        <circle cx="80" cy="120" r="130" fill="none" stroke="rgba(44,187,223,0.07)" strokeWidth="28" />
        <circle cx="1360" cy="500" r="160" fill="none" stroke="rgba(240,115,74,0.06)" strokeWidth="32" />
        <path d="M 320 340 C 480 260, 600 260, 720 340 C 840 420, 960 420, 1120 340" fill="none" stroke="rgba(44,187,223,0.15)" strokeWidth="2" strokeDasharray="8 10" />
        <polygon points="718,330 726,345 710,345" fill="rgba(44,187,223,0.20)" />
        <polygon points="1118,330 1126,345 1110,345" fill="rgba(44,187,223,0.20)" />
        {[0,1,2,3,4,5,6,7,8].map(i => (
          <circle key={`cl${i}`} cx={600 + (i%3)*28} cy={520 + Math.floor(i/3)*28} r="4" fill="rgba(44,187,223,0.10)" />
        ))}
        <circle cx="1300" cy="100" r="18" fill="rgba(240,115,74,0.12)" />
        <circle cx="1270" cy="130" r="10" fill="rgba(240,115,74,0.18)" />
      </svg>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="row">
          <div className="col-lg-12 text-center">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(44,187,223,0.10)", padding: "6px 16px", borderRadius: 20, marginBottom: 16 }}>
              <i className="icofont-rocket-alt-2" style={{ color: "#2cbbdf", fontSize: 16 }}></i>
              <span style={{ fontSize: 13, color: "#2cbbdf", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{badge}</span>
            </div>
            <h2 className="sec_title" style={{ whiteSpace: "pre-line" }}>{heading}</h2>
            <p className="sec_desc" style={{ whiteSpace: "pre-line" }}>{subtitle}</p>
          </div>
        </div>

        <div className="row">
          {items.map((step, i) => (
            <div key={step._id} className="col-lg-4 col-md-6">
              <div className={`singleProcess_2 ${marginClasses[i] ?? ""}`} style={{ position: "relative" }}>
                <div style={{ position: "absolute", top: -18, right: 20, width: 44, height: 44, borderRadius: "50%", background: "#2cbbdf", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(44,187,223,0.45)", zIndex: 2 }}>
                  <i className={step.icon} style={{ color: "#fff", fontSize: 20 }}></i>
                </div>
                <div className="flipper">
                  <div className="front">
                    <div className="bg_number"><h1>{step.num}</h1></div>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                  <div className="back">
                    <div className="bg_number"><h1>{step.num}</h1></div>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
