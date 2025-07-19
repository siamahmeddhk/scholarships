// // ApplicantForm.jsx
// import { useState } from "react";

// const ApplicantForm = ({ scholarship,  onFormSubmit }) => {
//   const [formData, setFormData] = useState({
//     phone: "",
//     photo: "",
//     address: "",
//     gender: "",
//     degree: "",
//     sscResult: "",
//     hscResult: "",
//     studyGap: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onFormSubmit(formData); // Pass data to parent
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 mt-6">
//       <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
//       <input name="photo" placeholder="Photo URL" onChange={handleChange} required />
//       <input name="address" placeholder="Village, District, Country" onChange={handleChange} required />
      
//       <select name="gender" onChange={handleChange} required>
//         <option value="">Select Gender</option>
//         <option>Male</option>
//         <option>Female</option>
//         <option>Other</option>
//       </select>

//       <select name="degree" onChange={handleChange} required>
//         <option value="">Select Degree</option>
//         <option>Diploma</option>
//         <option>Bachelor</option>
//         <option>Masters</option>
//       </select>

//       <input name="sscResult" placeholder="SSC Result (GPA)" onChange={handleChange} required />
//       <input name="hscResult" placeholder="HSC Result (GPA)" onChange={handleChange} required />
      
//       <select name="studyGap" onChange={handleChange}>
//         <option value="">Study Gap?</option>
//         <option value="1 Year">1 Year</option>
//         <option value="2 Year">2 Year</option>
//         <option value="3+ Year">3+ Year</option>
//       </select>

//       {/* <input value={scholarship.universityName} readOnly />
//       <input value={scholarship.category} readOnly />
//       <input value={scholarship.subjectCategory} readOnly /> */}

//       <button type="submit" className="btn btn-primary w-full">Proceed to Pay</button>
//     </form>
//   );
// };

// export default ApplicantForm;
