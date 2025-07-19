// // components/CheckoutForm.jsx
// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const CheckoutForm = ({ scholarship, applicantInfo }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [clientSecret, setClientSecret] = useState('');
//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     // Create PaymentIntent when component mounts
//     axios.post('http://localhost:5000/create-payment-intent', {
//       price: scholarship.fee,
//     }).then(res => {
//       setClientSecret(res.data.clientSecret);
//     }).catch(err => {
//       console.error('Error creating payment intent:', err);
//     });
//   }, [scholarship]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     setProcessing(true);

//     const card = elements.getElement(CardElement);

//     const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card,
//     });

//     if (methodError) {
//       setError(methodError.message);
//       setProcessing(false);
//       return;
//     }

//     const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: paymentMethod.id
//     });

//     if (confirmError) {
//       setError(confirmError.message);
//       setProcessing(false);
//       return;
//     }

//     if (paymentIntent.status === 'succeeded') {
//       setSuccess('Payment successful!');
//       // Save applicant info and payment to backend (optional)
//       console.log('Applicant info:', applicantInfo);
//     }

//     setProcessing(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
//       <CardElement />
//       {error && <p className="text-red-500 text-sm">{error}</p>}
//       {success && <p className="text-green-500 text-sm">{success}</p>}
//       <button
//         type="submit"
//         disabled={!stripe || processing || !clientSecret}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         {processing ? 'Processing...' : 'Pay Now'}
//       </button>
//     </form>
//   );
// };

// export default CheckoutForm;
