import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import logo from '@/assets/logo.png';

interface NavbarProps {
  isOverVideo?: boolean;
}

const Navbar = ({ isOverVideo = false }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const videoSectionHeight = window.innerHeight;
      setIsScrolled(window.scrollY > videoSectionHeight - 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Service', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 rounded-2xl ${
        isScrolled 
          ? 'glass-strong shadow-lg shadow-primary/10 border border-primary/20' 
          : isOverVideo
            ? 'bg-gradient-to-r from-background/40 via-background/20 to-background/40 backdrop-blur-md border border-white/5'
            : 'bg-transparent'
      }`}
    >
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${isScrolled ? 'opacity-100' : ''}`}>
          <div className="absolute inset-[-1px] bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-2xl" />
          <div className="absolute inset-[1px] bg-background/90 rounded-2xl" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="flex items-center justify-between h-12 md:h-14">
          {/* Left side - Logo and Name */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 md:w-9 md:h-9 overflow-hidden group-hover:scale-110 transition-all duration-300">
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur-lg group-hover:bg-primary/40 transition-all duration-300" />
              <img 
                src={logo} 
                alt="Spectoria Logo" 
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]"
              />
            </div>
            <span className="font-heading font-bold text-sm md:text-base tracking-tight bg-gradient-to-r from-foreground via-foreground to-primary/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-accent transition-all duration-300">
              SPECTORIA
            </span>
          </a>

          {/* Right side - Desktop Navigation Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-all duration-300 font-medium text-xs uppercase tracking-widest group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="relative z-10">{link.label}</span>
                {/* Hover background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Underline effect */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-primary to-accent group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            className="p-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 transition-all duration-300 md:hidden group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={18} className="text-primary group-hover:rotate-90 transition-transform duration-300" />
            ) : (
              <Menu size={18} className="text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="py-4 border-t border-primary/10 animate-fade-in md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-all duration-300 py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-transparent font-medium text-sm uppercase tracking-wider border-l-2 border-transparent hover:border-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
