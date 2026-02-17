import { useState, useEffect, useRef } from "react";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

export interface QuickAction {
  label: string;
  action: string;
  url?: string;
  phone?: string;
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isOpen: boolean;
  sessionId: string;
  quickActions: QuickAction[];
}

const WEBHOOK_URL = import.meta.env.VITE_CHAT_WEBHOOK_URL;

export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: [
      {
        id: "welcome",
        text: "Hi there! 👋 I'm Smile, your dental assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date().toISOString(),
      },
    ],
    isLoading: false,
    isOpen: false,
    sessionId: "",
    quickActions: [
      { label: "📅 Book Appointment", action: "book", url: "https://cal.com/smilecraft-dental" },
      { label: "💰 Pricing", action: "pricing" },
      { label: "🦷 Services", action: "services" },
    ],
  });

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Load session ID or create new one
    let storedSessionId = localStorage.getItem("chat_session_id");
    if (!storedSessionId) {
      storedSessionId = crypto.randomUUID();
      localStorage.setItem("chat_session_id", storedSessionId);
    }
    setState((prev) => ({ ...prev, sessionId: storedSessionId! }));
  }, []);

  const toggleChat = () => {
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const addMessage = (text: string, sender: "user" | "bot") => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      text,
      sender,
      timestamp: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message immediately
    addMessage(text, "user");
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      if (!WEBHOOK_URL) {
        throw new Error("Webhook URL not configured");
      }

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          sessionId: state.sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      // The n8n workflow returns an array with a single object containing 'response' and 'quickActions'
      // Adjust parsing based on actual n8n return structure.
      // Assuming return structure from workflow: [{ json: { response: "...", quickActions: [...] } }]
      // Or if using Respond to Webhook node typically it sends the JSON body directly.
      // Based on the workflow overview, it seems to return { success: true, response: "...", quickActions: [...] }

      if (data.response) {
        addMessage(data.response, "bot");
      } else if (data[0]?.response) {
        // Handle array wrapping if n8n does that
        addMessage(data[0].response, "bot");
      } else {
        addMessage("I received your message but couldn't process the response properly.", "bot");
      }

      if (data.quickActions || data[0]?.quickActions) {
        const newActions = data.quickActions || data[0]?.quickActions;
        setState((prev) => ({ ...prev, quickActions: newActions }));
      }
    } catch (error) {
      console.error("Chat error:", error);
      addMessage("I'm having trouble connecting to the server right now. Please try again later or call us directly.", "bot");
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    if (action.url) {
      window.open(action.url, "_blank");
      return;
    }
    if (action.phone) {
      window.location.href = `tel:${action.phone}`;
      return;
    }

    // For other actions, send as a message
    sendMessage(action.label);
  };

  return {
    ...state,
    toggleChat,
    sendMessage,
    handleQuickAction,
  };
}
