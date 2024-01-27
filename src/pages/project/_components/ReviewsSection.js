import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

const options = {
  loop: true,
};

export default function ReviewsSection({ reviews }) {
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
      className="embla bg-opacity-10 dark:bg-opacity-10 mt-2 "
      style={{
        maxWidth: "calc(100vw - 80px)",
      }}
      ref={emblaRef}
    >
      <div className="embla__container" style={{ gap: "1rem" }}>
        {reviews?.map((item, i) => (
          <div
            key={i}
            className="embla__slide"
            style={{
              aspectRatio: 3 / 1.15,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <div className="flex gap-3">
              <img
                className="rounded-full w-12 h-12"
                src={`https://source.boringavatars.com/marble/120/${item?.name}?colors=84595c,5c5985,111827`}
              />

              <div className="flex flex-col justify-center items-start gap-0">
                <p className="text-xl font-bold">{item?.name}</p>
                <p className="text-sm">{item?.title}</p>
              </div>
            </div>

            <p
              className="text-lg font-medium mt-4 py-3 px-6 relative"
              style={{
                backdropFilter: "blur(2px)",
                borderRadius: ".5rem",
              }}
            >
              <q className="max4Lines">{item?.description}</q>
            </p>
          </div>
        ))}
      </div>

      {/* <div
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
      </div> */}

      {/* Dots */}
      <div
        className="embla__dots md:bottom-[16px] sm:bottom-0"
        style={{
          position: "absolute",
          // bottom: "2rem",
          // bottom: "1rem",
          left: 0,
          right: 0,
          margin: "0 auto",

          display: "flex",
          justifyContent: "center",
        }}
      >
        {reviews?.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={"embla__dot".concat(
              index === selectedIndex ? " embla__dot--selected" : ""
            )}
          >
            <GoDotFill
              // style={{
              //   color: index === selectedIndex ? "#ffffff" : "#ffffff22",
              //   fontSize: index === selectedIndex ? "1.25rem" : "1rem",
              // }}
              className={`
              transition duration-200 ease-in-out 
              hover:text-slate-300 active:text-slate-50 text-slate-50${
                index === selectedIndex ? "" : "0"
              } 
              dark:hover:text-slate-700 dark:active:text-slate-900
              dark:text-slate-90${index === selectedIndex ? "" : "0"} `}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
