import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import restaurantInterior from "@/assets/restaurant-interior.jpeg";

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[600px] sm:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={restaurantInterior}
          alt="7 Heavens Restaurant Interior"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-block text-gold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm font-medium mb-4 sm:mb-6"
          >
            Bienvenue chez
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-cream mb-4 sm:mb-6"
          >
            Cuisine Italienne{" "}
            <span className="gold-text">d'Exception</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base sm:text-lg md:text-xl text-cream/80 mb-8 sm:mb-10 max-w-2xl mx-auto px-4"
          >
            Restaurant Premium — Saveurs authentiques d'Italie dans un cadre luxueux
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
          >
            <Link to="/menu" className="btn-gold text-sm sm:text-base">
              Découvrir le Menu
            </Link>
            <Link to="/reservation" className="btn-outline-gold text-sm sm:text-base">
              Réserver une Table
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-cream/40 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
