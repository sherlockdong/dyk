import Link from 'next/link';

const footerLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/images', label: 'Images' },
  { href: '/stories', label: 'Stories' },
  { href: '/books', label: 'Books' },
];

const socialLinks = [
  { href: 'https://www.instagram.com/sherlock.dong/', iconClass: 'fab fa-instagram', label: 'Instagram' },
  { href: 'https://github.com/sherlockdong', iconClass: 'fab fa-github', label: 'GitHub' },
  { href: 'mailto:sherlockdong2007@gmail.com', iconClass: 'fas fa-envelope', label: 'Email' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-background/50 backdrop-blur-sm py-12 mt-20">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Main Grid Structure */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 pb-8 border-b border-border/20">
          
          {/* Column 1: Core Navigation Links */}
          <div className="flex flex-col gap-3">
            <span className="font-heading text-sm font-semibold tracking-wider text-foreground uppercase opacity-80">
              Sitemap
            </span>
            <ul className="flex flex-col gap-2 font-mono text-xs text-muted-foreground">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Repository Updates Link */}
          <div className="flex flex-col gap-3">
            <span className="font-heading text-sm font-semibold tracking-wider text-foreground uppercase opacity-80">
              Development
            </span>
            <div className="font-mono text-xs text-muted-foreground">
              <Link 
                href="https://github.com/sherlockdong/dyk" 
                target="_blank" 
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <span>Recent Updates</span>
                <i className="fas fa-external-link-alt text-[10px] opacity-60" />
              </Link>
            </div>
          </div>

          {/* Column 3: Social Connectivity Handles */}
          <div className="flex flex-col gap-3 sm:items-end">
            <span className="font-heading text-sm font-semibold tracking-wider text-foreground uppercase opacity-80">
              Connect
            </span>
            <div className="flex gap-4 text-xl text-muted-foreground">
              {socialLinks.map((social) => (
                <Link 
                  key={social.href}
                  href={social.href} 
                  target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                  className="transition-all hover:text-foreground hover:scale-110 active:scale-95"
                  aria-label={social.label}
                >
                  <i className={social.iconClass} />
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Lower Meta Copyright Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 font-mono text-[11px] text-muted-foreground/70">
          <p>&copy; {currentYear} Sherlock Dong. All Rights Reserved.</p>
          <p className="tracking-wide">Designed & Engineered in Next.js</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;