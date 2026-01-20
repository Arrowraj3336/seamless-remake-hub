import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import logo from '@/assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
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
      document.body.style.overflow = 'hidden';
      
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      
      gsap.fromTo(
        mobileMenuRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      );
      
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
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Features', href: '#features', id: 'features' },
    { label: 'Models', href: '#models', id: 'models' },
    { label: 'Pricing', href: '#pricing', id: 'pricing' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${
          isScrolled 
            ? 'w-[calc(100%-2rem)] max-w-5xl' 
            : 'w-[calc(100%-2rem)] max-w-6xl'
        }`}
      >
        {/* Main navbar container */}
        <div className={`relative rounded-2xl transition-all duration-500 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-2xl shadow-2xl shadow-primary/5' 
            : 'bg-background/40 backdrop-blur-xl'
        }`}>
          
          {/* Animated border glow */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 opacity-60" />
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse opacity-40" style={{ animationDuration: '3s' }} />
          
          {/* Inner container */}
          <div className="relative bg-background/60 backdrop-blur-xl rounded-2xl border border-white/5">
            <div className="px-4 md:px-6 lg:px-8">
              <div className="flex items-center justify-between h-14 md:h-16">
                
                {/* Left - Logo & Brand */}
                <a href="/" className="flex items-center gap-3 group">
                  {/* Logo with glow effect */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 rounded-xl blur-xl group-hover:bg-primary/50 transition-all duration-500" />
                    <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 p-1.5 group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src={logo} 
                        alt="Spectoria" 
                        className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                      />
                    </div>
                  </div>
                  
                  {/* Brand name with gradient */}
                  <div className="hidden sm:flex flex-col">
                    <span className="font-heading font-bold text-base md:text-lg tracking-tight bg-gradient-to-r from-white via-white to-primary/80 bg-clip-text text-transparent">
                      SPECTORIA
                    </span>
                    <span className="text-[10px] text-muted-foreground/60 tracking-[0.2em] uppercase -mt-0.5">
                      AI Video Studio
                    </span>
                  </div>
                </a>

                {/* Center - Navigation Links (Desktop) */}
                <div className="hidden md:flex items-center">
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.02] border border-white/5">
                    {navLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.href}
                        onClick={() => setActiveLink(link.id)}
                        className={`relative px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 group ${
                          activeLink === link.id 
                            ? 'text-white' 
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {/* Active background */}
                        {activeLink === link.id && (
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-primary/30 to-accent/20 border border-primary/20" />
                        )}
                        
                        {/* Hover glow */}
                        <div className="absolute inset-0 rounded-lg bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                        
                        <span className="relative z-10">{link.label}</span>
                        
                        {/* Active indicator dot */}
                        {activeLink === link.id && (
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_6px_2px_rgba(168,85,247,0.6)]" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Right - CTA & Actions */}
                <div className="hidden md:flex items-center gap-3">
                  {/* Contact link */}
                  <a 
                    href="#contact"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 px-3 py-2"
                  >
                    Contact
                  </a>
                  
                  {/* CTA Button */}
                  <a 
                    href="#pricing"
                    className="group relative px-5 py-2.5 rounded-xl overflow-hidden"
                  >
                    {/* Button gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-shimmer" style={{ animationDuration: '3s' }} />
                    
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    
                    {/* Content */}
                    <div className="relative flex items-center gap-2 text-white font-semibold text-sm tracking-wide">
                      <Sparkles size={14} className="opacity-80" />
                      <span>Start Free</span>
                    </div>
                    
                    {/* Hover shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                  className="relative p-2.5 rounded-xl md:hidden group active:scale-95 transition-transform"
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label="Open menu"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 group-hover:border-primary/40 transition-colors" />
                  <Menu size={20} className="relative text-primary" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] opacity-0"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Slide-in Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-background/95 backdrop-blur-2xl z-[70] shadow-2xl shadow-black/50 border-l border-primary/10"
          style={{ transform: 'translateX(100%)' }}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 p-1.5">
                <img src={logo} alt="Spectoria" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-base bg-gradient-to-r from-white to-primary/80 bg-clip-text text-transparent">
                  SPECTORIA
                </span>
                <span className="text-[9px] text-muted-foreground/60 tracking-[0.15em] uppercase">
                  AI Video Studio
                </span>
              </div>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 active:scale-95"
              aria-label="Close menu"
            >
              <X size={20} className="text-foreground" />
            </button>
          </div>

          {/* Menu Links */}
          <div className="p-5 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={closeMobileMenu}
                className="mobile-nav-item flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/[0.02] to-transparent hover:from-primary/10 border border-transparent hover:border-primary/20 transition-all duration-300 group active:scale-[0.98]"
              >
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {link.label}
                </span>
                <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-white/5 bg-background/80 backdrop-blur-sm">
            <a
              href="#pricing"
              onClick={closeMobileMenu}
              className="mobile-nav-item flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold uppercase tracking-wider rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 active:scale-[0.98]"
            >
              <Sparkles size={16} />
              Start Free
              <ChevronRight size={18} />
            </a>
          </div>
        </div>
      )}

      {/* Add shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;
