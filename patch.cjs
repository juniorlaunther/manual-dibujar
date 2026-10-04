const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const newImages = `
const productImages = [
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgTwZ5wxrmuzs-tgjtG4W0M9SDHx7L0bMtKSbKWEfr1E3leXFsQFUMO1TYuHG-op5wdk-dIj-HzN4Hap9xMcyruSy0t1iSz0OPGyO5BUrCo2rnjfz9CMhyphenhyphenCd-Z_8z1STM0liZXQ3jnO7tjz1PiJO-mAtxqsQDBzWaZhgkTl6jlEtUuUlMwJaCPx3nx48lk/w512-h640/01%20(1).jpeg",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6_jfq5kmgki5bzjeL6sgkHfsMGrBtcf68VEwzFdlRK24uoasd05k7k5oOf2aq3zzN53fDhCSn2paTfySMqFRO6dxH_tUNyEdbTv75gni3ZQq6jXkbZS2sSgPqErTZenC1coO3JtrHrvE1VzqVMNmq0Wy0G1xuirGx93jpKeNEfKrY9VTzqoJ3CofmdOc/w512-h640/01%20(2).jpeg",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjIog6xCQWGyK40VXN-CkPj_kU7i-aUZqcIP41ESMVpFhSsXB3Bq618AzutNo_aOPeizX3it0819nD-t149HBFSy_Wx2lvspx-HxevvfbnFS1SiWD73sB3WeTBFOaLUm294nLmxX06AbparkfE0JMEGBmcotPyFseTOaurE9016MiRG0M0Ts25cZmSeuQU/w512-h640/01%20(3).jpeg",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh88QY4gLx5x52xrta2pEjiuzqKuA4RKlfc7yApgss_uBsT83lsv8tdAMwuIwpeLgPGOLW57piX4YocqBrwLRBJm3iWvE0KilgZtEarNasKqiXR6Z1nRIxP4up24IdcFfM58laH2EG4QKNlwjLP0n7kni1lKEdEInEKvmZMJOCKQD62K-3K4oAB4SI1MWw/w512-h640/01%20(4).jpeg",
];

const testimonialImages = [
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiEBFMLMSa5m-8OeixCKUUJvVWRq9nsWBWNkXK_nvIk9v3rSq1t_JASum3E9X8v8i4_v1uVcwUlXSdsPS0dqmpJ10_A7Q_9wI3KWGJiscicoRkIbFxK-sHbEoES1zKdoroLSAXn7BHC48Z2YQQJTdsqy_lwLw1M1Zkgfzing-m-0SNijWKey8QtjNKJbKc/w480-h640/Depoimento%2001.jpeg",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhf-3KBC8LsMWMM-PBre2O8J_ubHJQ95LR1PH4NREqCdylJKKraf1vVS1X0b66mYjfqjOHgj5BWadsA9SsdCI23AL2TpkyFHpmeixmh8JlD1t8Oo6WhL8l760p3yoOp4lLRvbkPCRllN1wP2xOudfBvG7PgMTd-Se1bz4rjWqMgC4XHasLe_hmL9U7tZoQ/w480-h640/Depoimento%2002.jpeg",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhXlv3_qs8Nz04hBEb5iU9ZphXd-UTYli0FsD9AJqCD9epzklTrFrfDp-Fvf52ZmjAdI4IMfVCrBc2GcSHXVAx96Fbe_rZ1uFGci1UnhqmVu5jD9-wqfXLqVfqu3_4HWVr0_e8dzmwIgucTgFzeYrvCXh7bp5r_u_TbHiZtswDFx9oXWKkuHF7nmEsHaSk/w480-h640/Depoimento%2003.jpeg"
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [lightboxData, setLightboxData] = useState<{ index: number, type: 'product' | 'testimonial' } | null>(null);
  const [direction, setDirection] = useState(0);
  const [purchaseNotification, setPurchaseNotification] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
`;

code = code.replace(/export default function App\(\) {[\s\S]*?const carouselRef = useRef<HTMLDivElement>\(null\);/, newImages);

// Replace paginate
const oldPaginate = `  const productImages = [
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgTwZ5wxrmuzs-tgjtG4W0M9SDHx7L0bMtKSbKWEfr1E3leXFsQFUMO1TYuHG-op5wdk-dIj-HzN4Hap9xMcyruSy0t1iSz0OPGyO5BUrCo2rnjfz9CMhyphenhyphenCd-Z_8z1STM0liZXQ3jnO7tjz1PiJO-mAtxqsQDBzWaZhgkTl6jlEtUuUlMwJaCPx3nx48lk/w512-h640/01%20(1).jpeg",
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6_jfq5kmgki5bzjeL6sgkHfsMGrBtcf68VEwzFdlRK24uoasd05k7k5oOf2aq3zzN53fDhCSn2paTfySMqFRO6dxH_tUNyEdbTv75gni3ZQq6jXkbZS2sSgPqErTZenC1coO3JtrHrvE1VzqVMNmq0Wy0G1xuirGx93jpKeNEfKrY9VTzqoJ3CofmdOc/w512-h640/01%20(2).jpeg",
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjIog6xCQWGyK40VXN-CkPj_kU7i-aUZqcIP41ESMVpFhSsXB3Bq618AzutNo_aOPeizX3it0819nD-t149HBFSy_Wx2lvspx-HxevvfbnFS1SiWD73sB3WeTBFOaLUm294nLmxX06AbparkfE0JMEGBmcotPyFseTOaurE9016MiRG0M0Ts25cZmSeuQU/w512-h640/01%20(3).jpeg",
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh88QY4gLx5x52xrta2pEjiuzqKuA4RKlfc7yApgss_uBsT83lsv8tdAMwuIwpeLgPGOLW57piX4YocqBrwLRBJm3iWvE0KilgZtEarNasKqiXR6Z1nRIxP4up24IdcFfM58laH2EG4QKNlwjLP0n7kni1lKEdEInEKvmZMJOCKQD62K-3K4oAB4SI1MWw/w512-h640/01%20(4).jpeg",
  ];

  const paginate = (newDirection: number) => {
    if (lightboxIndex !== null) {
      setDirection(newDirection);
      setLightboxIndex((prev) => {
        if (prev === null) return 0;
        let next = prev + newDirection;
        if (next < 0) next = productImages.length - 1;
        if (next >= productImages.length) next = 0;
        return next;
      });
    }
  };`;

const newPaginate = `
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
  };`;

code = code.replace(oldPaginate, newPaginate);

// Replace escape key logic
const oldKeyLogic = `  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    if (lightboxIndex !== null) {
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
  }, [lightboxIndex]);`;

const newKeyLogic = `  // Close lightbox on Escape key
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
  }, [lightboxData]);`;

code = code.replace(oldKeyLogic, newKeyLogic);

// Replace lightbox render logic
const oldLightboxRender = `      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm"
          >
            <button
              onClick={() => setLightboxIndex(null)}
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
                  key={lightboxIndex}
                  src={productImages[lightboxIndex]}
                  custom={direction}`;

const newLightboxRender = `      {/* Lightbox Overlay */}
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
                  custom={direction}`;

code = code.replace(oldLightboxRender, newLightboxRender);

const oldLightboxClose = `              <ChevronRight className="w-8 h-8 text-[#2c2c2c]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>`;

const newLightboxClose = `              <ChevronRight className="w-8 h-8 text-[#2c2c2c]" />
              </button>
            </div>
          </motion.div>
        );})()}
      </AnimatePresence>`;

code = code.replace(oldLightboxClose, newLightboxClose);

// Replace setLightboxIndex in Carousel
const oldProductClick = `onClick={() => setLightboxIndex(i)}`;
const newProductClick = `onClick={() => setLightboxData({ index: i, type: 'product' })}`;
code = code.replace(oldProductClick, newProductClick);


// Add the Testimonial Section
const testimonialsSection = `
        {/* Depoimentos Recentes */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-[#2c2c2c] flex justify-center items-center gap-3">
             <span className="animate-pulse inline-block">💙</span>
             Depoimentos recentes
          </h2>
          <div className="relative mb-12 w-full max-w-4xl mx-auto">
             <div 
               ref={testimonialRef}
               onScroll={handleTestimonialScroll}
               className="flex md:grid md:grid-cols-3 lg:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-4 md:gap-6 py-4 md:py-6 no-scrollbar px-2 scroll-smooth"
             >
                {testimonialImages.map((url, i) => (
                 <div key={i} className="w-[85vw] max-w-[280px] md:w-full md:max-w-none shrink-0 snap-center mx-auto flex justify-center relative hover:z-10">
                    <div 
                      className={\`bg-white p-2 md:p-3 border-4 border-[#2c2c2c] shadow-[4px_4px_0px_0px_#436CC0] rounded-xl w-full transition-transform duration-300 hover:scale-105 cursor-pointer \${i % 2 === 0 ? 'rotate-1 hover:rotate-2' : '-rotate-1 hover:-rotate-2'}\`}
                      onClick={() => setLightboxData({ index: i, type: 'testimonial' })}
                    >
                      <img 
                        src={url} 
                        alt={\`Depoimento \${i + 1}\`} 
                        className="w-full aspect-[3/4] object-cover rounded-lg border-2 border-dashed border-gray-300 pointer-events-none" 
                      />
                    </div>
                 </div>
               ))}
             </div>
             <div className="flex md:hidden items-center justify-center gap-2 mt-1 text-gray-500 text-sm">
               <span className="animate-pulse">👈</span> Deslize para ver mais <span className="animate-pulse">👉</span>
             </div>
             <div className="flex md:hidden justify-center gap-3 mt-2">
               {testimonialImages.map((_, i) => (
                 <button 
                   key={i} 
                   onClick={() => scrollToTestimonialImage(i)}
                   aria-label={\`Ver depoimento \${i + 1}\`}
                   className={\`w-3 h-3 rounded-full border-2 border-[#2c2c2c] cursor-pointer transition-colors \${activeTestimonialIndex === i ? 'bg-[#436CC0]' : 'bg-transparent'}\`}
                 />
               ))}
             </div>
          </div>
        </section>

        {/* Guarantee */}
`;

code = code.replace(`        {/* Guarantee */}`, testimonialsSection);


fs.writeFileSync('src/App.tsx', code);
