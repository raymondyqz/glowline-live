import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* About Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold text-purple-500 mb-6">About glowline</h1>
              <p className="text-gray-600 mb-6">
                glowline is revolutionizing how beauty and wellness businesses handle their customer communications. Our AI-powered receptionist service ensures that your business never misses a call, while maintaining the personal touch that your clients expect.
              </p>
              <p className="text-gray-600 mb-6">
                Founded by industry experts and AI specialists, we understand the unique challenges faced by beauty and wellness businesses. Our solution is tailored specifically for salons, spas, and wellness centers, combining cutting-edge technology with industry-specific knowledge.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-purple-500 mb-6">Our Team</h2>
              <p className="text-gray-600 mb-12 text-center">
                Close UG friends from the University of Oxford with a working relationship over 2+ years.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* Isabel Card */}
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
                        <img 
                          src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                          alt="Isabel Greenslade" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-purple-500 mb-2">Isabel Greenslade</h3>
                      <p className="text-gray-600 text-center mb-2">University of Oxford, Economics & Management</p>
                      <p className="text-sm text-gray-500 text-center mb-2">
                        1st class graduate with Gibbs Prize & Saïd Foundation Prize
                      </p>
                      <p className="text-sm text-gray-500 text-center">
                        IB at Greenhill & early-stage VC at Future Planet Capital
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Raymond Card */}
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                          alt="Raymond Zhao" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-purple-500 mb-2">Raymond Zhao</h3>
                      <p className="text-gray-600 text-center mb-2">Mathematics & Statistics</p>
                      <p className="text-sm text-gray-500 text-center mb-2">
                        Final-year undergraduate with integrated masters
                      </p>
                      <p className="text-sm text-gray-500 text-center">
                        Built ML / Automation tools at Goldman Sachs & startups
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Partner Logos */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70">
                <img src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" alt="Oxford Seed Fund" className="h-12 object-contain" />
                <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" alt="Greenhill" className="h-12 object-contain" />
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475" alt="Future Planet Capital" className="h-12 object-contain" />
                <img src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" alt="University of Oxford" className="h-12 object-contain" />
                <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" alt="Goldman Sachs" className="h-12 object-contain" />
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475" alt="London Stock Exchange" className="h-12 object-contain" />
                <img src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" alt="bondIT" className="h-12 object-contain" />
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