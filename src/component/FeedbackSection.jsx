


import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

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

      const res = await axios.post(
        "https://s-server-two.vercel.app/site-feedback",
        newFeedback
      );

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
      className="max-w-xl mx-auto mt-16 bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-700">
          ✨ We Value Your Feedback!
        </h2>
        <p className="text-gray-600 mt-2">
          Help us make <span className="font-semibold text-indigo-600">ScholarNest</span> even better for students worldwide 🌍
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Textarea */}
        <textarea
          className="w-full border border-gray-300 bg-gray-50 text-gray-800 p-4 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none"
          rows="4"
          placeholder="Share your thoughts..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        {/* Rating */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Rate our site:
          </label>
          <div className="flex gap-3 justify-center">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                className={`w-12 h-12 flex items-center justify-center rounded-full shadow-md transition-all ${
                  rating === num
                    ? "bg-yellow-400 text-black scale-110"
                    : "bg-gray-200 text-gray-600 hover:bg-yellow-200"
                }`}
                onClick={() => setRating(num)}
              >
                <Star
                  className={`w-5 h-5 ${
                    rating >= num ? "fill-yellow-500 text-yellow-500" : ""
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md hover:shadow-xl transition-transform hover:scale-105"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </motion.div>
  );
};

export default FeedbackSection;
