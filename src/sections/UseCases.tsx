import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    icon: CheckCircle,
    title: 'Quality Control',
    description: 'Detect defects, measure placement, and enforce standards—in real time.',
    image: '/images/usecase_qc_bg.jpg',
    stats: [
      { value: '99.7%', label: 'Accuracy' },
      { value: '<50ms', label: 'Latency' },
      { value: '24/7', label: 'Uptime' },
    ],
  },
  {
    icon: Shield,
    title: 'Safety & Compliance',
    description: 'Monitor PPE, zones, and behaviors. Alert instantly, log everything.',
    image: '/images/usecase_safety_bg.jpg',
    stats: [
      { value: '-85%', label: 'Incidents' },
      { value: '100%', label: 'Compliance' },
      { value: 'Real-time', label: 'Alerts' },
    ],
  },
];

export default function UseCases() {
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
            { y: 60, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.8,
              delay: i * 0.2,
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
      className="relative w-full py-20 lg:py-32 z-[70] bg-[#070A12]"
    >
      {/* Diagonal glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(79,109,255,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Headline */}
        <div ref={headlineRef} className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F6FF] mb-4">
            Use cases that ship.
          </h2>
          <p className="text-lg text-[#A7B1D8] max-w-2xl">
            From factory floors to warehouses, Nabrio powers real-world automation.
          </p>
        </div>

        {/* Case Cards */}
        <div className="space-y-8">
          {useCases.map((useCase, i) => (
            <div
              key={useCase.title}
              ref={el => { cardsRef.current[i] = el; }}
              className="relative min-h-[400px] lg:h-[500px] rounded-2xl overflow-hidden group"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={useCase.image}
                  alt={useCase.title}
                  className="w-full h-full object-cover brightness-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,10,18,0.85)] via-[rgba(7,10,18,0.5)] to-[rgba(7,10,18,0.2)] lg:bg-gradient-to-r lg:from-[rgba(7,10,18,0.8)] lg:via-[rgba(7,10,18,0.4)] lg:to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end lg:justify-center p-6 lg:p-12 lg:max-w-[50%]">
                <div className="w-12 h-12 rounded-xl bg-[rgba(79,109,255,0.15)] flex items-center justify-center mb-4">
                  <useCase.icon className="w-6 h-6 text-[#4F6DFF]" />
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-[#F4F6FF] mb-3">
                  {useCase.title}
                </h3>
                
                <p className="text-base lg:text-lg text-[#A7B1D8] leading-relaxed mb-6">
                  {useCase.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6">
                  {useCase.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-xl lg:text-2xl font-bold text-[#4F6DFF]">
                        {stat.value}
                      </div>
                      <div className="text-xs text-[#A7B1D8] uppercase tracking-[0.14em]">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
