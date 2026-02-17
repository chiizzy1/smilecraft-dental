import { VIDEO_CONTENT } from "../data/mockData";
import { Reveal } from "./ui/Reveal";
import { Parallax } from "./ui/Parallax";

export function VideoSection() {
  const { headline } = VIDEO_CONTENT;

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background Video/Parallax */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Parallax offset={50} className="w-full h-full">
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/60 z-10"></div>
          {/* Placeholder for actual video - using a gradient/image for now if no video source */}
          <div className="w-full h-full bg-gray-800 scale-110">
            {/* Simulated video content */}
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-luminosity"></div>
          </div>
        </Parallax>
      </div>

      <div className="relative z-10 text-center max-w-5xl px-6">
        <Reveal width="100%">
          <div className="w-24 h-px bg-white/50 mx-auto mb-12"></div>
        </Reveal>

        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-tight tracking-tight mix-blend-difference">
          <Reveal delay={0.2}>{headline.line1}</Reveal>
          <Reveal delay={0.4}>
            <span className="italic font-light opacity-90">{headline.line2}</span>
          </Reveal>
          <Reveal delay={0.6}>{headline.line3}</Reveal>
        </h1>

        <Reveal delay={0.8}>
          <div className="mt-12 flex justify-center">
            <button
              className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors duration-300 group cursor-pointer"
              aria-label="Play Video"
            >
              <span className="material-icons text-white text-2xl ml-1 group-hover:scale-110 transition-transform">
                play_arrow
              </span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
