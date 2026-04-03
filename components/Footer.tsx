import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="font-bold text-2xl tracking-tighter flex items-center gap-2 mb-6">
              <span className="text-neon-green">MAHI</span>
              <span>SPORTS</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Premium sports gear and equipment in Indira Nagar, Lucknow. Trusted by local athletes and fitness enthusiasts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-neon-green transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-neon-green transition-colors">Shop All</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-neon-green transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/checkout" className="text-gray-400 hover:text-neon-green transition-colors">Checkout</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-neon-green shrink-0 mt-0.5" />
                <span>C - 2028, Aravali Marg, near Hanuman Mandir, Block C, Indira Nagar, Lucknow, Uttar Pradesh 226016</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-neon-green shrink-0" />
                <a href="tel:+918382908844" className="hover:text-white transition-colors">+91 83829 08844</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Clock className="w-5 h-5 text-neon-green shrink-0" />
                <span>10:45 AM – 10:00 PM (All days)</span>
              </li>
            </ul>
          </div>

          {/* Map Embed */}
          <div className="h-48 rounded-lg overflow-hidden bg-gray-800">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.9882202672!2d80.9930!3d26.8720!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2c000000001%3A0x0!2zMjbCsDUyJzE5LjIiTiA4MMKwNTknMzQuOCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mahi Sports Hub Location"
            ></iframe>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Mahi Sports Hub. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Owned by Ankur Srivastava
          </p>
        </div>
      </div>
    </footer>
  );
}
