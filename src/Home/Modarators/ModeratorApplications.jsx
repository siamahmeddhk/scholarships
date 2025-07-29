import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth"; // Make sure Firebase is initialized

const ModeratorApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackApp, setFeedbackApp] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://s-server-two.vercel.app/applications/all");
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
      const token = await getAuth().currentUser.getIdToken();

      await axios.patch(
        `https://s-server-two.vercel.app/applications/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire("Success", `${action} action completed`, "success");
      setFeedbackApp(null);
      setFeedbackText("");
      fetchApplications();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Action failed",
        "error"
      );
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold animate-pulse">
          Loading applications...
        </p>
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
                  <td className="px-4 py-3 font-medium">
                    {app.applicantName || app.userEmail}
                  </td>
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
            <p>
              <strong>University:</strong>{" "}
              {selectedApp.scholarshipDetails?.universityName || "N/A"}
            </p>
            <p>
              <strong>Degree:</strong> {selectedApp.degree || "N/A"}
            </p>
            <p>
              <strong>Category:</strong> {selectedApp.category || "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {selectedApp.status}
            </p>
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
            <h3 className="text-xl font-bold mb-4 text-indigo-700">
              Give Feedback
            </h3>
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
