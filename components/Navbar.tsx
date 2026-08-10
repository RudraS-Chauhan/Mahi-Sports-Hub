"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Phone, Loader2, Scale } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCompare } from "@/context/CompareContext";
import SearchBar from "./SearchBar";
import SafeImage from "./SafeImage";

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const { comparedProducts, setIsCompareOpen } = useCompare();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [targetHref, setTargetHref] = useState<string | null>(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "Compare", href: "/compare" },
    { name: "Contact", href: "/contact" },
    { name: "About Us", href: "/about" },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (pathname === href && !isPending) {
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      return;
    }
    setTargetHref(href);
    startTransition(() => {
      router.push(href);
    });
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-black text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              onClick={(e) => handleNavClick(e, "/")}
              className="flex items-center group py-1"
            >
              <div className="relative h-10 w-48 sm:w-56 overflow-hidden">
                <SafeImage
                  src="/logo.png"
                  alt="Mahi Sports Hub Logo"
                  fill
                  priority
                  className="object-contain object-left group-hover:scale-105 transition-transform"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isNavigating = isPending && targetHref === link.href;

              return (
                <button
                  key={link.name}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3 py-2 rounded-lg text-sm font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive || isNavigating
                      ? "text-black bg-neon-green shadow-sm"
                      : "text-gray-300 hover:text-neon-green hover:bg-gray-900"
                  }`}
                >
                  {isNavigating && (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-black" />
                  )}
                  <span>{link.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md ml-2">
            <SearchBar />
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <a 
              href="tel:+918382908844" 
              className="hidden lg:flex items-center gap-2 text-xs font-mono text-gray-300 hover:text-neon-green transition-colors whitespace-nowrap bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-md"
            >
              <Phone className="w-3.5 h-3.5 text-neon-green" />
              <span>+91 83829 08844</span>
            </a>
            
            {/* Compare Button */}
            <button
              onClick={() => setIsCompareOpen(true)}
              className="relative p-2 text-gray-300 hover:text-neon-green transition-colors flex items-center gap-1.5 bg-gray-900 border border-gray-800 rounded-md px-2.5 py-1.5 text-xs font-mono font-bold"
              aria-label="Compare Products"
              title="Compare Products Matrix"
            >
              <Scale className="w-4 h-4 text-neon-green" />
              <span className="hidden sm:inline text-white">Compare</span>
              {comparedProducts.length > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono font-bold leading-none text-black bg-neon-green rounded-full">
                  {comparedProducts.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-300 hover:text-neon-green transition-colors flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-md px-3 py-1.5"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-neon-green" />
              <span className="text-xs font-bold font-mono text-white hidden sm:inline">Bag</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-mono font-bold leading-none text-black bg-neon-green rounded-full min-w-[20px]">
                  {cartCount}
                </span>
              )}
            </button>


            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-300 hover:text-white focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-gray-800 px-4 py-4 space-y-4">
          <SearchBar />
          <div className="space-y-2 pt-2 border-t border-gray-800">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isNavigating = isPending && targetHref === link.href;

              return (
                <button
                  key={link.name}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`w-full text-left px-4 py-3 rounded-md text-base font-bold transition-all flex items-center justify-between ${
                    isActive || isNavigating
                      ? "text-black bg-neon-green font-mono uppercase"
                      : "text-gray-200 hover:text-white hover:bg-gray-900"
                  }`}
                >
                  <span>{link.name}</span>
                  {isNavigating && <Loader2 className="w-4 h-4 animate-spin text-black" />}
                </button>
              );
            })}
            <a 
              href="tel:+918382908844" 
              className="px-3 py-2.5 rounded-md text-sm font-mono text-neon-green hover:bg-gray-900 flex items-center gap-2 border border-gray-800"
            >
              <Phone className="w-4 h-4" />
              Call Store: +91 83829 08844
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

