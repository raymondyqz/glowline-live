import Hero from "../components/Hero";
import Features from "../components/Features";
import MediaDemo from "../components/MediaDemo";
import ContactForm from "../components/ContactForm";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <MediaDemo />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;