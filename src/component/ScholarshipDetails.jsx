
import { useParams, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ScholarshipDetails = () => {
  const { id } = useParams();

  // Fetch scholarship details
  const { data: scholarship, isLoading, isError } = useQuery({
    queryKey: ['scholarship', id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/scholarships/${id}`);
      return res.data;
    },
  });

  // Fetch reviews for this scholarship
  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/reviews?scholarshipId=${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading scholarship...</p>;
  if (isError) return <p>Error loading scholarship</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{scholarship.universityName}</h1>
      <img src={scholarship.universityImage} className="w-32 my-4" alt="University Logo" />
      <p><b>Category:</b> {scholarship.scholarshipCategory}</p>
      <p><b>Location:</b> {scholarship.universityCity}, {scholarship.universityCountry}</p>
      <p><b>Subject:</b> {scholarship.subjectCategory}</p>
      <p><b>Deadline:</b> {new Date(scholarship.applicationDeadline).toLocaleDateString()}</p>
      <p><b>Stipend:</b> {scholarship.stipend || 'N/A'}</p>
      <p><b>Posted On:</b> {new Date(scholarship.postDate).toLocaleDateString()}</p>
      <p><b>Fees:</b> ${scholarship.applicationFees}</p>
      <p className="my-4">{scholarship.scholarshipDescription}</p>

      <Link to={`/apply/${scholarship._id}`}>
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded">Apply Scholarship</button>
      </Link>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

        {reviewsLoading && <p>Loading reviews...</p>}
        {reviewsError && <p>Error loading reviews</p>}

        {!reviewsLoading && !reviewsError && reviews.length === 0 && (
          <p>No reviews yet.</p>
        )}

        {!reviewsLoading && !reviewsError && reviews.length > 0 && (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border p-4 rounded shadow-sm">
                <p>
                  <strong>{review.userEmail}</strong> — Rating: {review.rating}/5
                </p>
                <p>{review.comment}</p>
                <p className="text-xs text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipDetails;
