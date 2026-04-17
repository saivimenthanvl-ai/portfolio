import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';

const navItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' }
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const linkClass = isScrolled ? 'text-slate-900' : 'text-white';

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-md backdrop-blur' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`text-xl font-bold transition-opacity hover:opacity-80 ${linkClass}`}
          >
            SV
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`transition-colors hover:opacity-70 ${linkClass}`}
              >
                {item.label}
              </button>
            ))}

            <a
              href="https://github.com/saivimenthanvl-ai"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors hover:opacity-70 ${linkClass}`}
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/saivimenthanvl-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors hover:opacity-70 ${linkClass}`}
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>

          <button
            className={`md:hidden transition-colors ${linkClass}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white shadow-lg rounded-b-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col py-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-slate-900 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex items-center gap-4 px-4 py-3">
                <a
                  href="https://github.com/saivimenthanvl-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-900"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/saivimenthanvl-ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-900"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
