import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { Quote, Star, ArrowRight, ArrowLeft } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Lena Brooks',
    role: 'CEO',
    company: 'Nexora',
    content: 'Pumpkin Studio didn’t just build a website; they crafted a digital ecosystem that redefined our brand. Their attention to detail and technical prowess is unmatched in the industry.',
    avatar: 'https://i.pravatar.cc/150?u=lena',
    rating: 5,
  },
  {
    id: 2,
    name: 'David Lin',
    role: 'Product Lead',
    company: 'Zupitar',
    content: 'The team’s ability to translate complex requirements into intuitive, beautiful interfaces is remarkable. They are true partners in innovation.',
    avatar: 'https://i.pravatar.cc/150?u=david',
    rating: 5,
  },
  {
    id: 3,
    name: 'Uba Micheal',
    role: 'Founder',
    company: 'Fanoos',
    content: 'Since launching our new platform, our user engagement has increased by 300%. Pumpkin Studio is the secret weapon every startup needs.',
    avatar: 'https://i.pravatar.cc/150?u=uba',
    rating: 5,
  },
  {
    id: 4,
    name: 'Sarah Jenkins',
    role: 'Marketing Director',
    company: 'Veloce',
    content: 'Working with Pumpkin was a masterclass in creative collaboration. They pushed our boundaries and delivered a result that far exceeded our expectations.',
    avatar: 'https://i.pravatar.cc/150?u=sarahj',
    rating: 5,
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-10 md:p-16 rounded-[48px] bg-white/[0.02] border border-white/10 overflow-hidden group"
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[48px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,77,0,0.08), transparent 40%)`
          ),
        }}
      />

      {/* Quote Icon Background */}
      <div className="absolute top-12 right-12 text-white/5 group-hover:text-brand/10 transition-colors duration-700">
        <Quote size={120} strokeWidth={1} />
      </div>

      <div className="relative z-10">
        <div className="flex gap-1 mb-10">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={16} className="text-brand fill-brand" />
          ))}
        </div>

        <p className="text-2xl md:text-4xl font-display font-medium leading-[1.2] text-white mb-12 tracking-tight">
          "{testimonial.content}"
        </p>

        <div className="flex items-center gap-6">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-brand/20 p-1">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white text-2xl tracking-tighter">{testimonial.name}</h4>
            <p className="text-zinc-500 text-sm font-mono uppercase tracking-[0.2em]">
              {testimonial.role} <span className="text-brand mx-2">/</span> {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="testimonials" className="py-32 lg:py-64 relative overflow-hidden bg-zinc-950">
      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="w-16 h-[1px] bg-brand" />
              <span className="text-brand font-bold tracking-[0.4em] uppercase text-xs">
                Client Stories
              </span>
            </div>
            <h2 className="text-7xl md:text-9xl font-display font-bold tracking-tighter leading-[0.8] text-white">
              Voices of <br />
              <span className="text-zinc-600 italic font-light">our partners</span>.
            </h2>
          </div>
          
          <div className="flex gap-4">
            <button className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
              <ArrowLeft size={24} />
            </button>
            <button className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand hover:border-brand transition-all">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        {/* Staggered Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <TestimonialCard testimonial={testimonials[0]} index={0} />
            <TestimonialCard testimonial={testimonials[2]} index={2} />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-8 lg:pt-24">
            <TestimonialCard testimonial={testimonials[1]} index={1} />
            <TestimonialCard testimonial={testimonials[3]} index={3} />
          </div>
        </div>

        {/* Trust Bar */}
        <div className="mt-48">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 p-12 rounded-[40px] border border-white/5 bg-white/[0.01]">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-brand fill-brand" />
                ))}
              </div>
              <p className="text-white font-bold text-xl">4.9/5 Average Rating</p>
              <p className="text-zinc-600 text-sm uppercase tracking-widest">Based on 200+ global projects</p>
            </div>
            
            <div className="h-[1px] w-full md:w-[1px] md:h-20 bg-white/10" />

            <div className="flex flex-wrap justify-center gap-12 md:gap-16 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
              {['Nexora', 'Zupitar', 'Fanoos', 'Veloce'].map((brand) => (
                <span key={brand} className="text-2xl md:text-3xl font-display font-bold text-white tracking-tighter">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
