import { useEffect, useMemo, useRef, useState } from "react";

const OurSectors = () => {
  const sectors = useMemo(
    () => [
      {
        title: "Static Guarding",
        description:
          "Trained officers provide on-site protection, deterring intruders and safeguarding premises.",
        imageUrl: "/images/Static Guarding2.jpg",
      },
      {
        title: "Mobile Patrols",
        description:
          "Regular patrols secure your premises, checking vulnerable areas and deterring threats.",
        imageUrl: "/images/mobile patrol2.jpg",
      },
      {
        title: "Event Security",
        description:
          "Specialist guards manage entry, monitor crowds, and maintain order at events.",
        imageUrl: "/images/security1.jpg",
      },
      {
        title: "CCTV Monitoring",
        description:
          "Proactive camera monitoring to quickly detect and respond to incidents.",
        imageUrl: "/images/monitoring.jpg",
      },
      {
        title: "Access Control",
        description:
          "Manage and restrict entry with professional access control solutions.",
        imageUrl: "/images/walkitalki.jpg",
      },
      {
        title: "Retail Security",
        description:
          "Loss prevention and customer safety with trained retail security staff.",
        imageUrl: "/images/security2.jpg",
      },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  
  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragCurrentX, setDragCurrentX] = useState(0);
  const [dragStartTranslateX, setDragStartTranslateX] = useState(0);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 768) {
        setItemsPerView(3);
      } else {
        setItemsPerView(1);
      }
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  useEffect(() => {
    const maxIndex = Math.max(0, sectors.length - itemsPerView);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerView, sectors.length, currentIndex]);

  const getSlideWidth = () => {
    if (!viewportRef.current) return 0;
    const viewportWidth = viewportRef.current.clientWidth;
    return viewportWidth / itemsPerView;
  };

  const getMaxTranslateX = () => {
    const slideWidth = getSlideWidth();
    const maxSlides = Math.max(0, sectors.length - itemsPerView);
    return maxSlides * slideWidth;
  };

  const getCurrentTranslateX = () => {
    const slideWidth = getSlideWidth();
    return currentIndex * slideWidth;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);
    
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragCurrentX(e.clientX);
    setDragStartTranslateX(getCurrentTranslateX());
    
    e.preventDefault();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    setDragCurrentX(e.clientX);
    e.preventDefault();
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const target = e.currentTarget;
    target.releasePointerCapture(e.pointerId);
    
    const dragDistance = dragCurrentX - dragStartX;
    const slideWidth = getSlideWidth();
    
    // Calculate which slide we should snap to
    const currentTranslateX = dragStartTranslateX - dragDistance;
    const targetIndex = Math.round(currentTranslateX / slideWidth);
    
    // Apply bounds
    const maxIndex = Math.max(0, sectors.length - itemsPerView);
    const clampedIndex = Math.min(maxIndex, Math.max(0, targetIndex));
    
    setCurrentIndex(clampedIndex);
    setIsDragging(false);
    setDragStartX(0);
    setDragCurrentX(0);
    setDragStartTranslateX(0);
  };

  // Calculate the current transform
  const getTransform = () => {
    if (isDragging) {
      const dragDistance = dragCurrentX - dragStartX;
      const newTranslateX = dragStartTranslateX - dragDistance;
      const maxTranslateX = getMaxTranslateX();
      
      // Allow slight overscroll for better UX, but with resistance
      let finalTranslateX = newTranslateX;
      if (newTranslateX < 0) {
        finalTranslateX = newTranslateX * 0.3; // Resistance when dragging past start
      } else if (newTranslateX > maxTranslateX) {
        const excess = newTranslateX - maxTranslateX;
        finalTranslateX = maxTranslateX + (excess * 0.3); // Resistance when dragging past end
      }
      
      return `translateX(-${finalTranslateX}px)`;
    } else {
      const translateX = getCurrentTranslateX();
      return `translateX(-${translateX}px)`;
    }
  };

  const cardWidthPercent = 100 / itemsPerView;

  return (
    <section className="relative">
      <div className="bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-3">Our Sectors</h2>
            <p className="text-white text-lg max-w-4xl mx-auto leading-relaxed">
              G20 Security delivers tailored security services across industries, from construction sites to retail and more. With
              experienced guards and free guard tracking, we ensure transparency, reliability, and peace of mind.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="relative">
          {/* Slider viewport */}
          <div
            ref={viewportRef}
            className={`overflow-hidden select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            style={{ touchAction: "pan-y" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
          >
            {/* Slider track */}
            <div
              ref={trackRef}
              className={`flex gap-6 ${isDragging ? "" : "transition-transform duration-300 ease-out"}`}
              style={{ 
                transform: getTransform(),
                willChange: 'transform'
              }}
            >
              {sectors.map((sector, index) => (
                <div
                  key={sector.title + index}
                  className="shrink-0 rounded-2xl shadow-xl overflow-hidden bg-white"
                  style={{ width: `${cardWidthPercent}%` }}
                >
                  <div className="h-56">
                    <img 
                      src={sector.imageUrl} 
                      alt={sector.title} 
                      className="w-full h-full object-cover select-none" 
                      draggable={false}
                    />
                  </div>
                  <div className="bg-gray-100 p-5">
                    <h3 className="text-base font-semibold text-gray-900 mb-2">{sector.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{sector.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center items-center gap-2 mt-6 mb-6">
            {Array.from({ length: Math.max(1, sectors.length - itemsPerView + 1) }).map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setCurrentIndex(dotIndex)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  dotIndex === currentIndex ? "bg-gray-700" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${dotIndex + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurSectors;