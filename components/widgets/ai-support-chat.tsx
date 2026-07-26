"use client";

import React, { useState } from "react";
import Image from "next/image";

// قاعدة المعرفة الرسمية للشركة (تعتمد حصراً على بيانات الموقع والخدمات المقدمة)
const knowledgeBase = [
  {
    keywords: ["purchase", "home", "buy", "down payment"],
    response: "For Home Purchase loans, we offer conventional rates for first-time and seasoned buyers with flexible down payment options starting as low as 3% to 20%."
  },
  {
    keywords: ["refinance", "lower", "monthly payment", "cash-out"],
    response: "Our Refinance and Cash-Out programs are designed to lower your monthly payments, consolidate high-interest debt, or tap into your home equity."
  },
  {
    keywords: ["jumbo", "luxury", "high-net-worth"],
    response: "Jumbo Loans provide high-value property financing up to $3M+ tailored specifically for high-net-worth borrowers and luxury estates."
  },
  {
    keywords: ["non-qm", "self-employed", "bank statement", "investor"],
    response: "Non-QM loans offer alternative qualification methods, including 12-to-24 month bank statements and DSCR investor solutions without personal tax return requirements."
  },
  {
    keywords: ["rate", "interest", "apr"],
    response: "Today's benchmark rates start at 5.500% for 15-year fixed and 6.125% for 30-year fixed conforming loans. Visit our Rates page for full disclosures."
  },
  {
    keywords: ["contact", "office", "phone", "email", "address"],
    response: "Our corporate office is located at 2900 Bristol Street Building H, Suite 101, Costa Mesa, CA 92626. You can reach our advisory team at advisory@cyrilfinancial.com or call +1 (949) 777-6516."
  }
];

export function AiSupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I am your CFG AI Assistant. How can I help you with our mortgage programs today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setInput("");

    // محاكاة تحليل الذكاء الاصطناعي للرد من خدمات وبيانات الموقع حصراً
    setTimeout(() => {
      const lowerInput = userMessage.toLowerCase();
      let matchedResponse = "I can only assist with inquiries related to Cyril Financial Group's loan programs, rates, and services. Please check our loan options or contact our advisory team for specific requests.";

      for (const item of knowledgeBase) {
        if (item.keywords.some(keyword => lowerInput.includes(keyword))) {
          matchedResponse = item.response;
          break;
        }
      }

      setMessages(prev => [...prev, { sender: "ai", text: matchedResponse }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-navy text-white p-4 rounded-full shadow-2xl hover:bg-navy-light transition-all flex items-center gap-3 border border-silver/30 group"
        >
          {/* تم إزالة الخلفية الرمادية واستدعاء الصورة مباشرة */}
          <div className="w-8 h-8 flex items-center justify-center overflow-hidden relative">
            <Image
              src="/images/logo4.png"
              alt="AI Assistant Logo"
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xs font-bold tracking-wider uppercase pr-2">Ask AI Advisor</span>
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-white rounded-3xl shadow-card-soft border border-gray-200 overflow-hidden flex flex-col h-[500px]">
          
          {/* Chat Header */}
          <div className="bg-navy p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* تم إزالة الخلفية الرمادية من الترويسة أيضاً */}
              <div className="w-8 h-8 flex items-center justify-center overflow-hidden relative">
                <Image
                  src="/images/logo4.png"
                  alt="AI Assistant Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">CFG Support AI</h4>
                <p className="text-[10px] text-silver-dark">Online | Verified Corporate Data</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-silver hover:text-white text-sm font-bold px-2 py-1"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-surface text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-navy text-white rounded-br-none"
                      : "bg-white text-navy border border-gray-100 shadow-sm rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about loans, rates, or services..."
              className="flex-1 px-4 py-2.5 bg-surface border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-navy outline-none"
            />
            <button
              type="submit"
              className="bg-navy text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-navy-light transition-all shadow-sm"
            >
              Send
            </button>
          </form>

        </div>
      )}
    </div>
  );
}