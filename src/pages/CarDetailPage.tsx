import { useState } from 'react';
import axios from 'axios';
import { Calendar, DollarSign, Car, Fuel, Settings, Info,  Airplay, Bluetooth, Camera, Sun, Navigation } from 'lucide-react';
import Container from "../components/Container";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import heroImg1 from '../assets/background/13685.jpg';
import heroImg2 from '../assets/background/img2.jpg';
import heroImg3 from '../assets/background/img2.jpg';
import heroImg4 from '../assets/background/img1.jpg';

function CarDetailPage() {
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        notes: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState('');

    const car = {
        make: "Toyota",
        model: "Camry",
        year: 2021,
        price: "$20,000",
        mileage: "15,000 miles",
        color: "Blue",
        fuelType: "Petrol",
        transmission: "Automatic",
        description: "The Toyota Camry is a reliable and comfortable sedan offering a smooth ride and excellent fuel efficiency. Equipped with the latest technology and safety features, it is perfect for daily commutes and long drives.",
        features: [
            { name: "Air Conditioning", icon: Airplay },
            { name: "Leather Seats", icon: Settings },
            { name: "Bluetooth", icon: Bluetooth },
            { name: "Backup Camera", icon: Camera },
            { name: "Sunroof", icon: Sun },
            { name: "Navigation System", icon: Navigation }
        ]
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post('/api/bookings', formData);
            setSubmissionStatus('Booking submitted successfully!');
            setFormData({
                startDate: '',
                endDate: '',
                notes: ''
            });
        } catch (error) {
            setSubmissionStatus('Error submitting booking. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const currentDate = new Date().toISOString().split('T')[0];

    return (
        <Container className="bg-base-200 flex flex-col gap-6">
            <Navbar />
            <div className="container mx-auto py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <Carousel
                            showArrows={true}
                            autoPlay
                            interval={5000}
                            infiniteLoop
                            showThumbs={false}
                            showStatus={false}
                        >
                            <div>
                                <img src={heroImg1} alt="Car Image 1" />
                            </div>
                            <div>
                                <img src={heroImg2} alt="Car Image 2" />
                            </div>
                            <div>
                                <img src={heroImg3} alt="Car Image 3" />
                            </div>
                            <div>
                                <img src={heroImg4} alt="Car Image 4" />
                            </div>
                        </Carousel>
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-green-600 mb-4">{car.make} {car.model} ({car.year})</h1>
                        <p className="text-2xl text-white mb-4 flex items-center">
                            <DollarSign className="mr-2" /> {car.price}
                        </p>
                        <p className="text-xl text-gray-300 mb-6">{car.description}</p>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center">
                                <Car className="mr-2 text-green-600" /> <strong>Mileage:</strong> {car.mileage}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="mr-2 text-green-600" /> <strong>Year:</strong> {car.year}
                            </div>
                            <div className="flex items-center ">
                                <Settings className="mr-2 text-green-600" /> <strong>Transmission:</strong> {car.transmission}
                            </div>
                            <div className="flex items-center">
                                <Fuel className="mr-2 text-green-600" /> <strong>Fuel Type:</strong> {car.fuelType}
                            </div>
                            <div className="flex items-center">
                                <Info className="mr-2 text-green-600" /> <strong>Color:</strong> {car.color}
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-green-600 mb-4">Features</h2>
                        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 list-disc list-inside text-white mb-6">
                            {car.features.map((feature, index) => (
                                <li key={index} className="flex items-center">
                                    <feature.icon className="text-4xl text-green-600 mr-4" /> {feature.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-12">
                    <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">Book This Car</h2>
                    {submissionStatus && (
                        <div className={`text-center mb-6 ${submissionStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                            {submissionStatus}
                        </div>
                    )}
                    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" onSubmit={handleSubmit}>
                        <div className="col-span-1">
                            <label className="block text-white mb-2">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                className="input input-bordered w-full"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                                min={currentDate}
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-white mb-2">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                className="input input-bordered w-full"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                                min={formData.startDate || currentDate}
                            />
                        </div>
                        <div className="col-span-3">
                            <label className="block text-white mb-2">Additional Notes</label>
                            <textarea
                                name="notes"
                                className="textarea textarea-bordered w-full"
                                placeholder="Enter any additional notes"
                                value={formData.notes}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="col-span-3 flex justify-center">
                            <button
                                type="submit"
                                className={`btn btn-primary px-6 py-3 ${isSubmitting ? 'loading' : ''}`}
                                disabled={isSubmitting}
                            >
                                Submit Booking
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </Container>
    );
}

export default CarDetailPage;
