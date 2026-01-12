import { Twitter, Linkedin, Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Models: ['Seedance AI', 'Runway AI', 'Veo 3.1', 'Kling AI', 'Neo Banana'],
    Resources: ['Documentation', 'Tutorials', 'Blog', 'Community', 'Support'],
    Company: ['About', 'Careers', 'Press', 'Contact', 'Partners'],
    Legal: ['Privacy', 'Terms', 'Cookie Policy', 'Licenses'],
  };

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: '#' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#' },
    { icon: <Instagram className="w-5 h-5" />, href: '#' },
    { icon: <Youtube className="w-5 h-5" />, href: '#' },
  ];

  return (
    <footer className="py-16 md:py-20 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Logo and description */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="font-heading font-bold text-lg">SPECTORIA</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Generate stunning AI videos with Seedance, Runway, Veo 3.1, Kling, and Neo Banana models. Start creating today.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-sm">Subscribe for updates on new AI models and features</span>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 rounded-full bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SPECTORIA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;