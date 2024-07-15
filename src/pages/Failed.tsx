import Container from "../components/Container";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AnimatedCross from "../components/AnimatedCross";
import { Link } from "react-router-dom";

const Failed = () => {
  return (
    <Container className="bg-base-200 flex flex-col gap-6 h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 text-center">
        <AnimatedCross />
        <h1 className="mt-6 text-4xl font-bold text-red-500">Payment Failed!</h1>
        <p className="mt-4 text-lg text-white">
          Unfortunately, your payment was not successful. Please try again.
        </p>
        <Link to="/dashboard/me/my-bookings" className="mt-6 btn btn-primary">
          View Bookings
        </Link>
      </div>
      <Footer />
    </Container>
  );
};

export default Failed;
