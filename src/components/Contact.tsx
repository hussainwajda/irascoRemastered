'use client';

import React from 'react';
import { ChevronDown, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import ShinyText from '@/assets/ShineText';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Thank you for your inquiry! We will contact you within 24 hours.');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    }, 2000);
  };

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-b from-white to-slate-100">
      {/* Background Duct Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 grid-rows-6 h-full gap-4 p-8">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="bg-gray-400 rounded opacity-30">
              {i % 7 === 0 && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-6 bg-gradient-to-r from-gray-500 to-gray-600 rounded-l-lg mr-4 shadow-lg">
              <div className="flex justify-between items-center h-full px-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-0.5 h-3 bg-gray-800 rounded-full"></div>
                ))}
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
              <ShinyText text="Get In Touch" className="text-slate-800" />
            </h2>
            <div className="w-20 h-6 bg-gradient-to-l from-gray-500 to-gray-600 rounded-r-lg ml-4 shadow-lg">
              <div className="flex justify-between items-center h-full px-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-0.5 h-3 bg-gray-800 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to upgrade your HVAC system? Contact our experts for a free consultation 
            and discover how we can improve your indoor environment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="relative">
            {/* Duct Frame for Form */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl shadow-inner p-1">
              <div className="w-full h-full bg-white rounded-xl"></div>
              {/* Corner Bolts */}
              {[
                'top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'
              ].map((position, i) => (
                <div key={i} className={`absolute ${position} w-4 h-4 bg-gray-600 rounded-full shadow-inner flex items-center justify-center`}>
                  <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                </div>
              ))}
            </div>

            <div className="relative z-10 bg-white rounded-xl p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm"
                      placeholder="+91 XXXXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Service Interest</label>
                    <div className="relative">
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pr-8 border-2 border-gray-200 text-black rounded-lg focus:border-blue-500 focus:outline-none transition-colors appearance-none text-sm bg-white cursor-pointer"
                      >
                        <option value="">Select a service</option>
                        <option value="commercial-ac">Commercial Air Conditioning</option>
                        <option value="air-coolers">Commercial Air Coolers</option>
                        <option value="kitchen-chimney">Kitchen Chimney Systems</option>
                        <option value="ductwork">Ductwork & Ventilation</option>
                        <option value="maintenance">Maintenance & Repair</option>
                        <option value="consultation">Free Consultation</option>
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-black" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    maxLength={500}
                    className="w-full px-4 py-3 border-2 border-gray-200 text-black rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none text-sm"
                    placeholder="Tell us about your project requirements..."
                  ></textarea>
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {formData.message.length}/500 characters
                  </div>
                </div>

                {submitMessage && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm">{submitMessage}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <i className="ri-loader-4-line animate-spin mr-2 w-5 h-5 flex items-center justify-center"></i>
                      Sending Message...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-2xl">
              {/* Corner Bolts for Contact Info Box */}
              {[
                'top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'
              ].map((position, i) => (
                <div key={i} className={`absolute ${position} w-4 h-4 bg-gray-600 rounded-full shadow-inner flex items-center justify-center z-20`}>
                  <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                </div>
              ))}
              
              {/* Vent Pattern Background */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-6 grid-rows-4 h-full gap-2 p-4">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="bg-white rounded opacity-30"></div>
                  ))}
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <i className="ri-customer-service-line mr-3 text-blue-400 w-6 h-6 flex items-center justify-center"></i>
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-400 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Office Location</h4>
                      <p className="text-gray-300">Sajjan mill, 457001, Ratlam, Madhya Pradesh</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-400 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Phone Numbers</h4>
                      <p className="text-gray-300">Main: +91 9630859889</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-400 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email Address</h4>
                      <p className="text-gray-300">irascoindia@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-400 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Business Hours</h4>
                      <p className="text-gray-300">Mon-Sat: 10:00 AM - 7:00 PM<br />Sunday: Emergency Only</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative bg-white rounded-xl p-6 shadow-lg text-center">
                {/* Corner Bolts for Emergency Service Box */}
                {[
                  'top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'
                ].map((position, i) => (
                  <div key={i} className={`absolute ${position} w-3 h-3 bg-gray-600 rounded-full shadow-inner flex items-center justify-center z-10`}>
                    <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                  </div>
                ))}
                <div className="absolute top-2 right-2 w-8 h-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded opacity-30">
                  <div className="flex justify-center items-center h-full space-x-0.5">
                    <div className="w-0.5 h-2 bg-gray-800 rounded-full"></div>
                    <div className="w-0.5 h-2 bg-gray-800 rounded-full"></div>
                    <div className="w-0.5 h-2 bg-gray-800 rounded-full"></div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Emergency Service</div>
              </div>
              
              <div className="relative bg-white rounded-xl p-6 shadow-lg text-center">
                {/* Corner Bolts for Free Consultation Box */}
                {[
                  'top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'
                ].map((position, i) => (
                  <div key={i} className={`absolute ${position} w-3 h-3 bg-gray-600 rounded-full shadow-inner flex items-center justify-center z-10`}>
                    <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                  </div>
                ))}
                <div className="absolute top-2 right-2 w-8 h-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded opacity-30">
                  <div className="flex justify-center items-center h-full space-x-0.5">
                    <div className="w-0.5 h-2 bg-gray-800 rounded-full"></div>
                    <div className="w-0.5 h-2 bg-gray-800 rounded-full"></div>
                    <div className="w-0.5 h-2 bg-gray-800 rounded-full"></div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">Free</div>
                <div className="text-sm text-gray-600">Consultation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
