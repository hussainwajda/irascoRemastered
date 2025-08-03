'use client';

import ShinyText from "@/assets/ShineText";

export default function ServicesSection() {
  const services = [
    {
      title: 'Commercial Air Conditioning',
      description: 'Advanced climate control systems designed for large-scale commercial applications with precision temperature management and energy efficiency.',
      icon: 'ri-temp-cold-line',
      image: 'https://readdy.ai/api/search-image?query=Modern%20commercial%20air%20conditioning%20unit%20with%20metallic%20finish%20and%20digital%20controls%20in%20a%20clean%20office%20environment%2C%20professional%20lighting%2C%20blue%20and%20silver%20color%20scheme%2C%20minimal%20background&width=400&height=300&seq=service-1&orientation=landscape'
    },
    {
      title: 'Commercial Air Coolers',
      description: 'Industrial-grade cooling solutions that deliver powerful performance for warehouses, factories, and large commercial spaces.',
      icon: 'ri-snowy-line',
      image: 'https://readdy.ai/api/search-image?query=Large%20industrial%20air%20cooler%20with%20metal%20housing%20and%20ventilation%20ducts%20in%20a%20warehouse%20setting%2C%20modern%20design%2C%20blue%20and%20silver%20tones%2C%20clean%20minimal%20background&width=400&height=300&seq=service-2&orientation=landscape'
    },
    {
      title: 'Kitchen Chimney Systems',
      description: 'Professional-grade ventilation systems with advanced filtration technology for commercial kitchens and food service establishments.',
      icon: 'ri-fire-line',
      image: 'https://readdy.ai/api/search-image?query=Stainless%20steel%20kitchen%20chimney%20system%20with%20exhaust%20ducts%20and%20filters%20in%20a%20professional%20commercial%20kitchen%2C%20modern%20design%2C%20clean%20background&width=400&height=300&seq=service-3&orientation=landscape'
    },
    {
      title: 'Ductwork & Ventilation',
      description: 'Custom ductwork design and installation with precision-engineered vents for optimal airflow distribution and system efficiency.',
      icon: 'ri-wind-line',
      image: 'https://readdy.ai/api/search-image?query=Complex%20network%20of%20metallic%20HVAC%20ducts%20and%20vents%20in%20a%20modern%20building%20ceiling%2C%20industrial%20design%2C%20silver%20and%20blue%20color%20scheme%2C%20professional%20lighting&width=400&height=300&seq=service-4&orientation=landscape'
    }
  ];

  return (
    <section id="services" className="relative py-20 bg-gradient-to-b from-slate-100 to-white">
      {/* Background Duct Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-1/4 w-64 h-4 bg-gray-400 rounded-lg transform rotate-12"></div>
        <div className="absolute top-32 right-1/3 w-4 h-48 bg-gray-400 rounded-lg transform -rotate-6"></div>
        <div className="absolute bottom-20 left-1/3 w-48 h-4 bg-gray-400 rounded-lg transform -rotate-12"></div>
        <div className="absolute bottom-10 right-1/4 w-4 h-32 bg-gray-400 rounded-lg transform rotate-45"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center mb-4">
            <div className="w-16 h-4 bg-gradient-to-r from-gray-500 to-gray-600 rounded-l-lg mr-4 shadow-lg">
              <div className="flex justify-center items-center h-full space-x-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-0.5 h-2 bg-gray-800 rounded-full"></div>
                ))}
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
              <ShinyText text="Our Services" className="text-slate-800" />
            </h2>
            <div className="w-16 h-4 bg-gradient-to-l from-gray-500 to-gray-600 rounded-r-lg ml-4 shadow-lg">
              <div className="flex justify-center items-center h-full space-x-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-0.5 h-2 bg-gray-800 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive HVAC solutions engineered for maximum efficiency and reliability. 
            From design to installation, we deliver excellence in every project.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div key={index} className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
              {/* Duct Frame */}
              <div className="absolute inset-0 p-3">
                <div className="w-full h-full border-4 border-gray-300 rounded-2xl relative">
                  {/* Corner Bolts */}
                  {[
                    'top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'
                  ].map((position, i) => (
                    <div key={i} className={`absolute ${position} w-4 h-4 bg-gray-600 rounded-full shadow-inner flex items-center justify-center z-10`}>
                      <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 p-8">
                {/* Service Image */}
                <div className="mb-6 relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover object-top rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Icon Overlay */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                    <i className={`${service.icon} text-white text-xl w-6 h-6 flex items-center justify-center`}></i>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors duration-200">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                <button className="group/btn relative overflow-hidden px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap">
                  <span className="relative z-10 flex items-center">
                    Learn More
                    <i className="ri-arrow-right-line ml-2 group-hover/btn:translate-x-1 transition-transform duration-200 w-4 h-4 flex items-center justify-center"></i>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
