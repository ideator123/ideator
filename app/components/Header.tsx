"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-[#0a2449]/60 backdrop-blur-xl shadow-lg z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Ideator Events Logo"
              width={240}
              height={60}
              className="h-12 w-auto brightness-200"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <Link
              href="#about"
              className="text-[#efede7] hover:text-[#efede7]/80 transition-all duration-300 text-sm uppercase tracking-wider"
            >
              About
            </Link>
            <Link
              href="#services"
              className="text-[#efede7] hover:text-[#efede7]/80 transition-all duration-300 text-sm uppercase tracking-wider"
            >
              Services
            </Link>
            <Link
              href="#portfolio"
              className="text-[#efede7] hover:text-[#efede7]/80 transition-all duration-300 text-sm uppercase tracking-wider"
            >
              Portfolio
            </Link>
            <Link
              href="#contact"
              className="text-[#efede7] hover:text-[#efede7]/80 transition-all duration-300 text-sm uppercase tracking-wider"
            >
              Contact
            </Link>
            <Button className="bg-[#efede7] hover:bg-[#efede7]/90 text-[#0a2449] px-8 py-2.5 rounded-full transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl">
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#efede7] hover:bg-[#efede7]/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 mt-4 border-t border-[#efede7]/10">
            <div className="flex flex-col space-y-6">
              <Link
                href="#about"
                className="text-[#efede7] hover:text-[#efede7]/80 transition-all duration-300 text-sm uppercase tracking-wider"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#services"
                className="text-[#efede7] hover:text-[#efede7]/80 transition-all duration-300 text-sm uppercase tracking-wider"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="#portfolio"
                className="text-[#efede7] hover:text-[#efede7]/80 transition-all duration-300 text-sm uppercase tracking-wider"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                href="#contact"
                className="text-[#efede7] hover:text-[#efede7]/80 transition-all duration-300 text-sm uppercase tracking-wider"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button className="bg-[#efede7] hover:bg-[#efede7]/90 text-[#0a2449] py-3 rounded-full transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl">
                Get in Touch
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header; 