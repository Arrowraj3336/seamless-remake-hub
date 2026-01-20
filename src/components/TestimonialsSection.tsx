import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight, Quote, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import testimonial1 from '@/assets/testimonial-1.jpg';
import testimonial2 from '@/assets/testimonial-2.jpg';
import testimonial3 from '@/assets/testimonial-3.jpg';

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    { 
      image: testimonial1, 
      name: 'Sarah Johnson', 
      role: 'Marketing Director', 
      company: 'TechCorp Inc.',
      content: 'SPECTORIA has completely transformed our content pipeline. What used to take our team hours now takes minutes. The quality of AI-generated videos is indistinguishable from professional productions.', 
      rating: 5,
      highlight: '10x faster content creation'
    },
    { 
      image: testimonial2, 
      name: 'Michael Chen', 
      role: 'Creative Lead', 
      company: 'StartupX',
      content: 'The variety of AI models available is incredible. Whether I need cinematic Seedance videos or quick Runway generations, SPECTORIA has become our go-to platform for all visual content.', 
      rating: 5,
      highlight: '5 AI models in one place'
    },
    { 
      image: testimonial3, 
      name: 'Emily Rodriguez', 
      role: 'Content Creator', 
      company: '2M+ Followers',
      content: "I've tested every AI video tool on the market. SPECTORIA's Veo 3.1 integration puts them miles ahead. The audio generation alone saves me hours of work every single week.", 
      rating: 5,
      highlight: 'Best-in-class AI quality'
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-header', 
        { opacity: 0, y: 50, filter: 'blur(15px)' }, 
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)', 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: 'top 70%', 
            toggleActions: 'play none none reverse' 
          } 
        }
      );
      
      gsap.fromTo('.testimonial-card', 
        { opacity: 0, y: 60, scale: 0.95 }, 
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.9, 
          stagger: 0.12, 
          ease: 'power3.out',
          scrollTrigger: { 
            trigger: '.testimonials-grid', 
            start: 'top 75%', 
            toggleActions: 'play none none reverse' 
          } 
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      {/* Background orbs */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-radial from-primary/15 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gradient-radial from-accent/15 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 testimonial-header opacity-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/30 mb-4">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-xs font-medium text-muted-foreground">Loved by 50,000+ creators</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Trusted by <span className="gradient-text text-glow">Creative Professionals</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg px-4">
            Join thousands of creators, marketers, and businesses transforming their content with AI.
          </p>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div className="testimonial-card glass rounded-2xl p-6 border border-primary/20 relative overflow-hidden">
            <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/40 ring-offset-2 ring-offset-background">
                <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-base">{testimonials[currentIndex].name}</h3>
                  <BadgeCheck className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
                <p className="text-xs text-primary">{testimonials[currentIndex].company}</p>
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{testimonials[currentIndex].content}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-xs font-medium text-primary">{testimonials[currentIndex].highlight}</span>
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-6">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)} 
              className="rounded-full border-primary/30 hover:border-primary hover:bg-primary/10"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)} 
              className="rounded-full border-primary/30 hover:border-primary hover:bg-primary/10"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Desktop grid */}
        <div className="testimonials-grid hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="testimonial-card opacity-0 glass rounded-2xl p-6 lg:p-8 border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow relative overflow-hidden group"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/40 ring-offset-2 ring-offset-background">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <BadgeCheck className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-primary">{testimonial.company}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">{testimonial.content}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-xs font-medium text-primary">{testimonial.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
