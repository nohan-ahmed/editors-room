import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Menu, X, Moon, Sun, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/src/context/ThemeContext';
import { cn } from '@/src/lib/utils';
import { BookCallModal } from '@/src/components/ui/BookCallModal';
import { Link, useLocation } from 'react-router-dom';
import logoIcon from '@/src/assets/images/Editors-Room logo.png';

const navItems = [
  { name: 'Services', href: '/#services' },
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Team', href: '/#team' },
  { name: 'Contact', href: '/#contact' },
];

const socialLinks = [
  { icon: Twitter, href: '#' },
  { icon: Github, href: '#' },
  { icon: Linkedin, href: '#' },
];

// ── Mobile nav item with hover/tap effect ──────────────────────────────────
interface MobileNavItemProps {
  item: { name: string; href: string };
  idx: number;
  onClick: () => void;
}

const MobileNavItem = ({ item, idx, onClick }: MobileNavItemProps) => {
  const shouldReduce = useReducedMotion();

  const variants = {
    rest:    { scale: 1,    backgroundColor: 'transparent' },
    pressed: { scale: shouldReduce ? 1 : 0.97, backgroundColor: 'color-mix(in oklch, var(--color-primary) 10%, transparent)' },
  };

  const labelVariants = {
    rest:    { x: 0,  color: 'color-mix(in oklch, var(--color-foreground) 60%, transparent)' },
    pressed: { x: 6,  color: 'var(--color-primary)' },
  };

  const arrowVariants = {
    rest:    { opacity: 0, x: -8 },
    pressed: { opacity: 1, x: 0  },
  };

  const transition = { duration: 0.18, ease: [0.16, 1, 0.3, 1] as number[] };

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 + idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        variants={variants}
        initial="rest"
        whileHover="pressed"
        whileTap="pressed"
        transition={transition}
        className="relative border-b border-foreground/5 rounded-xl overflow-hidden cursor-pointer"
      >
        <Link
          to={item.href}
          onClick={onClick}
          className="flex items-center justify-between py-4 px-3"
        >
          <motion.span
            variants={labelVariants}
            transition={transition}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
          >
            {item.name}
          </motion.span>

          <motion.span
            variants={arrowVariants}
            transition={transition}
            style={{ color: 'var(--color-primary)' }}
          >
            <ArrowRight className="w-6 h-6" />
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('/#') && location.pathname === '/') {
      const id = href.replace('/#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ── Desktop / scrolled bar ── */}
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-500',
          scrolled
            ? 'bg-background/60 backdrop-blur-xl py-3 border-b border-foreground/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group shrink-0">
            <img
              src={logoIcon}
              alt="Editors Room"
              className="h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <div className="flex items-center gap-5 border-l border-foreground/10 pl-8 ml-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-10 h-10 bg-foreground/5 border border-foreground/10 hover:bg-foreground/10"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
              >
                {theme === 'dark'
                  ? <Sun className="h-4 w-4 text-foreground" />
                  : <Moon className="h-4 w-4 text-foreground" />}
              </Button>
              <BookCallModal
                trigger={
                  <Button
                    size="sm"
                    className="rounded-full px-7 h-10 bg-foreground/10 hover:bg-foreground/20 border border-foreground/20 backdrop-blur-md text-foreground hover:scale-105 active:scale-95 shadow-lg shadow-foreground/5"
                  >
                    Get Started
                  </Button>
                }
              />
            </div>
          </div>

          {/* Mobile controls — always visible, always on top */}
          <div className="flex items-center gap-3 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-10 h-10 bg-foreground/5 border border-foreground/10"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark'
                ? <Sun className="h-4 w-4 text-foreground" />
                : <Moon className="h-4 w-4 text-foreground" />}
            </Button>
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="w-11 h-11 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground active:scale-90 transition-transform duration-150"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Full-screen mobile menu — rendered outside <nav> so it's never clipped ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-[99] lg:hidden"
          >
            {/* Solid blurred backdrop */}
            <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" />

            {/* Ambient glows */}
            <div className="absolute top-1/4 -left-24 w-72 h-72 bg-primary/15 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 -right-24 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Scrollable content — starts below the navbar bar */}
            <div className="relative h-full flex flex-col overflow-y-auto pt-24 pb-10 px-6 safe-area-inset">
              {/* Nav links */}
              <nav className="flex flex-col gap-1 mb-auto" aria-label="Mobile navigation">
                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-4 px-2">
                  Navigation
                </p>
                {navItems.map((item, idx) => (
                  <MobileNavItem
                    key={item.name}
                    item={item}
                    idx={idx}
                    onClick={() => handleNavClick(item.href)}
                  />
                ))}
              </nav>

              {/* CTA + socials */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 space-y-6"
              >
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.3em]">
                    Ready to scale?
                  </p>
                  <BookCallModal
                    trigger={
                      <Button className="w-full h-14 rounded-2xl text-base font-bold bg-gradient-to-r from-primary to-purple-600 shadow-lg shadow-primary/20 text-white gap-2">
                        Book a Call <ArrowRight className="w-4 h-4" />
                      </Button>
                    }
                  />
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-foreground/10">
                  <div className="flex items-center gap-4">
                    {socialLinks.map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary/40 transition-all duration-300"
                        aria-label={`Social link ${i + 1}`}
                      >
                        <social.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                  <p className="text-xs text-foreground/30">© 2026 Editors Room</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
