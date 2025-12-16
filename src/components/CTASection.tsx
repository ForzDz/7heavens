import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import reservationBg from "@/assets/reservation.webp";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={reservationBg}
          alt="Plat signature"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-gold tracking-[0.2em] uppercase text-sm font-medium">
            Réservation
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cream mt-4 mb-6">
            Réservez Votre Table{" "}
            <span className="gold-text">Maintenant</span>
          </h2>
          <p className="text-cream/80 text-lg mb-10">
            Vivez une expérience gastronomique inoubliable. Réservez dès maintenant 
            pour garantir votre table dans notre établissement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/reservation" className="btn-gold">
              Réserver une Table
            </Link>
            <Link to="/contact" className="btn-outline-gold">
              Nous Contacter
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
