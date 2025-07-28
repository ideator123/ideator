import React from 'react';
import type { Service } from '@/data/services';

interface ServiceCardProps {
  service: Service;
  isActive?: boolean;
}

const ServiceCard = React.memo(({ service, isActive = false }: ServiceCardProps) => {
  const isVideo = service.image.endsWith('.mp4');
  
  return (
    <div
      className={`relative h-full aspect-[3/4] max-h-full ${
        isActive
          ? 'lg:h-auto lg:w-[750px] xl:w-[900px] 2xl:w-[1100px] max-w-none transition-all duration-300'
          : 'max-w-[350px] transition-all duration-300'
      }
      rounded-2xl overflow-hidden shadow-2xl shadow-black/50
      bg-gray-800`}
    >
      {isVideo ? (
        <video
          src={service.image}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider mb-2">
          {service.title}
        </h3>
        <p className="text-sm text-white/80">
          {service.description}
        </p>
      </div>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard; 