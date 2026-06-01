import Link from "next/link";
import ServiceFlipCard from "./ServiceFlipCard";
import type { ServiceItem, HomeContentData } from "@/lib/data";

interface HomeServicesSectionProps {
  services?: ServiceItem[];
  content?: HomeContentData;
}

const defaultServices = [
  { icon: "flaticon-mortgage-loan", rate: "10.2%", title: "Business Loan",  description: "Stay turned into the world of finance & business.", installment: "20 months installment" },
  { icon: "flaticon-money",         rate: "9.35%", title: "Personal Loan",  description: "Stay turned into the world of finance & business.", installment: "20 months installment" },
  { icon: "flaticon-loan-1",        rate: "28.6%", title: "Education Loan", description: "Stay turned into the world of finance & business.", installment: "20 months installment" },
];

export default function HomeServicesSection({ services, content }: HomeServicesSectionProps) {
  const cards = services?.length
    ? services.slice(0, 3).map(s => ({
        icon: s.icon,
        rate: s.rate,
        title: s.title,
        description: s.desc,
        installment: `Tenure: ${s.tenure}`,
      }))
    : defaultServices;

  const features = [
    { icon: content?.servicesFeature1Icon ?? "icofont-check-circled", text: content?.servicesFeature1Text ?? "Fastest Loan Approval" },
    { icon: content?.servicesFeature2Icon ?? "icofont-ui-calculator", text: content?.servicesFeature2Text ?? "Flexible / Transparent EMI" },
    { icon: content?.servicesFeature3Icon ?? "icofont-support",       text: content?.servicesFeature3Text ?? "Making Every Step Simple and Stress-Free" },
    { icon: content?.servicesFeature4Icon ?? "",                     text: content?.servicesFeature4Text ?? "" },
  ].filter(f => f.text);

  const heading = content?.servicesHeading ?? "We provide awesome services, it's here.";
  const subtitle = content?.servicesSubtitle ?? "We are here to help you when you need your financial support, then we are here to guide you every step of the way.";
  const ctaText = content?.servicesCtaText ?? "View More";
  const ctaUrl = content?.servicesCtaUrl ?? "/services";

  return (
    <section className="commonSection homeService" style={{ position: "relative", overflow: "hidden" }}>
      {/* ── SVG background ── */}
      <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} viewBox="0 0 1440 620" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <path d="M0 0 Q360 60 720 0 Q1080 -60 1440 0 L1440 80 Q1080 140 720 80 Q360 20 0 80 Z" fill="rgba(44,187,223,0.05)" />
        <circle cx="1380" cy="310" r="260" fill="none" stroke="rgba(44,187,223,0.07)" strokeWidth="50" />
        <circle cx="60" cy="580" r="120" fill="none" stroke="rgba(240,115,74,0.08)" strokeWidth="24" />
        {[0,1,2,3,4,5,6,7,8].map(i => (
          <circle key={`trd${i}`} cx={1140 + (i%3)*30} cy={60 + Math.floor(i/3)*30} r="4" fill="rgba(44,187,223,0.12)" />
        ))}
        <path d="M0 400 Q200 360 400 400 Q600 440 800 400 Q1000 360 1200 400 Q1350 440 1440 400" fill="none" stroke="rgba(44,187,223,0.07)" strokeWidth="2" />
        <circle cx="200" cy="120" r="14" fill="rgba(240,115,74,0.12)" />
        <circle cx="230" cy="150" r="8"  fill="rgba(240,115,74,0.18)" />
      </svg>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-6 mt176">
            <ServiceFlipCard {...cards[0]} />
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <ServiceFlipCard {...cards[1]} />
            {cards[2] && <ServiceFlipCard {...cards[2]} />}
          </div>
          <div className="col-xl-6 col-lg-4 col-md-12">
            <div className="serviceArea">
              <h3>{heading}</h3>
              <p>{subtitle}</p>
              <ul style={{ padding: 0, margin: "20px 0 28px", listStyle: "none" }}>
                {features.map(f => (
                  <li key={f.text} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <span style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(44,187,223,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <i className={f.icon} style={{ color: "#2cbbdf", fontSize: 16 }}></i>
                    </span>
                    <span style={{ fontSize: 16, color: "#555" }}>{f.text}</span>
                  </li>
                ))}
              </ul>
              <Link href={ctaUrl} className="common_btn">{ctaText}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
