import React from "react";
import Link from "next/link";
import { Star, MapPin, Phone, ShieldCheck, ArrowRight } from "lucide-react";
import SafeImage from "@/components/SafeImage";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="bg-black text-white py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-neon-green mb-2 block">
            5 Years in Indira Nagar, Lucknow
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold font-heading mb-4 uppercase">
            ABOUT MAHI <span className="text-neon-green">SPORTS HUB</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Elevating the game of every athlete in Uttar Pradesh with hand-selected cricket bats, specialized protective equipment, and custom sublimated jerseys.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
            <SafeImage
              src="/cat-bat.jpg"
              alt="Mahi Sports Hub Equipment Collection"
              fill
              className="object-cover"
            />
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-black mb-6 uppercase">
              OUR JOURNEY & MISSION
            </h2>
            <div className="space-y-6 text-base text-gray-700 leading-relaxed font-sans">
              <p>
                Founded by <strong className="text-black">Ankur Srivastava</strong>, Mahi Sports Hub began with a singular vision: to elevate the game of every cricketer in Indira Nagar and across Uttar Pradesh. Located near the Hanuman Mandir on Aravali Marg, we have spent 5 years evolving from a local store into a premier retail hub for professional gear.
              </p>
              <p>
                We believe that every athlete deserves access to authentic, hand-selected gear. We carefully curate our inventory to include top-grade English Willow, Kashmir Willow, and specialized protective gear from trusted manufacturers.
              </p>
              <p>
                Whether you need a custom-printed sublimated jersey with your team logo and number, bat oiling & knocking services, or reliable store pickup, Mahi Sports Hub provides professional advice and unmatched sports expertise.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <Star className="w-6 h-6 text-neon-green fill-black mb-2" />
                <h3 className="font-bold text-xl text-black font-mono">4.8★ Rating</h3>
                <p className="text-xs text-gray-600 mt-1">106+ Google reviews from local athletes.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <ShieldCheck className="w-6 h-6 text-neon-green mb-2" />
                <h3 className="font-bold text-xl text-black font-mono">100% Genuine</h3>
                <p className="text-xs text-gray-600 mt-1">Directly sourced equipment guaranteed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visit Us */}
      <div className="bg-gray-50 py-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-black mb-12 uppercase">
            VISIT OUR LUCKNOW STORE
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-8 bg-white rounded-2xl border border-gray-200">
              <div className="w-14 h-14 bg-black text-neon-green rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg text-black mb-2">Location</h3>
              <p className="text-gray-600 text-sm">
                C-2028, Aravali Marg, near Hanuman Mandir, Block C, Indira Nagar, Lucknow, UP 226016
              </p>
            </div>
            
            <div className="flex flex-col items-center p-8 bg-white rounded-2xl border border-gray-200">
              <div className="w-14 h-14 bg-black text-neon-green rounded-xl flex items-center justify-center mb-4">
                <Phone className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg text-black mb-2">Contact Store</h3>
              <p className="text-gray-600 text-sm font-mono">
                +91 83829 08844<br />
                mahisports1992@gmail.com
              </p>
            </div>

            <div className="flex flex-col items-center p-8 bg-white rounded-2xl border border-gray-200">
              <div className="w-14 h-14 bg-black text-neon-green rounded-xl flex items-center justify-center mb-4">
                <Star className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg text-black mb-2">Store Hours</h3>
              <p className="text-gray-600 text-sm font-mono">
                Open Daily All Week<br />
                10:45 AM – 10:30 PM
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white text-xs font-mono font-bold uppercase rounded-xl hover:bg-neon-green hover:text-black transition-colors"
            >
              Contact Us & Order Inquiry <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
