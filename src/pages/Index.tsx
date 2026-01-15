import { useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ChipLoader from '@/components/ChipLoader';
import Navbar from '@/components/Navbar';
import HeroVideoSection from '@/components/HeroVideoSection';
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
  const [isLoading, setIsLoading] = useState(true);
  const [showFlash, setShowFlash] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setShowFlash(true);
    setTimeout(() => {
      setShowFlash(false);
      setIsLoading(false);
    }, 400);
  }, []);

  useEffect(() => {
    if (isLoading) return;

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
  }, [isLoading]);

  return (
    <>
      {isLoading && <ChipLoader onLoadingComplete={handleLoadingComplete} duration={2000} />}
      
      {/* Camera flash effect - expands from center */}
      {showFlash && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="absolute w-full h-full bg-white animate-camera-flash" />
        </div>
      )}
      
      <main className={`min-h-screen bg-background text-foreground overflow-x-hidden relative ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}>
        <SnowflakesBackground />
        <Navbar isOverVideo={true} />
        <HeroVideoSection />
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
    </>
  );
};

export default Index;
