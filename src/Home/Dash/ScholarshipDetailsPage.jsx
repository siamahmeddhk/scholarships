import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ScholarshipDetailsPage = () => {
  const { id } = useParams();

  const { data: scholarship, isLoading, isError } = useQuery({
    queryKey: ['scholarship', id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/scholarships/${id}`);
      return res.data;
    }
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !scholarship) return <p>Error: Scholarship not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded shadow">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={scholarship.universityLogo}
            alt="Logo"
            className="w-16 h-16 object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold">{scholarship.universityName}</h1>
            <p className="text-sm text-gray-600">
              {scholarship.city}, {scholarship.country}
            </p>
          </div>
        </div>

        <p className="text-sm mb-2">
          <strong>Category:</strong> {scholarship.scholarshipCategory}
        </p>
        <p className="text-sm mb-2">
          <strong>Subject:</strong> {scholarship.subjectCategory}
        </p>
        <p className="text-sm mb-2">
          <strong>Degree:</strong> {scholarship.degree}
        </p>
        <p className="text-sm mb-2">
          <strong>Tuition Fees:</strong> ${scholarship.tuitionFees}
        </p>
        <p className="text-sm mb-2">
          <strong>Application Fees:</strong> ${scholarship.applicationFees}
        </p>
        <p className="text-sm mb-2">
          <strong>Service Charge:</strong> ${scholarship.serviceCharge}
        </p>
        <p className="text-sm mb-2">
          <strong>Stipend:</strong> {scholarship.stipend}
        </p>
        <p className="text-sm mb-2">
          <strong>Rating:</strong> {scholarship.rating} ⭐
        </p>
        <p className="text-sm mb-2">
          <strong>Deadline:</strong> {scholarship.applicationDeadline}
        </p>
        <p className="text-sm mb-2">
          <strong>Posted By:</strong> {scholarship.postedByEmail} (
          {scholarship.addedByRole})
        </p>
        <p className="text-sm mb-2">
          <strong>University Rank:</strong> {scholarship.universityRank}
        </p>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{scholarship.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetailsPage;
