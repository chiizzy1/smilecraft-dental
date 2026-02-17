import { CTA_CONTENT } from "../data/mockData";
import { Button } from "./ui/button";

export function CTA() {
  const { headline, primaryBtn, secondaryBtn } = CTA_CONTENT;

  return (
    <section id="contact" className="py-20 px-6 bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-text-main dark:text-white mb-8">{headline}</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="rounded-full px-10 py-8 text-sm font-bold tracking-widest uppercase shadow-lg hover:shadow-primary/40">
            {primaryBtn}
          </Button>
          <Button variant="secondary" className="rounded-full px-10 py-8 text-sm font-bold tracking-widest uppercase">
            {secondaryBtn}
          </Button>
        </div>
      </div>
    </section>
  );
}
