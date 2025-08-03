'use client';

import { MapPin } from "lucide-react";
import ShinyText from "@/assets/ShineText";

export default function MapSection() {
  return (
    <section id="map" className="relative py-20 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
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
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  <ShinyText text="Our Location" className="text-white" />
                </h2>
              </div>
              
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                Find us at our state-of-the-art facility. We are conveniently located to serve the entire region.
              </p>
              
              <p className="text-lg text-gray-400 leading-relaxed">
                Our headquarters is where innovation in HVAC technology happens. We welcome you to visit us.
              </p>
            </div>

            <div className="flex items-start space-x-4 group">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-1">IRASCO Headquarters</h4>
                <p className="text-gray-400">Sajjan mill, 457001, Ratlam, Madhya Pradesh</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="relative">
            <div className="relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14654.38375268922!2d75.02373964505345!3d23.330414763343526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3963fc20cece3ae5%3A0xd651c852dc9e2abc!2sIRASCO!5e0!3m2!1sen!2sin!4v1688243722208!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="w-full h-96 object-cover object-top rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
              ></iframe>
              
              {/* Overlay Frame with Vents */}
              <div className="absolute inset-0 rounded-2xl border-4 border-gray-300 shadow-2xl pointer-events-none">
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
          </div>
        </div>
      </div>
    </section>
  );
}
