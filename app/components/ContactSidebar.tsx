// components/contact/ContactSidebar.tsx
'use client';

import { motion, Variants } from 'framer-motion';

const sidebarVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};      

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function ContactSidebar() {
  const offices = [
    {
      city: 'Kochi',
      country: 'India',
      address: 'HIG 33, Panampalli Nager, Kochi, Kerala, India- 682036',
      phone: '+91 8113095333, +91 7498473667',
      email: 'kochi@ideatorevents.com',
      flag: '🇮🇳',
      timezone: 'IST (UTC+5:30)',
      featured: true
    },
    {
      city: 'Dubai',
      country: 'UAE',
      address: '122, Warba Centre, Al Murqabat, Deira, Dubai UAE',
      phone: '+971 544631931, +971 524621635',
      email: 'dubai@ideatorevents.com',
      flag: '🇦🇪',
      timezone: 'GST (UTC+4)'
    },
    {
      city: 'Bangkok',
      country: 'Thailand',
      address: 'Soi Ladprao 94, Ladprao Road,Phlapphla, Wangthonglang, Bangkok-10310.',
      phone: '',
      email: 'bangkok@ideatorevents.com',
      flag: '🇹🇭',
      timezone: 'ICT (UTC+7)'
    },
    {
      city: 'Bali',
      country: 'Indonesia',
      address: 'Jl. Gunung Tangkuban-Perahu, Bali 80117 -Indonesia',
      phone: '',
      email: 'bali@ideatorevents.com',
      flag: '🇮🇩',
      timezone: 'WITA (UTC+8)'
    }
  ];

  return (
    <motion.div 
      className="space-y-6"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      
      {/* Quick Contact */}
      <motion.div 
        className="relative group"
        variants={cardVariants} 
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className="absolute -inset-2 bg-gradient-to-br from-[#0a2449]/20 to-transparent rounded-3xl blur-xl"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="relative bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500">
          <motion.h3 
            className="text-2xl font-bold text-[#0a2449] mb-6 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="w-3 h-3 bg-[#0a2449] rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Quick Contact
          </motion.h3>
          
          <div className="space-y-6">
            {[
              { 
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                title: "Call Us",
                value: "+91 8113095333",
                action: "tel:+918113095333"
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Email Us",
                value: "mail@ideatorevents.com",
                action: "mailto:mail@ideatorevents.com"
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>        
                ),
                title: "Response Time",
                value: "Within 4 hours",
                action: null
              }
            ].map((contact, index) => (
              <motion.div 
                key={index} 
                className="group/item flex items-center space-x-4 p-4 rounded-2xl hover:bg-[#0a2449]/5 transition-all duration-300 cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="w-14 h-14 bg-gradient-to-br from-[#0a2449]/10 to-[#0a2449]/20 rounded-2xl flex items-center justify-center text-[#0a2449]"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {contact.icon}
                </motion.div>
                <div className="flex-1">
                  <p className="font-semibold text-[#0a2449] group-hover/item:text-[#0a2449]/80 transition-colors">
                    {contact.title}
                  </p>
                  <p className="text-[#0a2449]/70 group-hover/item:text-[#0a2449]/90 transition-colors">
                    {contact.action ? (
                      <a href={contact.action} className="hover:underline">
                        {contact.value}
                      </a>
                    ) : (
                      contact.value
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Global Offices */}
      <motion.div 
        className="relative group"
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className="absolute -inset-2 bg-gradient-to-br from-[#0a2449]/20 to-transparent rounded-3xl blur-xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <div className="relative bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500">
          <motion.h3 
            className="text-2xl font-bold text-[#0a2449] mb-6 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div 
              className="w-3 h-3 bg-[#0a2449] rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            Global Offices
          </motion.h3>
          
          <div className="space-y-4">
            {offices.map((office, index) => (
              <motion.div 
                key={office.city} 
                className={`group/office relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer p-6 ${
                  office.featured 
                    ? 'bg-gradient-to-r from-[#0a2449]/10 to-[#0a2449]/5 border-2 border-[#0a2449]/20' 
                    : 'hover:bg-[#0a2449]/5'
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ x: 5, scale: 1.02 }}
              >
                {office.featured && (
                  <motion.div 
                    className="absolute top-2 right-2 bg-[#0a2449] text-white text-xs px-2 py-1 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    HQ
                  </motion.div>
                )}
                
                <div className="flex items-start space-x-4">
                  <motion.span 
                    className="text-3xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {office.flag}
                  </motion.span>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#0a2449] group-hover/office:text-[#0a2449]/80 transition-colors text-lg">
                      {office.city}, {office.country}
                    </h4>
                    <p className="text-sm text-[#0a2449]/70 whitespace-pre-line mb-2 leading-relaxed">
                      {office.address}
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-[#0a2449]/60 bg-[#0a2449]/10 px-2 py-1 rounded-full">
                        {office.timezone}
                      </span>
                      {office.featured && (
                        <span className="text-[#0a2449] font-semibold">
                          📍 Headquarters
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Social Media */}
    
       
   
    </motion.div>
  );
}
