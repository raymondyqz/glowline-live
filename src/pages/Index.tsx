import Hero from "../components/Hero";
import Features from "../components/Features";
import AudioDemo from "../components/AudioDemo";
import VideoDemo from "../components/VideoDemo";
import ContactForm from "../components/ContactForm";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <AudioDemo />
      <VideoDemo />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;