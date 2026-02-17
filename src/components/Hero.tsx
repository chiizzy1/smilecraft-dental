import { HERO_CONTENT } from "../data/mockData";

import { Reveal } from "./ui/Reveal";
import { Parallax } from "./ui/Parallax";

export function Hero() {
  const { badge1, badge2, headline, description, cta, imageUrl, imageAlt } = HERO_CONTENT;

  return (
    <header className="relative min-h-screen pt-32 pb-20 px-6 lg:px-12 flex flex-col justify-center bg-white dark:bg-background-dark">
      <div className="max-w-[1440px] mx-auto w-full relative z-10">
        {/* Top Right Badges (Floating) */}
        <div className="absolute top-0 right-0 hidden lg:flex flex-col items-end gap-4 z-20 translate-y-12">
          <Reveal delay={1.2} duration={1} overflow="visible">
            <div className="animate-badge-float-1 bg-off-white dark:bg-gray-800 p-6 rounded-full w-40 h-40 flex flex-col items-center justify-center text-center shadow-sm border border-gray-100 dark:border-gray-700">
              <span className="font-serif text-4xl font-bold text-text-main dark:text-white">{badge1.number}</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mt-1 whitespace-pre-line">
                {badge1.label}
              </span>
            </div>
          </Reveal>

          <Reveal delay={1.4} duration={1} overflow="visible">
            <div className="animate-badge-float-2 bg-white dark:bg-gray-800 p-6 rounded-full w-32 h-32 flex flex-col items-center justify-center text-center shadow-lg -translate-x-6 border border-gray-100 dark:border-gray-700">
              <span className="font-serif text-2xl font-bold text-text-main dark:text-white">{badge2.number}</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mt-1 whitespace-pre-line">
                {badge2.label}
              </span>
            </div>
          </Reveal>
        </div>

        {/* Main Headline Content */}
        <div className="relative z-10 grid grid-cols-12 gap-8 items-center mt-10 lg:mt-0">
          <div className="col-span-12 lg:col-span-8 relative">
            {/* Massive Headline */}
            <div
              className="font-serif text-[13vw] lg:text-[8.5rem] leading-[0.85] text-text-main dark:text-white dark:mix-blend-difference z-30 relative tracking-tight"
              style={{ textShadow: "var(--hero-text-shadow, 0 0 40px rgba(255,255,255,0.9), 0 0 80px rgba(255,255,255,0.6))" }}
            >
              <Reveal delay={0.2}>{headline.line1}</Reveal>
              <Reveal delay={0.4} className="ml-[10%]">
                <span className="italic font-light">{headline.line2}</span>
              </Reveal>
              <Reveal delay={0.6}>
                <span className="italic text-primary font-light">{headline.line3}</span> {headline.line4}
              </Reveal>
              <Reveal delay={0.8}>{headline.line5}</Reveal>
            </div>

            {/* Hero Image (Circle Mask) */}
            <div className="animate-hero-drift absolute top-1/2 left-[40%] -translate-y-[45%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full overflow-hidden z-20 border-8 border-off-white dark:border-gray-800 hidden md:block">
              <Parallax offset={40} className="w-full h-full">
                <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover scale-125 opacity-90" />
              </Parallax>
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            </div>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="mt-20 lg:mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="col-span-1 md:col-span-5 lg:col-span-4 flex flex-col items-start gap-8">
            <Reveal delay={1.0}>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs border-l-2 border-primary pl-4">
                {description}
              </p>
            </Reveal>

            <Reveal delay={1.2}>
              <a
                href="#"
                className="group relative inline-flex items-center justify-center bg-primary hover:bg-blue-700 text-white font-bold px-10 py-5 rounded-full overflow-hidden transition-all hover:w-full sm:hover:w-auto w-full sm:w-auto"
              >
                <span className="relative z-10 text-sm tracking-widest uppercase">{cta}</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>
            </Reveal>
          </div>

          {/* Mobile Only Image */}
          <div className="col-span-1 md:hidden mt-8">
            <Reveal>
              <div className="w-full aspect-square rounded-full overflow-hidden border-4 border-off-white dark:border-gray-800">
                <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Decorative subtle pattern */}
      <div className="absolute inset-0 z-20 bg-linear-to-tl from-black/40 via-transparent to-black/40 pointer-events-none"></div>
    </header>
  );
}
