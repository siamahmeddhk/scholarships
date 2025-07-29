import React, { useState } from 'react';
import { useScholarships } from '../hook/useScholarships';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../context/AuthContext';

const AllScholarships = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const scholarshipsPerPage = 6;

  const { data: scholarships, isLoading, isError, error } = useScholarships(search);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleDetailsClick = (id) => {
    if (!user) {
      navigate('/register');
    } else {
      navigate(`/scholarship/${id}`);
    }
  };

  // ✅ Remove duplicates based on _id
  const uniqueScholarships = scholarships
    ? Array.from(new Map(scholarships.map(s => [s._id, s])).values())
    : [];

  // ✅ Pagination logic
  const indexOfLast = currentPage * scholarshipsPerPage;
  const indexOfFirst = indexOfLast - scholarshipsPerPage;
  const currentScholarships = uniqueScholarships.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(uniqueScholarships.length / scholarshipsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Scholarships</h1>

      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          placeholder="Search by scholarship, university, or degree"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-80"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Search
        </button>
      </form>

      {isLoading && <p>Loading scholarships...</p>}
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && uniqueScholarships.length === 0 && (
        <p>No scholarships found for "{search}"</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentScholarships.map((scholarship) => (
          <div key={scholarship._id} className="border p-4 rounded shadow">
            <img
              src={scholarship.universityImage || 'default-logo.png'}
              alt={scholarship.universityName}
              className="h-24 w-24 object-contain mx-auto"
            />
            <h3 className="text-xl font-semibold mt-2">{scholarship.universityName}</h3>
            <p>Category: {scholarship.scholarshipCategory}</p>
            <p>
              Location: {scholarship.universityCity}, {scholarship.universityCountry}
            </p>
            <p>Application Deadline: {new Date(scholarship.applicationDeadline).toLocaleDateString()}</p>
            <p>Application Fees: ${scholarship.applicationFees}</p>
            <button
              onClick={() => handleDetailsClick(scholarship._id)}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Details
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2 flex-wrap">
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => setCurrentPage(number + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === number + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-black hover:bg-blue-100'
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
