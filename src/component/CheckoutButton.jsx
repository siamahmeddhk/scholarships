// // components/CheckoutButton.jsx
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import CheckoutForm from './CheckoutForm';

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// const CheckoutButton = ({ scholarship, applicantInfo }) => {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm scholarship={scholarship} applicantInfo={applicantInfo} />
//     </Elements>
//   );
// };

// export default CheckoutButton;
