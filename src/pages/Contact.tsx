
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
            <Navbar />
            <div className="container mx-auto py-12 px-4 min-h-screen max-h-fit-content">
                <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/2">
                        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                        <form className="bg-gray-800 p-8 rounded-lg shadow-lg">
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Full Name</label>
                                <input type="text" className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" placeholder="Your Name" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Email</label>
                                <input type="email" className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" placeholder="Your Email" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Subject</label>
                                <input type="text" className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" placeholder="Subject" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Message</label>
                                <textarea className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" placeholder="Your Message"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary w-full">Send Message</button>
                        </form>
                    </div>
                    <div className="lg:w-1/2">
                        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                        <p className="text-gray-400 mb-4">Feel free to reach out to us through any of the following methods:</p>
                        <div className="mb-4">
                            <h3 className="text-xl font-bold">Email</h3>
                            <p className="text-gray-400">support@ridewave.com</p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-xl font-bold">Phone</h3>
                            <p className="text-gray-400">+254 (745) 086-753</p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-xl font-bold">Address</h3>
                            <p className="text-gray-400">123 RideWave St, Cityville, ST 12345</p>
                        </div>
                        <div>
                            <iframe
                                className="w-full h-64 rounded"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509868!2d144.95592341531687!3d-37.81720997975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577e0c3b2d61f0!2s123%20RideWave%20St%2C%20Cityville%20ST%2012345!5e0!3m2!1sen!2sus!4v1614012089561!5m2!1sen!2sus"
                              
                                loading="lazy"
                                title="RideWave Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
