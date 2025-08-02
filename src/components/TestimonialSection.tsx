'use client';

import { useState, useEffect } from 'react';

export default function TestimonialSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "David Chen",
      title: "Facilities Manager",
      company: "TechCorp Industries",
      image: "https://readdy.ai/api/search-image?query=Professional%20Asian%20businessman%20in%20modern%20office%20environment%2C%20confident%20smile%2C%20business%20suit%2C%20corporate%20headshot%20style%2C%20clean%20background&width=80&height=80&seq=testimonial-1&orientation=squarish",
      rating: 5,
      text: "IRASCO transformed our entire commercial facility with their cutting-edge HVAC system. The energy efficiency improvements exceeded our expectations, and their 24/7 support gives us complete peace of mind. Outstanding professionalism from start to finish."
    },
    {
      name: "Sarah Martinez",
      title: "Restaurant Owner",
      company: "Gourmet Paradise",
      image: "https://readdy.ai/api/search-image?query=Professional%20Hispanic%20businesswoman%20in%20restaurant%20setting%2C%20friendly%20smile%2C%20chef%20coat%20or%20business%20attire%2C%20warm%20lighting%2C%20professional%20headshot&width=80&height=80&seq=testimonial-2&orientation=squarish",
      rating: 5,
      text: "The kitchen ventilation system IRASCO installed has been a game-changer for our restaurant. Perfect air circulation, whisper-quiet operation, and significant reduction in our utility bills. Their team understood exactly what we needed."
    },
    {
      name: "Michael Thompson",
      title: "Plant Manager",
      company: "Industrial Solutions Ltd",
      image: "https://readdy.ai/api/search-image?query=Professional%20Caucasian%20man%20in%20industrial%20setting%2C%20hard%20hat%2C%20safety%20equipment%2C%20confident%20pose%2C%20factory%20background%2C%20engineering%20professional&width=80&height=80&seq=testimonial-3&orientation=squarish",
      rating: 5,
      text: "Working with IRASCO on our industrial cooling project was exceptional. Their engineers designed a custom solution that perfectly fits our unique requirements. The installation was flawless and completed ahead of schedule."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
      {/* Background Duct Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-20 w-32 h-4 bg-gradient-to-r from-gray-500 to-gray-600 rounded transform rotate-12">
          <div className="flex justify-between items-center h-full px-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-0.5 h-2 bg-gray-800 rounded-full"></div>
            ))}
          </div>
        </div>
        <div className="absolute top-40 right-32 w-4 h-24 bg-gradient-to-b from-gray-500 to-gray-600 rounded transform -rotate-12">
          <div className="flex flex-col justify-between items-center h-full py-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-2 h-0.5 bg-gray-800 rounded-full"></div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-32 left-1/3 w-28 h-4 bg-gradient-to-r from-gray-500 to-gray-600 rounded transform rotate-6">
          <div className="flex justify-between items-center h-full px-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="w-0.5 h-2 bg-gray-800 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-l-lg mr-4">
              <div className="flex justify-center items-center h-full space-x-0.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="w-0.5 h-2 bg-blue-800 rounded-full"></div>
                ))}
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800">Client Testimonials</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from industry leaders who trust IRASCO for their critical HVAC solutions
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-2xl border border-gray-200">
            {/* Corner Bolts for Main Testimonial Box */}
            {[
              'top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'
            ].map((position, i) => (
              <div key={i} className={`absolute ${position} w-4 h-4 bg-gray-600 rounded-full shadow-inner flex items-center justify-center z-20`}>
                <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
              </div>
            ))}
            
            {/* Duct Frame */}
            <div className="absolute -top-4 left-1/4 right-1/4 h-8 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 rounded-t-lg shadow-lg">
              <div className="flex justify-between items-center h-full px-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-1 h-4 bg-gray-800 rounded-full"></div>
                ))}
              </div>
            </div>

            <div className="text-center">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                  <i key={i} className="ri-star-fill text-2xl text-yellow-400 w-6 h-6 flex items-center justify-center"></i>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center space-x-4">
                <img 
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                />
                <div className="text-left">
                  <div className="font-bold text-lg text-slate-800">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-600">{testimonials[currentTestimonial].title}</div>
                  <div className="text-blue-600 font-medium">{testimonials[currentTestimonial].company}</div>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentTestimonial ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Client Logos Carousel */}
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Trusted by Industry Leaders</h3>
            <p className="text-gray-600">Join hundreds of satisfied clients across various industries</p>
          </div>

          {/* Row 1 - Moving Right */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-right space-x-12">
              {[
                'Microsoft', 'Apple', 'Google', 'Amazon', 'Tesla', 'IBM', 'Oracle', 'Samsung',
                'Microsoft', 'Apple', 'Google', 'Amazon', 'Tesla', 'IBM', 'Oracle', 'Samsung'
              ].map((brand, index) => (
                <div key={index} className="flex-shrink-0 w-32 h-16 bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center group hover:shadow-lg transition-shadow duration-200">
                  <span className="font-bold text-gray-600 group-hover:text-blue-600 transition-colors duration-200 whitespace-nowrap">
                    {brand}
                  </span>
                  {/* Mini vent */}
                  <div className="absolute top-1 right-1 w-4 h-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded opacity-30">
                    <div className="flex justify-center items-center h-full">
                      <div className="w-0.5 h-1 bg-gray-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Moving Left */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-left space-x-12">
              {[
                'Netflix', 'Spotify', 'Adobe', 'Intel', 'Nike', 'Coca-Cola', 'Toyota', 'BMW',
                'Netflix', 'Spotify', 'Adobe', 'Intel', 'Nike', 'Coca-Cola', 'Toyota', 'BMW'
              ].map((brand, index) => (
                <div key={index} className="flex-shrink-0 w-32 h-16 bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center group hover:shadow-lg transition-shadow duration-200">
                  <span className="font-bold text-gray-600 group-hover:text-blue-600 transition-colors duration-200 whitespace-nowrap">
                    {brand}
                  </span>
                  {/* Mini vent */}
                  <div className="absolute top-1 right-1 w-4 h-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded opacity-30">
                    <div className="flex justify-center items-center h-full">
                      <div className="w-0.5 h-1 bg-gray-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3 - Moving Right */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-right space-x-12">
              {[
                'Facebook', 'LinkedIn', 'Uber', 'Airbnb', 'Shopify', 'Stripe', 'Zoom', 'Slack',
                'Facebook', 'LinkedIn', 'Uber', 'Airbnb', 'Shopify', 'Stripe', 'Zoom', 'Slack'
              ].map((brand, index) => (
                <div key={index} className="flex-shrink-0 w-32 h-16 bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center group hover:shadow-lg transition-shadow duration-200">
                  <span className="font-bold text-gray-600 group-hover:text-blue-600 transition-colors duration-200 whitespace-nowrap">
                    {brand}
                  </span>
                  {/* Mini vent */}
                  <div className="absolute top-1 right-1 w-4 h-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded opacity-30">
                    <div className="flex justify-center items-center h-full">
                      <div className="w-0.5 h-1 bg-gray-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        
        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
      `}</style>
    </section>
  );
}