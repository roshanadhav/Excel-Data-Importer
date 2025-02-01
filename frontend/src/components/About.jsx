import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
      <motion.div
        className="max-w-3xl bg-white shadow-lg rounded-2xl p-8 text-gray-800"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Title Section */}
        <motion.h1
          className="text-3xl font-bold text-gray-900 mb-4 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          About Us
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-gray-600 leading-relaxed text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          We are dedicated to providing the best solutions to enhance your digital workflow. 
          Our platform is built to **simplify your editing, exporting, and saving processes** 
          with an intuitive and **AI-powered system**.
        </motion.p>

        {/* Animated Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          {[
            { title: "Fast Editing", desc: "Seamless & smooth interface.", icon: "⚡" },
            { title: "Smart Analytics", desc: "Track & optimize your work.", icon: "📊" },
            { title: "Secure & Reliable", desc: "Your data is always safe.", icon: "🔒" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-5 rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 * index, duration: 0.6 }}
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="text-lg font-semibold text-gray-900 mt-3">{item.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <button className="px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-all">
            Get Started 🚀
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
