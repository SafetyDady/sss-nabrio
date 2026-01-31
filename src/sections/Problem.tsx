import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Puzzle, Clock, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
  {
    icon: Puzzle,
    title: 'Fragmented stack',
    description: 'Jumping between labeling, training, and device management.',
  },
  {
    icon: Clock,
    title: 'Long iteration loops',
    description: 'Weeks between prototype and on-device testing.',
  },
  {
    icon: TrendingUp,
    title: 'Runaway costs',
    description: 'Cloud inference adds up fast at scale.',
  },
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple reveal animation - no pin
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
      className="relative w-full py-20 lg:py-32 z-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/problem_lab_bg.jpg"
          alt="Robotics lab"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 vignette-overlay" />
        <div className="absolute inset-0 bg-[rgba(7,10,18,0.7)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Headline Block */}
        <div ref={headlineRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F6FF] mb-6">
            Most teams never ship.
          </h2>
          <p className="text-lg text-[#A7B1D8] max-w-2xl mx-auto">
            Physical AI projects get stuck between notebooks, cloud bills, and hardware that won't integrate.
          </p>
        </div>

        {/* Pain Point Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((point, i) => (
            <div
              key={point.title}
              ref={el => { cardsRef.current[i] = el; }}
              className="glass-card p-6 hover:border-[rgba(79,109,255,0.4)] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[rgba(79,109,255,0.15)] flex items-center justify-center mb-4">
                <point.icon className="w-6 h-6 text-[#4F6DFF]" />
              </div>
              <h3 className="text-xl font-semibold text-[#F4F6FF] mb-2">
                {point.title}
              </h3>
              <p className="text-sm text-[#A7B1D8] leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
