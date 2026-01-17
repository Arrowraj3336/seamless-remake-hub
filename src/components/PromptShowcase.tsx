import { useEffect, useRef, useState, useCallback, memo } from 'react';
import { Sparkles } from 'lucide-react';
import gsap from 'gsap';
import heroVideo1 from '@/assets/hero-video-1.mp4';
import heroVideo2 from '@/assets/hero-video-2.mp4';
import featureVideo from '@/assets/feature-video.mp4';
import aiDemoVideo from '@/assets/ai-demo-video.mp4';
import heroVideoNew from '@/assets/hero-video-new.mp4';
import avatarBackground from '@/assets/avatar-background.mp4';

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

// Memoized video component for better performance
const VideoPlayer = memo(({ src, isVisible, isBackground }: { src: string; isVisible: boolean; isBackground?: boolean }) => (
  <video
    src={src}
    autoPlay
    loop
    muted
    playsInline
    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}
    style={{ 
      willChange: isBackground ? 'auto' : 'opacity',
      transform: 'translateZ(0)'
    }}
  />
));

VideoPlayer.displayName = 'VideoPlayer';

const PromptShowcase = () => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showPromptVideo, setShowPromptVideo] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const starButtonRef = useRef<HTMLButtonElement>(null);
  const hasAnimatedRef = useRef(false);

  // Memoized next prompt handler
  const goToNextPrompt = useCallback(() => {
    setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const currentPrompt = prompts[currentPromptIndex].prompt;
    let charIndex = 0;
    setDisplayedText('');
    setIsTyping(true);
    setShowPromptVideo(false);

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
            rotation: '+=1440',
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
              setShowPromptVideo(true);
            }
          });
        }
      }
    }, 70); // Slower typing speed

    return () => clearInterval(typingInterval);
  }, [currentPromptIndex]);

  // Video display timer and cycle to next prompt
  useEffect(() => {
    if (showPromptVideo) {
      const videoDisplayTimer = setTimeout(() => {
        setShowPromptVideo(false);
        goToNextPrompt();
      }, 10000); // Show video for 10 seconds

      return () => clearTimeout(videoDisplayTimer);
    }
  }, [showPromptVideo, goToNextPrompt]);

  // Initial animation - run only once
  useEffect(() => {
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;
    
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto mt-8 mb-6 opacity-0">
      {/* Input Container */}
      <div 
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

      {/* Video Display - Always shows a video (background or prompt video) */}
      <div className="mt-6 rounded-2xl overflow-hidden relative aspect-[16/9] max-w-xl mx-auto gradient-border glow-effect">
        {/* Background video - always playing */}
        <VideoPlayer 
          src={avatarBackground} 
          isVisible={!showPromptVideo} 
          isBackground={true}
        />
        
        {/* Prompt video - shown when generated */}
        <VideoPlayer 
          src={prompts[currentPromptIndex].video} 
          isVisible={showPromptVideo} 
        />
        
        {/* Overlay labels */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-10">
          <div className="px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-[10px] text-foreground border border-primary/20">
            {showPromptVideo ? '✨ AI Generated' : '🎬 Preview'}
          </div>
          <div className="px-2 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-[10px] text-white font-medium">
            SPECTORIA AI
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptShowcase;
