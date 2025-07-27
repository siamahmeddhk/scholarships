import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ModeratorReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all reviews (no filters for moderator)
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/reviews"); // ✅ Fetch all reviews
      console.log("Fetched reviews:", res.data); // Debug log
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      Swal.fire("Error", "Failed to load reviews", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle Delete review
  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/reviews/${id}`);
        Swal.fire("Deleted!", "Review has been deleted.", "success");
        fetchReviews(); // ✅ Refresh after deletion
      } catch (error) {
        console.error("Error deleting review:", error);
        Swal.fire("Error", "Failed to delete review", "error");
      }
    }
  };

  // UI: Loading state
  if (loading) return <p className="text-center mt-10">Loading reviews...</p>;

  // UI: No reviews
  if (reviews.length === 0)
    return <p className="text-center mt-10">No reviews found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        All Reviews (Moderator)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="border rounded-lg p-4 shadow-md flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {review.universityName || "N/A"}
              </h3>
              <p className="text-sm italic mb-2">
                Subject Category: {review.subjectCategory || "N/A"}
              </p>

              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={review.reviewerImage || "https://via.placeholder.com/40"}
                  alt={review.userEmail || "Reviewer"}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{review.userEmail || "Anonymous"}</p>
                  <p className="text-xs text-gray-500">
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              <p className="mb-2">
                <strong>Rating:</strong> {review.rating} / 5
              </p>

              <p className="text-gray-700">{review.comment}</p>
            </div>

            <button
              onClick={() => handleDelete(review._id)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModeratorReviews;
