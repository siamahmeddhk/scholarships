// import React from "react";
// import { useParams, Link } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const ScholarshipDetails = () => {
//   const { id } = useParams();

//   // Helper to extract username from email if needed
//   const userNameFromEmail = (email) => {
//     if (!email) return "Anonymous";
//     return email.split("@")[0];
//   };

//   // Fetch scholarship details
//   const {
//     data: scholarship,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["scholarship", id],
//     queryFn: async () => {
//       const res = await axios.get(
//         `https://s-server-two.vercel.app/scholarships/${id}`
//       );
//       return res.data;
//     },
//   });

//   // Fetch reviews
//   const {
//     data: reviews = [],
//     isLoading: reviewsLoading,
//     isError: reviewsError,
//   } = useQuery({
//     queryKey: ["reviews", id],
//     queryFn: async () => {
//       const res = await axios.get(
//         `https://s-server-two.vercel.app/reviews?scholarshipId=${id}`
//       );
//       return res.data;
//     },
//   });

//   if (isLoading)
//     return <p className="text-center text-lg">Loading scholarship...</p>;
//   if (isError)
//     return (
//       <p className="text-center text-red-600">Error loading scholarship</p>
//     );

//   const renderStars = (rating) => {
//     return (
//       <span className="text-yellow-500 text-lg">
//         {"★".repeat(rating) + "☆".repeat(5 - rating)}
//       </span>
//     );
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       {/* Header */}
//       <h1 className="text-3xl font-bold text-center mb-4">
//         {scholarship.scholarshipName}
//       </h1>
//       <h2 className="text-xl font-semibold text-center mb-6">
//         {scholarship.universityName}
//       </h2>

//       {/* University Image */}
//       {scholarship.universityImage && (
//         <div className="flex justify-center mb-6">
//           <img
//             src={scholarship.universityImage}
//             alt="University Logo"
//             className="w-40 rounded-md shadow"
//           />
//         </div>
//       )}

//       {/* Scholarship Details Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
//         <div>
//           <p>
//             <b>Country:</b> {scholarship.universityCountry}
//           </p>
//           <p>
//             <b>City:</b> {scholarship.universityCity}
//           </p>
//           <p>
//             <b>World Rank:</b> #{scholarship.universityWorldRank}
//           </p>
//           <p>
//             <b>Subject Category:</b> {scholarship.subjectCategory}
//           </p>
//           <p>
//             <b>Degree:</b> {scholarship.degree}
//           </p>
//           <p>
//             <b>Scholarship Type:</b> {scholarship.scholarshipCategory}
//           </p>
//         </div>

//         <div>
//           <p>
//             <b>Tuition Fees:</b> ${scholarship.tuitionFees}
//           </p>
//           <p>
//             <b>Application Fees:</b> ${scholarship.applicationFees}
//           </p>
//           <p>
//             <b>Service Charge:</b> ${scholarship.serviceCharge}
//           </p>
//           <p>
//             <b>Stipend:</b> {scholarship.stipend || "N/A"}
//           </p>
//           <p>
//             <b>Deadline:</b>{" "}
//             {new Date(scholarship.applicationDeadline).toLocaleDateString()}
//           </p>
//           <p>
//             <b>Posted On:</b> {new Date(scholarship.postDate).toLocaleDateString()}
//           </p>
//         </div>
//       </div>

//       {/* Description */}
//       {scholarship.scholarshipDescription && (
//         <p className="mt-6 text-gray-700 leading-relaxed">
//           {scholarship.scholarshipDescription}
//         </p>
//       )}

//       {/* Apply Button */}
//       <div className="mt-8 text-center">
//         <Link to={`/apply/${scholarship._id}`}>
//           <button className="px-6 py-3 bg-green-600 hover:bg-green-700 transition-colors text-white rounded-lg">
//             Apply for this Scholarship
//           </button>
//         </Link>
//       </div>

//       {/* Reviews Section */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-semibold mb-6">User Reviews</h2>

//         {reviewsLoading && <p className="text-center">Loading reviews...</p>}
//         {reviewsError && (
//           <p className="text-center text-red-600">Error loading reviews</p>
//         )}
//         {!reviewsLoading && !reviewsError && reviews.length === 0 && (
//           <p className="text-gray-600 text-center">No reviews yet.</p>
//         )}

//         {!reviewsLoading && !reviewsError && reviews.length > 0 && (
//           <Swiper
//             modules={[Navigation, Pagination, Autoplay]}
//             navigation
//             pagination={{ clickable: true }}
//             autoplay={{ delay: 3000 }}
//             spaceBetween={20}
//             slidesPerView={1}
//             className="w-full max-w-2xl"
//           >
//             {reviews.map((review) => (
//               <SwiperSlide key={review._id}>
//                 <div className="border p-6 rounded-xl shadow-md bg-white flex flex-col items-center text-center">
//                   <img
//                     src={review.reviewerImage || "https://via.placeholder.com/80"}
//                     alt={review.userEmail || "Reviewer"}
//                     className="w-16 h-16 rounded-full mb-3 border"
//                   />
//                   <p className="font-bold text-lg">
//                     {userNameFromEmail(review.userEmail)}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {new Date(review.createdAt).toLocaleDateString()}
//                   </p>
//                   <div className="mt-2">{renderStars(review.rating)}</div>
//                   <p className="text-gray-700 mt-2">{review.comment}</p>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ScholarshipDetails;




import React from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaUniversity, FaMapMarkerAlt, FaGraduationCap, FaMoneyBillWave, FaCalendarAlt, FaStar, FaUser } from "react-icons/fa";

const ScholarshipDetails = () => {
  const { id } = useParams();

  // Helper to extract username from email
  const userNameFromEmail = (email) => {
    if (!email) return "Anonymous";
    return email.split("@")[0];
  };

  // Fetch scholarship details
  const { data: scholarship, isLoading, isError } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://s-server-two.vercel.app/scholarships/${id}`
      );
      return res.data;
    },
  });

  // Fetch reviews
  const { data: reviews = [], isLoading: reviewsLoading, isError: reviewsError } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://s-server-two.vercel.app/reviews?scholarshipId=${id}`
      );
      return res.data;
    },
  });

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[300px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  if (isError) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-5xl mx-auto">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">Error loading scholarship details. Please try again later.</p>
        </div>
      </div>
    </div>
  );

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'} text-lg`} 
          />
        ))}
        <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Scholarship Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {scholarship.universityImage && (
              <div className="flex-shrink-0">
                <img
                  src={scholarship.universityImage}
                  alt="University"
                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg border-4 border-white shadow-md"
                />
              </div>
            )}
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{scholarship.scholarshipName}</h1>
              <h2 className="text-xl md:text-2xl font-semibold mb-3">{scholarship.universityName}</h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <FaMapMarkerAlt className="mr-1" /> {scholarship.universityCity}, {scholarship.universityCountry}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <FaUniversity className="mr-1" /> Rank: #{scholarship.universityWorldRank}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <FaGraduationCap className="mr-1" /> {scholarship.degree}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scholarship Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Description */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Scholarship Description</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {scholarship.scholarshipDescription || "No description available."}
            </p>
          </div>

          {/* Key Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Key Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <FaGraduationCap className="text-lg" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Degree Level</p>
                    <p className="text-sm font-semibold text-gray-900">{scholarship.degree}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <FaUniversity className="text-lg" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Subject Category</p>
                    <p className="text-sm font-semibold text-gray-900">{scholarship.subjectCategory}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <FaMoneyBillWave className="text-lg" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Scholarship Type</p>
                    <p className="text-sm font-semibold text-gray-900">{scholarship.scholarshipCategory}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <FaCalendarAlt className="text-lg" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Application Deadline</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(scholarship.applicationDeadline).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <FaMoneyBillWave className="text-lg" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Stipend</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {scholarship.stipend || "Not specified"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <FaUser className="text-lg" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Posted On</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(scholarship.postDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Financial Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Financial Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Tuition Fees</p>
                <p className="text-lg font-bold text-gray-900">${scholarship.tuitionFees}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Application Fees</p>
                <p className="text-lg font-bold text-gray-900">${scholarship.applicationFees}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Service Charge</p>
                <p className="text-lg font-bold text-gray-900">${scholarship.serviceCharge}</p>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <Link to={`/apply/${scholarship._id}`}>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
                Apply for this Scholarship
              </button>
            </Link>
            <div className="mt-4 text-center text-sm text-gray-600">
              Deadline: {new Date(scholarship.applicationDeadline).toLocaleDateString()}
            </div>
          </div>

          {/* Quick Facts */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Quick Facts</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
                <span className="text-sm text-gray-700">University Rank: #{scholarship.universityWorldRank}</span>
              </li>
              <li className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
                <span className="text-sm text-gray-700">Location: {scholarship.universityCity}, {scholarship.universityCountry}</span>
              </li>
              <li className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
                <span className="text-sm text-gray-700">Degree: {scholarship.degree}</span>
              </li>
              <li className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
                <span className="text-sm text-gray-700">Subject: {scholarship.subjectCategory}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Student Reviews</h3>
        
        {reviewsLoading && (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        {reviewsError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">Error loading reviews. Please try again later.</p>
              </div>
            </div>
          </div>
        )}
        
        {!reviewsLoading && !reviewsError && reviews.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          </div>
        )}
        
        {!reviewsLoading && !reviewsError && reviews.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
            }}
            className="w-full"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="border border-gray-200 p-6 rounded-xl shadow-sm h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <img
                      src={review.reviewerImage || "https://ui-avatars.com/api/?name=" + userNameFromEmail(review.userEmail)}
                      alt={review.userEmail || "Reviewer"}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-gray-800">
                        {userNameFromEmail(review.userEmail)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-700 flex-grow">
                    "{review.comment}"
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default ScholarshipDetails;