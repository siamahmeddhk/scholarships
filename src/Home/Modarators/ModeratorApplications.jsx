import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ModeratorApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all applications (moderators see all)
  useEffect(() => {
    axios.get("http://localhost:5000/applications")
      .then(res => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to load applications", "error");
        setLoading(false);
      });
  }, []);

  // Approve or reject application
  const updateStatus = (id, newStatus) => {
    axios.patch(`http://localhost:5000/applications/${id}`, { status: newStatus })
      .then(() => {
        setApplications(prev =>
          prev.map(app => (app._id === id ? { ...app, status: newStatus } : app))
        );
        Swal.fire("Success", `Application ${newStatus}`, "success");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update application status", "error");
      });
  };

  if (loading) return <p>Loading applications...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Scholarship Applications</h2>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Applicant</th>
              <th className="border border-gray-300 p-2">Scholarship</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id} className="text-center">
                <td className="border border-gray-300 p-2">{app.name || app.email}</td>
                <td className="border border-gray-300 p-2">{app.scholarshipName}</td>
                <td className="border border-gray-300 p-2 capitalize">{app.status}</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  {app.status !== "approved" && (
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded"
                      onClick={() => updateStatus(app._id, "approved")}
                    >
                      Approve
                    </button>
                  )}
                  {app.status !== "rejected" && (
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => updateStatus(app._id, "rejected")}
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ModeratorApplications;
