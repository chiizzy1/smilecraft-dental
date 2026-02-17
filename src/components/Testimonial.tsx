import { useState, useEffect } from "react";
import { TESTIMONIAL_CONTENT } from "../data/mockData";
import { Reveal } from "./ui/Reveal";

export function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIAL_CONTENT.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 px-4 text-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-testimonial-gradient dark:bg-testimonial-gradient-dark opacity-80 pointer-events-none"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <Reveal width="100%">
          <div className="text-primary text-4xl mb-8 font-display font-bold">"</div>

          <div className="relative min-h-[200px] flex items-center justify-center">
            {TESTIMONIAL_CONTENT.map((item, index) => (
              <div
                key={index}
                className={`transition-opacity duration-1000 absolute inset-0 flex flex-col items-center justify-center w-full ${
                  index === currentIndex ? "opacity-100 z-10 relative" : "opacity-0 z-0 absolute"
                }`}
              >
                {/* Using relative positioning for the active item to let it dictate height, but here we enforce min-height container */}
                <div className={`${index === currentIndex ? "relative" : "absolute top-0 left-0 right-0"} w-full px-4`}>
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-main dark:text-white leading-tight mb-12 text-center mx-auto">
                    {item.quote.line1} <br />
                    {item.quote.line2} <span className="italic font-light">{item.quote.highlight}</span>
                  </h3>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-sm font-semibold text-text-main dark:text-white tracking-wide">{item.author}</span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center mt-12">
            {TESTIMONIAL_CONTENT.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-primary w-8" : "bg-gray-300 dark:bg-gray-700 hover:bg-primary/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
