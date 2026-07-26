"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { 
  Mail,
  Phone,
  MapPin,
  Globe,
  ShieldCheck,
  Zap,
  Handshake,
  Plus,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-navy">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-navy py-24 px-6 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-[-20%] right-[-10%] w-[40rem] h-[40rem] bg-gray-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-block px-5 py-1.5 bg-white/10 border border-white/20 text-white rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            Our Story
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Excellence in <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">Mortgage Lending</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            At Cyril Financial Group (CFG), we are dedicated to empowering homeowners and investors through transparent, tailored, and secure financial solutions. 
          </p>
        </div>
      </section>

      {/* Executive Team Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy">Executive Leadership</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">
              Meet the experts driving our vision forward. Our leadership team brings decades of experience in real estate finance and investment strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Randa Zaky - Executive Card */}
            <div className="bg-gray-50 rounded-3xl p-1 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group">
              <div className="bg-white rounded-[22px] p-8 h-full flex flex-col relative overflow-hidden">
                
                {/* Profile Header */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center shadow-md border-2 border-gray-200 flex-shrink-0">
                    <span className="text-xl font-black text-white">RZ</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-navy group-hover:text-blue-800 transition-colors">
                      Randa Zaky
                    </h3>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
                      Chief Executive Operation
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 mb-6"></div>

                {/* Contact Details */}
                <div className="space-y-4 flex-1">
                  
                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-navy mt-0.5 shrink-0" />
                    <a href="mailto:Rzaky@CyrilFinancial.com" className="text-xs font-medium text-navy hover:underline break-all">
                      Rzaky@CyrilFinancial.com
                    </a>
                  </div>

                  {/* Phone Numbers */}
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-navy mt-0.5 shrink-0" />
                    <div className="text-xs text-gray-600 space-y-1.5 font-medium">
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-400 w-4">(O)</span>
                        <a href="tel:+19497776516" className="hover:text-navy transition">+1 (949) 777-6516</a>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-400 w-4">(D)</span>
                        <a href="tel:+19497775074" className="hover:text-navy transition">+1 (949) 777-5074</a>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-400 w-4">(C)</span>
                        <a href="tel:+19494260093" className="hover:text-navy transition">+1 (949) 426-0093</a>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-400 w-4">(F)</span>
                        <span>+1 (949) 777-6479</span>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3 pt-2">
                    <MapPin className="w-4 h-4 text-navy mt-0.5 shrink-0" />
                    <p className="text-xs text-gray-600 font-medium leading-relaxed">
                      2900 Bristol Street Building H,<br />
                      Suite 101, Costa Mesa, CA 92626
                    </p>
                  </div>
                </div>

                {/* Social & Web Links */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <a href="https://www.Cyrilfinancial.com" target="_blank" rel="noreferrer" className="text-[11px] font-bold text-navy hover:underline flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" /> www.Cyrilfinancial.com
                  </a>
                  <div className="flex gap-2 text-gray-400 text-xs items-center">
                    <svg className="w-4 h-4 cursor-pointer hover:text-navy transition fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <svg className="w-4 h-4 cursor-pointer hover:text-navy transition fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                </div>

              </div>
            </div>

            {/* Placeholder for future team members */}
            <div className="bg-gray-50 rounded-3xl border border-dashed border-gray-300 flex flex-col items-center justify-center p-8 text-center min-h-[400px] opacity-60">
              <div className="w-12 h-12 rounded-full bg-gray-200 mb-4 flex items-center justify-center text-gray-400">
                <Plus className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-gray-500">More Leaders</h4>
              <p className="text-xs text-gray-400 mt-2">Space reserved for expanding the executive team.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-navy text-white rounded-xl flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy">Unwavering Integrity</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              We operate with full transparency, ensuring our clients understand every aspect of their financial journey.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-navy text-white rounded-xl flex items-center justify-center shadow-sm">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy">Speed & Efficiency</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Leveraging the latest in fintech, we streamline the lending process from application to closing.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-navy text-white rounded-xl flex items-center justify-center shadow-sm">
              <Handshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy">Client-Centric Approach</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your goals are our priority. We tailor every loan program to fit your unique financial situation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}