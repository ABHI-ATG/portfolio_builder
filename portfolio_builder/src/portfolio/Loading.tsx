import { motion } from "framer-motion";
import '../css/Loading.css'

const LoadingPage = () => {
    return (
        <div className="loading-container">
            {/* Bouncing Dots */}
            <div className="dots-container">
                {[...Array(3)].map((_, index) => (
                    <motion.span
                        key={index}
                        className="dot"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: index * 0.2 }}
                    />
                ))}
            </div>

            {/* Pulsing Text */}
            <motion.h2
                className="loading-text"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                Loading Portfolio...
            </motion.h2>
        </div>
    );
};

export default LoadingPage;
