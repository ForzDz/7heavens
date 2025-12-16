import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Facebook, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import interior3 from "@/assets/interior-3.webp";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Le nom est requis";
        if (value.trim().length < 2) return "Le nom doit contenir au moins 2 caractères";
        return undefined;
      case "email":
        if (!value.trim()) return "L'email est requis";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Veuillez entrer un email valide";
        return undefined;
      case "subject":
        if (!value.trim()) return "Le sujet est requis";
        if (value.trim().length < 3) return "Le sujet doit contenir au moins 3 caractères";
        return undefined;
      case "message":
        if (!value.trim()) return "Le message est requis";
        if (value.trim().length < 10) return "Le message doit contenir au moins 10 caractères";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (key !== "botField") {
        const error = validateField(key, formData[key as keyof typeof formData]);
        if (error) {
          newErrors[key as keyof FormErrors] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez corriger les erreurs avant d'envoyer.",
        variant: "destructive",
      });
      return;
    }

    // Créer le message formaté pour WhatsApp
    const whatsappMessage = `*NOUVEAU MESSAGE DE CONTACT - 7 HEAVENS*\n\n` +
      `*Nom:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Sujet:* ${formData.subject}\n\n` +
      `--------------------------------\n` +
      `*MESSAGE:*\n` +
      `${formData.message}\n` +
      `--------------------------------\n\n` +
      `_Message envoyé depuis le site web_`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappNumber = "213542552188";

    // Ouvrir WhatsApp avec le message pré-rempli
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");

    toast({
      title: "Redirection vers WhatsApp",
      description: "Veuillez envoyer le message pré-rempli pour nous contacter.",
    });

    // Réinitialiser le formulaire
    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setTouched({});
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "12 Rue Boudjellal Ahmed",
      subtext: "Hai El Moudjahiddine, Oran, Algérie",
      href: "https://www.google.com/maps/search/?api=1&query=7+Heavens+12+Rue+Boudjellal+Ahmed+Oran",
      target: "_blank"
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "+213 54 25 52 188",
      subtext: "Disponible à tous moments",
      href: "tel:+213542552188"
    },
    {
      icon: Mail,
      title: "Email",
      content: "7.heaven.bistro@gmail.com",
      subtext: "Réponse sous 24h",
      href: "mailto:7.heaven.bistro@gmail.com"
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "12h00 - 23h00",
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
          <div className="absolute inset-0 bg-black/60" />
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
            <span className="text-white">Contact</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/90 max-w-2xl mx-auto text-sm sm:text-base px-4"
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
                href="https://www.facebook.com/profile.php?id=61558946881607"
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
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Situé au cœur d'Oran, notre restaurant est facilement accessible 
                  en voiture ou en transport en commun. Un parking est disponible à proximité.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=7+Heavens+12+Rue+Boudjellal+Ahmed+Oran"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-gold text-center"
                  >
                    <MapPin size={18} className="mr-2 inline" />
                    Ouvrir dans Google Maps
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                  Envoyez-nous un Message
                </h2>
                <p className="text-muted-foreground mb-4">
                  Remplissez le formulaire ci-dessous et envoyez-nous votre message directement sur WhatsApp.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">
                  <MessageCircle size={18} className="text-[#25D366]" />
                  <span>Votre message sera envoyé sur WhatsApp au numéro <strong className="text-foreground">+213 54 25 52 188</strong></span>
                </div>
              </div>
              
              <form 
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground block">
                      Nom complet <span className="text-gold">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Votre nom"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`input-luxury ${errors.name ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""} ${touched.name && !errors.name ? "border-green-500/50" : ""}`}
                        required
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {touched.name && !errors.name && formData.name && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={20} />
                      )}
                      {errors.name && (
                        <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive" size={20} />
                      )}
                    </div>
                    {errors.name && (
                      <p id="name-error" className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground block">
                      Email <span className="text-gold">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`input-luxury ${errors.email ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""} ${touched.email && !errors.email && formData.email ? "border-green-500/50" : ""}`}
                        required
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {touched.email && !errors.email && formData.email && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={20} />
                      )}
                      {errors.email && (
                        <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive" size={20} />
                      )}
                    </div>
                    {errors.email && (
                      <p id="email-error" className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground block">
                    Sujet <span className="text-gold">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      placeholder="Objet de votre message"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input-luxury ${errors.subject ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""} ${touched.subject && !errors.subject && formData.subject ? "border-green-500/50" : ""}`}
                      required
                      aria-invalid={errors.subject ? "true" : "false"}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                    />
                    {touched.subject && !errors.subject && formData.subject && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={20} />
                    )}
                    {errors.subject && (
                      <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive" size={20} />
                    )}
                  </div>
                  {errors.subject && (
                    <p id="subject-error" className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.subject}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground block">
                    Message <span className="text-gold">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Décrivez votre demande, question ou suggestion..."
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={6}
                      className={`input-luxury resize-none ${errors.message ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""} ${touched.message && !errors.message && formData.message ? "border-green-500/50" : ""}`}
                      required
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {touched.message && !errors.message && formData.message && (
                      <CheckCircle2 className="absolute right-3 top-3 text-green-500" size={20} />
                    )}
                    {errors.message && (
                      <AlertCircle className="absolute right-3 top-3 text-destructive" size={20} />
                    )}
                  </div>
                  {errors.message && (
                    <p id="message-error" className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {formData.message.length} caractères
                  </p>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  <MessageCircle size={20} />
                  Envoyer sur WhatsApp
                </button>
                
                <p className="text-xs text-muted-foreground text-center">
                  En cliquant sur "Envoyer sur WhatsApp", vous serez redirigé vers WhatsApp avec votre message pré-rempli.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>



      <Footer />
    </main>
  );
};

export default Contact;
