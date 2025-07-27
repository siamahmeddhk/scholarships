// import { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useAuthContext } from "../context/AuthContext";


// const EditReviewModal = ({ review, onClose, onUpdate }) => {
//   const [rating, setRating] = useState(review.rating);
//   const [comment, setComment] = useState(review.comment);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!comment) {
//       Swal.fire("Warning", "Comment cannot be empty", "warning");
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.put(`http://localhost:5000/reviews/${review._id}`, {
//         rating,
//         comment,
//       });
//       Swal.fire("Success", "Review updated successfully", "success");
//       onUpdate();
//       onClose();
//     } catch (error) {
//       Swal.fire("Error", "Failed to update review", "error");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//       <div className="bg-white rounded p-6 max-w-md w-full relative">
//         <button
//           className="absolute top-2 right-2 text-gray-700 text-xl font-bold"
//           onClick={onClose}
//           aria-label="Close modal"
//         >
//           ✕
//         </button>
//         <h3 className="text-xl font-semibold mb-4">Edit Review</h3>

//         <label className="block mb-2">
//           Rating:
//           <select
//             value={rating}
//             onChange={(e) => setRating(Number(e.target.value))}
//             className="ml-2 p-1 border rounded"
//           >
//             {[5, 4, 3, 2, 1].map((r) => (
//               <option key={r} value={r}>
//                 {r}
//               </option>
//             ))}
//           </select>
//         </label>

//         <label className="block mb-4">
//           Comment:
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             className="w-full p-2 border rounded"
//             rows={4}
//             placeholder="Update your review"
//           />
//         </label>

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {loading ? "Updating..." : "Update Review"}
//         </button>
//       </div>
//     </div>
//   );
// };

// const MyReviews = () => {
//   const { user } = useAuthContext();
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedReview, setSelectedReview] = useState(null);

//   const fetchReviews = async () => {
//     if (!user?.email) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/reviews?userEmail=${encodeURIComponent(user.email)}`
//       );
//       setReviews(res.data);
//     } catch (error) {
//       Swal.fire("Error", "Failed to fetch your reviews", "error");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, [user]);

//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to delete this review?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await axios.delete(`http://localhost:5000/reviews/${id}`);
//         setReviews((prev) => prev.filter((rev) => rev._id !== id));
//         Swal.fire("Deleted!", "Your review has been deleted.", "success");
//       } catch (error) {
//         Swal.fire("Error", "Failed to delete review", "error");
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6 text-center">My Reviews</h2>

//       {loading ? (
//         <p>Loading your reviews...</p>
//       ) : reviews.length === 0 ? (
//         <p className="text-center">You have not submitted any reviews yet.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table w-full border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200 text-left">
//                 <th className="p-2">Scholarship Name</th>
//                 <th className="p-2">University Name</th>
//                 <th className="p-2">Review Comment</th>
//                 <th className="p-2">Review Date</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reviews.map((rev) => (
//                 <tr key={rev._id} className="border-t">
//                   <td className="p-2">{rev.scholarshipName}</td>
//                   <td className="p-2">{rev.universityName}</td>
//                   <td className="p-2 max-w-xs truncate" title={rev.comment}>
//                     {rev.comment}
//                   </td>
//                   <td className="p-2">
//                     {new Date(rev.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="p-2 space-x-2">
//                     <button
//                       onClick={() => setSelectedReview(rev)}
//                       className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(rev._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded text-xs"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {selectedReview && (
//         <EditReviewModal
//           review={selectedReview}
//           onClose={() => setSelectedReview(null)}
//           onUpdate={fetchReviews}
//         />
//       )}
//     </div>
//   );
// };

// export default MyReviews;




// import { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useAuthContext } from "../context/AuthContext";

// const EditReviewModal = ({ review, onClose, onUpdate }) => {
//   const [rating, setRating] = useState(review.rating);
//   const [comment, setComment] = useState(review.comment);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!comment.trim()) {
//       Swal.fire("Warning", "Comment cannot be empty", "warning");
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.put(`http://localhost:5000/reviews/${review._id}`, {
//         rating,
//         comment,
//       });
//       Swal.fire("Success", "Review updated successfully", "success");
//       onUpdate();
//       onClose();
//     } catch (error) {
//       Swal.fire("Error", "Failed to update review", "error");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//       <div className="bg-white rounded p-6 max-w-md w-full relative">
//         <button
//           className="absolute top-2 right-2 text-gray-700 text-xl font-bold"
//           onClick={onClose}
//         >
//           ✕
//         </button>
//         <h3 className="text-xl font-semibold mb-4">Edit Review</h3>

//         <label className="block mb-2">
//           Rating:
//           <select
//             value={rating}
//             onChange={(e) => setRating(Number(e.target.value))}
//             className="ml-2 p-1 border rounded"
//           >
//             {[5, 4, 3, 2, 1].map((r) => (
//               <option key={r} value={r}>
//                 {r}
//               </option>
//             ))}
//           </select>
//         </label>

//         <label className="block mb-4">
//           Comment:
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             className="w-full p-2 border rounded"
//             rows={4}
//             placeholder="Update your review"
//           />
//         </label>

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {loading ? "Updating..." : "Update Review"}
//         </button>
//       </div>
//     </div>
//   );
// };

// const MyReviews = () => {
//   const { user } = useAuthContext();
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedReview, setSelectedReview] = useState(null);

//   const fetchReviews = async () => {
//     if (!user?.email) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/reviews?userEmail=${encodeURIComponent(
//           user.email
//         )}`
//       );
//       setReviews(res.data);
//     } catch (error) {
//       Swal.fire("Error", "Failed to fetch your reviews", "error");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, [user]);

//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to delete this review?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await axios.delete(`http://localhost:5000/reviews/${id}`);
//         setReviews((prev) => prev.filter((rev) => rev._id !== id));
//         Swal.fire("Deleted!", "Your review has been deleted.", "success");
//       } catch (error) {
//         Swal.fire("Error", "Failed to delete review", "error");
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6 text-center">My Reviews</h2>

//       {loading ? (
//         <p>Loading your reviews...</p>
//       ) : reviews.length === 0 ? (
//         <p className="text-center">You have not submitted any reviews yet.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table w-full border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200 text-left">
//                 <th className="p-2">Scholarship Name</th>
//                 <th className="p-2">University Name</th>
//                 <th className="p-2">Review Comment</th>
//                 <th className="p-2">Review Date</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reviews.map((rev) => (
//                 <tr key={rev._id} className="border-t">
//                   <td className="p-2">{rev.scholarshipName}</td>
//                   <td className="p-2">{rev.universityName}</td>
//                   <td className="p-2 max-w-xs truncate" title={rev.comment}>
//                     {rev.comment}
//                   </td>
//                   <td className="p-2">
//                     {new Date(rev.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="p-2 space-x-2">
//                     <button
//                       onClick={() => setSelectedReview(rev)}
//                       className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(rev._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded text-xs"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {selectedReview && (
//         <EditReviewModal
//           review={selectedReview}
//           onClose={() => setSelectedReview(null)}
//           onUpdate={fetchReviews}
//         />
//       )}
//     </div>
//   );
// };

// export default MyReviews;







import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext";

const EditReviewModal = ({ review, onClose, onUpdate }) => {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      Swal.fire("Warning", "Comment cannot be empty", "warning");
      return;
    }
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/reviews/${review._id}`, {
        rating,
        comment,
      });
      Swal.fire("Success", "Review updated successfully", "success");
      onUpdate();
      onClose();
    } catch (error) {
      Swal.fire("Error", "Failed to update review", "error");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded p-6 max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-700 text-xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-xl font-semibold mb-4">Edit Review</h3>

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
            placeholder="Update your review"
          />
        </label>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Updating..." : "Update Review"}
        </button>
      </div>
    </div>
  );
};

const MyReviews = () => {
  const { user } = useAuthContext();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);

  const fetchReviews = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/reviews?userEmail=${encodeURIComponent(user.email)}`
      );
      setReviews(res.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch your reviews", "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/reviews/${id}`);
        setReviews((prev) => prev.filter((rev) => rev._id !== id));
        Swal.fire("Deleted!", "Your review has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete review", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">My Reviews</h2>

      {loading ? (
        <p>Loading your reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center">You have not submitted any reviews yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Scholarship Name</th>
                <th className="p-2">University Name</th>
                <th className="p-2">Review Comment</th>
                <th className="p-2">Review Date</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((rev) => (
                <tr key={rev._id} className="border-t">
                  <td className="p-2">{rev.scholarshipName || "N/A"}</td>
                  <td className="p-2">{rev.universityName || "N/A"}</td>
                  <td className="p-2 max-w-xs truncate" title={rev.comment}>
                    {rev.comment}
                  </td>
                  <td className="p-2">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => setSelectedReview(rev)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(rev._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedReview && (
        <EditReviewModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
          onUpdate={fetchReviews}
        />
      )}
    </div>
  );
};

export default MyReviews;
