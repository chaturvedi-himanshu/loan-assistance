import { getSettings, getTeam, getTestimonials, getAboutPage, getFooterContent } from "@/lib/data";

import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import Image from "next/image";
import DynamicImage from "@/components/DynamicImage";
import Link from "next/link";

export const revalidate = 60;

export default async function AboutPage() {
  const [settings, team, testimonials, about, footerContent] = await Promise.all([
    getSettings(),
    getTeam(),
    getTestimonials(),
    getAboutPage(),
    getFooterContent(),
  ]);

  const historyItems = about.historyItems ?? [];

  // Admin usually publishes a single milestone, so a lone card gets a
  // centred "hero" treatment; multiple milestones render as a timeline.
  const isSingleHistory = historyItems.length === 1;

  return (
    <>
      <Preloader />
      <Header settings={settings} />
      <PageBanner
        title={about.bannerTitle}
        description={about.bannerDesc}
      />

      {/* Section 1 */}
      <section className="abIntro">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="abIntro__media">
                <DynamicImage src={about.sec1Image} alt="About Smart Loans" width={660} height={500} className="abIntro__img" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="abIntro__content">
                <span className="abIntro__eyebrow">
                  <i className="icofont-people" aria-hidden="true" />
                  Who We Are
                </span>
                <h2 className="abIntro__title">{about.sec1Heading}</h2>
                {about.sec1Sub && <p className="abIntro__lead">{about.sec1Sub}</p>}
                {about.sec1Body1 && <p className="abIntro__text">{about.sec1Body1}</p>}
                {about.sec1Body2 && <p className="abIntro__text">{about.sec1Body2}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="abIntro abIntro--alt">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="abIntro__media abIntro__media--right">
                <DynamicImage src={about.sec2Image} alt="Why choose Smart Loans" width={540} height={450} className="abIntro__img" />
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="abIntro__content">
                <span className="abIntro__eyebrow">
                  <i className="icofont-badge" aria-hidden="true" />
                  Why Choose Us
                </span>
                <h2 className="abIntro__title">{about.sec2Heading}</h2>
                {about.sec2Sub && <p className="abIntro__lead">{about.sec2Sub}</p>}
                {about.sec2Link && (
                  <Link href="#" className="abIntro__callout">
                    <i className="icofont-quote-left" aria-hidden="true" />
                    <span>{about.sec2Link}</span>
                  </Link>
                )}
                {about.sec2Body && <p className="abIntro__text">{about.sec2Body}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="commonSection com_history history">
        <div className="container">
          <div className="history__head">
            <span className="history__eyebrow">
              <i className="icofont-clock-time" aria-hidden="true" />
              Our Journey
            </span>
            <h2
              className="history__title"
              dangerouslySetInnerHTML={{ __html: about.historyTitle.replace(/\n/g, "<br />") }}
            />
            {about.historyDesc && <p className="history__desc">{about.historyDesc}</p>}
          </div>

          {historyItems.length > 0 && (
            <div className={`history__timeline ${isSingleHistory ? "history__timeline--single" : "history__timeline--multi"}`}>
              {historyItems.map((item, idx) => {
                const highlights = [item.backDesc1, item.backDesc2].filter(Boolean);
                return (
                  <div key={item._id ?? `${item.period}-${idx}`} className="history__item">
                    <div className="history__node" aria-hidden="true">
                      <i className="icofont-clock-time" />
                    </div>
                    <article className="history__card">
                      <span className="history__period">
                        <i className="icofont-calendar" />
                        {item.period}
                      </span>
                      {item.frontDesc1 && <p>{item.frontDesc1}</p>}
                      {item.frontDesc2 && <p>{item.frontDesc2}</p>}
                      {highlights.length > 0 && (
                        <ul className="history__highlights">
                          {highlights.map((highlight, hIdx) => (
                            <li key={hIdx}>
                              <i className="icofont-check-circled" aria-hidden="true" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <TeamSection sectionClass="grays" members={team} />
      <TestimonialsSection sectionClass="custome_sec" showThumb={true} testimonials={testimonials} />
      <Footer settings={settings} content={footerContent} />
      <Copyright settings={settings} content={footerContent} />
    </>
  );
}
