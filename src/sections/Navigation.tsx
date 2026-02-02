import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Products', href: '#products' },
  { label: 'Use Cases', href: '#usecases' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        isScrolled
          ? 'bg-[rgba(7,10,18,0.95)] backdrop-blur-lg border-b border-[rgba(167,177,216,0.1)]'
          : 'bg-transparent'
      }`}
    >
      {/* Desktop & Tablet Layout */}
      <div className="hidden sm:flex items-center justify-between px-6 lg:px-[7vw] py-3 lg:py-4">
        {/* Logo with Partner Badge */}
        <div className="flex items-center gap-3">
          <a href="#" className="text-lg lg:text-xl font-bold text-[#F4F6FF]">
            Nabrio
          </a>
          <span className="text-lg lg:text-xl font-bold text-[#4F6DFF]">SSS Group</span>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-4 lg:gap-8">
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

        {/* Empty div for balance */}
        <div className="w-[100px]"></div>
      </div>

      {/* Mobile Layout - แสดงเมนูเป็นตัวหนังสือเลย */}
      <div className="sm:hidden">
        {/* Top Row: Logo */}
        <div className="flex items-center justify-center px-4 py-2">
          <div className="flex items-center gap-2">
            <a href="#" className="text-base font-bold text-[#F4F6FF]">
              Nabrio
            </a>
            <span className="text-base font-bold text-[#4F6DFF]">SSS Group</span>
          </div>
        </div>
        
        {/* Bottom Row: Nav Links - แสดงทุกเมนูเลย */}
        <div className="flex items-center justify-center gap-1 px-2 pb-2 overflow-x-auto">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-xs text-[#A7B1D8] hover:text-[#F4F6FF] active:text-[#4F6DFF] transition-colors px-3 py-2 whitespace-nowrap rounded-lg hover:bg-[rgba(79,109,255,0.1)] active:bg-[rgba(79,109,255,0.15)]"
              style={{ minHeight: '36px' }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
