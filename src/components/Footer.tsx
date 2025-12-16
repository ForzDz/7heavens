import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import ItalianFlagBar from "./ItalianFlagBar";

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="container-custom py-10">
        {/* Main Footer Content - Always Side by Side */}
        <div className="flex flex-row justify-center items-start gap-6 sm:gap-12 max-w-4xl mx-auto">
          {/* Contact Info - Left */}
          <div className="text-left flex-shrink-0">
            <h4 className="font-serif text-base sm:text-lg font-semibold mb-3 sm:mb-4 gold-text">
              Contact
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-400">
                  Centre-ville, Oran, Algérie
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-gold flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-400">
                  +213 54 25 52 188
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-gold flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-400">
                  7.heaven.bistro@gmail.com
                </span>
              </li>
            </ul>
            
            {/* Social Icons */}
            <div className="flex gap-3 mt-4 sm:mt-6">
              <a
                href="https://www.instagram.com/7_heavens_restaurant/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-foreground transition-all"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a
                href="https://www.facebook.com/7heavens.restaurant"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-foreground transition-all"
                aria-label="Facebook"
              >
                <Facebook size={14} />
              </a>
              <a
                href="https://www.tiktok.com/@7.heavens.restaur?lang=fr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-foreground transition-all"
                aria-label="TikTok"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Vertical Separator Line - Always Visible */}
          <div className="w-px bg-white/10 self-stretch"></div>

          {/* Navigation - Right */}
          <div className="text-left flex-shrink-0">
            <h4 className="font-serif text-base sm:text-lg font-semibold mb-3 sm:mb-4 gold-text">
              Navigation
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: "Accueil", path: "/" },
                { name: "Notre Menu", path: "/menu" },
                { name: "Réservation", path: "/reservation" },
                { name: "Galerie", path: "/galerie" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-xs sm:text-sm text-gray-400 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Centered */}
        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/10 text-center">
          <p className="text-xs sm:text-sm text-gray-500 mb-2">
            © {new Date().getFullYear()} 7Heavens Restaurant. Tous droits réservés.
          </p>
          <ItalianFlagBar className="justify-center" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
