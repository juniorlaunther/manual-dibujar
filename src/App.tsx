import { ShoppingCart, Star, Play, ShieldCheck, ArrowRight, PenTool, X, ChevronLeft, ChevronRight, MessageCircle, ChevronDown } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const faqs = [
  {
    icon: "✏️",
    question: "¿Para quién está pensado el Manual Para Dibujar?",
    answer: "El Manual es para personas de cualquier edad y nivel de experiencia. Es ideal tanto para quienes están dando sus primeros pasos como para quienes ya dibujan y quieren ampliar su repertorio, ejercitar la creatividad o retomar la práctica de una forma más relajada y constante."
  },
  {
    icon: "⭐",
    question: "¿Si lo compro ahora recibiré las próximas actualizaciones?",
    answer: "¡Sí! Al conseguir el Manual, recibes de forma gratuita todas las próximas actualizaciones, mejoras y nuevos contenidos que vayamos agregando, sin tener que pagar nada más."
  },
  {
    icon: "📖",
    question: "¿Qué voy a encontrar dentro del Manual?",
    answer: "Encontrarás cientos de referencias para crear rostros expresivos, peinados, cuerpos, animales, comida, plantas, objetos, pequeñas construcciones, mini escenarios, criaturas mágicas y mucho más. Un sinfín de opciones para explorar, combinar, adaptar y dibujar a tu propio estilo."
  },
  {
    icon: "🖨️",
    question: "¿Puedo imprimir las páginas para dibujar?",
    answer: "¡Claro que sí! Las páginas están listas en formato A4 para que las puedas imprimir fácilmente, tener las referencias a mano, dibujar en papel y armar tu propio espacio creativo."
  },
  {
    icon: "📱",
    question: "¿Cómo accedo al material después de la compra?",
    answer: "Una vez aprobado el pago, el acceso se libera al instante. Recibirás las instrucciones en el correo electrónico que ingresaste en la compra y podrás consultar el Manual cuando quieras desde tu área de acceso."
  }
];


const productImages = [
  "/images/anunio-01.webp",
  "/images/anunio-02.webp",
  "/images/anunio-03.webp",
  "/images/anunio-04.webp",
];

const testimonialImages = [
  "/images/testimonials/depo-01.webp",
  "/images/testimonials/depo-02.webp",
  "/images/testimonials/depo-03.webp",
  "/images/testimonials/depo-04.webp",
  "/images/testimonials/depo-05.webp",
  "/images/testimonials/depo-06.webp",
  "/images/testimonials/depo-07.webp"
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [lightboxData, setLightboxData] = useState<{ index: number, type: 'product' | 'testimonial' } | null>(null);
  const [direction, setDirection] = useState(0);
  const [purchaseNotification, setPurchaseNotification] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState("https://pay.hotmart.com/K106843927J?off=dbzlvckf&checkoutMode=10");
  const testimonialTitleRef = useRef<HTMLHeadingElement>(null);
  const testimonialProbeRef = useRef<HTMLSpanElement>(null);
  const [isTestimonialTitleWrapped, setIsTestimonialTitleWrapped] = useState(false);

  useEffect(() => {
    const checkTitleWrap = () => {
      if (testimonialTitleRef.current && testimonialProbeRef.current) {
        const containerWidth = testimonialTitleRef.current.parentElement?.clientWidth || window.innerWidth;
        const textWidth = testimonialProbeRef.current.offsetWidth;
        const totalSingleLineWidth = textWidth + 48; // icon (~36px) + gap (~12px)
        setIsTestimonialTitleWrapped(containerWidth < totalSingleLineWidth);
      }
    };

    checkTitleWrap();
    if (document.fonts?.ready) {
      document.fonts.ready.then(checkTitleWrap);
    }
    window.addEventListener('resize', checkTitleWrap);
    return () => window.removeEventListener('resize', checkTitleWrap);
  }, []);

  useEffect(() => {
    const checkoutBaseUrl = "https://pay.hotmart.com/K106843927J?off=dbzlvckf&checkoutMode=10";
    const allowedParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "utm_id",
      "sck",
      "xcod"
    ];

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const storedParamsRaw = sessionStorage.getItem("manual_utm_params");
      let storedParams = storedParamsRaw ? JSON.parse(storedParamsRaw) : {};
      
      const hasAnyAllowedParam = allowedParams.some(param => urlParams.has(param) && urlParams.get(param));

      if (hasAnyAllowedParam) {
        storedParams = {};
        allowedParams.forEach(param => {
          if (urlParams.has(param)) {
            const val = urlParams.get(param);
            if (val) {
              storedParams[param] = val;
            }
          }
        });
        sessionStorage.setItem("manual_utm_params", JSON.stringify(storedParams));
      }

      const newCheckoutUrl = new URL(checkoutBaseUrl);
      allowedParams.forEach(key => {
        if (storedParams[key]) {
          newCheckoutUrl.searchParams.set(key, storedParams[key]);
        }
      });

      setCheckoutUrl(newCheckoutUrl.toString());
    } catch (e) {
      console.error("Error setting UTM params", e);
    }
  }, []);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const names = [
      "Sofía", "Mateo", "Valentina", "Santiago", "Camila", "Sebastián", "Lucía", "Alejandro", 
      "Mariana", "Diego", "Paula", "Nicolás", "Daniela", "Gabriel", "Isabella", "Andrés", 
      "Elena", "Martín", "Natalia", "Carlos", "Valeria", "Javier", "Carolina", "Fernando", 
      "Victoria", "Lucas", "Andrea", "Joaquín", "Laura", "Emilio", "Clara", "Tomás"
    ];

    let timeoutId: NodeJS.Timeout;

    const showRandomNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      setPurchaseNotification(`¡${randomName} compró su manual!`);

      // Hide after 3 seconds
      setTimeout(() => {
        setPurchaseNotification(null);
        
        // Schedule next one between 5 to 15 seconds
        const nextDelay = Math.floor(Math.random() * 10000) + 5000;
        timeoutId = setTimeout(showRandomNotification, nextDelay);
      }, 3000);
    };

    // Initial trigger
    const initialDelay = Math.floor(Math.random() * 10000) + 5000;
    timeoutId = setTimeout(showRandomNotification, initialDelay);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleScroll = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const containerCenter = container.scrollLeft + container.offsetWidth / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      Array.from(container.children).forEach((child, index) => {
        const childElement = child as HTMLElement;
        const childCenter = (childElement.offsetLeft - container.offsetLeft) + childElement.offsetWidth / 2;
        const distance = Math.abs(containerCenter - childCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    }
  };

  const scrollToImage = (index: number) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const child = container.children[index] as HTMLElement;
      if (child) {
        const targetScrollLeft = (child.offsetLeft - container.offsetLeft) + child.offsetWidth / 2 - container.offsetWidth / 2;
        container.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };


  const handleTestimonialScroll = () => {
    if (testimonialRef.current) {
      const container = testimonialRef.current;
      const containerCenter = container.scrollLeft + container.offsetWidth / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      Array.from(container.children).forEach((child, index) => {
        const childElement = child as HTMLElement;
        const childCenter = (childElement.offsetLeft - container.offsetLeft) + childElement.offsetWidth / 2;
        const distance = Math.abs(containerCenter - childCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveTestimonialIndex(closestIndex);
    }
  };

  const scrollToTestimonialImage = (index: number) => {
    if (testimonialRef.current) {
      const container = testimonialRef.current;
      const child = container.children[index] as HTMLElement;
      if (child) {
        const targetScrollLeft = (child.offsetLeft - container.offsetLeft) + child.offsetWidth / 2 - container.offsetWidth / 2;
        container.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  const paginate = (newDirection: number) => {
    if (lightboxData) {
      setDirection(newDirection);
      setLightboxData((prev) => {
        if (!prev) return null;
        const images = prev.type === 'product' ? productImages : testimonialImages;
        let next = prev.index + newDirection;
        if (next < 0) next = images.length - 1;
        if (next >= images.length) next = 0;
        return { ...prev, index: next };
      });
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxData(null);
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    if (lightboxData !== null) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling when lightbox is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxData]);

  return (
    <div className="min-h-screen pb-20 selection:bg-[#A505F1] selection:text-white overflow-x-hidden">
      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxData !== null && (() => {
          const currentImages = lightboxData.type === 'product' ? productImages : testimonialImages;
          return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm"
          >
            <button
              onClick={() => setLightboxData(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-2 bg-white rounded-full border-2 border-[#2c2c2c] shadow-[2px_2px_0px_0px_#2c2c2c] hover:bg-gray-100 transition-colors"
            >
              <X className="w-8 h-8 text-[#2c2c2c]" />
            </button>

            <button
              className="absolute left-4 md:left-8 z-50 p-3 bg-white rounded-full border-2 border-[#2c2c2c] shadow-[2px_2px_0px_0px_#2c2c2c] hover:bg-gray-100 transition-colors hidden md:block"
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
            >
              <ChevronLeft className="w-8 h-8 text-[#2c2c2c]" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={lightboxData.index}
                  src={currentImages[lightboxData.index]}
                  custom={direction}
                  variants={{
                    enter: (direction: number) => ({
                      x: direction > 0 ? 1000 : -1000,
                      opacity: 0
                    }),
                    center: {
                      zIndex: 1,
                      x: 0,
                      opacity: 1
                    },
                    exit: (direction: number) => ({
                      zIndex: 0,
                      x: direction < 0 ? 1000 : -1000,
                      opacity: 0
                    })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="absolute max-h-[65vh] md:max-h-[85vh] max-w-[85vw] md:max-w-[75vw] object-contain rounded-xl border-4 border-[#2c2c2c] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] cursor-grab active:cursor-grabbing pointer-events-auto"
                />
              </AnimatePresence>
            </div>

            <button
              className="absolute right-4 md:right-8 z-50 p-3 bg-white rounded-full border-2 border-[#2c2c2c] shadow-[2px_2px_0px_0px_#2c2c2c] hover:bg-gray-100 transition-colors hidden md:block"
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
            >
              <ChevronRight className="w-8 h-8 text-[#2c2c2c]" />
            </button>

            {/* Mobile Navigation Arrows */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-6 md:hidden z-50">
              <button
                className="p-3 bg-white rounded-full border-2 border-[#2c2c2c] shadow-[2px_2px_0px_0px_#2c2c2c] active:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(-1);
                }}
              >
                <ChevronLeft className="w-8 h-8 text-[#2c2c2c]" />
              </button>
              <button
                className="p-3 bg-white rounded-full border-2 border-[#2c2c2c] shadow-[2px_2px_0px_0px_#2c2c2c] active:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(1);
                }}
              >
                <ChevronRight className="w-8 h-8 text-[#2c2c2c]" />
              </button>
            </div>
          </motion.div>
        );})()}
      </AnimatePresence>

      {/* Header with Logo */}
      <header className="pt-6 pb-4 px-4 flex justify-center items-center">
        <img 
          src="/images/logo.webp" 
          alt="Manual Para Dibujar" 
          width={400}
          height={224}
          decoding="async"
          className="max-h-28 md:max-h-40 w-auto object-contain drop-shadow-md animate-scale-soft"
        />
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Product Carousel */}
        <div className="relative mb-12 w-full max-w-4xl mx-auto">
           <div 
             ref={carouselRef}
             onScroll={handleScroll}
             className="flex md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-4 md:gap-6 py-4 md:py-6 no-scrollbar px-2 scroll-smooth"
           >
              {productImages.map((url, i) => (
               <div key={i} className="w-[85vw] max-w-[280px] md:w-full md:max-w-none shrink-0 snap-center mx-auto flex justify-center relative hover:z-10">
                  <div 
                    className={`bg-white p-2 md:p-3 border-4 border-[#2c2c2c] shadow-[4px_4px_0px_0px_#A505F1] rounded-xl w-full transition-transform duration-300 hover:scale-105 cursor-pointer ${i % 2 === 0 ? 'rotate-1 hover:rotate-2' : '-rotate-1 hover:-rotate-2'}`}
                    onClick={() => setLightboxData({ index: i, type: 'product' })}
                  >
                    <img 
                      src={url} 
                      alt={`Vista previa del producto ${i + 1}`} 
                      width={480}
                      height={640}
                      loading={i === 0 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : "auto"}
                      decoding="async"
                      className="w-full aspect-[3/4] object-cover rounded-lg border-2 border-dashed border-gray-300 pointer-events-none" 
                    />
                  </div>
               </div>
             ))}
           </div>
           <div className="flex md:hidden items-center justify-center gap-2 mt-1 text-gray-500 text-sm">
             <span className="animate-pulse">👈</span> Desliza para ver más <span className="animate-pulse">👉</span>
           </div>
           <div className="flex md:hidden justify-center gap-3 mt-2">
             {productImages.map((_, i) => (
               <button 
                 key={i} 
                 onClick={() => scrollToImage(i)}
                 aria-label={`Ver imagen ${i + 1}`}
                 className={`w-3 h-3 rounded-full border-2 border-[#2c2c2c] cursor-pointer transition-colors ${activeIndex === i ? 'bg-[#A505F1]' : 'bg-transparent'}`}
               />
             ))}
           </div>
        </div>

        {/* Short Description & Buy Section */}
        <section className="mb-10 bg-[#F4E285] p-5 md:p-8 rounded-3xl border-4 border-[#2c2c2c] shadow-[6px_6px_0px_0px_#2c2c2c] -rotate-1 relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-1.5 mb-3 text-[#A505F1]">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="animate-star-wave inline-flex items-center justify-center"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <Star className="fill-current w-5 h-5 md:w-6 md:h-6 drop-shadow-sm" />
              </span>
            ))}
          </div>
          
          <h1 className="text-2xl md:text-4xl font-bold mb-3 leading-tight text-center md:text-left">
            Un Manual Práctico para Desbloquear tu Creatividad y Dibujar a tu Propio Estilo
          </h1>
          
          <p className="text-lg md:text-xl mb-6 opacity-90 text-center md:text-left">
            Elige formas, ojos, bocas, orejas, peinados, flores, animales y decenas de elementos para crear ilustraciones únicas, incluso cuando no sepas qué dibujar.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-between gap-5 bg-white/50 p-4 rounded-2xl border-2 border-[#2c2c2c] border-dashed">
            <div className="flex flex-col items-center md:items-start shrink-0">
               <span className="line-through text-gray-500 text-[19px] font-bold">Antes US$ 27</span>
               <span className="text-[30px] font-bold text-[#A505F1] drop-shadow-sm">Por sólo US$ 9.90</span>
            </div>
            
            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto bg-[#A505F1] hover:bg-[#8204BE] text-white text-lg md:text-xl font-bold py-3 md:py-4 px-4 md:px-8 rounded-2xl border-4 border-[#2c2c2c] shadow-[4px_4px_0px_0px_#2c2c2c] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_#2c2c2c] transition-all flex items-center justify-center gap-2 md:gap-3 animate-shine">
              <ShoppingCart className="w-6 h-6 shrink-0 animate-wiggle" />
              <span className="text-center leading-tight whitespace-nowrap">¡QUIERO EL MANUAL!</span>
            </a>
          </div>
        </section>

        {/* Updates Highlight */}
        <section className="mb-10 max-w-3xl mx-auto">
          <div className="bg-[#FFD700] p-6 rounded-3xl border-4 border-[#2c2c2c] shadow-[6px_6px_0px_0px_#2c2c2c] flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left animate-shine rotate-1 hover:-rotate-1 transition-transform">
            <span className="text-5xl md:text-6xl animate-wiggle inline-block shrink-0 drop-shadow-sm">⭐</span>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#2c2c2c] mb-1">¡Actualizaciones de por vida!</h3>
              <p className="text-lg md:text-xl text-[#2c2c2c] opacity-90 font-medium leading-tight">
                Recibirás todas las futuras actualizaciones del Manual <strong>totalmente gratis</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Long Description */}
        <section className="mb-10 space-y-8 max-w-3xl mx-auto">
          <div className="bg-white p-5 md:p-8 rounded-3xl border-4 border-[#2c2c2c] shadow-[6px_6px_0px_0px_#436CC0] rotate-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-5 flex items-center gap-3">
              <span className="bg-[#436CC0] p-2 rounded-xl border-4 border-[#2c2c2c] shadow-[2px_2px_0px_0px_#2c2c2c] animate-wiggle inline-block">🤔</span> 
              ¿Para quién es este manual?
            </h2>
            <ul className="space-y-4 text-lg md:text-xl">
              <li className="flex items-start gap-3">
                <ArrowRight className="w-6 h-6 text-[#A505F1] shrink-0 mt-1 animate-slide-x" style={{ animationDelay: '0ms' }} />
                <span>Niños, jóvenes y adultos que quieran explorar su creatividad de manera relajada y divertida.</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-6 h-6 text-[#A505F1] shrink-0 mt-1 animate-slide-x" style={{ animationDelay: '100ms' }} />
                <span>Para quienes disfrutan dibujar, pero se bloquean frente a la hoja en blanco.</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-6 h-6 text-[#A505F1] shrink-0 mt-1 animate-slide-x" style={{ animationDelay: '200ms' }} />
                <span>Para quienes buscan crear ilustraciones sin tener que inventar cada detalle desde cero.</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-6 h-6 text-[#A505F1] shrink-0 mt-1 animate-slide-x" style={{ animationDelay: '300ms' }} />
                <span>Quienes buscan dibujos sencillos, claros y fáciles de observar y recrear.</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-6 h-6 text-[#A505F1] shrink-0 mt-1 animate-slide-x" style={{ animationDelay: '400ms' }} />
                <span>Para tener siempre a mano una biblioteca de referencias lista para inspirarte.</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-6 h-6 text-[#A505F1] shrink-0 mt-1 animate-slide-x" style={{ animationDelay: '500ms' }} />
                <span>Para quienes dictan clases, talleres o encuentros creativos y buscan una propuesta diferente para sus grupos.</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#F4EDE3] p-5 md:p-8 rounded-3xl border-4 border-[#2c2c2c] border-dashed shadow-[6px_6px_0px_0px_#A505F1] -rotate-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-5 flex items-center gap-3">
              <PenTool className="w-8 h-8 text-[#A505F1] animate-wiggle" />
              ¿Qué vas a recibir?
            </h2>
            <p className="text-lg md:text-xl mb-5">
              ¡Este no es un libro con teorías complejas ni rebuscadas! La idea es sencilla: ayudarte a soltar la mano, desbloquear tu creatividad y crear dibujos geniales. Funciona como una biblioteca visual llena de elementos e ideas para combinar, transformar o dibujar a tu manera.
            </p>
            <ul className="space-y-4 text-lg md:text-xl mb-4">
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 shrink-0 flex items-center justify-center bg-[#F4E285] border-2 border-[#2c2c2c] rounded-full font-bold text-base shadow-[2px_2px_0px_0px_#2c2c2c] animate-float" style={{ animationDelay: '0ms' }}>1</span>
                <span>Cientos de ojos, bocas, narices, peinados, cuerpos, animales, criaturas mágicas ¡y mucho más!</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 shrink-0 flex items-center justify-center bg-[#436CC0] text-white border-2 border-[#2c2c2c] rounded-full font-bold text-base shadow-[2px_2px_0px_0px_#2c2c2c] animate-float" style={{ animationDelay: '200ms' }}>2</span>
                <span>Un reto de historieta para que te animes a crear tu propio cómic paso a paso.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 shrink-0 flex items-center justify-center bg-[#A505F1] text-white border-2 border-[#2c2c2c] rounded-full font-bold text-base shadow-[2px_2px_0px_0px_#2c2c2c] animate-float" style={{ animationDelay: '400ms' }}>3</span>
                <span>Un método simple y práctico para transformar hojas en blanco en ideas llenas de vida.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Video Placeholder */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-[#2c2c2c]">¡Mira el Manual en acción!</h2>
          <div className="relative bg-white border-4 border-[#2c2c2c] rounded-3xl p-3 shadow-[8px_8px_0px_0px_#436CC0] rotate-1 max-w-sm mx-auto">
            <picture>
              <source srcSet="/images/manual-animado.webp" type="image/webp" />
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEge-bYBSyOazpnBOFwSAL6YXSSbnRKwcfufY3gy02kb8_ZVTQX4PTJ-mgCySkXfF4m2o7_sN0unc9R0tN-EiBCoRnw5Tt2K6vSlVmc9ng_45lg3iJCXwFU6OsQCeSRUEfs2OddZ-FrfV_OqzWER9mtxPuwWsd4g5hyphenhyphenSzCWmcqkRKrn4NKu3UGNz1G7R0hQ/s0/novo%20gif%20manual%20(reduzindo).gif" 
                alt="Manual por dentro" 
                loading="lazy"
                decoding="async"
                width={480}
                height={641}
                className="w-full aspect-[3/4] object-cover border-4 border-dashed border-[#2c2c2c] rounded-2xl" 
              />
            </picture>
            
            {/* Sketchy decorations */}
            <div className="absolute -top-6 -right-6 text-4xl animate-bounce">✨</div>
            <div className="absolute -bottom-6 -left-6 text-4xl animate-wiggle inline-block">🎨</div>
          </div>
        </section>

        <div className="flex justify-center mb-14 px-2">
          <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="w-full max-w-sm bg-[#A505F1] hover:bg-[#8204BE] text-white text-xl md:text-2xl font-bold py-3 md:py-4 px-4 md:px-8 rounded-2xl border-4 border-[#2c2c2c] shadow-[4px_4px_0px_0px_#2c2c2c] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_#2c2c2c] transition-all flex items-center justify-center gap-2 animate-shine">
            <ShoppingCart className="w-6 h-6 shrink-0 animate-wiggle" />
            <span className="text-center leading-tight whitespace-nowrap">¡QUIERO COMPRAR!</span>
          </a>
        </div>


        {/* Depoimentos Recentes */}
        <section className="mb-14">
          <span 
            ref={testimonialProbeRef} 
            aria-hidden="true" 
            className="invisible fixed -left-[9999px] top-0 whitespace-nowrap text-3xl md:text-4xl font-bold font-sans pointer-events-none select-none"
          >
            Experiencias de nuestra comunidad
          </span>
          <h2 
            ref={testimonialTitleRef}
            className={`text-3xl md:text-4xl font-bold mb-6 text-center text-[#2c2c2c] flex ${
              isTestimonialTitleWrapped 
                ? 'flex-col items-center gap-1.5' 
                : 'flex-row justify-center items-center gap-3'
            }`}
          >
             <span className="animate-pulse inline-block">💙</span>
             <span className="leading-tight">Experiencias de nuestra comunidad</span>
          </h2>
          <div className="relative mb-12 w-full max-w-4xl mx-auto">
             <div 
               ref={testimonialRef}
               onScroll={handleTestimonialScroll}
               className="flex md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-4 md:gap-6 py-4 md:py-6 no-scrollbar px-2 scroll-smooth"
             >
                {testimonialImages.map((url, i) => (
                 <div key={i} className="w-[85vw] max-w-[280px] md:w-full md:max-w-none shrink-0 snap-center mx-auto flex justify-center relative hover:z-10">
                    <div 
                      className={`bg-white p-2 md:p-3 border-4 border-[#2c2c2c] shadow-[4px_4px_0px_0px_#A505F1] rounded-xl w-full transition-transform duration-300 hover:scale-105 cursor-pointer ${i % 2 === 0 ? 'rotate-1 hover:rotate-2' : '-rotate-1 hover:-rotate-2'}`}
                      onClick={() => setLightboxData({ index: i, type: 'testimonial' })}
                    >
                      <img 
                        src={url} 
                        alt={`Testimonio ${i + 1}`} 
                        loading="lazy"
                        decoding="async"
                        width={480}
                        height={640}
                        className="w-full aspect-[3/4] object-cover rounded-lg border-2 border-dashed border-gray-300 pointer-events-none" 
                      />
                    </div>
                 </div>
               ))}
             </div>
             <div className="flex md:hidden items-center justify-center gap-2 mt-1 text-gray-500 text-sm">
               <span className="animate-pulse">👈</span> Desliza para ver más <span className="animate-pulse">👉</span>
             </div>
             <div className="flex md:hidden justify-center gap-3 mt-2">
               {testimonialImages.map((_, i) => (
                 <button 
                   key={i} 
                   onClick={() => scrollToTestimonialImage(i)}
                   aria-label={`Ver testimonio ${i + 1}`}
                   className={`w-3 h-3 rounded-full border-2 border-[#2c2c2c] cursor-pointer transition-colors ${activeTestimonialIndex === i ? 'bg-[#A505F1]' : 'bg-transparent'}`}
                 />
               ))}
             </div>
          </div>
        </section>

        {/* Guarantee */}

        <section className="mb-10">
           <div className="bg-[#A505F1] text-white p-6 md:p-10 rounded-[2rem] border-4 border-[#2c2c2c] shadow-[8px_8px_0px_0px_#2c2c2c] flex flex-col md:flex-row items-center gap-6 md:gap-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
             <ShieldCheck className="w-20 h-20 md:w-24 md:h-24 shrink-0 relative z-10 animate-scale-pulse" />
             <div className="relative z-10 text-center md:text-left">
               <h3 className="text-2xl md:text-3xl font-bold mb-3">Garantía de 7 días</h3>
               <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                 Si sientes que este manual no te ayudó a desbloquear tu creatividad, te devolvemos el 100% de tu dinero. Sin preguntas ni vueltas.
               </p>
             </div>
           </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-14">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">Preguntas frecuentes</h3>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl border-4 border-[#2c2c2c] shadow-[4px_4px_0px_0px_#2c2c2c] overflow-hidden transition-all">
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4 font-bold text-lg md:text-xl"
                >
                  <span className="flex items-center gap-3 md:gap-4">
                    <span className="text-2xl md:text-3xl animate-wiggle inline-block shrink-0">{faq.icon}</span>
                    <span className="leading-tight text-gray-800">{faq.question}</span>
                  </span>
                  <ChevronDown className={`w-6 h-6 shrink-0 text-[#A505F1] transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 md:p-5 pt-0 pl-14 md:pl-[4.5rem] text-gray-600 text-base md:text-lg leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Ready to draw section */}
        <section className="mb-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2c2c2c]">¿Listo para empezar a dibujar?</h2>
          <div className="flex justify-center px-2">
            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="w-full max-w-sm bg-[#A505F1] hover:bg-[#8204BE] text-white text-xl md:text-2xl font-bold py-3 md:py-4 px-4 md:px-8 rounded-2xl border-4 border-[#2c2c2c] shadow-[4px_4px_0px_0px_#2c2c2c] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_#2c2c2c] transition-all flex items-center justify-center gap-2 animate-shine">
              <ShoppingCart className="w-6 h-6 shrink-0 animate-wiggle" />
              <span className="text-center leading-tight whitespace-nowrap">¡QUIERO MI MANUAL!</span>
            </a>
          </div>
        </section>

        {/* WhatsApp CTA */}
        <section className="mb-14 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">¿Aún tienes dudas?</h3>
          <div className="flex justify-center px-2">
            <a href="https://wa.me/5519988508110?text=%C2%A1Hola!%20Vengo%20de%20la%20p%C3%A1gina%20del%20manual%20y%20tengo%20una%20pregunta." target="_blank" rel="noopener noreferrer" className="w-full max-w-sm bg-[#25D366] hover:bg-[#1DA851] text-white text-xl font-bold py-3 md:py-4 px-4 md:px-8 rounded-2xl border-4 border-[#2c2c2c] shadow-[4px_4px_0px_0px_#2c2c2c] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_#2c2c2c] transition-all flex items-center justify-center gap-2">
               <MessageCircle className="w-6 h-6 shrink-0 animate-wiggle" />
               <span className="text-center leading-tight whitespace-nowrap">Escríbenos por WhatsApp</span>
            </a>
          </div>
        </section>

        {/* About the Creator Section */}
        <section className="mb-14 max-w-2xl mx-auto">
          <div className="bg-[#F4EDE3] p-6 md:p-8 rounded-3xl border-4 border-[#2c2c2c] shadow-[6px_6px_0px_0px_#2c2c2c] text-center -rotate-0.5">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#2c2c2c] flex items-center justify-center gap-2">
              <span className="text-2xl md:text-3xl inline-block animate-wiggle">🎨</span>
              <span>¿Quién creó el Manual?</span>
            </h2>

            {/* Round photo with rotating dashed border */}
            <div className="relative w-52 h-52 md:w-64 md:h-64 mx-auto mb-6 flex items-center justify-center rounded-full shadow-[6px_6px_0px_0px_#A505F1] bg-white">
              {/* Constantly spinning dashed border */}
              <div className="absolute inset-0 rounded-full border-4 border-[#2c2c2c] border-dashed animate-spin-slow pointer-events-none z-10" />

              {/* Upright Photo */}
              <div className="relative w-full h-full rounded-full overflow-hidden p-2 z-0">
                <img 
                  src="/images/junior.webp" 
                  alt="Junior Launther" 
                  width={256} 
                  height={256} 
                  loading="lazy" 
                  decoding="async" 
                  className="w-full h-full object-cover rounded-full select-none" 
                />
              </div>
            </div>

            <div className="space-y-4 text-lg md:text-xl text-[#2c2c2c] leading-relaxed max-w-xl mx-auto">
              <p>
                ¡Hola! Soy Junior Launther, artista y creador de <a href="https://www.instagram.com/ateliedoju" target="_blank" rel="noopener noreferrer" className="font-bold text-[#A505F1] hover:underline">@ateliedoju</a>. Comparto mis creaciones e ideas para despertar la creatividad, ¡incluso en quienes creen que no saben dibujar!
              </p>
              <p>
                Llevo 17 años en internet y también creo contenido para A Casa do Ju, que reúne a más de 350 mil seguidores en las redes sociales. Este Manual nació de mi deseo de hacer que dibujar sea más sencillo, accesible y divertido.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Comprar Ahora with Floating 63% OFF Badge */}
        <div className="flex justify-center mb-14 px-2">
          <div className="relative w-full max-w-sm">
            <a 
              href={checkoutUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full bg-[#A505F1] hover:bg-[#8204BE] text-white text-xl md:text-2xl font-bold py-3 md:py-4 px-4 md:px-8 rounded-2xl border-4 border-[#2c2c2c] shadow-[4px_4px_0px_0px_#2c2c2c] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_#2c2c2c] transition-all flex items-center justify-center gap-2 animate-shine"
            >
              <ShoppingCart className="w-6 h-6 shrink-0 animate-wiggle" />
              <span className="text-center leading-tight whitespace-nowrap">COMPRAR AHORA</span>
            </a>

            {/* 63% OFF Floating Badge - Outside button on top-right */}
            <div className="absolute -top-3.5 -right-3 md:-top-4 md:-right-3.5 z-20 pointer-events-none">
              <span className="inline-flex items-center justify-center bg-[#EF4444] text-white text-xs md:text-sm font-black px-2.5 py-1 rounded-full border-2 border-[#2c2c2c] shadow-[3px_3px_0px_0px_#2c2c2c] animate-badge-pulse uppercase tracking-wider whitespace-nowrap">
                63% OFF
              </span>
            </div>
          </div>
        </div>

      </main>

      <footer className="text-center py-8 text-gray-500 text-sm max-w-4xl mx-auto px-4 relative">
        <div className="absolute top-0 left-1/4 right-1/4 h-1 border-t-2 border-dashed border-[#2c2c2c] opacity-20"></div>

        <div className="flex justify-center mb-6 mt-8">
          <img 
            src="/images/logo.webp" 
            alt="Manual Para Dibujar" 
            loading="lazy"
            decoding="async"
            width={400}
            height={224}
            className="h-16 md:h-20 w-auto object-contain drop-shadow-sm opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>

        <p className="mt-4">© 2026 Manual Para Dibujar - Biblioteca de Ilustraciones</p>
        <p>Todos los derechos reservados - Ateliê do Ju</p>
        <p>CNPJ 51.041.767/0001-08</p>
      </footer>

      {/* Fake Purchase Notification */}
      <AnimatePresence>
        {purchaseNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-6 z-50 bg-[#4CAF50] text-white px-5 py-3 rounded-2xl border-2 border-[#2c2c2c] shadow-[4px_4px_0px_0px_#2c2c2c] flex items-center gap-3 font-bold text-sm md:text-base pointer-events-none"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            {purchaseNotification}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
