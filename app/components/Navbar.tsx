"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  LogOut, 
  LayoutDashboard, 
  ShieldCheck 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetTrigger 
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

const navLinks = [
  { name: "Categories", href: "/categories" },
  { name: "All Products", href: "/products" },
  { name: "Best Seller", href: "/best-sellers" },
  { name: "Contact Us", href: "/contact-us" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const { scrollY } = useScroll();
  const { user, role, logout } = useAuthStore();

  // 1. Smart Scroll Animation Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true); // Hide when scrolling down
    } else {
      setHidden(false); // Show when scrolling up
    }
  });

  // 2. Role-Based Check
  const isAdmin = user && role === "admin";

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm"
    >
      {/* Announcement Bar */}
      <div className="w-full bg-[#0F766E] text-white py-1.5 text-center text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
        Free Delivery All Over Pakistan
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Main Header Row */}
        <div className="flex items-center justify-between py-2 md:py-3 border-b border-gray-50">
          
          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Menu className="h-5 w-5 text-[#111827]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-white w-[280px]">
                <SheetHeader className="text-left border-b pb-4">
                  <SheetTitle className="text-[#111827] font-bold uppercase tracking-tighter">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-5 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-bold text-[#111827] hover:text-[#0F766E] transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  
                  {/* Secure Mobile User Section */}
                  <div className="pt-6 border-t border-gray-100 space-y-4">
                    {user ? (
                      <>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Account</p>
                        <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block text-sm font-bold text-[#111827]">Dashboard</Link>
                        {isAdmin && (
                          <Link href="/admin" onClick={() => setIsOpen(false)} className="block text-sm font-bold text-[#0F766E]">Admin Panel</Link>
                        )}
                        <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-bold text-red-600">
                          <LogOut size={16} /> Logout
                        </button>
                      </>
                    ) : (
                      <Link href="/login" onClick={() => setIsOpen(false)} className="text-sm font-bold text-[#0F766E] uppercase tracking-widest">Login / Register</Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Contact Info */}
          <div className="hidden md:block flex-1 text-[11px] font-bold text-[#6B7280] tracking-tight">
            CONTACT: <span className="text-[#111827]">+92 300 6056922</span>
          </div>

          {/* Logo - Optimized Size */}
          <div className="flex-1 flex justify-center">
            <Link href="/">
              <Image 
                src="/logo.png" 
                alt="Variety Vault PK Logo" 
                width={110} 
                height={45} 
                priority
                className="h-auto w-auto max-h-[40px] md:max-h-[55px]"
              />
            </Link>
          </div>

          {/* Action Group */}
          <div className="flex-1 flex justify-end items-center gap-1 md:gap-3">
            <button className="hover:text-[#0F766E] p-2 hidden sm:block transition-colors">
              <Search className="h-4.5 w-4.5 md:h-5 md:w-5 text-[#111827]" />
            </button>
            
            {/* User Profile / Auth Toggle */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-7 w-7 md:h-8 md:w-8 cursor-pointer border border-transparent hover:border-[#0F766E] transition-all">
                    <AvatarImage src={user.photoURL || ""} />
                    <AvatarFallback className="bg-[#0F766E] text-white text-[10px] font-bold uppercase">
                      {user.displayName?.charAt(0) || user.email?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52 mt-2 rounded-xl p-1.5 shadow-2xl border-gray-100">
                  <DropdownMenuLabel className="px-2 py-3">
                    <span className="block text-xs font-black text-[#111827] truncate uppercase tracking-tight">
                      {user.displayName || "User"}
                    </span>
                    <span className="block text-[10px] text-gray-400 font-medium truncate italic">{role}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-50" />
                  
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2 text-xs py-2 cursor-pointer font-bold text-[#111827]">
                      <LayoutDashboard size={14} className="text-gray-400" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  
                  {/* Only rendered if user has 'admin' role in Firestore */}
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center gap-2 text-xs py-2 cursor-pointer text-[#0F766E] font-black tracking-wide">
                        <ShieldCheck size={14} /> Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuSeparator className="bg-gray-50" />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-xs py-2 cursor-pointer text-red-600 font-bold focus:text-red-600 focus:bg-red-50">
                    <LogOut size={14} /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login" className="hover:text-[#0F766E] p-2 transition-colors">
                <User className="h-4.5 w-4.5 md:h-5 md:w-5 text-[#111827]" />
              </Link>
            )}

            {/* Cart Icon */}
            <Link href="/cart" className="relative hover:text-[#0F766E] p-2 transition-colors">
              <ShoppingCart className="h-4.5 w-4.5 md:h-5 md:w-5 text-[#111827]" />
              <span className="absolute top-1 right-1 bg-[#0F766E] text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center font-black">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex justify-center items-center gap-10 py-2.5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[11px] font-black text-[#111827] uppercase tracking-[0.15em] hover:text-[#0F766E] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}