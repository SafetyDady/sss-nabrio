import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import Solution from './sections/Solution';
import Reva from './sections/Reva';
import Nara from './sections/Nara';
import Connectivity from './sections/Connectivity';
import UseCases from './sections/UseCases';
import Testimonials from './sections/Testimonials';
import CTA from './sections/CTA';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Simple scroll reveal animations only
    // No pin, no snap - free scroll for both desktop and mobile
    
    ScrollTrigger.defaults({
      toggleActions: 'play none none none',
    });
    
    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative bg-[#070A12] min-h-screen overflow-x-hidden">
      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] noise-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content - All sections centered */}
      <main className="relative w-full mx-auto">
        <Hero />
        <Problem />
        <Solution />
        <div id="products">
          <Reva />
          <Nara />
        </div>
        <Connectivity />
        <div id="usecases">
          <UseCases />
        </div>
        <Testimonials />
        <CTA />
        <div id="contact">
          <Contact />
        </div>
      </main>
    </div>
  );
}

export default App;
