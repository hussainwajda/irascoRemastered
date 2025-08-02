'use client';

import { ArrowRight, Headset, Leaf, Settings, Wrench } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
      {/* Background Duct Network */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400">
          <div className="flex justify-between items-center h-full px-8">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="w-1 h-4 bg-gray-800 rounded-full"></div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400">
          <div className="flex justify-between items-center h-full px-8">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="w-1 h-4 bg-gray-800 rounded-full"></div>
            ))}
          </div>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-b from-gray-400 via-gray-500 to-gray-400">
          <div className="flex flex-col justify-between items-center h-full py-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-4 h-1 bg-gray-800 rounded-full"></div>
            ))}
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-b from-gray-400 via-gray-500 to-gray-400">
          <div className="flex flex-col justify-between items-center h-full py-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-4 h-1 bg-gray-800 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-l-lg mr-4">
                  <div className="flex justify-center items-center h-full space-x-0.5">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="w-0.5 h-2 bg-blue-800 rounded-full"></div>
                    ))}
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white">About IRASCO</h2>
              </div>
              
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                For over 5 years, IRASCO has been at the forefront of HVAC innovation, 
                delivering cutting-edge climate control solutions that redefine comfort 
                and efficiency in commercial environments.
              </p>
              
              <p className="text-lg text-gray-400 leading-relaxed">
                Our team of certified engineers and technicians combines decades of 
                experience with the latest technology to create systems that not only 
                meet today's demands but anticipate tomorrow's challenges.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {[
                { title: 'Precision Engineering', desc: 'Every system designed for optimal performance and longevity', icon: <Settings className="w-12 h-12" /> },
                { title: 'Energy Efficiency', desc: 'Advanced technology that reduces costs and environmental impact', icon: <Leaf className="w-12 h-12" /> },
                { title: 'Expert Installation', desc: 'Certified technicians ensuring perfect system integration', icon: <Wrench className="w-12 h-12" /> },
                { title: '24/7 Support', desc: 'Round-the-clock maintenance and emergency service', icon: <Headset className="w-12 h-12" /> }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <span className={`text-white text-xl w-6 h-6 flex items-center justify-center`}>{feature.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-1">{feature.title}</h4>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
              <span className="relative z-10 flex items-center">
                Know More
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200 flex items-center justify-center" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative group">
              {/* Main Image */}
              <img 
                src="https://readdy.ai/api/search-image?query=Professional%20HVAC%20technicians%20working%20on%20modern%20industrial%20air%20conditioning%20system%20with%20complex%20ductwork%2C%20futuristic%20commercial%20building%20interior%2C%20blue%20and%20silver%20color%20scheme%2C%20professional%20lighting%2C%20high-tech%20atmosphere&width=600&height=500&seq=about-img&orientation=landscape"
                alt="IRASCO HVAC professionals at work"
                className="w-full h-96 object-cover object-top rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Overlay Frame with Vents */}
              <div className="absolute inset-0 rounded-2xl border-4 border-gray-300 shadow-2xl">
                {/* Top Vent Strip */}
                <div className="absolute -top-4 left-1/4 right-1/4 h-8 bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500 rounded-t-lg shadow-lg">
                  <div className="flex justify-between items-center h-full px-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="w-1 h-4 bg-gray-800 rounded-full"></div>
                    ))}
                  </div>
                </div>
                
                {/* Side Vents */}
                <div className="absolute -left-4 top-1/4 bottom-1/4 w-8 bg-gradient-to-b from-gray-500 via-gray-400 to-gray-500 rounded-l-lg shadow-lg">
                  <div className="flex flex-col justify-between items-center h-full py-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="w-4 h-1 bg-gray-800 rounded-full"></div>
                    ))}
                  </div>
                </div>
                
                <div className="absolute -right-4 top-1/4 bottom-1/4 w-8 bg-gradient-to-b from-gray-500 via-gray-400 to-gray-500 rounded-r-lg shadow-lg">
                  <div className="flex flex-col justify-between items-center h-full py-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="w-4 h-1 bg-gray-800 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-white to-gray-100 rounded-xl p-6 shadow-2xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 mb-1">100+</div>
                <div className="text-sm text-gray-600">Projects Delivered</div>
              </div>
              {/* Mini Vent */}
              <div className="absolute top-2 right-2 w-6 h-3 bg-gradient-to-r from-gray-400 to-gray-500 rounded opacity-30">
                <div className="flex justify-center items-center h-full space-x-0.5">
                  <div className="w-0.5 h-1 bg-gray-800 rounded-full"></div>
                  <div className="w-0.5 h-1 bg-gray-800 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="absolute -top-8 -right-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-2xl">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">5+</div>
                <div className="text-sm opacity-90">Years Experience</div>
              </div>
              {/* Mini Vent */}
              <div className="absolute top-2 right-2 w-6 h-3 bg-blue-800 rounded opacity-50">
                <div className="flex justify-center items-center h-full space-x-0.5">
                  <div className="w-0.5 h-1 bg-blue-900 rounded-full"></div>
                  <div className="w-0.5 h-1 bg-blue-900 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}