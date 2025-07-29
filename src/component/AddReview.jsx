import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthContext } from "../../context/AuthContext";

const AddReview = ({ application, scholarshipDetails, onClose }) => {
  const { user } = useAuthContext();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comment) {
      Swal.fire("Warning", "Please add a comment", "warning");
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://s-server-two.vercel.app/reviews", {
        userEmail: user.email,
        scholarshipId: scholarshipDetails._id, // ✅ only ID
        applicationId: application._id,
        rating,
        comment,
      });

      Swal.fire("Success", "Review submitted successfully", "success");
      onClose(true);
    } catch (error) {
      Swal.fire("Error", "Failed to submit review", "error");
    }
    setLoading(false);
  };

  return (
    <div>
      <label className="block mb-2">
        Rating:
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="ml-2 p-1 border rounded"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        Comment:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
        />
      </label>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
};

export default AddReview;
