import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useMemo, useEffect } from "react";
import { ChevronRight, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import interior1 from "@/assets/interior-1.jpeg";

// Import images d'échantillon pour les catégories
import cotelettesAagneau from "@/assets/cotelettes-agneau.png";
import pastaPuttanesca from "@/assets/pasta-puttanesca.jpeg";
import cesarSalad from "@/assets/cesar-salad.png";
import bruschettaPesto from "@/assets/bruschetta-pesto.png";
import raviolisPoulet from "@/assets/raviolis-poulet.png";
import risottoPesto from "@/assets/risotto-pesto-burrata.png";
import crepesPlaceholder from "@/assets/crepes-placeholder.svg";
import sandwichPlaceholder from "@/assets/sandwich-placeholder.svg";
import boissonsPlaceholder from "@/assets/boissons-placeholder.svg";
import boissonsFraichesPlaceholder from "@/assets/boissons-fraiches-placeholder.svg";


interface MenuItem {
  name: string;
  description?: string;
  price: string;
}

// Mapping des images d'échantillon pour chaque catégorie (une seule image par catégorie)
const categoryImages: Record<string, string> = {
  "Plats": cotelettesAagneau,
  "Pâtes": pastaPuttanesca,
  "Entrées": cesarSalad,
  "Bruschetta": bruschettaPesto,
  "Raviolis": raviolisPoulet,
  "Risotto": risottoPesto,
  "Sandwich": sandwichPlaceholder,
  "Burger": sandwichPlaceholder, // Utiliser sandwich comme placeholder
  "Crêpes": crepesPlaceholder,
  "Boissons Chaudes": boissonsPlaceholder,
  "Boissons Fraîches": boissonsFraichesPlaceholder,
};

interface MenuCategory {
  title: string;
  icon: string;
  displayMode: "cards" | "list";
  items: MenuItem[];
  subcategories?: { title: string; items: MenuItem[] }[];
}

const menuData: MenuCategory[] = [
  {
    title: "Plats",
    icon: "🍖",
    displayMode: "cards",
    items: [
      { name: "Filet de bœuf", description: "Filet de bœuf tendre, cuisson au choix", price: "3500 DA" },
      { name: "Lamb chops", description: "Côtelettes d'agneau, mashed potatoes", price: "2800 DA" },
      { name: "Entrecôte", description: "Entrecôte grillée, cuisson au choix", price: "3200 DA" },
      { name: "Piccata", description: "Poulet, câpres, citron, persil", price: "1500 DA" },
      { name: "Panne", description: "Poulet, sauce champignons, tagliatelles, citron", price: "1600 DA" },
      { name: "Suprême de poulet à la crème", description: "Poulet, sauce champignons", price: "1800 DA" },
      { name: "Poulet à la Toscane", description: "Poulet, basilic, tomates cerises", price: "1800 DA" },
      { name: "Poulet Parmigiana", description: "Poulet pané, sauce tomate, mozzarella", price: "1800 DA" },
      { name: "Wok de bœuf", description: "Bœuf, légumes, sauce soja, miel", price: "1900 DA" },
      { name: "Wok de poulet", description: "Poulet, légumes, sauce soja, miel", price: "1600 DA" },
    ],
  },
  {
    title: "Pâtes",
    icon: "🍝",
    displayMode: "cards",
    items: [
      { name: "Pâtes bolognaises", description: "Sauce bolognaise maison, parmesan", price: "1400 DA" },
      { name: "Pâtes aux crevettes", description: "Crevettes sautées, ail, huile d'olive", price: "1700 DA" },
      { name: "Pâtes Alfredo aux champignons", description: "Sauce Alfredo crémeuse, champignons", price: "1600 DA" },
      { name: "Pâtes fruits de mer", description: "Assortiment de fruits de mer frais", price: "2000 DA" },
      { name: "Pâtes Burrata", description: "Burrata crémeuse, tomates cerises, basilic", price: "1600 DA" },
      { name: "Pâtes Arrabiata", description: "Sauce tomate épicée, piment, ail", price: "900 DA" },
      { name: "Pâtes au saumon frais", description: "Saumon frais, crème, aneth", price: "2500 DA" },
      { name: "Pâtes thon et champignons", description: "Thon, champignons sautés, herbes", price: "1200 DA" },
      { name: "Pâtes ricotta et légumes", description: "Ricotta crémeuse, légumes de saison", price: "1300 DA" },
      { name: "Pâtes bœuf", description: "Émincé de bœuf, sauce au choix", price: "1700 DA" },
      { name: "Spaghettis puttanesca", description: "Olives, câpres, tomates, anchois", price: "1400 DA" },
    ],
  },
  {
    title: "Entrées",
    icon: "🥗",
    displayMode: "cards",
    items: [
      { name: "César", description: "Laitue, tomates cerises, croûtons, fromage, œufs, poulet", price: "1000 DA" },
      { name: "Burrata", description: "Burrata, tomates cerises, fruits de saison, pesto", price: "1800 DA" },
      { name: "Stracciatella", description: "Stracciatella, tomates cerises, pesto", price: "1600 DA" },
      { name: "Houmous bowl", description: "Houmous, poivron, tomate, concombre, pois chiches, oignons", price: "1000 DA" },
      { name: "Salade feta concombre", description: "Fromage feta, concombre, quinoa, menthe, radis", price: "1400 DA" },
      { name: "Eggplant Caprese", description: "Aubergines grillées, mozzarella, tomate, basilic", price: "1200 DA" },
      { name: "Healthy Mediterranean", description: "Tomates cerises, concombre, hummus, feta", price: "1100 DA" },
    ],
  },
  {
    title: "Bruschetta",
    icon: "🍞",
    displayMode: "cards",
    items: [
      { name: "Avocats champignons", description: "Avocat crémeux, champignons sautés, herbes fraîches", price: "1600 DA" },
      { name: "Feta au fruit", description: "Feta émiettée, fruits de saison, miel", price: "1300 DA" },
      { name: "Stracciatella au tomate confit", description: "Stracciatella crémeuse, tomates confites, basilic", price: "1500 DA" },
    ],
  },
  {
    title: "Raviolis",
    icon: "🥟",
    displayMode: "cards",
    items: [
      { name: "Poulet sauce champignon", description: "Raviolis farcis au poulet, sauce aux champignons", price: "1000 DA" },
      { name: "Bœuf sauce crémeuse", description: "Raviolis au bœuf, sauce crémeuse onctueuse", price: "1200 DA" },
      { name: "Crevettes sauce crémeuse safran citron", description: "Raviolis aux crevettes, safran et citron", price: "1400 DA" },
    ],
  },
  {
    title: "Risotto",
    icon: "🍚",
    displayMode: "cards",
    items: [
      { name: "Risotto au poulet", description: "Risotto crémeux, poulet grillé, parmesan", price: "1500 DA" },
      { name: "Risotto aux crevettes", description: "Crevettes sautées, ail, persil", price: "1700 DA" },
      { name: "Risotto pesto et burrata", description: "Pesto maison, burrata fondante", price: "1800 DA" },
      { name: "Risotto au saumon", description: "Saumon frais, crème citronnée", price: "2500 DA" },
    ],
  },
  {
    title: "Sandwich",
    icon: "🥪",
    displayMode: "cards",
    items: [
      { name: "Philly cheese steak", price: "1000 DA" },
      { name: "Steak au cheddar BBQ", price: "1300 DA" },
      { name: "Italien beef", price: "1500 DA" },
      { name: "Sandwich burrata", price: "1500 DA" },
      { name: "Sandwich poulet parmigiana", price: "900 DA" },
      { name: "Buffalo chicken", price: "800 DA" },
    ],
  },
  {
    title: "Burger",
    icon: "🍔",
    displayMode: "list",
    items: [
      { name: "Buffalo chicken", price: "700 DA" },
      { name: "Cheese burger", price: "800 DA" },
      { name: "Mushrooms", price: "900 DA" },
      { name: "La présidentiel", price: "1400 DA" },
      { name: "The Canadian", price: "900 DA" },
      { name: "Burger Heavens", price: "1600 DA" },
    ],
  },
  {
    title: "Crêpes",
    icon: "🥞",
    displayMode: "cards",
    items: [
      { name: "Classique (chocolat, nutella, chantilly)", price: "550 DA" },
      { name: "La Banana (chocolat, nutella, banane, chantilly)", price: "650 DA" },
      { name: "La Gourmand (nutella, banane, chocolat, framboise, boule de glace vanille)", price: "800 DA" },
      { name: "Sugar limon (citron, sucre glacé, chantilly)", price: "650 DA" },
      { name: "Caramella (caramel beurre salé, sucre glacé, chantilly)", price: "850 DA" },
      { name: "La bretonne (caramel beurre salé, banane, chantilly)", price: "1200 DA" },
    ],
  },
  {
    title: "Boissons Chaudes",
    icon: "☕",
    displayMode: "cards",
    items: [],
    subcategories: [
      {
        title: "Café",
        items: [
          { name: "Café machine", price: "250 DA" },
          { name: "Café capsue", price: "300 DA" },
          { name: "Macchiato (café avec mousse de lait)", price: "300 DA" },
          { name: "Café bonbón (café avec lait concentré)", price: "350 DA" },
          { name: "Café aromatisé (caramel/chocolat/vanille/noisette/caramel beurre salé)", price: "350 DA" },
          { name: "Café Latté (café au lait)", price: "350 DA" },
          { name: "Cortado (double espresso au lait)", price: "400 DA" },
          { name: "Cappuccino", price: "400 DA" },
          { name: "Laté Macchiato aromatisé (caramel/chocolat/vanille/noisette/caramel beurre salé)", price: "450 DA" },
        ],
      },
      {
        title: "Chocolat & Thé",
        items: [
          { name: "Chocolat chaud", price: "450 DA" },
          { name: "Chocolat viennois (extra chocolat avec crème chantilly)", price: "500 DA" },
          { name: "Mochaccino (cappuccino avec chocolat et crème chantilly)", price: "550 DA" },
          { name: "Thé infusion", price: "200 DA" },
          { name: "Supplément (Sirop/chantilly/chocolat)", price: "100 DA" },
        ],
      },
    ],
  },
  {
    title: "Boissons Fraîches",
    icon: "🍹",
    displayMode: "cards",
    items: [],
    subcategories: [
      {
        title: "Boissons de base",
        items: [
          { name: "Eau minérale", price: "100 DA" },
          { name: "Eau gazeuse", price: "150 DA" },
          { name: "Soda canette", price: "200 DA" },
          { name: "Soda 1L", price: "300 DA" },
          { name: "Menthe à l'eau (eau avec Sirop de menthe)", price: "150 DA" },
          { name: "Diabolo (eau gazeuse avec Stroop grenadine)", price: "200 DA" },
        ],
      },
      {
        title: "Jus",
        items: [
          { name: "Jus préssé", price: "400 DA" },
          { name: "Jus de fruit de saison", price: "550 DA" },
          { name: "Mix (fruits de saison)", price: "600 DA" },
        ],
      },
      {
        title: "Boissons glacées",
        items: [
          { name: "Café noir glacé", price: "300 DA" },
          { name: "Latte Macchiato glacé", price: "350 DA" },
          { name: "Latte aromatisé glacé", price: "450 DA" },
          { name: "Thé glacé", price: "450 DA" },
        ],
      },
      {
        title: "Milkshakes",
        items: [
          { name: "Simple (chocolat/vanille/caramel/fraise/banane)", price: "500 DA" },
          { name: "Fraise banane", price: "550 DA" },
          { name: "Chocolat banane", price: "550 DA" },
          { name: "Caramel beurre salé banane", price: "600 DA" },
          { name: "Healthy (banane, mélasse de dattes, noix)", price: "700 DA" },
        ],
      },
      {
        title: "Frappuccino",
        items: [
          { name: "Simple (chocolat/vanille/noisette/caramel)", price: "500 DA" },
          { name: "Mix (3 saveurs)", price: "600 DA" },
          { name: "Iced Mocha", price: "600 DA" },
        ],
      },
      {
        title: "Cocktails & Mocktails",
        items: [
          { name: "Mocktail Piña colada (ananas, lait de coco)", price: "650 DA" },
          { name: "Margarita (orange, citron, sucre roux)", price: "650 DA" },
          { name: "Bora Bora (ananas, fruit de la passion, grenadine)", price: "700 DA" },
          { name: "Paradise (mangue, ananas, framboise)", price: "750 DA" },
          { name: "Mojito (à base de citron et menthe et guarana)", price: "750 DA" },
          { name: "Mise (citron, menthe)", price: "500 DA" },
          { name: "Classique (eau guarana)", price: "600 DA" },
          { name: "Extra (fraise/fruits de bouji/framboise/fruits de la passion/bleu curaçao)", price: "650 DA" },
          { name: "Cuba (mojito avec coco)", price: "700 DA" },
          { name: "Energie (mojito avec boissons énergétiques)", price: "850 DA" },
        ],
      },
    ],
  },
];

const MenuItemCard = ({ item, index }: { item: MenuItem; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative bg-neutral-900/60 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-white/5 hover:border-gold/30 transition-all duration-300 hover:bg-neutral-900/80 hover:shadow-lg hover:shadow-gold/10"
    >
      {/* Header: Name and Price */}
      <div className="flex justify-between items-start gap-3 mb-3">
        <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-gold transition-colors duration-300 flex-1 min-w-0">
          {item.name}
        </h3>
        <span className="shrink-0 text-lg sm:text-xl font-serif font-bold text-gold whitespace-nowrap ml-2">
          {item.price}
        </span>
      </div>
      
      {/* Elegant gold separator line */}
      <div className="h-px bg-gradient-to-r from-gold/60 via-gold/40 to-transparent mb-4" />
      
      {/* Description */}
      {item.description && (
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light">
          {item.description}
        </p>
      )}
    </motion.div>
  );
};

const SimpleMenuList = ({ items }: { items: MenuItem[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
    {items.map((item, index) => (
      <motion.div
        key={item.name}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="flex items-end justify-between py-3 border-b border-white/10 hover:border-gold/30 group transition-colors px-2"
      >
        <div className="flex flex-col">
            <span className="text-white font-serif text-base sm:text-lg font-medium group-hover:text-gold transition-colors">{item.name}</span>
        </div>
        
        <div className="flex-grow mx-4 mb-1.5 border-b border-dotted border-white/20 hidden sm:block opacity-30 group-hover:border-gold/40 group-hover:opacity-60 transition-all"></div>
        
        <span className="text-[#D4AF37] font-serif font-bold whitespace-nowrap text-base sm:text-lg">{item.price}</span>
      </motion.div>
    ))}
  </div>
);

const CategoryButton = ({ 
  category, 
  isActive, 
  onClick 
}: { 
  category: { title: string; icon: string }; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  const isBoissons = category.title === "Boissons Chaudes" || category.title === "Boissons Fraîches";
  const boissonsParts = isBoissons ? category.title.split(" ") : null;
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center gap-0.5 px-3 sm:px-4 lg:px-5 py-2.5 rounded-full font-medium text-xs sm:text-sm lg:text-sm transition-all duration-300 w-full h-full min-h-[44px] sm:min-h-[48px]
        ${isActive 
          ? 'bg-gold text-black shadow-lg shadow-gold/40 border-2 border-gold' 
          : 'bg-neutral-900/80 backdrop-blur-sm border-2 border-white/10 text-white hover:border-gold/50 hover:bg-gold/10 hover:shadow-md'
        }
      `}
    >
      <span className="text-sm sm:text-base lg:text-lg flex-shrink-0">{category.icon}</span>
      {isBoissons && boissonsParts ? (
        <div className="flex flex-col items-center">
          <span className="font-semibold text-center leading-tight">{boissonsParts[0]}</span>
          <span className="font-semibold text-center leading-tight">{boissonsParts[1]}</span>
        </div>
      ) : (
        <span className="font-semibold text-center leading-tight">{category.title}</span>
      )}
    </motion.button>
  );
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<string>(menuData[0]?.title || "");
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const categories = useMemo(() => 
    menuData.map(cat => ({ title: cat.title, icon: cat.icon }))
  , []);

  const filteredMenu = useMemo(() => {
    return menuData.filter(cat => cat.title === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    // Vérifier immédiatement au chargement
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-neutral-950 overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 text-white">
        <div className="absolute inset-0">
          <img
            src={interior1}
            alt="Intérieur du restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
        </div>
        <div className="container-custom text-center relative z-10 px-4">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gold/20 text-gold tracking-[0.15em] uppercase text-xs font-semibold mb-4 sm:mb-6"
          >
            Gastronomie Italienne
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6"
          >
            Notre <span className="text-gold">Menu</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/90 max-w-2xl mx-auto text-base sm:text-lg"
          >
            Des ingrédients frais, des recettes authentiques et une passion pour 
            l'excellence culinaire.
          </motion.p>
        </div>
      </section>

      {/* Category Filter Buttons */}
      <section className="sticky top-16 z-30 bg-neutral-950/95 backdrop-blur-xl border-b border-white/5 py-3 sm:py-3 shadow-sm">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 sm:grid-cols-4 lg:flex lg:flex-wrap gap-2.5 sm:gap-3 lg:gap-3 items-stretch"
          >
            {categories.map((cat) => (
              <CategoryButton
                key={cat.title}
                category={cat}
                isActive={activeCategory === cat.title}
                onClick={() => setActiveCategory(cat.title)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="section-padding">
        <div className="container-custom px-4 sm:px-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredMenu.map((category) => (
                <div key={category.title} className="mb-12 sm:mb-16 last:mb-0">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4"
                  >
                    <span className="text-3xl sm:text-4xl">{category.icon}</span>
                    <div>
                      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                        {category.title}
                      </h2>
                      <div className="w-12 sm:w-16 h-1 gold-gradient mt-1.5 sm:mt-2 rounded-full" />
                    </div>
                    {category.title === "Pâtes" && (
                      <span className="hidden lg:inline-block ml-auto text-gray-400 text-sm italic bg-white/5 px-4 py-2 rounded-full">
                        Spaghetti – Tagliatelles – Penne – Linguine
                      </span>
                    )}
                  </motion.div>

                  {/* Image d'échantillon de la catégorie */}
                  {categoryImages[category.title] && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="mb-8 sm:mb-12 rounded-2xl overflow-hidden shadow-2xl"
                    >
                      <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
                        <img
                          src={categoryImages[category.title]}
                          alt={category.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </div>
                    </motion.div>
                  )}

                  {category.displayMode === "cards" ? (
                    <div className="space-y-4 sm:space-y-6">
                      {category.items.length > 0 && (
                        <div className="flex flex-col gap-3 sm:gap-4">
                          {category.items.map((item, index) => (
                            <MenuItemCard 
                              key={item.name} 
                              item={item} 
                              index={index} 
                            />
                          ))}
                        </div>
                      )}
                      {category.subcategories && category.subcategories.map((sub, subIndex) => (
                        <div key={sub.title} className="space-y-4 sm:space-y-6">
                          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full gold-gradient" />
                            {sub.title}
                          </h3>
                          <div className="flex flex-col gap-3 sm:gap-4">
                            {sub.items.map((item, index) => (
                              <MenuItemCard 
                                key={item.name} 
                                item={item} 
                                index={subIndex * 100 + index} 
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6 sm:space-y-8">
                      {category.subcategories ? (
                        category.subcategories.map((sub) => (
                          <div key={sub.title}>
                            <h3 className="font-serif text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full gold-gradient" />
                              {sub.title}
                            </h3>
                            <SimpleMenuList items={sub.items} />
                          </div>
                        ))
                      ) : (
                        <SimpleMenuList items={category.items} />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>


      <Footer />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 left-6 z-[100] flex flex-col items-center justify-center w-14 h-14 bg-gold text-black rounded-full shadow-2xl hover:shadow-gold/50 transition-all duration-300 group border-2 border-gold/20"
            aria-label="Retour en haut"
          >
            <ChevronUp size={20} className="group-hover:translate-y-[-2px] transition-transform duration-300 mb-0.5" strokeWidth={2.5} />
            <span className="text-[9px] font-bold uppercase tracking-wider">Menu</span>
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Menu;
