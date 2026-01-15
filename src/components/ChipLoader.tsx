import { useEffect, useState } from 'react';

interface ChipLoaderProps {
  onLoadingComplete: () => void;
  duration?: number;
}

const ChipLoader = ({ onLoadingComplete, duration = 2000 }: ChipLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadingComplete, 500); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onLoadingComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <svg viewBox="0 0 200 200" className="w-48 h-48 md:w-64 md:h-64">
        {/* Circuit Paths */}
        <g className="circuit-paths" stroke="#1a1a2e" strokeWidth="2" fill="none">
          <path d="M40 100 L10 100" strokeDasharray="30" strokeDashoffset="30">
            <animate attributeName="stroke-dashoffset" from="30" to="0" dur="1s" repeatCount="indefinite" />
          </path>
          <path d="M160 100 L190 100" strokeDasharray="30" strokeDashoffset="30">
            <animate attributeName="stroke-dashoffset" from="30" to="0" dur="1s" repeatCount="indefinite" />
          </path>
        </g>

        <g className="circuit-paths" stroke="#16213e" strokeWidth="2" fill="none">
          <path d="M100 40 L100 10" strokeDasharray="30" strokeDashoffset="30">
            <animate attributeName="stroke-dashoffset" from="30" to="0" dur="1s" repeatCount="indefinite" />
          </path>
          <path d="M100 160 L100 190" strokeDasharray="30" strokeDashoffset="30">
            <animate attributeName="stroke-dashoffset" from="30" to="0" dur="1s" repeatCount="indefinite" />
          </path>
        </g>

        <g className="circuit-paths" stroke="#0f3460" strokeWidth="2" fill="none">
          <path d="M55 55 L30 30" strokeDasharray="35" strokeDashoffset="35">
            <animate attributeName="stroke-dashoffset" from="35" to="0" dur="1s" repeatCount="indefinite" />
          </path>
          <path d="M145 55 L170 30" strokeDasharray="35" strokeDashoffset="35">
            <animate attributeName="stroke-dashoffset" from="35" to="0" dur="1s" repeatCount="indefinite" />
          </path>
          <path d="M55 145 L30 170" strokeDasharray="35" strokeDashoffset="35">
            <animate attributeName="stroke-dashoffset" from="35" to="0" dur="1s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Main Chip Body */}
        <rect 
          x="40" y="40" 
          width="120" height="120" 
          rx="20" ry="20"
          fill="url(#chipGradient)" 
          stroke="#333" 
          strokeWidth="2"
          className="chip-body"
        />

        {/* Inner Circuit Pattern */}
        <g stroke="#00ff9d" strokeWidth="1" fill="none" opacity="0.6">
          <rect x="60" y="60" width="80" height="80" rx="10">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
          </rect>
          <rect x="75" y="75" width="50" height="50" rx="5">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
          </rect>
        </g>

        {/* Center Core */}
        <circle cx="100" cy="100" r="15" fill="url(#coreGradient)">
          <animate attributeName="r" values="12;18;12" dur="1s" repeatCount="indefinite" />
        </circle>

        {/* Pins - Left */}
        <g className="pins-left">
          <line x1="40" y1="60" x2="25" y2="60" className="chip-pin" stroke="#444" strokeWidth="3" />
          <line x1="40" y1="80" x2="25" y2="80" className="chip-pin" stroke="#444" strokeWidth="3" />
          <line x1="40" y1="100" x2="25" y2="100" className="chip-pin" stroke="#444" strokeWidth="3" />
          <line x1="40" y1="120" x2="25" y2="120" className="chip-pin" stroke="#444" strokeWidth="3" />
          <line x1="40" y1="140" x2="25" y2="140" className="chip-pin" stroke="#444" strokeWidth="3" />
        </g>

        {/* Pins - Right */}
        <g className="pins-right">
          <line x1="160" y1="60" x2="175" y2="60" className="chip-pin" stroke="#444" strokeWidth="3" />
          <line x1="160" y1="80" x2="175" y2="80" className="chip-pin" stroke="#444" strokeWidth="3" />
          <line x1="160" y1="100" x2="175" y2="100" className="chip-pin" stroke="#444" strokeWidth="3" />
          <line x1="160" y1="120" x2="175" y2="120" className="chip-pin" stroke="#444" strokeWidth="3" />
          <line x1="160" y1="140" x2="175" y2="140" className="chip-pin" stroke="#444" strokeWidth="3" />
        </g>

        {/* Pins - Top */}
        <g className="pins-top">
          <line x1="60" y1="40" x2="60" y2="25" className="chip-pin" stroke="#444" strokeWidth="3" />
          <line x1="80" y1="40" x2="80" y2="25" className="chip-pin" stroke="#444" strokeWidth="3" />
          <line x1="100" y1="40" x2="100" y2="25" className="chip-pin" stroke="#444" strokeWidth="3" />
          <line x1="120" y1="40" x2="120" y2="25" className="chip-pin" stroke="#444" strokeWidth="3" />
          <line x1="140" y1="40" x2="140" y2="25" className="chip-pin" stroke="#444" strokeWidth="3" />
        </g>

        {/* Pins - Bottom */}
        <g className="pins-bottom">
          <line x1="60" y1="160" x2="60" y2="175" className="chip-pin" stroke="#444" strokeWidth="3" />
          <line x1="80" y1="160" x2="80" y2="175" className="chip-pin" stroke="#444" strokeWidth="3" />
          <line x1="100" y1="160" x2="100" y2="175" className="chip-pin" stroke="#444" strokeWidth="3" />
          <line x1="120" y1="160" x2="120" y2="175" className="chip-pin" stroke="#444" strokeWidth="3" />
          <line x1="140" y1="160" x2="140" y2="175" className="chip-pin" stroke="#444" strokeWidth="3" />
        </g>

        {/* Gradients */}
        <defs>
          <linearGradient id="chipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="50%" stopColor="#16213e" />
            <stop offset="100%" stopColor="#0f3460" />
          </linearGradient>

          <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ff9d">
              <animate attributeName="stopColor" values="#00ff9d;#00d4ff;#00ff9d" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#00d4ff">
              <animate attributeName="stopColor" values="#00d4ff;#00ff9d;#00d4ff" dur="2s" repeatCount="indefinite" />
            </stop>
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Loading Text */}
        <text 
          x="100" 
          y="195" 
          textAnchor="middle" 
          fill="#00ff9d" 
          fontSize="12" 
          fontFamily="Space Grotesk, sans-serif"
          fontWeight="bold"
          letterSpacing="1px"
          className="chip-text"
        >
          Loading
        </text>

        {/* Pulse Rings */}
        <circle cx="100" cy="100" r="25" fill="none" stroke="#00ff9d" strokeWidth="1" opacity="0.5">
          <animate attributeName="r" from="25" to="60" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="100" r="25" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.5">
          <animate attributeName="r" from="25" to="60" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="100" r="25" fill="none" stroke="#ff6b6b" strokeWidth="1" opacity="0.5">
          <animate attributeName="r" from="25" to="60" dur="1.5s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="1s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
};

export default ChipLoader;
