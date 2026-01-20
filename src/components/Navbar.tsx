import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import logo from '@/assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  // Animate mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Animate overlay
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      
      // Animate menu slide in
      gsap.fromTo(
        mobileMenuRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      );
      
      // Stagger animate menu items
      gsap.fromTo(
        '.mobile-nav-item',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.08, delay: 0.2, ease: 'power2.out' }
      );
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    gsap.to(mobileMenuRef.current, {
      x: '100%',
      duration: 0.3,
      ease: 'power3.in',
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => setIsMobileMenuOpen(false),
    });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Models', href: '#models' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 rounded-2xl ${
          isScrolled 
            ? 'glass-strong shadow-lg shadow-primary/10 border border-primary/20' 
            : 'bg-gradient-to-r from-background/60 via-background/40 to-background/60 backdrop-blur-md border border-white/10'
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
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Left side - Logo and Name */}
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 md:w-10 md:h-10 overflow-hidden group-hover:scale-110 transition-all duration-300">
                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-lg group-hover:bg-primary/40 transition-all duration-300" />
                <img 
                  src={logo} 
                  alt="Spectoria Logo" 
                  className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                />
              </div>
              <span className="font-heading font-bold text-base md:text-lg tracking-tight bg-gradient-to-r from-foreground via-foreground to-primary/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-accent transition-all duration-300">
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
              
              {/* CTA Button */}
              <a 
                href="#pricing"
                className="ml-4 px-5 py-2 bg-gradient-to-r from-primary to-accent text-white font-semibold text-xs uppercase tracking-wider rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              className="p-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 transition-all duration-300 md:hidden group active:scale-95"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} className="text-primary" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] opacity-0"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Slide-in Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-background/95 backdrop-blur-xl z-[70] shadow-2xl shadow-black/50 border-l border-primary/20"
          style={{ transform: 'translateX(100%)' }}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-5 border-b border-primary/10">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Spectoria" className="w-8 h-8 object-contain" />
              <span className="font-heading font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                SPECTORIA
              </span>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-all duration-300 active:scale-95"
              aria-label="Close menu"
            >
              <X size={20} className="text-primary" />
            </button>
          </div>

          {/* Menu Links */}
          <div className="p-5 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className="mobile-nav-item flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/15 border border-transparent hover:border-primary/20 transition-all duration-300 group active:scale-[0.98]"
              >
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {link.label}
                </span>
                <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-primary/10 bg-background/80 backdrop-blur-sm">
            <a
              href="#pricing"
              onClick={closeMobileMenu}
              className="mobile-nav-item flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold uppercase tracking-wider rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 active:scale-[0.98]"
            >
              Get Started Free
              <ChevronRight size={18} />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
