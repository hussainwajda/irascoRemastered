import { Link } from 'react-router-dom';
import Gallery from '@/components/Gallery';
import { Navbar } from '@/components/Navbar';

export default function CommercialCoolersDetail() {
  const coolerTypes = [
    {
      title: 'Desert Air Coolers',
      description: 'High-efficiency evaporative cooling systems perfect for hot and dry climates, providing natural and eco-friendly cooling.',
      icon: 'ri-sun-line',
      capacity: '5,000 - 25,000 CFM',
      features: ['Natural Cooling', 'Low Power Consumption', 'Fresh Air Supply', 'Eco-Friendly']
    },
    {
      title: 'Industrial Air Coolers',
      description: 'Heavy-duty cooling solutions designed for factories, warehouses, and large industrial spaces with high heat loads.',
      icon: 'ri-building-2-line',
      capacity: '10,000 - 50,000 CFM',
      features: ['Heavy Duty Build', 'High Airflow', 'Corrosion Resistant', 'Low Maintenance']
    },
    {
      title: 'Tower Air Coolers',
      description: 'Vertical design coolers ideal for space-constrained commercial areas like shops, restaurants, and small offices.',
      icon: 'ri-building-line',
      capacity: '3,000 - 12,000 CFM',
      features: ['Space Saving', 'Portable Design', 'Easy Installation', 'Cost Effective']
    },
    {
      title: 'Duct Coolers',
      description: 'Centralized cooling systems with ductwork for uniform air distribution across multiple rooms and floors.',
      icon: 'ri-windy-line',
      capacity: '8,000 - 30,000 CFM',
      features: ['Central Cooling', 'Uniform Distribution', 'Multi-Zone Control', 'Energy Efficient']
    }
  ];

  const applications = [
    {
      sector: 'Manufacturing Units',
      image: '/manufacture-cooler.png',
      description: 'Cost-effective cooling for textile mills, auto plants, pharmaceutical units, and other manufacturing facilities.',
      benefits: ['Reduces Heat Stress', 'Improves Productivity', 'Lower Operating Costs', 'Fresh Air Circulation']
    },
    {
      sector: 'Warehouses & Storage',
      image: 'https://readdy.ai/api/search-image?query=Large%20warehouse%20with%20industrial%20air%20coolers%20and%20storage%20racks%2C%20Indian%20logistics%20facility%2C%20blue%20and%20silver%20tones%2C%20commercial%20storage%20environment&width=600&height=400&seq=warehouse-cooler&orientation=landscape',
      description: 'Efficient cooling solutions for logistics centers, cold storage facilities, and distribution warehouses.',
      benefits: ['Prevents Overheating', 'Protects Inventory', 'Worker Comfort', 'Energy Savings']
    },
    {
      sector: 'Commercial Kitchens',
      image: 'https://readdy.ai/api/search-image?query=Commercial%20kitchen%20with%20industrial%20air%20coolers%20and%20chefs%20working%2C%20Indian%20restaurant%20setting%2C%20stainless%20steel%20equipment%2C%20professional%20cooking%20environment&width=600&height=400&seq=kitchen-cooler&orientation=landscape',
      description: 'Specialized cooling for restaurant kitchens, food processing units, and commercial cooking facilities.',
      benefits: ['Heat Extraction', 'Improved Air Quality', 'Staff Comfort', 'Food Safety']
    },
    {
      sector: 'Event Venues',
      image: 'https://readdy.ai/api/search-image?query=Large%20event%20venue%20with%20portable%20air%20coolers%20and%20people%2C%20Indian%20wedding%20hall%20or%20conference%20center%2C%20blue%20and%20silver%20color%20scheme%2C%20celebration%20environment&width=600&height=400&seq=event-cooler&orientation=landscape',
      description: 'Portable and temporary cooling solutions for banquet halls, exhibition centers, and outdoor events.',
      benefits: ['Quick Setup', 'Portable Solutions', 'Cost Effective', 'Flexible Placement']
    }
  ];

  const climateAdvantages = [
    {
      condition: 'Hot & Dry Climate',
      efficiency: '85-90%',
      temperature: '15-20°C Drop',
      humidity: 'Natural Humidification',
      icon: 'ri-sun-line'
    },
    {
      condition: 'Moderate Humidity',
      efficiency: '70-80%',
      temperature: '10-15°C Drop',
      humidity: 'Balanced Moisture',
      icon: 'ri-cloudy-line'
    },
    {
      condition: 'Industrial Heat',
      efficiency: '75-85%',
      temperature: '12-18°C Drop',
      humidity: 'Dust Filtration',
      icon: 'ri-fire-line'
    }
  ];

  const specifications = [
    { label: 'Airflow Capacity', value: '3,000 - 50,000 CFM' },
    { label: 'Power Consumption', value: '0.5 - 5 kW' },
    { label: 'Water Tank Capacity', value: '50 - 500 Liters' },
    { label: 'Cooling Pad Type', value: 'Celdek/Honeycomb' },
    { label: 'Motor Type', value: 'Single/Three Phase' },
    { label: 'Coverage Area', value: '500 - 5000 Sq.Ft' }
  ];

  const galleryImages = [
    {
      src: 'https://readdy.ai/api/search-image?query=Large%20desert%20air%20cooler%20installation%20in%20Indian%20manufacturing%20facility%20with%20workers%2C%20industrial%20cooling%20system%2C%20green%20and%20silver%20color%20scheme%2C%20factory%20environment&width=800&height=600&seq=cooler-gallery1&orientation=landscape',
      alt: 'Desert Air Cooler Installation',
      title: 'Desert Cooler - Manufacturing Plant'
    },
    {
      src: 'https://readdy.ai/api/search-image?query=Industrial%20air%20cooler%20system%20in%20Indian%20warehouse%20with%20high%20ceiling%20and%20workers%2C%20evaporative%20cooling%2C%20green%20and%20silver%20tones%2C%20logistics%20facility&width=800&height=600&seq=cooler-gallery2&orientation=landscape',
      alt: 'Industrial Air Cooler',
      title: 'Industrial Cooler - Warehouse Facility'
    },
    {
      src: 'https://readdy.ai/api/search-image?query=Tower%20air%20cooler%20installation%20in%20Indian%20commercial%20kitchen%20with%20chefs%2C%20restaurant%20cooling%20system%2C%20green%20and%20silver%20color%20scheme%2C%20food%20service&width=800&height=600&seq=cooler-gallery3&orientation=landscape',
      alt: 'Tower Air Cooler',
      title: 'Tower Cooler - Commercial Kitchen'
    },
    {
      src: 'https://readdy.ai/api/search-image?query=Duct%20cooler%20system%20with%20central%20distribution%20in%20Indian%20office%20building%2C%20evaporative%20cooling%20installation%2C%20green%20and%20silver%20tones%2C%20commercial%20space&width=800&height=600&seq=cooler-gallery4&orientation=landscape',
      alt: 'Duct Cooler System',
      title: 'Ducted Cooler - Office Complex'
    },
    {
      src: 'https://readdy.ai/api/search-image?query=Event%20venue%20air%20cooler%20setup%20for%20Indian%20wedding%20hall%20with%20portable%20units%2C%20temporary%20cooling%20solution%2C%20green%20and%20silver%20color%20scheme%2C%20celebration%20environment&width=800&height=600&seq=cooler-gallery5&orientation=landscape',
      alt: 'Event Venue Cooling',
      title: 'Portable Coolers - Event Venue'
    },
    {
      src: 'https://readdy.ai/api/search-image?query=Textile%20mill%20air%20cooler%20installation%20in%20Indian%20factory%20with%20workers%20and%20machinery%2C%20industrial%20evaporative%20cooling%2C%20green%20and%20silver%20tones%2C%20manufacturing%20environment&width=800&height=600&seq=cooler-gallery6&orientation=landscape',
      alt: 'Textile Mill Cooling',
      title: 'Industrial Cooling - Textile Mill'
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="relative z-50">
          <Navbar />
        </div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Industrial%20air%20cooler%20installation%20in%20Indian%20factory%20with%20workers%20and%20large%20cooling%20systems%2C%20industrial%20setting%2C%20green%20and%20silver%20color%20scheme%2C%20manufacturing%20environment&width=1200&height=800&seq=cooler-hero&orientation=landscape')`
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-emerald-800/80"></div>

        <div className="relative z-10 container mx-auto px-6 mt-4 pt-4 md:mt-12 md:pt-20">
          <div className="max-w-4xl">
            <div className="flex items-center mb-6">
              <Link to="/" className="text-green-300 hover:text-white transition-colors">
                Home
              </Link>
              <i className="ri-arrow-right-s-line text-green-300 mx-2"></i>
              <Link to="/services" className="text-green-300 hover:text-white transition-colors">
                Services
              </Link>
              <i className="ri-arrow-right-s-line text-green-300 mx-2"></i>
              <span className="text-white">Commercial Air Coolers</span>
            </div>

            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-2xl mr-6">
                <i className="ri-snowy-line text-white text-3xl"></i>
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  Commercial Air Coolers
                </h1>
                <p className="text-xl text-green-200 leading-relaxed">
                  Eco-friendly evaporative cooling solutions perfect for Indian climate conditions
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-water-percent-line text-white text-xl"></i>
                </div>
                <h3 className="text-white font-semibold mb-2">90% Energy Savings</h3>
                <p className="text-green-200 text-sm">Compared to traditional AC systems, significantly lower power consumption</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-leaf-line text-white text-xl"></i>
                </div>
                <h3 className="text-white font-semibold mb-2">100% Eco-Friendly</h3>
                <p className="text-green-200 text-sm">Zero harmful refrigerants, natural cooling process with water evaporation</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-windy-line text-white text-xl"></i>
                </div>
                <h3 className="text-white font-semibold mb-2">Fresh Air Supply</h3>
                <p className="text-green-200 text-sm">Continuous fresh outdoor air circulation, no stale air recirculation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cooler Types Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Air Cooler Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive range of evaporative cooling systems for every commercial application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coolerTypes.map((cooler, index) => (
              <div key={index} className="group bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg mr-6">
                      <i className={`${cooler.icon} text-white text-2xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 group-hover:text-green-600 transition-colors">
                        {cooler.title}
                      </h3>
                      <div className="text-green-600 font-semibold">{cooler.capacity}</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {cooler.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {cooler.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
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
        title="Commercial Air Cooler Installation Gallery"
        colorScheme="green"
      />

      {/* Climate Advantages */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Climate Efficiency Chart</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Performance metrics across different Indian climate conditions
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {climateAdvantages.map((climate, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className={`${climate.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-white">{climate.condition}</h3>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cooling Efficiency</span>
                      <span className="font-bold text-green-600">{climate.efficiency}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Temperature Drop</span>
                      <span className="font-bold text-blue-600">{climate.temperature}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Air Quality</span>
                      <span className="font-bold text-purple-600">{climate.humidity}</span>
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
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Commercial Applications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Versatile cooling solutions for diverse Indian commercial sectors
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
                      className="w-full h-48 object-cover object-center rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-green-600 transition-colors">
                    {app.sector}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {app.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {app.benefits.map((benefit, i) => (
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

      {/* Specifications Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Technical Specifications</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Detailed specifications for commercial air cooler systems
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {specifications.map((spec, index) => (
                    <div key={index} className="group">
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-green-400/50 transition-all duration-300">
                        <div className="text-green-300 text-sm font-medium mb-1">{spec.label}</div>
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
                    <span>3 Year Warranty</span>
                    <div className="w-1 h-4 bg-slate-600"></div>
                    <i className="ri-service-line text-purple-400"></i>
                    <span>Pan India Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Experience Natural Cooling Technology
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Switch to eco-friendly air cooling and save up to 90% on electricity bills. 
            Perfect for Indian climate conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/#contact"
              className="px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:bg-green-50 transition-colors shadow-lg"
            >
              Get Free Site Survey
            </Link>
            <Link
              to="tel:+919630859889"
              className="px-8 py-4 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-colors shadow-lg border-2 border-green-400"
            >
              Call: +91-555-123-COOL
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
