import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';
import { Car } from '../types/Types';
import { Link } from 'react-router-dom';


interface CarCardsSectionProps {
    cars: Car[];
}

const CarCardsSection: React.FC<CarCardsSectionProps> = ({ cars }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);
    // console.log(cars)

    return (
        <div className={`container mx-auto mb-5 ${isVisible ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0'}`}>
            <div className="place-items-center flex flex-col">
                <h1 className="text-5xl font-bold text-green-600">Our Top Pick Vehicles</h1>
                <p className="text-lg text-gray-300 mb-4">
                    Experience the epitome of an amazing journey with our top picks.
                </p>
            </div>
            <hr className="my-6 border-gray-800" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cars.map((car, index) => (
                    <CarCard key={index} car={car} />
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none">
                    <Link to="explore">Explore</Link>
                </button>
            </div>
        </div>
    );
};

export default CarCardsSection;
