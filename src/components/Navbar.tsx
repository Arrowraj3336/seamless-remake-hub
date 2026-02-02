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
            ? 'bg-black/70 backdrop-blur-xl shadow-2xl shadow-violet-500/10 border border-white/10' 
            : 'bg-black/40 backdrop-blur-lg border border-white/5'
        }`}
      >
        {/* Subtle animated gradient border */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className={`absolute inset-0 transition-opacity duration-700 ${isScrolled ? 'opacity-100' : 'opacity-50'}`}>
            <div className="absolute inset-[-1px] bg-gradient-to-r from-violet-500/20 via-transparent to-pink-500/20 rounded-2xl" />
            <div className="absolute inset-[1px] bg-black/80 rounded-2xl" />
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative">
          <div className="flex items-center justify-between h-12 md:h-14">
            {/* Left side - Logo and Name */}
            <a href="/" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 md:w-9 md:h-9 overflow-hidden group-hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-violet-500/30 rounded-lg blur-lg group-hover:bg-violet-500/50 transition-all duration-300" />
                <img 
                  src={logo} 
                  alt="Spectoria Logo" 
                  className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]"
                />
              </div>
              <span className="font-heading font-bold text-sm md:text-base tracking-wide text-white/90 group-hover:text-white transition-colors duration-300">
                SPECTORIA
              </span>
            </a>

            {/* Right side - Desktop Navigation Menu */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative px-3.5 py-2 text-white/50 hover:text-white transition-all duration-300 font-medium text-[11px] uppercase tracking-[0.15em] group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Underline effect */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-violet-400 to-pink-400 group-hover:w-2/3 transition-all duration-300" />
                </a>
              ))}
              
              {/* CTA Button - Minimal elegant style */}
              <a 
                href="#pricing"
                className="ml-3 px-4 py-1.5 bg-white/10 hover:bg-white/15 text-white font-medium text-[11px] uppercase tracking-wider rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Hamburger Menu - Minimal style */}
            <button
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 md:hidden active:scale-95"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} className="text-white/70" />
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
          className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-black/95 backdrop-blur-xl z-[70] shadow-2xl shadow-black/70 border-l border-white/10"
          style={{ transform: 'translateX(100%)' }}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Spectoria" className="w-7 h-7 object-contain" />
              <span className="font-heading font-bold text-base text-white/90">
                SPECTORIA
              </span>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 active:scale-95"
              aria-label="Close menu"
            >
              <X size={18} className="text-white/70" />
            </button>
          </div>

          {/* Menu Links */}
          <div className="p-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className="mobile-nav-item flex items-center justify-between p-3.5 rounded-lg bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-300 group active:scale-[0.98]"
              >
                <span className="font-medium text-white/70 group-hover:text-white transition-colors text-sm">
                  {link.label}
                </span>
                <ChevronRight size={16} className="text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-black/80 backdrop-blur-sm">
            <a
              href="#pricing"
              onClick={closeMobileMenu}
              className="mobile-nav-item flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-medium uppercase tracking-wider rounded-lg text-sm hover:shadow-lg hover:shadow-violet-500/20 transition-all duration-300 active:scale-[0.98]"
            >
              Get Started Free
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
