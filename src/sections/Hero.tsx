import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Play, Camera, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const partnerRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load only
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(partnerRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      );

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(words,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.05 },
          '-=0.3'
        );
      }

      tl.fromTo(subheadlineRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.5'
      );

      tl.fromTo(ctaRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      tl.fromTo(cardRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9 },
        '-=0.7'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineWords = 'Build physical AI without writing code.'.split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden z-10"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/assets/factory-dolly-shot.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 vignette-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-start px-6 py-24 lg:py-0">
        {/* Left Content */}
        <div className="w-full lg:w-[50%] lg:pl-[7vw] text-center lg:text-left mb-10 lg:mb-0">
          {/* Partner Badge */}
          <div 
            ref={partnerRef}
            className="inline-flex items-center gap-2 px-4 py-3 bg-[rgba(79,109,255,0.15)] rounded-xl border border-[rgba(79,109,255,0.3)] mb-6"
            style={{ opacity: 0 }}
          >
            <span className="text-lg sm:text-xl lg:text-2xl text-[#A7B1D8]">
              by <span className="text-[#F4F6FF] font-semibold">SSS Intelligence & Solutions</span>
            </span>
          </div>

          <h1
            ref={headlineRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#F4F6FF] mb-6"
          >
            {headlineWords.map((word, i) => (
              <span key={i} className="word inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
          </h1>

          <p
            ref={subheadlineRef}
            className="text-base sm:text-lg text-[#A7B1D8] leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8"
            style={{ opacity: 0 }}
          >
            Train vision models, deploy to the edge, and automate decisions with an integrated AIoT platform.
          </p>

          <div ref={ctaRef} style={{ opacity: 0 }}></div>
        </div>

        {/* Right Card - Desktop only */}
        <div
          ref={cardRef}
          className="hidden lg:block lg:w-[40%] lg:pr-[5vw]"
          style={{ opacity: 0 }}
        >
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#A7B1D8]">
                Deployment preview
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-[#A7B1D8]">Live</span>
              </div>
            </div>

            <div className="h-48 rounded-[14px] overflow-hidden bg-[#0B1022] relative mb-4">
              <img
                src="/images/usecase_qc_bg.jpg"
                alt="Deployment preview"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 p-4">
                <div className="flex gap-2 mb-4">
                  <div className="px-3 py-1.5 bg-[rgba(7,10,18,0.8)] rounded-lg border border-[rgba(167,177,216,0.15)]">
                    <Camera className="w-4 h-4 text-[#4F6DFF]" />
                  </div>
                  <div className="px-3 py-1.5 bg-[rgba(7,10,18,0.8)] rounded-lg border border-[rgba(167,177,216,0.15)]">
                    <Cpu className="w-4 h-4 text-[#4F6DFF]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-[#A7B1D8]">
                Camera stream • Model v2.4
              </div>
              <Button size="sm" className="bg-[#4F6DFF] hover:bg-[#3d5ce6] text-white text-sm px-4 py-2 rounded-lg">
                Deploy to edge
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
