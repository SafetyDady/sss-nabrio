import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database, Brain, Rocket, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const flowSteps = [
  { icon: Database, label: 'Ingest & annotate', description: 'Import and label your data' },
  { icon: Brain, label: 'Train & validate', description: 'Build and test models' },
  { icon: Rocket, label: 'Deploy to edge', description: 'Push to edge devices' },
  { icon: Activity, label: 'Automate & monitor', description: 'Run and observe' },
];

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      stepsRef.current.forEach((step, i) => {
        if (step) {
          gsap.fromTo(step,
            { x: i % 2 === 0 ? -30 : 30, opacity: 0 },
            {
              x: 0, opacity: 1, duration: 0.6,
              delay: i * 0.1,
              scrollTrigger: {
                trigger: step,
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
      className="relative w-full py-16 md:py-24 lg:py-32 z-30"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/assets/factory-production-line.png"
          alt="Factory production line"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 vignette-overlay" />
        <div className="absolute inset-0 bg-[rgba(7,10,18,0.7)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Headline Block */}
        <div ref={headlineRef} className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F6FF] mb-4 md:mb-6">
            One platform. End-to-end.
          </h2>
          <p className="text-base sm:text-lg text-[#A7B1D8] max-w-2xl mx-auto">
            Label, train, deploy, and automate—without stitching tools together.
          </p>
        </div>

        {/* Flow Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {flowSteps.map((step, i) => (
            <div
              key={step.label}
              ref={el => { stepsRef.current[i] = el; }}
              className="glass-card p-5 md:p-6 text-center hover:border-[rgba(79,109,255,0.4)] transition-colors"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[rgba(79,109,255,0.15)] border border-[rgba(79,109,255,0.3)] flex items-center justify-center mx-auto mb-3 md:mb-4">
                <step.icon className="w-5 h-5 md:w-6 md:h-6 text-[#4F6DFF]" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-[#F4F6FF] mb-2 md:mb-3">
                {step.label}
              </h3>
              <p className="text-sm text-[#A7B1D8] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
