"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Memoized sections to prevent re-renders
  const sections = useMemo(() => [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' }
  ], []);

  return (
    <nav className="fixed top-0 w-full bg-[#0a2449]/60 backdrop-blur-xl shadow-lg z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" prefetch={false}>
              <Image
                src="/logo.png"
                alt="Ideator Events Logo"
                width={240}
                height={60}
                className="h-12 w-auto brightness-200 cursor-pointer"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="text-[#efede7] hover:text-[#efede7]/80 transition-all duration-300 text-sm uppercase tracking-wider"
                prefetch={false}
              >
                {section.name}
              </Link>
            ))}
            <Link href="/contact" prefetch={false}>
              <Button className="bg-[#efede7] hover:bg-[#efede7]/90 text-[#0a2449] px-8 py-2.5 rounded-full transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl">
                Get in Touch
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#efede7] hover:bg-[#efede7]/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 mt-4 border-t border-[#efede7]/10">
            <div className="flex flex-col space-y-6">
              {sections.map((section) => (
                <Link
                  key={section.href}
                  href={section.href}
                  className="text-[#efede7] hover:text-[#efede7]/80 transition-all duration-300 text-sm uppercase tracking-wider"
                  onClick={() => setIsMenuOpen(false)}
                  prefetch={false}
                >
                  {section.name}
                </Link>
              ))}
              <Link href="/contact" prefetch={false}>
                <Button className="bg-[#efede7] hover:bg-[#efede7]/90 text-[#0a2449] py-3 rounded-full transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header; 