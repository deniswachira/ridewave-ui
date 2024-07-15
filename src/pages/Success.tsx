import Container from "../components/Container";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import AnimatedCheckmark from "../components/AnimateCheckMark";

const Success = () => {
    return (
        <Container className="bg-base-200 flex flex-col gap-6 h-screen">
            <Navbar />
            <div className="flex flex-col items-center justify-center flex-1 text-center">
                <AnimatedCheckmark />
                <h1 className="mt-6 text-4xl font-bold text-green-500">Payment Successful!</h1>
                <p className="mt-4 text-lg text-white">
                    Thank you for booking. Your booking will be confirmed soon.
                </p>
                <Link to="/dashboard/me/my-bookings" className="mt-6 btn btn-primary">
                    View Bookings
                </Link>
            </div>
            <Footer />
        </Container>
    );
};

export default Success;
