import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const logos = [
  { name: 'TechCorp', icon: '◆' },
  { name: 'Google', icon: '●' },
  { name: 'Mastercard', icon: '◐' },
  { name: 'Dropbox', icon: '◧' },
  { name: 'Spotify', icon: '◉' },
  { name: 'Figma', icon: '✦' },
  { name: 'Notion', icon: '◫' },
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
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <span className="text-xl">{logo.icon}</span>
              <span className="text-sm font-medium">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogosSection;
