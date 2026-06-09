"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import DynamicImage from "@/components/DynamicImage";
import type { HomeContentData } from "@/lib/data";

interface TeamMember {
  image: string;
  name: string;
  role: string;
  description?: string;
}

interface TeamSectionProps {
  members?: TeamMember[];
  sectionClass?: string;
  content?: HomeContentData;
}

const defaultMembers: TeamMember[] = [
  {
    image: "/images/team/1.png",
    name: "Roxanne Bryant",
    role: "Managing Director",
    description:
      "Leads the company with 15+ years in financial services and a passion for client success.",
  },
  {
    image: "/images/team/2.png",
    name: "Dominic Jefferson",
    role: "Head of Marketing",
    description:
      "Drives brand growth and customer engagement through data-driven marketing strategies.",
  },
  {
    image: "/images/team/3.png",
    name: "Mercedes Baldwin",
    role: "General Manager",
    description:
      "Oversees daily operations ensuring seamless loan processing and team performance.",
  },
  {
    image: "/images/team/4.png",
    name: "Gertrude Keller",
    role: "Commercial Manager",
    description:
      "Manages key commercial partnerships and helps businesses secure the right financing.",
  },
];

export default function TeamSection({
  members = defaultMembers,
  sectionClass = "",
  content,
}: TeamSectionProps) {
  const badge = content?.teamBadge ?? "Our Experts";
  const heading = content?.teamHeading ?? "Expert team members";
  const subtitle =
    content?.teamSubtitle ??
    "We are here to help you when you need your financial\nsupport, then we are help you.";

  const [active, setActive] = useState<TeamMember | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  // Element to restore focus to after the modal closes (the eye button).
  const triggerRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback(
    (member: TeamMember, e: React.MouseEvent<HTMLButtonElement>) => {
      triggerRef.current = e.currentTarget;
      setActive(member);
    },
    [],
  );
  const closeModal = useCallback(() => {
    setActive(null);
    triggerRef.current?.focus();
  }, []);

  // While open: lock scroll, move focus into the dialog, trap Tab, close on Esc.
  useEffect(() => {
    if (!active) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, closeModal]);

  return (
    <>
      <section
        className={`commonSection ${sectionClass}`}
        style={{ position: "relative", overflow: "hidden" }}
      >
        {/* ── SVG background ── */}
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
          viewBox="0 0 1440 560"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Corner triangles */}
          <polygon points="0,0 120,0 0,120" fill="rgba(44,187,223,0.06)" />
          <polygon
            points="1440,440 1440,560 1320,560"
            fill="rgba(44,187,223,0.06)"
          />

          {/* Rings */}
          <circle
            cx="720"
            cy="280"
            r="300"
            fill="none"
            stroke="rgba(44,187,223,0.04)"
            strokeWidth="60"
          />
          <circle
            cx="720"
            cy="280"
            r="200"
            fill="none"
            stroke="rgba(44,187,223,0.04)"
            strokeWidth="40"
          />

          {/* Dot grid */}
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, c) => (
              <circle
                key={`g${r}-${c}`}
                cx={80 + c * 56}
                cy={120 + r * 80}
                r="3.5"
                fill="rgba(44,187,223,0.08)"
              />
            )),
          )}
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, c) => (
              <circle
                key={`gr${r}-${c}`}
                cx={1040 + c * 56}
                cy={120 + r * 80}
                r="3.5"
                fill="rgba(44,187,223,0.08)"
              />
            )),
          )}

          {/* Orange accents */}
          <circle cx="1380" cy="60" r="20" fill="rgba(240,115,74,0.12)" />
          <circle cx="1350" cy="95" r="11" fill="rgba(240,115,74,0.18)" />
          <circle cx="60" cy="480" r="16" fill="rgba(240,115,74,0.12)" />
        </svg>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* Section heading */}
          <div className="row">
            <div className="col-lg-12 text-center">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(44,187,223,0.10)",
                  padding: "6px 16px",
                  borderRadius: 20,
                  marginBottom: 16,
                }}
              >
                <i
                  className="icofont-people"
                  style={{ color: "#2cbbdf", fontSize: 16 }}
                ></i>
                <span
                  style={{
                    fontSize: 13,
                    color: "#2cbbdf",
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {badge}
                </span>
              </div>
              <h2 className="sec_title" style={{ whiteSpace: "pre-line" }}>
                {heading}
              </h2>
              <p className="sec_desc" style={{ whiteSpace: "pre-line" }}>
                {subtitle}
              </p>
            </div>
          </div>

          <div className="row">
            {members.map((member) => (
              <div
                key={member.name}
                className="col-lg-3 col-md-6"
                style={{ marginBottom: 36 }}
              >
                <div
                  className="singleTeam text-center"
                  style={{ position: "relative" }}
                >
                  <div className="teamThumb">
                    <DynamicImage
                      src={member.image}
                      alt={member.name}
                      width={270}
                      height={270}
                    />
                    <button
                      type="button"
                      className="teamView"
                      onClick={(e) => openModal(member, e)}
                      aria-label={`View ${member.name}'s profile`}
                      title="View profile"
                    >
                      <i className="icofont-eye-alt" aria-hidden="true" />
                    </button>
                  </div>
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>

                  {/* Social icons row */}
                  {/* <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
                  {socials.map(s => (
                    <Link key={s.icon} href={s.href}
                      style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(44,187,223,0.12)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#2cbbdf")}
                      onMouseLeave={e => (e.currentTarget.style.background = "rgba(44,187,223,0.12)")}
                    >
                      <i className={s.icon} style={{ color: "#2cbbdf", fontSize: 14 }}></i>
                    </Link>
                  ))}
                </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {active && (
        <div
          className="teamModal"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            ref={dialogRef}
            className="teamModal__card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="teamModalName"
          >
            <button
              ref={closeBtnRef}
              type="button"
              className="teamModal__close"
              onClick={closeModal}
              aria-label="Close profile"
            >
              <i className="icofont-close-line" aria-hidden="true" />
            </button>

            <div className="teamModal__header">
              <div className="teamModal__avatar">
                <DynamicImage
                  src={active.image}
                  alt={active.name}
                  width={160}
                  height={160}
                />
              </div>
            </div>

            <div className="teamModal__body">
              <h3 id="teamModalName" className="teamModal__name">
                {active.name}
              </h3>
              <span className="teamModal__role">{active.role}</span>
              {active.description && (
                <p className="teamModal__bio">{active.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
