import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { Features } from "./components/Features";
import { VideoSection } from "./components/VideoSection";
import { Stories } from "./components/Stories";
import { Artisans } from "./components/Artisans";
import { Testimonial } from "./components/Testimonial";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { ChatWidget } from "./components/chat/ChatWidget";

function App() {
  return (
    <main className="w-full min-h-screen bg-background-light dark:bg-background-dark font-display">
      <Navbar />
      <Hero />
      <Intro />
      <Features />
      <VideoSection />
      <Stories />
      <Artisans />
      <Testimonial />
      <CTA />
      <Footer />
      <ChatWidget />
    </main>
  );
}

export default App;
