import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/hero.css'; // Make sure to define your custom styles here
import heroImg1 from '../assets/background/13685.jpg';
import heroImg2 from '../assets/background/img2.jpg';
import heroImg3 from '../assets/background/img2.jpg';
import heroImg4 from '../assets/background/img1.jpg';
import { Link } from 'react-router-dom';

function Hero() {
  // Split the text into parts for dynamic rendering
  const textParts = [
    { text: 'Drive the ', className: 'text-green-600', style: { transition: 'color 0.3s' } },
    { text: 'Car ', className: 'text-blue-600', style: { transition: 'color 0.3s' } },
    { text: 'You Want', className: 'text-yellow-600', style: { transition: 'color 0.3s' } },
  ];

  return (
    <div className="container mx-auto h-[50vh] flex items-center justify-center mb-5">
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Left Section - Text Content */}
        <div className="md:w-1/2">
          <div className="text-center md:text-left text-gray-800 animate-fade-in-up">
            <h1 className="text-5xl font-bold mb-4">
              {textParts.map((part, index) => (
                <span
                  key={index}
                  className={part.className}
                  style={part.style}
                >
                  {part.text}
                </span>
              ))}
            </h1>
            <p className="py-6 text-lg text-white">
              Rent a car just from your fingertip. We provide awesome cars at great prices. Rent a car just from your fingertip. We provide awesome cars anytime, anywhere.
            </p>
            <button className="btn btn-outline btn-blue-500 transform hover:scale-105 transition duration-300 flex float-center">
              <Link to="/register" className="flex items-center text-white hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Get Started
              </Link>
            </button>
          </div>
        </div>

        {/* Right Section - Carousel */}
        <div className="md:w-1/2">
          <div className="h-full">
            <Carousel
              showArrows={true}
              autoPlay
              interval={5000}
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              className="w-full h-full"
            >
              <div>
                <img src={heroImg4} className="object-cover w-full h-full" alt="Slide 1" />
              </div>
              <div>
                <img src={heroImg1} className="object-cover w-full h-full" alt="Slide 1" />
              </div>
              <div>
                <img src={heroImg2} className="object-cover w-full h-full" alt="Slide 2" />
              </div>
              <div>
                <img src={heroImg3} className="object-cover w-full h-full" alt="Slide 3" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
