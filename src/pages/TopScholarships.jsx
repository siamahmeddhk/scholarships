// import React from 'react';
// import { useTopScholarships } from '../hook/useTopScholarships';
// import { useNavigate } from 'react-router';
// import { useAuthContext } from '../context/AuthContext'; // update path if needed

// const TopScholarships = () => {
//   const { data: scholarships, isLoading, isError, error } = useTopScholarships();
//   const { user } = useAuthContext(); // ✅ check login
//   const navigate = useNavigate();

//   const handleDetailsClick = (id) => {
//     if (user) {
//       navigate(`/scholarship/${id}`);
//     } else {
//       navigate('/register');
//     }
//   };

//   if (isLoading) return <div className="text-center py-10">Loading scholarships...</div>;
//   if (isError) return <div className="text-center text-red-500 py-10">Error: {error.message}</div>;

//   return (
//     <section className="py-12 px-4 max-w-7xl mx-auto">
//       <div className="text-center mb-10">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-800">🎓 Top Scholarships</h2>
//         <p className="mt-2 text-gray-600">
//           Explore the best funding opportunities with low application fees and recent updates.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {scholarships.map((scholarship) => (
//           <div
//             key={scholarship._id}
//             className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white p-6 flex flex-col justify-between"
//           >
//             <div className="flex flex-col items-center text-center">
//               <img
//                 src={scholarship.universityImage || 'default-logo.png'}
//                 alt={scholarship.universityName}
//                 className="h-24 w-24 object-contain mb-4"
//               />
//               <h3 className="text-xl font-bold text-gray-800">{scholarship.universityName}</h3>
//               <p className="text-sm text-blue-600 mb-2">{scholarship.scholarshipCategory}</p>
//               <p className="text-gray-500">
//                 📍 {scholarship.universityCity}, {scholarship.universityCountry}
//               </p>
//               <p className="text-sm text-gray-600 mt-1">
//                 🗓 Deadline: {new Date(scholarship.applicationDeadline).toLocaleDateString()}
//               </p>
//               <p className="mt-1 font-medium text-green-600">
//                 💵 Application Fees: ${scholarship.applicationFees}
//               </p>
//             </div>

//             {/* ✅ Redirect based on login status */}
//             <button
//               onClick={() => handleDetailsClick(scholarship._id)}
//               className="mt-5 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//             >
//               Details
//             </button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default TopScholarships;




// import React from 'react';
// import { useTopScholarships } from '../hook/useTopScholarships';
// import { useNavigate } from 'react-router';
// import { useAuthContext } from '../context/AuthContext';

// const TopScholarships = () => {
//   const { data: scholarships, isLoading, isError, error } = useTopScholarships();
//   const { user } = useAuthContext();
//   const navigate = useNavigate();

//   const handleDetailsClick = (id) => {
//     if (user) {
//       navigate(`/scholarship/${id}`);
//     } else {
//       navigate('/register');
//     }
//   };

//   if (isLoading)
//     return <div className="text-center py-10">Loading scholarships...</div>;
//   if (isError)
//     return (
//       <div className="text-center text-red-500 py-10">
//         Error: {error.message}
//       </div>
//     );

//   return (
//     <section className="py-12 px-4 max-w-7xl mx-auto">
//       {/* 🔹 Section Header */}
//       <div className="text-center mb-10">
//         <h2 className="text-3xl md:text-4xl font-bold text-indigo-700">
//           🎓 Top Scholarships
//         </h2>
//         <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
//           Explore the best funding opportunities with low application fees and
//           recent updates.
//         </p>
//       </div>

//       {/* 🔹 Scholarship Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {scholarships.map((scholarship) => (
//           <div
//             key={scholarship._id}
//             className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-6 flex flex-col justify-between"
//           >
//             {/* Logo + Info */}
//             <div className="flex flex-col items-center text-center">
//               <img
//                 src={scholarship.universityImage || 'default-logo.png'}
//                 alt={scholarship.universityName}
//                 className="h-20 w-20 object-contain mb-4 rounded-full border border-gray-200 shadow-sm"
//               />
//               <h3 className="text-xl font-bold text-gray-800">
//                 {scholarship.universityName}
//               </h3>

//               {/* Category Badge */}
//               <span className="mt-2 px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700 font-medium">
//                 {scholarship.scholarshipCategory}
//               </span>

//               {/* Location */}
//               <p className="text-gray-600 mt-3">
//                 📍 {scholarship.universityCity}, {scholarship.universityCountry}
//               </p>

//               {/* Deadline */}
//               <p className="text-sm mt-2">
//                 🗓 Deadline:{' '}
//                 <span className="text-red-600 font-semibold">
//                   {new Date(
//                     scholarship.applicationDeadline
//                   ).toLocaleDateString()}
//                 </span>
//               </p>

//               {/* Fees */}
//               <p className="mt-2 font-medium text-gray-700">
//                 💵 Application Fees:{' '}
//                 <span className="text-indigo-600">
//                   ${scholarship.applicationFees}
//                 </span>
//               </p>
//             </div>

//             {/* CTA */}
//             <button
//               onClick={() => handleDetailsClick(scholarship._id)}
//               className="mt-6 w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow-md hover:shadow-xl transition"
//             >
//               View Details
//             </button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default TopScholarships;





import React from 'react';
import { useTopScholarships } from '../hook/useTopScholarships';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../context/AuthContext';
import { FaUniversity, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaStar } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

const TopScholarships = () => {
  const { data: scholarships = [], isLoading, isError, error } = useTopScholarships();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleDetailsClick = (id) => {
    if (user) {
      navigate(`/scholarship/${id}`);
    } else {
      navigate('/register');
    }
  };

  if (isLoading) return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-10 bg-gray-200 rounded mt-6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (isError) return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">Error loading scholarships: {error.message}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Scholarships
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover top funding opportunities with competitive benefits
          </p>
        </div>

        {/* Scholarship Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {scholarships.map((scholarship) => (
            <div key={scholarship._id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              {/* University Image */}
              <div className="h-48  flex items-center justify-center">
                {scholarship.universityImage ? (
                  <img
                    src={scholarship.universityImage}
                    alt={scholarship.universityName}
                    className="h-64 w-64 object-contain"
                  />
                ) : (
                  <FaUniversity className="h-20 w-20 text-white opacity-30" />
                )}
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                    {scholarship.universityName}
                  </h3>
                  {scholarship.rating && (
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400" />
                      <span className="ml-1 text-gray-700">{scholarship.rating}</span>
                    </div>
                  )}
                </div>

                {/* Scholarship Category */}
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-indigo-700 uppercase rounded-full bg-indigo-100 mb-3">
                  {scholarship.scholarshipCategory}
                </span>

                {/* Degree and Subject */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Degree:</span> {scholarship.degree}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Subject:</span> {scholarship.subjectCategory}
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-center text-gray-600 mb-3">
                  <FaMapMarkerAlt className="flex-shrink-0 mr-2" />
                  <span>{scholarship.universityCity}, {scholarship.universityCountry}</span>
                </div>

                {/* Financial Info */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Application Fee</p>
                    <p className="font-bold text-indigo-600">${scholarship.applicationFees}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Tuition Fees</p>
                    <p className="font-bold text-indigo-600">${scholarship.tuitionFees}</p>
                  </div>
                </div>

                {/* Deadline */}
                <div className="flex items-center justify-between bg-red-50 p-3 rounded-lg mb-6">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-red-500 mr-2" />
                    <span className="text-sm font-medium text-red-700">Deadline</span>
                  </div>
                  <span className="text-sm font-semibold text-red-700">
                    {new Date(scholarship.applicationDeadline).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleDetailsClick(scholarship._id)}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-sm transition-colors duration-200"
                >
                  View Details
                  <FiExternalLink className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopScholarships;
