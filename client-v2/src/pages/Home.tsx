import { FC } from "react";
import Navbar from "../components/NavBar";
import HomeComponent from "../components/HomeComponent";
import About from "../components/About";
import Dishes from "../components/Dishes";
import Review from "../components/Review";
import Footer from "../components/Footer";

const Home: FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <section id="home">
          <HomeComponent />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="dishes">
          <Dishes />
        </section>
        <section id="review">
          <Review />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;