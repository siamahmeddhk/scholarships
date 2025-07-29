import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const FeedbackSection = () => {
  const { user } = useAuthContext();
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      Swal.fire("Error", "Please write your feedback before submitting!", "error");
      return;
    }

    try {
      setLoading(true);

      const newFeedback = {
        userEmail: user?.email || "anonymous",
        userName: user?.displayName || "Guest User",
        feedback,
        rating,
        siteName: "ScholarNest",
        createdAt: new Date(),
      };

      const res = await axios.post("https://s-server-two.vercel.app/site-feedback", newFeedback);

      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: "Your feedback has been submitted.",
          showConfirmButton: false,
          timer: 1500,
        });
        setFeedback("");
        setRating(5);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Swal.fire("Error", "Failed to submit feedback.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-lg mx-auto bg-gradient-to-b from-indigo-900 to-indigo-700 p-6 rounded-2xl shadow-2xl mt-10 text-white"
    >
      <h2 className="text-3xl font-bold mb-4 text-center">We value your feedback!</h2>
      <p className="text-center text-gray-200 mb-6">
        Tell us how we can make <span className="font-semibold">ScholarNest</span> even better.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border border-indigo-300 bg-white text-black p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none resize-none"
          rows="4"
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <div>
          <label className="block mb-2 font-medium">Rate our site:</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                className={`px-3 py-2 rounded-full text-lg font-bold ${
                  rating === num ? "bg-yellow-400 text-black" : "bg-gray-300 text-black"
                } hover:scale-105 transition`}
                onClick={() => setRating(num)}
              >
                ⭐{num}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg shadow-md hover:bg-yellow-300 hover:scale-105 transition-transform"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </motion.div>
  );
};

export default FeedbackSection;
