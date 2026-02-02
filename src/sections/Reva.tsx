import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tag, Layers, Download, Play, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const badges = ['Auto-label', 'Augment', 'Export ONNX'];

const datasetImages = [
  { id: 1, labeled: true, objects: 3 },
  { id: 2, labeled: true, objects: 5 },
  { id: 3, labeled: false, objects: 0 },
  { id: 4, labeled: true, objects: 2 },
];

export default function Reva() {
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
      className="relative w-full py-20 lg:py-32 z-40"
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
          <source src="/assets/ai-detection-boxes.mp4" type="video/mp4" />
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
              Reva — Train models without the boilerplate.
            </h2>
            
            <p className="text-lg text-[#A7B1D8] leading-relaxed mb-8">
              Smart annotation, augmentation, and version control—so you go from raw data to a validated model in days, not months.
            </p>

            <div className="flex flex-wrap gap-2">
              {badges.map(badge => (
                <span
                  key={badge}
                  className="px-3 py-1.5 text-sm font-medium text-[#4F6DFF] bg-[rgba(79,109,255,0.1)] rounded-full border border-[rgba(79,109,255,0.2)]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right Card */}
          <div ref={cardRef}>
            <div className="glass-card p-6">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(79,109,255,0.15)] flex items-center justify-center">
                    <Tag className="w-5 h-5 text-[#4F6DFF]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#F4F6FF]">Dataset</h3>
                    <p className="text-xs text-[#A7B1D8]">Production v3</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#A7B1D8]">
                  <Layers className="w-4 h-4" />
                  <span>1,247 images</span>
                </div>
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {datasetImages.map((img) => (
                  <div
                    key={img.id}
                    className="relative rounded-xl overflow-hidden bg-[#0B1022] aspect-video"
                  >
                    <img
                      src="/images/usecase_qc_bg.jpg"
                      alt={`Dataset ${img.id}`}
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute top-2 left-2">
                      {img.labeled ? (
                        <span className="px-2 py-0.5 text-[10px] font-medium text-green-400 bg-[rgba(34,197,94,0.15)] rounded">
                          <Check className="w-3 h-3 inline mr-1" />
                          Labeled
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-[10px] font-medium text-amber-400 bg-[rgba(245,158,11,0.15)] rounded">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-[rgba(167,177,216,0.1)]">
                <div className="flex items-center gap-2 text-xs text-[#A7B1D8]">
                  <Download className="w-4 h-4" />
                  <span>ONNX, TensorRT, CoreML</span>
                </div>
                <Button size="sm" className="bg-[#4F6DFF] hover:bg-[#3d5ce6] text-white text-sm px-4 py-2 rounded-lg">
                  <Play className="w-4 h-4 mr-2" />
                  Start training
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
