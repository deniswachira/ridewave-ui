
import Lottie from 'react-lottie';
import animationData from '../utils/Animation - 1720977783376.json';

const AnimatedCheckmark = () => {
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

export default AnimatedCheckmark;
