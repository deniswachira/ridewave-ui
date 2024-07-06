import React from 'react';
import { Car } from '../types/Car'; // Import the Car type interface

interface CarCardProps {
    car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
    return (
        <div className="rounded-lg overflow-hidden shadow-md bg-gray-800 text-white transition transform hover:scale-105">
            <img src={car.image} alt={`${car.make} ${car.model}`} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{car.make} {car.model}</h2>
                <p className="text-gray-400 mb-2">{car.year}</p>
                <p className="text-gray-400 mb-4">{car.description}</p>
                <p className="font-bold text-xl">${car.price}/day</p>
                <button className=" float-right mt-4 mb-3 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default CarCard;
