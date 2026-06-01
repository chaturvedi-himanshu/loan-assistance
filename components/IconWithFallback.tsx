"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Rotating set of safe icofont classes used when no icon string is available
 * and the title cannot be matched to a more specific keyword.
 */
const FALLBACK_ROTATION = [
  "icofont-businessman",
  "icofont-people",
  "icofont-student",
  "icofont-car",
  "icofont-building",
  "icofont-heart-beat",
];

/**
 * Guess a sensible icon from common keywords in a loan / service title.
 * Returning `null` means we couldn't infer a confident match and the caller
 * should fall back to the rotation.
 */
function inferIconFromTitle(title?: string): string | null {
  if (!title) return null;
  const t = title.toLowerCase();
  if (/home|house|property|mortgage/.test(t)) return "icofont-building";
  if (/car|auto|vehicle|bike/.test(t)) return "icofont-car";
  if (/business|sme|enterprise|commercial/.test(t)) return "icofont-businessman";
  if (/education|student|tuition|school/.test(t)) return "icofont-student";
  if (/medical|health|hospital|emergency/.test(t)) return "icofont-heart-beat";
  if (/personal|individual/.test(t)) return "icofont-people";
  if (/gold|jewel/.test(t)) return "icofont-gold";
  if (/agri|farm/.test(t)) return "icofont-tractor";
  if (/convey|legal|law|deed|settlement/.test(t)) return "icofont-law-document";
  return null;
}

/**
 * Always returns a non-empty class string. Used at render time so the
 * `<i>` element never ends up with `className=""`.
 *
 * Strategy: trim → infer from title → rotate from a curated default list.
 *
 * The legacy default `"flaticon-money"` stored on some DB rows is
 * explicitly treated as "no icon" because the flaticon stylesheet is not
 * shipped with this app.
 */
export function resolveIcon(
  rawIcon: string | undefined,
  title: string | undefined,
  index: number,
): string {
  const trimmed = (rawIcon ?? "").trim();
  if (trimmed && !trimmed.startsWith("flaticon-")) return trimmed;
  return inferIconFromTitle(title) ?? FALLBACK_ROTATION[index % FALLBACK_ROTATION.length];
}

interface IconWithFallbackProps {
  /** Raw icon class from the DB. May be empty or an unknown class. */
  icon?: string;
  /** Title used to infer a more specific fallback icon. */
  title?: string;
  /** Stable index used to rotate the default icon list (so adjacent cards
   *  don't all show the same fallback glyph). */
  index?: number;
  /** Foreground color used for both the `<i>` and the SVG fallback. */
  color: string;
  /** Pixel size of the icon glyph. The inline SVG matches this size. */
  size?: number;
  /** Optional extra inline styles merged onto the `<i>`. */
  iconStyle?: CSSProperties;
}

/**
 * Renders an icofont `<i>` and, after mount, checks whether the glyph
 * actually painted (`offsetWidth > 0`). If the font stylesheet failed to
 * load or the class is unknown, we swap in an inline SVG so the card never
 * shows an empty box.
 */
export default function IconWithFallback({
  icon,
  title,
  index = 0,
  color,
  size = 22,
  iconStyle,
}: IconWithFallbackProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [needsFallback, setNeedsFallback] = useState(false);

  const iconClass = resolveIcon(icon, title, index);

  useEffect(() => {
    if (!ref.current) return;
    const id = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const before = window.getComputedStyle(el, "::before");
      const content = before.content;
      // Icon fonts set a private-use codepoint via `content`. A missing or
      // empty content means the class did not match — swap to the SVG.
      const hasIconContent =
        content && content !== "none" && content !== "normal" && content !== '""' && content !== "''";
      if (!hasIconContent || el.offsetWidth === 0) {
        setNeedsFallback(true);
      }
    });
    return () => cancelAnimationFrame(id);
  }, [iconClass]);

  if (needsFallback) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={iconStyle}
      >
        <path d="M3 21h18" />
        <path d="M5 21V10l7-5 7 5v11" />
        <path d="M9 21v-6h6v6" />
      </svg>
    );
  }

  return (
    <i
      ref={ref}
      className={iconClass}
      style={{ fontSize: size, color, ...iconStyle }}
    />
  );
}
