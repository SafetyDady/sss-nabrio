import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 lg:py-40 z-[90]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/cta_corridor_bg.jpg"
          alt="Futuristic corridor"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 vignette-overlay" />
        <div className="absolute inset-0 bg-[rgba(7,10,18,0.6)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div ref={contentRef}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F6FF] mb-4 md:mb-6">
            Ready to automate what matters?
          </h2>
          <p className="text-base sm:text-lg text-[#A7B1D8] max-w-2xl mx-auto mb-6 md:mb-8">
            Get a demo tailored to your line, your devices, and your targets.
          </p>

          <Button
            size="lg"
            className="bg-[#4F6DFF] hover:bg-[#3d5ce6] text-white px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 text-sm sm:text-base md:text-lg font-medium rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-[rgba(79,109,255,0.3)]"
          >
            Request a demo
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
