"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#efede7] text-[#0a2449] py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Image  
              src="/logo.png"
              alt="Ideator Events Logo"
              width={240}
              height={60}
              className="h-12 w-auto brightness-0 mb-8"
            />
            <p className="text-[#0a2449]/70 mb-8 leading-relaxed">
              We specialize in creating unforgettable global experiences. From
              idea to execution, we make your vision a reality.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-[#0a2449]/70 hover:text-[#0a2449] transition-colors">
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-[#0a2449]/70 hover:text-[#0a2449] transition-colors">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-[#0a2449]/70 hover:text-[#0a2449] transition-colors">
                <Youtube className="w-6 h-6" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 text-[#0a2449]">Quick Access</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#about" className="text-[#0a2449]/70 hover:text-[#0a2449] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-[#0a2449]/70 hover:text-[#0a2449] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="text-[#0a2449]/70 hover:text-[#0a2449] transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-[#0a2449]/70 hover:text-[#0a2449] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 text-[#0a2449]">Our Services</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-[#0a2449]/70 hover:text-[#0a2449] transition-colors">
                  Hotel Group Bookings and Ground Management
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#0a2449]/70 hover:text-[#0a2449] transition-colors">
                  Corporate Events & Conferences
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#0a2449]/70 hover:text-[#0a2449] transition-colors">
                  Product Launches & Brand Activations
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#0a2449]/70 hover:text-[#0a2449] transition-colors">
                  Exhibitions & Branding
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#0a2449]/70 hover:text-[#0a2449] transition-colors">
                  Concerts & Artist Management
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#0a2449]/70 hover:text-[#0a2449] transition-colors">
                  International Tours and Events
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#0a2449]/70 hover:text-[#0a2449] transition-colors">
                  Award Shows & Gala Dinners
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#0a2449]/70 hover:text-[#0a2449] transition-colors">
                  Fashion Shows & Lifestyle Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 text-[#0a2449]">Reach Us</h4>
            <div className="space-y-6">
              <div className="flex items-center group">
                <Mail className="w-5 h-5 mr-3 text-[#0a2449]/40 group-hover:text-[#0a2449] transition-colors" />
                <span className="text-[#0a2449]/70 group-hover:text-[#0a2449] transition-colors">
                  mail@ideator.events
                </span>
              </div>
              <div className="flex items-start group">
                <Phone className="w-5 h-5 mr-3 text-[#0a2449]/40 group-hover:text-[#0a2449] transition-colors mt-1" />
                <div className="text-[#0a2449]/70 group-hover:text-[#0a2449] transition-colors">
                  <div className="font-medium mb-2">India</div>
                  <div style={{ fontFamily: 'sans-serif' }}>+91 8113095333</div>
                  <div style={{ fontFamily: 'sans-serif' }}>+91 7498473667</div>
                  <div className="font-medium mt-4 mb-2">Dubai</div>
                  <div style={{ fontFamily: 'sans-serif' }}>+971 544631931</div>
                  <div style={{ fontFamily: 'sans-serif' }}>+971 524621635</div>
                </div>
              </div>
              <div className="flex items-start group">
                <MapPin className="w-5 h-5 mr-3 text-[#0a2449]/40 group-hover:text-[#0a2449] transition-colors mt-1" />
                <div className="text-[#0a2449]/70 group-hover:text-[#0a2449] transition-colors flex flex-col">
                  <div className="flex flex-col md:flex-row md:space-x-8 mb-4">
                    <div className="flex items-center space-x-1 mb-2 md:mb-0">
                      <span className="text-xl">🇮🇳</span>
                      <span className="font-medium">India</span>
                    </div>
                    <div className="flex items-center space-x-1 mb-2 md:mb-0">
                      <span className="text-xl">🇦🇪</span>
                      <span className="font-medium">UAE</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:space-x-8">
                    <div className="flex items-center space-x-1 mb-2 md:mb-0">
                      <span className="text-xl">🇮🇩</span>
                      <span className="font-medium">Indonesia</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xl">🇹🇭</span>
                      <span className="font-medium">Thailand</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#0a2449]/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#0a2449]/40 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Ideator Events. All rights reserved.
            </p>
            <div className="flex space-x-8 text-sm">
              <Link href="#" className="text-[#0a2449]/40 hover:text-[#0a2449] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-[#0a2449]/40 hover:text-[#0a2449] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;