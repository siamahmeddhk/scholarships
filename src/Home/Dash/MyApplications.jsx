// import { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useAuthContext } from "../../context/AuthContext";
// import { useNavigate } from "react-router";

// const MyApplications = () => {
//   const { user } = useAuthContext();
//   const [applications, setApplications] = useState([]);
//   const [selectedApp, setSelectedApp] = useState(null);
//   const [scholarshipDetails, setScholarshipDetails] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user?.email) {
//       axios
//         .get(`http://localhost:5000/applications?email=${user.email}`)
//         .then((res) => setApplications(res.data))
//         .catch((err) => {
//           console.error(err);
//           Swal.fire("Error", "Failed to load applications", "error");
//         });
//     }
//   }, [user]);

//   const handleCancel = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to cancel this application?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, cancel it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await axios.delete(`http://localhost:5000/applications/${id}`);
//         setApplications((prev) => prev.filter((app) => app._id !== id));
//         Swal.fire("Canceled", "Application has been canceled", "success");
//       } catch (error) {
//         Swal.fire("Error", "Failed to cancel application", "error");
//       }
//     }
//   };

//   const handleEdit = (status, id) => {
//     if (status !== "pending") {
//       Swal.fire("Denied", "Cannot edit once it's processed", "warning");
//     } else {
//       navigate(`/dashboard/UpdateApplicationForm/${id}`);
//     }
//   };

//   const handleAddReviewClick = async (app) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/scholarships/${app.scholarshipId}`
//       );
//       setScholarshipDetails(res.data);
//       setSelectedApp(app);
//     } catch (err) {
//       console.error("Error fetching scholarship details:", err);
//       Swal.fire("Error", "Unable to load scholarship details", "error");
//     }
//   };

//   const handleReviewClose = (refreshNeeded) => {
//     setSelectedApp(null);
//     setScholarshipDetails(null);

//     if (refreshNeeded && user?.email) {
//       axios
//         .get(`http://localhost:5000/applications?email=${user.email}`)
//         .then((res) => setApplications(res.data))
//         .catch((err) => console.error(err));
//     }
//   };

//   return (
//     <div className="px-4 py-6">
//       <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
//         My Applications
//       </h2>

//       {applications.length === 0 ? (
//         <p className="text-center">No scholarship applications found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table w-full min-w-[600px] border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200 text-sm md:text-base">
//                 <th className="p-2 text-left">University</th>
//                 <th className="p-2 text-left">Subject</th>
//                 <th className="p-2 text-left">Fees</th>
//                 <th className="p-2 text-left">Status</th>
//                 <th className="p-2 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {applications.map((app) => (
//                 <tr key={app._id} className="border-t text-sm md:text-base">
//                   <td className="p-2">{app.universityName}</td>
//                   <td className="p-2">{app.subjectCategory}</td>
//                   <td className="p-2">${app.applicationFees}</td>
//                   <td className="p-2 capitalize">{app.status}</td>
//                   <td className="p-2">
//                     <div className="flex flex-col md:flex-row gap-2">
//                       <button
//                         className="bg-green-600 text-white px-3 py-1 rounded text-xs"
//                         onClick={() =>
//                           navigate(
//                             `/dashboard/scholarship/${app.scholarshipId}`
//                           )
//                         }
//                       >
//                         Details
//                       </button>

//                       <button
//                         className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
//                         onClick={() => handleEdit(app.status, app._id)}
//                       >
//                         Edit
//                       </button>

//                       <button
//                         className="bg-red-500 text-white px-3 py-1 rounded text-xs"
//                         onClick={() => handleCancel(app._id)}
//                       >
//                         Cancel
//                       </button>

                  
//                         <button
//                           className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
//                           onClick={() => handleAddReviewClick(app)}
//                         >
//                           Add Review
//                         </button>
  
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {selectedApp && scholarshipDetails && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//           <div className="bg-white w-full max-w-md p-6 rounded shadow-md relative">
//             <button
//               className="absolute top-2 right-2 text-gray-700 text-xl font-bold"
//               onClick={() => handleReviewClose(false)}
//               aria-label="Close review modal"
//             >
//               ✕
//             </button>
//             <h3 className="text-lg font-semibold mb-4 text-center">
//               Review for {scholarshipDetails.scholarshipName}
//             </h3>
//             <AddReview
//               application={selectedApp}
//               scholarshipDetails={scholarshipDetails}
//               onClose={handleReviewClose}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyApplications;



// import { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useAuthContext } from "../../context/AuthContext";
// import { useNavigate } from "react-router";

// const AddReview = ({ application, scholarshipDetails, onClose }) => {
//   const { user } = useAuthContext();
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!comment) {
//       Swal.fire("Warning", "Please add a comment", "warning");
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.post("http://localhost:5000/reviews", {
//         userEmail: user.email,
//         scholarshipId: scholarshipDetails._id,
//         applicationId: application._id,
//         rating,
//         comment,
//       });
//       Swal.fire("Success", "Review submitted successfully", "success");
//       onClose(true);
//     } catch (error) {
//       Swal.fire("Error", "Failed to submit review", "error");
//     }
//     setLoading(false);
//   };

//   return (
//     <div>
//       <label className="block mb-2">
//         Rating:
//         <select
//           value={rating}
//           onChange={(e) => setRating(Number(e.target.value))}
//           className="ml-2 p-1 border rounded"
//         >
//           {[5, 4, 3, 2, 1].map((r) => (
//             <option key={r} value={r}>
//               {r}
//             </option>
//           ))}
//         </select>
//       </label>

//       <label className="block mb-4">
//         Comment:
//         <textarea
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           className="w-full p-2 border rounded"
//           rows={4}
//           placeholder="Write your review here..."
//         />
//       </label>

//       <button
//         onClick={handleSubmit}
//         disabled={loading}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         {loading ? "Submitting..." : "Submit Review"}
//       </button>
//     </div>
//   );
// };

// const MyApplications = () => {
//   const { user } = useAuthContext();
//   const [applications, setApplications] = useState([]);
//   const [selectedApp, setSelectedApp] = useState(null);
//   const [scholarshipDetails, setScholarshipDetails] = useState(null);
//   const navigate = useNavigate();

//   // Fetch user applications
//   const fetchApplications = () => {
//     if (user?.email) {
//       axios
//         .get(`http://localhost:5000/applications?email=${user.email}`)
//         .then((res) => setApplications(res.data))
//         .catch((err) => {
//           console.error(err);
//           Swal.fire("Error", "Failed to load applications", "error");
//         });
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, [user]);

//   const handleCancel = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to cancel this application?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, cancel it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await axios.delete(`http://localhost:5000/applications/${id}`);
//         setApplications((prev) => prev.filter((app) => app._id !== id));
//         Swal.fire("Canceled", "Application has been canceled", "success");
//       } catch (error) {
//         Swal.fire("Error", "Failed to cancel application", "error");
//       }
//     }
//   };

//   const handleEdit = (status, id) => {
//     if (status !== "pending") {
//       Swal.fire("Denied", "Cannot edit once it's processed", "warning");
//     } else {
//       navigate(`/dashboard/UpdateApplicationForm/${id}`);
//     }
//   };

//   const handleAddReviewClick = async (app) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/scholarships/${app.scholarshipId}`
//       );
//       setScholarshipDetails(res.data);
//       setSelectedApp(app);
//     } catch (err) {
//       console.error("Error fetching scholarship details:", err);
//       Swal.fire("Error", "Unable to load scholarship details", "error");
//     }
//   };

//   const handleReviewClose = (refreshNeeded) => {
//     setSelectedApp(null);
//     setScholarshipDetails(null);

//     if (refreshNeeded) {
//       fetchApplications();
//     }
//   };

//   return (
//     <div className="px-4 py-6">
//       <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
//         My Applications
//       </h2>

//       {applications.length === 0 ? (
//         <p className="text-center">No scholarship applications found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table w-full min-w-[600px] border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200 text-sm md:text-base">
//                 <th className="p-2 text-left">University</th>
//                 <th className="p-2 text-left">Subject</th>
//                 <th className="p-2 text-left">Fees</th>
//                 <th className="p-2 text-left">Status</th>
//                 <th className="p-2 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {applications.map((app) => (
//                 <tr key={app._id} className="border-t text-sm md:text-base">
//                   <td className="p-2">{app.universityName}</td>
//                   <td className="p-2">{app.subjectCategory}</td>
//                   <td className="p-2">${app.applicationFees}</td>
//                   <td className="p-2 capitalize">{app.status}</td>
//                   <td className="p-2">
//                     <div className="flex flex-col md:flex-row gap-2">
//                       <button
//                         className="bg-green-600 text-white px-3 py-1 rounded text-xs"
//                         onClick={() =>
//                           navigate(`/dashboard/scholarship/${app.scholarshipId}`)
//                         }
//                       >
//                         Details
//                       </button>

//                       <button
//                         className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
//                         onClick={() => handleEdit(app.status, app._id)}
//                       >
//                         Edit
//                       </button>

//                       <button
//                         className="bg-red-500 text-white px-3 py-1 rounded text-xs"
//                         onClick={() => handleCancel(app._id)}
//                       >
//                         Cancel
//                       </button>

//                       <button
//                         className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
//                         onClick={() => handleAddReviewClick(app)}
//                       >
//                         Add Review
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {selectedApp && scholarshipDetails && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//           <div className="bg-white w-full max-w-md p-6 rounded shadow-md relative">
//             <button
//               className="absolute top-2 right-2 text-gray-700 text-xl font-bold"
//               onClick={() => handleReviewClose(false)}
//               aria-label="Close review modal"
//             >
//               ✕
//             </button>
//             <h3 className="text-lg font-semibold mb-4 text-center">
//               Review for {scholarshipDetails.scholarshipName}
//             </h3>
//             <AddReview
//               application={selectedApp}
//               scholarshipDetails={scholarshipDetails}
//               onClose={handleReviewClose}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyApplications;





import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

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
      await axios.post("http://localhost:5000/reviews", {
        userEmail: user.email,
        scholarshipId: scholarshipDetails._id,
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
          placeholder="Write your review here..."
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

const MyApplications = () => {
  const { user } = useAuthContext();
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [scholarshipDetails, setScholarshipDetails] = useState(null);
  const navigate = useNavigate();

  // Fetch user applications
  const fetchApplications = () => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/applications?email=${user.email}`)
        .then((res) => setApplications(res.data))
        .catch((err) => {
          console.error(err);
          Swal.fire("Error", "Failed to load applications", "error");
        });
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [user]);

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/applications/${id}`);
        setApplications((prev) => prev.filter((app) => app._id !== id));
        Swal.fire("Canceled", "Application has been canceled", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to cancel application", "error");
      }
    }
  };

  const handleEdit = (status, id) => {
    if (status !== "pending") {
      Swal.fire("Denied", "Cannot edit once it's processed", "warning");
    } else {
      navigate(`/dashboard/UpdateApplicationForm/${id}`);
    }
  };

  const handleAddReviewClick = async (app) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/scholarships/${app.scholarshipId}`
      );
      setScholarshipDetails(res.data);
      setSelectedApp(app);
    } catch (err) {
      console.error("Error fetching scholarship details:", err);
      Swal.fire("Error", "Unable to load scholarship details", "error");
    }
  };

  const handleReviewClose = (refreshNeeded) => {
    setSelectedApp(null);
    setScholarshipDetails(null);

    if (refreshNeeded) {
      fetchApplications();
    }
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
        My Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-center">No scholarship applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full min-w-[600px] border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-sm md:text-base">
                <th className="p-2 text-left">University</th>
                <th className="p-2 text-left">Subject</th>
                <th className="p-2 text-left">Fees</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="border-t text-sm md:text-base">
                  <td className="p-2">{app.universityName}</td>
                  <td className="p-2">{app.subjectCategory}</td>
                  <td className="p-2">${app.applicationFees}</td>
                  <td className="p-2 capitalize">{app.status}</td>
                  <td className="p-2">
                    <div className="flex flex-col md:flex-row gap-2">
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                        onClick={() =>
                          navigate(`/dashboard/scholarship/${app.scholarshipId}`)
                        }
                      >
                        Details
                      </button>

                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                        onClick={() => handleEdit(app.status, app._id)}
                      >
                        Edit
                      </button>

                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                        onClick={() => handleCancel(app._id)}
                      >
                        Cancel
                      </button>

                      {app.status !== "pending" && (
                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
                          onClick={() => handleAddReviewClick(app)}
                        >
                          Add Review
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedApp && scholarshipDetails && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md p-6 rounded shadow-md relative">
            <button
              className="absolute top-2 right-2 text-gray-700 text-xl font-bold"
              onClick={() => handleReviewClose(false)}
              aria-label="Close review modal"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4 text-center">
              Review for {scholarshipDetails.scholarshipName}
            </h3>
            <AddReview
              application={selectedApp}
              scholarshipDetails={scholarshipDetails}
              onClose={handleReviewClose}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
