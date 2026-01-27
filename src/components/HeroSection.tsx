import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Zap, Star, Cpu } from "lucide-react";
import gsap from "gsap";
import PromptShowcase from "./PromptShowcase";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const modelsRef = useRef<HTMLDivElement>(null);

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
          ".hero-cta",
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(
          ".hero-models",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const aiModels = [
    { name: "Seedance", icon: <Sparkles className="w-3 h-3" />, color: "text-violet-400" },
    { name: "Runway", icon: <Zap className="w-3 h-3" />, color: "text-pink-400" },
    { name: "Veo 3.1", icon: <Cpu className="w-3 h-3" />, color: "text-cyan-400" },
    { name: "Kling", icon: <Star className="w-3 h-3" />, color: "text-amber-400" },
  ];

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 md:py-24 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-[0.03]" />
      <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      {/* Content Container */}
      <div ref={contentRef} className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6 md:mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs md:text-sm text-muted-foreground">
            🎬 Introducing <span className="text-primary font-semibold">Flow Pro</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="font-heading mb-4 md:mb-6">
          <span className="hero-title-line block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2">
            Professional Storyboard
          </span>
          <span className="hero-title-line block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-text text-glow">
            Like Hollywood Studios
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-4">
          Preview and perfect each frame before committing to video generation—saving time, credits, and ensuring your vision is captured exactly right.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 md:mb-8 px-4">
          <Button
            size="lg"
            className="hero-cta w-full sm:w-auto bg-gradient-to-r from-primary via-accent to-primary text-white px-8 py-6 text-sm md:text-base font-semibold rounded-xl shadow-glow hover:shadow-glow-intense transition-all duration-300 group"
          >
            Start Creating Free
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="hero-cta w-full sm:w-auto border-border/50 hover:bg-primary/5 hover:border-primary/30 px-8 py-6 text-sm md:text-base rounded-xl transition-all duration-300 glass group"
          >
            <Play className="mr-2 h-4 w-4 fill-current group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </div>

        {/* AI Models */}
        <div ref={modelsRef} className="hero-models flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8 md:mb-12 px-4">
          <span className="text-xs text-muted-foreground">Powered by:</span>
          {aiModels.map((model, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className={model.color}>{model.icon}</span>
              <span>{model.name}</span>
            </div>
          ))}
        </div>

        {/* Prompt Showcase */}
        <div className="hero-showcase w-full max-w-3xl mx-auto">
          <PromptShowcase />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
