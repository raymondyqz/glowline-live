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
      </main>

      <Footer />
    </div>
  );
};

export default About;
