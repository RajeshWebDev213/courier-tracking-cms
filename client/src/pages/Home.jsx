import Hero from "../components/home/hero";
import Services from "../components/home/Services";
import HowItWorks from "../components/home/HowItWorks";
import WhyChooseUs from "../components/home/WhyChooseUs";
import CTA from "../components/home/CTA";
import Footer from "../components/common/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks/>
      <WhyChooseUs/>
      <CTA/>
      <Footer/>
    </>
  );
};

export default Home;