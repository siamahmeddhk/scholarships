import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const { createUser, signInWithGoogle } = useAuthContext();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    photoURL: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (!/[A-Z]/.test(password)) return 'Must include one uppercase letter.';
    if (!/[#?!@$%^&*-]/.test(password)) return 'Must include one special character.';
    return null;
  };

  const saveUserToBackend = async (user) => {
    // Prepare user data for backend
    const userData = {
      uid: user.uid,
      email: user.email,
      name: user.displayName || form.name || 'New User',
      photoURL: user.photoURL || form.photoURL || 'https://via.placeholder.com/150',
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    await axios.post('https://s-server-two.vercel.app/users', userData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const passwordError = validatePassword(form.password);
    if (passwordError) return setError(passwordError);

    try {
      // Pass name and photoURL as arguments to createUser
      const user = await createUser(form.email, form.password, form.name, form.photoURL);

      // Save user to backend
      await saveUserToBackend(user);

      navigate('/');
    } catch (err) {
      console.error('Registration Error:', err);
      setError(err.message || 'Something went wrong');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();

      // Save Google user to backend
      await saveUserToBackend(user);

      navigate('/');
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      setError(err.message || 'Google Sign-In failed');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-8 rounded-lg shadow-lg bg-white border">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Register for Scholarship Portal</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {['name', 'photoURL', 'email', 'password'].map((field) => (
          <div key={field}>
            <label className="block mb-1 font-medium text-gray-700 capitalize">{field}</label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              placeholder={`Enter your ${field}`}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        ))}

        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
        >
          Create Account
        </button>
      </form>

      <div className="my-6 flex items-center gap-2">
        <div className="border-t border-gray-300 flex-1" />
        <span className="text-gray-500 text-sm">OR</span>
        <div className="border-t border-gray-300 flex-1" />
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-100 py-2 rounded transition"
      >
        <FcGoogle className="text-xl" />
        <span className="text-gray-700 font-medium">Continue with Google</span>
      </button>

      <p className="text-center text-sm mt-5">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
