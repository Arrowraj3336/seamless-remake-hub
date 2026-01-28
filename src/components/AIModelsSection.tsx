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

interface ModelCardProps {
  model: {
    name: string;
    image: string;
    description: string;
    features: string[];
    isVideo: boolean;
    isFree?: boolean;
    credits: string;
    duration: string;
    gradient: string;
    badge?: string;
    badgeGradient?: string;
  };
}

const ModelCard = ({ model }: ModelCardProps) => (
  <div
    className={`model-card group relative rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-3 ${
      model.isFree 
        ? 'bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-amber-600/5 border-2 border-amber-500/40 hover:border-amber-400/70' 
        : 'bg-gradient-to-br from-card/90 via-card/70 to-card/50 border border-border/40 hover:border-primary/50'
    }`}
    style={{
      boxShadow: model.isFree 
        ? '0 15px 50px -12px rgba(245, 158, 11, 0.25), inset 0 1px 0 rgba(255,255,255,0.1)' 
        : '0 15px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
    }}
  >
    {/* Hover Glow Effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
    
    {/* Top Gradient Accent */}
    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${model.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
    
    {/* Badge */}
    {model.badge && (
      <div className="absolute top-4 right-4 z-20">
        <span className={`px-3 py-1.5 text-[10px] md:text-xs font-bold bg-gradient-to-r ${model.badgeGradient} text-white rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-sm`}>
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
      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent" />
      
      {/* Play Button Overlay */}
      {model.isVideo && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r ${model.gradient} flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300`}>
            <Play className="w-5 h-5 md:w-6 md:h-6 text-white fill-white ml-0.5" />
          </div>
        </div>
      )}
    </div>

    {/* Content */}
    <div className="p-4 md:p-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br ${model.gradient} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105`}>
          {model.isVideo ? <Film className="w-4 h-4 md:w-5 md:h-5" /> : <Image className="w-4 h-4 md:w-5 md:h-5" />}
        </div>
        <div>
          <h3 className="font-heading text-base md:text-lg font-bold group-hover:text-primary transition-colors">{model.name}</h3>
        </div>
      </div>
      
      <p className="text-muted-foreground text-xs md:text-sm mb-4 line-clamp-2 leading-relaxed">
        {model.description}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-3 md:gap-4 mb-4 pb-4 border-b border-border/30">
        <div className="flex items-center gap-1.5 text-xs md:text-sm">
          <Zap className={`w-3.5 h-3.5 md:w-4 md:h-4 ${model.isFree ? 'text-amber-500' : 'text-primary'}`} />
          <span className={`font-semibold ${model.isFree ? 'text-amber-500' : 'text-foreground'}`}>{model.credits}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
          <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span>{model.duration}</span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-2 mb-4 md:mb-5">
        {model.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${model.gradient} flex-shrink-0`} />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        className={`w-full rounded-xl h-10 md:h-11 transition-all duration-300 text-xs md:text-sm font-semibold group/btn ${
          model.isFree
            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-amber-500/25'
            : 'bg-gradient-to-r from-primary/10 to-accent/10 text-foreground hover:from-primary/20 hover:to-accent/20 border border-primary/30 hover:border-primary/50'
        }`}
      >
        {model.isFree ? 'Try FREE Now' : 'Generate'}
        <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
      </Button>
    </div>
  </div>
);

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
    },
  ];

  return (
    <section ref={sectionRef} id="models" className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      <div className="absolute inset-0 cyber-grid opacity-[0.02]" />
      
      {/* Animated Orbs */}
      <div className="model-orb absolute top-20 left-[10%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-gradient-radial from-violet-500/15 via-violet-500/5 to-transparent rounded-full blur-3xl" />
      <div className="model-orb absolute bottom-20 right-[10%] w-[250px] h-[250px] md:w-[350px] md:h-[350px] bg-gradient-radial from-cyan-500/15 via-cyan-500/5 to-transparent rounded-full blur-3xl" />
      <div className="model-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-radial from-primary/8 via-primary/3 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="models-title text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-5 md:mb-6 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-foreground/80">5 Premium AI Models</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
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

        {/* Models Grid - Improved Mobile Layout */}
        <div className="models-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6 max-w-7xl mx-auto px-2 sm:px-0">
          {models.map((model) => (
            <ModelCard key={model.name} model={model} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIModelsSection;
