import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Trash2,
  Star,
  User,
  Calendar,
  GraduationCap,
  AlertTriangle,
} from "lucide-react";
import { getAuth } from "firebase/auth";

const AdminReview = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    filterAndSortReviews();
  }, [reviews, searchTerm, filterRating, sortBy]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://s-server-two.vercel.app/reviews");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReviews(data);
      setError("");
    } catch (err) {
      setError(
        "Failed to fetch reviews. Please check your connection and try again."
      );
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortReviews = () => {
    let filtered = reviews.filter((review) => {
      const matchesSearch =
        review.scholarshipName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.universityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRating =
        filterRating === "all" || review.rating === parseInt(filterRating);

      return matchesSearch && matchesRating;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "highest-rating":
          return b.rating - a.rating;
        case "lowest-rating":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    setFilteredReviews(filtered);
  };

  const handleDeleteClick = (review) => {
    setDeleteTarget(review);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const token = await user.getIdToken();

      const response = await fetch(
        `https://s-server-two.vercel.app/reviews/${deleteTarget._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setReviews((prev) => prev.filter((r) => r._id !== deleteTarget._id));
      setShowDeleteModal(false);
      setDeleteTarget(null);
      showSuccessMessage("Review deleted successfully!");
    } catch (err) {
      console.error("Error deleting review:", err);
      showErrorMessage("Failed to delete the review. Please try again.");
    }
  };

  const handleBulkDeleteClick = () => {
    if (filteredReviews.length === 0) return;
    setShowBulkDeleteModal(true);
  };

  const handleBulkDeleteConfirm = async () => {
    if (filteredReviews.length === 0) return;

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const token = await user.getIdToken();

      const deletePromises = filteredReviews.map((review) =>
        fetch(`https://s-server-two.vercel.app/reviews/${review._id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

      const results = await Promise.allSettled(deletePromises);
      const failedDeletes = results.filter(
        (result) => result.status === "rejected"
      );

      if (failedDeletes.length > 0) {
        throw new Error(`${failedDeletes.length} deletions failed`);
      }

      const deletedIds = filteredReviews.map((r) => r._id);
      setReviews((prev) => prev.filter((r) => !deletedIds.includes(r._id)));
      setShowBulkDeleteModal(false);
      showSuccessMessage(`${filteredReviews.length} review(s) deleted successfully!`);
    } catch (err) {
      console.error("Error bulk deleting reviews:", err);
      showErrorMessage("Failed to delete some reviews. Please try again.");
    }
  };

  const showSuccessMessage = (message) => {
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  const showErrorMessage = (message) => {
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 5000);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  const DeleteModal = ({ show, onClose, onConfirm, review }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
          </div>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this review for "{review?.scholarshipName}"? This action cannot be undone.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  const BulkDeleteModal = ({ show, onClose, onConfirm, count }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Bulk Delete Confirmation</h3>
          </div>
          <p className="text-gray-600 mb-6">
            This will permanently delete <strong>{count}</strong> review(s). This action cannot be undone.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete {count} Review(s)
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-lg text-gray-600">Loading reviews...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={fetchReviews}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-2">Review Management</h2>
        <p className="text-gray-600">Manage and moderate all scholarship reviews</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Rating Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest-rating">Highest Rating</option>
            <option value="lowest-rating">Lowest Rating</option>
          </select>

          {/* Bulk Delete */}
          {filteredReviews.length > 0 && (
            <button
              onClick={handleBulkDeleteClick}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium flex items-center justify-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete All ({filteredReviews.length})
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-600 font-medium">Total Reviews</p>
          <p className="text-2xl font-bold text-blue-700">{reviews.length}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-600 font-medium">Showing</p>
          <p className="text-2xl font-bold text-green-700">{filteredReviews.length}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-600 font-medium">Average Rating</p>
          <p className="text-2xl font-bold text-yellow-700">
            {reviews.length > 0
              ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
              : "0.0"}
          </p>
        </div>
      </div>

      {/* Reviews Grid */}
      {filteredReviews.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <User className="w-16 h-16 mx-auto" />
          </div>
          <p className="text-lg text-gray-600 mb-2">No reviews found</p>
          <p className="text-gray-500">
            {searchTerm || filterRating !== "all"
              ? "Try adjusting your search or filter criteria"
              : "No reviews have been submitted yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  {review.reviewerImage ? (
                    <img
                      src={review.reviewerImage}
                      alt="Reviewer"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-indigo-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm truncate">
                    {review.userEmail}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Scholarship Info */}
              <div className="mb-4">
                <h3 className="font-bold text-lg text-indigo-600 mb-1 line-clamp-2">
                  {review.scholarshipName}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  <span className="truncate">{review.universityName}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-4">{renderStars(review.rating)}</div>

              {/* Comment */}
              <div className="mb-6">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {review.comment.length > 150
                    ? `${review.comment.slice(0, 150)}...`
                    : review.comment}
                </p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteClick(review)}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-300 font-medium flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Review
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <DeleteModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleDeleteConfirm}
        review={deleteTarget}
      />

      <BulkDeleteModal
        show={showBulkDeleteModal}
        onClose={() => setShowBulkDeleteModal(false)}
        onConfirm={handleBulkDeleteConfirm}
        count={filteredReviews.length}
      />
    </div>
  );
};

export default AdminReview;
