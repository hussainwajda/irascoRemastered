'use client';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-black">
      {/* Top Duct Border */}
      <div className="w-full h-12 bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500 shadow-inner">
        <div className="flex justify-between items-center h-full px-8">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="w-1 h-6 bg-gray-800 rounded-full"></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 px-6 py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-transparent rounded-lg flex items-center justify-center transition-colors duration-200 group">
                  <img src="/favicon.ico" alt="IRASCO" className="w-full h-full object-cover" />
                </div>
                <span className="font-['Pacifico'] text-2xl text-white font-bold">IRASCO</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Leading HVAC solutions provider, delivering cutting-edge climate control 
                systems for commercial and industrial applications.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: <FontAwesomeIcon icon={faFacebook} />, href: '#' },
                  { icon: <FontAwesomeIcon icon={faWhatsapp} />, href: '#' },
                  { icon: <FontAwesomeIcon icon={faInstagram} />, href: '#' }
                ].map((social, index) => (
                  <Link 
                    key={index}
                    to={social.href} 
                    className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <div className="w-6 h-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded mr-3">
                  <div className="flex justify-center items-center h-full space-x-0.5">
                    <div className="w-0.5 h-1 bg-blue-800 rounded-full"></div>
                    <div className="w-0.5 h-1 bg-blue-800 rounded-full"></div>
                  </div>
                </div>
                Our Services
              </h3>
              <ul className="space-y-3">
                {[
                  'Commercial Air Conditioning',
                  'Industrial Air Coolers',
                  'Kitchen Chimney Systems',
                  'Ductwork Installation',
                  'System Maintenance',
                  'Emergency Repairs'
                ].map((service, index) => (
                  <li key={index}>
                    <Link to="/services" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center">
                      <i className="ri-arrow-right-s-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <div className="w-6 h-3 bg-gradient-to-r from-green-500 to-emerald-400 rounded mr-3">
                  <div className="flex justify-center items-center h-full space-x-0.5">
                    <div className="w-0.5 h-1 bg-green-800 rounded-full"></div>
                    <div className="w-0.5 h-1 bg-green-800 rounded-full"></div>
                  </div>
                </div>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'About Us', href: '#about' },
                  { name: 'Our Services', href: '#services' },
                  { name: 'Contact Us', href: '#contact' },
                  { name: 'Free Consultation', href: '#contact' },
                  { name: 'Privacy Policy', href: '#' },
                  { name: 'Terms of Service', href: '#' }
                ].map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center">
                      <i className="ri-arrow-right-s-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <div className="w-6 h-3 bg-gradient-to-r from-purple-500 to-pink-400 rounded mr-3">
                  <div className="flex justify-center items-center h-full space-x-0.5">
                    <div className="w-0.5 h-1 bg-purple-800 rounded-full"></div>
                    <div className="w-0.5 h-1 bg-purple-800 rounded-full"></div>
                  </div>
                </div>
                Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-map-pin-line text-blue-400 mt-1 w-5 h-5 flex items-center justify-center"></i>
                  <div className="text-gray-400">
                    <div className="font-medium text-white">Address</div>
                    <div>Sajjan mill, 457001, Ratlam, Madhya Pradesh</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-phone-line text-green-400 mt-1 w-5 h-5 flex items-center justify-center"></i>
                  <div className="text-gray-400">
                    <div className="font-medium text-white">Phone</div>
                    <div>+91 9630859889</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-mail-line text-purple-400 mt-1 w-5 h-5 flex items-center justify-center"></i>
                  <div className="text-gray-400">
                    <div className="font-medium text-white">Email</div>
                    <div>irascoindia@gmail.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2025 IRASCO. All rights reserved.
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <i className="ri-shield-check-line text-green-400 w-4 h-4 flex items-center justify-center"></i>
                  <span>Licensed & Insured</span>
                </div>
                <div className="w-1 h-4 bg-gray-600"></div>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <i className="ri-award-line text-yellow-400 w-4 h-4 flex items-center justify-center"></i>
                  <span>Certified Technicians</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Duct Border */}
      <div className="w-full h-8 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 shadow-inner">
        <div className="flex justify-between items-center h-full px-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-0.5 h-4 bg-gray-800 rounded-full"></div>
          ))}
        </div>
      </div>
    </footer>
  );
}