"use client";

import React, { useCallback, useEffect, useState, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from "lucide-react";
import { reviews } from "@/data/reviews";

export default function TestimonialCarousel() {
  const autoplay = useMemo(
    () => Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [autoplay]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    const updateSnaps = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    // Use microtask to avoid calling setState synchronously during the effect execution frame
    queueMicrotask(() => {
      updateSnaps();
    });

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", updateSnaps);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", updateSnaps);
    };
  }, [emblaApi]);

  return (
    <section className="py-16 bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-neon-green mb-2">
              <ShieldCheck className="w-4 h-4 text-neon-green" /> Verified Google Reviews (4.8★)
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tight">
              ATHLETE <span className="text-neon-green">FEEDBACK</span>
            </h2>
          </div>

          {/* Controls: Prev/Next Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="p-2.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-neon-green hover:bg-gray-800 transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="p-2.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-neon-green hover:bg-gray-800 transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-none w-full sm:w-1/2 lg:w-1/3 pl-4 min-w-0"
              >
                <div className="h-full bg-gray-900 border border-gray-800 p-6 rounded-2xl flex flex-col justify-between hover:border-gray-700 transition-colors relative group">
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-800 group-hover:text-neon-green/20 transition-colors pointer-events-none" />

                  <div>
                    {/* Stars and Tag */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-neon-green fill-neon-green" />
                        ))}
                      </div>
                      {review.tag && (
                        <span className="text-[10px] font-mono font-bold bg-black border border-gray-800 text-neon-green px-2 py-0.5 rounded">
                          {review.tag}
                        </span>
                      )}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-6 font-sans line-clamp-4">
                      &quot;{review.text}&quot;
                    </p>
                  </div>

                  {/* Reviewer Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800/80">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-neon-green text-black font-extrabold flex items-center justify-center text-xs font-mono">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm leading-none">{review.name}</p>
                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">Verified Local Athlete</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-gray-400">{review.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {scrollSnaps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === selectedIndex ? "w-8 bg-neon-green" : "w-2 bg-gray-800 hover:bg-gray-700"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
