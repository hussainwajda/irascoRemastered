import { Link } from 'react-router-dom';
import Gallery from '@/components/Gallery';
import { Navbar } from '@/components/Navbar';

export default function DuctworkDetail() {
  const ductworkTypes = [
    {
      title: 'Supply Air Ducts',
      description: 'Engineered to deliver conditioned air efficiently from HVAC units to designated zones with optimal pressure distribution.',
      icon: 'ri-upload-cloud-2-line',
      material: 'Galvanized Steel/Aluminum',
      features: ['Precision Airflow', 'Insulation Ready', 'Leak Proof Joints', 'Custom Sizing']
    },
    {
      title: 'Return Air Ducts',
      description: 'Designed to collect and return air back to the HVAC system for reconditioning and recirculation.',
      icon: 'ri-download-cloud-2-line',
      material: 'Galvanized Steel/Fiberglass',
      features: ['Low Noise', 'Easy Maintenance', 'Dust Resistant', 'Efficient Return']
    },
    {
      title: 'Exhaust Ventilation',
      description: 'Specialized systems for removing contaminated air, odors, smoke, and humidity from commercial spaces.',
      icon: 'ri-logout-box-r-line',
      material: 'Stainless Steel/PVC',
      features: ['Corrosion Resistant', 'High Velocity', 'Fire Rated', 'Chemical Resistant']
    },
    {
      title: 'Fresh Air Intake',
      description: 'Systems designed to bring filtered outdoor air into buildings to maintain indoor air quality standards.',
      icon: 'ri-login-box-line',
      material: 'Aluminum/Galvanized Steel',
      features: ['Weather Resistant', 'Filtration Ready', 'Bird Guards', 'Louver Integration']
    }
  ];

  const applications = [
    {
      sector: 'Office Buildings',
      image: 'https://readdy.ai/api/search-image?query=Modern%20office%20building%20HVAC%20ductwork%20installation%20in%20ceiling%20with%20technicians%20working%2C%20Indian%20commercial%20building%2C%20blue%20and%20silver%20color%20scheme%2C%20professional%20environment&width=600&height=400&seq=office-duct&orientation=landscape',
      description: 'Comprehensive ductwork solutions for corporate offices, IT parks, and business centers across India.',
      systems: ['VAV Systems', 'Zone Control', 'Energy Recovery', 'Air Quality Monitoring']
    },
    {
      sector: 'Industrial Facilities',
      image: 'https://readdy.ai/api/search-image?query=Large%20industrial%20facility%20with%20complex%20HVAC%20ductwork%20system%20and%20heavy%20machinery%2C%20Indian%20manufacturing%20plant%2C%20blue%20and%20silver%20tones%2C%20industrial%20setting&width=600&height=400&seq=industrial-duct&orientation=landscape',
      description: 'Heavy-duty ventilation systems for manufacturing plants, warehouses, and production facilities.',
      systems: ['High Volume Exhaust', 'Process Ventilation', 'Dust Collection', 'Fume Extraction']
    },
    {
      sector: 'Healthcare Facilities',
      image: 'https://readdy.ai/api/search-image?query=Hospital%20HVAC%20ductwork%20installation%20with%20clean%20room%20standards%20and%20medical%20equipment%2C%20Indian%20healthcare%20facility%2C%20blue%20and%20silver%20color%20scheme&width=600&height=400&seq=healthcare-duct&orientation=landscape',
      description: 'Specialized ductwork for hospitals, clinics, and medical facilities with strict air quality requirements.',
      systems: ['HEPA Filtration', 'Positive Pressure', 'Isolation Rooms', 'Operating Theater Ventilation']
    },
    {
      sector: 'Retail & Malls',
      image: 'https://readdy.ai/api/search-image?query=Shopping%20mall%20HVAC%20ductwork%20system%20in%20ceiling%20with%20modern%20retail%20space%2C%20Indian%20commercial%20mall%2C%20blue%20and%20silver%20color%20scheme%2C%20contemporary%20design&width=600&height=400&seq=retail-duct&orientation=landscape',
      description: 'Climate control ductwork for shopping centers, retail stores, and entertainment complexes.',
      systems: ['Zoned Comfort', 'Smoke Management', 'Energy Efficiency', 'Flexible Layouts']
    }
  ];

  const ductMaterials = [
    {
      material: 'Galvanized Steel',
      properties: ['Durability', 'Fire Resistance', 'Cost Effective', 'Easy Fabrication'],
      applications: 'General HVAC, Commercial Buildings',
      thickness: '0.6mm - 2.5mm',
      icon: 'ri-shield-line'
    },
    {
      material: 'Stainless Steel',
      properties: ['Corrosion Resistant', 'High Temperature', 'Chemical Resistant', 'Food Safe'],
      applications: 'Kitchen Exhaust, Chemical Plants',
      thickness: '0.8mm - 3.0mm',
      icon: 'ri-star-line'
    },
    {
      material: 'Aluminum',
      properties: ['Lightweight', 'Corrosion Resistant', 'Non-Magnetic', 'Easy Installation'],
      applications: 'Clean Rooms, Pharmaceutical',
      thickness: '0.8mm - 1.6mm',
      icon: 'ri-lightbulb-line'
    },
    {
      material: 'Fiberglass',
      properties: ['Insulation Properties', 'Sound Absorption', 'Lightweight', 'Chemical Resistant'],
      applications: 'Underground, Coastal Areas',
      thickness: '6mm - 25mm',
      icon: 'ri-leaf-line'
    }
  ];

  const specifications = [
    { label: 'Duct Sizes', value: '100mm to 2000mm' },
    { label: 'Pressure Rating', value: 'Up to 2500 Pa' },
    { label: 'Temperature Range', value: '-40°C to 120°C' },
    { label: 'Velocity Range', value: '3-25 m/s' },
    { label: 'Insulation Thickness', value: '25-100mm' },
    { label: 'Leakage Class', value: 'A, B, C as per EN 1507' }
  ];

  const galleryImages = [
    {
      src: 'https://readdy.ai/api/search-image?query=Complex%20HVAC%20ductwork%20installation%20in%20Indian%20commercial%20building%20ceiling%20with%20technicians%2C%20galvanized%20steel%20ducts%2C%20cyan%20and%20silver%20color%20scheme&width=800&height=600&seq=duct-gallery1&orientation=landscape',
      alt: 'Commercial Ductwork Installation',
      title: 'Supply Air Ductwork - Office Building'
    },
    {
      src: 'https://readdy.ai/api/search-image?query=Industrial%20ventilation%20ductwork%20in%20Indian%20manufacturing%20facility%20with%20heavy%20machinery%2C%20stainless%20steel%20ducts%2C%20cyan%20and%20silver%20tones&width=800&height=600&seq=duct-gallery2&orientation=landscape',
      alt: 'Industrial Ventilation Ductwork',
      title: 'Industrial Exhaust - Manufacturing Plant'
    },
    {
      src: 'https://readdy.ai/api/search-image?query=Hospital%20HVAC%20ductwork%20installation%20with%20HEPA%20filtration%20system%2C%20Indian%20healthcare%20facility%2C%20cyan%20and%20silver%20color%20scheme%2C%20clean%20room%20standards&width=800&height=600&seq=duct-gallery3&orientation=landscape',
      alt: 'Hospital HVAC Ductwork',
      title: 'Medical Grade Ductwork - Hospital'
    },
    {
      src: 'https://readdy.ai/api/search-image?query=Shopping%20mall%20HVAC%20ductwork%20system%20with%20multiple%20zones%2C%20Indian%20retail%20facility%2C%20cyan%20and%20silver%20tones%2C%20commercial%20ventilation&width=800&height=600&seq=duct-gallery4&orientation=landscape',
      alt: 'Mall Ventilation System',
      title: 'Multi-Zone System - Shopping Mall'
    },
    {
      src: 'https://readdy.ai/api/search-image?query=Fresh%20air%20intake%20ductwork%20installation%20on%20Indian%20commercial%20building%20rooftop%2C%20weather%20resistant%20design%2C%20cyan%20and%20silver%20color%20scheme&width=800&height=600&seq=duct-gallery5&orientation=landscape',
      alt: 'Fresh Air Intake System',
      title: 'Fresh Air Intake - Commercial Building'
    },
    {
      src: 'https://readdy.ai/api/search-image?query=Insulated%20ductwork%20installation%20in%20Indian%20office%20building%20with%20thermal%20protection%2C%20energy%20efficient%20HVAC%20system%2C%20cyan%20and%20silver%20tones&width=800&height=600&seq=duct-gallery6&orientation=landscape',
      alt: 'Insulated Ductwork System',
      title: 'Insulated Ducts - Energy Efficient Office'
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-cyan-900 via-blue-800 to-cyan-900 overflow-hidden">
        <div className="relative z-50">
          <Navbar />
        </div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Complex%20HVAC%20ductwork%20installation%20in%20Indian%20commercial%20building%20with%20technicians%20and%20modern%20ventilation%20systems%2C%20industrial%20setting%2C%20cyan%20and%20silver%20color%20scheme&width=1200&height=800&seq=ductwork-hero&orientation=landscape')`
          }}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/90 to-blue-800/80"></div>
        
        <div className="relative z-10 container mx-auto px-6 mt-4 pt-4 md:mt-12 md:pt-20">
          <div className="max-w-4xl">
            <div className="flex items-center mb-6">
              <Link to="/" className="text-cyan-300 hover:text-white transition-colors">
                Home
              </Link>
              <i className="ri-arrow-right-s-line text-cyan-300 mx-2"></i>
              <Link to="/services" className="text-cyan-300 hover:text-white transition-colors">
                Services
              </Link>
              <i className="ri-arrow-right-s-line text-cyan-300 mx-2"></i>
              <span className="text-white">Ductwork & Ventilation</span>
            </div>
            
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-2xl mr-6">
                <i className="ri-windy-line text-white text-3xl"></i>
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  Ductwork & Ventilation
                </h1>
                <p className="text-xl text-cyan-200 leading-relaxed">
                  Precision-engineered airflow distribution systems for optimal indoor climate control
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-compass-3-line text-white text-xl"></i>
                </div>
                <h3 className="text-white font-semibold mb-2">Precision Design</h3>
                <p className="text-cyan-200 text-sm">Computer-aided design for optimal airflow distribution and pressure balance</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-tools-line text-white text-xl"></i>
                </div>
                <h3 className="text-white font-semibold mb-2">Expert Installation</h3>
                <p className="text-cyan-200 text-sm">Certified technicians with 15+ years experience in commercial ductwork</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-medal-line text-white text-xl"></i>
                </div>
                <h3 className="text-white font-semibold mb-2">Quality Materials</h3>
                <p className="text-cyan-200 text-sm">Premium grade materials with BIS certification and long-term durability</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ductwork Types Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Ductwork System Types</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive ventilation solutions designed for efficient air distribution and climate control
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ductworkTypes.map((duct, index) => (
              <div key={index} className="group bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg mr-6">
                      <i className={`${duct.icon} text-white text-2xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 group-hover:text-cyan-600 transition-colors">
                        {duct.title}
                      </h3>
                      <div className="text-cyan-600 font-semibold">{duct.material}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {duct.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {duct.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
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
        title="Ductwork & Ventilation Installation Gallery"
        colorScheme="cyan"
      />

      {/* Material Options */}
      <section className="py-20 bg-gradient-to-b from-cyan-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Ductwork Materials & Specifications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium materials selected for durability and performance in Indian commercial environments
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ductMaterials.map((material, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <i className={`${material.icon} text-white text-xl`}></i>
                    </div>
                    <h3 className="text-lg font-bold text-white">{material.material}</h3>
                    <div className="text-cyan-100 text-sm mt-1">{material.thickness}</div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-3 mb-4">
                      {material.properties.map((prop, i) => (
                        <div key={i} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-gray-700">{prop}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-600 bg-gray-50 rounded-lg p-3">
                      <div className="font-semibold mb-1">Best For:</div>
                      {material.applications}
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
              Customized ductwork solutions for diverse commercial sectors across India
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
                  
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-cyan-600 transition-colors">
                    {app.sector}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {app.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {app.systems.map((system, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
                        <span className="text-gray-700">{system}</span>
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
              Comprehensive specifications for commercial ductwork and ventilation systems
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {specifications.map((spec, index) => (
                    <div key={index} className="group">
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-cyan-400/50 transition-all duration-300">
                        <div className="text-cyan-300 text-sm font-medium mb-1">{spec.label}</div>
                        <div className="text-white text-lg font-semibold">{spec.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 text-center">
                  <div className="inline-flex items-center space-x-4 text-slate-300">
                    <i className="ri-checkbox-circle-line text-green-400"></i>
                    <span>BIS Certified Materials</span>
                    <div className="w-1 h-4 bg-slate-600"></div>
                    <i className="ri-shield-check-line text-blue-400"></i>
                    <span>10 Year Structural Warranty</span>
                    <div className="w-1 h-4 bg-slate-600"></div>
                    <i className="ri-service-line text-purple-400"></i>
                    <span>Nationwide Installation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Engineer Perfect Airflow for Your Space
          </h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Custom ductwork design and installation with precision airflow calculation. 
            Ensure optimal climate control and energy efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/#contact" 
              className="px-8 py-4 bg-white text-cyan-600 font-bold rounded-lg hover:bg-cyan-50 transition-colors shadow-lg"
            >
              Get Airflow Analysis
            </Link>
            <Link 
              to="tel:+919630859889" 
              className="px-8 py-4 bg-cyan-700 text-white font-bold rounded-lg hover:bg-cyan-800 transition-colors shadow-lg border-2 border-cyan-400"
            >
              Call: +91-555-123-DUCT
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
