import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Play, Zap, Image, Sparkles, Star, Crown, Clock, Film } from 'lucide-react';

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
      // Title animation with smoother blur
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

      // Smoother stagger animation for model cards
      gsap.fromTo(
        '.model-card',
        { 
          opacity: 0, 
          y: 60,
          scale: 0.92,
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Background orbs - smoother motion
      gsap.to('.model-orb', {
        x: 'random(-30, 30)',
        y: 'random(-30, 30)',
        scale: 'random(0.9, 1.1)',
        duration: 'random(10, 14)',
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const models = [
    {
      name: 'Seedance',
      image: modelSeedance,
      description: 'Ultra-cinematic video generation with lifelike motion and professional storytelling.',
      features: ['Cinematic movements', 'Multi-shot narratives', 'Professional 4K'],
      isVideo: true,
      credits: '5 credits',
      duration: '10s videos',
      color: 'from-violet-500 to-purple-600',
      badge: 'Popular',
      badgeColor: 'bg-gradient-to-r from-violet-500 to-purple-600',
    },
    {
      name: 'Veo 3.1',
      image: modelVeo,
      description: "Google's flagship AI with native audio generation and superior realism.",
      features: ['Audio generation', 'Photorealistic', 'Complex scenes'],
      isVideo: true,
      credits: '8 credits',
      duration: '16s videos',
      color: 'from-blue-500 to-cyan-500',
      badge: 'New',
      badgeColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    },
    {
      name: 'Runway',
      image: modelRunway,
      description: 'Industry-standard Gen-3 Alpha with precise control and consistent quality.',
      features: ['Precise control', 'Fast generation', 'Style transfer'],
      isVideo: true,
      credits: '5 credits',
      duration: '10s videos',
      color: 'from-pink-500 to-rose-600',
    },
    {
      name: 'Kling',
      image: modelKling,
      description: 'Innovative AI with exceptional scene understanding and creative freedom.',
      features: ['Creative effects', 'Scene mastery', 'Unique styles'],
      isVideo: true,
      credits: '5 credits',
      duration: '10s videos',
      color: 'from-indigo-500 to-violet-600',
    },
    {
      name: 'Neo Banana',
      image: modelBanana,
      description: 'Revolutionary image generation with text-to-image and editing capabilities.',
      features: ['Text-to-Image', 'Image editing', '25 images/day'],
      isVideo: false,
      isFree: true,
      credits: 'FREE',
      duration: 'Instant',
      color: 'from-amber-500 to-orange-500',
      badge: 'Free',
      badgeColor: 'bg-gradient-to-r from-amber-500 to-orange-500',
    },
  ];

  return (
    <section ref={sectionRef} id="models" className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-15" />
      <div className="model-orb absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="model-orb absolute bottom-1/4 right-1/4 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-radial from-accent/20 via-accent/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="models-title text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/30 mb-4">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">Premium AI Models</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Choose Your <span className="gradient-text text-glow">AI Engine</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Each model excels at different creative styles. Mix and match to bring any vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          {models.map((model, index) => (
            <div
              key={model.name}
              className={`model-card relative rounded-2xl overflow-hidden glass border transition-all duration-500 group hover:-translate-y-2 hover:shadow-glow ${
                model.isFree ? 'border-amber-500/40 hover:border-amber-500/60' : 'border-border/20 hover:border-primary/50'
              }`}
              style={{ perspective: '1000px' }}
            >
              {/* Badge */}
              {model.badge && (
                <div className="absolute top-3 right-3 z-20">
                  <span className={`px-2.5 py-1 text-[10px] sm:text-xs font-bold ${model.badgeColor} text-white rounded-full shadow-lg flex items-center gap-1`}>
                    {model.isFree && <Star className="w-3 h-3" />}
                    {model.badge}
                  </span>
                </div>
              )}

              {/* Image/Video Preview */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={model.image}
                  alt={model.name}
                  className="model-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                
                {/* Play overlay for video models */}
                {model.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r ${model.color} flex items-center justify-center shadow-glow transform group-hover:scale-110 transition-transform`}>
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${model.color} flex items-center justify-center`}>
                      {model.isVideo ? <Film className="w-4 h-4 text-white" /> : <Image className="w-4 h-4 text-white" />}
                    </div>
                    <h3 className="font-heading text-base sm:text-lg font-bold">{model.name}</h3>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-xs sm:text-sm mb-4 line-clamp-2 leading-relaxed">
                  {model.description}
                </p>

                {/* Meta info */}
                <div className="flex items-center gap-3 mb-4 text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Zap className={`w-3.5 h-3.5 ${model.isFree ? 'text-amber-500' : 'text-primary'}`} />
                    <span className={model.isFree ? 'text-amber-500 font-semibold' : ''}>{model.credits}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{model.duration}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-1.5 mb-4">
                  {model.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${model.color}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`w-full rounded-full transition-all duration-300 text-xs sm:text-sm font-semibold ${
                    model.isFree
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 hover:from-amber-600 hover:to-orange-600 shadow-lg'
                      : 'bg-primary/10 text-foreground hover:bg-primary/20 border border-primary/30 hover:border-primary/50'
                  }`}
                >
                  {model.isVideo ? (
                    <Play className="w-4 h-4 mr-2" />
                  ) : (
                    <Image className="w-4 h-4 mr-2" />
                  )}
                  {model.isFree ? 'Try FREE Now' : 'Generate'}
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
