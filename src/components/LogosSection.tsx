import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Video, Wand2, Zap, Layers, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const models = [
  { name: 'Seedance AI', icon: <Video className="w-5 h-5" /> },
  { name: 'Runway AI', icon: <Wand2 className="w-5 h-5" /> },
  { name: 'Veo 3.1', icon: <Zap className="w-5 h-5" /> },
  { name: 'Kling AI', icon: <Layers className="w-5 h-5" /> },
  { name: 'Neo Banana', icon: <Sparkles className="w-5 h-5" /> },
];

const LogosSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 border-y border-border opacity-0">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground mb-6">
          Powered by the world's leading AI video models
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {models.map((model, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all cursor-pointer"
            >
              <span className="text-primary">{model.icon}</span>
              <span className="text-sm font-medium">{model.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogosSection;