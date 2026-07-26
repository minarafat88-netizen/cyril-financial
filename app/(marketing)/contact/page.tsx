import React from "react";
import { Header } from "@/components/layout/header";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface font-sans">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row gap-12">
        
        {/* Contact Information */}
        <div className="w-full lg:w-1/3 space-y-8">
          <div>
            <div className="inline-block px-4 py-1.5 bg-silver-button border border-gray-300 text-navy rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm mb-4">
              Get in Touch
            </div>
            <h1 className="text-4xl font-black text-navy tracking-tight">Contact Our Experts</h1>
            <p className="text-sm text-gray-500 mt-4 leading-relaxed">
              Whether you are looking to purchase a new home, refinance an existing loan, or explore non-QM options, our advisory team is ready to help.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-navy text-lg">
                📍
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy">Corporate Office</h4>
                <p className="text-xs text-gray-500 mt-1">Century City, California<br/>United States</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-navy text-lg">
                📞
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy">Phone Support</h4>
                <p className="text-xs text-gray-500 mt-1">1-800-CFG-LOAN<br/>Mon-Fri, 9am - 6pm PST</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-navy text-lg">
                ✉️
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy">Email Inquiries</h4>
                <p className="text-xs text-gray-500 mt-1">advisors@cyrilfinancial.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full lg:w-2/3 bg-white p-8 md:p-10 rounded-3xl shadow-card-soft border border-gray-100">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Phone Number</label>
                <input type="tel" placeholder="(555) 123-4567" className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all" />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">How can we help?</label>
              <select className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all text-gray-600">
                <option>I have a question about Home Purchase</option>
                <option>I want to learn about Refinancing</option>
                <option>I need details on Jumbo or Non-QM Loans</option>
                <option>Other / General Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Additional Details</label>
              <textarea rows={4} placeholder="Tell us more about your financial goals..." className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all resize-none"></textarea>
            </div>

            <button type="submit" className="w-full md:w-auto px-8 bg-navy text-white font-bold py-4 rounded-xl text-sm shadow-md hover:bg-navy-light active:scale-95 transition-all">
              Send Message
            </button>
          </form>
        </div>

      </main>

    </div>
  );
}