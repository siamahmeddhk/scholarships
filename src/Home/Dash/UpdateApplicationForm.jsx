import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateApplicationForm = () => {
  const { id: applicationId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    gender: "",
    degree: "",
    ssc: "",
    hsc: "",
    gap: "",
    userName: "",
    userEmail: "",
    scholarshipId: "",
    universityName: "",
    subjectCategory: "",
    scholarshipCategory: "",
    applicationFees: "",
    serviceCharge: "",
    status: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://s-server-two.vercel.app/applications/${applicationId}`)
      .then((res) => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching application:", err);
        Swal.fire("Error", "Failed to load application data", "error");
        setLoading(false);
      });
  }, [applicationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(`https://s-server-two.vercel.app/applications/${applicationId}`, formData)
      .then(() => {
        Swal.fire("Updated!", "Application updated successfully", "success");
        navigate("/dashboard/my-applications"); // update this path as needed
      })
      .catch((err) => {
        console.error("Error updating application:", err);
        Swal.fire("Error", "Failed to update application", "error");
      });
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Update Application</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        {/* Address */}
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        {/* Gender */}
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* Degree */}
        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={formData.degree}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        {/* SSC */}
        <input
          type="text"
          name="ssc"
          placeholder="SSC Result"
          value={formData.ssc}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        {/* HSC */}
        <input
          type="text"
          name="hsc"
          placeholder="HSC Result"
          value={formData.hsc}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        {/* GAP */}
        <input
          type="text"
          name="gap"
          placeholder="GAP (if any)"
          value={formData.gap}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        {/* University */}
        <input
          type="text"
          name="universityName"
          placeholder="University Name"
          value={formData.universityName}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        {/* Subject Category */}
        <input
          type="text"
          name="subjectCategory"
          placeholder="Subject Category"
          value={formData.subjectCategory}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        {/* Scholarship Category */}
        <input
          type="text"
          name="scholarshipCategory"
          placeholder="Scholarship Category"
          value={formData.scholarshipCategory}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        {/* Application Fees */}
        <input
          type="number"
          name="applicationFees"
          placeholder="Application Fees"
          value={formData.applicationFees}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        {/* Service Charge */}
        <input
          type="number"
          name="serviceCharge"
          placeholder="Service Charge"
          value={formData.serviceCharge}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        {/* Status */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button type="submit" className="btn btn-primary mt-2">
          Update Application
        </button>
      </form>
    </div>
  );
};

export default UpdateApplicationForm;
