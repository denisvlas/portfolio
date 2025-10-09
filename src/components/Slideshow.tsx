import { useState, useEffect } from 'react';
import './Slideshow.css';

interface SlideProps {
  images: string[];
  autoPlayInterval?: number;
}

function Slideshow({ images, autoPlayInterval = 5000 }: SlideProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, autoPlayInterval);
    
    return () => clearInterval(interval);
  }, [isPlaying, images.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="slideshow-container">
      <div className="slideshow-content">
        <button className="slideshow-nav prev" onClick={prevSlide}>
          <i className="bi bi-chevron-left"></i>
        </button>
        
        <div className="slide">
          <img 
            src={images[currentSlide]} 
            alt={`Slide ${currentSlide + 1}`} 
            className="slide-image"
          />
          <div className="slide-counter">{currentSlide + 1} / {images.length}</div>
        </div>
        
        <button className="slideshow-nav next" onClick={nextSlide}>
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
      
      <div className="slideshow-controls">
        <button 
          className="control-btn"
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
        </button>
        
        <div className="slideshow-dots">
          {images.map((_, index) => (
            <button 
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slideshow;