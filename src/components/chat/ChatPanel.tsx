"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle } from "lucide-react";

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! 👋 Bem-vindo à Kodano. Como posso te ajudar hoje?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Handle keyboard on mobile
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      // Scroll to bottom when keyboard opens
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    return () => window.visualViewport?.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: messages.length + 2,
        text: "Obrigado pela sua mensagem! Em breve nossa equipe entrará em contato. Se preferir, você também pode nos enviar um email para contato@kodano.com.br",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Chat Panel */}
          <motion.div
            id="chatPanel"
            className="fixed z-50
              inset-0 
              lg:inset-auto lg:right-4 lg:bottom-4
              lg:w-[380px] lg:h-[520px]
              flex flex-col"
            style={{
              // Safe areas for iOS
              paddingTop: "env(safe-area-inset-top, 0px)",
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <div
              className="flex-1 flex flex-col
                bg-white
                lg:rounded-2xl lg:shadow-2xl lg:border lg:border-slate-200
                overflow-hidden"
            >
              {/* Header - Emerald Premium */}
              <div className="flex-shrink-0 px-4 py-3 flex items-center justify-between 
                bg-gradient-to-r from-emerald-700 to-emerald-600 text-white
                lg:rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Chat Kodano</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                      <p className="text-xs text-white/70">Online agora</p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-9 h-9 flex items-center justify-center rounded-full 
                    bg-white/10 hover:bg-white/20 text-white transition-colors
                    touch-manipulation"
                  onClick={onClose}
                  aria-label="Fechar chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                        msg.sender === "user"
                          ? "bg-emerald-700 text-white rounded-br-md"
                          : "bg-white text-slate-800 rounded-bl-md border border-slate-100"
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${
                        msg.sender === "user" ? "text-white/50" : "text-slate-400"
                      }`}>
                        {msg.timestamp.toLocaleTimeString("pt-BR", { 
                          hour: "2-digit", 
                          minute: "2-digit" 
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-slate-100">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form
                onSubmit={handleSubmit}
                className="flex-shrink-0 border-t border-slate-200 px-3 py-3 flex items-center gap-2 bg-white
                  lg:rounded-b-2xl"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-sm 
                    outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 
                    transition-all placeholder:text-slate-400"
                  placeholder="Digite sua mensagem..."
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="w-10 h-10 flex items-center justify-center rounded-full 
                    bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 disabled:cursor-not-allowed
                    text-white shadow-md transition-all 
                    hover:scale-105 active:scale-95 disabled:scale-100
                    touch-manipulation"
                  aria-label="Enviar mensagem"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
