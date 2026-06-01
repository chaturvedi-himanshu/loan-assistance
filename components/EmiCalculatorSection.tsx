"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import type { HomeContentData } from "@/lib/data";

function formatCurrency(value: number, currency = "USD") {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }
}

function calcEmi(principal: number, annualRate: number, months: number) {
  if (months === 0 || annualRate === 0) return principal / (months || 1);
  const r = annualRate / 12 / 100;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

interface EmiCalculatorSectionProps {
  content?: HomeContentData;
}

export default function EmiCalculatorSection({ content }: EmiCalculatorSectionProps) {
  const amountMin = content?.emiLoanAmountMin ?? 10000;
  const amountMax = content?.emiLoanAmountMax ?? 5000000;
  const amountStep = content?.emiLoanAmountStep ?? 10000;
  const amountDefault = content?.emiLoanAmountDefault ?? 500000;

  const rateMin = content?.emiInterestMin ?? 1;
  const rateMax = content?.emiInterestMax ?? 30;
  const rateStep = content?.emiInterestStep ?? 0.1;
  const rateDefault = content?.emiInterestDefault ?? 8.5;

  const tenureMin = content?.emiTenureMin ?? 6;
  const tenureMax = content?.emiTenureMax ?? 360;
  const tenureStep = content?.emiTenureStep ?? 6;
  const tenureDefault = content?.emiTenureDefault ?? 60;

  const currency = content?.emiCurrency ?? "USD";

  const heading = content?.emiHeading ?? "EMI Calculator";
  const subtitle = content?.emiSubtitle ?? "Plan your loan repayment easily. Adjust the sliders to see your monthly\ninstallment, total interest, and total payment instantly.";

  const loanAmountLabel = content?.emiLoanAmountLabel ?? "Loan Amount";
  const interestLabel = content?.emiInterestLabel ?? "Annual Interest Rate";
  const tenureLabel = content?.emiTenureLabel ?? "Loan Tenure";

  const monthlyEmiLabel = content?.emiMonthlyEmiLabel ?? "Monthly EMI";
  const principalLabel = content?.emiPrincipalLabel ?? "Principal Amount";
  const interestTotalLabel = content?.emiInterestTotalLabel ?? "Total Interest";
  const totalPaymentLabel = content?.emiTotalPaymentLabel ?? "Total Payment";

  const [principal, setPrincipal] = useState(amountDefault);
  const [annualRate, setAnnualRate] = useState(rateDefault);
  const [tenureMonths, setTenureMonths] = useState(tenureDefault);

  const sliderRef1 = useRef<HTMLInputElement>(null);
  const sliderRef2 = useRef<HTMLInputElement>(null);
  const sliderRef3 = useRef<HTMLInputElement>(null);

  const updateTrack = (el: HTMLInputElement | null, min: number, max: number, val: number) => {
    if (!el) return;
    const pct = ((val - min) / (max - min)) * 100;
    el.style.background = `linear-gradient(to right, #2cbbdf 0%, #2cbbdf ${pct}%, #ddd ${pct}%, #ddd 100%)`;
  };

  useEffect(() => { updateTrack(sliderRef1.current, amountMin, amountMax, principal); }, [principal, amountMin, amountMax]);
  useEffect(() => { updateTrack(sliderRef2.current, rateMin, rateMax, annualRate); }, [annualRate, rateMin, rateMax]);
  useEffect(() => { updateTrack(sliderRef3.current, tenureMin, tenureMax, tenureMonths); }, [tenureMonths, tenureMin, tenureMax]);

  const emi = useMemo(
    () => calcEmi(principal, annualRate, tenureMonths),
    [principal, annualRate, tenureMonths]
  );
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;
  const principalPct = Math.round((principal / totalPayment) * 100);
  const interestPct = 100 - principalPct;

  return (
    <section className="commonSection emiCalcSec" style={{ background: "#f8f8fb", position: "relative", overflow: "hidden" }}>

      {/* ── Decorative SVG background ── */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 560"
      >
        {/* Large soft circle — top-left */}
        <circle cx="-60" cy="-40" r="320" fill="rgba(44,187,223,0.07)" />

        {/* Medium ring — top-right */}
        <circle cx="1380" cy="40" r="200" fill="none" stroke="rgba(44,187,223,0.12)" strokeWidth="40" />

        {/* Small filled circle — top-right accent */}
        <circle cx="1340" cy="120" r="60" fill="rgba(44,187,223,0.08)" />

        {/* Large ring — bottom-left */}
        <circle cx="80" cy="560" r="240" fill="none" stroke="rgba(44,187,223,0.10)" strokeWidth="50" />

        {/* Tiny dot cluster — centre-right */}
        {[0,1,2,3,4,5,6,7,8].map((i) => (
          <circle
            key={i}
            cx={1080 + (i % 3) * 28}
            cy={200 + Math.floor(i / 3) * 28}
            r="5"
            fill="rgba(44,187,223,0.18)"
          />
        ))}

        {/* Tiny dot cluster — bottom-left */}
        {[0,1,2,3,4,5,6,7,8].map((i) => (
          <circle
            key={`b${i}`}
            cx={140 + (i % 3) * 28}
            cy={390 + Math.floor(i / 3) * 28}
            r="5"
            fill="rgba(44,187,223,0.15)"
          />
        ))}

        {/* Wavy divider line — mid section */}
        <path
          d="M0 300 Q180 260 360 300 Q540 340 720 300 Q900 260 1080 300 Q1260 340 1440 300"
          fill="none"
          stroke="rgba(44,187,223,0.10)"
          strokeWidth="2"
        />

        {/* Second wave slightly lower */}
        <path
          d="M0 330 Q180 290 360 330 Q540 370 720 330 Q900 290 1080 330 Q1260 370 1440 330"
          fill="none"
          stroke="rgba(44,187,223,0.06)"
          strokeWidth="2"
        />

        {/* Diagonal dashed line — decorative */}
        <line x1="0" y1="560" x2="400" y2="0" stroke="rgba(44,187,223,0.05)" strokeWidth="1" strokeDasharray="8 12" />

        {/* Orange accent blob — bottom-right */}
        <circle cx="1420" cy="520" r="180" fill="rgba(240,115,74,0.05)" />

        {/* Small orange circle */}
        <circle cx="1300" cy="480" r="28" fill="rgba(240,115,74,0.10)" />

        {/* Grid dots — very faint */}
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 10 }).map((_, col) => (
            <circle
              key={`g${row}-${col}`}
              cx={500 + col * 48}
              cy={80 + row * 80}
              r="2.5"
              fill="rgba(44,187,223,0.09)"
            />
          ))
        )}
      </svg>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Section heading */}
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="sec_title">{heading}</h2>
            <p className="sec_desc" style={{ whiteSpace: "pre-line" }}>{subtitle}</p>
          </div>
        </div>

        <div className="row align-items-center">
          {/* ── Sliders column ── */}
          <div className="col-lg-6 col-md-12">
            <div className="emi-sliders">

              {/* Loan Amount */}
              <div className="emi-field">
                <div className="emi-label-row">
                  <span className="emi-label">
                    <i className="flaticon-mortgage-loan" style={{ marginRight: 8, color: "#2cbbdf" }}></i>
                    {loanAmountLabel}
                  </span>
                  <span className="emi-value-badge">{formatCurrency(principal, currency)}</span>
                </div>
                <input
                  ref={sliderRef1}
                  type="range"
                  className="emi-range"
                  min={amountMin}
                  max={amountMax}
                  step={amountStep}
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                />
                <div className="emi-minmax">
                  <span>{formatCurrency(amountMin, currency)}</span>
                  <span>{formatCurrency(amountMax, currency)}</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="emi-field">
                <div className="emi-label-row">
                  <span className="emi-label">
                    <i className="icofont-money" style={{ marginRight: 8, color: "#2cbbdf" }}></i>
                    {interestLabel}
                  </span>
                  <span className="emi-value-badge">{annualRate.toFixed(1)}%</span>
                </div>
                <input
                  ref={sliderRef2}
                  type="range"
                  className="emi-range"
                  min={rateMin}
                  max={rateMax}
                  step={rateStep}
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value))}
                />
                <div className="emi-minmax">
                  <span>{rateMin}%</span>
                  <span>{rateMax}%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div className="emi-field">
                <div className="emi-label-row">
                  <span className="emi-label">
                    <i className="icofont-calendar" style={{ marginRight: 8, color: "#2cbbdf" }}></i>
                    {tenureLabel}
                  </span>
                  <span className="emi-value-badge">{tenureMonths} mo</span>
                </div>
                <input
                  ref={sliderRef3}
                  type="range"
                  className="emi-range"
                  min={tenureMin}
                  max={tenureMax}
                  step={tenureStep}
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Number(e.target.value))}
                />
                <div className="emi-minmax">
                  <span>{tenureMin} months</span>
                  <span>{tenureMax} months</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Results column ── */}
          <div className="col-lg-6 col-md-12">
            <div className="emi-results">
              {/* Main EMI card */}
              <div className="emi-main-card">
                <div className="emi-main-icon">
                  <i className="flaticon-money"></i>
                </div>
                <p className="emi-main-label">{monthlyEmiLabel}</p>
                <h2 className="emi-main-value">{formatCurrency(emi, currency)}</h2>
                <p className="emi-main-sub">
                  for {tenureMonths} months @ {annualRate.toFixed(1)}% p.a.
                </p>
              </div>

              {/* Breakdown cards */}
              <div className="row" style={{ marginTop: 24 }}>
                <div className="col-6">
                  <div className="emi-stat-card">
                    <i className="icofont-bank-alt" style={{ color: "#2cbbdf" }}></i>
                    <p>{principalLabel}</p>
                    <h5>{formatCurrency(principal, currency)}</h5>
                    <div className="emi-pct-bar">
                      <div className="emi-pct-fill principal-fill" style={{ width: `${principalPct}%` }}></div>
                    </div>
                    <span className="emi-pct-label">{principalPct}%</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="emi-stat-card">
                    <i className="icofont-chart-arrows-axis" style={{ color: "#f0734a" }}></i>
                    <p>{interestTotalLabel}</p>
                    <h5 style={{ color: "#f0734a" }}>{formatCurrency(totalInterest, currency)}</h5>
                    <div className="emi-pct-bar">
                      <div className="emi-pct-fill interest-fill" style={{ width: `${interestPct}%` }}></div>
                    </div>
                    <span className="emi-pct-label" style={{ color: "#f0734a" }}>{interestPct}%</span>
                  </div>
                </div>
              </div>

              <div className="emi-total-row">
                <i className="icofont-checked" style={{ color: "#2cbbdf", marginRight: 8 }}></i>
                <span>{totalPaymentLabel}&nbsp;:&nbsp;</span>
                <strong>{formatCurrency(totalPayment, currency)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
        /* ── Sliders ── */
        .emi-sliders { padding: 0 0 10px; }

        .emi-field { margin-bottom: 32px; }

        .emi-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .emi-label {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          display: flex;
          align-items: center;
        }

        .emi-value-badge {
          background: #2cbbdf;
          color: #fff;
          padding: 4px 14px;
          border-radius: 20px;
          font-size: 15px;
          font-weight: 700;
          min-width: 90px;
          text-align: center;
        }

        .emi-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          background: linear-gradient(to right, #2cbbdf 0%, #2cbbdf var(--pct, 50%), #ddd var(--pct, 50%), #ddd 100%);
          border-radius: 3px;
          outline: none;
          cursor: pointer;
        }

        .emi-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          background: #2cbbdf;
          border: 3px solid #fff;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(44,187,223,0.5);
          cursor: pointer;
          transition: transform 0.2s;
        }

        .emi-range::-webkit-slider-thumb:hover { transform: scale(1.2); }

        .emi-range::-moz-range-thumb {
          width: 22px;
          height: 22px;
          background: #2cbbdf;
          border: 3px solid #fff;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(44,187,223,0.5);
          cursor: pointer;
        }

        .emi-minmax {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #aaa;
          margin-top: 5px;
        }

        /* ── Results ── */
        .emi-results { padding-left: 20px; }

        .emi-main-card {
          background: #2cbbdf;
          border-radius: 12px;
          padding: 36px 28px 30px;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(44,187,223,0.35);
        }

        .emi-main-card::before {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 130px; height: 130px;
          background: rgba(255,255,255,0.08);
          border-radius: 50%;
        }

        .emi-main-card::after {
          content: '';
          position: absolute;
          bottom: -30px; left: -30px;
          width: 100px; height: 100px;
          background: rgba(255,255,255,0.06);
          border-radius: 50%;
        }

        .emi-main-icon { margin-bottom: 8px; }
        .emi-main-icon i {
          font-size: 36px;
          color: rgba(255,255,255,0.7);
        }

        .emi-main-label {
          color: rgba(255,255,255,0.8);
          font-size: 15px;
          margin: 0 0 6px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .emi-main-value {
          color: #fff;
          font-size: 44px;
          font-weight: 700;
          margin: 0 0 8px;
          line-height: 1.1;
        }

        .emi-main-sub {
          color: rgba(255,255,255,0.75);
          font-size: 14px;
          margin: 0;
        }

        .emi-stat-card {
          background: #fff;
          border-radius: 10px;
          padding: 20px 16px 16px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          height: 100%;
        }

        .emi-stat-card i {
          font-size: 28px;
          display: block;
          margin-bottom: 8px;
        }

        .emi-stat-card p {
          font-size: 13px;
          color: #aaa;
          margin: 0 0 4px;
        }

        .emi-stat-card h5 {
          font-size: 18px;
          font-weight: 700;
          color: #222;
          margin: 0 0 10px;
        }

        .emi-pct-bar {
          background: #eee;
          border-radius: 4px;
          height: 6px;
          overflow: hidden;
          margin-bottom: 4px;
        }

        .emi-pct-fill { height: 100%; border-radius: 4px; transition: width 0.4s ease; }
        .principal-fill { background: #2cbbdf; }
        .interest-fill  { background: #f0734a; }

        .emi-pct-label {
          font-size: 12px;
          color: #2cbbdf;
          font-weight: 700;
        }

        .emi-total-row {
          background: #fff;
          border-radius: 10px;
          padding: 16px 22px;
          margin-top: 16px;
          display: flex;
          align-items: center;
          font-size: 16px;
          color: #555;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }

        .emi-total-row strong {
          color: #222;
          font-size: 18px;
          font-weight: 700;
        }

        @media (max-width: 991px) {
          .emi-results { padding-left: 0; margin-top: 40px; }
        }
      `}</style>
    </section>
  );
}
