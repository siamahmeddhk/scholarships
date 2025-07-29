import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";

const AdminManageShip = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [updateScholarship, setUpdateScholarship] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDegree, setFilterDegree] = useState("All");

  const auth = getAuth();

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("https://s-server-two.vercel.app/scholarships");
      setScholarships(res.data);
    } catch (err) {
      setError("Failed to fetch scholarships. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const user = auth.currentUser;
    if (!user) {
      Swal.fire("Unauthorized", "Please log in to delete scholarships.", "warning");
      return;
    }
    const token = await user.getIdToken();

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This scholarship will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`https://s-server-two.vercel.app/scholarships/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setScholarships((prev) => prev.filter((s) => s._id !== id));
        Swal.fire("Deleted!", "Scholarship deleted successfully.", "success");
      } catch (err) {
        Swal.fire("Error!", "Failed to delete scholarship.", "error");
        console.error(err);
      }
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      Swal.fire("Unauthorized", "Please log in to update scholarships.", "warning");
      return;
    }
    const token = await user.getIdToken();

    try {
      const {
        _id,
        scholarshipName,
        universityName,
        degree,
        applicationFees,
        scholarshipCategory,
        description,
      } = updateScholarship;

      await axios.patch(
        `https://s-server-two.vercel.app/scholarships/${_id}`,
        {
          scholarshipName,
          universityName,
          degree,
          applicationFees: Number(applicationFees),
          scholarshipCategory,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire("Success!", "Scholarship updated successfully.", "success");
      setUpdateScholarship(null);
      fetchScholarships();
    } catch (err) {
      Swal.fire("Error!", "Failed to update scholarship.", "error");
      console.error(err);
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateScholarship((prev) => ({
      ...prev,
      [name]: name === "applicationFees" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const uniqueDegrees = ["All", ...new Set(scholarships.map((s) => s.degree).filter(Boolean))];

  const filteredScholarships = scholarships.filter((s) => {
    const name = (s.scholarshipName || "").toLowerCase();
    const uni = (s.universityName || "").toLowerCase();
    const matchesSearch = name.includes(searchTerm.toLowerCase()) || uni.includes(searchTerm.toLowerCase());
    const matchesDegree = filterDegree === "All" || s.degree === filterDegree;
    return matchesSearch && matchesDegree;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 mb-4"></div>
        <p className="text-indigo-700 text-lg font-semibold">Loading scholarships...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <p className="text-red-600 text-xl font-semibold p-4 border border-red-300 rounded-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-indigo-700">Manage Scholarships</h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or university..."
          className="w-full md:flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full md:w-1/4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          value={filterDegree}
          onChange={(e) => setFilterDegree(e.target.value)}
        >
          {uniqueDegrees.map((d) => (
            <option key={d} value={d}>
              {d === "All" ? "All Degrees" : d}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {filteredScholarships.length === 0 ? (
        <div className="text-center text-gray-600 p-6 bg-white rounded-lg shadow">No scholarships found.</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Scholarship</th>
                <th className="py-3 px-4 text-left">University</th>
                <th className="py-3 px-4 text-left">Degree</th>
                <th className="py-3 px-4 text-left">Fee</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredScholarships.map((s) => (
                <tr key={s._id} className="hover:bg-gray-50">
                  <td
                    className="py-3 px-4 text-indigo-600 underline cursor-pointer"
                    onClick={() => setSelectedScholarship(s)}
                  >
                    {s.scholarshipName}
                  </td>
                  <td className="py-3 px-4">{s.universityName}</td>
                  <td className="py-3 px-4">{s.degree}</td>
                  <td className="py-3 px-4">${s.applicationFees}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() => setUpdateScholarship(s)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
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

      {/* Details Modal */}
      {selectedScholarship && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedScholarship(null)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-2xl text-gray-500"
              onClick={() => setSelectedScholarship(null)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-indigo-700 mb-4">{selectedScholarship.scholarshipName}</h3>
            <p>
              <strong>University:</strong> {selectedScholarship.universityName}
            </p>
            <p>
              <strong>Degree:</strong> {selectedScholarship.degree}
            </p>
            <p>
              <strong>Fee:</strong> ${selectedScholarship.applicationFees}
            </p>
            <p className="mt-2 text-gray-700">{selectedScholarship.description || "No description."}</p>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {updateScholarship && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setUpdateScholarship(null)}
        >
          <form
            onSubmit={handleUpdateSubmit}
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-indigo-700 mb-4">Edit Scholarship</h3>

            <input
              name="scholarshipName"
              value={updateScholarship.scholarshipName || ""}
              onChange={handleUpdateChange}
              className="w-full mb-3 p-2 border rounded"
              placeholder="Scholarship Name"
              required
            />
            <input
              name="universityName"
              value={updateScholarship.universityName || ""}
              onChange={handleUpdateChange}
              className="w-full mb-3 p-2 border rounded"
              placeholder="University Name"
              required
            />
            <input
              name="degree"
              value={updateScholarship.degree || ""}
              onChange={handleUpdateChange}
              className="w-full mb-3 p-2 border rounded"
              placeholder="Degree"
              required
            />
            <input
              name="applicationFees"
              type="number"
              value={updateScholarship.applicationFees || ""}
              onChange={handleUpdateChange}
              className="w-full mb-3 p-2 border rounded"
              placeholder="Application Fee"
              required
            />
            <textarea
              name="description"
              value={updateScholarship.description || ""}
              onChange={handleUpdateChange}
              className="w-full mb-3 p-2 border rounded"
              placeholder="Description"
            />

            <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminManageShip;
