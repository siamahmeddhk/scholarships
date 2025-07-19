// // pages/ApplyScholarship.jsx
// import { useParams } from 'react-router';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { useState } from 'react';
// import ApplicantForm from './ApplicantForm';
// import CheckoutButton from './CheckoutButton';

// const ApplyScholarship = () => {
//   const { id } = useParams();
//   const [applicantInfo, setApplicantInfo] = useState(null);

//   // Fetch scholarship data by ID
//   const { data: scholarship, isLoading, error } = useQuery({
//     queryKey: ['scholarship', id],
//     queryFn: async () => {
//       const res = await axios.get(`http://localhost:5000/scholarships/${id}`);
//       return res.data;
//     }
//   });

//   if (isLoading) {
//     return <p>Loading scholarship info...</p>;
//   }

//   if (error) {
//     return <p>Error loading scholarship info</p>;
//   }

//   if (!scholarship) {
//     return <p>Scholarship not found</p>;
//   }

//   const handleFormSubmit = (formData) => {
//     setApplicantInfo(formData);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Apply for {scholarship.universityName}</h2>

//       {!applicantInfo ? (
//         <ApplicantForm scholarship={scholarship} onSubmit={handleFormSubmit} />
//       ) : (
//         <CheckoutButton scholarship={scholarship} applicantInfo={applicantInfo} />
//       )}
//     </div>
//   );
// };

// export default ApplyScholarship;
