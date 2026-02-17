import { FOOTER_CONTENT } from "../data/mockData";
import { Reveal } from "./ui/Reveal";

export function Footer() {
  const { columns, brand, copyright, tagline } = FOOTER_CONTENT;

  return (
    <footer className="bg-background-dark text-white pt-24 pb-12 px-6 lg:px-12 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          {columns.map((col, index) => (
            <Reveal key={index} delay={0.1 * index} className="flex flex-col gap-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary">{col.title}</h4>
              <ul className="flex flex-col gap-4">
                {col.type === "address" &&
                  col.content?.map((line, i) => (
                    <li key={i} className="text-sm text-gray-400 font-light">
                      {line}
                    </li>
                  ))}

                {col.type === "links" &&
                  col.links?.map((link, i) => (
                    <li key={i}>
                      <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors relative group">
                        <span className="relative z-10">{link.label}</span>
                        <span className="absolute left-0 -bottom-1 w-0 h-px bg-primary group-hover:w-full transition-all duration-300"></span>
                      </a>
                    </li>
                  ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-12 pb-4">
          <Reveal width="100%">
            <h1 className="font-serif text-[11vw] lg:text-[9vw] leading-none text-center text-text-main-light dark:text-text-main-dark tracking-tight uppercase scale-y-110 opacity-90 whitespace-nowrap">
              {brand}
            </h1>
          </Reveal>
          <div className="flex justify-between items-center mt-6 text-[10px] uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark">
            <Reveal delay={0.2}>
              <p>{copyright}</p>
            </Reveal>
            <Reveal delay={0.4}>
              <p>{tagline}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </footer>
  );
}
