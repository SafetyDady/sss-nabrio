import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, MapPin, Mail, Award, Users, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Users, title: 'Consultation', description: 'Expert advice on AI automation' },
  { icon: Award, title: 'Implementation', description: 'End-to-end solution deployment' },
  { icon: Globe, title: 'Support', description: 'Local technical support & training' },
];

export default function Partner() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
      id="partner"
      className="relative w-full py-20 lg:py-32 z-[85] bg-[#070A12]"
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(79,109,255,0.05) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={contentRef} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[rgba(79,109,255,0.15)] rounded-full border border-[rgba(79,109,255,0.3)] mb-6">
            <Building2 className="w-4 h-4 text-[#4F6DFF]" />
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#4F6DFF]">
              About Us
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F6FF] mb-4">
            SSS Intelligence & Solutions Co., Ltd.
          </h2>
          
          <p className="text-lg text-[#4F6DFF] font-medium mb-4">
            Authorized Partner of Nabrio in Thailand
          </p>
          
          <p className="text-base text-[#A7B1D8] max-w-2xl mx-auto leading-relaxed">
            We are the official partner of Nabrio in Thailand, providing AI-powered automation solutions for industrial applications. Our team delivers end-to-end services from consultation to deployment.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {services.map((service, i) => (
            <div
              key={service.title}
              ref={el => { cardsRef.current[i] = el; }}
              className="glass-card p-6 text-center hover:border-[rgba(79,109,255,0.3)] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[rgba(79,109,255,0.15)] flex items-center justify-center mx-auto mb-4">
                <service.icon className="w-6 h-6 text-[#4F6DFF]" />
              </div>
              <h3 className="text-lg font-semibold text-[#F4F6FF] mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-[#A7B1D8]">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-[#F4F6FF] mb-6 text-center">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[rgba(79,109,255,0.15)] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#4F6DFF]" />
              </div>
              <div>
                <p className="text-xs text-[#A7B1D8] uppercase tracking-[0.14em] mb-1">Address</p>
                <p className="text-sm text-[#F4F6FF]">28/73 Sameddang Thap-ma, Rayong, Thailand</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[rgba(79,109,255,0.15)] flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#4F6DFF]" />
              </div>
              <div>
                <p className="text-xs text-[#A7B1D8] uppercase tracking-[0.14em] mb-1">Email</p>
                <a 
                  href="mailto:sanchai5651@gmail.com"
                  className="text-sm text-[#F4F6FF] hover:text-[#4F6DFF] transition-colors"
                >
                  sanchai5651@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
