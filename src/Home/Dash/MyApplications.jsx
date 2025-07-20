import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthContext } from "../../context/AuthContext";
import AddReview from "./AddReview";
import {useNavigate } from "react-router";


const MyApplications = () => {
  const { user } = useAuthContext();
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
const navigate = useNavigate();


  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/applications?email=${user.email}`)
        .then((res) => setApplications(res.data))
        .catch((err) => console.error(err));
    }
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
      await axios.delete(`http://localhost:5000/applications/${id}`);
      setApplications((prev) => prev.filter((app) => app._id !== id));
      Swal.fire("Canceled", "Application has been canceled", "success");
    }
  };

  const handleEdit = (status) => {
    if (status !== "pending") {
      Swal.fire("Denied", "Cannot edit once it's processed", "warning");
    } else {
      // navigate(`/update-application/${id}`); // implement this route
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
                        onClick={() => {
                          navigate(`/dashboard/scholarship/${app.scholarshipId}`)
                        }}
                      >
                        Details
                      </button>

                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                        onClick={() => handleEdit(app.status)}
                      >
                        Edit
                      </button>

                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                        onClick={() => handleCancel(app._id)}
                      >
                        Cancel
                      </button>

                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
                        onClick={() => setSelectedApp(app)}
                      >
                        Add Review
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedApp && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md p-6 rounded shadow-md relative">
            <button
              className="absolute top-2 right-2 text-gray-700"
              onClick={() => setSelectedApp(null)}
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-2 text-center">
              Review for {selectedApp.scholarshipName}
            </h3>
            <AddReview application={selectedApp} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
