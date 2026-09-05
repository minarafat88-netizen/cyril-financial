"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Phone, Mail, X, Headphones, ArrowRight } from "lucide-react";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
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
    // منع التفاعل إذا كان الضغط على زر الإغلاق أو داخل النافذة المنبثقة لمنع التعارض
    if ((e.target as HTMLElement).closest(".no-drag")) return;

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

    // إذا تحرك المؤشر أكثر من 5 بكسل، نعتبرها حركة سحب وليس ضغطاً عادياً
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
    // فتح أو إغلاق النافذة فقط إذا لم يتم سحب العنصر
    if (!dragRef.current.hasMoved) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        touchAction: "none",
      }}
      className="fixed bottom-6 left-6 z-50 select-none cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* نافذة منبثقة تفاعلية عند الضغط على الزر */}
      {isOpen && (
        <div className="no-drag absolute bottom-20 left-0 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 text-navy animate-in fade-in slide-in-from-bottom-4 duration-300 cursor-default">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">Quick Assistance</h4>
                <p className="text-[10px] text-slate-500">Cyril Financial Group</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <p className="text-slate-600 leading-relaxed">
              Speak directly with our executive advisors for immediate mortgage structuring.
            </p>

            <div className="space-y-2 pt-1">
              {/* الاتصال الهاتفي المباشر */}
              <a 
                href="tel:+19497776516" 
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Office Line</span>
                  <span className="font-bold text-slate-900">+1 (949) 777-6516</span>
                </div>
              </a>

              {/* البريد الإلكتروني التنفيذي */}
              <a 
                href="mailto:Rzaky@CyrilFinancial.com" 
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Executive Email</span>
                  <span className="font-bold text-slate-900 truncate block">Rzaky@CyrilFinancial.com</span>
                </div>
              </a>
            </div>

            {/* الانتقال لصفحة الاتصال الكاملة */}
            <div className="pt-2">
              <Link 
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-md"
              >
                View All Contact Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* الزر العائم الأساسي (Floating Action Button) */}
      <button
        onClick={handleButtonClick}
        className="relative group flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
        aria-label="Quick Contact"
      >
        {/* نقطة مضيئة للإيحاء بالنشاط والجاهزية */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></span>
        <Phone className="w-6 h-6 transform group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
}