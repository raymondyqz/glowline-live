import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* About Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold text-glowline-navy mb-6">About Glowline</h1>
              <p className="text-gray-600 mb-6">
                Glowline is revolutionizing how beauty and wellness businesses handle their customer communications. Our AI-powered receptionist service ensures that your business never misses a call, while maintaining the personal touch that your clients expect.
              </p>
              <p className="text-gray-600 mb-6">
                Founded by industry experts and AI specialists, we understand the unique challenges faced by beauty and wellness businesses. Our solution is tailored specifically for salons, spas, and wellness centers, combining cutting-edge technology with industry-specific knowledge.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-glowline-rose/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-glowline-navy mb-6">Our Team</h2>
              <p className="text-gray-600 mb-12">
                We're a dedicated team of professionals committed to transforming customer service in the beauty and wellness industry.
              </p>
              
              {/* Add team members here when ready */}
              <div className="text-center text-gray-600">
                Team members information coming soon.
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Notice */}
        <section className="py-20 bg-white" id="privacy">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-glowline-navy mb-6">Privacy Notice</h2>
              <div className="prose prose-lg">
                <p className="text-gray-600 mb-4">
                  At Glowline, we take your privacy seriously. This privacy notice explains how we collect, use, and protect your personal information.
                </p>
                
                <h3 className="text-xl font-semibold text-glowline-navy mt-6 mb-3">
                  Information We Collect
                </h3>
                <p className="text-gray-600 mb-4">
                  We collect information that you provide directly to us, including contact details and communication preferences. Our AI system also processes call data to provide our services.
                </p>

                <h3 className="text-xl font-semibold text-glowline-navy mt-6 mb-3">
                  How We Use Your Information
                </h3>
                <p className="text-gray-600 mb-4">
                  We use your information to provide and improve our AI receptionist services, communicate with you about our services, and comply with legal obligations.
                </p>

                <h3 className="text-xl font-semibold text-glowline-navy mt-6 mb-3">
                  Data Security
                </h3>
                <p className="text-gray-600 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access or disclosure.
                </p>

                <h3 className="text-xl font-semibold text-glowline-navy mt-6 mb-3">
                  Your Rights
                </h3>
                <p className="text-gray-600 mb-4">
                  You have the right to access, correct, or delete your personal information. Contact us at info@glowline.io for any privacy-related queries.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;