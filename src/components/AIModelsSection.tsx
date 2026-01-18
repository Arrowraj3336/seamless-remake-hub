import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Play, Zap, Image, Sparkles, Star } from 'lucide-react';

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
          duration: 1.4,
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
          y: 80,
          scale: 0.9,
          filter: 'blur(8px)'
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Removed floating animation on images to prevent detachment from containers

      // Background orbs - smoother motion
      gsap.to('.model-orb', {
        x: 'random(-25, 25)',
        y: 'random(-25, 25)',
        scale: 'random(0.95, 1.05)',
        duration: 'random(8, 12)',
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.4,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const models = [
    {
      name: 'Seedance',
      image: modelSeedance,
      description: 'Leading performance in text-to-video generation with cinematic quality',
      features: ['Cinematic movements', 'Multi-shot storytelling', 'Professional quality'],
      isVideo: true,
      color: 'from-violet-500 to-purple-600',
    },
    {
      name: 'Veo 3.1',
      image: modelVeo,
      description: 'Advanced video generation with audio support and superior realism',
      features: ['Audio generation', 'High realism', 'Complex scenes'],
      isVideo: true,
      color: 'from-purple-500 to-pink-600',
    },
    {
      name: 'Runway',
      image: modelRunway,
      description: 'Industry-leading video generation with precise control and consistency',
      features: ['Precise control', 'Consistent quality', 'Fast generation'],
      isVideo: true,
      color: 'from-pink-500 to-rose-600',
    },
    {
      name: 'Kling',
      image: modelKling,
      description: 'Innovative AI video generation with unique creative capabilities',
      features: ['Creative effects', 'Unique style', 'Innovative approach'],
      isVideo: true,
      color: 'from-indigo-500 to-violet-600',
    },
    {
      name: 'Neo Banana',
      image: modelBanana,
      description: 'Revolutionary AI image generation with text-to-image and image-to-image capabilities.',
      features: ['Text-to-Image generation', 'Image-to-Image editing', '25 images per day'],
      isVideo: false,
      isFree: true,
      color: 'from-amber-500 to-orange-600',
    },
  ];

  return (
    <section ref={sectionRef} id="models" className="py-16 sm:py-20 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="model-orb absolute top-1/4 left-1/4 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="model-orb absolute bottom-1/4 right-1/4 w-64 sm:w-72 h-64 sm:h-72 bg-gradient-radial from-accent/20 via-accent/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="models-title text-center mb-10 sm:mb-16">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Choose Your <span className="gradient-text text-glow">AI Model</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Access the world's most powerful AI video and image generation models, all in one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {models.map((model, index) => (
            <div
              key={model.name}
              className={`model-card relative rounded-2xl overflow-hidden glass border border-border/20 hover:border-border/40 transition-all duration-700 group ${
                model.isFree ? 'ring-2 ring-primary/30' : ''
              }`}
              style={{ perspective: '1000px' }}
            >
              {/* Free Badge */}
              {model.isFree && (
                <div className="absolute top-3 right-3 z-20">
                  <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-primary to-accent text-white rounded-full shadow-glow flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    FREE
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
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                
                {/* Play overlay for video models */}
                {model.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-glow transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white fill-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  {model.isFree ? (
                    <Zap className="w-5 h-5 text-primary animate-pulse" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-primary" />
                  )}
                  <h3 className="font-heading text-lg sm:text-xl font-bold">{model.name}</h3>
                </div>
                
                <p className="text-muted-foreground text-xs sm:text-sm mb-4 line-clamp-2">
                  {model.description}
                  {model.isFree && <span className="text-primary font-semibold"> Completely FREE!</span>}
                </p>

                {/* Features */}
                <ul className="space-y-1.5 mb-4 sm:mb-5">
                  {model.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant="outline"
                  className="w-full rounded-full border-primary/30 hover:border-primary hover:bg-primary/10 group/btn transition-all duration-300 text-xs sm:text-sm"
                >
                  {model.isVideo ? (
                    <Play className="w-4 h-4 mr-2 group-hover/btn:text-primary transition-colors" />
                  ) : (
                    <Image className="w-4 h-4 mr-2 group-hover/btn:text-primary transition-colors" />
                  )}
                  {model.isFree ? 'Try FREE Now' : 'Try Now'}
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
