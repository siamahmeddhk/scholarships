


// pages/ScholarshipDetails.jsx
import { useParams, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
// import ReviewSlider from '../components/ReviewSlider';
import axios from 'axios';

const ScholarshipDetails = () => {
  const { id } = useParams();

const { data: scholarship, isLoading, isError } = useQuery({
  queryKey: ['scholarship', id],
  queryFn: async () => {
    const res = await axios.get(`http://localhost:5000/scholarships/${id}`);
    return res.data;
  }
});

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading scholarship</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{scholarship.universityName}</h1>
      <img src={scholarship.universityImage} className="w-32 my-4" />
      <p><b>Category:</b> {scholarship.scholarshipCategory}</p>
      <p><b>Location:</b> {scholarship.universityCity}, {scholarship.universityCountry}</p>
      <p><b>Subject:</b> {scholarship.subjectCategory}</p>
      <p><b>Deadline:</b> {new Date(scholarship.applicationDeadline).toLocaleDateString()}</p>
      <p><b>Stipend:</b> {scholarship.stipend || 'N/A'}</p>
      <p><b>Posted On:</b> {new Date(scholarship.postDate).toLocaleDateString()}</p>
      <p><b>Fees:</b> ${scholarship.applicationFees}</p>
      <p className="my-4">{scholarship.scholarshipDescription}</p>

      {/* <ReviewSlider reviews={scholarship.reviews} /> */}

      <Link to={`/apply/${scholarship._id}`}>
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded">Apply Scholarship</button>
      </Link>
    </div>
  );
};

export default ScholarshipDetails;
