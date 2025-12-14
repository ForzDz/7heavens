import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import interior3 from "@/assets/interior-3.jpeg";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "Centre-ville, Oran, Algérie",
      subtext: "Près de la Place du 1er Novembre",
      href: "https://www.google.com/maps/search/?api=1&query=7+Heavens+12+Rue+Boudjellal+Ahmed+Oran",
      target: "_blank"
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "+213 54 25 52 188",
      subtext: "Disponible a tous les moments ",
      href: "tel:+213542552188"
    },
    {
      icon: Mail,
      title: "Email",
      content: "7heavens@gmail.com",
      subtext: "Réponse sous 24h",
      href: "mailto:7heavens@gmail.com"
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "9h00 - 22h00",
      subtext: "Ouvert tous les jours",
      href: "/#horaires"
    },
  ];

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src={interior3}
            alt="Intérieur du restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/80" />
        </div>
        <div className="container-custom text-center relative z-10 px-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-xs sm:text-sm font-medium"
          >
            Nous Contacter
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6"
          >
            <span className="gold-text">Contact</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-primary-foreground/70 max-w-2xl mx-auto text-sm sm:text-base px-4"
          >
            Une question, une suggestion ou envie de privatiser notre espace ? 
            N'hésitez pas à nous contacter.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-8">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const CardContent = (
                <div className="h-full">
                  <div className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <info.icon size={24} className="text-foreground" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {info.title}
                  </h3>
                  <p className="text-foreground font-medium">{info.content}</p>
                  <p className="text-muted-foreground text-sm mt-1">{info.subtext}</p>
                </div>
              );

              return info.href ? (
                <motion.a
                  key={info.title}
                  href={info.href}
                  target={info.target}
                  rel={info.target ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-luxury p-6 text-center block hover:-translate-y-2 transition-transform cursor-pointer group"
                >
                  {CardContent}
                </motion.a>
              ) : (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-luxury p-6 text-center h-full group"
                >
                  {CardContent}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-12 bg-background">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">
              Suivez-nous sur <span className="gold-text">Réseaux Sociaux</span>
            </h2>
            <div className="flex justify-center gap-6">
              <a
                href="https://www.instagram.com/7_heavens_restaurant/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border-2 border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-foreground transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Instagram"
              >
                <Instagram size={32} />
              </a>
              <a
                href="https://www.facebook.com/7heavens.restaurant"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border-2 border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-foreground transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Facebook"
              >
                <Facebook size={32} />
              </a>
              <a
                href="https://www.tiktok.com/@7.heavens.restaur?lang=fr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border-2 border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-foreground transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="TikTok"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map & Form */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="font-serif text-3xl font-bold text-foreground">
                Nous Trouver
              </h2>
              <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
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
              </div>
              <p className="text-muted-foreground">
                Situé au cœur d'Oran, notre restaurant est facilement accessible 
                en voiture ou en transport en commun. Un parking est disponible à proximité.
              </p>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Envoyez-nous un Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-luxury"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Votre email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-luxury"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Sujet"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-luxury"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Votre message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="input-luxury resize-none"
                  required
                />
                <button type="submit" className="btn-gold w-full sm:w-auto">
                  <Send size={18} className="mr-2" />
                  Envoyer le Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16 bg-foreground text-primary-foreground">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Préférez-vous <span className="gold-text">WhatsApp</span> ?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              Pour une réponse rapide, contactez-nous directement sur WhatsApp. 
              Notre équipe vous répondra dans les minutes qui suivent.
            </p>
            <a 
              href="https://wa.me/213542552188"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium bg-green-600 text-cream hover:bg-green-700 transition-all"
            >            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chatter sur WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
