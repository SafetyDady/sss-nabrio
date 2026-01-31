import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Products', href: '#products' },
  { label: 'Use Cases', href: '#usecases' },
  { label: 'Partner', href: '#partner' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          isScrolled
            ? 'bg-[rgba(7,10,18,0.95)] backdrop-blur-lg border-b border-[rgba(167,177,216,0.1)]'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-[7vw] py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="text-xl font-bold text-[#F4F6FF]">
              Nabrio
            </a>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-medium text-[#4F6DFF] bg-[rgba(79,109,255,0.15)] rounded border border-[rgba(79,109,255,0.3)]">
              by SSS
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-[#A7B1D8] hover:text-[#F4F6FF] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button
              variant="outline"
              size="sm"
              className="border-[rgba(79,109,255,0.5)] text-[#4F6DFF] hover:bg-[rgba(79,109,255,0.1)] rounded-lg"
            >
              Request a demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#F4F6FF]"
            style={{ minHeight: '44px', minWidth: '44px' }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[999] bg-[#070A12] transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 pt-20">
          <div className="text-center mb-4">
            <span className="text-2xl font-bold text-[#F4F6FF]">Nabrio</span>
            <p className="text-xs text-[#A7B1D8] mt-1">by SSS Intelligence & Solutions</p>
          </div>
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-2xl text-[#F4F6FF] hover:text-[#4F6DFF] transition-colors py-3"
              style={{ minHeight: '44px' }}
            >
              {link.label}
            </button>
          ))}
          <Button size="lg" className="mt-6 bg-[#4F6DFF] hover:bg-[#3d5ce6] text-white px-8 py-6 text-lg">
            Request a demo
          </Button>
        </div>
      </div>
    </>
  );
}
