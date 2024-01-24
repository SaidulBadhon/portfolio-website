import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

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
    // }, [emblaApi, onInit, onSelect]);
  }, [emblaApi, +onSelect]);

  return (
    <div
      className="embla bg-gray-900 bg-opacity-10 dark:bg-white dark:bg-opacity-10"
      ref={emblaRef}
      style={{
        marginBlock: 48,
        padding: "1rem",

        backdropFilter: "blur(10px)",
        borderRadius: "1rem",
      }}
    >
      <div className="embla__container" style={{ gap: "1rem" }}>
        {gallery?.map((item, i) => (
          <div key={i} className="embla__slide">
            <img
              // {...item.url}
              src={item.url.src}
              // src={.blurDataURL}
              alt="Project I worked on"
              quality={95}
              className="w-full rounded-lg shadow-2xl"
              style={{
                width: "100%",
                // aspectRatio: 16 / 10,
                maxHeight: 790,
                objectFit: "contain",
                borderRadius: "1rem",
                overflow: "hidden",
              }}
            />
          </div>
        ))}
      </div>

      <div
        className="embla__buttons"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 2rem",

          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          transform: "translateY(-50%)",
        }}
      >
        <button
          className="h-[5rem] w-[5rem] flex justify-center items-center rounded-full transition duration-200 ease-in-out backdrop-blur-sm bg-transparent text-white hover:bg-[#ffffff11] active:bg-[#ffffff22]"
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
        >
          <IoIosArrowForward
            style={{
              transform: "rotate(180deg)",
              fontSize: "2rem",
            }}
          />
        </button>

        <button
          className="h-[5rem] w-[5rem] flex justify-center items-center rounded-full transition duration-200 ease-in-out backdrop-blur-sm bg-transparent text-white hover:bg-[#ffffff11] active:bg-[#ffffff22]"
          onClick={scrollNext}
          disabled={nextBtnDisabled}
        >
          <IoIosArrowForward
            style={{
              fontSize: "2rem",
            }}
          />
        </button>
      </div>

      {/* Dots */}
      <div
        className="embla__dots"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: 0,
          right: 0,
          margin: "0 auto",

          display: "flex",
          justifyContent: "center",
        }}
      >
        {gallery?.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={"embla__dot".concat(
              index === selectedIndex ? " embla__dot--selected" : ""
            )}
          >
            <GoDotFill
              style={{
                color: index === selectedIndex ? "#ffffff" : "#ffffff22",
                fontSize: index === selectedIndex ? "1.25rem" : "1rem",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
