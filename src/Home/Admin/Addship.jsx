import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Addship = () => {
  const [formData, setFormData] = useState({
    scholarshipName: "",
    universityName: "",
    universityImage: "", // Direct link input
    universityCountry: "",
    universityCity: "",
    universityWorldRank: "",
    subjectCategory: "Agriculture",
    scholarshipCategory: "Full fund",
    degree: "Diploma",
    tuitionFees: "",
    applicationFees: "",
    serviceCharge: "",
    applicationDeadline: "",
    postDate: new Date().toISOString().split("T")[0],
    postedUserEmail: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.universityImage) {
      Swal.fire("Error", "Please provide a university image URL", "error");
      return;
    }

    try {
      await axios.post("https://s-server-two.vercel.app/scholarships", formData);
      Swal.fire("Success", "Scholarship added successfully!", "success");

      // Reset form
      setFormData({
        scholarshipName: "",
        universityName: "",
        universityImage: "",
        universityCountry: "",
        universityCity: "",
        universityWorldRank: "",
        subjectCategory: "Agriculture",
        scholarshipCategory: "Full fund",
        degree: "Diploma",
        tuitionFees: "",
        applicationFees: "",
        serviceCharge: "",
        applicationDeadline: "",
        postDate: new Date().toISOString().split("T")[0],
        postedUserEmail: "",
      });
    } catch (error) {
      console.error("Error adding scholarship:", error);
      Swal.fire("Error", "Failed to add scholarship", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Scholarship</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="scholarshipName"
          value={formData.scholarshipName}
          onChange={handleChange}
          placeholder="Scholarship Name"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="universityName"
          value={formData.universityName}
          onChange={handleChange}
          placeholder="University Name"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="universityImage"
          value={formData.universityImage}
          onChange={handleChange}
          placeholder="University Image URL"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="universityCountry"
          value={formData.universityCountry}
          onChange={handleChange}
          placeholder="University Country"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="universityCity"
          value={formData.universityCity}
          onChange={handleChange}
          placeholder="University City"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="universityWorldRank"
          value={formData.universityWorldRank}
          onChange={handleChange}
          placeholder="University World Rank"
          className="w-full border p-2 rounded"
        />

        <select
          name="subjectCategory"
          value={formData.subjectCategory}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option>Agriculture</option>
          <option>Engineering</option>
          <option>Doctor</option>
        </select>

        <select
          name="scholarshipCategory"
          value={formData.scholarshipCategory}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option>Full fund</option>
          <option>Partial</option>
          <option>Self-fund</option>
        </select>

        <select
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option>Diploma</option>
          <option>Bachelor</option>
          <option>Masters</option>
        </select>

        <input
          type="number"
          name="tuitionFees"
          value={formData.tuitionFees}
          onChange={handleChange}
          placeholder="Tuition Fees (Optional)"
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="applicationFees"
          value={formData.applicationFees}
          onChange={handleChange}
          placeholder="Application Fees"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="serviceCharge"
          value={formData.serviceCharge}
          onChange={handleChange}
          placeholder="Service Charge"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="date"
          name="applicationDeadline"
          value={formData.applicationDeadline}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="date"
          name="postDate"
          value={formData.postDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="email"
          name="postedUserEmail"
          value={formData.postedUserEmail}
          onChange={handleChange}
          placeholder="Posted User Email"
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default Addship;
