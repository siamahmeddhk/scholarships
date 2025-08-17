import React from 'react';
import { FaSearch, FaUniversity, FaFileAlt, FaUserGraduate, FaUserShield, FaUserCog } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch className="text-4xl mb-4 text-indigo-600" />,
      title: "Find Scholarships",
      description: "Search and discover scholarships that match your academic profile and interests from our comprehensive database."
    },
    {
      icon: <FaUniversity className="text-4xl mb-4 text-indigo-600" />,
      title: "View Details",
      description: "Explore complete scholarship details including eligibility criteria, benefits, deadlines, and application requirements."
    },
    {
      icon: <FaFileAlt className="text-4xl mb-4 text-indigo-600" />,
      title: "Apply Online",
      description: "Complete your application with our streamlined online process and track your submission status."
    },
    {
      icon: <FaUserGraduate className="text-4xl mb-4 text-indigo-600" />,
      title: "Get Funded",
      description: "Receive notifications about your application status and funding decisions directly through your dashboard."
    }
  ];

  const userTypes = [
    {
      icon: <FaUserGraduate className="text-4xl mb-4 text-indigo-600" />,
      role: "Students",
      features: [
        "Search and apply for scholarships",
        "Track application status",
        "Manage personal profile",
        "Submit reviews and ratings"
      ]
    },
    {
      icon: <FaUserShield className="text-4xl mb-4 text-indigo-600" />,
      role: "Moderators",
      features: [
        "Manage scholarship listings",
        "Review applications",
        "Provide applicant feedback",
        "Monitor reviews"
      ]
    },
    {
      icon: <FaUserCog className="text-4xl mb-4 text-indigo-600" />,
      role: "Administrators",
      features: [
        "Manage all user accounts",
        "Oversee system operations",
        "Generate reports and analytics",
        "Configure system settings"
      ]
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How ScholarNest Works
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            A seamless platform connecting students with global scholarship opportunities
          </p>
        </div>

        {/* Application Process */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-12">
            Simple 4-Step Application Process
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="flex justify-center">{step.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
                <div className="mt-4 text-indigo-600 font-medium">
                  Step {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* User Roles */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-12">
            Platform User Roles
          </h3>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="w-full"
          >
            {userTypes.map((user, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-6 rounded-xl shadow-sm h-full">
                  <div className="flex justify-center">{user.icon}</div>
                  <h4 className="text-xl font-bold text-center text-gray-900 mb-4">{user.role}</h4>
                  <ul className="space-y-3">
                    {user.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Scholarship Features */}
        {/* <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 ">
          <h3 className="text-2xl font-bold mb-6">Why Choose ScholarNest?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <h4 className="font-semibold mb-3">Comprehensive Database</h4>
              <p>Access thousands of scholarships from universities worldwide with detailed eligibility criteria.</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <h4 className="font-semibold mb-3">Streamlined Applications</h4>
              <p>Apply to multiple scholarships with a single profile and track all your applications in one place.</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <h4 className="font-semibold mb-3">Secure Platform</h4>
              <p>Your data is protected with industry-standard security measures and privacy controls.</p>
            </div>
          </div>
        </div> */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-700 to-blue-700 rounded-2xl p-8 shadow-2xl">
  {/* Decorative elements */}
  <div className="absolute -top-20 -right-20 w-64 h-64 bg-white bg-opacity-5 rounded-full"></div>
  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white bg-opacity-5 rounded-full"></div>
  <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
  
  {/* Main content */}
  <div className="relative z-10">
    <div className="text-center mb-10">
      <h3 className="text-3xl font-bold text-white mb-4">
        Why Choose <span className="text-yellow-300">ScholarNest</span>?
      </h3>
      <p className="text-blue-100 max-w-2xl mx-auto">
        Discover the platform that's revolutionizing scholarship applications for students worldwide
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Feature Card 1 */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white bg-opacity-10 p-6 rounded-xl border border-white border-opacity-20 backdrop-blur-lg transition-all duration-300 hover:bg-opacity-20"
      >
        <div className="flex items-center mb-4">
          <div className="bg-indigo-500 p-3 rounded-lg mr-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <h4 className="font-bold text-xl text-white">Comprehensive Database</h4>
        </div>
        <p className="">
          Access thousands of scholarships from 500+ universities worldwide with detailed eligibility criteria and success rates.
        </p>
      </motion.div>

      {/* Feature Card 2 */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white bg-opacity-10 p-6 rounded-xl border border-white border-opacity-20 backdrop-blur-lg transition-all duration-300 hover:bg-opacity-20"
      >
        <div className="flex items-center mb-4">
          <div className="bg-blue-500 p-3 rounded-lg mr-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <h4 className="font-bold text-xl text-white">Streamlined Process</h4>
        </div>
        <p className="">
          Apply to multiple scholarships with a single profile and track all applications in one dashboard with real-time updates.
        </p>
      </motion.div>

      {/* Feature Card 3 */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white bg-opacity-10 p-6 rounded-xl border border-white border-opacity-20 backdrop-blur-lg transition-all duration-300 hover:bg-opacity-20"
      >
        <div className="flex items-center mb-4">
          <div className="bg-purple-500 p-3 rounded-lg mr-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h4 className="font-bold text-xl text-white">Secure Platform</h4>
        </div>
        <p className="">
          Your data is protected with bank-level encryption, two-factor authentication, and regular security audits.
        </p>
      </motion.div>
    </div>

    {/* Stats section */}
    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
        <div className="text-3xl font-bold text-yellow-300">500+</div>
        <div className="">Universities</div>
      </div>
      <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
        <div className="text-3xl font-bold text-yellow-300">10K+</div>
        <div className="">Scholarships</div>
      </div>
      <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
        <div className="text-3xl font-bold text-yellow-300">95%</div>
        <div className="">Success Rate</div>
      </div>
      <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
        <div className="text-3xl font-bold text-yellow-300">24/7</div>
        <div className="">Support</div>
      </div>
    </div>
  </div>
</div>
      </div>
    </section>
  );
};

export default HowItWorks;