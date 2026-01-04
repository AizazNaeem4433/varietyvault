"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, role, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || role !== "admin") {
        router.push("/"); // Send non-admins to home
      }
    }
  }, [user, role, loading, router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold uppercase tracking-widest text-[#0F766E]">Verifying Permissions...</div>;

  return user && role === "admin" ? <>{children}</> : null;
}