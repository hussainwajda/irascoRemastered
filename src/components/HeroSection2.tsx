import { Navbar } from "./Navbar";

export default function HeroSection() {
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

      {/* Floating Duct Elements */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg shadow-lg opacity-30 animate-pulse">
          <div className="flex justify-between items-center h-full px-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-1 h-4 bg-gray-800 rounded-full"></div>
            ))}
          </div>
        </div>
        <div className="absolute top-40 right-20 w-8 h-32 bg-gradient-to-b from-gray-500 to-gray-700 rounded-lg shadow-lg opacity-25 animate-pulse" style={{ animationDelay: '1s' }}>
          <div className="flex flex-col justify-between items-center h-full py-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-4 h-1 bg-gray-800 rounded-full"></div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-32 left-1/4 w-24 h-6 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg shadow-lg opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div> */}

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

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            IRASCO
          </span>
          <br />
          <span className="text-3xl md:text-4xl font-normal text-gray-300">
            Advanced HVAC Solutions
          </span>
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
              <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform duration-200"></i>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button className="group relative px-8 py-4 border-2 border-gray-400 text-white font-semibold rounded-lg hover:bg-gray-800/50 transition-all duration-300 whitespace-nowrap">
            <span className="flex items-center">
              <i className="ri-phone-line mr-2 w-5 h-5 flex items-center justify-center"></i>
              Contact Us
            </span>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { number: '100+', label: 'Projects Completed', icon: 'ri-building-line' },
            { number: '5+', label: 'Years Experience', icon: 'ri-time-line' },
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