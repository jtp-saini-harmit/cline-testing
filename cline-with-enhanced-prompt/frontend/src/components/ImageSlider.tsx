import React, { useState, useEffect } from 'react';

interface Image {
  src: string;
  alt: string;
}

interface ImageSliderProps {
  images: Image[];
  autoPlayInterval?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(intervalId);
  }, [autoPlayInterval]);

  return (
    <div className="image-slider">
      <button className="slider-button prev" onClick={prevSlide}>&lt;</button>
      <img src={images[currentIndex].src} alt={images[currentIndex].alt} className="slider-image" />
      <button className="slider-button next" onClick={nextSlide}>&gt;</button>
    </div>
  );
};

export default ImageSlider;
