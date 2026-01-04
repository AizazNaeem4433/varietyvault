"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    id: 1,
    title: "Pakistan's Largest Online Variety Brand",
    subtitle: "Your daily dose of trendy essentials.",
    image: "/banner1.jpg", // Referenced from /public/hero-1.jpg
    cta: "See Collection",
    link: "/products",
  },
  {
    id: 2,
    title: "Premium Branded Cutlery",
    subtitle: "High-quality stainless steel for your home.",
    image: "/banner2.jpg", // Referenced from /public/hero-2.jpg
    cta: "See Collection",
    link: "/categories",
  },
];

export default function Hero() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  return (
    <section className="relative w-full overflow-hidden bg-[#F3F4F6] group">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              {/* Using standard Tailwind arbitrary values for height */}
              <div className="relative h-112.5 md:h-162.5 w-full flex items-center">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover object-center"
                />
                
                {/* Subtle Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-black/20" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-center md:text-left">
                  <div className="max-w-2xl space-y-6">
                    <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-md">
                      {slide.title.toUpperCase()}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 font-medium max-w-lg">
                      {slide.subtitle}
                    </p>
                    <div className="flex justify-center md:justify-start pt-4">
                      <Button 
                        asChild
                        className="bg-[#0F766E] hover:bg-[#115E59] text-white px-10 py-7 text-lg rounded-none transition-all uppercase tracking-widest"
                      >
                        <Link href={slide.link}>{slide.cta}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows: Visible on hover */}
        <div className="hidden md:block transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <CarouselPrevious className="absolute left-6 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/90 hover:bg-[#0F766E] hover:text-white border-none shadow-lg transition-all" />
          <CarouselNext className="absolute right-6 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/90 hover:bg-[#0F766E] hover:text-white border-none shadow-lg transition-all" />
        </div>
      </Carousel>
    </section>
  );
}