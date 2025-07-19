// components/CheckoutButton.jsx
import { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuthContext } from '../context/AuthContext'; // your own context

const CheckoutButton = ({ scholarship, applicantInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuthContext();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    axios.post('http://localhost:5000/create-payment-intent', {
      amount: scholarship.applicationFees
    }).then(res => {
      setClientSecret(res.data.clientSecret);
    });
  }, [scholarship.applicationFees]);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (error) {
      return Swal.fire('Error', error.message, 'error');
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id
    });

    if (confirmError) {
      return Swal.fire('Error', confirmError.message, 'error');
    }

    if (paymentIntent.status === 'succeeded') {
      const application = {
        ...applicantInfo,
        userName: user.displayName,
        userEmail: user.email,
        userId: user._id, // get from MongoDB fetch
        scholarshipId: scholarship._id,
        date: new Date(),
        universityName: scholarship.universityName,
        subjectCategory: scholarship.subjectCategory,
        scholarshipCategory: scholarship.scholarshipCategory,
        applicationFees: scholarship.applicationFees,
        serviceCharge: scholarship.serviceCharge,
        status: 'pending'
      };

      const res = await axios.post('http://localhost:5000/applications', application);
      if (res.data.insertedId) {
        Swal.fire('Success', 'Application submitted successfully!', 'success');
      }
    }
  };

  return (
    <form onSubmit={handlePayment} className="mt-6">
      <CardElement />
      <button className="btn btn-success mt-4" type="submit" disabled={!stripe}>
        Pay & Apply
      </button>
    </form>
  );
};

export default CheckoutButton;
