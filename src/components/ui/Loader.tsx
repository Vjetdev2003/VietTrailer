import React from 'react';
import { motion } from 'framer-motion';

const LoaderWrapper: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  );
};

const Loader: React.FC = () => {
  const container = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const dot = {
    initial: { scale: 0.5, opacity: 0.3 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  return (
    <motion.div
      className="flex space-x-2"
      variants={container}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="w-4 h-4 rounded-full bg-red-500"
        variants={dot}
      />
      <motion.div
        className="w-4 h-4 rounded-full bg-red-600"
        variants={dot}
      />
      <motion.div
        className="w-4 h-4 rounded-full bg-red-700"
        variants={dot}
      />
    </motion.div>
  );
};

export default LoaderWrapper;
export { Loader };