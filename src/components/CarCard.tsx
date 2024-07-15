import React from 'react';
import { Users, Fuel } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Car } from '../types/Types'; // Import the Car type interface
import image from '../assets/background/13685.jpg';

interface CarCardProps {
    car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
    const { vehicleSpec, availability, rental_rate, vehicle_id } = car;

    return (
        <div className="rounded-lg overflow-hidden shadow-md bg-gray-800 text-white transition transform hover:scale-105">
            <img src={vehicleSpec.image1_url} alt={`${vehicleSpec.vehicle_name} ${vehicleSpec.vehicle_model}`} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{vehicleSpec.vehicle_name} {vehicleSpec.vehicle_model}</h2>
                {/* <p className="text-gray-400 mb-2">{vehicleSpec.vehicle_year}</p> */}
                {/* <p className="text-gray-400 mb-4">{vehicleSpec.vehicle_description}</p> */}
                <div className="flex justify-between mb-2">
                    <div className="flex flex-col items-center">
                        <Users className="w-5 h-5 text-green-400 mb-1" />
                        <span>{vehicleSpec.seating_capacity} seats</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Fuel className="w-5 h-5 text-green-400 mb-1" />
                        <span>{vehicleSpec.fuel_type}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className={`badge ${availability === 'Available' ? 'badge-success' : 'badge-error'}`}>
                            {availability}
                        </span>
                    </div>
                </div>
                <p className="font-bold text-xl">Ksh: {rental_rate} /day</p>
                <Link to={`/vehicle/${vehicle_id}`} className="float-right mt-4 mb-3 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default CarCard;
