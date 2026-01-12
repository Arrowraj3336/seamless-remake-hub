import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Play, Zap, Image } from 'lucide-react';

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
      // Stagger animation for model cards
      gsap.fromTo(
        '.model-card',
        { 
          opacity: 0, 
          y: 80,
          scale: 0.9,
          rotateX: 15
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating animation for images
      gsap.to('.model-image', {
        y: -8,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });

      // Glow pulse animation
      gsap.to('.model-glow', {
        opacity: 0.8,
        scale: 1.05,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      });

      // Title animation
      gsap.fromTo(
        '.models-title',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
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
    },
    {
      name: 'Veo 3.1',
      image: modelVeo,
      description: 'Advanced video generation with audio support and superior realism',
      features: ['Audio generation', 'High realism', 'Complex scenes'],
      isVideo: true,
    },
    {
      name: 'Runway',
      image: modelRunway,
      description: 'Industry-leading video generation with precise control and consistency',
      features: ['Precise control', 'Consistent quality', 'Fast generation'],
      isVideo: true,
    },
    {
      name: 'Kling',
      image: modelKling,
      description: 'Innovative AI video generation with unique creative capabilities',
      features: ['Creative effects', 'Unique style', 'Innovative approach'],
      isVideo: true,
    },
    {
      name: 'Neo Banana',
      image: modelBanana,
      description: 'Revolutionary AI image generation with text-to-image and image-to-image capabilities.',
      features: ['Text-to-Image generation', 'Image-to-Image editing', '25 images per day'],
      isVideo: false,
      isFree: true,
    },
  ];

  return (
    <section ref={sectionRef} id="models" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="models-title text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Choose Your <span className="gradient-text">AI Model</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Access the world's most powerful AI video and image generation models, all in one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {models.map((model, index) => (
            <div
              key={model.name}
              className={`model-card relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 group ${
                model.isFree ? 'ring-2 ring-primary/30' : ''
              }`}
              style={{ perspective: '1000px' }}
            >
              {/* Free Badge */}
              {model.isFree && (
                <div className="absolute top-3 right-3 z-20">
                  <span className="px-3 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full">
                    FREE
                  </span>
                </div>
              )}

              {/* Glow effect */}
              <div className="model-glow absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Image/Video Preview */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={model.image}
                  alt={model.name}
                  className="model-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Play overlay for video models */}
                {model.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <Play className="w-5 h-5 text-white fill-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  {model.isFree ? (
                    <Zap className="w-5 h-5 text-primary" />
                  ) : null}
                  <h3 className="font-heading text-xl font-bold">{model.name}</h3>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {model.description}
                  {model.isFree && <span className="text-primary font-semibold"> Completely FREE!</span>}
                </p>

                {/* Features */}
                <ul className="space-y-1.5 mb-5">
                  {model.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant="outline"
                  className="w-full rounded-full border-border/50 hover:border-primary hover:bg-primary/10 group/btn transition-all duration-300"
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
