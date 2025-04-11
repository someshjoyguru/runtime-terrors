import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHeartbeat, 
  FaUserMd, 
  FaVideo, 
  FaAmbulance, 
  FaPills, 
  FaChevronDown, 
  FaStethoscope,
  FaShareAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#fffaf0]">

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-r from-[#ff870fe4] to-[#ff9e3cb3] text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 flex justify-center">
              <img 
                src="https://res.cloudinary.com/dpd65jisz/image/upload/v1744363206/doc_zn3wqj.jpg" 
                alt="Doctor providing virtual consultation"
                className="rounded-full border-8 border-white/20 shadow-lg hover:scale-[1.03] hover:border-white/40 transition-all duration-500"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">
                VIRTUAL <span className="block text-[3.5rem]">MEDICAL CARE</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-medium mb-5 opacity-90">
                Healthcare for Rural Communities
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-xl">
                Access quality healthcare services from anywhere in rural India. 
                Our platform connects patients with doctors, maintains digital health records, 
                and provides emergency support even with limited connectivity.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <button className="bg-white text-[#ff7f00] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-lg transition-all">
                  BOOK APPOINTMENT
                </button>
                <button className="border border-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-lg transition-all">
                  MORE INFO
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center cursor-pointer animate-bounce">
          <p className="text-sm opacity-80 mb-1">Scroll Down</p>
          <FaChevronDown />
        </div>

        <div className="absolute -bottom-8 right-[10%] w-15 h-15 bg-white rounded-full p-4 shadow-lg hover:scale-110 hover:rotate-6 transition-all">
          <FaStethoscope className="text-[#ff7f00] text-2xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#ff7f00] mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaUserMd, title: 'Digital Health Records', desc: 'Securely store and access your medical history, even offline.' },
              { icon: FaVideo, title: 'Telemedicine', desc: 'Connect with doctors remotely when travel is difficult.' },
              { icon: FaAmbulance, title: 'Emergency Support', desc: 'One-tap SOS with location sharing for emergencies.' },
              { icon: FaPills, title: 'Medication Tracking', desc: 'Reminders and local availability of prescribed medicines.' }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:-translate-y-2 transition-transform relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-0 bg-[#ff7f00] group-hover:h-full transition-all duration-300" />
                <feature.icon className="text-4xl text-[#ff7f00] mb-6 transition-transform group-hover:scale-110" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#ff7f00] text-white py-8 text-center">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4 mb-6">
            {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, index) => (
              <a 
                key={index}
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:-translate-y-1 transition-all"
              >
                <Icon />
              </a>
            ))}
          </div>
          <p>&copy; 2025 RuralCare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;