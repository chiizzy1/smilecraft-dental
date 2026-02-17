import { PHILOSOPHY_CONTENT } from "../data/mockData";
import { Reveal } from "./ui/Reveal";
import { Parallax } from "./ui/Parallax";

export function Intro() {
  const { tag, headline: h, subHeadline, description, cta, images } = PHILOSOPHY_CONTENT;

  return (
    <section className="py-32 bg-white dark:bg-background-dark relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column: Typography Stack */}
          <div className="relative pt-12">
            <Reveal>
              <span className="inline-block text-primary text-xs font-bold tracking-[0.2em] uppercase mb-6 bg-primary/10 px-3 py-1 rounded-md">
                {tag}
              </span>
            </Reveal>

            <h2 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] text-text-main dark:text-white mb-12">
              <Reveal delay={0.1}>{h.line1}</Reveal>
              <Reveal delay={0.2}>
                <span className="italic font-light text-gray-400 dark:text-gray-500">{h.line2}</span>
              </Reveal>
              <Reveal delay={0.3}>
                THE <span className="text-primary">{h.line3}</span>
              </Reveal>
            </h2>

            <div className="flex flex-col gap-8 max-w-md ml-auto lg:ml-12 border-t border-gray-200 dark:border-gray-800 pt-8">
              <Reveal delay={0.4}>
                <h3 className="font-display font-medium text-xl text-text-main dark:text-white uppercase tracking-wide">
                  {subHeadline}
                </h3>
              </Reveal>
              <Reveal delay={0.5}>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light">{description}</p>
              </Reveal>

              <Reveal delay={0.6}>
                <a
                  href="#"
                  className="inline-flex items-center gap-3 text-primary font-semibold hover:gap-5 transition-all group mt-4"
                >
                  <span className="uppercase text-sm tracking-widest border-b border-transparent group-hover:border-primary pb-0.5">
                    {cta}
                  </span>
                  <span className="material-icons text-lg group-hover:rotate-45 transition-transform duration-300">
                    arrow_forward
                  </span>
                </a>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Image Collage */}
          <div className="relative mt-12 lg:mt-0 h-full min-h-[600px] flex items-center">
            {/* Background Shape */}
            <div className="absolute top-0 right-0 w-3/4 h-full bg-off-white dark:bg-gray-800/50 rounded-tl-[100px] rounded-bl-3xl -z-10"></div>

            {/* Image 1: Interior */}
            <div className="relative z-10 w-2/3 aspect-3/4 overflow-hidden rounded-lg shadow-2xl transform translate-y-12 lg:translate-y-24">
              <Parallax offset={-30} className="w-full h-full">
                <img
                  src={images[0].src}
                  alt={images[0].alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </Parallax>
              <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur px-4 py-2 rounded-md z-20">
                <span className="text-[10px] uppercase font-bold tracking-widest text-text-main dark:text-white">
                  {images[0].label}
                </span>
              </div>
            </div>

            {/* Image 2: Procedure (Overlapping) */}
            <div className="absolute top-0 right-4 lg:right-12 w-3/5 aspect-4/5 rounded-lg overflow-hidden shadow-2xl border-4 border-white dark:border-background-dark transform -translate-y-12 lg:translate-y-0">
              <Parallax offset={60} className="w-full h-full">
                <img
                  src={images[1].src}
                  alt={images[1].alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </Parallax>
              <div className="absolute top-4 right-4 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center z-20">
                <span className="material-icons text-sm">star</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
