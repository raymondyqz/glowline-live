import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-white min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto pt-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-purple-900 mb-6 animate-fadeIn">
            Your 24/7 AI Receptionist
          </h1>
          <p className="text-xl text-purple-600 mb-8 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            Never miss a booking. Let our AI handle your calls while you focus on what matters most - your clients.
          </p>
          <div className="flex justify-center space-x-4 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
            <Link
              to="#contact"
              className="bg-purple-600 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-700 transition-all flex items-center group"
            >
              Get Started
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              to="#demo"
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-medium border border-purple-600 hover:bg-purple-600 hover:text-white transition-all"
            >
              Listen to Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;