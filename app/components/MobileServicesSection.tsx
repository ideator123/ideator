"use client";

import React, { useState } from "react";
import { SERVICES } from "@/data/services";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";

const MobileServicesSection = () => {
  const [expandedServices, setExpandedServices] = useState<number[]>([]);

  const toggleService = (serviceId: number) => {
    setExpandedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <section 
      className="py-16 bg-[#efede7] lg:hidden" // Only show on mobile/tablet
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="bg-[#0a2449]/10 text-[#0a2449] mb-4 rounded-full px-4 py-2">
            Our Services
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a2449] mb-4">
            What We Do
          </h2>
          <p className="text-lg text-[#0a2449]/70 max-w-2xl mx-auto">
            Comprehensive event management services tailored to create unforgettable experiences across the globe.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-4">
          {SERVICES.map((service) => {
            const isExpanded = expandedServices.includes(service.id);
            const isVideo = service.image.endsWith('.mp4');
            
            return (
              <div 
                key={service.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                {/* Service Header - Always Visible */}
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleService(service.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#0a2449] mb-2 uppercase tracking-wide">
                        {service.title}
                      </h3>
                      <p className="text-[#0a2449]/70 text-sm">
                        {service.description}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-6 h-6 text-[#0a2449]/60" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-[#0a2449]/60" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expandable Media Section */}
                {isExpanded && (
                  <div className="border-t border-[#0a2449]/10">
                    <div className="relative aspect-video w-full overflow-hidden">
                      {isVideo ? (
                        <video
                          src={service.image}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Optional CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-[#0a2449]/60 text-sm">
            <div className="w-8 h-[1px] bg-[#0a2449]/30"></div>
            <span>Tap to explore each service</span>
            <div className="w-8 h-[1px] bg-[#0a2449]/30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileServicesSection; 