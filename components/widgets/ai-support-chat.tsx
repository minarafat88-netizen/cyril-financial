"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Send, Sparkles, HelpCircle, X } from "lucide-react";

interface KnowledgeItem {
  keywords: string[];
  response: string;
}

export function AiSupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I am your Cyril Financial AI Assistant. How can I help you with our mortgage programs, rates, or services today?" }
  ]);
  const [input, setInput] = useState("");
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeItem[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // حالات السحب والإفلات
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    hasMoved: false,
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragRef.current.startX = e.clientX;
    dragRef.current.startY = e.clientY;
    dragRef.current.initialX = position.x;
    dragRef.current.initialY = position.y;
    dragRef.current.hasMoved = false;

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      dragRef.current.hasMoved = true;
    }

    setPosition({
      x: dragRef.current.initialX + dx,
      y: dragRef.current.initialY + dy,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handleButtonClick = () => {
    if (!dragRef.current.hasMoved) {
      setIsOpen(true);
    }
  };

  // جلب قاعدة المعرفة من الـ API عند فتح المكون
  useEffect(() => {
    const fetchKnowledgeBase = async () => {
      try {
        const response = await fetch('/api/ai-knowledge');
        const data = await response.json();
        if (data.success) {
          setKnowledgeBase(data.data);
        }
      } catch (error) {
        console.error("Failed to load AI knowledge base", error);
      }
    };
    fetchKnowledgeBase();
  }, []);

  // التمرير تلقائياً لأسفل عند وصول رسالة جديدة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // خوارزمية مطابقة ذكية للكلمات المفتاحية
  const findBestResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    let bestMatch = "I can only assist with topics related to Cyril Financial Group's loan programs, rates, and services. Please check our loan options or contact our advisory team for specific requests.";
    let highestScore = 0;

    for (const item of knowledgeBase) {
      let score = 0;
      if (Array.isArray(item.keywords)) {
        for (const kw of item.keywords) {
          if (lowerInput.includes(kw.toLowerCase())) {
            score += kw.length;
          }
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item.response;
      }
    }

    return bestMatch;
  };

  const handleSend = (e: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || input;
    if (!textToSend.trim()) return;

    const userMessage = textToSend.trim();
    setMessages(prev => [...prev, { sender: "user", text: userMessage }]);
    if (!customText) setInput("");

    setTimeout(() => {
      const matchedResponse = findBestResponse(userMessage);
      setMessages(prev => [...prev, { sender: "ai", text: matchedResponse }]);
    }, 500);
  };

  const quickPrompts = [
    "What are FHA loan requirements?",
    "How to apply for a mortgage?",
    "What is current interest rate?",
    "Contact an advisor"
  ];

  return (
    <div
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        touchAction: "none",
      }}
      className="fixed bottom-6 right-6 z-50 font-sans select-none"
    >
      {!isOpen ? (
        <button
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onClick={handleButtonClick}
          className="bg-navy text-white p-4 rounded-full shadow-2xl hover:bg-navy-light transition-all flex items-center gap-3 border border-silver/30 group cursor-grab active:cursor-grabbing animate-bounce-subtle"
        >
          <div className="w-8 h-8 flex items-center justify-center overflow-hidden relative pointer-events-none">
            <Image
              src="/images/Logo4.png"
              alt="AI Assistant Logo"
              fill
              style={{ objectFit: 'contain' }}
              className="object-contain"
            />
          </div>
          <span className="text-xs font-bold tracking-wider uppercase pr-2 flex items-center gap-1.5 pointer-events-none">
            <Sparkles className="w-3.5 h-3.5 text-emerald" /> Ask AI Advisor
          </span>
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-white rounded-3xl shadow-luxury border border-gray-200 overflow-hidden flex flex-col h-[520px]">
          
          {/* Chat Header (يعمل كمقبض للسحب عند فتح المحادثة) */}
          <div 
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="bg-navy p-4 text-white flex items-center justify-between cursor-grab active:cursor-grabbing"
          >
            <div className="flex items-center gap-3 pointer-events-none">
              <div className="w-8 h-8 flex items-center justify-center overflow-hidden relative">
                <Image
                  src="/images/Logo4.png"
                  alt="AI Assistant Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  CFG Support AI <span className="w-2 h-2 rounded-full bg-emerald inline-block"></span>
                </h4>
                <p className="text-[10px] text-silver-dark">Online | Verified Corporate Data</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-silver hover:text-white text-sm font-bold p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-surface text-xs cursor-default">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-navy text-white rounded-br-none shadow-sm"
                      : "bg-white text-navy border border-gray-100 shadow-sm rounded-bl-none font-medium"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {messages.length === 1 && (
              <div className="pt-2 space-y-1.5">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider px-1">Suggested Questions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={(e) => handleSend(e as any, prompt)}
                      className="text-[11px] bg-white hover:bg-navy hover:text-white text-navy border border-gray-200 px-3 py-1.5 rounded-xl transition-all shadow-xs cursor-pointer font-medium"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={(e) => handleSend(e)} className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center cursor-default">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about loans, rates, or services..."
              className="flex-1 px-4 py-2.5 bg-surface border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-navy outline-none font-medium text-navy"
            />
            <button
              type="submit"
              className="bg-navy text-white p-2.5 rounded-xl hover:bg-navy-light transition-all shadow-sm cursor-pointer flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}