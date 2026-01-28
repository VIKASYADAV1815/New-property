"use client";

import { usePathname } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import PropertyGrid from "@/components/PropertyGrid";
import BrandedResidences from "@/components/BrandedResidences";
import FeaturedProjects from "@/components/FeaturedProjects";
import CitySpotlight from "@/components/CitySpotlight";
import ProjectMotion from "@/components/ProjectMotion";
import BentoGrid from "@/components/BentoGrid";
// import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import ConsultationForm from "@/components/ConsultationForm";
import BlogSection from "@/components/BlogSection";
import FloatingActions from "@/components/FloatingActions";
import FeatureSection from "@/components/FeatureSection";
import WhyWorkWithUs from "@/components/WhyWorkWithUs";
import FounderPreview from "@/components/FounderPreview";

export default function Home() {
  const pathname = usePathname();

  return (
    <main className="relative min-h-screen overflow-x-hidden">

      {/* Render Hero only on the home page */}
      {pathname === "/" && <HeroSection />}

      <div className="relative z-10 bg-white divide-y divide-gray-200">
        <CitySpotlight />
        <PropertyGrid />
        <FeaturedProjects />
        <ProjectMotion />
        <BrandedResidences />
        <BentoGrid />
        <WhyWorkWithUs />
        <FounderPreview />
        <FeatureSection />

        <FAQSection />
        <ConsultationForm />
        <BlogSection />
      </div>

      <FloatingActions />
    </main>
  );
}
