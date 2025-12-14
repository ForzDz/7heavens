import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Import existing images
import bruschetta from "@/assets/bruschetta.jpeg";
import burrataSalad from "@/assets/burrata-salad.jpeg";
import pastaPuttanesca from "@/assets/pasta-puttanesca.jpeg";
import peachBruschetta from "@/assets/peach-bruschetta.jpeg";
import burrataPesto from "@/assets/burrata-pesto.jpeg";
import burrataPomegranate from "@/assets/burrata-pomegranate.jpeg";
import dishesVariety from "@/assets/dishes-variety.jpeg";
import signatureSalad from "@/assets/signature-salad.jpeg";
import interior1 from "@/assets/interior-1.jpeg";

// Import all numbered images
import img1 from "@/assets/1.jpeg";
import img2 from "@/assets/2.jpeg";
import img3 from "@/assets/3.jpeg";
import img4 from "@/assets/4.jpeg";
import img5 from "@/assets/5.jpeg";
import img6 from "@/assets/6.jpeg";
import img7 from "@/assets/7.jpeg";
import img8 from "@/assets/8.jpeg";
import img9 from "@/assets/9.jpeg";
import img10 from "@/assets/10.jpeg";
import img11 from "@/assets/11.jpeg";
import img12 from "@/assets/12.jpeg";
import img13 from "@/assets/13.jpeg";
import img14 from "@/assets/14.jpeg";
import img15 from "@/assets/15.jpeg";
import img16 from "@/assets/16.jpeg";
import img17 from "@/assets/17.jpeg";
import img18 from "@/assets/18.jpeg";
import img19 from "@/assets/19.jpeg";
import img20 from "@/assets/20.jpeg";
import img21 from "@/assets/21.jpeg";
import img22 from "@/assets/22.jpeg";
import img23 from "@/assets/23.jpeg";
import img24 from "@/assets/24.jpeg";
import img25 from "@/assets/25.jpg";
import img26 from "@/assets/26.jpg";
import img27 from "@/assets/27.jpg";
import img28 from "@/assets/28.jpg";
import img29 from "@/assets/29.jpg";
import img30 from "@/assets/30.jpg";
import img31 from "@/assets/31.jpg";

interface MenuItemWithImage {
  name: string;
  description: string;
  price: string;
  image: string;
}

interface SimpleMenuItem {
  name: string;
  price: string;
}

interface MenuCategoryWithImages {
  title: string;
  icon: string;
  type: "with-images";
  items: MenuItemWithImage[];
}

interface SimpleMenuCategory {
  title: string;
  icon: string;
  type: "simple";
  items: SimpleMenuItem[];
  subcategories?: { title: string; items: SimpleMenuItem[] }[];
}

type MenuCategory = MenuCategoryWithImages | SimpleMenuCategory;

const menuData: MenuCategory[] = [
  {
    title: "Plats",
    icon: "🍖",
    type: "with-images",
    items: [
      { name: "Filet de bœuf", description: "Filet de bœuf tendre, cuisson au choix", price: "3500 DA", image: img5 },
      { name: "Lamb chops", description: "Côtelettes d'agneau, mashed potatoes", price: "2800 DA", image: img17 },
      { name: "Entrecôte", description: "Entrecôte grillée, cuisson au choix", price: "3200 DA", image: img29 },
      { name: "Piccata", description: "Poulet, câpres, citron, persil", price: "1500 DA", image: img12 },
      { name: "Panne", description: "Poulet, sauce champignons, tagliatelles, citron", price: "1600 DA", image: img16 },
      { name: "Suprême de poulet à la crème", description: "Poulet, sauce champignons", price: "1800 DA", image: img4 },
      { name: "Poulet à la Toscane", description: "Poulet, basilic, tomates cerises", price: "1800 DA", image: img8 },
      { name: "Poulet Parmigiana", description: "Poulet pané, sauce tomate, mozzarella", price: "1800 DA", image: img24 },
      { name: "Wok de bœuf", description: "Bœuf, légumes, sauce soja, miel", price: "1900 DA", image: img10 },
      { name: "Wok de poulet", description: "Poulet, légumes, sauce soja, miel", price: "1600 DA", image: img18 },
    ],
  },
  {
    title: "Pâtes",
    icon: "🍝",
    type: "with-images",
    items: [
      { name: "Pâtes bolognaises", description: "Sauce bolognaise maison, parmesan", price: "1400 DA", image: img26 },
      { name: "Pâtes aux crevettes", description: "Crevettes sautées, ail, huile d'olive", price: "1700 DA", image: img30 },
      { name: "Pâtes Alfredo aux champignons", description: "Sauce Alfredo crémeuse, champignons", price: "1600 DA", image: img27 },
      { name: "Pâtes fruits de mer", description: "Assortiment de fruits de mer frais", price: "2000 DA", image: img31 },
      { name: "Pâtes Burrata", description: "Burrata crémeuse, tomates cerises, basilic", price: "1600 DA", image: img25 },
      { name: "Pâtes Arrabiata", description: "Sauce tomate épicée, piment, ail", price: "900 DA", image: img14 },
      { name: "Pâtes au saumon frais", description: "Saumon frais, crème, aneth", price: "2500 DA", image: img15 },
      { name: "Pâtes thon et champignons", description: "Thon, champignons sautés, herbes", price: "1200 DA", image: img28 },
      { name: "Pâtes ricotta et légumes", description: "Ricotta crémeuse, légumes de saison", price: "1300 DA", image: img13 },
      { name: "Pâtes bœuf", description: "Émincé de bœuf, sauce au choix", price: "1700 DA", image: img3 },
      { name: "Spaghettis puttanesca", description: "Olives, câpres, tomates, anchois", price: "1400 DA", image: pastaPuttanesca },
    ],
  },
  {
    title: "Entrées",
    icon: "🥗",
    type: "with-images",
    items: [
      { name: "César", description: "Laitue, tomates cerises, croûtons, fromage, œufs, poulet", price: "1000 DA", image: img1 },
      { name: "Burrata", description: "Burrata, tomates cerises, fruits de saison, pesto", price: "1800 DA", image: burrataPomegranate },
      { name: "Stracciatella", description: "Stracciatella, tomates cerises, pesto", price: "1600 DA", image: burrataPesto },
      { name: "Houmous bowl", description: "Houmous, poivron, tomate, concombre, pois chiches, oignons", price: "1000 DA", image: img20 },
      { name: "Salade feta concombre", description: "Fromage feta, concombre, quinoa, menthe, radis", price: "1400 DA", image: img21 },
      { name: "Eggplant Caprese", description: "Aubergines grillées, mozzarella, tomate, basilic", price: "1200 DA", image: img22 },
      { name: "Healthy Mediterranean", description: "Tomates cerises, concombre, hummus, feta", price: "1100 DA", image: img23 },
    ],
  },
  {
    title: "Bruschetta",
    icon: "🍞",
    type: "with-images",
    items: [
      { name: "Avocats champignons", description: "Avocat crémeux, champignons sautés, herbes fraîches", price: "1600 DA", image: peachBruschetta },
      { name: "Feta au fruit", description: "Feta émiettée, fruits de saison, miel", price: "1300 DA", image: bruschetta },
      { name: "Stracciatella au tomate confit", description: "Stracciatella crémeuse, tomates confites, basilic", price: "1500 DA", image: burrataPesto },
    ],
  },
  {
    title: "Raviolis",
    icon: "🥟",
    type: "with-images",
    items: [
      { name: "Poulet sauce champignon", description: "Raviolis farcis au poulet, sauce aux champignons", price: "1000 DA", image: img7 },
      { name: "Bœuf sauce crémeuse", description: "Raviolis au bœuf, sauce crémeuse onctueuse", price: "1200 DA", image: img2 },
      { name: "Crevettes sauce crémeuse safran citron", description: "Raviolis aux crevettes, safran et citron", price: "1400 DA", image: img6 },
    ],
  },
  {
    title: "Risotto",
    icon: "🍚",
    type: "with-images",
    items: [
      { name: "Risotto au poulet", description: "Risotto crémeux, poulet grillé, parmesan", price: "1500 DA", image: img9 },
      { name: "Risotto aux crevettes", description: "Crevettes sautées, ail, persil", price: "1700 DA", image: img11 },
      { name: "Risotto pesto et burrata", description: "Pesto maison, burrata fondante", price: "1800 DA", image: img19 },
      { name: "Risotto au saumon", description: "Saumon frais, crème citronnée", price: "2500 DA", image: signatureSalad },
    ],
  },
  {
    title: "Sandwich",
    icon: "🥪",
    type: "simple",
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
    type: "simple",
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
    type: "simple",
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
    type: "simple",
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
    items: [],
  },
  {
    title: "Boissons Fraîches",
    icon: "🍹",
    type: "simple",
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
    items: [],
  },
];

const MenuItemCard = ({ item, index }: { item: MenuItemWithImage; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-gold/40 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10"
    >
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
          <h3 className="font-serif text-base sm:text-lg font-bold text-primary-foreground group-hover:text-gold transition-colors line-clamp-1">
            {item.name}
          </h3>
        </div>
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
          <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold gold-gradient text-foreground shadow-lg">
            {item.price}
          </span>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-2">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

const SimpleMenuList = ({ items }: { items: SimpleMenuItem[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
    {items.map((item, index) => (
      <motion.div
        key={item.name}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="flex justify-between items-center py-3 sm:py-4 px-3 sm:px-5 bg-card rounded-xl border border-border/50 hover:border-gold/40 hover:bg-gold/5 transition-all duration-300 group"
      >
        <span className="text-foreground font-medium group-hover:text-gold transition-colors text-sm sm:text-base pr-2">{item.name}</span>
        <span className="text-gold font-bold whitespace-nowrap text-xs sm:text-sm">{item.price}</span>
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
}) => (
  <motion.button
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`
      flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0
      ${isActive 
        ? 'bg-gold text-foreground shadow-lg shadow-gold/40 border-2 border-gold' 
        : 'bg-background/80 backdrop-blur-sm border-2 border-border/30 text-foreground hover:border-gold/50 hover:bg-gold/10 hover:shadow-md'
      }
    `}
  >
    <span className="text-base sm:text-lg">{category.icon}</span>
    <span className="font-semibold">{category.title}</span>
  </motion.button>
);

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Tous");
  
  const categories = useMemo(() => [
    { title: "Tous", icon: "✨" },
    ...menuData.map(cat => ({ title: cat.title, icon: cat.icon }))
  ], []);

  const filteredMenu = useMemo(() => {
    if (activeCategory === "Tous") return menuData;
    return menuData.filter(cat => cat.title === activeCategory);
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src={interior1}
            alt="Intérieur du restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/60 to-foreground/90" />
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
            className="text-primary-foreground/80 max-w-2xl mx-auto text-base sm:text-lg"
          >
            Des ingrédients frais, des recettes authentiques et une passion pour 
            l'excellence culinaire.
          </motion.p>
        </div>
      </section>

      {/* Category Filter Buttons */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur-xl border-b border-border/50 py-3 shadow-sm overflow-hidden">
        <div className="w-full relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-2 overflow-x-auto pb-2 px-4 sm:px-6 lg:px-8 scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
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
          
          {/* Premium Scroll Indicator - Mobile Only */}
          <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none sm:hidden z-10" />
          
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute right-3 top-[65%] -translate-y-1/2 z-20 pointer-events-none sm:hidden"
          >
            <motion.div 
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-1.5 bg-foreground/95 backdrop-blur-md border border-gold/50 px-3 py-1.5 rounded-full shadow-2xl shadow-black/50"
            >
              <span className="text-[10px] uppercase tracking-widest font-bold text-gold">Glissez</span>
              <ChevronRight size={12} className="text-gold" />
            </motion.div>
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
                      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                        {category.title}
                      </h2>
                      <div className="w-12 sm:w-16 h-1 gold-gradient mt-1.5 sm:mt-2 rounded-full" />
                    </div>
                    {category.title === "Pâtes" && (
                      <span className="hidden lg:inline-block ml-auto text-muted-foreground text-sm italic bg-muted px-4 py-2 rounded-full">
                        Spaghetti – Tagliatelles – Penne – Linguine
                      </span>
                    )}
                  </motion.div>

                  {category.type === "with-images" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                      {category.items.map((item, index) => (
                        <MenuItemCard key={item.name} item={item} index={index} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6 sm:space-y-8">
                      {category.subcategories ? (
                        category.subcategories.map((sub) => (
                          <div key={sub.title}>
                            <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
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
    </main>
  );
};

export default Menu;
