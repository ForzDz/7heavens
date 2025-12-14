import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import interior2 from "@/assets/interior-2.jpeg";

const Galerie = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  // Dynamically load all images from assets
  const galleryImages = useMemo(() => {
    const modules = import.meta.glob('@/assets/*.{jpeg,jpg,png,webp}', { eager: true });
    
    const allImages = Object.entries(modules)
      .filter(([path]) => !path.includes("logo")) // Exclude logo
      .map(([path, module]: [string, any]) => {
         // Extract simple name for alt text
         const name = path.split('/').pop()?.split('.')[0] || "Galerie";
         return {
            src: module.default,
            alt: `Photo ${name.replace(/-/g, ' ')}`,
            category: "7 Heavens",
            isInterior: name.toLowerCase().includes('interior') || name.toLowerCase().includes('decoration')
         };
      });

    const interiorImages = allImages.filter(img => img.isInterior);
    const otherImages = allImages.filter(img => !img.isInterior);

    // Specific order: 2 Interior -> All Dishes -> Remaining Interior
    return [
        ...interiorImages.slice(0, 2),
        ...otherImages,
        ...interiorImages.slice(2)
    ];
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
          <div className="absolute inset-0 bg-foreground/80" />
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
            <span className="gold-text">Galerie</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-primary-foreground/70 max-w-2xl mx-auto"
          >
            Découvrez l'atmosphère unique de 7 Heavens à travers nos photos. 
            Une invitation visuelle à notre table.
          </motion.p>
        </div>
      </section>

      {/* Title Section (Replaces Filters) */}
      <section className="py-12 border-b border-border">
        <div className="container-custom text-center">
            <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-gold tracking-[0.2em] uppercase text-sm font-medium mb-2 block"
            >
                Portfolio
            </motion.span>
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="font-serif text-3xl md:text-5xl font-bold"
            >
                <span className="noir-text">Découvrez notre galerie</span>
            </motion.h2>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {galleryImages.slice(0, visibleCount).map((image, index) => (
                <motion.div
                  key={`${image.src}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: (index % 10) * 0.05 }}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                    index % 7 === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                  }`}
                  onClick={() => setSelectedImage(image.src)}
                >
                  <div className={`aspect-square ${index % 7 === 0 ? "sm:aspect-auto sm:h-full" : ""}`}>
                    <img
                      src={image.src}
                      alt={image.alt}
                       loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-cream font-serif text-lg capitalize">{image.alt.replace("Photo ", "")}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {visibleCount < galleryImages.length && (
            <div className="flex justify-center mt-12">
              <button 
                onClick={() => setVisibleCount(galleryImages.length)}
                className="btn-gold px-8 py-3 text-lg"
              >
                Voir plus d'images
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4 backdrop-blur-sm"
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
