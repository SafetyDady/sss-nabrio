import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Cpu, Database, Wifi, Share2, Cloud, HardDrive, Server } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const devices = [
  { icon: Camera, label: 'Camera' },
  { icon: Cpu, label: 'PLC' },
  { icon: Database, label: 'Robot controller' },
  { icon: HardDrive, label: 'Sensor' },
];

const protocols = [
  { icon: Wifi, label: 'MQTT' },
  { icon: Share2, label: 'Modbus' },
  { icon: Server, label: 'SQL' },
  { icon: Cloud, label: 'Webhooks' },
  { icon: Database, label: 'Cloud functions' },
];

export default function Connectivity() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const devicesRef = useRef<HTMLDivElement>(null);
  const protocolsRef = useRef<HTMLDivElement>(null);

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

      gsap.fromTo(devicesRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: devicesRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );

      gsap.fromTo(protocolsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6,
          delay: 0.15,
          scrollTrigger: {
            trigger: protocolsRef.current,
            start: 'top 90%',
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
      className="relative w-full py-16 md:py-24 lg:py-32 z-[60] bg-[#070A12]"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(79,109,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(79,109,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F6FF] mb-3 md:mb-4">
            Connect what you already use.
          </h2>
          <p className="text-base sm:text-lg text-[#A7B1D8] max-w-2xl mx-auto">
            Nara speaks industrial protocols and modern APIs—so you don't need to rebuild your stack.
          </p>
        </div>

        {/* Devices */}
        <div ref={devicesRef} className="mb-8 md:mb-10">
          <p className="text-xs text-[#A7B1D8] uppercase tracking-[0.14em] mb-3 md:mb-4 text-center">
            Devices
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {devices.map((device) => (
              <div
                key={device.label}
                className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 glass-card hover:bg-[rgba(79,109,255,0.1)] transition-colors"
              >
                <device.icon className="w-4 h-4 md:w-5 md:h-5 text-[#4F6DFF]" />
                <span className="text-xs md:text-sm font-medium text-[#F4F6FF]">{device.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Protocols */}
        <div ref={protocolsRef}>
          <p className="text-xs text-[#A7B1D8] uppercase tracking-[0.14em] mb-3 md:mb-4 text-center">
            Protocols & Services
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {protocols.map((protocol) => (
              <div
                key={protocol.label}
                className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 glass-card hover:bg-[rgba(79,109,255,0.1)] transition-colors"
              >
                <protocol.icon className="w-4 h-4 md:w-5 md:h-5 text-[#7B8FFF]" />
                <span className="text-xs md:text-sm font-medium text-[#F4F6FF]">{protocol.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
