import React from "react";
import Image from "next/image";
import { Star, MapPin, Phone, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">About Mahi Sports Hub</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Your trusted partner in sports and fitness, serving the Indira Nagar community with premium gear and exceptional service.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src="https://picsum.photos/seed/storefront/800/800"
              alt="Mahi Sports Hub Store"
              fill
              className="object-cover"
            />
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Founded by <strong className="text-black">Ankur Srivastava</strong>, Mahi Sports Hub was born out of a deep passion for sports and a desire to provide the local community with high-quality equipment at affordable prices.
              </p>
              <p>
                Located in the heart of Indira Nagar, near Hanuman Mandir, we have grown over the past 5 years to become the go-to destination for athletes, fitness enthusiasts, and beginners alike.
              </p>
              <p>
                We believe that everyone should have access to the right gear to pursue their sporting dreams. That&apos;s why we carefully curate our inventory, ensuring we offer only authentic products from trusted brands.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <Star className="w-8 h-8 text-neon-green mb-4" />
                <h3 className="font-bold text-xl mb-2">4.8★ Rated</h3>
                <p className="text-gray-500">By over 100 happy customers in Lucknow.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <ShieldCheck className="w-8 h-8 text-neon-green mb-4" />
                <h3 className="font-bold text-xl mb-2">100% Authentic</h3>
                <p className="text-gray-500">Genuine products, guaranteed quality.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visit Us */}
      <div className="bg-gray-50 py-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12">Visit Our Store</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-neon-green/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-neon-green" />
              </div>
              <h3 className="font-bold text-lg mb-2">Location</h3>
              <p className="text-gray-600 text-center">
                C - 2028, Aravali Marg, near Hanuman Mandir, Block C, Indira Nagar, Lucknow
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-neon-green/10 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-8 h-8 text-neon-green" />
              </div>
              <h3 className="font-bold text-lg mb-2">Contact</h3>
              <p className="text-gray-600 text-center">
                +91 83829 08844<br />
                Call or WhatsApp us
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-neon-green/10 rounded-full flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-neon-green" />
              </div>
              <h3 className="font-bold text-lg mb-2">Hours</h3>
              <p className="text-gray-600 text-center">
                Open All Days<br />
                10:45 AM – 10:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
