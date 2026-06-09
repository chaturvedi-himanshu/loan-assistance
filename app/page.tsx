import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import HomeServicesSection from "@/components/HomeServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import LoanProductsSection from "@/components/LoanProductsSection";
import HomeContactSection from "@/components/HomeContactSection";
import ApplicationProcessSection from "@/components/ApplicationProcessSection";
import ApplyAmountSection from "@/components/ApplyAmountSection";
import EmiCalculatorSection from "@/components/EmiCalculatorSection";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ConveyancingSection from "@/components/ConveyancingSection";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";

import {
  getHero, getStats, getServices, getWhyChooseUs,
  getTeam, getTestimonials, getSettings,
  getProcessSteps, getConveyancingServices, getHomeContent, getFooterContent,
} from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [
    hero, stats, services, why, team,
    testimonials, settings, processSteps, conveyancing, homeContent, footerContent,
  ] = await Promise.all([
    getHero(),
    getStats(),
    getServices(),
    getWhyChooseUs(),
    getTeam(),
    getTestimonials(),
    getSettings(),
    getProcessSteps(),
    getConveyancingServices(),
    getHomeContent(),
    getFooterContent(),
  ]);

  return (
    <>
      <Preloader />
      <Header settings={settings} />

      <HeroSection hero={hero} stats={stats} />
      <StatsSection stats={stats} />

      <HomeServicesSection services={services} content={homeContent} />
      <LoanProductsSection services={services} content={homeContent} />

      <WhyChooseUsSection features={why} content={homeContent} />

      <HomeContactSection settings={settings} content={homeContent} />
      {/* <ApplicationProcessSection steps={processSteps} content={homeContent} /> */}

      <ConveyancingSection items={conveyancing} compact={true} content={homeContent} />

      {/* <ApplyAmountSection content={homeContent} /> */}
      {/* <EmiCalculatorSection content={homeContent} /> */}

      <TeamSection
        members={team.map(m => ({ name: m.name, role: m.role, description: m.description, image: m.image }))}
        content={homeContent}
      />
      <TestimonialsSection
        sectionClass="custome_sec_2"
        showThumb={true}
        testimonials={testimonials}
        content={homeContent}
      />

      {/* <LatestPostsSection posts={posts.slice(0, 2)} /> */}
      {/* <TrustedPartnersSection partners={partners} /> */}

      <Footer settings={settings} content={footerContent} />
      <Copyright settings={settings} content={footerContent} />
    </>
  );
}
