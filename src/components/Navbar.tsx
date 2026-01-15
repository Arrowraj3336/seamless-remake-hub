import { useState, useEffect, useRef } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

interface NavbarProps {
  isOverVideo?: boolean;
}

const Navbar = ({ isOverVideo = false }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Consider "over video" when within the first viewport height
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
    { label: 'Models', href: '#models' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Resources', href: '#resources' },
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
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left side - Hamburger Menu */}
          <button
            className="p-2 rounded-xl hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Center - Logo and Name */}
          <a href="/" className="flex items-center gap-2.5 group absolute left-1/2 -translate-x-1/2">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-cyber-magenta flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/30">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Sparkles className="w-5 h-5 text-white relative z-10" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-heading font-bold text-lg sm:text-xl tracking-tight">SPECTORIA</span>
          </a>

          {/* Right side - Login and Signup */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-300 font-medium text-sm"
            >
              Log in
            </Button>
            <Button 
              size="sm" 
              className="hidden sm:flex btn-futuristic bg-gradient-to-r from-primary via-accent to-cyber-magenta text-white border-0 rounded-full px-5 shadow-glow hover:shadow-glow-intense font-medium text-sm"
            >
              Sign up
            </Button>
          </div>
        </div>

        {/* Mobile/Desktop Menu */}
        {isMobileMenuOpen && (
          <div className="py-6 border-t border-border/30 glass animate-fade-in rounded-b-2xl">
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
              <div className="flex flex-col gap-3 pt-4 mt-4 border-t border-border/30 px-4 sm:hidden">
                <Button className="bg-gradient-to-r from-primary via-accent to-cyber-magenta text-white rounded-full w-full font-medium shadow-glow">
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
