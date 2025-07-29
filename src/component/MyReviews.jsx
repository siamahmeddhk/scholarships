import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext";

const MyReviews = () => {
  const { user } = useAuthContext();
  const [myReviews, setMyReviews] = useState([]);

  // Fetch user reviews
  useEffect(() => {
    if (!user?.email) return;

    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `https://s-server-two.vercel.app/reviews?userEmail=${user.email}`
        );
        setMyReviews(res.data);
      } catch (error) {
        console.error("Fetch reviews error:", error);
      }
    };

    fetchReviews();
  }, [user?.email]);

  // Delete Review
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://s-server-two.vercel.app/reviews/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });

        setMyReviews((prev) => prev.filter((r) => r._id !== id));

        Swal.fire("Deleted!", "Your review has been deleted.", "success");
      } catch (error) {
        console.error("Delete review error:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  // Edit Review
  const handleEdit = async (id, currentComment, currentRating) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Review",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="New comment" value="${currentComment}" />
        <input id="swal-input2" class="swal2-input" type="number" min="1" max="5" placeholder="New rating (1-5)" value="${currentRating}" />
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const comment = document.getElementById("swal-input1").value;
        const rating = parseInt(document.getElementById("swal-input2").value);
        if (!comment || isNaN(rating) || rating < 1 || rating > 5) {
          Swal.showValidationMessage("Please enter valid comment and rating (1-5)");
          return;
        }
        return { comment, rating };
      },
    });

    if (formValues) {
      try {
        await axios.put(
          `https://s-server-two.vercel.app/reviews/${id}`,
          {
            comment: formValues.comment,
            rating: formValues.rating,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        );

        setMyReviews((prev) =>
          prev.map((r) =>
            r._id === id
              ? { ...r, comment: formValues.comment, rating: formValues.rating }
              : r
          )
        );

        Swal.fire("Updated!", "Your review has been updated.", "success");
      } catch (error) {
        console.error("Update review error:", error);
        Swal.fire("Error!", "Failed to update review.", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Reviews</h2>
      {myReviews.length === 0 ? (
        <p className="text-gray-600">No reviews found.</p>
      ) : (
        myReviews.map((review) => (
          <div
            key={review._id}
            className="border p-4 mb-3 rounded shadow bg-white"
          >
            <p>
              <strong>Scholarship:</strong> {review.scholarshipName}
            </p>
            <p>
              <strong>University:</strong> {review.universityName}
            </p>
            <p>
              <strong>Rating:</strong> {review.rating} ⭐
            </p>
            <p>
              <strong>Comment:</strong> {review.comment}
            </p>
            <div className="mt-3 space-x-2">
              <button
                onClick={() =>
                  handleEdit(review._id, review.comment, review.rating)
                }
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(review._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyReviews;
