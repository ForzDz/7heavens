import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const MapSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-xs sm:text-sm font-medium"
          >
            Localisation
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4"
          >
            Trouvez-nous
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto flex items-center justify-center gap-2"
          >
            <MapPin size={18} className="text-gold flex-shrink-0" />
            12 Rue Boudjellal Ahmed, Hai El Moudjahiddine, Oran
          </motion.p>
        </div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="rounded-2xl overflow-hidden shadow-xl border-2 border-gold/10 h-[400px] sm:h-[500px]"
        >
          <iframe
            src="https://maps.google.com/maps?q=7+Heavens+12+Rue+Boudjellal+Ahmed+Oran&t=&z=17&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation 7 Heavens Oran"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
