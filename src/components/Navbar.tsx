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
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass-strong shadow-lg shadow-primary/5' 
          : isOverVideo
            ? 'bg-black/20 backdrop-blur-sm'
            : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Left side - Logo and Name */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 overflow-hidden group-hover:scale-110 transition-transform duration-300">
              <img 
                src={logo} 
                alt="Spectoria Logo" 
                className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
              />
            </div>
            <span className="font-heading font-bold text-sm sm:text-base tracking-tight hidden sm:block">SPECTORIA</span>
          </a>

          {/* Right side - Desktop Navigation Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium text-xs uppercase tracking-wider relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            className="p-2 rounded-xl hover:bg-primary/10 transition-all duration-300 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="py-6 border-t border-border/30 glass animate-fade-in rounded-b-2xl md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors py-3 px-4 rounded-xl hover:bg-primary/10 font-medium"
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
