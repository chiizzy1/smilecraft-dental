import { ARTISANS_CONTENT } from "../data/mockData";
import { Reveal } from "./ui/Reveal";

export function Artisans() {
  const { headline, members } = ARTISANS_CONTENT;

  return (
    <section className="bg-surface-light dark:bg-surface-dark py-20 md:py-32">
      <div className="px-4 md:px-12 lg:px-24 max-w-8xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <Reveal>
            <h2 className="font-display text-4xl md:text-6xl text-text-main-light dark:text-text-main-dark">
              {headline.text} <span className="text-primary italic">{headline.highlight}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-xs text-xs md:text-sm text-text-muted-light dark:text-text-muted-dark leading-relaxed">
              World class specialists dedicated to the science of beauty and the art of dentistry.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((person, index) => (
            <div key={index} className={`contents ${index % 2 === 1 ? "lg:mt-12" : ""}`}>
              {/* Note: 'contents' display won't work for margin. We need a wrapper or conditional class on the item itself. 
                  Correcting approach: Apply margin directly to the item based on index. */}
              <Reveal delay={0.1 * index} duration={0.8} className={index % 2 === 1 ? "lg:mt-12" : ""}>
                <div className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer transition-all duration-300 active:scale-95">
                  <img
                    src={person.imageUrl}
                    alt={person.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <h3 className="text-white font-display text-xl">{person.name}</h3>
                    <p className="text-white/60 text-[10px] uppercase tracking-widest mt-1">{person.role}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
