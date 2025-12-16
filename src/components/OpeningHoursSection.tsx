import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const OpeningHoursSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const hours = [
    { day: "LUNDI", time: "12h00 - 23h00" },
    { day: "MARDI", time: "12h00 - 23h00" },
    { day: "MERCREDI", time: "12h00 - 23h00" },
    { day: "JEUDI", time: "12h00 - 23h00" },
    { day: "VENDREDI", time: "18h00 - 23h00" },
    { day: "SAMEDI", time: "12h00 - 23h00" },
    { day: "DIMANCHE", time: "12h00 - 23h00" },
  ];

  return (
    <section id="horaires" ref={ref} className="section-padding bg-background relative overflow-hidden">
        {/* Subtle background glow similar to the image but in theme colors */}
        <div className="absolute top-1/2 left-0 w-1/2 h-full bg-gold/5 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-1/3 h-2/3 bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Title & Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center text-left"
          >
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-8 leading-tight">
              NOS <br />
              <span className="text-foreground/90">HORAIRES</span>
            </h2>

            <div className="space-y-6 text-foreground/80 text-lg font-light">
              <p className="font-medium text-gold">Ouverts midi et soir</p>

              <p className="font-medium text-foreground">Service continu le week-end</p>
              <p className="text-sm tracking-widest uppercase opacity-70 mt-4">100% fait maison</p>
            </div>
          </motion.div>

          {/* Right Column: Hours List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <ul className="space-y-0">
              {hours.map((item, index) => (
                <li key={item.day} className="group">
                  <div className="flex items-end justify-between py-4 border-b border-foreground/10 group-hover:border-gold/30 transition-colors">
                    <span className="font-serif text-sm font-semibold tracking-wider text-foreground uppercase">
                      {item.day}
                    </span>
                    <div className="flex-grow mx-4 mb-1 border-b border-dotted border-foreground/20 hidden sm:block"></div>
                    <span className="font-mono text-sm text-foreground/80">
                      {item.time}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex gap-8 mt-12 pt-4">
                <Link to="/menu" className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-foreground hover:text-gold transition-colors group">
                    VOIR LE MENU
                    <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link to="/contact" className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-foreground hover:text-gold transition-colors group">
                    VENIR NOUS VOIR
                    <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default OpeningHoursSection;
