"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Walks user-visible DOM text nodes on the public site and rewrites any
 * literal "$" to "₹". This guarantees the rupee symbol appears even for
 * content sourced from MongoDB (testimonials, blog body, descriptions,
 * etc.) that might still contain dollar characters from legacy data.
 *
 * Safety rules:
 *   • Skipped entirely on /admin routes so editors can still type "$"
 *     inside admin inputs / preview text without it being mangled.
 *   • Only touches text nodes — never attributes, scripts, styles, or
 *     form inputs.
 *   • A MutationObserver re-applies the rule for any DOM updates pushed
 *     by React (route transitions, data refetches, hydration tweaks).
 */
const DOLLAR_RE = /\$/g;
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT", "SVG"]);

function isSkippableParent(node: Node): boolean {
  let cur: Node | null = node.parentNode;
  while (cur) {
    if (cur.nodeType === Node.ELEMENT_NODE) {
      const tag = (cur as Element).tagName;
      if (SKIP_TAGS.has(tag)) return true;
      // Honour an opt-out attribute for any element that wants to keep "$".
      if ((cur as Element).hasAttribute?.("data-no-currency-normalize")) return true;
    }
    cur = cur.parentNode;
  }
  return false;
}

function normalizeNode(node: Node): void {
  if (node.nodeType !== Node.TEXT_NODE) return;
  const text = node.nodeValue;
  if (!text || !text.includes("$")) return;
  if (isSkippableParent(node)) return;
  node.nodeValue = text.replace(DOLLAR_RE, "₹");
}

function walkAndNormalize(root: Node): void {
  if (root.nodeType === Node.TEXT_NODE) {
    normalizeNode(root);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current: Node | null = walker.nextNode();
  while (current) {
    normalizeNode(current);
    current = walker.nextNode();
  }
}

export default function CurrencyNormalizer() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    if (isAdmin || typeof document === "undefined") return;

    walkAndNormalize(document.body);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "characterData") {
          normalizeNode(m.target);
        } else if (m.type === "childList") {
          m.addedNodes.forEach((n) => walkAndNormalize(n));
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [isAdmin]);

  return null;
}
