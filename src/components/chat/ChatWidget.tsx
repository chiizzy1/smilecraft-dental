import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useChat } from "../../hooks/useChat";
import { ChatWindow } from "./ChatWindow";
import { cn } from "../../lib/utils";

export function ChatWidget() {
  const chat = useChat();

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
        <AnimatePresence>{chat.isOpen && <ChatWindow onClose={chat.toggleChat} chat={chat} />}</AnimatePresence>

        <motion.button
          onClick={chat.toggleChat}
          className={cn(
            "group flex items-center gap-3 rounded-full shadow-2xl transition-all duration-300 backdrop-blur-md border border-white/20",
            chat.isOpen
              ? "bg-white dark:bg-gray-900 text-gray-800 dark:text-white h-14 w-14 justify-center p-0"
              : "bg-gray-900/90 dark:bg-white/90 text-white dark:text-gray-900 h-16 pr-2 pl-6 py-2 hover:scale-[1.02]",
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {!chat.isOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex flex-col items-start overflow-hidden whitespace-nowrap"
              >
                <span className="text-xs font-medium opacity-80 uppercase tracking-widest">Customer Care</span>
                <span className="font-display text-lg font-bold leading-none">Ask us anything</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className={cn(
              "relative rounded-full flex items-center justify-center transition-colors",
              chat.isOpen ? "w-full h-full bg-transparent" : "w-12 h-12 bg-primary text-white",
            )}
          >
            <AnimatePresence mode="wait">
              {chat.isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                >
                  <Sparkles size={20} fill="currentColor" className="text-white/90" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </div>
    </>
  );
}
