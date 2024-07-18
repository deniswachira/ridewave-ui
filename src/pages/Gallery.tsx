import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";

function Gallery() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const images = [
        "src/assets/background/13685.jpg",
        "src/assets/background/img1.jpg",
        "/images/car3.jpg",
        "/images/car4.jpg",
        "/images/car5.jpg",
        "/images/car6.jpg",
    ];

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow py-12">
                <h1 className="text-4xl text-center font-bold mb-8">Our Gallery</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`relative overflow-hidden group rounded-lg shadow-lg transition duration-300 ease-in-out transform ${hoveredIndex === index ? "scale-125 z-10" : "scale-100"
                                }`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <img
                                src={image}
                                alt={`Gallery Image ${index + 1}`}
                                className="w-full h-64 object-cover transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                                <h2 className="text-xl font-bold">Featured Car</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Gallery;
