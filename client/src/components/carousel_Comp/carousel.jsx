import { useEffect, useState } from "react";
import './carousel.scss'

const Carousel = ({ banners }) => {
    const [activeIndex, setActiveIndex] = useState(0);
  
    useEffect(() => {
      setInterval(() => {
        setActiveIndex((prev) => (prev - 1 + banners.length) % banners.length);
      }, 5000);
    }, []);
  
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
      <div className="carousel slide h-96">
        <div className="carousel-indicators">
          {banners.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              className={`${
                activeIndex === index ? "bg-white" : "bg-[#fafafab6]"
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
              className={`carousel-item rounded-xl overflow-hidden ${
                activeIndex === index ? "active" : ""
              }  `}
            >
              <img
                src={image.src}
                className="d-block w-full h-96 object-cover"
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