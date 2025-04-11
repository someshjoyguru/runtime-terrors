import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHeartbeat, 
  FaStethoscope, 
  FaAmbulance, 
  FaUserMd, 
  FaHospital, 
  FaNotesMedical,
  FaShareAlt 
} from 'react-icons/fa';

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-400/90 to-orange-300/70 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 max-w-2xl mx-auto">
            Comprehensive healthcare solutions for rural communities
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Telemedicine Service */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:-translate-y-2 transition-transform">
              <FaStethoscope className="text-4xl text-orange-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Telemedicine</h2>
              <p className="text-gray-600 mb-6">
                Connect with healthcare professionals remotely through video consultations 
                and get expert medical advice from the comfort of your home.
              </p>
              <Link 
                to="/contact"
                className="text-orange-500 font-semibold hover:text-orange-600"
              >
                Learn More →
              </Link>
            </div>

            {/* Emergency Services */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:-translate-y-2 transition-transform">
              <FaAmbulance className="text-4xl text-orange-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Emergency Care</h2>
              <p className="text-gray-600 mb-6">
                24/7 emergency response services with rapid ambulance dispatch and 
                immediate medical attention for critical situations.
              </p>
              <Link 
                to="/contact"
                className="text-orange-500 font-semibold hover:text-orange-600"
              >
                Learn More →
              </Link>
            </div>

            {/* Specialist Consultations */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:-translate-y-2 transition-transform">
              <FaUserMd className="text-4xl text-orange-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Specialist Consults</h2>
              <p className="text-gray-600 mb-6">
                Access to specialized medical professionals across various fields for 
                expert opinions and treatment plans.
              </p>
              <Link 
                to="/contact"
                className="text-orange-500 font-semibold hover:text-orange-600"
              >
                Learn More →
              </Link>
            </div>

            {/* Diagnostic Services */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:-translate-y-2 transition-transform">
              <FaHospital className="text-4xl text-orange-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Diagnostics</h2>
              <p className="text-gray-600 mb-6">
                Comprehensive diagnostic services including laboratory tests, imaging, 
                and health screenings at partner facilities.
              </p>
              <Link 
                to="/contact"
                className="text-orange-500 font-semibold hover:text-orange-600"
              >
                Learn More →
              </Link>
            </div>

            {/* Health Records */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:-translate-y-2 transition-transform">
              <FaNotesMedical className="text-4xl text-orange-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Health Records</h2>
              <p className="text-gray-600 mb-6">
                Digital health record management system for easy access to medical 
                history and test results.
              </p>
              <Link 
                to="/contact"
                className="text-orange-500 font-semibold hover:text-orange-600"
              >
                Learn More →
              </Link>
            </div>

            {/* Preventive Care */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:-translate-y-2 transition-transform">
              <FaHeartbeat className="text-4xl text-orange-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Preventive Care</h2>
              <p className="text-gray-600 mb-6">
                Regular health check-ups, vaccinations, and wellness programs to 
                maintain good health and prevent diseases.
              </p>
              <Link 
                to="/contact"
                className="text-orange-500 font-semibold hover:text-orange-600"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;