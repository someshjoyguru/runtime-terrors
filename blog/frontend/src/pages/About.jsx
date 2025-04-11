import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaHistory, FaBullseye, FaUsers, FaShareAlt } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-400/90 to-orange-300/70 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            About RURALCARE
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 max-w-2xl mx-auto">
            Bridging the healthcare gap in rural India through technology
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Story Card */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:-translate-y-2 transition-transform relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-0 bg-orange-500 transition-height duration-300 group-hover:h-full" />
              <FaHistory className="text-4xl text-orange-500 mb-4" />
              <h2 className="text-2xl font-bold text-orange-500 mb-3">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                Founded in 2025, RURALCARE emerged from a vision to transform rural healthcare access. 
                We recognized the challenges faced by remote communities and developed a solution that 
                brings quality healthcare to their doorstep.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:-translate-y-2 transition-transform relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-0 bg-orange-500 transition-height duration-300 group-hover:h-full" />
              <FaBullseye className="text-4xl text-orange-500 mb-4" />
              <h2 className="text-2xl font-bold text-orange-500 mb-3">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To provide accessible, affordable, and quality healthcare services to every individual 
                in rural India through innovative technology solutions and a network of dedicated 
                healthcare professionals.
              </p>
            </div>

            {/* Team Card */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:-translate-y-2 transition-transform relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-0 bg-orange-500 transition-height duration-300 group-hover:h-full" />
              <FaUsers className="text-4xl text-orange-500 mb-4" />
              <h2 className="text-2xl font-bold text-orange-500 mb-3">Our Team</h2>
              <p className="text-gray-600 leading-relaxed">
                We are a dedicated team of healthcare professionals, technologists, and support staff 
                working together to make healthcare accessible to all, regardless of location or 
                connectivity challenges.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;