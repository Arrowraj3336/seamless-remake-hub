import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LogosSection from '@/components/LogosSection';
import FeaturesSection from '@/components/FeaturesSection';
import AIModelsSection from '@/components/AIModelsSection';
import CreativeToolsSection from '@/components/CreativeToolsSection';
import CollaborationSection from '@/components/CollaborationSection';
import ResourcesSection from '@/components/ResourcesSection';
import PricingSection from '@/components/PricingSection';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <LogosSection />
      <FeaturesSection />
      <AIModelsSection />
      <CreativeToolsSection />
      <CollaborationSection />
      <ResourcesSection />
      <PricingSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
