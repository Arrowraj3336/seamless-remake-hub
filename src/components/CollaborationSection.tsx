import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, Share2, Cloud } from 'lucide-react';
import videoEditor from '@/assets/video-editor.jpg';

gsap.registerPlugin(ScrollTrigger);

const CollaborationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.collab-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.collab-image',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.collab-feature',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.collab-features',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: <Users className="w-5 h-5" />, label: 'Team Collaboration' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Real-time Comments' },
    { icon: <Share2 className="w-5 h-5" />, label: 'Easy Sharing' },
    { icon: <Cloud className="w-5 h-5" />, label: 'Cloud Storage' },
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 collab-content opacity-0">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Collaborate and <span className="gradient-text">craft stunning videos</span>{' '}
            right in your browser.
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Work together with your team in real-time. Share ideas, give feedback, and create amazing content together without ever leaving your browser.
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
            Start collaborating
          </Button>
        </div>

        {/* Video Editor Preview */}
        <div className="collab-image opacity-0 rounded-2xl overflow-hidden gradient-border mb-12">
          <img
            src={videoEditor}
            alt="Video Editor Interface"
            className="w-full h-auto"
          />
        </div>

        {/* Features Grid */}
        <div className="collab-features grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="collab-feature opacity-0 flex flex-col items-center gap-3 p-6 rounded-xl bg-card gradient-border text-center card-hover"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {feature.icon}
              </div>
              <span className="font-medium text-sm">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;
