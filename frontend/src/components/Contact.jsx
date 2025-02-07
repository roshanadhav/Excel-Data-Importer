import { motion } from "framer-motion";

const AnimatedContactPage = () => {
  return (
    <div className="flex mt-20 mb-20 justify-center items-center bg-gray-100 p-4">
      <motion.div 
        className="bg-white mt-10 mb-20 p-8 rounded-2xl shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Get in Touch</h2>
        <form className="space-y-4">
          <div>
            <input type="text" placeholder="Your Name" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <input type="email" placeholder="Your Email" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <textarea placeholder="Your Message" className="w-full p-2 border border-gray-300 rounded-md" rows={4}></textarea>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="text-center"
          >
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 w-full text-white p-2 rounded-md">Send Message</button>
          </motion.div>
        </form>
        <div className="flex justify-between items-center mt-6 text-gray-600">
          <div className="flex items-center">
            📧 support@example.com
          </div>
          <div className="flex items-center">
            📞 +1 234 567 890
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedContactPage;
