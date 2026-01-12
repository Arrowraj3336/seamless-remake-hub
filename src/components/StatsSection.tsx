import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Zap, Shield, BarChart3 } from 'lucide-react';
import statsBg from '@/assets/stats-bg.jpg';
import carnivalWoman from '@/assets/carnival-woman.jpg';
import vintageInterior from '@/assets/vintage-interior.jpg';

gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const countRef1 = useRef<HTMLSpanElement>(null);
  const countRef2 = useRef<HTMLSpanElement>(null);
  const countRef3 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section content
      gsap.fromTo(
        '.stats-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate feature cards
      gsap.fromTo(
        '.stats-feature',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.stats-features',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate stats numbers
      const animateCounter = (ref: React.RefObject<HTMLSpanElement>, target: number, suffix: string) => {
        if (!ref.current) return;
        
        gsap.fromTo(
          ref.current,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            onUpdate: function() {
              if (ref.current) {
                ref.current.innerText = Math.round(Number(ref.current.innerText)) + suffix;
              }
            },
          }
        );
      };

      animateCounter(countRef1, 75, '+');
      animateCounter(countRef2, 12.6, '%');
      animateCounter(countRef3, 15, 'M+');

      // Animate images
      gsap.fromTo(
        '.stats-image',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.stats-images',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: <TrendingUp className="w-5 h-5" />, label: 'Consistent Growth' },
    { icon: <Zap className="w-5 h-5" />, label: 'Lightning Fast' },
    { icon: <Shield className="w-5 h-5" />, label: 'Enterprise Security' },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Advanced Analytics' },
  ];

  const stats = [
    { ref: countRef1, value: '75+', label: 'Countries Served' },
    { ref: countRef2, value: '12.6%', label: 'Monthly Growth' },
    { ref: countRef3, value: '15M+', label: 'Videos Created' },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-16">
          {/* Left content */}
          <div className="stats-content opacity-0">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Turning complexity into clarity to{' '}
              <span className="gradient-text">power your AI business journey</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We simplify the complex world of AI video generation, making it accessible and powerful for businesses of all sizes.
            </p>

            {/* Feature grid */}
            <div className="stats-features grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="stats-feature opacity-0 flex items-center gap-3 p-4 rounded-xl bg-card gradient-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-card gradient-border">
                <span
                  ref={stat.ref}
                  className="font-heading text-3xl md:text-4xl font-bold gradient-text block mb-2"
                >
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Images grid */}
        <div className="stats-images grid grid-cols-3 gap-4 md:gap-6">
          <div className="stats-image opacity-0 col-span-1 rounded-2xl overflow-hidden h-48 md:h-72">
            <img
              src={carnivalWoman}
              alt="Creative content"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="stats-image opacity-0 col-span-1 rounded-2xl overflow-hidden h-48 md:h-72">
            <img
              src={statsBg}
              alt="Celebration"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="stats-image opacity-0 col-span-1 rounded-2xl overflow-hidden h-48 md:h-72">
            <img
              src={vintageInterior}
              alt="Interior design"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
