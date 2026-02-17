import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import type { Message } from "../../hooks/useChat";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex w-full mb-4 items-end", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-blue-600 flex items-center justify-center shrink-0 mr-2 shadow-sm text-white">
          <Bot size={16} />
        </div>
      )}

      <div
        className={cn(
          "max-w-[75%] p-3.5 text-sm leading-relaxed shadow-xs relative group",
          isUser
            ? "bg-primary text-white rounded-2xl rounded-tr-sm"
            : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-2xl rounded-tl-sm border border-gray-100 dark:border-gray-700",
        )}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
        <span
          className={cn(
            "text-[10px] absolute -bottom-5 w-max opacity-0 group-hover:opacity-100 transition-opacity text-gray-400",
            isUser ? "right-0" : "left-0",
          )}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0 ml-2 shadow-sm text-gray-500 dark:text-gray-400">
          <User size={16} />
        </div>
      )}
    </motion.div>
  );
}
