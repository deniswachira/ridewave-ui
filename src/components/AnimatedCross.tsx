import Lottie from 'react-lottie';
import animationData from '../utils/Animation - 1720979559755.json';

const AnimatedCross = () => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return <Lottie options={defaultOptions} height={150} width={150} />;
};

export default AnimatedCross;
