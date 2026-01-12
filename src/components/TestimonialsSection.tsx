import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
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
      role: 'Marketing Director at TechCorp',
      content: 'This AI platform has completely transformed how we create content. What used to take hours now takes minutes, and the quality is incredible.',
      rating: 5,
    },
    {
      image: testimonial2,
      name: 'Michael Chen',
      role: 'Creative Lead at StartupX',
      content: 'The collaboration features are game-changing. Our team can work together seamlessly, and the AI suggestions have significantly improved our output.',
      rating: 5,
    },
    {
      image: testimonial3,
      name: 'Emily Rodriguez',
      role: 'Content Creator',
      content: "I've tried many AI tools, but this one stands out. The quality of generated videos is unmatched, and the intuitive interface makes it a joy to use.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonial-header',
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

      gsap.fromTo(
        '.testimonial-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.testimonials-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 testimonial-header opacity-0">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            What Our Customers Feel{' '}
            <span className="gradient-text">About Our Services!</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. See what our customers have to say.
          </p>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden relative">
          <div className="testimonial-card bg-card rounded-2xl p-6 gradient-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{testimonials[currentIndex].name}</h3>
                <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground">{testimonials[currentIndex].content}</p>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Desktop grid */}
        <div className="testimonials-grid hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card opacity-0 bg-card rounded-2xl p-6 md:p-8 gradient-border card-hover"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
