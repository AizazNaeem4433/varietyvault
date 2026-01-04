"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(5, "Message is too short"),
});

type ContactValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactValues) => {
    const promise = fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (!res.ok) throw new Error();
      return res.json();
    });

    toast.promise(promise, {
      loading: "Sending...",
      success: () => { reset(); return "Message sent!"; },
      error: "Failed to send.",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email</label>
        <Input 
          {...register("email")}
          placeholder="your@email.com" 
          className="bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] h-12 transition-all" 
        />
        {errors.email && <p className="text-red-500 text-[10px] ml-1">{errors.email.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Subject</label>
        <Input 
          {...register("subject")}
          placeholder="What is this about?" 
          className="bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] h-12 transition-all" 
        />
        {errors.subject && <p className="text-red-500 text-[10px] ml-1">{errors.subject.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Message</label>
        <Textarea 
          {...register("message")}
          placeholder="Type your message here..." 
          className="bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] min-h-[100px] resize-none transition-all" 
        />
        {errors.message && <p className="text-red-500 text-[10px] ml-1">{errors.message.message}</p>}
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-[#0F766E] hover:bg-[#115E59] text-white py-6 rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg shadow-[#0F766E]/30 transition-all hover:scale-[1.02] active:scale-95"
      >
        {isSubmitting ? "Sending..." : "Submit"}
      </Button>
    </form>
  );
}