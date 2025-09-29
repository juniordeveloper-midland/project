 

import { useEffect, useMemo, useRef, useState } from "react";

const OurSectors = () => {
  const sectors = useMemo(
    () => [
      {
        title: "Static Guarding",
        description:
          "Trained officers provide on-site protection, deterring intruders and safeguarding premises.",
        imageUrl: "/public/images/Static Guarding2.jpg",
      },
      {
        title: "Mobile Patrols",
        description:
          "Regular patrols secure your premises, checking vulnerable areas and deterring threats.",
        imageUrl: "/public/images/mobile patrol2.jpg",
      },
      {
        title: "Event Security",
        description:
          "Specialist guards manage entry, monitor crowds, and maintain order at events.",
        imageUrl: "/public/images/security1.jpg",
      },
      {
        title: "CCTV Monitoring",
        description:
          "Proactive camera monitoring to quickly detect and respond to incidents.",
        imageUrl: "/public/images/monitoring.jpg",
      },
      {
        title: "Access Control",
        description:
          "Manage and restrict entry with professional access control solutions.",
        imageUrl: "/public/images/walkitalki.jpg",
      },
      {
        title: "Retail Security",
        description:
          "Loss prevention and customer safety with trained retail security staff.",
        imageUrl: "/public/images/security2.jpg",
      },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const [dragStartIndex, setDragStartIndex] = useState(0);

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

  const getCardWidthPx = (): number => {
    const viewport = viewportRef.current;
    if (!viewport) return 0;
    const viewportWidth = viewport.clientWidth;
    return viewportWidth / itemsPerView;
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const container = e.currentTarget;
    container.setPointerCapture?.(e.pointerId);
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragDeltaX(0);
    setDragStartIndex(currentIndex);
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!isDragging) return;
    setDragDeltaX(e.clientX - dragStartX);
  };

  const onPointerUpOrLeave: React.PointerEventHandler<HTMLDivElement> = () => {
    if (!isDragging) return;
    const cardWidthPx = getCardWidthPx();
    const deltaIndex = cardWidthPx > 0 ? dragDeltaX / cardWidthPx : 0;
    const rawIndex = dragStartIndex - deltaIndex;
    const maxIndex = Math.max(0, sectors.length - itemsPerView);
    const snappedIndex = Math.min(maxIndex, Math.max(0, Math.round(rawIndex)));
    setCurrentIndex(snappedIndex);
    setIsDragging(false);
    setDragDeltaX(0);
  };

  const cardWidthPercent = 100 / itemsPerView; // 100% for 1 per view, ~33.333% for 3 per view
  const cardWidthPx = getCardWidthPx();
  const deltaIndexWhileDragging = cardWidthPx > 0 ? dragDeltaX / cardWidthPx : 0;
  const effectiveIndex = isDragging ? dragStartIndex - deltaIndexWhileDragging : currentIndex;
  const translatePercent = effectiveIndex * cardWidthPercent;

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
            className={`overflow-hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            style={{ touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUpOrLeave}
            onPointerLeave={onPointerUpOrLeave}
            onPointerCancel={onPointerUpOrLeave}
          >
            {/* Slider track */}
            <div
              className={`flex gap-6 ${isDragging ? "transition-none" : "transition-transform duration-500 ease-out"}`}
              style={{ transform: `translateX(-${translatePercent}%)` }}
            >
              {sectors.map((sector, index) => (
                <div
                  key={sector.title + index}
                  className="shrink-0 rounded-2xl shadow-xl overflow-hidden bg-white"
                  style={{ width: `${cardWidthPercent}%` }}
                >
                  <div className="h-56">
                    <img src={sector.imageUrl} alt={sector.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-gray-100 p-5">
                    <h3 className="text-base font-semibold text-gray-900 mb-2">{sector.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{sector.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Range of slides indicator (optional) */}
          <div className="flex justify-center items-center gap-2 mt-6 mb-6">
            {Array.from({ length: Math.max(1, sectors.length - itemsPerView + 1) }).map((_, dotIndex) => (
              <span
                key={dotIndex}
                className={`inline-block w-2 h-2 rounded-full ${dotIndex === currentIndex ? "bg-gray-700" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurSectors;