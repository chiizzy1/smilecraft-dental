import { STORIES_CONTENT } from "../data/mockData";
import { Button } from "./ui/button";
import { Reveal } from "./ui/Reveal";

export function Stories() {
  const { headline, cta, cases } = STORIES_CONTENT;

  return (
    <section className="py-20 md:py-32 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-6">
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl leading-none text-text-main-light dark:text-text-main-dark">
            {headline.line1}
            <br />
            <span className="italic">{headline.line2}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="p-4 -m-4">
          <Button className="bg-primary text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 h-auto">
            {cta}
          </Button>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 relative">
        {cases.map((story: any, index: number) => (
          <Reveal key={index} delay={0.2 * index} duration={1}>
            <div className="relative group overflow-hidden rounded-xl">
              {/* Badges - Positioned differently for Before (left) and After (right) based on HTML structure logic 
                  Assuming index 0 is Before and index 1 is After for the pair */}
              <span
                className={`absolute top-6 z-20 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                  story.badge === "Before" ? "left-6 bg-black/40 backdrop-blur-sm text-white" : "right-6 bg-primary text-white"
                }`}
              >
                {story.badge}
              </span>

              <img
                src={story.imageUrl}
                alt={story.label}
                className={`w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105 ${
                  // HTML had grayscale on the first image only
                  index === 0 ? "grayscale" : ""
                }`}
              />

              {/* Overlay Content - Only for the first item in the pair (Before) or if specifically defined */}
              {index === 0 && (
                <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Procedure</p>
                  <p className="text-white font-display italic text-2xl">{story.label}</p>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
