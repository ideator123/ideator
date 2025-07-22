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
import ReactCountryFlag from "react-country-flag";
import Image from "next/image";

const Footer = () => {
  return (
    <footer id="contact" className="relative bg-[#0a2449] text-[#efede7] pt-24 pb-12">
      {/* Decorative wave at the top of the footer */}
      <div className="absolute inset-x-0 top-0 -translate-y-full pointer-events-none">
       
      </div>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3 lg:grid-cols-5 mb-16">
          <div className="lg:col-span-2">
            <Image  
              src="/logo.png"
              alt="Ideator Events Logo"
              width={240}
              height={60}
              className="h-12 w-auto brightness-100 mb-8"
            />
            <p className="text-[#efede7]/70 mb-8 leading-relaxed">
              We specialize in creating unforgettable global experiences. From
              idea to execution, we make your vision a reality.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 bg-[#efede7]/10 rounded-full hover:bg-[#efede7]/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-[#efede7]/10 rounded-full hover:bg-[#efede7]/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-[#efede7]/10 rounded-full hover:bg-[#efede7]/20 transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 text-[#efede7]">Quick Access</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#about" className="text-[#efede7]/70 hover:text-[#efede7] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-[#efede7]/70 hover:text-[#efede7] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="text-[#efede7]/70 hover:text-[#efede7] transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-[#efede7]/70 hover:text-[#efede7] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 text-[#efede7]">Our Services</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#services" className="text-[#efede7]/70 hover:text-[#efede7] transition-colors">
                  Hotel Group Bookings and Ground Management
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-[#efede7]/70 hover:text-[#efede7] transition-colors">
                  Corporate Events & Conferences
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-[#efede7]/70 hover:text-[#efede7] transition-colors">
                  Product Launches & Brand Activations
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-[#efede7]/70 hover:text-[#efede7] transition-colors">
                  Exhibitions & Branding
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-[#efede7]/70 hover:text-[#efede7] transition-colors">
                  Concerts & Artist Management
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-[#efede7]/70 hover:text-[#efede7] transition-colors">
                  International Tours and Events
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-[#efede7]/70 hover:text-[#efede7] transition-colors">
                  Award Shows & Gala Dinners
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-[#efede7]/70 hover:text-[#efede7] transition-colors">
                  Fashion Shows & Lifestyle Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 text-[#efede7]">Reach Us</h4>
            <div className="space-y-6">
              <div className="flex items-center group">
                <Mail className="w-5 h-5 mr-3 text-[#efede7]/40 group-hover:text-[#efede7] transition-colors" />
                <span className="text-[#efede7]/70 group-hover:text-[#efede7] transition-colors">
                  mail@ideator.events
                </span>
              </div>
              <div className="flex items-start group">
                <Phone className="w-5 h-5 mr-3 text-[#efede7]/40 group-hover:text-[#efede7] transition-colors mt-1" />
                <div className="text-[#efede7]/70 group-hover:text-[#efede7] transition-colors">
                  <div className="font-medium mb-2">India</div>
                  <div style={{ fontFamily: 'sans-serif' }}>+91 8113095333</div>
                  <div style={{ fontFamily: 'sans-serif' }}>+91 7498473667</div>
                  <div className="font-medium mt-4 mb-2">Dubai</div>
                  <div style={{ fontFamily: 'sans-serif' }}>+971 544631931</div>
                  <div style={{ fontFamily: 'sans-serif' }}>+971 524621635</div>
                </div>
              </div>
              <div className="flex items-start group">
                <MapPin className="w-5 h-5 mr-3 text-[#efede7]/40 group-hover:text-[#efede7] transition-colors mt-1" />
                <div className="text-[#efede7]/70 group-hover:text-[#efede7] transition-colors flex flex-col">
                  <div className="flex flex-col md:flex-row md:space-x-8 mb-4">
                    <div className="flex items-center space-x-1 mb-2 md:mb-0">
                      <ReactCountryFlag
                        countryCode="IN"
                        svg
                        className="w-5 h-5 mr-1"
                        title="India"
                        aria-label="India flag"
                      />
                      <span className="font-medium">India</span>
                    </div>
                    <div className="flex items-center space-x-1 mb-2 md:mb-0">
                      <ReactCountryFlag
                        countryCode="AE"
                        svg
                        className="w-5 h-5 mr-1"
                        title="UAE"
                        aria-label="UAE flag"
                      />
                      <span className="font-medium">UAE</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:space-x-8">
                    <div className="flex items-center space-x-1 mb-2 md:mb-0">
                      <ReactCountryFlag
                        countryCode="ID"
                        svg
                        className="w-5 h-5 mr-1"
                        title="Indonesia"
                        aria-label="Indonesia flag"
                      />
                      <span className="font-medium">Indonesia</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ReactCountryFlag
                        countryCode="TH"
                        svg
                        className="w-5 h-5 mr-1"
                        title="Thailand"
                        aria-label="Thailand flag"
                      />
                      <span className="font-medium">Thailand</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#efede7]/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#efede7]/40 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Ideator Events. All rights reserved.
            </p>
            <div className="flex space-x-8 text-sm">
              <Link href="#" className="text-[#efede7]/40 hover:text-[#efede7] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-[#efede7]/40 hover:text-[#efede7] transition-colors">
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