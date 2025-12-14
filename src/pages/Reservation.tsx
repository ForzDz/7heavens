import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Users, Phone, Mail, User, Calendar as CalendarIcon, Clock, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar } from "@/components/ui/calendar";
import interior4 from "@/assets/interior-4.jpeg";

const Reservation = () => {
  const { toast } = useToast();
  
  // State
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [guests, setGuests] = useState<string>("2");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const timeSlots = [
    "12:00", "12:30", "13:00", "13:30", "14:00",
    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) {
      toast({
        title: "Date et heure requises",
        description: "Veuillez sélectionner une date et une heure pour votre réservation.",
        variant: "destructive",
      });
      return;
    }

    // Phone validation: Starts with 05, 06, 07, or 04 and has exactly 10 digits
    const phoneRegex = /^(05|06|07|04)[0-9]{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "Numéro de téléphone invalide",
        description: "Le numéro doit commencer par 05, 06, 07 ou 04 et contenir 10 chiffres.",
        variant: "destructive",
      });
      return;
    }

    const formattedDate = format(date, "d MMMM yyyy", { locale: fr });
    
    // Create a stylized message
    // Simplified text-only version to avoid any encoding compatibility issues
    const rawMessage = `*NOUVELLE RÉSERVATION - 7 HEAVENS*\n\n` +
      `*Date:* ${formattedDate}\n` +
      `*Heure:* ${time}\n` +
      `*Couverts:* ${guests}\n\n` +
      `--------------------------------\n` +
      `*COORDONNÉES CLIENT*\n` +
      `*Nom:* ${formData.name}\n` +
      `*Tél:* ${formData.phone}\n` +
      `--------------------------------\n\n` +
      `En attente de confirmation...`;

    const encodedMessage = encodeURIComponent(rawMessage);

    // WhatsApp number: 213542552188
    window.open(`https://wa.me/213542552188?text=${encodedMessage}`, "_blank");

    toast({
        title: "Redirection vers WhatsApp",
        description: "Veuillez envoyer le message pré-rempli pour confirmer votre réservation.",
    });
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 sm:pt-64 pb-28 sm:pb-40 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={interior4}
            alt="Intérieur du restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
        <div className="container-custom relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-cream mt-3 sm:mt-4 mb-4 sm:mb-6"
          >
            <span className="gold-text">Réservation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-cream/70 max-w-2xl mx-auto text-sm sm:text-base px-4"
          >
            Réservez votre table et vivez une expérience gastronomique exceptionnelle.
          </motion.p>
        </div>
      </section>

      {/* Booking Interface */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column: Selection Steps */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Step 1: Date & Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-luxury p-6 sm:p-8 bg-card"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-foreground text-gold flex items-center justify-center font-serif text-xl font-bold">1</div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">Date et Heure</h2>
                </div>

                <div className="flex flex-col xl:flex-row gap-8">
                  {/* Calendar */}
                  <div className="flex-1">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-xl border bg-background/50 p-4 w-full flex justify-center"
                      classNames={{
                        head_cell: "text-muted-foreground w-10 font-normal text-[0.8rem]",
                        cell: "h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 hover:bg-gold/10 hover:text-gold rounded-md transition-colors",
                        day_selected: "bg-gold text-foreground hover:bg-gold hover:text-foreground focus:bg-gold focus:text-foreground font-bold",
                        day_today: "bg-secondary text-foreground font-semibold",
                      }}
                    />
                  </div>

                  {/* Time Slots */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Créneaux Disponibles</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTime(slot)}
                          className={`py-2 px-1 rounded-lg text-sm transition-all border ${
                            time === slot
                              ? "bg-gold text-foreground border-gold font-bold shadow-md"
                              : "bg-background border-border hover:border-gold/50 hover:text-gold"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {!date && (
                        <p className="text-xs text-muted-foreground mt-4 italic">Veuillez sélectionner une date pour voir les disponibilités.</p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Step 2: Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card-luxury p-6 sm:p-8 bg-card"
              >
                 <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-foreground text-gold flex items-center justify-center font-serif text-xl font-bold">2</div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">Vos Coordonnées</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Guests Selector */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <Users size={16} className="text-gold" />
                        Nombre de personnes
                    </label>
                    <select
                        name="guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="input-luxury appearance-none"
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "personne" : "personnes"}
                          </option>
                        ))}
                        <option value="10+">Plus de 10 personnes</option>
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Nom complet *</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Votre nom"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="input-luxury"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Téléphone *</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Votre numéro"
                            value={formData.phone}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                              setFormData({ ...formData, phone: val });
                            }}
                            className="input-luxury"
                            pattern="^(05|06|07|04)[0-9]{8}$"
                            maxLength={10}
                            required
                        />
                    </div>
                  </div>



                  <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2 mt-4 text-lg">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Confirmer la réservation
                  </button>
                  
                  {/* Call Button */}
                  <a 
                    href="tel:0556482798" 
                    className="w-full flex items-center justify-center gap-2 mt-3 py-3 rounded-md border-2 border-primary text-primary hover:bg-primary/5 transition-colors font-medium text-lg"
                  >
                    <Phone size={20} />
                    Appelez maintenant
                  </a>
                </form>
              </motion.div>
            </div>

            {/* Right Column: Sticky Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="card-luxury p-6 bg-card border-2 border-gold/10 relative overflow-hidden"
                >
                    {/* Decorative Circle */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full -mr-8 -mt-8" />

                    <h3 className="font-serif text-xl font-bold text-foreground mb-6 relative z-10">Ma Réservation</h3>

                    <div className="space-y-6 relative z-10">
                        {/* Date Summary */}
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 text-foreground">
                                <CalendarIcon size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gold uppercase tracking-wider mb-1">DATE</p>
                                <p className="text-foreground font-medium">
                                    {date ? format(date, "d MMMM yyyy", { locale: fr }) : "Non sélectionnée"}
                                </p>
                            </div>
                        </div>

                        {/* Time Summary */}
                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 text-foreground">
                                <Clock size={20} />
                            </div>
                             <div>
                                <p className="text-xs font-bold text-gold uppercase tracking-wider mb-1">HEURE</p>
                                <p className="text-foreground font-medium">
                                    {time || "--:--"}
                                </p>
                            </div>
                        </div>

                         {/* Guests Summary */}
                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 text-foreground">
                                <Users size={20} />
                            </div>
                             <div>
                                <p className="text-xs font-bold text-gold uppercase tracking-wider mb-1">INVITÉS</p>
                                <p className="text-foreground font-medium font-serif text-lg">
                                    {guests} {guests === "1" ? "Personne" : "Personnes"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border">
                        <div className="rounded-xl bg-secondary/50 p-4 border border-border/50">
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                <span className="font-bold text-foreground">Note:</span> Votre table sera réservée pendant 1h30. Merci d'arriver à l'heure.
                            </p>
                        </div>
                    </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Reservation;
