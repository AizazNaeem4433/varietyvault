"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Add Firestore imports
import { auth, db } from "@/lib/firebase";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to save user to Firestore
  const createUserDocument = async (user: any, displayName: string) => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: displayName || user.displayName,
        email: user.email,
        role: "user", // Default role
        createdAt: new Date().toISOString(),
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      await createUserDocument(user, name);
      
      toast.success(`Welcome to Variety Vault, ${name}!`);
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      await createUserDocument(user, user.displayName || "");
      toast.success("Signed in with Google!");
      router.push("/");
    } catch (error) {
      toast.error("Google Auth failed.");
    }
  };

  // ... (Keep the same JSX as previous Signup Page)
  return (
    <main className="min-h-screen bg-[#111827] flex items-center justify-center p-4">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white w-full max-w-md p-8 md:p-12 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-[#111827] tracking-tight uppercase">Create Account</h1>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Full Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ali Ahmed" className="bg-gray-50 border-gray-200 rounded-xl h-12 focus:border-[#0F766E]" required />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="bg-gray-50 border-gray-200 rounded-xl h-12 focus:border-[#0F766E]" required />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border-gray-200 rounded-xl h-12 focus:border-[#0F766E]" required />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-[#0F766E] hover:bg-[#115E59] text-white py-6 rounded-xl font-bold uppercase tracking-widest transition-all active:scale-95">
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <div className="relative my-6 text-center">
          <span className="bg-white px-4 text-gray-400 text-[10px] uppercase font-black relative z-10">OR</span>
          <div className="absolute top-1/2 left-0 w-full h-1px bg-gray-100" />
        </div>

        <Button variant="outline" onClick={handleGoogleAuth} className="w-full border-gray-200 py-6 rounded-xl font-bold uppercase tracking-widest flex gap-3 text-xs">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" className="w-4 h-4" />
          Continue with Google
        </Button>

        <p className="text-center mt-8 text-sm text-gray-500">
          Already have an account? <Link href="/login" className="text-[#0F766E] font-bold">Sign In</Link>
        </p>
      </motion.div>
    </main>
  );
}