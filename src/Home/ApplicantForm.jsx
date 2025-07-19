// //ApplicantForm.jsx
// import { useForm } from 'react-hook-form';

// const ApplicantForm = ({ scholarship, onSubmit }) => {
//   const { register, handleSubmit } = useForm();

//   const handleForm = (data) => {
//     onSubmit(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(handleForm)} className="grid gap-4">
//       <input {...register('phone')} placeholder="Phone Number" required className="input" />
//       <input {...register('address')} placeholder="Address" required className="input" />
//       <select {...register('gender')} required className="input">
//         <option value="">Select Gender</option>
//         <option>Male</option>
//         <option>Female</option>
//         <option>Other</option>
//       </select>
//       <select {...register('degree')} required className="input">
//         <option value="">Select Degree</option>
//         <option>Diploma</option>
//         <option>Bachelor</option>
//         <option>Masters</option>
//       </select>
//       <input {...register('ssc')} placeholder="SSC Result" required className="input" />
//       <input {...register('hsc')} placeholder="HSC Result" required className="input" />
//       <select {...register('gap')} className="input">
//         <option value="">Study Gap?</option>
//         <option>1 year</option>
//         <option>2+ years</option>
//       </select>

//       {/* Read-only fields */}
//       <input value={scholarship.universityName} readOnly className="input bg-gray-100" />
//       <input value={scholarship.scholarshipCategory} readOnly className="input bg-gray-100" />
//       <input value={scholarship.subjectCategory} readOnly className="input bg-gray-100" />

//       <button type="submit" className="btn btn-primary">Next: Pay & Submit</button>
//     </form>
//   );
// };

// export default ApplicantForm;



import { useForm } from 'react-hook-form';
import { useAuthContext } from '../context/AuthContext'; // Adjust the path if needed

const ApplicantForm = ({ scholarship, onSubmit }) => {
  const { register, handleSubmit } = useForm();
  const { user } = useAuthContext(); // Firebase user context

  const handleForm = (data) => {
    // Merge form data with scholarship fields + user email
    const fullData = {
      ...data,
      universityName: scholarship.universityName,
      scholarshipCategory: scholarship.scholarshipCategory,
      subjectCategory: scholarship.subjectCategory,
      email: user?.email || '', // Add user email here
      applicantName: user?.displayName || '', // Optional: include name
    };
    onSubmit(fullData); // Send full data to parent (to send to backend)
  };

  return (
    <form onSubmit={handleSubmit(handleForm)} className="grid gap-4">
      <input
        {...register('phone')}
        placeholder="Phone Number"
        required
        className="input input-bordered w-full"
      />
      <input
        {...register('address')}
        placeholder="Address"
        required
        className="input input-bordered w-full"
      />
      <select {...register('gender')} required className="input input-bordered w-full">
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
      <select {...register('degree')} required className="input input-bordered w-full">
        <option value="">Select Degree</option>
        <option>Diploma</option>
        <option>Bachelor</option>
        <option>Masters</option>
      </select>
      <input
        {...register('ssc')}
        placeholder="SSC Result"
        required
        className="input input-bordered w-full"
      />
      <input
        {...register('hsc')}
        placeholder="HSC Result"
        required
        className="input input-bordered w-full"
      />
      <select {...register('gap')} className="input input-bordered w-full">
        <option value="">Study Gap?</option>
        <option>1 year</option>
        <option>2+ years</option>
      </select>

      {/* Read-only scholarship fields */}
      <input
        value={scholarship.universityName}
        readOnly
        className="input bg-gray-100 w-full"
      />
      <input
        value={scholarship.scholarshipCategory}
        readOnly
        className="input bg-gray-100 w-full"
      />
      <input
        value={scholarship.subjectCategory}
        readOnly
        className="input bg-gray-100 w-full"
      />

      <button type="submit" className="btn btn-primary w-full">
        Next: Pay & Submit
      </button>
    </form>
  );
};

export default ApplicantForm;
