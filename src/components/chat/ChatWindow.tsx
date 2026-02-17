import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ChevronsDown, Sparkles, Bot } from "lucide-react";
import { useChat } from "../../hooks/useChat";
import { ChatMessage } from "./ChatMessage";

interface ChatWindowProps {
  onClose: () => void;
  chat: ReturnType<typeof useChat>;
}

export function ChatWindow({ onClose, chat }: ChatWindowProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages, chat.isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    chat.sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-off-white dark:bg-background-dark rounded-2xl shadow-2xl border border-white/20 overflow-hidden flex flex-col z-50 font-sans"
    >
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 p-4 flex items-center justify-between shadow-xs relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-sm">
              <Sparkles size={20} />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-text-main dark:text-white leading-tight">SmileCraft AI</h3>
            <p className="text-xs font-medium tracking-wide text-green-600 dark:text-green-500">Online • Replies instantly</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500"
          >
            <ChevronsDown size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-off-white dark:bg-background-dark scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
        <div className="flex flex-col gap-2">
          <div className="text-center my-4">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              Today
            </span>
          </div>
          {chat.messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {chat.isLoading && (
            <div className="flex justify-start mb-4">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-blue-600 flex items-center justify-center shrink-0 mr-2 shadow-sm text-white">
                <Bot size={16} />
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-sm border border-gray-100 dark:border-gray-700 shadow-xs">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions */}
      <AnimatePresence>
        {chat.quickActions.length > 0 && !chat.isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-none bg-off-white dark:bg-background-dark"
          >
            {chat.quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => chat.handleQuickAction(action)}
                className="whitespace-nowrap px-3 py-1.5 bg-white dark:bg-gray-800 border border-primary/20 text-primary text-xs font-semibold rounded-full hover:bg-primary hover:text-white transition-colors shadow-sm"
              >
                {action.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-full px-4 py-2 border border-gray-200 dark:border-gray-700 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-text-main dark:text-white placeholder:text-gray-400 min-w-0"
          />
          <button
            type="submit"
            disabled={!input.trim() || chat.isLoading}
            className="p-2 bg-primary text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm shrink-0"
          >
            <Send size={16} />
          </button>
        </form>
        <div className="text-center mt-2">
          <span className="text-[10px] text-gray-400">Powered by SmileCraft AI Technology</span>
        </div>
      </div>
    </motion.div>
  );
}
