import { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import gsap from 'gsap';
import heroVideo1 from '@/assets/hero-video-1.mp4';
import heroVideo2 from '@/assets/hero-video-2.mp4';
import featureVideo from '@/assets/feature-video.mp4';
import aiDemoVideo from '@/assets/ai-demo-video.mp4';
import heroVideoNew from '@/assets/hero-video-new.mp4';

interface PromptData {
  prompt: string;
  video: string;
}

const prompts: PromptData[] = [
  { prompt: "A cinematic shot of a woman walking through a neon-lit city at night", video: heroVideo1 },
  { prompt: "Create a stunning product showcase with dynamic lighting effects", video: heroVideo2 },
  { prompt: "An epic drone shot flying over misty mountains at sunrise", video: featureVideo },
  { prompt: "A futuristic AI robot dancing in a virtual reality world", video: aiDemoVideo },
  { prompt: "Slow motion water droplets creating ripples in golden light", video: heroVideoNew },
  { prompt: "A fashion model in haute couture on a dramatic runway", video: heroVideo1 },
];

const PromptShowcase = () => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const starButtonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  // Typing animation effect
  useEffect(() => {
    const currentPrompt = prompts[currentPromptIndex].prompt;
    let charIndex = 0;
    setDisplayedText('');
    setIsTyping(true);
    setShowVideo(false);

    const typingInterval = setInterval(() => {
      if (charIndex < currentPrompt.length) {
        setDisplayedText(currentPrompt.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        
        // Spin the star button when typing completes
        if (starButtonRef.current) {
          gsap.to(starButtonRef.current, {
            rotation: '+=1440', // 4 full rotations
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
              // Show video after spinning
              setShowVideo(true);
              
              // Animate video appearance
              if (videoRef.current) {
                gsap.fromTo(videoRef.current, 
                  { opacity: 0, scale: 0.9, y: 20 },
                  { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power3.out' }
                );
              }
            }
          });
        }
      }
    }, 50); // Typing speed

    return () => clearInterval(typingInterval);
  }, [currentPromptIndex]);

  // Video display timer and cycle to next prompt
  useEffect(() => {
    if (showVideo) {
      const videoDisplayTimer = setTimeout(() => {
        // Fade out video
        if (videoRef.current) {
          gsap.to(videoRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
              setShowVideo(false);
              // Move to next prompt
              setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
            }
          });
        }
      }, 4000); // Show video for 4 seconds

      return () => clearTimeout(videoDisplayTimer);
    }
  }, [showVideo]);

  // Initial animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto mt-8 mb-6 opacity-0">
      {/* Input Container */}
      <div 
        ref={inputRef}
        className="relative flex items-center gap-3 px-5 py-4 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg shadow-primary/5"
      >
        {/* Text Input Display */}
        <div className="flex-1 min-h-[24px] text-left">
          <span className="text-foreground/90 text-sm md:text-base">
            {displayedText}
          </span>
          {isTyping && (
            <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 animate-pulse" />
          )}
          {!displayedText && (
            <span className="text-muted-foreground/50 text-sm md:text-base">
              Type in your idea or paste your script here...
            </span>
          )}
        </div>

        {/* Star Button */}
        <button
          ref={starButtonRef}
          className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border border-primary/20 flex items-center justify-center hover:border-primary/40 transition-all duration-300 group"
        >
          <Sparkles className="w-5 h-5 text-primary group-hover:text-accent transition-colors duration-300" />
        </button>
      </div>

      {/* Quick Action Tags */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        {[
          { icon: '📱', label: 'Create an ad' },
          { icon: '🚀', label: 'Create a promo video' },
          { icon: '💡', label: 'Create a tutorial' },
          { icon: '✨', label: 'Create an AI Clip' },
        ].map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/30 text-xs text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all duration-300 cursor-pointer"
          >
            <span>{tag.icon}</span>
            <span>{tag.label}</span>
          </div>
        ))}
      </div>

      {/* Generated Video Display */}
      <div 
        ref={videoRef}
        className={`mt-6 rounded-2xl overflow-hidden transition-all duration-500 ${showVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ height: showVideo ? 'auto' : 0 }}
      >
        {showVideo && (
          <div className="relative aspect-video rounded-2xl overflow-hidden gradient-border glow-effect">
            <video
              key={prompts[currentPromptIndex].video}
              src={prompts[currentPromptIndex].video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div className="px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-xs text-foreground border border-primary/20">
                ✨ AI Generated
              </div>
              <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-xs text-white font-medium">
                SPECTORIA AI
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptShowcase;
