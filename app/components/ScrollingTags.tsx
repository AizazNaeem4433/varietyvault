"use client";

import { motion } from "framer-motion";
import { 
  Truck, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  PackageCheck, 
  Headphones, 
  BadgePercent 
} from "lucide-react";

const tags = [
  { icon: <Truck size={28} />, text: "Free Shipping" },
  { icon: <Clock size={28} />, text: "Fast Delivery" },
  { icon: <ShieldCheck size={28} />, text: "5 Years Guarantee" },
  { icon: <PackageCheck size={28} />, text: "Quality Assured" },
  { icon: <BadgePercent size={28} />, text: "Best Prices" },
  { icon: <CreditCard size={28} />, text: "Secure Payment" },
  { icon: <Headphones size={28} />, text: "24/7 Support" },
];

export default function ScrollingTags() {
  return (
    <div className="w-full bg-[#F3F4F6] py-10 border-y border-gray-200 overflow-hidden">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex gap-20 items-center" // Increased gap between items
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 30, // Slightly slower for better readability since it's bigger
            repeat: Infinity,
          }}
        >
          {/* Double the tags for the seamless loop */}
          {[...tags, ...tags].map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-5 text-[#111827] font-extrabold uppercase tracking-[0.15em] text-lg md:text-xl"
            >
              <span className="text-[#0F766E] drop-shadow-sm">
                {tag.icon}
              </span>
              {tag.text}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}