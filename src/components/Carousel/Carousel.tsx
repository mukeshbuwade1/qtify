import React, { useCallback, useEffect, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import CarouselNavLeft from "./CarouselNavLeft";
import CarouselNavRight from "./CarouselNavRight";
import styles from "./Carousel.module.css";

export type CarouselProps = {
  /** Any slide content (cards, text, etc.). Each direct child becomes one slide. */
  children: React.ReactNode;
  /** Optional class on the outer wrapper. */
  className?: string;
};

function readNavState(sw: SwiperClass) {
  return {
    isBeginning: sw.isBeginning,
    isEnd: sw.isEnd,
  };
}

/**
 * Horizontal swiper with custom prev/next controls (non-cyclic).
 * Pass arbitrary React nodes as children; each becomes one slide.
 */
export default function Carousel({ children, className }: CarouselProps) {
  const [nav, setNav] = useState({ isBeginning: true, isEnd: false });
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const updateNav = useCallback((sw: SwiperClass) => {
    setNav(readNavState(sw));
  }, []);

  const handleSwiper = useCallback(
    (sw: SwiperClass) => {
      setSwiper(sw);
      updateNav(sw);
    },
    [updateNav]
  );

  const slidePrev = useCallback(() => {
    swiper?.slidePrev();
  }, [swiper]);

  const slideNext = useCallback(() => {
    swiper?.slideNext();
  }, [swiper]);

  const slides = React.Children.toArray(children).filter(Boolean);

  useEffect(() => {
    if (!swiper) return;
    swiper.update();
    updateNav(swiper);
  }, [slides.length, swiper, updateNav]);

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
      <CarouselNavLeft hidden={nav.isBeginning} onClick={slidePrev} />
      <Swiper
        className={styles.swiper}
        slidesPerView="auto"
        spaceBetween={20}
        loop={false}
        watchOverflow
        onSwiper={handleSwiper}
        onSlideChange={updateNav}
        onResize={updateNav}
      >
        {slides.map((child, index) => (
          <SwiperSlide
            key={
              React.isValidElement(child) && child.key != null
                ? String(child.key)
                : `slide-${index}`
            }
            className={styles.slide}
          >
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
      <CarouselNavRight hidden={nav.isEnd} onClick={slideNext} />
    </div>
  );
}
