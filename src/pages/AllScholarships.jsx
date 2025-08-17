// import React, { useState } from 'react';
// import { useScholarships } from '../hook/useScholarships';
// import { useNavigate } from 'react-router';
// import { useAuthContext } from '../context/AuthContext';

// const AllScholarships = () => {
//   const [search, setSearch] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const scholarshipsPerPage = 6;

//   const { data: scholarships, isLoading, isError, error } = useScholarships(search);
//   const { user } = useAuthContext();
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setCurrentPage(1); // Reset to first page when search changes
//   };

//   const handleDetailsClick = (id) => {
//     if (!user) {
//       navigate('/register');
//     } else {
//       navigate(`/scholarship/${id}`);
//     }
//   };

//   // ✅ Remove duplicates based on _id
//   const uniqueScholarships = scholarships
//     ? Array.from(new Map(scholarships.map(s => [s._id, s])).values())
//     : [];

//   // ✅ Pagination logic
//   const indexOfLast = currentPage * scholarshipsPerPage;
//   const indexOfFirst = indexOfLast - scholarshipsPerPage;
//   const currentScholarships = uniqueScholarships.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(uniqueScholarships.length / scholarshipsPerPage);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">All Scholarships</h1>

//       <form onSubmit={handleSearch} className="mb-6">
//         <input
//           type="text"
//           placeholder="Search by scholarship, university, or degree"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border p-2 rounded w-80"
//         />
//         <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//           Search
//         </button>
//       </form>

//       {isLoading && <p>Loading scholarships...</p>}
//       {isError && <p>Error: {error.message}</p>}
//       {!isLoading && uniqueScholarships.length === 0 && (
//         <p>No scholarships found for "{search}"</p>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {currentScholarships.map((scholarship) => (
//           <div key={scholarship._id} className="border p-4 rounded shadow">
//             <img
//               src={scholarship.universityImage || 'default-logo.png'}
//               alt={scholarship.universityName}
//               className="h-24 w-24 object-contain mx-auto"
//             />
//             <h3 className="text-xl font-semibold mt-2">{scholarship.universityName}</h3>
//             <p>Category: {scholarship.scholarshipCategory}</p>
//             <p>
//               Location: {scholarship.universityCity}, {scholarship.universityCountry}
//             </p>
//             <p>Application Deadline: {new Date(scholarship.applicationDeadline).toLocaleDateString()}</p>
//             <p>Application Fees: ${scholarship.applicationFees}</p>
//             <button
//               onClick={() => handleDetailsClick(scholarship._id)}
//               className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Details
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* ✅ Pagination controls */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-8 space-x-2 flex-wrap">
//           {[...Array(totalPages).keys()].map((number) => (
//             <button
//               key={number + 1}
//               onClick={() => setCurrentPage(number + 1)}
//               className={`px-4 py-2 rounded ${
//                 currentPage === number + 1
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-200 text-black hover:bg-blue-100'
//               }`}
//             >
//               {number + 1}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllScholarships;



// import React, { useState } from 'react';
// import { useScholarships } from '../hook/useScholarships';
// import { useNavigate } from 'react-router';
// import { useAuthContext } from '../context/AuthContext';

// const AllScholarships = () => {
//   const [search, setSearch] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const scholarshipsPerPage = 6;

//   const { data: scholarships, isLoading, isError, error } = useScholarships(search);
//   const { user } = useAuthContext();
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setCurrentPage(1);
//   };

//   const handleDetailsClick = (id) => {
//     if (!user) {
//       navigate('/register');
//     } else {
//       navigate(`/scholarship/${id}`);
//     }
//   };

//   // ✅ Remove duplicates
//   const uniqueScholarships = scholarships
//     ? Array.from(new Map(scholarships.map(s => [s._id, s])).values())
//     : [];

//   // ✅ Pagination
//   const indexOfLast = currentPage * scholarshipsPerPage;
//   const indexOfFirst = indexOfLast - scholarshipsPerPage;
//   const currentScholarships = uniqueScholarships.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(uniqueScholarships.length / scholarshipsPerPage);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6 text-indigo-700">
//         All Scholarships
//       </h1>

//       {/* 🔍 Search */}
//       <form onSubmit={handleSearch} className="mb-6 flex items-center gap-3">
//         <input
//           type="text"
//           placeholder="Search by scholarship, university, or degree"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border border-gray-300 p-2 rounded-lg w-80 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md transition"
//         >
//           Search
//         </button>
//       </form>

//       {isLoading && <p>Loading scholarships...</p>}
//       {isError && <p className="text-red-600">Error: {error.message}</p>}
//       {!isLoading && uniqueScholarships.length === 0 && (
//         <p>No scholarships found for "{search}"</p>
//       )}

//       {/* 🎓 Scholarship Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {currentScholarships.map((scholarship) => (
//           <div
//             key={scholarship._id}
//             className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300"
//           >
//             {/* Logo */}
//             <div className="flex justify-center mb-4">
//               <img
//                 src={scholarship.universityImage || 'default-logo.png'}
//                 alt={scholarship.universityName}
//                 className="h-20 w-20 object-contain rounded-full border border-gray-200 shadow-sm"
//               />
//             </div>

//             {/* Title */}
//             <h3 className="text-xl font-bold text-gray-800 text-center">
//               {scholarship.universityName}
//             </h3>

//             {/* Category Badge */}
//             <p className="text-center mt-1">
//               <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700 font-medium">
//                 {scholarship.scholarshipCategory}
//               </span>
//             </p>

//             {/* Info */}
//             <div className="mt-4 space-y-2 text-sm text-gray-600">
//               <p>
//                 <span className="font-medium text-gray-700">📍 Location:</span>{' '}
//                 {scholarship.universityCity}, {scholarship.universityCountry}
//               </p>
//               <p>
//                 <span className="font-medium text-gray-700">🗓 Deadline:</span>{' '}
//                 <span className="text-red-600 font-semibold">
//                   {new Date(scholarship.applicationDeadline).toLocaleDateString()}
//                 </span>
//               </p>
//               <p>
//                 <span className="font-medium text-gray-700">💰 Fees:</span> $
//                 {scholarship.applicationFees}
//               </p>
//             </div>

//             {/* CTA */}
//             <button
//               onClick={() => handleDetailsClick(scholarship._id)}
//               className="mt-5 w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow-md hover:shadow-xl transition"
//             >
//               View Details
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* 📑 Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-8 space-x-2 flex-wrap">
//           {[...Array(totalPages).keys()].map((number) => (
//             <button
//               key={number + 1}
//               onClick={() => setCurrentPage(number + 1)}
//               className={`px-4 py-2 rounded-lg font-medium transition ${
//                 currentPage === number + 1
//                   ? 'bg-indigo-600 text-white shadow-md'
//                   : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'
//               }`}
//             >
//               {number + 1}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllScholarships;


import React, { useState } from 'react';
import { useScholarships } from '../hook/useScholarships';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../context/AuthContext';

const AllScholarships = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('default');
  const scholarshipsPerPage = 6;

  const { data: scholarships, isLoading, isError, error } = useScholarships(search);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleDetailsClick = (id) => {
    if (!user) {
      navigate('/register');
    } else {
      navigate(`/scholarship/${id}`);
    }
  };

  // ✅ Remove duplicates
  const uniqueScholarships = scholarships
    ? Array.from(new Map(scholarships.map(s => [s._id, s])).values())
    : [];

  // ✅ Sorting functionality
  const getSortedScholarships = () => {
    if (!uniqueScholarships) return [];
    
    const scholarshipsCopy = [...uniqueScholarships];
    
    switch (sortOption) {
      case 'deadline-asc':
        return scholarshipsCopy.sort((a, b) => new Date(a.applicationDeadline) - new Date(b.applicationDeadline));
      case 'deadline-desc':
        return scholarshipsCopy.sort((a, b) => new Date(b.applicationDeadline) - new Date(a.applicationDeadline));
      case 'fees-asc':
        return scholarshipsCopy.sort((a, b) => a.applicationFees - b.applicationFees);
      case 'fees-desc':
        return scholarshipsCopy.sort((a, b) => b.applicationFees - a.applicationFees);
      case 'name-asc':
        return scholarshipsCopy.sort((a, b) => a.universityName.localeCompare(b.universityName));
      case 'name-desc':
        return scholarshipsCopy.sort((a, b) => b.universityName.localeCompare(a.universityName));
      default:
        return scholarshipsCopy;
    }
  };

  const sortedScholarships = getSortedScholarships();

  // ✅ Pagination
  const indexOfLast = currentPage * scholarshipsPerPage;
  const indexOfFirst = indexOfLast - scholarshipsPerPage;
  const currentScholarships = sortedScholarships.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedScholarships.length / scholarshipsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        All Scholarships
      </h1>

      {/* 🔍 Search and Sort */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex items-center gap-3 flex-1">
          <input
            type="text"
            placeholder="Search by scholarship, university, or degree"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full max-w-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md transition whitespace-nowrap"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-gray-700 font-medium whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="default">Default</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="deadline-asc">Deadline (Earliest)</option>
            <option value="deadline-desc">Deadline (Latest)</option>
            <option value="fees-asc">Fees (Lowest)</option>
            <option value="fees-desc">Fees (Highest)</option>
          </select>
        </div>
      </div>

      {isLoading && <p>Loading scholarships...</p>}
      {isError && <p className="text-red-600">Error: {error.message}</p>}
      {!isLoading && uniqueScholarships.length === 0 && (
        <p>No scholarships found for "{search}"</p>
      )}

      {/* 🎓 Scholarship Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentScholarships.map((scholarship) => (
          <div
            key={scholarship._id}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300"
          >
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <img
                src={scholarship.universityImage || 'default-logo.png'}
                alt={scholarship.universityName}
                className="h-20 w-20 object-contain rounded-full border border-gray-200 shadow-sm"
              />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800 text-center">
              {scholarship.universityName}
            </h3>

            {/* Category Badge */}
            <p className="text-center mt-1">
              <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700 font-medium">
                {scholarship.scholarshipCategory}
              </span>
            </p>

            {/* Info */}
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-700">📍 Location:</span>{' '}
                {scholarship.universityCity}, {scholarship.universityCountry}
              </p>
              <p>
                <span className="font-medium text-gray-700">🗓 Deadline:</span>{' '}
                <span className="text-red-600 font-semibold">
                  {new Date(scholarship.applicationDeadline).toLocaleDateString()}
                </span>
              </p>
              <p>
                <span className="font-medium text-gray-700">💰 Fees:</span> $
                {scholarship.applicationFees}
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={() => handleDetailsClick(scholarship._id)}
              className="mt-5 w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow-md hover:shadow-xl transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* 📑 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2 flex-wrap">
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => setCurrentPage(number + 1)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentPage === number + 1
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'
              }`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllScholarships;