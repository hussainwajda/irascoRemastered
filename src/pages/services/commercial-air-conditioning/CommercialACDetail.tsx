
'use client';

import { Link } from 'react-router-dom';
import Gallery from '@/components/Gallery';
import { Navbar } from '@/components/Navbar';

export default function CommercialACDetail() {
  const features = [
    {
      title: 'Variable Refrigerant Flow (VRF) Systems',
      description: 'Advanced multi-zone cooling with individual temperature control for each area, reducing energy consumption by up to 30%.',
      icon: 'ri-temp-cold-line',
      benefits: ['Energy Efficient', 'Precise Control', 'Quiet Operation', 'Easy Maintenance']
    },
    {
      title: 'Centralized Chiller Systems',
      description: 'High-capacity cooling solutions for large commercial buildings, hotels, hospitals, and industrial facilities.',
      icon: 'ri-building-line',
      benefits: ['High Capacity', 'Reliable Performance', 'Cost Effective', 'Long Lifespan']
    },
    {
      title: 'Rooftop Package Units',
      description: 'Self-contained units perfect for retail stores, offices, and small commercial buildings with easy installation.',
      icon: 'ri-home-gear-line',
      benefits: ['Quick Installation', 'Space Saving', 'All-in-One', 'Weather Resistant']
    },
    {
      title: 'Split System Solutions',
      description: 'Flexible cooling solutions with indoor and outdoor units, ideal for restaurants, shops, and small offices.',
      icon: 'ri-scissors-line',
      benefits: ['Flexible Design', 'Cost Efficient', 'Easy Expansion', 'Low Noise']
    }
  ];

  const applications = [
    {
      sector: 'Corporate Offices',
      image: 'https://readdy.ai/api/search-image?query=Modern%20corporate%20office%20building%20with%20glass%20facade%20and%20central%20air%20conditioning%20system%2C%20professional%20lighting%2C%20blue%20and%20silver%20color%20scheme%2C%20minimal%20background%2C%20Indian%20commercial%20architecture&width=600&height=400&seq=office-ac&orientation=landscape',
      description: 'Climate-controlled environments for productivity and comfort in IT parks, business centers, and corporate headquarters.',
      requirements: ['Zone Control', 'Energy Efficiency', 'Air Quality', '24/7 Operation']
    },
    {
      sector: 'Retail & Shopping Malls',
      image: 'https://readdy.ai/api/search-image?query=Large%20shopping%20mall%20interior%20with%20central%20air%20conditioning%20ducts%20and%20modern%20retail%20spaces%2C%20bright%20lighting%2C%20blue%20and%20silver%20tones%2C%20Indian%20commercial%20mall%20setting&width=600&height=400&seq=mall-ac&orientation=landscape',
      description: 'Maintaining optimal shopping environments with consistent temperature and humidity control across large retail spaces.',
      requirements: ['High Capacity', 'Uniform Cooling', 'Customer Comfort', 'Cost Control']
    },
    {
      sector: 'Hotels & Hospitality',
      image: 'https://readdy.ai/api/search-image?query=Luxury%20hotel%20lobby%20with%20sophisticated%20air%20conditioning%20system%20and%20elegant%20interior%20design%2C%20warm%20lighting%2C%20blue%20and%20silver%20color%20scheme%2C%20Indian%20hospitality%20setting&width=600&height=400&seq=hotel-ac&orientation=landscape',
      description: 'Premium comfort solutions for guest rooms, lobbies, restaurants, and conference facilities in hospitality sector.',
      requirements: ['Guest Comfort', 'Individual Control', 'Noise Reduction', 'Reliability']
    },
    {
      sector: 'Healthcare Facilities',
      image: 'https://readdy.ai/api/search-image?query=Modern%20hospital%20corridor%20with%20advanced%20HVAC%20system%20and%20clean%20medical%20environment%2C%20professional%20lighting%2C%20blue%20and%20silver%20tones%2C%20Indian%20healthcare%20facility&width=600&height=400&seq=hospital-ac&orientation=landscape',
      description: 'Critical climate control for hospitals, clinics, and medical centers ensuring patient comfort and equipment protection.',
      requirements: ['Air Filtration', 'Temperature Control', 'Humidity Control', 'Contamination Prevention']
    }
  ];

  const specifications = [
    { label: 'Cooling Capacity', value: '5 TR to 1000 TR' },
    { label: 'Energy Rating', value: '5 Star BEE Certified' },
    { label: 'Operating Temperature', value: '-10°C to 55°C' },
    { label: 'Refrigerant Type', value: 'R-410A, R-32, R-134A' },
    { label: 'Power Supply', value: '415V, 3 Phase, 50Hz' },
    { label: 'Control System', value: 'Digital BMS Compatible' }
  ];

  const galleryImages = [
    {
      src: 'https://readdy.ai/api/search-image?query=Professional%20VRF%20air%20conditioning%20system%20installation%20in%20modern%20Indian%20office%20building%20with%20technicians%20working%2C%20blue%20and%20silver%20color%20scheme%2C%20commercial%20HVAC%20equipment&width=800&height=600&seq=ac-gallery1&orientation=landscape',
      alt: 'VRF System Installation',
      title: 'VRF System Installation in Corporate Office'
    },
    {
      src: 'https://readdy.ai/api/search-image?query=Large%20centralized%20chiller%20system%20installation%20in%20Indian%20commercial%20building%20rooftop%2C%20industrial%20HVAC%20equipment%2C%20blue%20and%20silver%20tones%2C%20professional%20installation&width=800&height=600&seq=ac-gallery2&orientation=landscape',
      alt: 'Centralized Chiller System',
      title: 'Centralized Chiller System - Shopping Mall'
    },
    {
      src: 'https://readdy.ai/api/search-image?query=Split%20AC%20system%20installation%20in%20Indian%20restaurant%20with%20technicians%2C%20commercial%20kitchen%20cooling%2C%20blue%20and%20silver%20color%20scheme%2C%20professional%20service&width=800&height=600&seq=ac-gallery3&orientation=landscape',
      alt: 'Split System Installation',
      title: 'Multi-Split System - Restaurant Chain'
    },
    {
      src: 'https://readdy.ai/api/search-image?query=Rooftop%20package%20unit%20installation%20on%20Indian%20commercial%20building%20with%20crane%20and%20workers%2C%20HVAC%20equipment%20installation%2C%20blue%20and%20silver%20tones&width=800&height=600&seq=ac-gallery4&orientation=landscape',
      alt: 'Rooftop Package Unit',
      title: 'Rooftop Package Unit - Retail Store'
    },
    {
      src: 'https://readdy.ai/api/search-image?query=Hospital%20HVAC%20system%20with%20precision%20air%20conditioning%20for%20medical%20facility%2C%20Indian%20healthcare%20setting%2C%20blue%20and%20silver%20color%20scheme%2C%20clean%20room%20environment&width=800&height=600&seq=ac-gallery5&orientation=landscape',
      alt: 'Hospital HVAC System',
      title: 'Precision AC System - Hospital'
    },
    {
      src: 'https://readdy.ai/api/search-image?query=Hotel%20lobby%20air%20conditioning%20system%20with%20elegant%20design%20and%20comfortable%20environment%2C%20Indian%20hospitality%20setting%2C%20blue%20and%20silver%20tones%2C%20luxury%20installation&width=800&height=600&seq=ac-gallery6&orientation=landscape',
      alt: 'Hotel AC System',
      title: 'Luxury Hotel Climate Control System'
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
        <div className="relative z-50">
          <Navbar />
        </div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20commercial%20air%20conditioning%20installation%20in%20modern%20Indian%20office%20building%20with%20technicians%20working%20on%20large%20AC%20units%2C%20industrial%20setting%2C%20blue%20and%20silver%20color%20scheme%2C%20clean%20minimal%20background&width=1200&height=800&seq=ac-hero&orientation=landscape')`
          }}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80"></div>
        
        <div className="relative z-10 container mx-auto px-6 mt-4 pt-4 md:mt-12 md:pt-20">
          <div className="max-w-4xl">
            <div className="flex items-center mb-6">
              <Link to="/" className="text-blue-300 hover:text-white transition-colors">
                Home
              </Link>
              <i className="ri-arrow-right-s-line text-blue-300 mx-2"></i>
              <Link to="/services" className="text-blue-300 hover:text-white transition-colors">
                Services
              </Link>
              <i className="ri-arrow-right-s-line text-blue-300 mx-2"></i>
              <span className="text-white">Commercial Air Conditioning</span>
            </div>
            
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-2xl mr-6">
                <i className="ri-temp-cold-line text-white text-3xl"></i>
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  Commercial Air Conditioning
                </h1>
                <p className="text-xl text-blue-200 leading-relaxed">
                  Advanced climate control solutions engineered for Indian commercial environments
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-leaf-line text-white text-xl"></i>
                </div>
                <h3 className="text-white font-semibold mb-2">Energy Efficient</h3>
                <p className="text-blue-200 text-sm">Up to 40% energy savings with advanced inverter technology</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-settings-3-line text-white text-xl"></i>
                </div>
                <h3 className="text-white font-semibold mb-2">Smart Controls</h3>
                <p className="text-blue-200 text-sm">IoT-enabled systems with remote monitoring capabilities</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-shield-check-line text-white text-xl"></i>
                </div>
                <h3 className="text-white font-semibold mb-2">Reliable Support</h3>
                <p className="text-blue-200 text-sm">24/7 maintenance support across all major Indian cities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">System Features & Technologies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge air conditioning systems designed for Indian commercial requirements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg mr-6">
                      <i className={`${feature.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {feature.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery 
        images={galleryImages}
        title="Commercial AC Installation Gallery"
        colorScheme="blue"
      />

      {/* Applications Section */}
      <section className="py-20 bg-gradient-to-b from-slate-100 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Commercial Applications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored solutions for diverse Indian commercial sectors
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {applications.map((app, index) => (
              <div key={index} className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Duct Frame */}
                <div className="absolute inset-0 p-3">
                  <div className="w-full h-full border-4 border-gray-300 rounded-2xl relative">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className={`absolute w-8 h-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded shadow-inner ${ 
                        i === 0 ? 'top-2 left-2' : i === 1 ? 'top-2 right-2' : i === 2 ? 'bottom-2 left-2' : 'bottom-2 right-2'
                      }`}>
                        <div className="flex justify-center items-center h-full space-x-0.5">
                          {Array.from({ length: 3 }).map((_, j) => (
                            <div key={j} className="w-0.5 h-2 bg-gray-700 rounded-full"></div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative z-10 p-8">
                  <div className="mb-6">
                    <img 
                      src={app.image} 
                      alt={app.sector}
                      className="w-full h-48 object-cover object-top rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">
                    {app.sector}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {app.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {app.requirements.map((req, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-gray-700">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Technical Specifications</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Comprehensive specifications for commercial AC systems in India
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {specifications.map((spec, index) => (
                    <div key={index} className="group">
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-blue-400/50 transition-all duration-300">
                        <div className="text-blue-300 text-sm font-medium mb-1">{spec.label}</div>
                        <div className="text-white text-lg font-semibold">{spec.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 text-center">
                  <div className="inline-flex items-center space-x-4 text-slate-300">
                    <i className="ri-checkbox-circle-line text-green-400"></i>
                    <span>BIS Certified</span>
                    <div className="w-1 h-4 bg-slate-600"></div>
                    <i className="ri-shield-check-line text-blue-400"></i>
                    <span>5 Year Warranty</span>
                    <div className="w-1 h-4 bg-slate-600"></div>
                    <i className="ri-service-line text-purple-400"></i>
                    <span>Pan India Service</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Commercial Space?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a customized commercial AC solution designed for your specific requirements. 
            Free consultation and site survey included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/#contact" 
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              Get Free Consultation
            </Link>
            <Link 
              to="tel:+919630859889" 
              className="px-8 py-4 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors shadow-lg border-2 border-blue-400"
            >
              Call: +91-555-123-HVAC
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
