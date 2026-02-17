import { MARQUEE_ITEMS, FEATURES } from "../data/mockData";
import { cn } from "@/lib/utils";

export function Features() {
  return (
    <>
      {/* Marquee Text Separator */}
      <div className="bg-text-main dark:bg-white py-6 overflow-hidden relative rotate-1 scale-105 my-12">
        <div className="flex items-center gap-12 whitespace-nowrap animate-marquee">
          {/* Duplicate items for seamless loop */}
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-white dark:text-text-main font-serif text-4xl italic px-4">{item}</span>
              <span className="text-gray-500 text-2xl font-display">●</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features / Highlights Minimal Grid */}
      <section id="services" className="py-24 bg-background-light dark:bg-background-dark">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className={cn(
                  "p-8 rounded-lg group transition-all duration-300",
                  feature.highlight
                    ? "bg-primary shadow-xl transform md:-translate-y-8"
                    : "bg-white dark:bg-gray-800 hover:shadow-xl border border-transparent hover:border-gray-100 dark:hover:border-gray-700",
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-colors",
                    feature.highlight
                      ? "bg-white/20 text-white"
                      : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
                  )}
                >
                  <span className="material-icons">{feature.icon}</span>
                </div>

                <h4
                  className={cn("font-serif text-2xl mb-3", feature.highlight ? "text-white" : "text-text-main dark:text-white")}
                >
                  {feature.title}
                </h4>

                <p
                  className={cn(
                    "text-sm leading-relaxed mb-6",
                    feature.highlight ? "text-white/80" : "text-gray-500 dark:text-gray-400",
                  )}
                >
                  {feature.description}
                </p>

                <a
                  href="#"
                  className={cn(
                    "text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all",
                    feature.highlight ? "text-white" : "text-text-main dark:text-white",
                  )}
                >
                  Learn More <span className="material-icons text-sm">arrow_right_alt</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
