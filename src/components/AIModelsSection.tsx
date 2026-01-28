import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Play, Zap, Image, Star, Clock, Film, Sparkles, ArrowRight } from 'lucide-react';

import modelSeedance from '@/assets/model-seedance.jpg';
import modelVeo from '@/assets/model-veo.jpg';
import modelRunway from '@/assets/model-runway.jpg';
import modelKling from '@/assets/model-kling.jpg';
import modelBanana from '@/assets/model-banana.jpg';

gsap.registerPlugin(ScrollTrigger);

const AIModelsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.models-title',
        { opacity: 0, y: 50, filter: 'blur(15px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger
      gsap.fromTo(
        '.model-card',
        { 
          opacity: 0, 
          y: 60,
          scale: 0.92,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.models-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating orbs
      gsap.to('.model-orb', {
        x: 'random(-40, 40)',
        y: 'random(-40, 40)',
        scale: 'random(0.85, 1.15)',
        duration: 'random(8, 14)',
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const models = [
    {
      name: 'Seedance',
      image: modelSeedance,
      description: 'Ultra-cinematic video generation with lifelike motion.',
      features: ['Cinematic movements', 'Multi-shot narratives', 'Professional 4K'],
      isVideo: true,
      credits: '5 credits',
      duration: '10s videos',
      gradient: 'from-violet-500 to-purple-600',
      badge: 'Popular',
      badgeGradient: 'from-violet-500 to-purple-600',
      glowColor: 'violet',
    },
    {
      name: 'Veo 3.1',
      image: modelVeo,
      description: "Google's flagship AI with native audio generation.",
      features: ['Audio generation', 'Photorealistic', 'Complex scenes'],
      isVideo: true,
      credits: '8 credits',
      duration: '16s videos',
      gradient: 'from-blue-500 to-cyan-500',
      badge: 'New',
      badgeGradient: 'from-blue-500 to-cyan-500',
      glowColor: 'cyan',
    },
    {
      name: 'Runway',
      image: modelRunway,
      description: 'Industry-standard Gen-3 Alpha with precise control.',
      features: ['Precise control', 'Fast generation', 'Style transfer'],
      isVideo: true,
      credits: '5 credits',
      duration: '10s videos',
      gradient: 'from-pink-500 to-rose-600',
      glowColor: 'pink',
    },
    {
      name: 'Kling',
      image: modelKling,
      description: 'Exceptional scene understanding and creative freedom.',
      features: ['Creative effects', 'Scene mastery', 'Unique styles'],
      isVideo: true,
      credits: '5 credits',
      duration: '10s videos',
      gradient: 'from-indigo-500 to-violet-600',
      glowColor: 'indigo',
    },
    {
      name: 'Neo Banana',
      image: modelBanana,
      description: 'Revolutionary image generation with editing capabilities.',
      features: ['Text-to-Image', 'Image editing', '25 images/day'],
      isVideo: false,
      isFree: true,
      credits: 'FREE',
      duration: 'Instant',
      gradient: 'from-amber-500 to-orange-500',
      badge: 'Free',
      badgeGradient: 'from-amber-500 to-orange-500',
      glowColor: 'amber',
    },
  ];

  return (
    <section ref={sectionRef} id="models" className="py-20 sm:py-24 md:py-32 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      <div className="absolute inset-0 cyber-grid opacity-[0.03]" />
      
      {/* Animated Orbs */}
      <div className="model-orb absolute top-20 left-[10%] w-[400px] h-[400px] bg-gradient-radial from-violet-500/20 via-violet-500/5 to-transparent rounded-full blur-3xl" />
      <div className="model-orb absolute bottom-20 right-[10%] w-[350px] h-[350px] bg-gradient-radial from-cyan-500/20 via-cyan-500/5 to-transparent rounded-full blur-3xl" />
      <div className="model-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="models-title text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-foreground/80">5 Premium AI Models</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Choose Your{' '}
            <span className="relative">
              <span className="gradient-text text-glow">AI Engine</span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-50" />
            </span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Each model excels at different creative styles. Mix and match to bring any vision to life.
          </p>
        </div>

        {/* Models Grid */}
        <div className="models-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6">
          {models.map((model) => (
            <div
              key={model.name}
              className={`model-card group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 ${
                model.isFree 
                  ? 'bg-gradient-to-b from-amber-500/10 to-amber-500/5 border-2 border-amber-500/30 hover:border-amber-500/60' 
                  : 'glass-strong border border-border/30 hover:border-primary/50'
              }`}
              style={{
                boxShadow: model.isFree 
                  ? '0 10px 40px -10px rgba(245, 158, 11, 0.2)' 
                  : '0 10px 40px -10px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-${model.glowColor}-500/10 via-transparent to-transparent pointer-events-none`} />
              
              {/* Badge */}
              {model.badge && (
                <div className="absolute top-3 right-3 z-20">
                  <span className={`px-3 py-1 text-[10px] md:text-xs font-bold bg-gradient-to-r ${model.badgeGradient} text-white rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-sm`}>
                    {model.isFree && <Star className="w-3 h-3 fill-current" />}
                    {model.badge}
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                
                {/* Play Button Overlay */}
                {model.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r ${model.gradient} flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300`}>
                      <Play className="w-6 h-6 md:w-7 md:h-7 text-white fill-white ml-1" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br ${model.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                    {model.isVideo ? <Film className="w-5 h-5 text-white" /> : <Image className="w-5 h-5 text-white" />}
                  </div>
                  <h3 className="font-heading text-lg md:text-xl font-bold group-hover:text-primary transition-colors">{model.name}</h3>
                </div>
                
                <p className="text-muted-foreground text-xs md:text-sm mb-4 line-clamp-2 leading-relaxed">
                  {model.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-xs md:text-sm">
                    <Zap className={`w-4 h-4 ${model.isFree ? 'text-amber-500' : 'text-primary'}`} />
                    <span className={`font-semibold ${model.isFree ? 'text-amber-500' : 'text-foreground'}`}>{model.credits}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{model.duration}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-5">
                  {model.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${model.gradient} flex-shrink-0`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  className={`w-full rounded-xl h-11 transition-all duration-300 text-sm font-semibold group/btn ${
                    model.isFree
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-amber-500/25'
                      : 'bg-gradient-to-r from-primary/10 to-accent/10 text-foreground hover:from-primary/20 hover:to-accent/20 border border-primary/30 hover:border-primary/50'
                  }`}
                >
                  {model.isFree ? 'Try FREE Now' : 'Generate'}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIModelsSection;
