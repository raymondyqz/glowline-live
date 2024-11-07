import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-purple-50 min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/80 to-transparent" />
      {/* Modern geometric shapes in the background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 -top-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute -left-10 top-1/2 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto pt-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-purple-800 mb-6 animate-fadeIn">
            Your 24/7 AI Receptionist
          </h1>
          <p className="text-xl text-purple-700 mb-8 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            Never miss a booking. Let our AI handle your calls while you focus on what matters most - your clients.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
            <a
              href="#contact"
              className="group bg-purple-600 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-700 transition-all flex items-center justify-center hover:scale-105 transform"
            >
              Get Started
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            <a
              href="#demo"
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-medium border-2 border-purple-600 hover:bg-purple-50 transition-all hover:scale-105 transform"
            >
              Listen to Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;