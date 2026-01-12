import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MarqueeSection = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate first track to the left
      gsap.to(track1Ref.current, {
        xPercent: -50,
        duration: 20,
        ease: 'none',
        repeat: -1,
      });

      // Animate second track to the right
      gsap.to(track2Ref.current, {
        xPercent: 50,
        duration: 20,
        ease: 'none',
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  const texts = ['From Idea to Video', 'From Idea to Video', 'From Idea to Video', 'From Idea to Video'];

  return (
    <section ref={marqueeRef} className="py-16 overflow-hidden border-y border-border bg-secondary/30">
      {/* First marquee track */}
      <div className="overflow-hidden mb-4">
        <div ref={track1Ref} className="flex whitespace-nowrap">
          {[...texts, ...texts].map((text, index) => (
            <span
              key={index}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mx-8 text-foreground/90"
            >
              {text}
              <span className="text-primary mx-4">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Second marquee track (reverse) */}
      <div className="overflow-hidden">
        <div ref={track2Ref} className="flex whitespace-nowrap -translate-x-1/2">
          {[...texts, ...texts].map((text, index) => (
            <span
              key={index}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mx-8 text-muted-foreground/50"
            >
              {text}
              <span className="text-primary/50 mx-4">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
