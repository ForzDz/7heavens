import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import interior2 from "@/assets/interior-2.webp";

const Galerie = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'interior' | 'dishes'>('all');
  const [visibleCount, setVisibleCount] = useState(12);

  // Dynamically load all images from assets
  const { allImages, interiorImages, dishesImages } = useMemo(() => {
    const modules = import.meta.glob('@/assets/*.{jpeg,jpg,png,webp}', { eager: true });
    
    const processedImages = Object.entries(modules)
      .filter(([path]) => !path.includes("logo") && !path.includes("reservation"))
      .map(([path, module]: [string, any]) => {
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

    return {
      allImages: processedImages,
      interiorImages: processedImages.filter(img => img.isInterior),
      dishesImages: processedImages.filter(img => !img.isInterior)
    };
  }, []);

  const displayedImages = useMemo(() => {
    switch(activeFilter) {
      case 'interior': return interiorImages;
      case 'dishes': return dishesImages;
      default: 
        // Pour "Tout Voir", mettre en priorité les images "food1" à "food13"
        const priorityImages = allImages.filter(img => img.src.includes('food'));
        const otherImages = allImages.filter(img => !img.src.includes('food'));
        
        // Mélanger les autres images pour la variété, mais garder les food en premier
        const shuffledOthers = [...otherImages].sort(() => Math.random() - 0.5);
        
        // Trier les images food par ordre numérique (food1, food2, ...)
        const sortedPriority = priorityImages.sort((a, b) => {
           const numA = parseInt(a.src.match(/food(\d+)/)?.[1] || "0");
           const numB = parseInt(b.src.match(/food(\d+)/)?.[1] || "0");
           return numA - numB;
        });

        return [...sortedPriority, ...shuffledOthers];
    }
  }, [activeFilter, allImages, interiorImages, dishesImages]);

  const handleFilterChange = (filter: 'all' | 'interior' | 'dishes') => {
    setActiveFilter(filter);
    setVisibleCount(12); // Reset visible count on filter change
  };

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

      {/* Main Gallery Section */}
      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          
          {/* Filter Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { id: 'all', label: 'Tout Voir' },
              { id: 'interior', label: 'Ambiance' },
              { id: 'dishes', label: 'Plats' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id as any)}
                className={`px-6 py-2 rounded-full border transition-all duration-300 font-medium ${
                  activeFilter === filter.id 
                    ? "bg-gold border-gold text-black" 
                    : "bg-transparent border-white/20 text-white hover:border-gold/50 hover:text-gold"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>

          {/* Image Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {displayedImages.slice(0, visibleCount).map((image, index) => (
                <motion.div
                  key={`${image.src}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 aspect-[4/3]"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white font-serif text-lg capitalize">
                      {image.alt.replace("Photo ", "")}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More Button */}
          {visibleCount < displayedImages.length && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-12"
            >
              <button 
                onClick={() => setVisibleCount(prev => prev + 12)}
                className="btn-gold px-8 py-3 text-lg"
              >
                Charger plus
              </button>
            </motion.div>
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
