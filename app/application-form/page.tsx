import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import ApplicationFormClient from "@/components/ApplicationFormClient";
import { getSettings, getFooterContent } from "@/lib/data";

export const revalidate = 60;

export default async function ApplicationFormPage() {
  const [settings, footerContent] = await Promise.all([getSettings(), getFooterContent()]);

  return (
    <>
      <Preloader />
      <Header settings={settings} />
      <PageBanner
        title="Application Form"
        description="We are here to help you when you need your<br>financial support, then we are help you."
      />

      <section className="commonSection applicationPage">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="formArea appareaBG">
                <ApplicationFormClient />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer settings={settings} content={footerContent} />
      <Copyright settings={settings} content={footerContent} />
    </>
  );
}
