import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
  const { signIn, signInWithGoogle } = useAuthContext();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signIn(form.email, form.password);
      navigate('/'); // Redirect on successful login
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded shadow">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Login to Your Account</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
            placeholder="example@mail.com"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
            placeholder="Enter your password"
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={handleGoogleSignIn}
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          {/* Google logo SVG (optional) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 488 512"
            fill="currentColor"
          >
            <path d="M488 261.8c0-17.4-1.6-34.1-4.7-50.3H249v95.1h134.7c-5.8 31-23.1 57.3-49.3 74.9v62h79.7c46.7-43 73.9-106.3 73.9-181.7z" />
            <path d="M249 492c66.8 0 122.9-22.1 163.8-60l-79.7-62c-22.2 15-50.6 24-84.1 24-64.7 0-119.6-43.7-139.3-102.3h-82.8v64.3C73.7 438 156.8 492 249 492z" />
            <path d="M109.7 299.7c-4.6-13.7-7.2-28.2-7.2-43s2.6-29.3 7.2-43v-64.3h-82.8C15.1 198.4 0 243.5 0 299.7s15.1 101.3 42.9 140.6l66.8-64.3z" />
            <path d="M249 99.3c35.9 0 68.3 12.4 93.9 36.6l70.6-70.6C370.2 24 316.9 0 249 0 156.8 0 73.7 54 42.9 140.6l66.8 64.3c19.7-58.6 74.6-102.3 139.3-102.3z" />
          </svg>
          Sign in with Google
        </button>
      </div>

      <p className="text-center text-sm mt-6">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-600 underline">
          Register here
        </a>
      </p>
    </div>
  );
};

export default Login;
