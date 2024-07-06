import { FaCar, FaWallet, FaMapMarkedAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AboutUs = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="container mx-auto py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className={`flex flex-col justify-center items-center ${isVisible ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0'}`}>
                    <h1 className="text-3xl font-bold mb-6">About <span className="text-green-600">Us</span></h1>
                    <p className="text-xl mb-6">
                        <span className='text-green-600 font-bold'>RideWave</span> is your premier destination for hassle-free vehicle rentals. Whether you need a car for a day or a month, we offer a wide range of vehicles to suit your needs.
                    </p>
                    <p className="text-xl">
                        Our mission is to provide <span className='text-green-600 font-bold'>affordable,</span> <span className='text-green-600 font-bold'>convenient,</span> and <span className='text-green-600 font-bold'>reliable</span>  transportation solutions to our customers, ensuring a smooth and enjoyable rental experience every time.
                    </p>
                    <div className="flex justify-center mt-12">
                        <button className="btn btn-primary"><Link to='/contact'>Contact Us</Link></button>
                    </div>
                </div>
                <div className={`flex flex-col gap-6 ${isVisible ? 'opacity-100 transition-opacity duration-1000 delay-500' : 'opacity-0'}`}>
                    <div className="flex items-center">
                        <FaCar className="text-4xl text-green-600 mr-4" />
                        <div>
                            <h3 className="text-2xl font-bold text-green-600">Wide Selection of Vehicles</h3>
                            <p className="text-lg">Choose from a diverse fleet of vehicles including sedans, SUVs, and more.</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <FaWallet className="text-4xl text-green-600 mr-4" />
                        <div>
                            <h3 className="text-2xl font-bold text-green-600">Affordable Rates</h3>
                            <p className="text-lg">Enjoy competitive pricing with no hidden fees.</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <FaMapMarkedAlt className="text-4xl text-green-600 mr-4" />
                        <div>
                            <h3 className="text-2xl font-bold text-green-600">Convenient Locations</h3>
                            <p className="text-lg">Find us conveniently located in major cities for easy access.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
