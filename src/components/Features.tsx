import { Phone, Calendar, Heart, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Phone,
    title: "24/7 Availability",
    description: "Never miss a call. Our AI receptionist is always ready to assist your clients.",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Seamless appointment booking and management integrated with your calendar.",
  },
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description: "Advanced AI that understands context and speaks naturally with your clients.",
  },
  {
    icon: Heart,
    title: "Industry Expertise",
    description: "Specialized in beauty, hair, and veterinary care terminology and protocols.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-purple-50 relative overflow-hidden" id="features">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 w-96 h-96 bg-purple-100 rounded-full blur-3xl" />
        <div className="absolute -left-40 bottom-20 w-96 h-96 bg-purple-100 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-4">
            Why Choose Glowline?
          </h2>
          <p className="text-purple-700 max-w-2xl mx-auto">
            Our AI receptionist is designed specifically for beauty, hair, and veterinary businesses,
            providing a seamless experience for both you and your clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl bg-white backdrop-blur-lg hover:-translate-y-1 transform"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <feature.icon className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-purple-700">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;