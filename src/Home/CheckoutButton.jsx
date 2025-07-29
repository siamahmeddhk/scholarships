// // components/CheckoutButton.jsx
// import { useEffect, useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useAuthContext } from '../context/AuthContext'; // your own context

// const CheckoutButton = ({ scholarship, applicantInfo }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const { user } = useAuthContext();
//   const [clientSecret, setClientSecret] = useState('');

//   useEffect(() => {
//     axios.post('https://s-server-two.vercel.app/create-payment-intent', {
//       amount: scholarship.applicationFees
//     }).then(res => {
//       setClientSecret(res.data.clientSecret);
//     });
//   }, [scholarship.applicationFees]);

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     const card = elements.getElement(CardElement);
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card
//     });

//     if (error) {
//       return Swal.fire('Error', error.message, 'error');
//     }

//     const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: paymentMethod.id
//     });

//     if (confirmError) {
//       return Swal.fire('Error', confirmError.message, 'error');
//     }

//     if (paymentIntent.status === 'succeeded') {
//       const application = {
//         ...applicantInfo,
//         userName: user.displayName,
//         userEmail: user.email,
//         userId: user._id, // get from MongoDB fetch
//         scholarshipId: scholarship._id,
//         date: new Date(),
//         universityName: scholarship.universityName,
//         subjectCategory: scholarship.subjectCategory,
//         scholarshipCategory: scholarship.scholarshipCategory,
//         applicationFees: scholarship.applicationFees,
//         serviceCharge: scholarship.serviceCharge,
//         status: 'pending'
//       };

//       const res = await axios.post('https://s-server-two.vercel.app/applications', application);
//       if (res.data.insertedId) {
//         Swal.fire('Success', 'Application submitted successfully!', 'success');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handlePayment} className="mt-6">
//       <CardElement />
//       <button className="btn btn-success mt-4" type="submit" disabled={!stripe}>
//         Pay & Apply
//       </button>
//     </form>
//   );
// };

// export default CheckoutButton;



















import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext";

const CheckoutButton = ({ scholarship, applicantInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuthContext();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Create payment intent on the backend when scholarship applicationFees changes
    if (!scholarship?.applicationFees) return;

    axios
      .post("https://s-server-two.vercel.app/create-payment-intent", {
        amount: scholarship.applicationFees,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => {
        console.error("Failed to get client secret:", error);
        Swal.fire("Error", "Failed to initialize payment", "error");
      });
  }, [scholarship.applicationFees]);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return Swal.fire("Error", "Stripe is not loaded yet", "error");
    }

    setLoading(true);

    const card = elements.getElement(CardElement);
    if (!card) {
      setLoading(false);
      return Swal.fire("Error", "Card details not found", "error");
    }

    // Create payment method
    const { error: createError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (createError) {
      setLoading(false);
      return Swal.fire("Error", createError.message, "error");
    }

    // Confirm card payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      setLoading(false);
      return Swal.fire("Error", confirmError.message, "error");
    }

    if (paymentIntent?.status === "succeeded") {
      try {
        // Compose application data to send to backend
        const application = {
          ...applicantInfo,
          userName: user.displayName,
          userEmail: user.email,
          userId: user._id || user.uid, // Make sure this comes from your auth state
          scholarshipId: scholarship._id,
          date: new Date(),
          universityName: scholarship.universityName,
          subjectCategory: scholarship.subjectCategory,
          scholarshipCategory: scholarship.scholarshipCategory,
          applicationFees: scholarship.applicationFees,
          serviceCharge: scholarship.serviceCharge,
          status: "pending",
        };

        const res = await axios.post("https://s-server-two.vercel.app/applications", application, {
          headers: {
            Authorization: `Bearer ${user.accessToken || user.token}`, // if you use tokens for backend auth
          },
        });

        if (res.data.insertedId) {
          Swal.fire("Success", "Application submitted successfully!", "success");
        } else {
          Swal.fire("Error", "Failed to submit application", "error");
        }
      } catch (err) {
        console.error("Application submission error:", err);
        Swal.fire("Error", "Failed to submit application", "error");
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handlePayment} className="mt-6">
      <CardElement options={{ hidePostalCode: true }} />
      <button className="btn btn-success mt-4" type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay & Apply"}
      </button>
    </form>
  );
};

export default CheckoutButton;
