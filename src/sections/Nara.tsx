import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Search, Zap, Bell, FileText, Settings, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const nodes = [
  { icon: Camera, label: 'Camera input' },
  { icon: Search, label: 'Detect object' },
  { icon: Zap, label: 'Trigger output' },
];

const actions = [
  { icon: Bell, label: 'Alert' },
  { icon: FileText, label: 'Log' },
  { icon: Settings, label: 'Control relay' },
  { icon: Globe, label: 'Webhook' },
];

export default function Nara() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      gsap.fromTo(cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: cardRef.current,
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
      className="relative w-full py-20 lg:py-32 z-50"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onError={(e) => {
            // Hide video and show fallback background
            e.currentTarget.style.display = 'none';
          }}
        >
          <source src="/assets/robot-arm-picking.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 vignette-overlay" />
        <div className="absolute inset-0 bg-[rgba(7,10,18,0.6)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div ref={contentRef}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[rgba(79,109,255,0.15)] rounded-full border border-[rgba(79,109,255,0.3)] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#4F6DFF]" />
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#4F6DFF]">
                Product
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F6FF] mb-6">
              Nara — Deploy logic to the edge.
            </h2>
            
            <p className="text-lg text-[#A7B1D8] leading-relaxed mb-8">
              Connect cameras, sensors, and controllers. Build rules visually. Run locally with millisecond latency.
            </p>
          </div>

          {/* Right Card */}
          <div ref={cardRef}>
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-[#F4F6FF] mb-6">
                Automation Flow
              </h3>

              {/* Nodes */}
              <div className="space-y-4 mb-6">
                {nodes.map((node, i) => (
                  <div key={node.label} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[rgba(79,109,255,0.15)] border border-[rgba(79,109,255,0.3)] flex items-center justify-center">
                      <node.icon className="w-5 h-5 text-[#4F6DFF]" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-[#F4F6FF]">
                        {node.label}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        <span className="text-xs text-[#A7B1D8]">Active</span>
                      </div>
                    </div>
                    {i < nodes.length - 1 && (
                      <div className="hidden sm:block w-8 h-0.5 bg-[rgba(79,109,255,0.3)]" />
                    )}
                  </div>
                ))}
              </div>

              {/* Action Chips */}
              <div className="pt-6 border-t border-[rgba(167,177,216,0.1)]">
                <p className="text-xs text-[#A7B1D8] mb-3 uppercase tracking-[0.14em]">
                  Available Actions
                </p>
                <div className="flex flex-wrap gap-2">
                  {actions.map(action => (
                    <button
                      key={action.label}
                      className="flex items-center gap-2 px-3 py-2 bg-[rgba(79,109,255,0.1)] hover:bg-[rgba(79,109,255,0.2)] border border-[rgba(79,109,255,0.2)] rounded-lg transition-colors"
                    >
                      <action.icon className="w-4 h-4 text-[#4F6DFF]" />
                      <span className="text-sm text-[#F4F6FF]">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
