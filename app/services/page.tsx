'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Star, 
  ArrowRight, 
  CheckCircle,
  Sparkles,
  Award,
  Globe,
  Clock,
  Phone,
  Mail,
  Building2,
  Hotel,
  Presentation,
  Rocket,
  Store,
  Music,
  Plane,
  Trophy,
  Palette,
  Handshake,
  Lightbulb,
  ClipboardList,
  Target,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { SERVICES, Service } from '../../data/services';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const processSteps = [
  {
    step: 1,
    title: "Discovery & Consultation",
    description: "We begin with a comprehensive consultation to understand your vision, requirements, and objectives.",
    icon: <Handshake className="w-10 h-10 text-blue-500" />
  },
  {
    step: 2,
    title: "Concept Development",
    description: "Our creative team develops unique concepts and themes that align with your brand and goals.",
    icon: <Lightbulb className="w-10 h-10 text-purple-500" />
  },
  {
    step: 3,
    title: "Planning & Coordination",
    description: "Detailed planning including venue selection, vendor coordination, and timeline management.",
    icon: <ClipboardList className="w-10 h-10 text-green-500" />
  },
  {
    step: 4,
    title: "Execution & Management",
    description: "Seamless event execution with our experienced team managing every detail on the day.",
    icon: <Target className="w-10 h-10 text-red-500" />
  },
  {
    step: 5,
    title: "Post-Event Support",
    description: "Comprehensive follow-up including feedback collection and future event planning.",
    icon: <BarChart3 className="w-10 h-10 text-orange-500" />
  }
];

export default function ServicesPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      console.log('Attempting to import SERVICES...');
      console.log('SERVICES object:', SERVICES);
      console.log('SERVICES type:', typeof SERVICES);
      console.log('SERVICES length:', Array.isArray(SERVICES) ? SERVICES.length : 'Not an array');
      
      const data = SERVICES || [];
      console.log('Services imported successfully:', data.length, 'services found');
      console.log('First service:', data[0]);
      
      setServicesData(data);
    } catch (error) {
      console.error('Error importing services:', error);
      // Fallback services if import fails
      const fallbackData = [
        {
          id: 1,
          title: "HOTEL GROUP BOOKINGS AND GROUND MANAGEMENT",
          description: "Comprehensive accommodation and ground management services",
          image: "/hotel.mp4"
        },
        {
          id: 2,
          title: "CORPORATE EVENTS & CONFERENCES",
          description: "Professional gatherings that drive meaningful business connections",
          image: "/conference.mp4"
        },
        {
          id: 3,
          title: "PRODUCT LAUNCHES & BRAND ACTIVATIONS",
          description: "Strategic events that create buzz and elevate brand presence",
          image: "/productlaunch.mp4"
        }
      ];
      console.log('Using fallback services:', fallbackData.length, 'services');
      setServicesData(fallbackData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Map services to icons and additional details
  const servicesWithDetails = servicesData.map((service, index) => {
    console.log('Processing service:', service.title, 'at index:', index); // Debug log
    
    const icons = [
      <Hotel key="hotel" className="w-8 h-8" />,
      <Building2 key="corporate" className="w-8 h-8" />,
      <Rocket key="product" className="w-8 h-8" />,
      <Store key="exhibition" className="w-8 h-8" />,
      <Music key="concerts" className="w-8 h-8" />,
      <Plane key="tours" className="w-8 h-8" />,
      <Trophy key="awards" className="w-8 h-8" />,
      <Palette key="fashion" className="w-8 h-8" />
    ];

    const features = [
      [
        "Group Accommodation Booking",
        "Ground Transportation",
        "Venue Management",
        "Logistics Coordination",
        "Travel Arrangements",
        "24/7 Support"
      ],
      [
        "Conference Setup and Management",
        "Team Building Activities",
        "Gala Dinner",
        "Sales Meet",
        "Theme Based Events",
        "Beach Parties",
        "Offsite Events",
        "Networking Sessions"
      ],
      [
        "Strategic Planning",
        "Brand Activation",
        "Media Coordination",
        "Launch Campaigns",
        "Product Showcases",
        "Market Entry Events"
      ],
      [
        "Exhibition Design",
        "Booth Setup",
        "Brand Displays",
        "Interactive Experiences",
        "Visitor Engagement",
        "Lead Generation"
      ],
      [
        "Artist Management",
        "Concert Production",
        "Sound & Lighting",
        "Stage Management",
        "Crowd Control",
        "Performance Coordination"
      ],
      [
        "International Planning",
        "Travel Coordination",
        "Cultural Integration",
        "Local Partnerships",
        "Global Logistics",
        "Multi-Country Events"
      ],
      [
        "Award Ceremonies",
        "Gala Dinners",
        "Recognition Events",
        "Celebrity Management",
        "Red Carpet Events",
        "Prestige Venues"
      ],
      [
        "Fashion Shows",
        "Lifestyle Events",
        "Runway Productions",
        "Style Presentations",
        "Luxury Experiences",
        "Brand Collaborations"
      ]
    ];

    const durations = [
      "1-3 months planning",
      "2-6 months planning", 
      "3-8 months planning",
      "2-5 months planning",
      "4-10 months planning",
      "6-12 months planning",
      "3-8 months planning",
      "2-6 months planning"
    ];

    const capacities = [
      "50-500+ guests",
      "50-2000+ attendees",
      "100-5000+ attendees", 
      "100-10000+ visitors",
      "500-50000+ attendees",
      "20-1000+ guests",
      "100-2000+ guests",
      "200-5000+ attendees"
    ];

    return {
      ...service,
      icon: icons[index] || <Building2 key="default" className="w-8 h-8" />,
      features: features[index] || [],
      duration: durations[index] || "Custom planning",
      capacity: capacities[index] || "Custom capacity"
    };
  });

  console.log('Services with details:', servicesWithDetails); // Debug log

  return (
    <>
      <Header />
      
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div 
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-[#0a2449]/5 via-transparent to-transparent"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-conic from-[#0a2449]/10 via-transparent to-[#0a2449]/5"
          animate={{ 
            rotate: [0, 360] 
          }}
          transition={{ 
            duration: 60,
            repeat: Infinity,
            ease: "linear" 
          }}
        />
      </motion.div>

      <div className="min-h-screen bg-gradient-to-br from-[#efede7] via-[#f5f3ec] to-[#e8e5de] relative z-10">
        
        {/* Hero Section */}
        <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <Badge className="bg-[#0a2449]/10 text-[#0a2449] mb-4 md:mb-6 rounded-full px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm">
                Our Services
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#0a2449] mb-4 md:mb-6 leading-tight">
                Comprehensive Event
                <span className="block bg-gradient-to-r from-[#0a2449] to-[#1a3458] bg-clip-text text-transparent">
                  Planning Services
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[#0a2449]/70 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
                From intimate gatherings to grand celebrations, we transform your vision into extraordinary events that create lasting memories.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-[#0a2449] text-[#efede7] hover:bg-[#0a2449]/90 rounded-full group px-6 md:px-8 text-sm md:text-base">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button size="lg" variant="outline" className="border-[#0a2449] text-[#0a2449] hover:bg-[#0a2449] hover:text-[#efede7] rounded-full px-6 md:px-8 text-sm md:text-base">
                    View Our Work
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section 
          ref={sectionRef}
          className="py-12 md:py-20"
        >
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div 
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0a2449] mb-3 md:mb-4">
                What We Offer
              </h2>
              <p className="text-lg md:text-xl text-[#0a2449]/70 max-w-2xl mx-auto px-4">
                Discover our comprehensive range of event planning services designed to meet every occasion and requirement.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {isLoading ? (
                // Loading state
                <div className="col-span-full text-center py-12">
                  <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0a2449] mx-auto mb-4"></div>
                    <h3 className="text-xl font-bold text-[#0a2449] mb-2">Loading Services...</h3>
                    <p className="text-[#0a2449]/70">Please wait while we load our services.</p>
                  </div>
                </div>
              ) : servicesWithDetails && servicesWithDetails.length > 0 ? (
                servicesWithDetails.map((service, index) => (
                  <div
                    key={service.id}
                    className="group"
                  >
                    <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border border-white/60 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-3 h-full flex flex-col relative overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0a2449]/5 via-transparent to-[#0a2449]/3 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Icon Container */}
                      <div className="relative z-10 mb-4 md:mb-6">
                        <div className="bg-gradient-to-br from-[#0a2449]/10 to-[#0a2449]/5 rounded-xl md:rounded-2xl p-3 md:p-4 w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                          <div className="text-[#0a2449]">
                            {service.icon}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex-1 flex flex-col">
                        <h3 className="text-lg md:text-xl font-bold text-[#0a2449] mb-3 md:mb-4 text-center group-hover:text-[#1a3458] transition-colors duration-300">
                          {service.title}
                        </h3>
                        
                        <p className="text-[#0a2449]/70 mb-4 md:mb-6 flex-grow text-center leading-relaxed text-sm md:text-base">
                          {service.description}
                        </p>
                        
                        {/* Features List */}
                        <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                          {service.features && service.features.map((feature: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-2 md:gap-3 group/feature">
                              <div className="bg-green-500/10 rounded-full p-1 mt-0.5">
                                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 flex-shrink-0" />
                              </div>
                              <span className="text-[#0a2449]/80 text-xs md:text-sm leading-relaxed">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Duration & Capacity */}
                        <div className="bg-gradient-to-r from-[#0a2449]/5 to-[#0a2449]/10 rounded-lg md:rounded-xl p-3 md:p-4 mb-4 md:mb-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs md:text-sm text-[#0a2449]/70">
                            <div className="flex items-center gap-2">
                              <div className="bg-[#0a2449]/10 rounded-full p-1">
                                <Clock className="w-3 h-3 text-[#0a2449]" />
                              </div>
                              <span className="font-medium">{service.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="bg-[#0a2449]/10 rounded-full p-1">
                                <Users className="w-3 h-3 text-[#0a2449]" />
                              </div>
                              <span className="font-medium">{service.capacity}</span>
                            </div>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <Link href="/contact" className="mt-auto">
                          <Button className="w-full bg-gradient-to-r from-[#0a2449] to-[#1a3458] text-[#efede7] hover:from-[#1a3458] hover:to-[#0a2449] rounded-xl md:rounded-2xl group/button transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-sm md:text-base">
                            <span className="font-semibold">Get Quote</span>
                            <ArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4 group-hover/button:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Fallback content if services fail to load
                <div className="col-span-full text-center py-12">
                  <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-8">
                    <Building2 className="w-16 h-16 text-[#0a2449]/50 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-[#0a2449] mb-2">No Services Available</h3>
                    <p className="text-[#0a2449]/70">Please try refreshing the page or contact us directly.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 md:py-20 bg-white/50">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div 
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0a2449] mb-3 md:mb-4">
                Our Process
              </h2>
              <p className="text-lg md:text-xl text-[#0a2449]/70 max-w-2xl mx-auto px-4">
                A proven 5-step process that ensures your event is executed flawlessly from concept to completion.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
              {processSteps.map((step, index) => (
                <div
                  key={step.step}
                  className="text-center relative group"
                >
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#0a2449]/20 to-transparent z-0" />
                  )}
                  
                  <div className="relative z-10 bg-gradient-to-br from-white to-gray-50 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-110 border-2 border-[#0a2449]/10">
                    {step.icon}
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#0a2449] to-[#1a3458] rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mx-auto mb-3 md:mb-4 text-xs md:text-sm font-bold text-white shadow-lg">
                    {step.step}
                  </div>
                  
                  <h3 className="text-base md:text-lg font-bold text-[#0a2449] mb-2 md:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#0a2449]/70 text-xs md:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <motion.div 
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0a2449] mb-3 md:mb-4">
                Why Choose Ideator Events?
              </h2>
              <p className="text-lg md:text-xl text-[#0a2449]/70 max-w-2xl mx-auto px-4">
                Experience the difference that comes with years of expertise and a passion for creating extraordinary events.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {[
                {
                  icon: <Trophy className="w-8 h-8 md:w-10 md:h-10" />,
                  title: "Award-Winning Excellence",
                  description: "Recognized for outstanding event planning and flawless execution across all service categories"
                },
                {
                  icon: <Globe className="w-8 h-8 md:w-10 md:h-10" />,
                  title: "Global Expertise",
                  description: "Successfully delivered events across multiple countries with deep cultural understanding"
                },
                {
                  icon: <Sparkles className="w-8 h-8 md:w-10 md:h-10" />,
                  title: "Creative Innovation",
                  description: "Unique concepts and cutting-edge ideas that set your events apart from the competition"
                },
                {
                  icon: <Star className="w-8 h-8 md:w-10 md:h-10" />,
                  title: "Premium Service",
                  description: "Dedicated support and personalized attention throughout your entire event journey"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group w-full"
                >
                  <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col items-center text-center min-h-[200px] md:min-h-[220px]">
                    <div className="bg-gradient-to-br from-[#0a2449]/10 to-[#0a2449]/5 rounded-xl md:rounded-2xl p-2 md:p-3 lg:p-4 mb-3 md:mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-[#0a2449]">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-base md:text-lg lg:text-xl font-bold text-[#0a2449] mb-2 md:mb-3 lg:mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-[#0a2449]/70 leading-relaxed text-xs md:text-sm lg:text-base flex-1">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-[#0a2449]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#efede7] mb-4 md:mb-6">
                Ready to Create Something Extraordinary?
              </h2>
              <p className="text-lg md:text-xl text-[#efede7]/80 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
                Let's discuss your vision and turn it into an unforgettable event that exceeds all expectations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-[#efede7] text-[#0a2449] hover:bg-[#efede7]/90 rounded-full group px-6 md:px-8 text-sm md:text-base">
                    Start Planning
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4 text-[#efede7]/80 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+91 953 941 5214</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>hello@ideator.com</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
} 
