import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";

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
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Isabel Card */}
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <div className="w-48 h-48 mb-4">
                        <Avatar className="w-48 h-48">
                          <AvatarImage 
                            src={`${supabase.storage.from('profile-images').getPublicUrl('isabel-profile.jpg').data.publicUrl}`}
                            alt="Isabel Greenslade"
                            className="object-cover"
                          />
                          <AvatarFallback className="text-4xl">IG</AvatarFallback>
                        </Avatar>
                      </div>
                      <h3 className="text-xl font-bold text-purple-500 mb-2">Isabel Greenslade</h3>
                      <p className="text-gray-600 text-center mb-2">University of Oxford, Economics & Management</p>
                      <p className="text-sm text-gray-500 text-center mb-4">
                        IB at Greenhill & early-stage VC at Future Planet Capital
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => window.open('https://www.linkedin.com/in/isabel-greenslade/', '_blank')}
                        className="hover:bg-purple-100"
                      >
                        <Linkedin className="w-5 h-5 text-purple-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Raymond Card */}
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <div className="w-48 h-48 mb-4">
                        <Avatar className="w-48 h-48">
                          <AvatarImage 
                            src={`${supabase.storage.from('profile-images').getPublicUrl('raymond-profile.jpg').data.publicUrl}`}
                            alt="Raymond Zhao"
                            className="object-cover"
                          />
                          <AvatarFallback className="text-4xl">RZ</AvatarFallback>
                        </Avatar>
                      </div>
                      <h3 className="text-xl font-bold text-purple-500 mb-2">Raymond Zhao</h3>
                      <p className="text-gray-600 text-center mb-2">University of Oxford, Mathematics & Statistics</p>
                      <p className="text-sm text-gray-500 text-center mb-4">
                        Built ML / Automation tools at Goldman Sachs & startups
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => window.open('https://www.linkedin.com/in/raymond-zhao-oxford/', '_blank')}
                        className="hover:bg-purple-100"
                      >
                        <Linkedin className="w-5 h-5 text-purple-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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