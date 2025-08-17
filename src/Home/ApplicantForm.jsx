

// import { useForm } from 'react-hook-form';
// import { useAuthContext } from '../context/AuthContext'; // Adjust the path if needed

// const ApplicantForm = ({ scholarship, onSubmit }) => {
//   const { register, handleSubmit } = useForm();
//   const { user } = useAuthContext(); // Firebase user context

//   const handleForm = (data) => {
//     // Merge form data with scholarship fields + user email
//     const fullData = {
//       ...data,
//       universityName: scholarship.universityName,
//       scholarshipCategory: scholarship.scholarshipCategory,
//       subjectCategory: scholarship.subjectCategory,
//       email: user?.email || '', // Add user email here
//       applicantName: user?.displayName || '', // Optional: include name
//     };
//     onSubmit(fullData); // Send full data to parent (to send to backend)
//   };

//   return (
//     <form onSubmit={handleSubmit(handleForm)} className="grid gap-4">
//       <input
//         {...register('phone')}
//         placeholder="Phone Number"
//         required
//         className="input input-bordered w-full"
//       />
//       <input
//         {...register('address')}
//         placeholder="Address"
//         required
//         className="input input-bordered w-full"
//       />
//       <select {...register('gender')} required className="input input-bordered w-full">
//         <option value="">Select Gender</option>
//         <option>Male</option>
//         <option>Female</option>
//         <option>Other</option>
//       </select>
//       <select {...register('degree')} required className="input input-bordered w-full">
//         <option value="">Select Degree</option>
//         <option>Diploma</option>
//         <option>Bachelor</option>
//         <option>Masters</option>
//       </select>
//       <input
//         {...register('ssc')}
//         placeholder="SSC Result"
//         required
//         className="input input-bordered w-full"
//       />
//       <input
//         {...register('hsc')}
//         placeholder="HSC Result"
//         required
//         className="input input-bordered w-full"
//       />
//       <select {...register('gap')} className="input input-bordered w-full">
//         <option value="">Study Gap?</option>
//         <option>1 year</option>
//         <option>2+ years</option>
//       </select>

//       {/* Read-only scholarship fields */}
//       <input
//         value={scholarship.universityName}
//         readOnly
//         className="input bg-gray-100 w-full"
//       />
//       <input
//         value={scholarship.scholarshipCategory}
//         readOnly
//         className="input bg-gray-100 w-full"
//       />
//       <input
//         value={scholarship.subjectCategory}
//         readOnly
//         className="input bg-gray-100 w-full"
//       />

//       <button type="submit" className="btn btn-primary w-full">
//         Next: Pay & Submit
//       </button>
//     </form>
//   );
// };

// export default ApplicantForm;





import { useForm } from 'react-hook-form';
import { useAuthContext } from '../context/AuthContext';
import { FaPhone, FaMapMarkerAlt, FaVenusMars, FaGraduationCap, FaBook, FaUniversity } from 'react-icons/fa';

const ApplicantForm = ({ scholarship, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user } = useAuthContext();

  const handleForm = (data) => {
    const fullData = {
      ...data,
      universityName: scholarship.universityName,
      scholarshipCategory: scholarship.scholarshipCategory,
      subjectCategory: scholarship.subjectCategory,
      email: user?.email || '',
      applicantName: user?.displayName || '',
    };
    onSubmit(fullData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Form</h2>
        <p className="text-gray-600">Apply for {scholarship.scholarshipName} at {scholarship.universityName}</p>
      </div>

      <form onSubmit={handleSubmit(handleForm)} className="space-y-6">
        {/* Personal Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Personal Information</h3>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaPhone className="text-gray-400" />
            </div>
            <input
              {...register('phone', { 
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9\+\- ]+$/,
                  message: 'Please enter a valid phone number'
                }
              })}
              placeholder="Phone Number"
              className={`pl-10 input w-full ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaMapMarkerAlt className="text-gray-400" />
            </div>
            <input
              {...register('address', { required: 'Address is required' })}
              placeholder="Full Address"
              className={`pl-10 input w-full ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaVenusMars className="text-gray-400" />
            </div>
            <select 
              {...register('gender', { required: 'Gender is required' })}
              className={`pl-10 input w-full ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
            )}
          </div>
        </div>

        {/* Academic Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Academic Information</h3>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaGraduationCap className="text-gray-400" />
            </div>
            <select
              {...register('degree', { required: 'Degree level is required' })}
              className={`pl-10 input w-full ${errors.degree ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Degree Level</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor">Bachelor's Degree</option>
              <option value="Masters">Master's Degree</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.degree && (
              <p className="mt-1 text-sm text-red-600">{errors.degree.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaBook className="text-gray-400" />
              </div>
              <input
                {...register('ssc', { 
                  required: 'SSC result is required',
                  pattern: {
                    value: /^[0-9.]+$/,
                    message: 'Please enter a valid result (e.g., 5.00)'
                  }
                })}
                placeholder="SSC GPA (e.g., 5.00)"
                className={`pl-10 input w-full ${errors.ssc ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.ssc && (
                <p className="mt-1 text-sm text-red-600">{errors.ssc.message}</p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaBook className="text-gray-400" />
              </div>
              <input
                {...register('hsc', { 
                  required: 'HSC result is required',
                  pattern: {
                    value: /^[0-9.]+$/,
                    message: 'Please enter a valid result (e.g., 5.00)'
                  }
                })}
                placeholder="HSC GPA (e.g., 5.00)"
                className={`pl-10 input w-full ${errors.hsc ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.hsc && (
                <p className="mt-1 text-sm text-red-600">{errors.hsc.message}</p>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaGraduationCap className="text-gray-400" />
            </div>
            <select
              {...register('gap')}
              className="pl-10 input w-full border-gray-300"
            >
              <option value="">No study gap</option>
              <option value="1 year">1 year gap</option>
              <option value="2 years">2 years gap</option>
              <option value="3+ years">3+ years gap</option>
            </select>
          </div>
        </div>

        {/* Scholarship Information (Read-only) */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Scholarship Details</h3>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUniversity className="text-gray-400" />
            </div>
            <input
              value={scholarship.universityName}
              readOnly
              className="pl-10 input w-full bg-gray-100 border-gray-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                value={scholarship.scholarshipCategory}
                readOnly
                className="input w-full bg-gray-100 border-gray-200"
              />
            </div>
            <div className="relative">
              <input
                value={scholarship.subjectCategory}
                readOnly
                className="input w-full bg-gray-100 border-gray-200"
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicantForm;