import { useState, useEffect, useCallback, type ReactNode } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, Youtube, Menu, X, Plus, Clock, Target, Sparkles, MessageCircle } from "lucide-react";

type Aspect = "9:16" | "16:9" | "4:5";

type Project = {
  id: number;
  title: string;
  tab: string;
  image: string;
  videoUrl?: string;
  videoAspect?: Aspect;
};

type Testimonial = { quote: string; name: string; role: string };

const portfolioTabs = ["ADS", "Podcast", "Reels", "Poker", "Miniatures"] as const;
type Tab = (typeof portfolioTabs)[number];

const tabDescriptions: Record<Tab, string> = {
  ADS: "Publicités et vidéos de vente pensées pour arrêter le scroll et faire passer à l'action.",
  Podcast: "Montage multicam, rythme et habillage pour des épisodes qu'on écoute jusqu'au bout.",
  Reels: "Formats courts verticaux, sous-titrés et rythmés pour TikTok, Reels et Shorts.",
  Poker: "Contenus longs YouTube : narration, tension et rétention sur toute la durée.",
  Miniatures: "Des miniatures YouTube conçues pour maximiser le taux de clic.",
};

const projects: Project[] = [
  { id: 34, title: "STUDERIA - 3 services IA que tu peux vendre cette semaine", tab: "ADS", image: "https://img.youtube.com/vi/6SME37ZUwQ0/hqdefault.jpg", videoUrl: "https://youtube.com/embed/6SME37ZUwQ0", videoAspect: "9:16" },
  { id: 35, title: "STUDERIA - 9 heures tu ouvres, 11 heures tu as fini", tab: "ADS", image: "https://img.youtube.com/vi/OP1p94RAiPM/hqdefault.jpg", videoUrl: "https://youtube.com/embed/OP1p94RAiPM", videoAspect: "9:16" },
  { id: 36, title: "STUDERIA - L'IA va remplacer les freelances", tab: "ADS", image: "https://img.youtube.com/vi/F0YvkNF6pzY/hqdefault.jpg", videoUrl: "https://youtube.com/embed/F0YvkNF6pzY", videoAspect: "9:16" },
  { id: 37, title: "Los Production - Tournée HOMMAGE BALAVOINE", tab: "Reels", image: "https://img.youtube.com/vi/gHT1DUOKm8Q/hqdefault.jpg", videoUrl: "https://youtube.com/embed/gHT1DUOKm8Q", videoAspect: "9:16" },
  { id: 38, title: "Marcuus Lawrence - E-commerce/Claude IA - Part.1", tab: "ADS", image: "https://img.youtube.com/vi/8hNIgLSpsZc/hqdefault.jpg", videoUrl: "https://youtube.com/embed/8hNIgLSpsZc", videoAspect: "9:16" },
  { id: 39, title: "Marcuus Lawrence - E-commerce/Claude IA - Part.2", tab: "ADS", image: "https://img.youtube.com/vi/LIGaltpxiaM/hqdefault.jpg", videoUrl: "https://youtube.com/embed/LIGaltpxiaM", videoAspect: "9:16" },
  { id: 40, title: "VIRALIZ - Margot 1", tab: "ADS", image: "https://img.youtube.com/vi/aPUL-6qtL_Y/hqdefault.jpg", videoUrl: "https://youtube.com/embed/aPUL-6qtL_Y", videoAspect: "9:16" },
  { id: 41, title: "VIRALIZ - Lou 1", tab: "ADS", image: "https://img.youtube.com/vi/QZyFpDE3PH4/hqdefault.jpg", videoUrl: "https://youtube.com/embed/QZyFpDE3PH4", videoAspect: "9:16" },
  { id: 42, title: "VIRALIZ - Keno 1", tab: "ADS", image: "https://img.youtube.com/vi/kphZx82C4I0/hqdefault.jpg", videoUrl: "https://youtube.com/embed/kphZx82C4I0", videoAspect: "9:16" },
  { id: 43, title: "Ben Study Tips - Rewordify", tab: "Reels", image: "https://img.youtube.com/vi/oGZGaMjaAUs/hqdefault.jpg", videoUrl: "https://youtube.com/embed/oGZGaMjaAUs", videoAspect: "9:16" },
  { id: 1, title: "Arthaud Immobilier - Carolin ARTHAUD", tab: "ADS", image: "https://img.youtube.com/vi/gEuay8qXhAU/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/gEuay8qXhAU", videoAspect: "16:9" },
  { id: 2, title: "GIANTS - Jean-Christophe CONTICELLO - 16:9", tab: "ADS", image: "https://img.youtube.com/vi/1OrTTVlXfNg/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/1OrTTVlXfNg", videoAspect: "16:9" },
  { id: 3, title: "GIANTS - Jean-Christophe CONTICELLO - 9:16", tab: "ADS", image: "https://img.youtube.com/vi/UOaFdANIvdU/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/UOaFdANIvdU", videoAspect: "9:16" },
  { id: 4, title: "Papa In Shape - Pierre BOUIN", tab: "ADS", image: "https://img.youtube.com/vi/q1MWD2geLJw/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/q1MWD2geLJw", videoAspect: "16:9" },
  { id: 5, title: "Litière PACHA - 4:5", tab: "ADS", image: "https://img.youtube.com/vi/_r2owHDCpK0/hqdefault.jpg", videoUrl: "https://youtube.com/embed/_r2owHDCpK0", videoAspect: "4:5" },
  { id: 6, title: "Litière PACHA - 9:16", tab: "ADS", image: "https://img.youtube.com/vi/1iF2LCQYGV8/hqdefault.jpg", videoUrl: "https://youtube.com/embed/1iF2LCQYGV8", videoAspect: "9:16" },
  { id: 7, title: "Le Copywriter - Théo ROSSI", tab: "ADS", image: "https://img.youtube.com/vi/nymo_88u6Lw/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/nymo_88u6Lw", videoAspect: "16:9" },
  { id: 8, title: "Learn Immobilier - Cyrille & Lionel", tab: "ADS", image: "https://img.youtube.com/vi/GaRZW0G6D5M/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/GaRZW0G6D5M", videoAspect: "9:16" },
  { id: 9, title: "Entrepreneurs.com — Alec HENRY", tab: "ADS", image: "https://img.youtube.com/vi/1oBBriR4LD8/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/1oBBriR4LD8", videoAspect: "9:16" },
  { id: 10, title: "Le million ou rien — Intro", tab: "Podcast", image: "https://img.youtube.com/vi/DEDLIsVQWKI/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/DEDLIsVQWKI", videoAspect: "16:9" },
  { id: 11, title: "Harry JMG", tab: "Podcast", image: "https://img.youtube.com/vi/OYTDta5hiiE/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/OYTDta5hiiE", videoAspect: "16:9" },
  { id: 12, title: "Le million ou rien — Intro", tab: "Reels", image: "https://img.youtube.com/vi/sHKAEu8gSUs/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/sHKAEu8gSUs", videoAspect: "9:16" },
  { id: 13, title: "Robin Duaut", tab: "Reels", image: "https://img.youtube.com/vi/3fBfG8bZMag/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/3fBfG8bZMag", videoAspect: "9:16" },
  { id: 14, title: "Harry JMG - Trouver votre mentor !", tab: "Reels", image: "https://img.youtube.com/vi/RsuuzGuP53o/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/RsuuzGuP53o", videoAspect: "9:16" },
  { id: 15, title: "Agence Personnelle — Bali", tab: "Reels", image: "https://img.youtube.com/vi/5_d8d5K4Kt0/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/5_d8d5K4Kt0", videoAspect: "9:16" },
  { id: 16, title: "Agence Personnelle — Pop Culture", tab: "Reels", image: "https://img.youtube.com/vi/rjAvPKrcRN4/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/rjAvPKrcRN4", videoAspect: "9:16" },
  { id: 17, title: "Arthaud Immobilier - Accompagnement 20H de Formation LIVE", tab: "Miniatures", image: "/images/minia-arthaud-immo.jpg" },
  { id: 18, title: "Learn Immo - De 0 à 16 Biens — Cyrille & Lionel", tab: "Miniatures", image: "/images/minia-learn-immo.jpg" },
  { id: 19, title: "Entrepreneurs.com - De 10 à 100K€ — Comment Scaler son Entreprise", tab: "Miniatures", image: "/images/minia-alec-henry.jpg" },
  { id: 20, title: "Reds League - Spécial Mercato", tab: "Miniatures", image: "/images/minia-reds-mercato.png" },
  { id: 21, title: "Reds League - Slot Out, Enfin !", tab: "Miniatures", image: "/images/minia-reds-slot.png" },
  { id: 22, title: "Reds League - Qui rendra fier l'Afrique ?", tab: "Miniatures", image: "/images/Minia-Afrique-CDM2026.png" },
  { id: 23, title: "Harry JMG - Développeur ! Pourquoi t'es au Chômage ?", tab: "Miniatures", image: "/images/minia-harry-jmg.jpg" },
  { id: 24, title: "LMOR - IA, Argent, Jalousie — Ça change la vie ?", tab: "Miniatures", image: "/images/minia-lmor.jpg" },
  { id: 25, title: "CCI TALK - Création d'entreprise : de l'idée au succès !", tab: "Miniatures", image: "/images/CCI-Talk-Minia.png" },
  { id: 26, title: "CCI TALK - Création d'entreprise : de l'idée au succès !", tab: "Podcast", image: "https://img.youtube.com/vi/PlIR2s2WpRI/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/PlIR2s2WpRI", videoAspect: "16:9" },
  { id: 27, title: "ZERO BLUFF - 5K6 Max Jour 1", tab: "Miniatures", image: "/images/Minia Jour 1.png" },
  { id: 28, title: "ZERO BLUFF - 5K6 Max Jour 1", tab: "Poker", image: "https://img.youtube.com/vi/7V_BxptoVl0/hqdefault.jpg", videoUrl: "https://youtube.com/embed/7V_BxptoVl0", videoAspect: "16:9" },
  { id: 30, title: "ZERO BLUFF - 5K6 Max Jour 2", tab: "Miniatures", image: "/images/Minia Jour 2.png" },
  { id: 31, title: "ZERO BLUFF - 5K6 Max Jour 2", tab: "Poker", image: "https://img.youtube.com/vi/2ufUhRzLoHo/hqdefault.jpg", videoUrl: "https://youtube.com/embed/2ufUhRzLoHo", videoAspect: "16:9" },
  { id: 32, title: "ZERO BLUFF - 5K6 Max Jour 3", tab: "Miniatures", image: "/images/Minia Jour 3.png" },
  { id: 33, title: "ZERO BLUFF - 5K6 Max Jour 3", tab: "Poker", image: "https://img.youtube.com/vi/AkMMzL_8dYk/hqdefault.jpg", videoUrl: "https://youtube.com/embed/AkMMzL_8dYk", videoAspect: "16:9" },
];

// Clients réels présents dans le portfolio — affichés en bandeau défilant (preuve sociale)
const clients = [
  "STUDERIA", "VIRALIZ", "GIANTS", "Arthaud Immobilier", "Learn Immobilier", "Entrepreneurs.com",
  "Le Million ou Rien", "CCI Talk", "Papa In Shape", "Litière PACHA", "Le Copywriter",
  "Harry JMG", "Reds League", "Zero Bluff", "Los Production", "Marcuus Lawrence",
];

// ⚠️ Ajoute ici de VRAIS témoignages clients (la section s'affiche automatiquement dès qu'il y en a au moins un)
const testimonials: Testimonial[] = [
  // { quote: "Carlos a compris notre message en un brief…", name: "Prénom Nom", role: "Fondateur, Entreprise" },
];

const benefits = [
  { icon: Target, title: "Pensé pour convertir", desc: "Hook dans les 3 premières secondes, rythme maîtrisé, call-to-action clair. Vos vidéos servent vos objectifs, pas seulement l'esthétique." },
  { icon: Sparkles, title: "20 ans d'œil graphique", desc: "Un vrai background en communication visuelle : typographie, couleurs, hiérarchie. Votre image de marque reste cohérente partout." },
  { icon: Clock, title: "Réactif & fiable", desc: "Réponse sous 24h, délais tenus, échanges simples. Vous envoyez vos rushs, je m'occupe du reste." },
];

const steps = [
  { title: "Brief & objectifs", desc: "On échange sur votre cible, votre message et le résultat attendu." },
  { title: "Montage", desc: "Je monte une première version : rythme, habillage, son, couleurs." },
  { title: "Ajustements", desc: "Vos retours sont intégrés jusqu'à obtenir la vidéo qui vous ressemble." },
  { title: "Livraison", desc: "Fichiers optimisés pour chaque plateforme, prêts à publier." },
];

const services = [
  { icon: "/Picto_camera.svg", title: "Montage vidéo", desc: "Vos rushs transformés en vidéos dynamiques qui captivent votre audience et renforcent votre message." },
  { icon: "/Picto_colo.svg", title: "Correction colorimétrique", desc: "Des couleurs harmonisées et un rendu professionnel pour sublimer chaque image." },
  { icon: "/Picto_MOTION-blanc.svg", title: "Motion Design & Effets", desc: "Animations, titrages et effets visuels pour dynamiser vos contenus et retenir l'attention." },
  { icon: "/Picto_Graphisme.svg", title: "Création graphique", desc: "Miniatures YouTube, visuels réseaux sociaux et éléments graphiques conçus pour maximiser l'impact." },
];

// ⚠️ Relis et adapte ces réponses à ta façon de travailler
const faqs = [
  { q: "Combien coûte un montage ?", a: "Chaque projet est différent (durée, complexité, motion design…). Remplissez le formulaire : vous recevez un devis gratuit et sans engagement sous 24h." },
  { q: "Quels sont les délais de livraison ?", a: "Ils dépendent du format et du volume. Un délai précis est fixé ensemble dès le brief, et il est tenu." },
  { q: "Comment vous envoyer mes rushs ?", a: "Via le service de votre choix (WeTransfer, Google Drive, Dropbox…). Tout se fait à distance, partout en France et à l'étranger." },
  { q: "Puis-je demander des modifications ?", a: "Oui, les allers-retours font partie du process. Le nombre de révisions est précisé dans le devis pour que tout soit clair dès le départ." },
  { q: "Travaillez-vous sur des contenus récurrents ?", a: "Oui : Reels hebdomadaires, podcasts, séries YouTube… Un suivi régulier permet de garder une identité visuelle cohérente sur la durée." },
];

const RED = "#db142b";
const WHATSAPP = "https://wa.me/33682256074";
const YOUTUBE = "https://www.youtube.com/@carlosmagusteiro9187";

const aspectPadding: Record<Aspect, string> = { "16:9": "56.25%", "9:16": "177.78%", "4:5": "125%" };

const h2Style = { fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontStyle: "italic" as const, fontSize: "clamp(36px, 6vw, 70px)" };
const serifAccent = { fontFamily: "Cambria, Georgia, serif", fontWeight: 700, fontStyle: "italic" as const, color: "#a0a0a0" };

function SectionLabel({ children, center = false }: { children: string; center?: boolean }) {
  return (
    <div className={`${center ? "inline-flex" : "flex"} items-center gap-3 mb-6`}>
      {center && <div className="h-[2px] w-10" style={{ backgroundColor: RED }} />}
      <span className="uppercase tracking-widest text-sm font-bold" style={{ color: RED }}>{children}</span>
      <div className="h-[2px] w-10" style={{ backgroundColor: RED }} />
    </div>
  );
}

function CornerFrame({ size = 6, thickness = 2 }: { size?: number; thickness?: number }) {
  const s = `${size * 4}px`;
  const t = `${thickness}px`;
  return (
    <>
      <div className="absolute top-0 left-0 pointer-events-none" style={{ width: s, height: s, borderTop: `${t} solid ${RED}`, borderLeft: `${t} solid ${RED}` }} />
      <div className="absolute bottom-0 right-0 pointer-events-none" style={{ width: s, height: s, borderBottom: `${t} solid ${RED}`, borderRight: `${t} solid ${RED}` }} />
    </>
  );
}

function CtaButton({ onClick, children, className = "" }: { onClick: () => void; children: ReactNode; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden text-white px-8 py-4 text-sm font-bold uppercase tracking-widest inline-flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 shadow-[0_10px_30px_-10px_rgba(219,20,43,0.7)] ${className}`}
      style={{ backgroundColor: RED }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
    </button>
  );
}

export default function Home() {
  const [tallyOpen, setTallyOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<Tab>("ADS");
  const [videoModal, setVideoModal] = useState<{ url: string; title: string; aspect: Aspect } | null>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const openTally = useCallback(() => { setMenuOpen(false); setTallyOpen(true); }, []);
  const closeModals = useCallback(() => { setTallyOpen(false); setVideoModal(null); }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowStickyCta(window.scrollY > window.innerHeight * 0.8);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Échap pour fermer + blocage du scroll quand une modale est ouverte
  useEffect(() => {
    const anyOpen = tallyOpen || videoModal !== null || menuOpen;
    document.body.style.overflow = anyOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { closeModals(); setMenuOpen(false); } };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [tallyOpen, videoModal, menuOpen, closeModals]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "portfolio", label: "Portfolio" },
    { id: "services", label: "Services" },
    { id: "about", label: "À Propos" },
    { id: "faq", label: "FAQ" },
  ];

  const filtered = projects.filter((p) => p.tab === activeTab);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,600;0,700;0,900;1,300;1,700&display=swap" rel="stylesheet" />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Retour en haut">
            <img src="/logo.svg" alt="Carlos Magusteiro" className="h-7 w-auto" />
          </button>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="relative text-white/70 hover:text-white transition-colors uppercase tracking-widest text-xs font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#db142b] after:transition-all">
                {item.label}
              </button>
            ))}
            <button onClick={openTally} className="text-white uppercase tracking-widest text-xs font-bold px-5 py-2.5 transition-opacity hover:opacity-90" style={{ backgroundColor: RED }}>
              Devis gratuit
            </button>
          </div>
          <button className="md:hidden text-white p-2 -mr-2" onClick={() => setMenuOpen(true)} aria-label="Ouvrir le menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-[#0a0a0a] flex flex-col p-6">
            <div className="flex justify-between items-center">
              <img src="/logo.svg" alt="Carlos Magusteiro" className="h-7 w-auto" />
              <button onClick={() => setMenuOpen(false)} aria-label="Fermer le menu" className="p-2 -mr-2"><X className="h-6 w-6" /></button>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-8">
              {navItems.map((item, i) => (
                <motion.button key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }} onClick={() => scrollTo(item.id)} className="text-left text-4xl font-bold italic">
                  {item.label}
                </motion.button>
              ))}
            </div>
            <CtaButton onClick={openTally} className="w-full">Parlons de votre projet <ArrowRight className="h-4 w-4" /></CtaButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to right, rgba(10,10,10,0.92) 45%, rgba(10,10,10,0.5) 100%)" }} />
          <div className="absolute inset-0 z-10" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(219,20,43,0.18), transparent 55%)" }} />
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "20% center" }} />
        </div>
        <motion.div className="container relative z-30 mx-auto px-6 md:px-12 pt-32 pb-24" style={{ y: y1, opacity }}>
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-white/10 bg-white/[0.04] backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-xs uppercase tracking-widest text-white/80 font-semibold">Disponible pour de nouveaux projets</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-10" style={{ backgroundColor: RED }} />
              <span className="uppercase tracking-widest text-sm md:text-base font-bold" style={{ color: RED }}>Monteur Vidéo & Minia Maker Freelance</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="leading-[0.9] mb-6">
              <span className="block" style={{ fontWeight: 900, fontSize: "clamp(44px, 8vw, 120px)" }}>DES VIDÉOS</span>
              <span className="block" style={{ fontSize: "clamp(40px, 7vw, 90px)" }}>
                <span style={{ fontWeight: 300 }}>QUI </span><span style={{ fontWeight: 700, color: RED }}>MARQUENT.</span>
              </span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-2xl md:text-3xl text-white/80 mb-6" style={{ fontFamily: "Cambria, Georgia, serif", fontStyle: "italic" }}>
              Une histoire. Une émotion. Un impact.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-lg text-white/60 max-w-xl mb-10 leading-relaxed">
              Ads, Reels, podcasts, YouTube : je transforme <strong className="text-white font-bold">vos rushs en vidéos qui captent l'attention</strong> et font passer votre audience <strong className="text-white font-bold">à l'action</strong>.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 mb-10">
              <CtaButton onClick={openTally}>Obtenir mon devis gratuit <ArrowRight className="h-4 w-4" /></CtaButton>
              <button onClick={() => scrollTo("portfolio")} className="border border-white/40 hover:border-white hover:bg-white/5 text-white font-semibold uppercase tracking-widest text-sm transition-all inline-flex items-center justify-center gap-2 px-8 py-4">
                <Play className="h-4 w-4 fill-white" /> Voir mes réalisations
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/60">
              {[{ v: "20+", l: "ans d'expérience" }, { v: "50+", l: "projets livrés" }, { v: "24h", l: "pour une réponse" }].map((s) => (
                <div key={s.l} className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">{s.v}</span>
                  <span>{s.l}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center z-30">
          <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
            <motion.div className="absolute top-0 left-0 w-full h-1/2" style={{ backgroundColor: RED }} animate={{ top: ["-50%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
          </div>
        </motion.div>
      </section>

      {/* Bandeau clients */}
      <section className="py-10 bg-[#050505] border-y border-white/5 overflow-hidden">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-white/40 font-semibold mb-6">Ils m'ont fait confiance</p>
        <div className="relative" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
          <motion.div className="flex w-max gap-12" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
            {[...clients, ...clients].map((c, i) => (
              <span key={i} className="flex items-center gap-12 text-xl md:text-2xl font-bold uppercase whitespace-nowrap text-white/50">
                {c}
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: RED }} />
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24 md:py-32 bg-[#0a0a0a] scroll-mt-16">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <SectionLabel>Portfolio</SectionLabel>
              <h2 className="leading-tight" style={h2Style}>Sélection de projets</h2>
            </div>
            <p className="text-white/50 max-w-md lg:text-right">Cliquez sur une vidéo pour la regarder. Chaque format est pensé pour sa plateforme.</p>
          </motion.div>
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible">
            {portfolioTabs.map((tab) => {
              const count = projects.filter((p) => p.tab === tab).length;
              const active = activeTab === tab;
              return (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`shrink-0 px-5 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-200 border flex items-center gap-2 ${active ? "text-white" : "border-white/20 text-white/60 hover:border-white/50 hover:text-white"}`}
                  style={active ? { backgroundColor: RED, borderColor: RED } : {}}
                >
                  {tab}
                  <span className={`text-[10px] px-1.5 py-0.5 ${active ? "bg-black/25" : "bg-white/10"}`}>{count}</span>
                </button>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.p key={`desc-${activeTab}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white/60 mb-10 max-w-2xl">
              {tabDescriptions[activeTab]}
            </motion.p>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, index) => {
                const [client, ...rest] = project.title.split(/\s[-—]\s/);
                return (
                  <motion.div key={project.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.06 }}
                    onClick={() => project.videoUrl && setVideoModal({ url: project.videoUrl, title: project.title, aspect: project.videoAspect ?? "9:16" })}
                    className={`group relative ${project.videoUrl ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-white/5 mb-4 ring-1 ring-white/5 group-hover:ring-[#db142b]/60 transition-all">
                      <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 brightness-75 group-hover:brightness-100" />
                      {project.videoAspect && (
                        <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest bg-black/70 backdrop-blur px-2 py-1">{project.videoAspect}</span>
                      )}
                      {project.videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full flex items-center justify-center bg-black/50 backdrop-blur border border-white/20 group-hover:border-transparent group-hover:scale-110 transition-all duration-300 group-hover:bg-[#db142b]">
                            <Play className="h-5 w-5 text-white ml-1 fill-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="px-1">
                      <p className="font-bold text-xs uppercase tracking-widest mb-1" style={{ color: RED }}>{client}</p>
                      <h3 className="text-base font-semibold text-white/90 leading-snug">{rest.length ? rest.join(" — ") : project.tab}</h3>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <p className="text-white/70">Vous voulez ce rendu pour vos contenus ?</p>
            <button onClick={openTally} className="font-bold uppercase tracking-widest text-sm inline-flex items-center gap-2 hover:gap-3 transition-all" style={{ color: RED }}>
              Demander un devis <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="py-24 md:py-32 bg-[#050505]">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <SectionLabel center>Ce que vous y gagnez</SectionLabel>
            <h2 className="leading-tight">
              <span style={h2Style}>Plus qu'un </span>
              <span style={{ ...serifAccent, fontSize: "clamp(38px, 6.4vw, 76px)" }}>monteur</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-8 md:p-10 bg-white/[0.03] border border-white/5 hover:border-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                <CornerFrame />
                <div className="w-12 h-12 flex items-center justify-center mb-6" style={{ backgroundColor: "rgba(219,20,43,0.12)" }}>
                  <b.icon className="h-6 w-6" style={{ color: RED }} />
                </div>
                <h3 className="text-xl font-bold mb-3">{b.title}</h3>
                <p className="text-white/60 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 md:py-32 relative overflow-hidden bg-[#0a0a0a] scroll-mt-16">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.7), rgba(10,10,10,0.95))" }} />
        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <SectionLabel center>Services</SectionLabel>
            <h2 className="mb-4 leading-tight">
              <span style={{ ...h2Style, fontSize: "clamp(32px, 5vw, 56px)" }}>De l'idée au </span>
              <span style={{ ...serifAccent, fontSize: "clamp(34px, 5.4vw, 62px)" }}>rendu final</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Une seule personne pour tout gérer : <strong className="text-white">montage, couleurs, motion et miniatures</strong>. Moins d'intermédiaires, une identité visuelle cohérente.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 border border-white/5"
              >
                <CornerFrame />
                <div className="w-14 h-14 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <img src={service.icon} alt="" className="h-10 w-10 object-contain" />
                </div>
                <h3 className="text-base font-bold text-white mb-3 text-center">{service.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed text-center">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* À propos + Process */}
      <section id="about" className="py-24 md:py-32 bg-[#050505] scroll-mt-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative max-w-md mx-auto lg:max-w-none">
              <div className="absolute -top-3 -left-3 w-8 h-8 z-10" style={{ borderTop: `3px solid ${RED}`, borderLeft: `3px solid ${RED}` }} />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 z-10" style={{ borderBottom: `3px solid ${RED}`, borderRight: `3px solid ${RED}` }} />
              <img src="/about-photo.png" alt="Carlos Magusteiro, monteur vidéo freelance" className="w-full object-cover" loading="lazy" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <SectionLabel>À propos</SectionLabel>
              <h2 className="mb-6 leading-tight" style={h2Style}>Pourquoi moi ?</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Contrairement à un simple monteur vidéo, j'apporte <strong className="text-white">plus de 20 ans d'expérience en communication visuelle</strong>. Chaque vidéo est pensée non seulement pour être esthétique, mais aussi pour <strong className="text-white">transmettre efficacement votre message</strong>.
              </p>
              <p className="text-white/70 text-lg leading-relaxed mb-10">
                Entrepreneurs, formateurs, créateurs de contenu, marques : je m'adapte à votre ton et à votre audience pour que chaque contenu <strong className="text-white">travaille pour vous</strong>.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                {[{ value: "20+", label: "Ans d'expérience" }, { value: "50+", label: "Projets" }, { value: "24h", label: "Délai de réponse" }].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: RED }}>{stat.value}</div>
                    <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/40">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <SectionLabel center>Process</SectionLabel>
            <h2 className="leading-tight" style={{ ...h2Style, fontSize: "clamp(30px, 4.5vw, 52px)" }}>Simple, clair, sans surprise</h2>
          </motion.div>
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-[2px] bg-white/10" />
            {steps.map((step, i) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }} className="relative flex md:flex-col items-start md:items-center gap-5 md:text-center">
                <div className="relative z-10 shrink-0 w-14 h-14 flex items-center justify-center text-xl font-black border-2 bg-[#050505]" style={{ borderColor: RED, color: RED }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages (s'affiche uniquement s'il y en a) */}
      {testimonials.length > 0 && (
        <section className="py-24 md:py-32 bg-[#0a0a0a]">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-14">
              <SectionLabel center>Témoignages</SectionLabel>
              <h2 className="leading-tight" style={h2Style}>Ils en parlent mieux que moi</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <figure key={t.name} className="relative p-8 bg-white/[0.03] border border-white/5">
                  <CornerFrame />
                  <span className="block text-6xl leading-none mb-2" style={{ color: RED, fontFamily: "Georgia, serif" }}>“</span>
                  <blockquote className="text-white/80 leading-relaxed mb-6">{t.quote}</blockquote>
                  <figcaption>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-sm text-white/50">{t.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 bg-[#0a0a0a] scroll-mt-16">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <SectionLabel center>FAQ</SectionLabel>
            <h2 className="leading-tight" style={{ ...h2Style, fontSize: "clamp(30px, 4.5vw, 52px)" }}>Vos questions</h2>
          </motion.div>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q}>
                  <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between gap-6 py-6 text-left" aria-expanded={open}>
                    <span className="text-lg font-semibold">{f.q}</span>
                    <Plus className={`h-5 w-5 shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`} style={{ color: RED }} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <p className="pb-6 text-white/60 leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section id="projet" className="py-24 md:py-32 relative overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.85), rgba(5,5,5,0.95))" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(219,20,43,0.15), transparent 60%)" }} />
        <div className="container relative z-10 mx-auto px-6 md:px-12 text-center max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionLabel center>Votre projet</SectionLabel>
            <h2 className="mb-6 leading-tight">
              <span style={{ ...h2Style, fontSize: "clamp(32px, 5vw, 56px)", display: "block" }}>Prêt à donner vie</span>
              <span style={{ ...serifAccent, fontSize: "clamp(34px, 5.4vw, 62px)", display: "block" }}>à votre projet ?</span>
            </h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              Parlons de <strong className="text-white">vos besoins</strong> et trouvons ensemble la meilleure approche pour <strong className="text-white">créer une vidéo qui atteint vos objectifs</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 mb-10 max-w-xl mx-auto text-sm text-white/75 text-left">
              {["Réponse sous 24h", "Devis gratuit et sans engagement", "Accompagnement personnalisé", "Collaboration 100 % à distance"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center text-xs font-bold" style={{ backgroundColor: RED }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CtaButton onClick={openTally}>Obtenir mon devis gratuit <ArrowRight className="h-4 w-4" /></CtaButton>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="border border-white/30 hover:border-white hover:bg-white/5 text-white font-semibold uppercase tracking-widest text-sm transition-all inline-flex items-center justify-center gap-2 px-8 py-4">
                <MessageCircle className="h-4 w-4" /> Écrire sur WhatsApp
              </a>
            </div>
            <p className="mt-6 text-xs text-white/40">Formulaire de 2 minutes · Aucun engagement</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 pb-28 md:pb-10 bg-[#020202] border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <img src="/logo.svg" alt="Carlos Magusteiro" className="h-6 w-auto opacity-60" />
          <div className="flex items-center gap-4">
            <a href={YOUTUBE} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:border-[#db142b] hover:text-[#db142b] transition-all">
              <Youtube className="h-4 w-4" />
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:border-[#db142b] hover:text-[#db142b] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
          <div className="text-xs font-semibold uppercase tracking-widest text-white/30">
            &copy; {new Date().getFullYear()} Carlos Magusteiro
          </div>
        </div>
      </footer>

      {/* CTA collant mobile */}
      <AnimatePresence>
        {showStickyCta && !tallyOpen && !videoModal && !menuOpen && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="md:hidden fixed bottom-0 inset-x-0 z-40 p-4 bg-gradient-to-t from-black via-black/90 to-transparent">
            <CtaButton onClick={openTally} className="w-full">Devis gratuit en 2 min <ArrowRight className="h-4 w-4" /></CtaButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton WhatsApp flottant (desktop) */}
      <AnimatePresence>
        {showStickyCta && !tallyOpen && !videoModal && (
          <motion.a initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="Me contacter sur WhatsApp"
            className="hidden md:flex fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full items-center justify-center bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.a>
        )}
      </AnimatePresence>

      {/* Tally Modal */}
      <AnimatePresence>
        {tallyOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setTallyOpen(false)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
          >
            <button onClick={() => setTallyOpen(false)} className="absolute top-6 right-6 z-10 text-white/50 hover:text-white font-bold uppercase text-sm tracking-widest">
              Fermer [X]
            </button>
            <motion.div initial={{ scale: 0.96, y: 10 }} animate={{ scale: 1, y: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-6xl bg-[#0a0a0a] border border-white/10 overflow-auto p-6 md:p-12" style={{ height: "85vh", maxHeight: "800px" }}>
              <iframe src="https://tally.so/embed/eqv8yl?alignLeft=1&hideTitle=0&transparentBackground=1&dynamicHeight=1" width="100%" height="100%" frameBorder="0" title="Parlons de votre projet" allowFullScreen />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setVideoModal(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
          >
            <button onClick={() => setVideoModal(null)} className="absolute top-6 right-6 z-10 text-white/50 hover:text-white font-bold uppercase text-sm tracking-widest">
              Fermer [X]
            </button>
            <motion.div initial={{ scale: 0.96 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()}
              className={`flex flex-col gap-4 w-full ${videoModal.aspect === "16:9" ? "max-w-5xl" : videoModal.aspect === "4:5" ? "max-w-md" : ""}`}
              style={videoModal.aspect === "9:16" ? { maxWidth: "min(24rem, calc((100vh - 12rem) * 0.5625))" } : undefined}
            >
              <p className="text-white/50 font-semibold text-xs uppercase tracking-widest">{videoModal.title}</p>
              <div className="relative w-full" style={{ paddingTop: aspectPadding[videoModal.aspect] }}>
                <iframe src={`${videoModal.url}?autoplay=1&rel=0`} title={videoModal.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full border border-white/10" />
              </div>
              <button onClick={() => { setVideoModal(null); setTallyOpen(true); }} className="self-start text-sm font-bold uppercase tracking-widest inline-flex items-center gap-2 hover:gap-3 transition-all" style={{ color: RED }}>
                Je veux une vidéo comme ça <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
