import { useState, useCallback } from "react";
import { NAV_LINKS } from "../data/mockData";
import { Button } from "./ui/button";
import { useTheme } from "../hooks/useTheme";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

/* ─────────────────── Animation Variants ─────────────────── */

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const panelVariants = {
  closed: {
    x: "100%",
    transition: { type: "spring" as const, stiffness: 400, damping: 40 },
  },
  open: {
    x: 0,
    transition: { type: "spring" as const, stiffness: 400, damping: 40 },
  },
};

const linkVariants = {
  closed: { opacity: 0, y: 20, filter: "blur(4px)" },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      duration: 0.45,
      bounce: 0,
      delay: 0.15 + i * 0.08,
    },
  }),
};

const ctaVariants = {
  closed: { opacity: 0, y: 16 },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      duration: 0.5,
      bounce: 0,
      delay: 0.15 + NAV_LINKS.length * 0.08 + 0.1,
    },
  },
};

/* ─────────────────── Animated Hamburger ─────────────────── */

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-6 h-5 relative flex flex-col justify-between">
      <motion.span
        className="block w-full h-[2px] bg-current origin-left rounded-full"
        animate={isOpen ? { rotate: 45, y: 0, x: 2 } : { rotate: 0, y: 0, x: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
      <motion.span
        className="block w-full h-[2px] bg-current rounded-full"
        animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block w-full h-[2px] bg-current origin-left rounded-full"
        animate={isOpen ? { rotate: -45, y: 0, x: 2 } : { rotate: 0, y: 0, x: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </div>
  );
}

/* ─────────────────── Navbar Component ─────────────────── */

export function Navbar() {
  const { isDark, toggle } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md dark:bg-background-dark/90 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-text-main dark:text-white">
            Dentica Elite.
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-12">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative text-xs font-bold tracking-[0.15em] text-gray-600 dark:text-gray-300 hover:text-text-main dark:hover:text-white transition-colors uppercase py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggle}
              className="relative w-11 h-11 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center cursor-pointer overflow-hidden transition-colors duration-500 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-md hover:shadow-primary/10 group"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ y: 20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                  >
                    <Sun
                      className="w-[18px] h-[18px] text-amber-400 group-hover:text-amber-300 transition-colors"
                      strokeWidth={2}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ y: 20, opacity: 0, rotate: 90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                  >
                    <Moon
                      className="w-[18px] h-[18px] text-gray-500 group-hover:text-primary transition-colors"
                      strokeWidth={2}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <Button className="hidden sm:inline-flex rounded-full px-8 py-6 text-xs font-bold tracking-widest uppercase shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
              Book Now
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden relative z-[60] w-11 h-11 flex items-center justify-center text-text-main dark:text-white cursor-pointer"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <MenuIcon isOpen={isMenuOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* ─────────── Mobile Menu Overlay ─────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm lg:hidden"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
            />

            {/* Panel */}
            <motion.div
              className="fixed top-0 right-0 z-[56] h-full w-[85%] max-w-[400px] bg-white dark:bg-background-dark shadow-2xl lg:hidden flex flex-col"
              variants={panelVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Panel Header */}
              <div className="h-24 flex items-center justify-between px-8">
                <span className="font-serif text-xl font-bold text-text-main dark:text-white">Menu</span>
                <button
                  onClick={closeMenu}
                  className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-text-main dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="1" y1="1" x2="13" y2="13" />
                    <line x1="13" y1="1" x2="1" y2="13" />
                  </svg>
                </button>
              </div>

              {/* Divider */}
              <div className="mx-8 h-px bg-gray-200 dark:bg-gray-700" />

              {/* Nav Links */}
              <div className="flex-1 flex flex-col justify-center px-8 gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    onClick={closeMenu}
                    className="group block py-4 border-b border-gray-100 dark:border-gray-800 last:border-0"
                  >
                    <span className="flex items-center justify-between">
                      <span className="font-serif text-3xl font-bold text-text-main dark:text-white group-hover:text-primary transition-colors duration-200">
                        {link.label}
                      </span>
                      <motion.span
                        className="text-gray-300 dark:text-gray-600 text-xl group-hover:text-primary transition-colors duration-200"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Mobile CTA */}
              <motion.div className="px-8 pb-12" variants={ctaVariants} initial="closed" animate="open">
                <Button
                  className="w-full rounded-full py-6 text-xs font-bold tracking-widest uppercase shadow-lg shadow-primary/30"
                  onClick={closeMenu}
                >
                  Book Now
                </Button>
                <p className="text-center text-xs text-gray-400 mt-4 tracking-wide">Call us: (555) 123-4567</p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
