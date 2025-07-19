import { useState } from "react";

import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";

const AddReview = () => {
  const { user } = useAuthContext();
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      name: user.displayName,
      email: user.email,
      review,
    };

    try {
      const res = await axios.post("http://localhost:5000/reviews", reviewData);
      console.log(res.data);
      setReview("");
      alert("Review submitted successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full border p-2 rounded"
          rows="5"
          placeholder="Write your review here"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
