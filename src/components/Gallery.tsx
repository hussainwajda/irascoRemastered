'use client';

import { useState } from 'react';

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
}

interface GalleryProps {
  images: GalleryImage[];
  title: string;
  colorScheme: 'blue' | 'green' | 'red' | 'cyan';
}

export default function Gallery({ images, title, colorScheme }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const colorClasses = {
    blue: {
      gradient: 'from-blue-500 to-cyan-500',
      button: 'bg-blue-600 hover:bg-blue-700',
      dots: 'bg-blue-600'
    },
    green: {
      gradient: 'from-green-500 to-emerald-500',
      button: 'bg-green-600 hover:bg-green-700',
      dots: 'bg-green-600'
    },
    red: {
      gradient: 'from-red-500 to-orange-500',
      button: 'bg-red-600 hover:bg-red-700',
      dots: 'bg-red-600'
    },
    cyan: {
      gradient: 'from-cyan-500 to-blue-500',
      button: 'bg-cyan-600 hover:bg-cyan-700',
      dots: 'bg-cyan-600'
    }
  };

  const colors = colorClasses[colorScheme];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-slate-100 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">{title}</h2>
          <p className="text-xl text-gray-600">
            Professional installations and quality workmanship
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Gallery Container with Duct Frame */}
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Duct Frame */}
            <div className="absolute inset-0 p-4 pointer-events-none z-20">
              <div className="w-full h-full border-4 border-gray-300 rounded-2xl relative">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className={`absolute w-12 h-6 bg-gradient-to-r from-gray-400 to-gray-500 rounded shadow-inner ${
                    i === 0 ? 'top-2 left-2' : 
                    i === 1 ? 'top-2 left-1/2 -translate-x-1/2' : 
                    i === 2 ? 'top-2 right-2' : 
                    i === 3 ? 'bottom-2 right-2' : 
                    i === 4 ? 'bottom-2 left-1/2 -translate-x-1/2' : 
                    i === 5 ? 'bottom-2 left-2' :
                    i === 6 ? 'top-1/2 -translate-y-1/2 left-2' : 
                    'top-1/2 -translate-y-1/2 right-2'
                  }`}>
                    <div className="flex justify-center items-center h-full space-x-0.5">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <div key={j} className="w-0.5 h-3 bg-gray-700 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Content */}
            <div className="relative z-10 p-8">
              <div className="relative overflow-hidden rounded-xl">
                {/* Main Image */}
                <div className="relative h-96 lg:h-[500px]">
                  <img
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  
                  {/* Image Overlay with Title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white text-xl font-bold">
                        {images[currentIndex].title}
                      </h3>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 ${colors.button} text-white rounded-full flex items-center justify-center shadow-lg transition-colors z-30`}
                      >
                        <i className="ri-arrow-left-line text-xl"></i>
                      </button>
                      <button
                        onClick={nextSlide}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 ${colors.button} text-white rounded-full flex items-center justify-center shadow-lg transition-colors z-30`}
                      >
                        <i className="ri-arrow-right-line text-xl"></i>
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {images.length > 1 && (
                  <div className="mt-6 flex justify-center">
                    <div className="flex space-x-3 overflow-x-auto max-w-full px-4">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentIndex 
                              ? `border-blue-500 shadow-lg` 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dots Indicator */}
                {images.length > 1 && (
                  <div className="flex justify-center space-x-2 mt-6">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentIndex 
                            ? colors.dots 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Gallery Stats */}
              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-slate-800">{images.length}+</div>
                    <div className="text-gray-600">Project Images</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-800">100%</div>
                    <div className="text-gray-600">Quality Assured</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-800">24/7</div>
                    <div className="text-gray-600">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}