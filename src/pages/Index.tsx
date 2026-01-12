import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LogosSection from '@/components/LogosSection';
import FeaturesSection from '@/components/FeaturesSection';
import AIModelsSection from '@/components/AIModelsSection';
import CollaborationSection from '@/components/CollaborationSection';
import ResourcesSection from '@/components/ResourcesSection';
import PricingSection from '@/components/PricingSection';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import SnowflakesBackground from '@/components/SnowflakesBackground';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Enable smooth scrolling with smoother GSAP
    gsap.config({
      force3D: true,
    });

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <SnowflakesBackground />
      <Navbar />
      <HeroSection />
      <LogosSection />
      <FeaturesSection />
      <AIModelsSection />
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
