import React, { useEffect, useState } from 'react';
import { FaShieldAlt, FaUserTie, FaEnvelope, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ModeratorsShowcase = () => {
  const [moderators, setModerators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModerators = async () => {
      try {
        const response = await fetch('https://s-server-two.vercel.app/users/moderators');
        if (!response.ok) {
          throw new Error('Failed to fetch moderators');
        }
        const data = await response.json();
        setModerators(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModerators();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-8 max-w-4xl mx-auto">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">Error loading moderators: {error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-4">
            <FaShieldAlt className="mr-2" />
            Our Team
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Meet Our Expert Moderators
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Professionals ensuring quality and integrity in our scholarship platform
          </p>
        </div>

        {/* Moderators Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {moderators.map((moderator, index) => (
            <motion.div
              key={moderator._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                {/* Moderator Image */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    {moderator.photoURL ? (
                      <img
                        src={moderator.photoURL}
                        alt={moderator.name}
                        className="h-32 w-32 rounded-full object-cover border-4 border-indigo-100"
                      />
                    ) : (
                      <div className="h-32 w-32 rounded-full bg-indigo-100 flex items-center justify-center">
                        <FaUserTie className="h-16 w-16 text-indigo-400" />
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2">
                      <FaShieldAlt className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Moderator Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900">{moderator.name}</h3>
                  <p className="text-indigo-600 font-medium">Platform Moderator</p>
                  
                  {/* Contact Info */}
                  <div className="mt-4 flex justify-center space-x-4">
                    <a 
                      href={`mailto:${moderator.email}`} 
                      className="text-gray-400 hover:text-indigo-600 transition-colors"
                      aria-label="Email moderator"
                    >
                      <FaEnvelope className="h-5 w-5" />
                    </a>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-blue-700 transition-colors"
                      aria-label="LinkedIn profile"
                    >
                      <FaLinkedin className="h-5 w-5" />
                    </a>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                      aria-label="Twitter profile"
                    >
                      <FaTwitter className="h-5 w-5" />
                    </a>
                  </div>

                  {/* Role Badge */}
                  <div className="mt-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <FaUserTie className="mr-1" />
                      {moderator.role.charAt(0).toUpperCase() + moderator.role.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModeratorsShowcase;