import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Collaboration from "../components/Collaboration";
import Services from "../components/Services";
import Pricing from "../components/Pricing";
import Roadmap from "../components/Roadmap";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <Hero />
      <Benefits />
      <Collaboration />
      <Services />
      <Pricing />
      <Roadmap />
      <Footer />
    </div>
  );
};

export default Home;
