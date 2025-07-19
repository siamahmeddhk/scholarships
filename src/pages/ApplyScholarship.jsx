// // pages/ApplyScholarship.jsx
// import { useParams } from 'react-router';
// import { useQuery } from '@tanstack/react-query';
// import { useState } from 'react';
// import axios from 'axios';
// import ApplicantForm from '../component/ApplicantForm';
// import CheckoutButton from '../component/CheckoutButton';

// const ApplyScholarship = () => {
//   const { id } = useParams();
//   const [applicantInfo, setApplicantInfo] = useState(null);

//   const { data: scholarship, isLoading, isError } = useQuery({
//     queryKey: ['scholarship', id],
//     queryFn: async () => {
//       const res = await axios.get(`http://localhost:5000/scholarships/${id}`);
//       return res.data;
//     }
//   });

//   const handleFormSubmit = (formData) => {
//     setApplicantInfo(formData);
//   };

//   if (isLoading) return <div>Loading scholarship details...</div>;
//   if (isError) return <div className="text-red-500">Failed to load scholarship.</div>;

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
