import { useEffect, useRef, useState, useCallback, memo } from 'react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';
import heroVideo1 from '@/assets/hero-video-1.mp4';
import heroVideo2 from '@/assets/hero-video-2.mp4';
import collaborationVideo from '@/assets/collaboration-video.mp4';
import featureVideo from '@/assets/feature-video.mp4';
import aiDemoVideo from '@/assets/ai-demo-video.mp4';
import heroVideoNew from '@/assets/hero-video-new.mp4';
import avatarBackground from '@/assets/avatar-background.mp4';

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

const PromptShowcase = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showPromptVideo, setShowPromptVideo] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const starRef = useRef<HTMLButtonElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const promptVideoRef = useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const typingIntervalRef = useRef<number | null>(null);
  const timeoutRefs = useRef<number[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutRefs.current.forEach(id => clearTimeout(id));
    timeoutRefs.current = [];
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
  }, []);

  const addTimeout = useCallback((callback: () => void, delay: number) => {
    const id = window.setTimeout(callback, delay);
    timeoutRefs.current.push(id);
    return id;
  }, []);

  const animateStarAndShowVideo = useCallback(() => {
    if (starRef.current) {
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

    addTimeout(() => {
      setShowPromptVideo(true);
      if (videoContainerRef.current) {
        gsap.fromTo(
          videoContainerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
      }

      // Show video for 10 seconds then move to next prompt
      addTimeout(() => {
        if (videoContainerRef.current) {
          gsap.to(videoContainerRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
              setShowPromptVideo(false);
              setCurrentIndex((prev) => (prev + 1) % promptsData.length);
            },
          });
        }
      }, 10000);
    }, 800);
  }, [addTimeout]);

  // Typing animation effect
  useEffect(() => {
    const currentPrompt = promptsData[currentIndex].prompt;
    let charIndex = 0;
    setDisplayedText('');
    setIsTyping(true);

    addTimeout(() => {
      typingIntervalRef.current = window.setInterval(() => {
        if (charIndex < currentPrompt.length) {
          setDisplayedText(currentPrompt.slice(0, charIndex + 1));
          charIndex++;
        } else {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
          setIsTyping(false);
          animateStarAndShowVideo();
        }
      }, 65); // Slightly slower typing
    }, 400);

    return clearAllTimeouts;
  }, [currentIndex, animateStarAndShowVideo, addTimeout, clearAllTimeouts]);

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 sm:mt-8">
      {/* Input container with star button */}
      <div className="relative mb-4 sm:mb-5">
        <div className="relative flex items-center gap-3 px-4 sm:px-6 py-4 rounded-2xl glass border border-primary/30 bg-background/50 backdrop-blur-xl shadow-lg shadow-primary/10">
          {/* Prompt text display */}
          <div className="flex-1 min-h-[24px] text-sm sm:text-base text-foreground/90 font-medium text-left">
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

      {/* Video display area - always visible with background video */}
      <div className="relative rounded-2xl overflow-hidden gradient-border glow-effect">
        {/* Background video - always playing */}
        <video
          ref={backgroundVideoRef}
          src={avatarBackground}
          autoPlay
          loop
          muted
          playsInline
          className={`w-full aspect-video object-cover transition-opacity duration-300 ${showPromptVideo ? 'opacity-0' : 'opacity-100'}`}
        />
        
        {/* Prompt video - overlays background when active */}
        <div
          ref={videoContainerRef}
          className={`absolute inset-0 ${showPromptVideo ? 'pointer-events-auto' : 'pointer-events-none'}`}
          style={{ opacity: showPromptVideo ? 1 : 0 }}
        >
          {showPromptVideo && (
            <video
              ref={promptVideoRef}
              key={promptsData[currentIndex].video}
              src={promptsData[currentIndex].video}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Video overlay with prompt badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="px-3 py-1.5 rounded-full glass bg-background/60 backdrop-blur-md border border-primary/30">
            <span className="text-xs sm:text-sm font-medium text-foreground/90">
              {showPromptVideo ? 'AI Generated Video' : 'Background Preview'}
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs sm:text-sm font-medium shadow-lg">
            <Sparkles className="w-3 h-3 inline mr-1" />
            Spectoria AI
          </div>
        </div>
      </div>
    </div>
  );
});

PromptShowcase.displayName = 'PromptShowcase';

export default PromptShowcase;
