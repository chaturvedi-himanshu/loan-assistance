"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { SiteSettings } from "@/lib/data";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  // { label: "Blog",     href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/**
 * Routes whose hero / banner uses a LIGHT background and therefore need a
 * dark logo + dark nav links. Every other public route currently uses the
 * dark gradient `<PageBanner>` and benefits from a light overlay header.
 */
const LIGHT_BG_ROUTES = new Set<string>(["/"]);

export default function Header({ settings }: { settings?: SiteSettings }) {
  const [fixed, setFixed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setFixed(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Decide whether the header should render in light-on-dark mode. We render
  // dark-on-light when:
  //   • the header is pinned (solid white bar after scroll), OR
  //   • the page below is known to use a light hero (currently just `/`).
  const isLightBgPage = LIGHT_BG_ROUTES.has(pathname ?? "/");
  const useDarkText = fixed || isLightBgPage;

  const linkColor = useDarkText ? "#1a1a2e" : "#ffffff";
  const linkColorHover = "#2cbbdf";
  const logoFilter = useDarkText ? "none" : "brightness(0) invert(1)";

  return (
    <header
      className={`header_1${fixed ? " fixedHeader animated flipInX" : ""}`}
      id="header"
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-3 col-md-3">
            <div className="logo">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt={settings?.siteName ?? "Smart Loans"}
                  width={240}
                  height={84}
                  style={{
                    width: "auto",
                    height: 64,
                    maxHeight: 64,
                    filter: logoFilter,
                    transition: "filter 0.25s ease",
                  }}
                  priority
                />
              </Link>
            </div>
          </div>

          <div className="col-lg-7 col-md-7">
            <nav
              className={`mainmenu MenuInRight text-right${mobileOpen ? " open" : ""}`}
            >
              {/* Hamburger */}
              <button
                className={`mobilemenu d-md-none d-lg-none d-xl-none${mobileOpen ? " active" : ""}`}
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                style={{
                  // ensure hamburger lines are visible on dark overlay too
                  color: linkColor,
                }}
              >
                <span style={{ background: linkColor }}></span>
                <span style={{ background: linkColor }}></span>
                <span style={{ background: linkColor }}></span>
              </button>

              <ul
                style={{ display: mobileOpen ? "block" : undefined }}
                className={useDarkText ? "smart-nav" : "smart-nav smart-nav--light"}
              >
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        color: linkColor,
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          linkColorHover;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          linkColor;
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="col-lg-2 col-md-2 hidden-xs">
            <div className="navigator_btn btn_bg text-right">
              <Link className="common_btn" href="/application-form">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Make sure inline hover wins on legacy `.mainmenu ul li a` rule. */}
      <style>{`
        .smart-nav li a { color: ${linkColor} !important; }
        .smart-nav li a:hover { color: ${linkColorHover} !important; }
      `}</style>
    </header>
  );
}
