import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Car, Fuel, Settings, Info } from 'lucide-react';
import Container from "../components/Container";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import heroImg1 from '../assets/background/13685.jpg';
import heroImg2 from '../assets/background/img2.jpg';
import heroImg3 from '../assets/background/img2.jpg';
import heroImg4 from '../assets/background/img1.jpg';
import { carApi } from "../features/api/carApiSlice";
import {bookingApi} from "../features/api/bookingApiSlice";
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastContext';

type BookingFormValues = {
    booking_date: string;
    returning_date: string;
    location: string;
    notes: string;
};
type bookingData = {
    booking_date: string;
    returning_date: string;
    location: string;
    notes: string;
    vehicle_id: number;
    user_id: number;
    total_amount: number;
};

function CarDetailPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<BookingFormValues>();
    const [addBooking, { isLoading : addBookingIsLoading }] = bookingApi.useAddBookingMutation();
    const user_id = user?.user.user_id;
    const { showToast } = useToast();

    const [totalAmount, setTotalAmount] = useState(0);

    const vehicle_id = window.location.pathname.split('/')[2];
    const { data: car, isError:isCarFetch, isLoading } = carApi.useFetchCarByIdWithSpecsQuery(vehicle_id);

    useEffect(() => {
        const bookingDate = new Date(watch('booking_date'));
        const returningDate = new Date(watch('returning_date'));
        const rentalRate = car?.vehicleTable.rental_rate || 0;

        if (bookingDate && returningDate && !isNaN(bookingDate.getTime()) && !isNaN(returningDate.getTime())) {
            let diffDays = Math.ceil((returningDate.getTime() - bookingDate.getTime()) / (1000 * 60 * 60 * 24));
            diffDays = diffDays === 0 ? 1 : diffDays; // count as 1 day if the dates are the same
            setTotalAmount(diffDays * rentalRate);
        } else {
            setTotalAmount(0);
        }
    }, [watch('booking_date'), watch('returning_date'), car]);

    if (isLoading) return <div className="flex-grow flex justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
    </div>;

    if (!car) return <div className="flex-grow flex justify-center items-center bottom-0.5">
        <p>No Vehicle Details available 😒</p>
    </div>;

    const onSubmit = async (data: BookingFormValues) => {
        const vehicleIdNumber = parseInt(vehicle_id, 10);
        // Spread the data object
        const bookingData = {
            ...data,
            vehicle_id: vehicleIdNumber ,
            user_id: user_id,
            total_amount: totalAmount,
        };

        if (!isAuthenticated) {
            alert('Please login to book this car');
            navigate('/login');
            return;
        }
        if (vehicleTable.availability === 'Not available') {
            alert('Sorry, this car is not available for booking');
            return;
        }

        try {
            await addBooking(bookingData).unwrap();
            showToast('Booking added successful!  proceeding  to Checkout page.', "success");
            navigate('/dashboard/me');
           
        } catch (err: any) {
            showToast('Failed to Book: ' + (err.data?.msg || err.msg || err.error || err), 'error');
        }
    };


    const currentDate = new Date().toISOString().split('T')[0];
    const { vehicleSpecificationTable, vehicleTable } = car;

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
                        <h1 className="text-4xl font-bold text-green-600 mb-4">{vehicleSpecificationTable.vehicle_name} {car.model} ({vehicleSpecificationTable.vehicle_model})</h1>
                        <p className="text-2xl text-white mb-4 flex items-center">
                            Ksh: {vehicleTable.rental_rate}/day
                            <div className="flex flex-col items-center ml-3">
                                <span className={`badge ${vehicleTable.availability === 'Available' ? 'badge-success' : 'badge-error'}`}>
                                    {vehicleTable.availability}
                                </span>
                            </div>
                        </p>

                        <p className="text-xl text-gray-300 mb-6">{vehicleSpecificationTable.vehicle_description}</p>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center">
                                <Car className="mr-2 text-green-600" /> <strong>Capacity: </strong> {vehicleSpecificationTable.seating_capacity}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="mr-2 text-green-600" /> <strong>Year:</strong> {vehicleSpecificationTable.vehicle_year}
                            </div>
                            <div className="flex items-center ">
                                <Settings className="mr-2 text-green-600" /> <strong>Transmission:</strong> {vehicleSpecificationTable.engine_type}
                            </div>
                            <div className="flex items-center">
                                <Fuel className="mr-2 text-green-600" /> <strong>Fuel Type:</strong> {vehicleSpecificationTable.fuel_type}
                            </div>
                            <div className="flex items-center">
                                <Info className="mr-2 text-green-600" /> <strong>Color:</strong> {vehicleSpecificationTable.color}
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-green-600 mb-4">Additional Features</h2>
                        {vehicleSpecificationTable.features}
                    </div>
                </div>
                <div className="mt-12">
                    <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">Book This Car</h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-span-1">
                            <label className="block text-white mb-2">Start Date</label>
                            <input
                                type="date"
                                {...register('booking_date', { required: 'Start Date is required' })}
                                className="input input-bordered w-full"
                                min={currentDate}
                            />
                            {errors.booking_date && <span className="text-red-500">{errors.booking_date.message}</span>}
                        </div>
                        <div className="col-span-1">
                            <label className="block text-white mb-2">End Date</label>
                            <input
                                type="date"
                                {...register('returning_date', { required: 'End Date is required' })}
                                className="input input-bordered w-full"
                                min={currentDate}
                            />
                            {errors.returning_date && <span className="text-red-500">{errors.returning_date.message}</span>}
                        </div>
                        <div className="col-span-1">
                            <label className="block text-white mb-2">Location</label>
                            <select
                                {...register('location', { required: 'Location is required' })}
                                className="input input-bordered w-full"
                            >
                                <option value="">Select a location</option>
                                <option value="Nairobi">Nairobi</option>
                                <option value="Mombasa">Mombasa</option>
                                <option value="Kisumu">Kisumu</option>
                                <option value="Nakuru">Nakuru</option>
                            </select>
                            {errors.location && <span className="text-red-500">{errors.location.message}</span>}
                        </div>
                        <div className="col-span-3">
                            <label className="block text-white mb-2">Additional Notes</label>
                            <textarea
                                {...register('notes')}
                                className="textarea textarea-bordered w-full"
                                placeholder="Enter any additional notes"
                            ></textarea>
                        </div>
                        <div className="col-span-3">
                            <label className="block text-white mb-2">Total Amount</label>
                            <input
                                type="text"
                                value={`Ksh: ${totalAmount}`}
                                className="input input-bordered w-full"
                                readOnly
                            />
                        </div>
                        <div className="col-span-3 flex justify-center">
                            <button type="submit" className="btn bg-green-400 text-white py-3 pb-10 px-10 rounded-lg text-lg transform transition-transform duration-300 hover:scale-105 hover:bg-green-600">
                                {addBookingIsLoading ? <span className="loading loading-spinner text-info"></span> : 'Submit Booking'}
                            </button>
                        </div>
                        {/* <div className="col-span-3 flex justify-center">
                            <button
                                type="submit"
                                className={`btn btn-warning px-6 py-3 ${addBookingIsLoading ? 'loading' : 'Submit Booking'}`}
                                
                            >
                                
                            </button>
                        </div> */}
                    </form>
                </div>
            </div>
            <Footer />
        </Container>
    );
}

export default CarDetailPage;
