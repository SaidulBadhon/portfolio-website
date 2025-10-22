import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { IoIosArrowForward } from "react-icons/io";

const options = {
  loop: true,
};

export default function GallerySection({ gallery }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // const [scrollSnaps, setScrollSnaps] = useState([]);

  // console.log("scrollSnaps", scrollSnaps);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  // const onInit = useCallback((emblaApi) => {
  //   setScrollSnaps(emblaApi.scrollSnapList());
  // }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    // onInit(emblaApi);
    onSelect(emblaApi);
    // emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Project Gallery</h2>

      <div
        className="embla bg-gray-900/10 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6"
        ref={emblaRef}
      >
        <div className="embla__container" style={{ gap: "1rem" }}>
          {gallery?.map((item, i) => (
            <div key={i} className="embla__slide">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url.src}
                alt={item.description || `Project screenshot ${i + 1}`}
                className="w-full rounded-xl shadow-2xl object-contain"
                style={{
                  maxHeight: "600px",
                }}
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {gallery && gallery.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
            <button
              className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 flex justify-center items-center rounded-full bg-gray-900/50 dark:bg-white/50 text-white dark:text-gray-900 hover:bg-gray-900/70 dark:hover:bg-white/70 transition-all disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm"
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              aria-label="Previous image"
            >
              <IoIosArrowForward className="text-2xl rotate-180" />
            </button>

            <button
              className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 flex justify-center items-center rounded-full bg-gray-900/50 dark:bg-white/50 text-white dark:text-gray-900 hover:bg-gray-900/70 dark:hover:bg-white/70 transition-all disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm"
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              aria-label="Next image"
            >
              <IoIosArrowForward className="text-2xl" />
            </button>
          </div>
        )}

        {/* Navigation Dots */}
        {gallery && gallery.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            {gallery.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`transition-all duration-200 ${
                  index === selectedIndex
                    ? "w-8 h-2 bg-gray-700 dark:bg-gray-300"
                    : "w-2 h-2 bg-gray-400 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-400"
                } rounded-full`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
