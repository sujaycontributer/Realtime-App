import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  const handleRedirect = () => {
    window.open("https://github.com/sujaycontributer/Realtime-App", "_blank");
  };

  return (
    <div className="flex flex-col gap-8 items-center fixed top-0 left-0 md:left-[305px] justify-center min-h-screen bg-gray-100 p-6">
      {/* Gradient Motivational Text */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-center leading-snug"
      >
        Project build karna start kar de bhai, resume select nhi hoga to dsa
        question sirf hostel me hi solve karte rahoge <span>🤡</span>
      </motion.h1>

      {/* Clean Small Button */}
      <motion.button
        onClick={handleRedirect}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group flex items-center gap-2 px-4 py-2 rounded-md font-medium text-white bg-gradient-to-r from-purple-400 to-indigo-400 shadow-md hover:shadow-lg transition-all text-sm"
      >
        <span>Improve UI</span>
        {/* Shifting star */}
        <motion.span
          className="inline-block"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          ✨
        </motion.span>
      </motion.button>
    </div>
  );
};

export default Home;
