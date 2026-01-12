import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, Share2, Cloud, Sparkles, Zap, Film, Wand2 } from 'lucide-react';
import aiDemoVideo from '@/assets/ai-demo-video.mp4';

gsap.registerPlugin(ScrollTrigger);

const CollaborationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal animation with blur
      gsap.fromTo(
        '.collab-title',
        { opacity: 0, y: 80, rotateX: 20, filter: 'blur(20px)' },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Description fade in
      gsap.fromTo(
        '.collab-desc',
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Button bounce in
      gsap.fromTo(
        '.collab-btn',
        { opacity: 0, scale: 0.7, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Video container reveal with scale
      gsap.fromTo(
        '.collab-video',
        { opacity: 0, scale: 0.85, y: 80, filter: 'blur(10px)' },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.collab-video',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax effect on video
      gsap.to('.collab-video-inner', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.collab-video',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Feature cards stagger with 3D effect
      gsap.fromTo(
        '.collab-feature',
        { 
          opacity: 0, 
          y: 60,
          rotateY: -20,
          scale: 0.9,
          transformOrigin: 'left center'
        },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.collab-features',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating particles animation
      gsap.to('.particle', {
        y: 'random(-30, 30)',
        x: 'random(-20, 20)',
        rotation: 'random(-180, 180)',
        opacity: 'random(0.2, 0.6)',
        duration: 'random(4, 8)',
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.3,
          from: 'random',
        },
      });

      // Glow pulse
      gsap.to('.video-glow', {
        opacity: 0.7,
        scale: 1.15,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: <Users className="w-5 h-5" />, label: 'Team Collaboration', desc: 'Work together seamlessly' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Real-time Comments', desc: 'Instant feedback loop' },
    { icon: <Share2 className="w-5 h-5" />, label: 'Easy Sharing', desc: 'One-click distribution' },
    { icon: <Cloud className="w-5 h-5" />, label: 'Cloud Storage', desc: 'Unlimited cloud space' },
    { icon: <Sparkles className="w-5 h-5" />, label: 'AI Enhancement', desc: 'Smart auto-improvements' },
    { icon: <Zap className="w-5 h-5" />, label: 'Fast Processing', desc: 'Lightning-fast renders' },
    { icon: <Film className="w-5 h-5" />, label: '4K Export', desc: 'Ultra HD quality output' },
    { icon: <Wand2 className="w-5 h-5" />, label: 'Magic Edit', desc: 'One-click transformations' },
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-15" />
      
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 rounded-full bg-primary/40"
            style={{
              left: `${10 + i * 8}%`,
              top: `${15 + (i % 4) * 20}%`,
              boxShadow: '0 0 10px hsl(270 100% 60% / 0.4)',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12" style={{ perspective: '1000px' }}>
          <h2 className="collab-title font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Experience <span className="gradient-text text-glow">AI-Generated Videos</span>{' '}
            in stunning quality.
          </h2>
          <p className="collab-desc text-muted-foreground text-sm sm:text-base md:text-lg mb-6 sm:mb-8 px-4">
            Watch our AI models create cinematic masterpieces in seconds. From text prompts to breathtaking visuals, 
            witness the future of video creation.
          </p>
          <Button 
            size="lg" 
            className="collab-btn btn-futuristic bg-gradient-to-r from-primary via-accent to-cyber-magenta text-white rounded-full shadow-glow hover:shadow-glow-intense transition-all duration-300 text-sm sm:text-base"
          >
            Start Creating
          </Button>
        </div>

        {/* AI Video Demo */}
        <div className="collab-video relative rounded-2xl overflow-hidden mb-10 sm:mb-12">
          {/* Glow effect behind video */}
          <div className="video-glow absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-primary/25 via-accent/20 to-cyber-magenta/25 rounded-3xl blur-2xl opacity-50" />
          
          <div className="relative glass-strong rounded-2xl overflow-hidden border border-primary/30">
            <div className="collab-video-inner">
              <video
                ref={videoRef}
                src={aiDemoVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
            </div>
            
            {/* Video overlay with branding */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-white/10">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-white">AI Generated</span>
              </div>
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-white/10">
                <span className="text-xs sm:text-sm font-medium text-white">Veo 3.1 Model</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="collab-features grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="collab-feature group flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-xl glass border border-border/30 text-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-glow"
              style={{ perspective: '500px' }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center text-primary group-hover:from-primary/30 group-hover:to-accent/20 group-hover:scale-110 transition-all duration-300">
                {feature.icon}
              </div>
              <span className="font-medium text-xs sm:text-sm">{feature.label}</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">{feature.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;
