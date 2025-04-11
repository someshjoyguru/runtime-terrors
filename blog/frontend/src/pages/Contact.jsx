import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaPhone, FaEnvelope, FaMapMarkerAlt, FaShareAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-400/90 to-orange-300/70 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 max-w-2xl mx-auto">
            We're here to help and answer any questions you might have
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-orange-500 mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Your Message</label>
                  <textarea 
                    rows="5"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaPhone className="text-3xl text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-orange-500 mb-2">Call Us</h3>
                <p className="text-gray-600">+91 1234567890</p>
                <p className="text-gray-600">+91 9876543210</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaEnvelope className="text-3xl text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-orange-500 mb-2">Email Us</h3>
                <p className="text-gray-600">support@ruralcare.com</p>
                <p className="text-gray-600">info@ruralcare.com</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaMapMarkerAlt className="text-3xl text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-orange-500 mb-2">Visit Us</h3>
                <p className="text-gray-600">123 Healthcare Avenue</p>
                <p className="text-gray-600">New Delhi, India 110001</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">Our Location</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3676.8940748447194!2d86.09989157476494!3d22.843408122991534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e5f1b496777f%3A0x1d506033b3ed835d!2sARKA%20JAIN%20University!5e0!3m2!1sen!2sin!4v1744385693168!5m2!1sen!2sin"
                width="100%"
                height="450"
                className="border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
                
export default Contact;