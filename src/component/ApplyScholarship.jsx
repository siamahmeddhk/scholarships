// pages/ApplyScholarship.jsx
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';


import { useState } from 'react';
import axios from 'axios';
import ApplicantForm from '../Home/ApplicantForm';
import CheckoutButton from '../Home/CheckoutButton';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const ApplyScholarship = () => {
  const { id } = useParams();
  const [applicantInfo, setApplicantInfo] = useState(null);

  const { data: scholarship, isLoading } = useQuery({
    queryKey: ['applyScholarship', id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/scholarships/${id}`);
      return res.data;
    }
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Apply for {scholarship.universityName}</h2>

      {!applicantInfo && (
        <ApplicantForm
          scholarship={scholarship}
          onSubmit={(data) => setApplicantInfo(data)} // pass data to parent
        />
      )}

      {applicantInfo && (
        <Elements stripe={stripePromise}>
  <CheckoutButton
          scholarship={scholarship}
          applicantInfo={applicantInfo}
        />

        </Elements>
      
      )}
    </div>
  );
};

export default ApplyScholarship;
