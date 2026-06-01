"use client";

import { useMemo } from "react";
import Link from "next/link";
import type { SiteSettings, FooterContentData } from "@/lib/data";

interface CopyrightProps {
  settings?: SiteSettings;
  content?: FooterContentData;
}

function interpolate(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ""));
}

export default function Copyright({ settings, content }: CopyrightProps) {
  const siteName = settings?.siteName ?? "Payloan";

  const text = useMemo(() => {
    const template = content?.copyrightBarText ?? "Copyright {siteName}. All rights reserved";
    return interpolate(template, { siteName, year: new Date().getFullYear() });
  }, [content?.copyrightBarText, siteName]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="copyright">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <p>
              {text.split(siteName).map((part, idx, arr) => (
                <span key={idx}>
                  {part}
                  {idx < arr.length - 1 && <Link href="/">{siteName}</Link>}
                </span>
              ))}
            </p>
          </div>
          <div className="col-sm-6 text-right">
            <a href="#" id="backTo" onClick={scrollToTop}>
              <i className="flaticon-chevron"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
