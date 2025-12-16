import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import dishesVariety from "@/assets/dishes-variety.webp";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-background overflow-hidden">
      <div className="container-custom">
        {/* Mobile Section Header */}
        <div className="lg:hidden text-center mb-6">
          <span className="text-gold tracking-[0.2em] uppercase text-sm font-medium">
            NOTRE HISTOIRE
          </span>
          <div className="w-12 h-0.5 bg-gold mx-auto mt-2"></div>
        </div>

        <div className="block lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative lg:static rounded-3xl lg:rounded-none overflow-hidden lg:overflow-visible shadow-2xl lg:shadow-none mx-4 lg:mx-0">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0 h-full w-full lg:relative lg:h-auto lg:w-auto"
          >
            <div className="relative h-full lg:rounded-3xl lg:overflow-hidden lg:shadow-2xl">
              <img
                src={dishesVariety}
                alt="Nos plats signature"
                className="w-full h-full lg:aspect-[4/5] object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="lg:absolute lg:inset-0 lg:bg-gradient-to-t lg:from-foreground/20 lg:to-transparent" />
            </div>
            {/* Decorative Element - Desktop Only */}
            <div className="hidden lg:block absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gold/30 rounded-3xl -z-10" />
            <div className="hidden lg:block absolute -top-6 -left-6 w-24 h-24 gold-gradient rounded-2xl opacity-20 -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 space-y-6 p-6 pt-[240px] lg:p-0 lg:pt-0 bg-gradient-to-t from-black via-black/80 to-transparent lg:from-transparent lg:via-transparent lg:bg-none"
          >
            <span className="hidden lg:block text-gold tracking-[0.2em] uppercase text-sm font-medium">
              Notre Histoire
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white lg:text-foreground leading-tight">
              Une Passion pour{" "}
              <span className="gold-text">l'Excellence Italienne</span>
            </h2>
            <div className="space-y-4 text-white/90 lg:text-muted-foreground leading-relaxed">
              <p>
                Bienvenue au 7 Heavens, un sanctuaire gastronomique au cœur d'Oran 
                où l'authenticité italienne rencontre l'élégance moderne. Notre chef, 
                formé dans les meilleures cuisines d'Italie, apporte une passion 
                inégalée pour les saveurs traditionnelles.
              </p>
              <p className="hidden sm:block">
                Chaque plat raconte une histoire — des ingrédients frais soigneusement 
                sélectionnés, des recettes ancestrales revisitées avec créativité, 
                et une présentation qui ravit les yeux autant que les papilles.
              </p>
            </div>
            <div className="flex gap-8 pt-4">
              <div className="text-center">
                <span className="block font-serif text-4xl font-bold gold-text">5+</span>
                <span className="text-sm text-white/70 lg:text-muted-foreground">Années d'Excellence</span>
              </div>
              <div className="text-center">
                <span className="block font-serif text-4xl font-bold gold-text">50+</span>
                <span className="text-sm text-white/70 lg:text-muted-foreground">Plats Signature</span>
              </div>
              <div className="text-center">
                <span className="block font-serif text-4xl font-bold gold-text">1000+</span>
                <span className="text-sm text-white/70 lg:text-muted-foreground">Clients Satisfaits</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
