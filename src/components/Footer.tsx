import { Twitter, Linkedin, Instagram, Youtube, Mail, Sparkles } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Models: ['Seedance AI', 'Runway AI', 'Veo 3.1', 'Kling AI', 'Neo Banana'],
    Resources: ['Documentation', 'Tutorials', 'Blog', 'Community', 'Support'],
    Company: ['About', 'Careers', 'Press', 'Contact', 'Partners'],
    Legal: ['Privacy', 'Terms', 'Cookie Policy', 'Licenses'],
  };

  const socialLinks = [
    { icon: <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />, href: '#' },
    { icon: <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />, href: '#' },
    { icon: <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />, href: '#' },
    { icon: <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />, href: '#' },
  ];

  return (
    <footer className="py-12 sm:py-16 md:py-20 border-t border-primary/20 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10 sm:mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-cyber-magenta flex items-center justify-center">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-base sm:text-lg tracking-wider">SPECTORIA</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-6 max-w-xs">Generate stunning AI videos with Seedance, Runway, Veo 3.1, Kling, and Neo Banana models.</p>
            <div className="flex items-center gap-3 sm:gap-4">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-glow transition-all duration-300">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{title}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {links.map((link) => (<li key={link}><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">{link}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div className="py-6 sm:py-8 border-t border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3"><Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" /><span className="text-xs sm:text-sm">Subscribe for updates on new AI models</span></div>
            <div className="flex gap-2 w-full md:w-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 md:w-48 lg:w-64 px-4 py-2 rounded-full glass border border-primary/20 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
              <button className="px-4 sm:px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-full text-xs sm:text-sm font-medium hover:shadow-glow transition-all duration-300">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="pt-6 sm:pt-8 border-t border-primary/20 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">© {new Date().getFullYear()} SPECTORIA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
