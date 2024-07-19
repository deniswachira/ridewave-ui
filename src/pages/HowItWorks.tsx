import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Lottie from "react-lottie";
import { FaCar, FaCheckCircle, FaKey, FaRegCreditCard, FaSearch, FaSmile, FaUndoAlt } from "react-icons/fa";

import animationData1 from "../utils/search.json";
import animationData2 from "../utils/choose.json";
import animationData3 from "../utils/book.json";
import animationData4 from "../utils/search.json";
import animationData5 from "../utils/search.json";
import animationData6 from "../utils/search.json";
import animationData7 from "../utils/search.json";

const defaultOptions = (animationData:any) => ({
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
});

function HowItWorks() {
    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow py-12 px-4">
                <h1 className="text-4xl text-center font-bold mb-8">How It Works</h1>
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row items-center md:space-x-8">
                        <div className="w-full md:w-1/2 mb-4 md:mb-0 rounded-lg ">
                            <Lottie options={defaultOptions(animationData1)} height={300} width={300} />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-2xl text-green-600 font-bold mb-4 flex items-center">
                                <FaSearch className="mr-2" /> Step 1: Browse Our Selection
                            </h2>
                            <p>
                                Start by browsing our extensive selection of vehicles. Whether you're looking for a compact car, a luxury sedan, an SUV, or a van, we have a wide range of options to suit your needs.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row-reverse items-center md:space-x-8 md:space-x-reverse">
                        <div className="w-full md:w-1/2 mb-4 md:mb-0  ">
                            <Lottie options={defaultOptions(animationData2)}  />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-2xl text-green-600 font-bold mb-4 flex items-center">
                                <FaCar className="mr-2" /> Step 2: Choose Your Car
                            </h2>
                            <p>
                                Once you've found a vehicle that fits your needs, click on it to view more details, including specifications, features, and pricing. Make sure to select any additional options or insurance coverage you may need.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:space-x-8">
                        <div className="w-full md:w-1/2 mb-4 md:mb-0 rounded-lg shadow-lg">
                            <Lottie options={defaultOptions(animationData3)}  />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-2xl text-green-600 font-bold mb-4 flex items-center">
                                <FaRegCreditCard className="mr-2" /> Step 3: Book Your Car
                            </h2>
                            <p>
                                After selecting your vehicle, proceed to book it by providing your personal details and payment information. Our secure booking system ensures that your information is protected.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row-reverse items-center md:space-x-8 md:space-x-reverse">
                        <div className="w-full md:w-1/2 mb-4 md:mb-0 rounded-lg ">
                            <Lottie options={defaultOptions(animationData4)} height={300} width={300} />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-2xl text-green-600 font-bold mb-4 flex items-center">
                                <FaCheckCircle className="mr-2" /> Step 4: Confirmation
                            </h2>
                            <p>
                                Once your booking is complete, you will receive a confirmation email with all the details of your rental. Keep this email for your records.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:space-x-8">
                        <div className="w-full md:w-1/2 mb-4 md:mb-0 rounded-lg ">
                            <Lottie options={defaultOptions(animationData5)} height={300} width={300} />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-2xl text-green-600 font-bold mb-4 flex items-center">
                                <FaKey className="mr-2" /> Step 5: Pick Up Your Car
                            </h2>
                            <p>
                                On the day of your rental, visit our location to pick up your car. Make sure to bring your confirmation email, driver's license, and any other required documents. Our staff will assist you with the pickup process and provide you with the keys.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row-reverse items-center md:space-x-8 md:space-x-reverse">
                        <div className="w-full md:w-1/2 mb-4 md:mb-0 rounded-lg ">
                            <Lottie options={defaultOptions(animationData6)} height={300} width={300} />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-2xl text-green-600 font-bold mb-4 flex items-center">
                                <FaSmile className="mr-2" /> Step 6: Enjoy Your Ride
                            </h2>
                            <p>
                                Enjoy your rental car for the duration of your booking. If you have any questions or need assistance during your rental period, our customer support team is available to help.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:space-x-8">
                        <div className="w-full md:w-1/2 mb-4 md:mb-0 rounded-lg ">
                            <Lottie options={defaultOptions(animationData7)} height={300} width={300} />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-2xl text-green-600 font-bold mb-4 flex items-center">
                                <FaUndoAlt className="mr-2" /> Step 7: Return the Car
                            </h2>
                            <p>
                                At the end of your rental period, return the car to our location. Our staff will inspect the vehicle and finalize the rental process. If everything is in order, you'll be on your way in no time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HowItWorks;
