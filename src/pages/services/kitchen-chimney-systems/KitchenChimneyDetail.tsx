
'use client';

import { Link } from 'react-router-dom';
import Gallery from '@/components/Gallery';
import { Navbar } from '@/components/Navbar';

export default function KitchenChimneyDetail() {
  const chimneyTypes = [
    {
      title: 'Wall Mount Chimneys',
      description: 'Sleek and stylish chimneys that mount directly on the wall above cooking ranges, perfect for modern commercial kitchens.',
      icon: 'ri-layout-grid-line',
      suction: '1000-2000 m³/hr',
      features: ['Space Efficient', 'Easy Installation', 'Modern Design', 'LED Lighting']
    },
    {
      title: 'Island Chimneys',
      description: 'Suspended from the ceiling for kitchen islands and central cooking areas in large commercial establishments.',
      icon: 'ri-home-8-line',
      suction: '1200-2500 m³/hr',
      features: ['360° Suction', 'Premium Look', 'Central Installation', 'High Performance']
    },
    {
      title: 'Built-in Chimneys',
      description: 'Integrated seamlessly into kitchen cabinets and modular designs for a clean, professional appearance.',
      icon: 'ri-inbox-line',
      suction: '800-1800 m³/hr',
      features: ['Hidden Design', 'Space Saving', 'Custom Fit', 'Noise Reduction']
    },
    {
      title: 'Industrial Exhaust Systems',
      description: 'Heavy-duty ventilation systems designed for large-scale commercial kitchens and food processing units.',
      icon: 'ri-building-4-line',
      suction: '2500-5000 m³/hr',
      features: ['Heavy Duty', 'High Capacity', 'Fire Safety', 'Commercial Grade']
    }
  ];

  const applications = [
    {
      sector: 'Restaurant Kitchens',
      image: 'https://readdy.ai/api/search-image?query=Professional%20restaurant%20kitchen%20with%20modern%20chimney%20system%20and%20chefs%20cooking%2C%20Indian%20commercial%20kitchen%20setting%2C%20stainless%20steel%20equipment%2C%20blue%20and%20silver%20color%20scheme&width=600&height=400&seq=restaurant-chimney&orientation=landscape',
      description: 'Comprehensive ventilation solutions for restaurants, cafes, and fine dining establishments across India.',
      requirements: ['Grease Filtration', 'Odor Control', 'Fire Safety', 'Noise Reduction']
    },
    {
      sector: 'Hotel Kitchens',
      image: 'https://readdy.ai/api/search-image?query=Large%20hotel%20kitchen%20with%20industrial%20chimney%20system%20and%20professional%20cooking%20equipment%2C%20Indian%20hospitality%20setting%2C%20modern%20stainless%20steel%20design&width=600&height=400&seq=hotel-chimney&orientation=landscape',
      description: 'High-capacity kitchen exhaust systems for hotels, resorts, and large-scale hospitality operations.',
      requirements: ['High Capacity', 'Multi-Zone Control', '24/7 Operation', 'Easy Maintenance']
    },
    {
      sector: 'Food Processing',
      image: 'https://readdy.ai/api/search-image?query=Food%20processing%20facility%20with%20industrial%20exhaust%20system%20and%20workers%2C%20Indian%20manufacturing%20setting%2C%20blue%20and%20silver%20color%20scheme%2C%20clean%20industrial%20environment&width=600&height=400&seq=food-processing-chimney&orientation=landscape',
      description: 'Specialized exhaust systems for food manufacturing, packaging, and processing facilities.',
      requirements: ['Contamination Control', 'Heavy Duty Performance', 'Hygiene Standards', 'Regulatory Compliance']
    },
    {
      sector: 'Corporate Cafeterias',
      image: 'https://readdy.ai/api/search-image?query=Modern%20corporate%20cafeteria%20kitchen%20with%20sleek%20chimney%20system%2C%20Indian%20office%20setting%2C%20professional%20cooking%20area%2C%20contemporary%20design&width=600&height=400&seq=corporate-chimney&orientation=landscape',
      description: 'Efficient kitchen ventilation for office cafeterias, canteens, and corporate dining facilities.',
      requirements: ['Quiet Operation', 'Energy Efficiency', 'Compact Design', 'Low Maintenance']
    }
  ];

  const filterTechnology = [
    {
      type: 'Baffle Filters',
      efficiency: '85-90%',
      application: 'Heavy Grease',
      maintenance: 'Dishwasher Safe',
      icon: 'ri-filter-3-line'
    },
    {
      type: 'Cassette Filters',
      efficiency: '75-85%',
      application: 'Medium Cooking',
      maintenance: 'Easy Replacement',
      icon: 'ri-archive-line'
    },
    {
      type: 'Carbon Filters',
      efficiency: '95-98%',
      application: 'Odor Control',
      maintenance: '6-Month Cycle',
      icon: 'ri-leaf-line'
    }
  ];

  const specifications = [
    { label: 'Suction Power', value: '800 - 5000 m³/hr' },
    { label: 'Motor Type', value: 'Copper/Aluminum' },
    { label: 'Noise Level', value: '35 - 58 dB' },
    { label: 'Filter Type', value: 'Baffle/Cassette/Carbon' },
    { label: 'Control Type', value: 'Touch/Push Button/Remote' },
    { label: 'Duct Size', value: '6" to 12" Diameter' }
  ];

  const galleryImages = [
    {
      src: 'https://readdy.ai/api/search-image?query=Professional%20kitchen%20chimney%20installation%20in%20Indian%20restaurant%20with%20stainless%20steel%20exhaust%20system%2C%20red%20and%20silver%20color%20scheme%2C%20commercial%20cooking%20environment&width=800&height=600&seq=chimney-gallery1&orientation=landscape',
      alt: 'Restaurant Chimney Installation',
      title: 'Wall Mount Chimney - Restaurant Kitchen'
    },
    {
      src: 'https://readdy.ai/api/search-image?query=Island%20chimney%20system%20in%20luxury%20hotel%20kitchen%20with%20chefs%20working%2C%20Indian%20hospitality%20setting%2C%20red%20and%20silver%20tones%2C%20professional%20cooking%20area&width=800&height=600&seq=chimney-gallery2&orientation=landscape',
      alt: 'Hotel Island Chimney',
      title: 'Island Chimney - Hotel Kitchen'
    },
    {
      src: 'https://readdy.ai/api/search-image?query=Industrial%20kitchen%20exhaust%20system%20in%20Indian%20food%20processing%20facility%20with%20workers%2C%20heavy%20duty%20ventilation%2C%20red%20and%20silver%20color%20scheme%2C%20manufacturing%20environment&width=800&height=600&seq=chimney-gallery3&orientation=landscape',
      alt: 'Industrial Exhaust System',
      title: 'Industrial Exhaust - Food Processing'
    },
    {
      src: 'https://readdy.ai/api/search-image?query=Built-in%20chimney%20installation%20in%20modern%20Indian%20corporate%20cafeteria%20kitchen%2C%20sleek%20design%20with%20hidden%20ventilation%2C%20red%20and%20silver%20tones&width=800&height=600&seq=chimney-gallery4&orientation=landscape',
      alt: 'Built-in Chimney System',
      title: 'Built-in System - Corporate Cafeteria'
    },
    {
      src: 'https://readdy.ai/api/search-image?query=Kitchen%20chimney%20ductwork%20installation%20in%20Indian%20commercial%20building%20with%20technicians%2C%20ventilation%20system%20piping%2C%20red%20and%20silver%20color%20scheme&width=800&height=600&seq=chimney-gallery5&orientation=landscape',
      alt: 'Chimney Ductwork Installation',
      title: 'Ductwork Installation - Multi-story Building'
    },
    {
      src: 'https://readdy.ai/api/search-image?query=Fire%20suppression%20system%20integrated%20with%20kitchen%20chimney%20in%20Indian%20restaurant%2C%20safety%20equipment%20installation%2C%20red%20and%20silver%20tones%2C%20commercial%20kitchen%20safety&width=800&height=600&seq=chimney-gallery6&orientation=landscape',
      alt: 'Fire Safety Integration',
      title: 'Fire Safety Integration - Restaurant Chain'
    }
  ];

  return (
    <div className="relative">
      <div className="relative z-50">
        <Navbar />
      </div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-900 via-orange-800 to-red-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20kitchen%20chimney%20installation%20in%20Indian%20commercial%20kitchen%20with%20technicians%20and%20modern%20exhaust%20systems%2C%20industrial%20setting%2C%20red%20and%20silver%20color%20scheme&width=1200&height=800&seq=chimney-hero&orientation=landscape')`
          }}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 to-orange-800/60"></div>
        
        <div className="relative z-10 container mx-auto px-6 mt-4 pt-4 md:mt-14 md:pt-20">
          <div className="max-w-4xl">
            <div className="flex items-center mb-6">
              <Link to="/" className="text-orange-300 hover:text-white transition-colors">
                Home
              </Link>
              <i className="ri-arrow-right-s-line text-orange-300 mx-2"></i>
              <Link to="/services" className="text-orange-300 hover:text-white transition-colors">
                Services
              </Link>
              <i className="ri-arrow-right-s-line text-orange-300 mx-2"></i>
              <span className="text-white">Kitchen Chimney Systems</span>
            </div>
            
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-2xl mr-6">
                <i className="ri-fire-line text-white text-3xl"></i>
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  Kitchen Chimney Systems
                </h1>
                <p className="text-xl text-orange-200 leading-relaxed">
                  Advanced kitchen ventilation solutions for Indian commercial cooking environments
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-windy-line text-white text-xl"></i>
                </div>
                <h3 className="text-white font-semibold mb-2">Powerful Suction</h3>
                <p className="text-orange-200 text-sm">Up to 5000 m³/hr capacity for heavy-duty commercial cooking</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-shield-check-line text-white text-xl"></i>
                </div>
                <h3 className="text-white font-semibold mb-2">Fire Safety</h3>
                <p className="text-orange-200 text-sm">Advanced fire suppression and safety features for commercial kitchens</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-settings-3-line text-white text-xl"></i>
                </div>
                <h3 className="text-white font-semibold mb-2">Smart Controls</h3>
                <p className="text-orange-200 text-sm">Intelligent operation with auto-clean and remote monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chimney Types Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Chimney System Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive range of kitchen ventilation systems for commercial cooking applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {chimneyTypes.map((chimney, index) => (
              <div key={index} className="group bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg mr-6">
                      <i className={`${chimney.icon} text-white text-2xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 group-hover:text-red-600 transition-colors">
                        {chimney.title}
                      </h3>
                      <div className="text-red-600 font-semibold">{chimney.suction}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {chimney.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {chimney.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-gray-700">{feature}</span>
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
        title="Kitchen Chimney Installation Gallery"
        colorScheme="red"
      />

      {/* Filter Technology */}
      <section className="py-20 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Advanced Filtration Technology</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multi-stage filtration systems for superior grease and odor control
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filterTechnology.map((filter, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className={`${filter.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-white">{filter.type}</h3>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Efficiency</span>
                      <span className="font-bold text-red-600">{filter.efficiency}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Best For</span>
                      <span className="font-bold text-blue-600">{filter.application}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Maintenance</span>
                      <span className="font-bold text-green-600">{filter.maintenance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-gradient-to-b from-slate-100 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Commercial Kitchen Applications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized ventilation solutions for various commercial cooking environments
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {applications.map((app, index) => (
              <div key={index} className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Duct Frame */}
                <div className="absolute inset-0 p-3">
                  <div className="w-full h-full border-4 border-gray-300 rounded-2xl relative">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className={`absolute w-8 h-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded shadow-inner ${i === 0 ? 'top-2 left-2' : i === 1 ? 'top-2 right-2' : i === 2 ? 'bottom-2 left-2' : 'bottom-2 right-2'}`}>
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
                  
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-red-600 transition-colors">
                    {app.sector}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {app.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {app.requirements.map((req, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
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
              Comprehensive specifications for commercial kitchen chimney systems
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {specifications.map((spec, index) => (
                    <div key={index} className="group">
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-red-400/50 transition-all duration-300">
                        <div className="text-red-300 text-sm font-medium mb-1">{spec.label}</div>
                        <div className="text-white text-lg font-semibold">{spec.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 text-center">
                  <div className="inline-flex items-center space-x-4 text-slate-300">
                    <i className="ri-checkbox-circle-line text-green-400"></i>
                    <span>ISI Certified</span>
                    <div className="w-1 h-4 bg-slate-600"></div>
                    <i className="ri-shield-check-line text-blue-400"></i>
                    <span>5 Year Motor Warranty</span>
                    <div className="w-1 h-4 bg-slate-600"></div>
                    <i className="ri-service-line text-purple-400"></i>
                    <span>24/7 Service Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Create a Smoke-Free Commercial Kitchen
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Professional kitchen ventilation systems with advanced filtration and fire safety features. 
            Ensure compliance with commercial cooking standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/#contact" 
              className="px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-red-50 transition-colors shadow-lg"
            >
              Get Kitchen Assessment
            </Link>
            <Link 
              to="tel:+919630859889" 
              className="px-8 py-4 bg-red-700 text-white font-bold rounded-lg hover:bg-red-800 transition-colors shadow-lg border-2 border-red-400"
            >
              Call: +91-555-123-VENT
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
