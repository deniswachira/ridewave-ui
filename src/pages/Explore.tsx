import { useState, useEffect } from 'react';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { carApi } from "../features/api/carApiSlice";
import { Car } from '../types/Types';
import image from '../assets/background/13685.jpg';
import { Fuel, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedLoader from '../components/AnimatedLoader';

type FilterOption = '' | number | string;

function Explore() {
    const { data: cars = [], isLoading, isError } = carApi.useFetchCarsWithSpecsQuery( {
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000,
    });

    const [selectedYear, setSelectedYear] = useState<FilterOption>('');
    const [selectedCapacity, setSelectedCapacity] = useState<FilterOption>('');
    const [selectedFuelType, setSelectedFuelType] = useState<FilterOption>('');
    const [filteredCars, setFilteredCars] = useState<Car[]>([]);

    // Update filtered cars whenever cars data changes or filters change
    useEffect(() => {
        filterCars();
    }, [cars, selectedYear, selectedCapacity, selectedFuelType]);

    const filterCars = () => {
        const filtered = cars.filter((car: Car) => {
            return (
                (selectedYear === '' || car.vehicleSpec.vehicle_year === selectedYear) &&
                (selectedCapacity === '' || car.vehicleSpec.seating_capacity === selectedCapacity) &&
                (selectedFuelType === '' || car.vehicleSpec.fuel_type === selectedFuelType)
            );
        });
        setFilteredCars(filtered);
    };

    const handleYearChange = (year: FilterOption) => {
        setSelectedYear(year);
    };

    const handleCapacityChange = (capacity: FilterOption) => {
        setSelectedCapacity(capacity === '' ? '' : parseInt(capacity as string, 10));
    };

    const handleFuelTypeChange = (fuelType: FilterOption) => {
        setSelectedFuelType(fuelType);
    };

    return (
        <Container className="bg-gray-900 text-white flex flex-col gap-6 min-h-screen">
            <Navbar />
            <div className="container mx-auto items-center min-h-screen justify-center">
                {/* Filter dropdowns and buttons */}
                <div className="flex justify-center mt-4 space-x-4">
                    {/* Year filter dropdown */}
                    <div className="dropdown">
                        <label htmlFor="yearDropdown" className="block text-gray-400">Year:</label>
                        <select
                            id="yearDropdown"
                            className="select select-bordered w-48"
                            value={selectedYear as string}
                            onChange={(e) => handleYearChange(e.target.value as FilterOption)}
                        >
                            <option value="">All</option>
                            {/* Populate options based on available years */}
                            {Array.from(new Set(cars.map((car: Car) => car.vehicleSpec.vehicle_year))).map(year => (
                                <option key={year as string} value={year as string}>{year as string}</option>
                            ))}
                        </select>
                    </div>
                    {/* Capacity filter dropdown */}
                    <div className="dropdown">
                        <label htmlFor="capacityDropdown" className="block text-gray-400">Capacity:</label>
                        <select
                            id="capacityDropdown"
                            className="select select-bordered w-48"
                            value={selectedCapacity as string}
                            onChange={(e) => handleCapacityChange(e.target.value as FilterOption)}
                        >
                            <option value="">All</option>
                            {/* Populate options based on available capacities */}
                            {Array.from(new Set(cars.map((car: { vehicleSpec: { seating_capacity: number; }; }) => car.vehicleSpec.seating_capacity))).map(capacity => (
                                <option key={capacity as number} value={capacity as number}>{capacity as number}</option>
                            ))}
                        </select>
                    </div>
                    {/* Fuel type filter dropdown */}
                    <div className="dropdown">
                        <label htmlFor="fuelTypeDropdown" className="block text-gray-400">Fuel Type:</label>
                        <select
                            id="fuelTypeDropdown"
                            className="select select-bordered w-48"
                            value={selectedFuelType as string}
                            onChange={(e) => handleFuelTypeChange(e.target.value as FilterOption)}
                        >
                            <option value="">All</option>
                            {/* Populate options based on available fuel types */}
                            {Array.from(new Set(cars.map((car: Car) => car.vehicleSpec.fuel_type))).map(fuelType => (
                                <option key={fuelType as string} value={fuelType as string}>{fuelType as string}</option>
                            ))}
                        </select>
                    </div>
                    {/* Reset filters button */}
                    <button
                        className="btn btn-outline btn-sm"
                        onClick={() => {
                            setSelectedYear('');
                            setSelectedCapacity('');
                            setSelectedFuelType('');
                        }}
                    >
                        Reset Filters
                    </button>
                </div>
                {/* Display filtered cars */}
                <div className="flex flex-col items-center mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full px-4">
                        {/* Loading state */}
                        {isLoading && (
                            <div className="flex justify-center items-center">
                                <AnimatedLoader />
                            </div>
                        )}
                        {/* Error state */}
                        {isError && (
                            <div className="flex-grow flex justify-center items-center">
                                <p>Error: {isError.toString()}</p>
                            </div>
                        )}
                        {/* No cars available state */}
                        {!isLoading && !isError && filteredCars.length === 0 && (
                            <div className="flex-grow flex justify-center items-center">
                                <p>No cars available</p>
                            </div>
                        )}
                        {/* Render filtered cars with creative animation */}
                        {!isLoading && !isError && filteredCars.map((car: Car, index) => (
                            <div
                                key={car.vehicle_id}
                                className="rounded-lg overflow-hidden shadow-md bg-gray-800 text-white transform hover:scale-105"
                                style={{
                                    animation: `fadein 0.5s ${index * 0.1}s both, slideup 0.5s ${index * 0.1}s both`
                                }}
                            >
                                <img src={image} alt={`${car.vehicleSpec.vehicle_name} ${car.vehicleSpec.vehicle_model}`} className="w-full h-40 object-cover" />
                                <div className="p-4">
                                    <h2 className="text-xl font-bold mb-2">{car.vehicleSpec.vehicle_name} {car.vehicleSpec.vehicle_model}</h2>
                                    {/* <p className="text-gray-400 mb-4">{car.vehicleSpec.vehicle_description}</p> */}
                                    <div className="flex justify-between mb-2">
                                        <div className="flex flex-col items-center">
                                            <Users className="w-5 h-5 text-green-400 mb-1" />
                                            <span>{car.vehicleSpec.seating_capacity} seats</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <Fuel className="w-5 h-5 text-green-400 mb-1" />
                                            <span>{car.vehicleSpec.fuel_type}</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className={`badge ${car.availability === 'Available' ? 'badge-success' : 'badge-error'}`}>
                                                {car.availability}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="font-bold text-xl mb-2  text-green-500">Ksh: {car.rental_rate} /day</p>
                                    <Link to={`/vehicle/${car.vehicle_id}`} className="float-right mt-4 mb-3 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400">
                                        View & Book
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    );
}

export default Explore;
