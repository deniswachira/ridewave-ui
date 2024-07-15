import { useEffect, useState } from "react";
import Companies from "../components/Companies";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import Footer from "../components/Footer";
import CarCardsSection from "../components/CarCardsSection";
import AboutUs from "../components/AboutUs";
import { carApi } from "../features/api/carApiSlice";
import { Car } from "../types/Types";
import AnimatedLoader from "../components/AnimatedLoader";

const Home = () => { 
  const page = 1; 
  const { data: cars = [], isLoading, isError } = carApi.useFetchCarsWithSpecsQuery(page,{
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000
  });
  const [displayedCars, setDisplayedCars] = useState<Car[]>([]);

  useEffect(() => {
    if (cars.length > 0) {
      const shuffledCars = [...cars].sort(() => 0.5 - Math.random()).slice(0, 8);
      setDisplayedCars(shuffledCars);
    }
  }, [cars]);

  return (
    <div>
      <Container className="bg-base-200 flex flex-col gap-6">
        <Navbar />
        <Hero />
        <div className="flex-grow flex justify-center items-center">
          {isLoading && <AnimatedLoader />}
          {!isLoading && isError && <p>Error: {isError.toString()}</p>}
          {!isLoading && !isError && cars.length === 0 && <p>No cars available 😒</p>}
        </div>
        {!isLoading && !isError && cars.length > 0 && <CarCardsSection cars={displayedCars} />}
        <Companies />
        <AboutUs />
        <Footer />
      </Container>
    </div>
  );
};

export default Home;
