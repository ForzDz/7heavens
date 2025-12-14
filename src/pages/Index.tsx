import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import OpeningHoursSection from "@/components/OpeningHoursSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import MapSection from "@/components/MapSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <AboutSection />
      <OpeningHoursSection />
      <CTASection />
      <TestimonialsSection />
      <MapSection />
      <Footer />
    </main>
  );
};

export default Index;
