import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import interior2 from "@/assets/interior-2.jpeg";

const Galerie = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [visibleInteriorCount, setVisibleInteriorCount] = useState(4);
  const [visibleDishesCount, setVisibleDishesCount] = useState(8);

  // Dynamically load all images from assets
  const { interiorImages, dishesImages } = useMemo(() => {
    const modules = import.meta.glob('@/assets/*.{jpeg,jpg,png,webp}', { eager: true });
    
    const allImages = Object.entries(modules)
      .filter(([path]) => !path.includes("logo") && !path.includes("reservation")) // Exclude logo and reservation
      .map(([path, module]: [string, any]) => {
         // Extract simple name for alt text
         const name = path.split('/').pop()?.split('.')[0] || "Galerie";
         return {
            src: module.default,
            alt: `Photo ${name.replace(/-/g, ' ')}`,
            category: "7 Heavens",
            isInterior: name.toLowerCase().includes('interior') || 
                       name.toLowerCase().includes('restaurant') ||
                       name.toLowerCase().includes('decoration')
         };
      });

    const interior = allImages.filter(img => img.isInterior);
    const dishes = allImages.filter(img => !img.isInterior);

    return {
      interiorImages: interior,
      dishesImages: dishes
    };
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src={interior2}
            alt="Intérieur du restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container-custom text-center relative z-10">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gold tracking-[0.2em] uppercase text-sm font-medium"
          >
            Notre Univers
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-5xl md:text-6xl font-bold mt-4 mb-6"
          >
            <span className="text-white">Galerie</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/90 max-w-2xl mx-auto"
          >
            Découvrez l'atmosphère unique de 7 Heavens à travers nos photos. 
            Une invitation visuelle à notre table.
          </motion.p>
        </div>
      </section>

      {/* Interior Section */}
      {interiorImages.length > 0 && (
        <section className="section-padding border-b border-border">
          <div className="container-custom max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-gold tracking-[0.2em] uppercase text-sm font-medium mb-2 block">
                Ambiance
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                Notre Restaurant
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez l'atmosphère chaleureuse et élégante de 7 Heavens
              </p>
            </motion.div>

            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {interiorImages.slice(0, visibleInteriorCount).map((image, index) => (
                  <motion.div
                    key={`interior-${image.src}-${index}`}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: (index % 4) * 0.1,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-all duration-500"
                    onClick={() => setSelectedImage(image.src)}
                  >
                    <div className="aspect-[4/3] md:aspect-[3/2]">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <motion.p 
                          initial={{ y: 10, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          className="text-cream font-serif text-xl md:text-2xl capitalize tracking-wide"
                        >
                          {image.alt.replace("Photo ", "")}
                        </motion.p>
                      </div>
                    </div>
                    <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/30 transition-all duration-500 rounded-2xl" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {visibleInteriorCount < interiorImages.length && (
              <div className="flex justify-center mt-12">
                <button 
                  onClick={() => setVisibleInteriorCount(interiorImages.length)}
                  className="btn-gold px-8 py-3 text-lg"
                >
                  Voir plus de photos
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Dishes Section */}
      {dishesImages.length > 0 && (
        <section className="section-padding">
          <div className="container-custom max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-gold tracking-[0.2em] uppercase text-sm font-medium mb-2 block">
                Nos Créations
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                Nos Plats
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Une sélection de nos spécialités culinaires préparées avec passion
              </p>
            </motion.div>

            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {dishesImages.slice(0, visibleDishesCount).map((image, index) => (
                  <motion.div
                    key={`dish-${image.src}-${index}`}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: (index % 4) * 0.1,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-all duration-500"
                    onClick={() => setSelectedImage(image.src)}
                  >
                    <div className="aspect-[4/3] md:aspect-[3/2]">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <motion.p 
                          initial={{ y: 10, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          className="text-cream font-serif text-xl md:text-2xl capitalize tracking-wide"
                        >
                          {image.alt.replace("Photo ", "")}
                        </motion.p>
                      </div>
                    </div>
                    <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/30 transition-all duration-500 rounded-2xl" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {visibleDishesCount < dishesImages.length && (
              <div className="flex justify-center mt-12">
                <button 
                  onClick={() => setVisibleDishesCount(dishesImages.length)}
                  className="btn-gold px-8 py-3 text-lg"
                >
                  Voir plus de plats
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-cream hover:text-gold transition-colors"
              aria-label="Fermer"
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Image agrandie"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
};

export default Galerie;
