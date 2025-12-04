"use client";

import { useState, FormEvent } from "react";

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! 👋 Bem-vindo à Kodano. Como posso te ajudar?",
      sender: "bot",
    },
  ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: "user",
    };
    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate bot response (you can replace this with actual API call)
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "Obrigado pela sua mensagem! Em breve nossa equipe entrará em contato.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div
      id="chatPanel"
      className="fixed inset-x-0 bottom-0 z-50
        flex items-end justify-center
        lg:inset-auto lg:right-6 lg:bottom-24 lg:items-center lg:justify-end
        pointer-events-none"
    >
      <div
        className="pointer-events-auto
          w-full max-w-md mx-2 mb-2
          rounded-t-3xl bg-white shadow-2xl border border-slate-100
          h-[70vh] flex flex-col overflow-hidden
          lg:rounded-3xl lg:mx-0 lg:mb-0 lg:h-[560px]"
      >
        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100">
          <div className="text-sm">
            <p className="font-semibold text-[#002A35]">Chat Kodano</p>
            <p className="text-xs text-slate-500">Consultor comercial online</p>
          </div>
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
            onClick={onClose}
            aria-label="Fechar chat"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-slate-50/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                  msg.sender === "user"
                    ? "bg-[#002A35] text-white"
                    : "bg-white text-slate-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-slate-200 px-3 py-2 flex items-center gap-2 bg-white"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 rounded-full border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#00C8DC] focus:ring-2 focus:ring-[#00C8DC]/30 transition-all"
            placeholder="Digite sua mensagem..."
          />
          <button
            type="submit"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#00C8DC] hover:bg-[#00B0C2] text-white text-xs font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
            aria-label="Enviar mensagem"
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  );
}
