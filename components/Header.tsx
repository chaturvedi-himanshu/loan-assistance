"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { SiteSettings } from "@/lib/data";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  // { label: "Blog",     href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header({ settings }: { settings?: SiteSettings }) {
  const [fixed, setFixed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setFixed(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
                  alt="Smart Loans"
                  width={200}
                  height={70}
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
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              <ul style={{ display: mobileOpen ? "block" : undefined }}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} onClick={() => setMobileOpen(false)}>
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
    </header>
  );
}
