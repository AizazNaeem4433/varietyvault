"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Clock, MessageSquare } from "lucide-react";
import ContactForm from "../components/contact/ContactForm";

const infoCards = [
  { icon: <Phone size={20} />, title: "Call Us", details: "+92 300 6056922" },
  { icon: <Mail size={20} />, title: "Email Us", details: "support@varietyvault.pk" },
  { icon: <Clock size={20} />, title: "Working Hours", details: "10 AM - 8 PM" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <section className="relative pt-20 pb-32 flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10"
        >
          <span className="text-[#0F766E] font-bold tracking-[0.4em] uppercase text-xs mb-2 block">
            Get in Touch
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-black tracking-tighter">
            LET&apos;S <span className="text-transparent stroke-text">TALK</span>
          </h1>
        </motion.div>

        {/* Floating Glow */}
        <div className="absolute top-0 w-full h-full bg-linear-to-b from-[#0F766E]/10 to-transparent pointer-events-none" />
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 pb-20 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Contact Info */}
          <div className="lg:col-span-5 space-y-4">
            {infoCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#1F2937] p-5 rounded-xl border border-gray-700 flex items-center gap-4 group"
              >
                <div className="bg-[#0F766E] p-3 rounded-lg text-white group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">{card.title}</h3>
                  <p className="text-white font-medium">{card.details}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side: The Form (Compact Design) */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-[#0F766E]/20 border border-gray-100"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#111827] tracking-tight">Send a message</h2>
              
              {/* Animated Scrolling Line */}
              <div className="relative w-32 h-1 bg-gray-100 mt-2 overflow-hidden rounded-full">
                <motion.div 
                  animate={{ x: [-128, 128] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-full bg-[#0F766E]"
                />
              </div>
            </div>

            <ContactForm />
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px #0F766E;
        }
      `}</style>
    </main>
  );
}