"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Signed in successfully!");
      router.push("/");
    } catch (error: any) {
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed in with Google!");
      router.push("/");
    } catch (error) {
      toast.error("Google Authentication failed.");
    }
  };

  return (
    <main className="min-h-screen bg-[#111827] flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-md p-8 md:p-12 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-[#111827] tracking-tight uppercase">Welcome Back</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 tracking-widest">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="bg-gray-50 border-gray-200 rounded-xl h-12 focus:border-[#0F766E]" required />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 tracking-widest">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border-gray-200 rounded-xl h-12 focus:border-[#0F766E]" required />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-[#0F766E] hover:bg-[#115E59] text-white py-6 rounded-xl font-bold uppercase tracking-widest">
            {loading ? "Signing In..." : "Login"}
          </Button>
        </form>

        <div className="relative my-6 text-center">
          <span className="bg-white px-4 text-gray-400 text-[10px] uppercase font-black relative z-10">OR</span>
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100" />
        </div>

        <Button variant="outline" onClick={handleGoogleAuth} className="w-full border-gray-200 py-6 rounded-xl font-bold uppercase tracking-widest flex gap-3 text-xs transition-all hover:bg-gray-50">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" className="w-4 h-4" />
          Continue with Google
        </Button>

        <p className="text-center mt-8 text-sm text-gray-500">
          New here? <Link href="/signup" className="text-[#0F766E] font-bold">Create Account</Link>
        </p>
      </motion.div>
    </main>
  );
}