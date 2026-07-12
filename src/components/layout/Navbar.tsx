'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'works', label: 'Works' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => setMounted(true), []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
        <button onClick={() => scrollTo('home')} className="truncate text-lg font-bold text-primary sm:text-xl shrink-0">
          FarhanR-Portfolio
        </button>

        <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={'relative rounded-full px-4 py-2 text-sm font-medium transition-colors ' + (
                activeSection === item.id
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-primary/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {mounted && <ThemeToggle />}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent/10 hover:text-accent md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border/40 md:hidden"
          >
            <div className="space-y-1 px-4 py-6">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={'w-full rounded-lg px-4 py-4 text-left text-base font-medium transition-colors ' + (
                    activeSection === item.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
