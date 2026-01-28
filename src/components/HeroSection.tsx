import { useEffect, useRef } from "react";
import gsap from "gsap";
import PromptShowcase from "./PromptShowcase";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Staggered content reveal
      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 }
      )
        .fromTo(
          ".hero-title-line",
          { opacity: 0, y: 30, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.15 },
          "-=0.3"
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hero-showcase",
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          "-=0.3"
        );

      // Background glow animation
      gsap.to(".hero-glow", {
        scale: 1.2,
        opacity: 0.5,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Floating orbs
      gsap.to(".hero-orb", {
        x: 'random(-30, 30)',
        y: 'random(-30, 30)',
        scale: 'random(0.9, 1.1)',
        duration: 'random(8, 12)',
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-32 sm:pt-36 md:pt-40 pb-16 md:pb-24 overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-[0.02]" />
      
      {/* Animated Gradient Orbs */}
      <div className="hero-orb absolute top-20 left-[5%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-gradient-radial from-primary/25 via-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="hero-orb absolute bottom-20 right-[5%] w-[200px] h-[200px] md:w-[350px] md:h-[350px] bg-gradient-radial from-accent/20 via-accent/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-gradient-radial from-primary/15 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      {/* Decorative Lines */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      
      {/* Content Container */}
      <div ref={contentRef} className="relative z-10 w-full max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full glass border border-primary/30 mb-8 md:mb-10 backdrop-blur-xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs md:text-sm text-foreground/80 font-medium">
            🎬 Introducing <span className="text-primary font-bold">Flow Pro</span> — Next-Gen AI Video
          </span>
        </div>

        {/* Title */}
        <h1 className="font-heading mb-5 md:mb-8">
          <span className="hero-title-line block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2 md:mb-3">
            Professional Storyboard
          </span>
          <span className="hero-title-line block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="gradient-text text-glow">Like Hollywood Studios</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-10 md:mb-14 leading-relaxed px-4">
          Preview and perfect each frame before committing to video generation—saving time, credits, and ensuring your vision is captured exactly right.
        </p>

        {/* Prompt Showcase */}
        <div className="hero-showcase w-full max-w-4xl mx-auto">
          <PromptShowcase />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
