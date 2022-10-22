import React from "react";
import ScrollTop from "../../Shared/ScrollTop/ScrollTop";
import About from "../About/About";
import BuildTools from "../BuildTools/BuildTools";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import HappyClient from "../HappyClient/HappyClient";
import Header from "../Header/Header";
import Reviews from "../Reviews/Reviews";
import Services from "../Services/Services";

const Home = () => {
  return (
    <main>
      <Header />
      <BuildTools />
      <About />
      <HappyClient />
      <Services />
      <Reviews />
      <Contact />
      <Footer />
      <ScrollTop />
    </main>
  );
};

export default Home;
