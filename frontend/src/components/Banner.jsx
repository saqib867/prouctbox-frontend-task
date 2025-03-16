

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const slides = [
    {
      title: "50% Off For Your First Shopping",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      buttonText: "Shop Now",
      image: "https://template.getbazaar.io/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fnike-black.png&w=1920&q=75", // Replace with your actual image path
    },
    {
      title: "New Arrivals - Exclusive Collection",
      description:
        "Discover the latest trends with our new arrivals. Limited stock available!",
      buttonText: "Explore",
      image: "https://template.getbazaar.io/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fflash-2.png&w=1920&q=75",
    },
  ];

  return (
    <div className="w-full bg-gray-50">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className=" slick-class flex  items-center justify-center px-10 md:px-20 py-10 "
            
          >
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {slide.title}
              </h1>
              <p className="text-gray-600 mb-6">{slide.description}</p>
              <button className="bg-red-500 text-white px-6 py-3 rounded-md text-lg">
                {slide.buttonText}
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src={slide.image}
                alt="Banner"
                className="w-80 md:w-[400px] lg:w-[500px] object-cover"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
