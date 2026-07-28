import React from "react";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { AiSupportChat } from "@/components/widgets/ai-support-chat";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-navy relative">
      <Header />

      {/* Hero Section */}
      <section className="bg-navy py-20 px-6 text-center text-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <div className="inline-block px-5 py-1.5 bg-white/10 border border-white/20 text-blue-200 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            Get In Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            We Are Here to <span className="text-blue-400">Help You</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Have questions about your mortgage or loan options? Reach out directly to our leadership and executive offices.
          </p>
        </div>
      </section>

      {/* Contact Information & Office Details */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* كارت القيادة التنفيذية مع شعار الشركة الرسمي */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200/80 flex items-center gap-6">
            <div className="w-16 h-16 relative rounded-2xl overflow-hidden shrink-0 border border-slate-100 bg-navy flex items-center justify-center shadow-sm">
              <Image
                src="/images/Logo5.png"
                alt="Cyril Financial Group Logo"
                fill
                className="object-contain p-2"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                Executive Leadership
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                Randa Zaky
              </h2>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                Chief Executive Operation
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* بطاقة معلومات التواصل المباشر */}
            <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Executive Contact Channels</h2>
                <p className="text-slate-500 text-sm">Direct lines to our operations and advisory teams.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* البريد الإلكتروني */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</h3>
                    <a href="mailto:Rzaky@CyrilFinancial.com" className="text-sm font-bold text-slate-900 hover:underline break-all mt-1 block">
                      Rzaky@CyrilFinancial.com
                    </a>
                  </div>
                </div>

                {/* الموقع الإلكتروني */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Official Website</h3>
                    <a href="https://www.Cyrilfinancial.com" target="_blank" rel="noreferrer" className="text-sm font-bold text-slate-900 hover:underline mt-1 block">
                      www.Cyrilfinancial.com
                    </a>
                  </div>
                </div>

              </div>

              {/* أرقام الهواتف التفصيلية */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Direct Telephone Lines</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-700 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                    <span className="text-slate-400 font-bold">Office (O):</span>
                    <a href="tel:+19497776516" className="text-slate-900 hover:underline font-bold">+1 (949) 777-6516</a>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                    <span className="text-slate-400 font-bold">Direct (D):</span>
                    <a href="tel:+19497775074" className="text-slate-900 hover:underline font-bold">+1 (949) 777-5074</a>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200/60 sm:border-b-0">
                    <span className="text-slate-400 font-bold">Cell (C):</span>
                    <a href="tel:+19494260093" className="text-slate-900 hover:underline font-bold">+1 (949) 426-0093</a>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400 font-bold">Fax (F):</span>
                    <span className="text-slate-900 font-bold">+1 (949) 777-6479</span>
                  </div>
                </div>
              </div>

            </div>

            {/* بطاقة العنوان المكتبي */}
            <div className="bg-slate-900 text-white p-8 md:p-10 rounded-3xl shadow-lg flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Corporate Headquarters</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    2900 Bristol Street Building H,<br />
                    Suite 101, Costa Mesa, CA 92626
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Our offices are open to assist corporate partners, high-net-worth clients, and property buyers.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <AiSupportChat />
    </div>
  );
}