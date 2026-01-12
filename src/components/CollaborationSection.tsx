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
      // Title reveal animation
      gsap.fromTo(
        '.collab-title',
        { opacity: 0, y: 60, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
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
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          delay: 0.4,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Video container reveal with parallax
      gsap.fromTo(
        '.collab-video',
        { opacity: 0, scale: 0.9, y: 60 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
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
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.collab-video',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Feature cards stagger with 3D effect
      gsap.fromTo(
        '.collab-feature',
        { 
          opacity: 0, 
          y: 50,
          rotateY: -20,
          transformOrigin: 'left center'
        },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.7,
          stagger: 0.12,
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
        y: -20,
        x: 10,
        rotation: 360,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.5,
          from: 'random',
        },
      });

      // Glow pulse
      gsap.to('.video-glow', {
        opacity: 0.6,
        scale: 1.1,
        duration: 2,
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
    <section ref={sectionRef} className="py-20 md:py-32 bg-secondary/20 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12" style={{ perspective: '1000px' }}>
          <h2 className="collab-title font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Experience <span className="gradient-text">AI-Generated Videos</span>{' '}
            in stunning quality.
          </h2>
          <p className="collab-desc text-muted-foreground text-lg mb-8">
            Watch our AI models create cinematic masterpieces in seconds. From text prompts to breathtaking visuals, 
            witness the future of video creation.
          </p>
          <Button 
            size="lg" 
            className="collab-btn bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
          >
            Start Creating
          </Button>
        </div>

        {/* AI Video Demo */}
        <div className="collab-video relative rounded-2xl overflow-hidden mb-12">
          {/* Glow effect behind video */}
          <div className="video-glow absolute -inset-4 bg-gradient-to-r from-primary/20 via-violet-600/20 to-primary/20 rounded-3xl blur-2xl opacity-40" />
          
          <div className="relative gradient-border rounded-2xl overflow-hidden">
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
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-white">AI Generated</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                <span className="text-sm font-medium text-white">Veo 3.1 Model</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="collab-features grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="collab-feature group flex flex-col items-center gap-3 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 text-center hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
              style={{ perspective: '500px' }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                {feature.icon}
              </div>
              <span className="font-medium text-sm">{feature.label}</span>
              <span className="text-xs text-muted-foreground">{feature.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;
