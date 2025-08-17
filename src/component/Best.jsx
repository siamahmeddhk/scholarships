import React, { useState, useEffect } from 'react';
import { Star, Clock, Loader2 } from 'lucide-react';

const BestFeatures = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBestScholarships();
  }, []);

  const fetchBestScholarships = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://s-server-two.vercel.app/public-best-scholarships', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setScholarships(data);
      console.log('Fetched scholarships:', data.length);
    } catch (err) {
      console.error('Error fetching best scholarships:', err);
      setError(err.message);
      // Fallback to mock data if API fails
      setScholarships([
        {
          _id: 1,
          scholarshipName: "Tech Scholarship",
          universityName: "Stanford",
          scholarshipAmount: "15000",
          applicationDeadline: "2025-03-15"
        },
        {
          _id: 2,
          scholarshipName: "Engineering Grant",
          universityName: "MIT",
          scholarshipAmount: "20000",
          applicationDeadline: "2025-04-01"
        },
        {
          _id: 3,
          scholarshipName: "Science Award",
          universityName: "Harvard",
          scholarshipAmount: "12000",
          applicationDeadline: "2025-05-10"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (scholarshipId) => {
    // Navigate to scholarship details or application page
    window.location.href = `/scholarships/${scholarshipId}`;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin mr-2" size={24} />
          <span>Loading best scholarships...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        🎯 Best Scholarships For You
      </h1>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">
            ⚠️ Using sample data. {error}
          </p>
        </div>
      )}

      <div className="space-y-4">
        {scholarships.map((scholarship) => (
          <div key={scholarship._id || scholarship.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">{scholarship.scholarshipName}</h3>
                <p className="text-gray-600">{scholarship.universityName}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-600">
                  ${parseInt(scholarship.scholarshipAmount || 0).toLocaleString()}
                </p>
                <div className="flex items-center space-x-1">
                  <Star size={14} className="text-yellow-500 fill-current" />
                  <span className="text-sm">Good Match</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock size={14} />
                <span className="text-sm">Due: {scholarship.applicationDeadline}</span>
              </div>
              <button 
                onClick={() => handleApply(scholarship._id || scholarship.id)}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>

      {scholarships.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          No scholarships found. Try updating your profile for better matches.
        </div>
      )}

      <div className="text-center mt-8">
        <button 
          onClick={() => window.location.href = '/scholarships'}
          className="px-8 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
        >
          See More Scholarships
        </button>
      </div>
    </div>
  );
};

export default BestFeatures;