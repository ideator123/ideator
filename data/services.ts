export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "HOTEL GROUP BOOKINGS AND GROUND MANAGEMENT",
    description: "Comprehensive accommodation and ground management services",
    image: "/hotel_compressed.mp4"
  },
  {
    id: 2,
    title: "CORPORATE EVENTS & CONFERENCES", 
    description: "Professional gatherings that drive meaningful business connections",
    image: "/conference_compressed.mp4"
  },
  {
    id: 3,
    title: "PRODUCT LAUNCHES & BRAND ACTIVATIONS",
    description: "Strategic events that create buzz and elevate brand presence",
    image: "/productlaunch_compressed.mp4"
  },
  {
    id: 4,
    title: "EXHIBITIONS & BRANDING",
    description: "Impactful displays and experiences that showcase your brand",
    image: "/exhibition_compressed.mp4"
  },
  {
    id: 5,
    title: "CONCERTS & ARTIST MANAGEMENT",
    description: "End-to-end entertainment event and talent coordination",
    image: "/concerts_compressed.mp4"
  },
  {
    id: 6,
    title: "INTERNATIONAL TOURS AND EVENTS",
    description: "Expertly planned global business travel and events",
    image: "/tours_compressed.mp4"
  },
  {
    id: 7,
    title: "AWARD SHOWS & GALA DINNERS",
    description: "Prestigious ceremonies that celebrate achievement in style",
    image: "/awards_compressed.mp4"
  },
  {
    id: 8,
    title: "FASHION SHOWS & LIFESTYLE EVENTS",
    description: "Sophisticated showcases of style and luxury experiences",
    image: "/fashion_compressed.mp4"
  }
]; 