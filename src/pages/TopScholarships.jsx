import React from 'react';
import { useTopScholarships } from '../hook/useTopScholarships';

const TopScholarships = () => {
  const { data: scholarships, isLoading, isError, error } = useTopScholarships();

  if (isLoading) return <div className="text-center py-10">Loading scholarships...</div>;
  if (isError) return <div className="text-center text-red-500 py-10">Error: {error.message}</div>;

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">🎓 Top Scholarships</h2>
        <p className="mt-2 text-gray-600">
          Explore the best funding opportunities with low application fees and recent updates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {scholarships.map((scholarship) => (
          <div
            key={scholarship._id}
            className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white p-6 flex flex-col justify-between"
          >
            <div className="flex flex-col items-center text-center">
              <img
                src={scholarship.universityImage || 'default-logo.png'}
                alt={scholarship.universityName}
                className="h-24 w-24 object-contain mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">{scholarship.universityName}</h3>
              <p className="text-sm text-blue-600 mb-2">{scholarship.scholarshipCategory}</p>
              <p className="text-gray-500">
                📍 {scholarship.universityCity}, {scholarship.universityCountry}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                🗓 Deadline: {new Date(scholarship.applicationDeadline).toLocaleDateString()}
              </p>
              <p className="mt-1 font-medium text-green-600">
                💵 Application Fees: ${scholarship.applicationFees}
              </p>
            </div>

            <button className="mt-5 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopScholarships;
