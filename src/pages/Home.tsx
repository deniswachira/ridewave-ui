import Companies from "../components/Companies"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import Container from "../components/Container"
import Footer from "../components/Footer"
import CarCardsSection from "../components/CarCardsSection"
import AboutUs from "../components/AboutUs"

const Home = () => {

  const cars = [
    {
      id: 1,
      make: 'BMW',
      model: 'X5',
      year: 2023,
      image: 'https://via.placeholder.com/300x200',
      description: 'Luxury SUV with advanced features.',
      price: 850
    },
    {
      id: 2,
      make: 'Tesla',
      model: 'Model S',
      year: 2022,
      image: 'https://via.placeholder.com/300x200',
      description: 'Electric sedan with cutting-edge technology.',
      price: 1000
    },
    {
      id: 3,
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      image: 'https://via.placeholder.com/300x200',
      description: 'Reliable midsize sedan with excellent fuel efficiency.',
      price: 600
    },
    {
      id: 4,
      make: 'Honda',
      model: 'CR-V',
      year: 2023,
      image: 'https://via.placeholder.com/300x200',
      description: 'Popular compact SUV known for its versatility.',
      price: 700
    },
    {
      id: 5,
      make: 'Honda',
      model: 'CR-V',
      year: 2023,
      image: 'https://via.placeholder.com/300x200',
      description: 'Popular compact SUV known for its versatility.',
      price: 700
    },
    {
      id: 6,
      make: 'Honda',
      model: 'CR-V',
      year: 2023,
      image: 'https://via.placeholder.com/300x200',
      description: 'Popular compact SUV known for its versatility.',
      price: 700
    },
    {
      id: 7,
      make: 'Honda',
      model: 'CR-V',
      year: 2023,
      image: 'https://via.placeholder.com/300x200',
      description: 'Popular compact SUV known for its versatility.',
      price: 700
    }

  ];
  return (
    <div>
      <Container className="bg-base-200 flex flex-col gap-6">
        <Navbar />
        <Hero />
        <CarCardsSection cars={cars}/>
        <Companies />
        <AboutUs />
        <Footer />
      </Container>
    </div>
  )
}

export default Home