import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';
import { useIsMobile } from '@/hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'We went from first model to production line in three weeks.',
    attribution: 'Engineering Lead',
    company: 'Automotive Tier-1 Supplier',
  },
  {
    quote: 'The edge latency is consistent—exactly what our line requires.',
    attribution: 'Plant Manager',
    company: 'Electronics Manufacturing',
  },
  {
    quote: 'We kept our data on-prem without losing speed.',
    attribution: 'IT Director',
    company: 'Food Processing',
  },
];

export default function Testimonials() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headlineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(card,
            { y: 50, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.6,
              delay: i * 0.15,
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none',
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 lg:py-32 z-[80] bg-[#070A12]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F6FF] mb-3 md:mb-4">
            Built for teams who ship.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#A7B1D8]">
            See what our customers have to say.
          </p>
        </div>

        {/* Testimonial Cards - Separate Layout for Mobile/Desktop */}
        {isMobile ? (
          // Mobile Layout: Vertical Stack
          <div className="space-y-4 mb-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                ref={el => { cardsRef.current[i] = el; }}
                className="glass-card p-4 hover:border-[rgba(79,109,255,0.3)] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-[rgba(79,109,255,0.15)] flex items-center justify-center mb-3">
                  <Quote className="w-4 h-4 text-[#4F6DFF]" />
                </div>

                <blockquote className="text-sm text-[#F4F6FF] leading-relaxed mb-3">
                  "{testimonial.quote}"
                </blockquote>

                <div className="pt-3 border-t border-[rgba(167,177,216,0.1)]">
                  <p className="text-xs font-medium text-[#F4F6FF]">
                    {testimonial.attribution}
                  </p>
                  <p className="text-[11px] text-[#A7B1D8]">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop Layout: 3 Column Grid
          <div className="grid grid-cols-3 gap-6 mb-12">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                ref={el => { cardsRef.current[i] = el; }}
                className="glass-card p-6 lg:p-8 hover:border-[rgba(79,109,255,0.3)] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[rgba(79,109,255,0.15)] flex items-center justify-center mb-6">
                  <Quote className="w-5 h-5 text-[#4F6DFF]" />
                </div>

                <blockquote className="text-base lg:text-lg text-[#F4F6FF] leading-relaxed mb-6">
                  "{testimonial.quote}"
                </blockquote>

                <div className="pt-6 border-t border-[rgba(167,177,216,0.1)]">
                  <p className="text-sm font-medium text-[#F4F6FF]">
                    {testimonial.attribution}
                  </p>
                  <p className="text-xs text-[#A7B1D8]">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trust badges */}
        <div className="mt-12 md:mt-16 flex flex-wrap justify-center items-center gap-6 md:gap-8 opacity-60">
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-[#F4F6FF]">50+</div>
            <div className="text-xs text-[#A7B1D8] uppercase tracking-[0.14em]">Deployments</div>
          </div>
          <div className="w-px h-10 bg-[rgba(167,177,216,0.2)]" />
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-[#F4F6FF]">3</div>
            <div className="text-xs text-[#A7B1D8] uppercase tracking-[0.14em]">Countries</div>
          </div>
          <div className="w-px h-10 bg-[rgba(167,177,216,0.2)]" />
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-[#F4F6FF]">99.9%</div>
            <div className="text-xs text-[#A7B1D8] uppercase tracking-[0.14em]">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
}
