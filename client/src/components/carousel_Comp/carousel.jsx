import { useEffect, useState } from "react";
import "./carousel.scss";

const Carousel = ({ banners }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverBanner, setHoverBanner] = useState(false);

  useEffect(() => {
    let interval;
    if (!hoverBanner) {
      interval = setInterval(() => {
        setActiveIndex((prev) => ((prev + 1) % banners.length));
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hoverBanner, banners.length]);

  const handleMouseEnter = () => {
    setHoverBanner(true);
  };

  const handleMouseLeave = () => {
    setHoverBanner(false);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const nextSlide = () => {
    setActiveIndex((activeIndex + 1) % banners.length);
  };

  const prevSlide = () => {
    setActiveIndex((activeIndex - 1 + banners.length) % banners.length);
  };

  return (
    <div
      className="carousel slide h-96"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="carousel-indicators">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            className={`${
              activeIndex === index ? "bg-white shadow-md" : "bg-[#fafafab6]"
            } `}
            aria-current={activeIndex === index ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {banners.map((image, index) => (
          <div
            key={index}
            className={`carousel-item  ${
              activeIndex === index ? "active" : ""
            }  `}
          >
            <img
              src={image.src}
              className="d-block w-full h-[450px] object-cover"
              alt={image.alt}
            />
            <div className="carousel-caption d-none d-md-block">
              <h1 className="text-white text-3xl text-center">
                {image.caption.title}
              </h1>
              <p className="text-white text-xl text-center">
                {image.caption.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        onClick={prevSlide}
      >
        <span className="text-5xl text-[#fafafab6]">❮</span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={nextSlide}
      >
        <span className="text-5xl text-[#fafafab6]">❯</span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
