import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  useEffect(() => {
    // Enable smooth scrolling with smoother GSAP
    gsap.config({
      force3D: true,
    });

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Configure ScrollTrigger defaults for smooth animations
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Add smooth scroll animations to all sections with staggered reveal
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      // Section fade-in animation
      gsap.fromTo(
        section,
        { 
          opacity: 0, 
          y: 60,
          filter: 'blur(8px)'
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    // Parallax effect for all images
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      gsap.to(img, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });
    });

    // Parallax for background elements
    const bgElements = document.querySelectorAll('.parallax-bg');
    bgElements.forEach((el) => {
      gsap.to(el, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        }
      });
    });

    // Floating orbs parallax
    const orbs = document.querySelectorAll('.orb, [class*="bg-gradient"]');
    orbs.forEach((orb) => {
      gsap.to(orb, {
        yPercent: -20,
        xPercent: gsap.utils.random(-5, 5),
        ease: 'none',
        scrollTrigger: {
          trigger: orb,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 3,
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
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
  );
};

export default Index;
