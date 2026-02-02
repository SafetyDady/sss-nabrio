import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Send, Building2, Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      gsap.fromTo(formRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-20 lg:py-32 z-[100] bg-[#0B1022]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Company Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[rgba(79,109,255,0.15)] rounded-full border border-[rgba(79,109,255,0.3)] mb-4">
            <Building2 className="w-4 h-4 text-[#4F6DFF]" />
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#4F6DFF]">
              Contact Us
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F6FF] mb-3">
            SSS Intelligence & Solutions Co., Ltd.
          </h2>
          <p className="text-lg text-[#4F6DFF] font-medium">
            Authorized Partner of Nabrio in Thailand
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left Column - Info */}
          <div ref={leftRef}>
            <h3 className="text-xl lg:text-2xl font-bold text-[#F4F6FF] mb-4">
              Let's build your next automation.
            </h3>
            <p className="text-base text-[#A7B1D8] leading-relaxed mb-8">
              Tell us what you're tracking, controlling, or inspecting. We'll reply within one business day.
            </p>

            {/* Contact Details */}
            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[rgba(79,109,255,0.15)] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#4F6DFF]" />
                </div>
                <div>
                  <p className="text-xs text-[#A7B1D8] uppercase tracking-[0.14em] mb-1">Address</p>
                  <p className="text-sm text-[#F4F6FF]">28/73 Sameddang Thap-ma, Rayong, Thailand</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[rgba(79,109,255,0.15)] flex items-center justify-center flex-shrink-0">
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

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[rgba(79,109,255,0.15)] flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-5 h-5 text-[#4F6DFF]" />
                </div>
                <div>
                  <p className="text-xs text-[#A7B1D8] uppercase tracking-[0.14em] mb-1">Website</p>
                  <a 
                    href="https://nabrio.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#F4F6FF] hover:text-[#4F6DFF] transition-colors"
                  >
                    nabrio.com
                  </a>
                </div>
              </div>
            </div>

            {/* Awards */}
            <div className="pt-6 border-t border-[rgba(167,177,216,0.1)]">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-[#4F6DFF]" />
                <p className="text-xs text-[#A7B1D8] uppercase tracking-[0.14em]">
                  Awards & Recognition
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-2 bg-[rgba(79,109,255,0.1)] rounded-lg text-xs text-[#A7B1D8] border border-[rgba(79,109,255,0.2)]">
                  NIA Open Innovation Grant
                </span>
                <span className="px-3 py-2 bg-[rgba(79,109,255,0.1)] rounded-lg text-xs text-[#A7B1D8] border border-[rgba(79,109,255,0.2)]">
                  FTI Startup of the Year 2022
                </span>
                <span className="px-3 py-2 bg-[rgba(79,109,255,0.1)] rounded-lg text-xs text-[#A7B1D8] border border-[rgba(79,109,255,0.2)]">
                  FTI Connext Strong Startup
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div ref={formRef}>
            <div className="glass-card p-4 sm:p-6 lg:p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#F4F6FF] mb-2">
                    Message sent!
                  </h3>
                  <p className="text-sm text-[#A7B1D8]">
                    We'll get back to you within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm text-[#A7B1D8]">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        required
                        className="bg-[rgba(7,10,18,0.5)] border-[rgba(167,177,216,0.2)] text-[#F4F6FF] placeholder:text-[#A7B1D8]/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm text-[#A7B1D8]">Work email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        required
                        className="bg-[rgba(7,10,18,0.5)] border-[rgba(167,177,216,0.2)] text-[#F4F6FF] placeholder:text-[#A7B1D8]/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm text-[#A7B1D8]">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your company name"
                      className="bg-[rgba(7,10,18,0.5)] border-[rgba(167,177,216,0.2)] text-[#F4F6FF] placeholder:text-[#A7B1D8]/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm text-[#A7B1D8]">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project..."
                      rows={4}
                      required
                      className="bg-[rgba(7,10,18,0.5)] border-[rgba(167,177,216,0.2)] text-[#F4F6FF] placeholder:text-[#A7B1D8]/50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#4F6DFF] hover:bg-[#3d5ce6] text-white py-5 text-base font-medium rounded-xl transition-all hover:-translate-y-0.5"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[rgba(167,177,216,0.1)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-[#F4F6FF]">Nabrio</span>
              <span className="text-xs text-[#A7B1D8]">by SSS Intelligence & Solutions</span>
            </div>
            <p className="text-sm text-[#A7B1D8]">
              © 2025 SSS Intelligence & Solutions Co., Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-[#A7B1D8] hover:text-[#F4F6FF] transition-colors">Privacy</a>
              <a href="#" className="text-sm text-[#A7B1D8] hover:text-[#F4F6FF] transition-colors">Terms</a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
