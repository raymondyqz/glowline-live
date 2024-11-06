import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold text-glowline-navy mb-6">Privacy Notice</h1>
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

export default Privacy;