import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300 text-gray-900 p-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl font-extrabold mb-4 text-gray-900">
          Excel Data Importer 📊
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          A powerful tool to seamlessly import, manage, and analyze Excel files
          with advanced features and authentication.
        </p>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 px-6 py-3 text-lg font-semibold bg-gradient-to-r 
                   from-gray-700 to-gray-900 text-white rounded-lg shadow-md 
                   hover:shadow-xl transition-all duration-300"
        onClick={() => {
            navigate('/excel')
            }}
      >
        Get Started
      </motion.button>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-5xl"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white rounded-xl shadow-md border border-gray-300"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

const features = [
  {
    title: "Secure Authentication 🔒",
    description:
      "Protect your data with JWT authentication and role-based access.",
  },
  {
    title: "Seamless Excel Import 📂",
    description: "Easily upload and manage large Excel files with ease.",
  },
  {
    title: "Real-time Data Processing ⚡",
    description:
      "Instantly view, filter, and analyze imported Excel data in a structured format.",
  },
];
