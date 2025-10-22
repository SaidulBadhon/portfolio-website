import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

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
  }, [emblaApi, onSelect]);

  return (
    <div className="embla mt-4" ref={emblaRef}>
      <div className="embla__container" style={{ gap: "1rem" }}>
        {reviews?.map((item, i) => (
          <div
            key={i}
            className="embla__slide min-w-0 flex-[0_0_100%] sm:flex-[0_0_80%] lg:flex-[0_0_60%]"
          >
            <div className="bg-gray-900/5 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 h-full flex flex-col">
              <div className="flex gap-4 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="rounded-full w-14 h-14 flex-shrink-0"
                  src={`https://source.boringavatars.com/marble/120/${item?.name}?colors=84595c,5c5985,111827`}
                  alt={item?.name}
                />

                <div className="flex flex-col justify-center">
                  <p className="text-lg font-bold">{item?.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item?.title}
                  </p>
                </div>
              </div>

              <blockquote className="text-base text-gray-700 dark:text-gray-300 leading-relaxed italic flex-1">
                &ldquo;{item?.description}&rdquo;
              </blockquote>
            </div>
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

      {/* Navigation Dots */}
      {reviews && reviews.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`transition-all duration-200 ${
                index === selectedIndex
                  ? "w-8 h-2 bg-gray-700 dark:bg-gray-300"
                  : "w-2 h-2 bg-gray-400 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-400"
              } rounded-full`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
