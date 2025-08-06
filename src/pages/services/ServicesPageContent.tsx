import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { HomeIcon } from 'lucide-react';

export default function ServicesPageContent() {
  const mainServices = [
    {
      title: 'Commercial Air Conditioning',
      description: 'Advanced climate control solutions with VRF systems, centralized chillers, and energy-efficient cooling for large commercial spaces.',
      icon: 'ri-temp-cold-line',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      href: '/services/commercial-air-conditioning',
      features: ['VRF Systems', 'Energy Efficient', 'Smart Controls', '24/7 Support'],
      capacity: '5 TR to 1000 TR'
    },
    {
      title: 'Commercial Air Coolers',
      description: 'Eco-friendly evaporative cooling systems perfect for Indian climate conditions with 90% energy savings compared to traditional AC.',
      icon: 'ri-snowy-line',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      href: '/services/commercial-air-coolers',
      features: ['90% Energy Savings', '100% Eco-Friendly', 'Fresh Air Supply', 'Natural Cooling'],
      capacity: '3,000 - 50,000 CFM'
    },
    {
      title: 'Kitchen Chimney Systems',
      description: 'Advanced kitchen ventilation with powerful suction, multi-stage filtration, and fire safety features for commercial cooking environments.',
      icon: 'ri-fire-line',
      color: 'from-red-500 to-orange-500',
      bgColor: 'from-red-50 to-orange-50',
      href: '/services/kitchen-chimney-systems',
      features: ['Powerful Suction', 'Fire Safety', 'Smart Controls', 'Advanced Filtration'],
      capacity: '800 - 5000 m³/hr'
    },
    {
      title: 'Ductwork & Ventilation',
      description: 'Precision-engineered airflow distribution systems with premium materials and expert installation for optimal climate control.',
      icon: 'ri-windy-line',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'from-cyan-50 to-blue-50',
      href: '/services/ductwork-ventilation',
      features: ['Precision Design', 'Expert Installation', 'Quality Materials', 'BIS Certified'],
      capacity: '100mm to 2000mm'
    }
  ];

  const additionalServices = [
    {
      title: 'HVLS Fans',
      description: 'High Volume Low Speed industrial fans with variable speed control and energy-efficient operation.',
      icon: 'ri-drop-line',
      image: 'https://readdy.ai/api/search-image?query=Large%20HVLS%20industrial%20fan%20installed%20in%20warehouse%20with%20workers%2C%20Indian%20industrial%20setting%2C%20blue%20and%20silver%20color%20scheme%2C%20high%20ceiling%20installation&width=400&height=300&seq=hvls-fan&orientation=landscape',
      features: ['24 feet diameter', 'Variable speed control', 'Energy efficient', 'Low noise operation']
    },
    {
      title: 'Axial Fans',
      description: 'High-performance axial flow fans for industrial ventilation and air movement applications.',
      icon: 'ri-rotation-lock-line',
      image: 'https://readdy.ai/api/search-image?query=Industrial%20axial%20fan%20installation%20in%20manufacturing%20facility%2C%20Indian%20industrial%20setting%2C%20metallic%20design%20with%20blue%20and%20silver%20tones&width=400&height=300&seq=axial-fan&orientation=landscape',
      features: ['High airflow capacity', 'Corrosion resistant', 'Low maintenance', 'Various sizes available']
    },
    {
      title: 'Belt Drive Fans',
      description: 'Robust belt-driven ventilation fans for heavy-duty industrial and commercial applications.',
      icon: 'ri-settings-4-line',
      image: 'https://readdy.ai/api/search-image?query=Belt%20drive%20industrial%20fan%20system%20with%20motor%20and%20pulleys%2C%20Indian%20manufacturing%20facility%2C%20blue%20and%20silver%20color%20scheme%2C%20mechanical%20equipment&width=400&height=300&seq=belt-drive-fan&orientation=landscape',
      features: ['Heavy duty construction', 'Adjustable speed', 'High efficiency', 'Industrial grade motors']
    },
    {
      title: 'Direct Drive Fans',
      description: 'Compact and efficient direct-drive fans for commercial and industrial ventilation systems.',
      icon: 'ri-flashlight-line',
      image: 'https://readdy.ai/api/search-image?query=Direct%20drive%20fan%20installation%20in%20commercial%20building%2C%20Indian%20commercial%20setting%2C%20modern%20design%20with%20blue%20and%20silver%20tones&width=400&height=300&seq=direct-drive-fan&orientation=landscape',
      features: ['Compact design', 'Low maintenance', 'Quiet operation', 'Energy efficient']
    },
    {
      title: 'Ring Blowers',
      description: 'High-pressure ring blowers for pneumatic conveying, aeration, and industrial process applications.',
      icon: 'ri-donut-chart-line',
      image: 'https://readdy.ai/api/search-image?query=Ring%20blower%20system%20in%20industrial%20facility%20with%20piping%2C%20Indian%20manufacturing%20plant%2C%20blue%20and%20silver%20color%20scheme%2C%20industrial%20equipment&width=400&height=300&seq=ring-blower&orientation=landscape',
      features: ['High pressure capability', 'Continuous operation', 'Oil-free air', 'Corrosion resistant']
    },
    {
      title: 'Man Coolers',
      description: 'Portable and fixed man cooling systems for worker comfort in hot industrial environments.',
      icon: 'ri-user-line',
      image: 'https://readdy.ai/api/search-image?query=Industrial%20man%20cooler%20system%20with%20workers%20in%20hot%20environment%2C%20Indian%20factory%20setting%2C%20blue%20and%20silver%20color%20scheme%2C%20worker%20comfort%20solution&width=400&height=300&seq=man-cooler&orientation=landscape',
      features: ['Portable design', 'Instant cooling', 'Energy efficient', 'Worker safety focused']
    },
    {
      title: 'Poultry Fans',
      description: 'Specialized ventilation fans designed for poultry farms and livestock facilities with optimal airflow.',
      icon: 'ri-home-heart-line',
      image: 'https://readdy.ai/api/search-image?query=Poultry%20farm%20ventilation%20fans%20in%20chicken%20house%2C%20Indian%20agricultural%20setting%2C%20blue%20and%20silver%20color%20scheme%2C%20livestock%20ventilation%20system&width=400&height=300&seq=poultry-fan&orientation=landscape',
      features: ['Corrosion resistant', 'High airflow', 'Easy cleaning', 'Livestock optimized']
    },
    {
      title: 'Centrifugal Blowers',
      description: 'High-efficiency centrifugal blowers for industrial processes requiring high pressure and volume.',
      icon: 'ri-refresh-line',
      image: 'https://readdy.ai/api/search-image?query=Centrifugal%20blower%20system%20in%20industrial%20facility%2C%20Indian%20manufacturing%20plant%2C%20blue%20and%20silver%20color%20scheme%2C%20heavy%20duty%20industrial%20equipment&width=400&height=300&seq=centrifugal-blower&orientation=landscape',
      features: ['High pressure output', 'Robust construction', 'Variable speed', 'Industrial applications']
    }
  ];

  const whyChooseUs = [
    {
      title: 'Expert Engineering',
      description: '15+ years of experience in HVAC design and installation across India',
      icon: 'ri-tools-line'
    },
    {
      title: 'Quality Assurance',
      description: 'BIS certified components with rigorous quality control and testing',
      icon: 'ri-medal-line'
    },
    {
      title: 'Energy Efficiency',
      description: 'Advanced systems that reduce energy consumption by up to 40%',
      icon: 'ri-leaf-line'
    },
    {
      title: 'Pan-India Service',
      description: '24/7 support network covering all major cities and industrial areas',
      icon: 'ri-map-pin-line'
    }
  ];

  return (
    <>
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        <div className="relative z-50">
          <Navbar />
        </div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: `url('/services-bg.jpg')`
          }}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-blue-900/90"></div>
        
        <div className="relative z-10 container mx-auto px-6 text-center pt-20">
          <div className="flex items-center justify-start mb-6">
            <Link to="/" className="flex flex-row text-blue-300 hover:text-white transition-colors flex items-center">
              <HomeIcon className="w-6 h-6 mr-2" />Home
            </Link>
            <i className="ri-arrow-right-s-line text-blue-300 mx-2"></i>
            <span className="text-white">Services</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Comprehensive HVAC solutions engineered for Indian commercial and industrial environments. 
            From air conditioning to specialized ventilation systems.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className={`${item.icon} text-white text-xl`}></i>
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-blue-200 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Core HVAC Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional climate control solutions for commercial and industrial applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mainServices.map((service, index) => (
              <Link 
                key={index} 
                to={service.href}
                className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Duct Frame */}
                <div className="absolute inset-0 ">
                  <div className="w-full h-full border-4 border-gray-300 rounded-2xl relative">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className={`absolute w-10 h-5 bg-gradient-to-r from-gray-400 to-gray-500 rounded shadow-inner ${
                        i === 0 ? 'top-2 left-2' : i === 1 ? 'top-2 right-2' : i === 2 ? 'bottom-2 left-2' : 'bottom-2 right-2'
                      }`}>
                        <div className="flex justify-center items-center h-full space-x-0.5">
                          {Array.from({ length: 4 }).map((_, j) => (
                            <div key={j} className="w-0.5 h-2 bg-gray-700 rounded-full"></div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative z-10 p-8">
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center shadow-lg mr-6`}>
                      <i className={`${service.icon} text-white text-2xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <div className="text-blue-600 font-semibold">{service.capacity}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                    <span>Learn More</span>
                    <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-20 bg-gradient-to-b from-slate-100 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Specialized Equipment & Systems</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industrial fans, blowers, and specialized ventilation equipment for diverse applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover object-center group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <i className={`${service.icon} text-white text-xl`}></i>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-xs">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Upgrade Your HVAC System?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a customized solution designed for your specific requirements. 
            Free consultation and technical assessment included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/#contact" 
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg whitespace-nowrap"
            >
              Get Free Consultation
            </Link>
            <Link 
              to="tel:+919630859889" 
              className="px-8 py-4 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors shadow-lg border-2 border-blue-400 whitespace-nowrap"
            >
              Call: +91-9630859889
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}