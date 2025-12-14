import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Sarah B.",
    role: "Critique Gastronomique",
    content:
      "Une expérience culinaire exceptionnelle. Les saveurs sont authentiques, le service impeccable et l'ambiance absolument magnifique. Le meilleur restaurant italien d'Oran sans hésitation.",
    rating: 5,
  },
  {
    name: "Mohamed K.",
    role: "Client Fidèle",
    content:
      "Je reviens ici chaque semaine depuis 2 ans. La qualité reste constante, les plats sont toujours aussi délicieux. La burrata est un must absolu!",
    rating: 5,
  },
  {
    name: "Amina L.",
    role: "Événements Privés",
    content:
      "Nous avons célébré notre anniversaire de mariage ici. Le personnel a été aux petits soins, le repas était divin. Un cadre parfait pour les occasions spéciales.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="section-padding bg-secondary/30 text-white overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold tracking-[0.2em] uppercase text-sm font-medium">
            Témoignages
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2 text-white">
            Ce Que Disent Nos Clients
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="text-center px-8 md:px-16"
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} size={24} className="text-gold fill-gold" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed mb-8 text-white/90">
              "{testimonials[currentIndex].content}"
            </blockquote>

            {/* Author */}
            <div>
              <p className="font-semibold text-lg gold-text">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-gray-400 text-sm">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-gold w-6" : "bg-white/20"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
