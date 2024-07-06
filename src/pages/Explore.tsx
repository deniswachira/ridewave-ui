import React, { useState } from 'react';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const tags = ['All', 'Sedan', 'SUV', 'Truck', 'Electric', 'Luxury'];

const items = [
    { id: 1, name: 'Toyota Camry', tag: 'Sedan', image: 'path/to/image1.jpg' },
    { id: 2, name: 'Ford F-150', tag: 'Truck', image: 'path/to/image2.jpg' },
    { id: 3, name: 'Tesla Model S', tag: 'Electric', image: 'path/to/image3.jpg' },
    { id: 4, name: 'Mercedes-Benz S-Class', tag: 'Luxury', image: 'path/to/image4.jpg' },
    { id: 5, name: 'Honda CR-V', tag: 'SUV', image: 'path/to/image5.jpg' },
    { id: 6, name: 'Chevrolet Tahoe', tag: 'SUV', image: 'path/to/image6.jpg' },
    { id: 7, name: 'Mercedes-Benz S-Class', tag: 'Luxury', image: 'path/to/image4.jpg' },
    { id: 8, name: 'Honda CR-V', tag: 'SUV', image: 'path/to/image5.jpg' },
    { id: 9, name: 'Chevrolet Tahoe', tag: 'SUV', image: 'path/to/image6.jpg' }
];

function Explore() {
    const [selectedTag, setSelectedTag] = useState('All');

    const filteredItems = selectedTag === 'All' ? items : items.filter(item => item.tag === selectedTag);

    return (
        <Container className="bg-gray-900 text-white flex flex-col gap-6 min-h-screen">
            <Navbar />
            <div className='container mx-auto items-center min-h-screen  justify-center '>
            <div className="flex justify-center mt-4">
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <button
                            key={tag}
                            className={`btn ${selectedTag === tag ? 'btn-primary' : 'btn-outline'} text-white border-white`}
                            onClick={() => setSelectedTag(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center mt-4">
                {/* <h1 className="text-2xl font-bold mb-4">Explore</h1> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full px-4">
                    {filteredItems.map(item => (
                        <div key={item.id} className="card bg-gray-800 p-4 rounded shadow-md transition transform hover:scale-105">
                            <img src={item.image} alt={item.name} className="rounded-t-lg h-48 w-full object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                                <p className="text-gray-400 mb-4">{item.tag}</p>
                                <button className="btn btn-primary w-full">Book Now</button>
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
