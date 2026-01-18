import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';
import heroVideo1 from '@/assets/hero-video-1.mp4';
import heroVideo2 from '@/assets/hero-video-2.mp4';
import collaborationVideo from '@/assets/collaboration-video.mp4';
import featureVideo from '@/assets/feature-video.mp4';
import aiDemoVideo from '@/assets/ai-demo-video.mp4';
import heroVideoNew from '@/assets/hero-video-new.mp4';

const promptsData = [
  {
    prompt: "A cinematic shot of a woman walking through a neon-lit Tokyo street at night",
    video: heroVideo1,
  },
  {
    prompt: "A majestic lion running across the African savanna during golden hour",
    video: heroVideo2,
  },
  {
    prompt: "Futuristic cityscape with flying cars and holographic billboards",
    video: collaborationVideo,
  },
  {
    prompt: "A serene underwater scene with colorful coral reefs and tropical fish",
    video: featureVideo,
  },
  {
    prompt: "Astronaut floating in space with Earth visible in the background",
    video: aiDemoVideo,
  },
  {
    prompt: "A magical forest with glowing fireflies and mystical creatures",
    video: heroVideoNew,
  },
];

const PromptShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const inputRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLButtonElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Typing animation effect
  useEffect(() => {
    const currentPrompt = promptsData[currentIndex].prompt;
    let charIndex = 0;
    setDisplayedText('');
    setShowVideo(false);
    setIsTyping(true);

    const typeNextChar = () => {
      if (charIndex < currentPrompt.length) {
        setDisplayedText(currentPrompt.slice(0, charIndex + 1));
        charIndex++;
        typingTimeoutRef.current = setTimeout(typeNextChar, 50);
      } else {
        // Typing complete - animate star and show video
        setIsTyping(false);
        animateStarAndShowVideo();
      }
    };

    typingTimeoutRef.current = setTimeout(typeNextChar, 500);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [currentIndex]);

  const animateStarAndShowVideo = () => {
    if (starRef.current) {
      // Star spin animation (3-4 rotations)
      gsap.to(starRef.current, {
        rotation: '+=1080',
        scale: 1.2,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to(starRef.current, {
            scale: 1,
            duration: 0.3,
            ease: 'back.out(1.7)',
          });
        },
      });
    }

    // Show video after star animation
    setTimeout(() => {
      setShowVideo(true);
      if (videoContainerRef.current) {
        gsap.fromTo(
          videoContainerRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
        );
      }

      // Wait for video display, then move to next prompt
      setTimeout(() => {
        if (videoContainerRef.current) {
          gsap.to(videoContainerRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
              setCurrentIndex((prev) => (prev + 1) % promptsData.length);
            },
          });
        }
      }, 4000); // Show video for 4 seconds
    }, 800);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 sm:mt-12">
      {/* Input container with star button */}
      <div className="relative">
        <div
          ref={inputRef}
          className="relative flex items-center gap-3 px-4 sm:px-6 py-4 rounded-2xl glass border border-primary/30 bg-background/50 backdrop-blur-xl shadow-lg shadow-primary/10"
        >
          {/* Prompt text display */}
          <div className="flex-1 min-h-[24px] text-sm sm:text-base text-foreground/90 font-medium">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 animate-pulse" />
            )}
          </div>

          {/* Star button */}
          <button
            ref={starRef}
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-primary via-accent to-cyber-magenta flex items-center justify-center shadow-glow transition-all duration-300 hover:shadow-glow-intense"
            style={{ transformOrigin: 'center center' }}
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </div>

        {/* Decorative glow under input */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-r from-primary/20 via-accent/30 to-primary/20 blur-xl rounded-full" />
      </div>

      {/* Video display area */}
      <div
        ref={videoContainerRef}
        className={`mt-6 sm:mt-8 transition-all duration-300 ${showVideo ? 'opacity-100' : 'opacity-0'}`}
      >
        {showVideo && (
          <div className="relative rounded-2xl overflow-hidden gradient-border glow-effect">
            <video
              key={promptsData[currentIndex].video}
              src={promptsData[currentIndex].video}
              autoPlay
              muted
              playsInline
              className="w-full aspect-video object-cover"
            />
            {/* Video overlay with prompt badge */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div className="px-3 py-1.5 rounded-full glass bg-background/60 backdrop-blur-md border border-primary/30">
                <span className="text-xs sm:text-sm font-medium text-foreground/90">
                  AI Generated Video
                </span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs sm:text-sm font-medium shadow-lg">
                <Sparkles className="w-3 h-3 inline mr-1" />
                Spectoria AI
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptShowcase;
