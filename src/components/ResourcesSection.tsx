import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import creativeWoman from '@/assets/creative-woman.jpg';
import womanLifestyle from '@/assets/woman-lifestyle.jpg';

gsap.registerPlugin(ScrollTrigger);

const ResourcesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate floating dots
      gsap.utils.toArray('.resource-dot').forEach((dot: any, i) => {
        gsap.to(dot, {
          y: 'random(-60, 60)',
          x: 'random(-30, 30)',
          duration: 'random(10, 18)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      });

      gsap.fromTo(
        '.resource-title',
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.resource-item',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.resource-cards',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const resources = [
    {
      image: creativeWoman,
      category: 'Tutorial',
      title: 'Getting started with AI video creation',
      description: 'Learn the basics of transforming your ideas into stunning videos.',
    },
    {
      image: womanLifestyle,
      category: 'Case Study',
      title: 'How brands are using AI for marketing',
      description: 'Discover how leading companies leverage AI content creation.',
    },
  ];

  return (
    <section ref={sectionRef} id="resources" className="relative py-20 md:py-32 section-gradient-1 overflow-hidden">
      {/* Floating dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="resource-dot absolute w-1.5 h-1.5 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 dots-pattern opacity-25" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left content */}
          <div className="resource-title opacity-0">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Essential resources to{' '}
              <span className="gradient-text">support smarter decisions.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Explore our collection of guides, tutorials, and case studies designed to help you make the most of AI-powered video creation.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-primary hover:text-accent transition-colors underline-offset-4 font-medium group"
            >
              View all resources
              <ArrowUpRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Right cards */}
          <div className="resource-cards space-y-6">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="resource-item opacity-0 group flex gap-4 md:gap-6 p-4 rounded-xl bg-card/50 gradient-border card-hover cursor-pointer"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1">
                  <span className="inline-block text-xs text-primary font-semibold uppercase tracking-wider px-2 py-1 bg-primary/10 rounded-full mb-2">
                    {resource.category}
                  </span>
                  <h3 className="font-heading font-semibold text-lg md:text-xl mt-1 mb-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {resource.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
