import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "./Navbar";
import BlurText from "@/assets/BlurText";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  // Check if loader is enabled and handle completion
  useEffect(() => {
    // Check if loader is present in the DOM
    const checkLoader = () => {
      const loaderElement = document.querySelector('[data-loader="true"]');
      if (!loaderElement) {
        // No loader found, start animation immediately
        setLoaderComplete(true);
        setAnimationStarted(true);
      }
    };

    // Check immediately
    checkLoader();
    
    // Also check after a short delay in case loader is added dynamically
    const timeoutId = setTimeout(checkLoader, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Listen for loader completion
  useEffect(() => {
    const handleLoaderComplete = () => {
      setLoaderComplete(true);
      setAnimationStarted(true);
    };

    // Listen for custom event from loader
    window.addEventListener('loader-complete', handleLoaderComplete);
    
    return () => {
      window.removeEventListener('loader-complete', handleLoaderComplete);
    };
  }, []);

  const handleAnimationComplete = () => {
    console.log('IRASCO animation completed!');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Background Image */}
      <div className="relative z-20">
        <Navbar />
      </div>
      <div 
        className="absolute inset-0 bg-cover bg-center object-top"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Futuristic%20industrial%20HVAC%20system%20with%20metallic%20ducts%20and%20air%20vents%20in%20a%20modern%20commercial%20building%2C%20blue%20and%20silver%20color%20scheme%2C%20clean%20minimal%20background%2C%20professional%20lighting%2C%20high-tech%20atmosphere%2C%20geometric%20patterns&width=1920&height=1080&seq=hero-bg&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 bg-slate-900/70"></div>
      </div>  

      {/* Content */}
      <div className="relative z-10 text-center mt-20 px-6 max-w-5xl">
        {/* <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-2xl">
              <i className="ri-wind-line text-white text-4xl"></i>
            </div>
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-8 h-4 bg-gradient-to-r from-gray-400 to-gray-600 rounded-l-lg"></div>
            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-8 h-4 bg-gradient-to-l from-gray-400 to-gray-600 rounded-r-lg"></div>
          </div>
        </div> */}

        <h1 className="text-4xl md:text-6xl font-bold text-white mt-10 mb-6 leading-tight">
          {animationStarted ? (
            <>
              <BlurText
                text="IRASCO"
                delay={100}
                animateBy="letters"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-4xl md:text-6xl font-bold text-blue-400"
                animationFrom={{ filter: "blur(6px)", opacity: 0.4, y: -20, scale: 0.9 }}
                animationTo={[
                  { filter: "blur(3px)", opacity: 0.7, y: -5, scale: 0.95 },
                  { filter: "blur(1px)", opacity: 0.9, y: -1, scale: 0.98 },
                  { filter: "blur(0px)", opacity: 1, y: 0, scale: 1 }
                ]}
                stepDuration={0.6}
              />
              <br />
              <BlurText
                text="Advanced HVAC Solutions"
                delay={200}
                animateBy="words"
                direction="bottom"
                className="text-3xl md:text-4xl font-normal text-gray-300"
                animationFrom={{ filter: "blur(5px)", opacity: 0.4, y: 15 }}
                animationTo={[
                  { filter: "blur(2px)", opacity: 0.7, y: 5 },
                  { filter: "blur(0px)", opacity: 1, y: 0 }
                ]}
                stepDuration={0.5}
              />
            </>
          ) : (
            <>
              <span className="text-4xl md:text-6xl font-bold text-blue-400 opacity-0">IRASCO</span>
              <br />
              <span className="text-3xl md:text-4xl font-normal text-gray-300 opacity-0">Advanced HVAC Solutions</span>
            </>
          )}
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
          Pioneering the future of climate control with cutting-edge commercial air conditioning, 
          cooling systems, and kitchen ventilation solutions. Experience precision engineering 
          that transforms your environment.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
            <span className="relative z-10 flex items-center">
              Explore Solutions
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button className="group relative px-8 py-4 border-2 border-gray-400 text-white font-semibold rounded-lg hover:bg-gray-800/50 transition-all duration-300 whitespace-nowrap">
            <span className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Contact Us
            </span>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { number: '200+', label: 'Projects Completed', icon: 'ri-building-line' },
            { number: '10+', label: 'Years Experience', icon: 'ri-time-line' },
            { number: '24/7', label: 'Support Available', icon: 'ri-customer-service-line' }
          ].map((stat, index) => (
            <div key={index} className="relative group">
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 shadow-lg relative">
                {/* Corner Bolts for Stats Boxes */}
                {[
                  'top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'
                ].map((position, i) => (
                  <div key={i} className={`absolute ${position} w-3 h-3 bg-gray-600 rounded-full shadow-inner flex items-center justify-center z-10`}>
                    <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                  </div>
                ))}
                
                {/* Vent Detail */}
                <div className="absolute top-2 right-2 w-8 h-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded opacity-50">
                  <div className="flex justify-center items-center h-full space-x-0.5">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="w-0.5 h-2 bg-gray-800 rounded-full"></div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <i className={`${stat.icon} text-3xl text-blue-400 mb-3 w-8 h-8 flex items-center justify-center mx-auto`}></i>
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-12 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-lg shadow-lg flex items-center justify-center">
          <i className="ri-arrow-down-line text-white text-xl"></i>
        </div>
      </div>
    </section>
  );
}
