import React, { useState } from 'react';
import { useScholarships } from '../hook/useScholarships';
import { Link, useNavigate } from 'react-router';
import { useAuthContext } from '../context/AuthContext'; // update path as needed

const AllScholarships = () => {
  const [search, setSearch] = useState('');
  const { data: scholarships, isLoading, isError, error } = useScholarships(search);
  const { user } = useAuthContext(); // ✅ get logged-in user
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleDetailsClick = (id) => {
    if (user) {
      navigate(`/scholarship/${id}`);
    } else {
      navigate('/register');
    }
  };

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
      {!isLoading && scholarships && scholarships.length === 0 && (
        <p>No scholarships found for "{search}"</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scholarships?.map((scholarship) => (
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

            {/* ✅ Button handles redirect based on user status */}
            <button
              onClick={() => handleDetailsClick(scholarship._id)}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllScholarships;
