// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// const ModeratorApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [selectedApp, setSelectedApp] = useState(null); // For Details Modal
//   const [feedbackApp, setFeedbackApp] = useState(null); // For Feedback Modal
//   const [feedback, setFeedback] = useState("");
//   const [updatingId, setUpdatingId] = useState(null);

//   // Fetch all applications
//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   const fetchApplications = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/applications");
//       setApplications(res.data);
//     } catch (error) {
//       Swal.fire("Error", "Failed to load applications", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Cancel (Reject) Application
//   const cancelApplication = async (id) => {
//     setUpdatingId(id);
//     try {
//       await axios.patch(`http://localhost:5000/applications/${id}`, {
//         status: "rejected",
//       });
//       setApplications((prev) =>
//         prev.map((app) =>
//           app._id === id ? { ...app, status: "rejected" } : app
//         )
//       );
//       Swal.fire("Success", "Application rejected", "success");
//     } catch (error) {
//       Swal.fire("Error", "Failed to cancel application", "error");
//     }
//     setUpdatingId(null);
//   };

//   // Submit Feedback
//   const submitFeedback = async () => {
//     if (!feedback.trim()) {
//       Swal.fire("Warning", "Feedback cannot be empty", "warning");
//       return;
//     }
//     try {
//       await axios.patch(
//         `http://localhost:5000/applications/${feedbackApp._id}`,
//         { feedback }
//       );
//       setApplications((prev) =>
//         prev.map((app) =>
//           app._id === feedbackApp._id ? { ...app, feedback } : app
//         )
//       );
//       Swal.fire("Success", "Feedback submitted successfully", "success");
//       setFeedback("");
//       setFeedbackApp(null);
//     } catch (error) {
//       Swal.fire("Error", "Failed to submit feedback", "error");
//     }
//   };

//   if (loading) return <p>Loading applications...</p>;

//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6 text-center">
//         All Scholarship Applications
//       </h2>

//       {applications.length === 0 ? (
//         <p className="text-center text-gray-600">No applications found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table-auto w-full border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border p-3 text-left">Applicant</th>
//                 <th className="border p-3 text-left">Scholarship</th>
//                 <th className="border p-3 text-center">Status</th>
//                 <th className="border p-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {applications.map((app) => (
//                 <tr key={app._id}>
//                   <td className="border p-3">
//                     <div className="font-semibold">{app.name || "N/A"}</div>
//                     <div className="text-sm text-gray-600">
//                       {app.email || "No email"}
//                     </div>
//                   </td>
//                   <td className="border p-3">{app.scholarshipName}</td>
//                   <td className="border p-3 text-center capitalize">
//                     {app.status || "pending"}
//                   </td>
//                   <td className="border p-3 text-center space-x-2">
//                     <button
//                       className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                       onClick={() => setSelectedApp(app)}
//                     >
//                       Details
//                     </button>
//                     <button
//                       className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                       onClick={() => setFeedbackApp(app)}
//                     >
//                       Feedback
//                     </button>
//                     <button
//                       disabled={updatingId === app._id}
//                       className={`px-3 py-1 rounded text-white ${
//                         updatingId === app._id
//                           ? "bg-red-300 cursor-not-allowed"
//                           : "bg-red-600 hover:bg-red-700"
//                       }`}
//                       onClick={() => cancelApplication(app._id)}
//                     >
//                       Cancel
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* ✅ Details Modal */}
//       {selectedApp && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded p-6 max-w-lg w-full relative">
//             <button
//               className="absolute top-2 right-2 text-xl font-bold"
//               onClick={() => setSelectedApp(null)}
//             >
//               ✕
//             </button>
//             <h3 className="text-2xl font-bold mb-4">Application Details</h3>
//             <p><b>University:</b> {selectedApp.universityName || "N/A"}</p>
//             <p><b>Degree:</b> {selectedApp.degree || "N/A"}</p>
//             <p><b>Scholarship Category:</b> {selectedApp.scholarshipCategory || "N/A"}</p>
//             <p><b>Email:</b> {selectedApp.email}</p>
//             <p><b>Status:</b> {selectedApp.status}</p>
//           </div>
//         </div>
//       )}

//       {/* ✅ Feedback Modal */}
//       {feedbackApp && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded p-6 max-w-md w-full relative">
//             <button
//               className="absolute top-2 right-2 text-xl font-bold"
//               onClick={() => setFeedbackApp(null)}
//             >
//               ✕
//             </button>
//             <h3 className="text-2xl font-bold mb-4">Give Feedback</h3>
//             <textarea
//               value={feedback}
//               onChange={(e) => setFeedback(e.target.value)}
//               className="w-full p-2 border rounded mb-4"
//               rows={4}
//               placeholder="Enter feedback..."
//             ></textarea>
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               onClick={submitFeedback}
//             >
//               Submit Feedback
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ModeratorApplications;






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// const ModeratorApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedApp, setSelectedApp] = useState(null); // For Details modal
//   const [feedbackApp, setFeedbackApp] = useState(null); // For Feedback modal
//   const [feedbackText, setFeedbackText] = useState("");

//   const fetchApplications = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:5000/applications");
//       setApplications(res.data);
//     } catch (error) {
//       Swal.fire("Error", "Failed to load applications", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   const handleUpdateStatus = async (id, status) => {
//     try {
//       await axios.patch(`http://localhost:5000/applications/${id}`, { status });
//       Swal.fire("Success", `Application ${status}`, "success");
//       fetchApplications();
//     } catch (error) {
//       Swal.fire("Error", "Failed to update application", "error");
//     }
//   };

//   const handleSubmitFeedback = async () => {
//     try {
//       await axios.patch(`http://localhost:5000/applications/${feedbackApp._id}`, {
//         feedback: feedbackText,
//       });
//       Swal.fire("Success", "Feedback submitted", "success");
//       setFeedbackApp(null);
//       setFeedbackText("");
//       fetchApplications();
//     } catch (error) {
//       Swal.fire("Error", "Failed to submit feedback", "error");
//     }
//   };

//   if (loading) return <p>Loading applications...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">All Applied Scholarships</h2>
//       {applications.length === 0 ? (
//         <p>No applications found.</p>
//       ) : (
//         <table className="table-auto w-full border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Applicant</th>
//               <th className="border p-2">Scholarship</th>
//               <th className="border p-2">Degree</th>
//               <th className="border p-2">Status</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {applications.map((app) => (
//               <tr key={app._id} className="text-center">
//                 <td className="border p-2">{app.applicantName || app.userEmail}</td>
//                 <td className="border p-2">
//                   {app.scholarshipName || app.scholarshipDetails?.scholarshipName || "N/A"}
//                 </td>
//                 <td className="border p-2">
//                   {app.degree || app.scholarshipDetails?.degree || "N/A"}
//                 </td>
//                 <td className="border p-2 capitalize">{app.status}</td>
//                 <td className="border p-2 space-x-2">
//                   <button
//                     className="bg-blue-500 text-white px-3 py-1 rounded"
//                     onClick={() => setSelectedApp(app)}
//                   >
//                     Details
//                   </button>
//                   <button
//                     className="bg-yellow-500 text-white px-3 py-1 rounded"
//                     onClick={() => setFeedbackApp(app)}
//                   >
//                     Feedback
//                   </button>
//                   <button
//                     className="bg-red-600 text-white px-3 py-1 rounded"
//                     onClick={() => handleUpdateStatus(app._id, "rejected")}
//                   >
//                     Cancel
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Details Modal */}
//       {selectedApp && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded w-96 relative">
//             <button
//               className="absolute top-2 right-2"
//               onClick={() => setSelectedApp(null)}
//             >
//               ✕
//             </button>
//             <h3 className="text-xl font-bold mb-4">Application Details</h3>
//             <p><b>University:</b> {selectedApp.scholarshipDetails?.universityName || "N/A"}</p>
//             <p><b>Degree:</b> {selectedApp.degree || "N/A"}</p>
//             <p><b>Category:</b> {selectedApp.category || "N/A"}</p>
//             <p><b>Status:</b> {selectedApp.status}</p>
//           </div>
//         </div>
//       )}

//       {/* Feedback Modal */}
//       {feedbackApp && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded w-96 relative">
//             <button
//               className="absolute top-2 right-2"
//               onClick={() => setFeedbackApp(null)}
//             >
//               ✕
//             </button>
//             <h3 className="text-xl font-bold mb-4">Give Feedback</h3>
//             <textarea
//               className="w-full border p-2 mb-4"
//               rows={3}
//               value={feedbackText}
//               onChange={(e) => setFeedbackText(e.target.value)}
//               placeholder="Enter feedback..."
//             />
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded"
//               onClick={handleSubmitFeedback}
//             >
//               Submit Feedback
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ModeratorApplications;










import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ModeratorApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackApp, setFeedbackApp] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/applications");
      setApplications(res.data);
    } catch (error) {
      Swal.fire("Error", "Failed to load applications", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleModeratorAction = async (id, action) => {
    let payload = {};
    if (action === "approve") payload.status = "processing";
    if (action === "complete") payload.status = "completed";
    if (action === "reject") payload.status = "rejected";
    if (action === "feedback") payload.feedback = feedbackText;

    try {
      await axios.patch(`http://localhost:5000/applications/${id}`, payload);
      Swal.fire("Success", `${action} action completed`, "success");
      setFeedbackApp(null);
      setFeedbackText("");
      fetchApplications();
    } catch (error) {
      Swal.fire("Error", "Action failed", "error");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold animate-pulse">Loading applications...</p>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        📄 All Applied Scholarships
      </h2>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-3">Applicant</th>
                <th className="px-4 py-3">Scholarship</th>
                <th className="px-4 py-3">Degree</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr
                  key={app._id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-indigo-50 transition`}
                >
                  <td className="px-4 py-3 font-medium">{app.applicantName || app.userEmail}</td>
                  <td className="px-4 py-3">
                    {app.scholarshipName ||
                      app.scholarshipDetails?.scholarshipName ||
                      "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    {app.degree || app.scholarshipDetails?.degree || "N/A"}
                  </td>
                  <td className="px-4 py-3 capitalize font-semibold">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        app.status === "pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : app.status === "processing"
                          ? "bg-blue-200 text-blue-800"
                          : app.status === "completed"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex flex-wrap gap-2 justify-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow-sm"
                      onClick={() => setSelectedApp(app)}
                    >
                      Details
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow-sm"
                      onClick={() => handleModeratorAction(app._id, "approve")}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow-sm"
                      onClick={() => setFeedbackApp(app)}
                    >
                      Feedback
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-sm"
                      onClick={() => handleModeratorAction(app._id, "reject")}
                    >
                      Reject
                    </button>
                    <button
                      className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded shadow-sm"
                      onClick={() => handleModeratorAction(app._id, "complete")}
                    >
                      Complete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setSelectedApp(null)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4 text-indigo-700">
              Application Details
            </h3>
            <p><strong>University:</strong> {selectedApp.scholarshipDetails?.universityName || "N/A"}</p>
            <p><strong>Degree:</strong> {selectedApp.degree || "N/A"}</p>
            <p><strong>Category:</strong> {selectedApp.category || "N/A"}</p>
            <p><strong>Status:</strong> {selectedApp.status}</p>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setFeedbackApp(null)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4 text-indigo-700">Give Feedback</h3>
            <textarea
              className="w-full border rounded p-2 mb-4"
              rows={3}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Enter feedback..."
            />
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
              onClick={() => handleModeratorAction(feedbackApp._id, "feedback")}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModeratorApplications;
