// import { useParams } from 'react-router';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// const ScholarshipDetailsPage = () => {
//   const { id } = useParams();

//   const { data: scholarship, isLoading, isError } = useQuery({
//     queryKey: ['scholarship', id],
//     queryFn: async () => {
//       const res = await axios.get(`https://s-server-two.vercel.app/scholarships/${id}`);
//       return res.data;
//     }
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (isError || !scholarship) return <p>Error: Scholarship not found.</p>;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="bg-white p-6 rounded shadow">
//         <div className="flex items-center gap-4 mb-4">
//           <img
//             src={scholarship.universityLogo}
//             alt="Logo"
//             className="w-16 h-16 object-contain"
//           />
//           <div>
//             <h1 className="text-2xl font-bold">{scholarship.universityName}</h1>
//             <p className="text-sm text-gray-600">
//               {scholarship.city}, {scholarship.country}
//             </p>
//           </div>
//         </div>

//         <p className="text-sm mb-2">
//           <strong>Category:</strong> {scholarship.scholarshipCategory}
//         </p>
//         <p className="text-sm mb-2">
//           <strong>Subject:</strong> {scholarship.subjectCategory}
//         </p>
//         <p className="text-sm mb-2">
//           <strong>Degree:</strong> {scholarship.degree}
//         </p>
//         <p className="text-sm mb-2">
//           <strong>Tuition Fees:</strong> ${scholarship.tuitionFees}
//         </p>
//         <p className="text-sm mb-2">
//           <strong>Application Fees:</strong> ${scholarship.applicationFees}
//         </p>
//         <p className="text-sm mb-2">
//           <strong>Service Charge:</strong> ${scholarship.serviceCharge}
//         </p>
//         <p className="text-sm mb-2">
//           <strong>Stipend:</strong> {scholarship.stipend}
//         </p>
//         <p className="text-sm mb-2">
//           <strong>Rating:</strong> {scholarship.rating} ⭐
//         </p>
//         <p className="text-sm mb-2">
//           <strong>Deadline:</strong> {scholarship.applicationDeadline}
//         </p>
//         <p className="text-sm mb-2">
//           <strong>Posted By:</strong> {scholarship.postedByEmail} (
//           {scholarship.addedByRole})
//         </p>
//         <p className="text-sm mb-2">
//           <strong>University Rank:</strong> {scholarship.universityRank}
//         </p>

//         <div className="mt-6">
//           <h2 className="text-lg font-semibold mb-2">Description</h2>
//           <p className="text-gray-700">{scholarship.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScholarshipDetailsPage;



import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ScholarshipDetailsPage = () => {
  const { id } = useParams();

  const { data: scholarship, isLoading, isError } = useQuery({
    queryKey: ['scholarship', id],
    queryFn: async () => {
      const res = await axios.get(`https://s-server-two.vercel.app/scholarships/${id}`);
      return res.data;
    }
  });

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (isError || !scholarship) return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">Error: Scholarship not found or failed to load.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-shrink-0">
              <img
                src={scholarship.universityLogo}
                alt={`${scholarship.universityName} logo`}
                className="w-20 h-20 object-contain bg-white p-2 rounded-full"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{scholarship.universityName}</h1>
              <p className="text-lg opacity-90">
                {scholarship.city}, {scholarship.country}
              </p>
              <div className="mt-2 flex items-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-blue-800">
                  {scholarship.rating} ⭐
                </span>
                <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-blue-800">
                  Rank: #{scholarship.universityRank}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Scholarship Details */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{scholarship.scholarshipCategory} Scholarship</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Program Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Degree</p>
                      <p className="font-medium">{scholarship.degree}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Subject</p>
                      <p className="font-medium">{scholarship.subjectCategory}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Financial Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Tuition Fees</p>
                      <p className="font-medium">${scholarship.tuitionFees}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Application Fees</p>
                      <p className="font-medium">${scholarship.applicationFees}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Service Charge</p>
                      <p className="font-medium">${scholarship.serviceCharge}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Stipend</p>
                      <p className="font-medium">{scholarship.stipend || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Application Details</h3>
                  <div>
                    <p className="text-sm text-gray-500">Deadline</p>
                    <p className="font-medium text-red-600">{scholarship.applicationDeadline}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Description and Contact */}
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Scholarship Description</h3>
                <div className="prose max-w-none text-gray-600">
                  <p>{scholarship.description}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Posted By</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium">{scholarship.postedByEmail}</p>
                  <p className="text-sm text-gray-600">({scholarship.addedByRole})</p>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200">
                  Apply Now
                </button>
                <button className="w-full mt-3 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-4 rounded-lg transition duration-200">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetailsPage;