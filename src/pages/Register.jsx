import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Register = () => {
  const { createUser, signInWithGoogle } = useAuthContext();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    photoURL: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const user = await createUser(form.email, form.password, form.name, form.photoURL);
      await saveUserToBackend(user);

      await Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Welcome to the Scholarship Portal.',
        timer: 2500,
        showConfirmButton: false,
      });

      navigate('/');
    } catch (err) {
      const msg = err.message || 'Something went wrong';
      setError(msg);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: msg,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      await saveUserToBackend(user);

      await Swal.fire({
        icon: 'success',
        title: 'Google Sign-In Successful!',
        text: 'Welcome to the Scholarship Portal.',
        timer: 2500,
        showConfirmButton: false,
      });

      navigate('/');
    } catch (err) {
      const msg = err.message || 'Google Sign-In failed';
      setError(msg);
      Swal.fire({
        icon: 'error',
        title: 'Google Sign-In Failed',
        text: msg,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-10 rounded-3xl shadow-2xl bg-gradient-to-tr from-blue-100 to-indigo-200 border border-indigo-300">
      <h2 className="text-4xl font-extrabold text-center text-indigo-900 mb-8 drop-shadow-md">
        Register for Scholarship Portal
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {['name', 'photoURL', 'email'].map((field) => (
          <div key={field} className="flex flex-col">
            <label
              htmlFor={field}
              className="mb-2 font-semibold text-indigo-800 tracking-wide capitalize"
            >
              {field}
            </label>
            <input
              type="text"
              name={field}
              id={field}
              value={form[field]}
              onChange={handleChange}
              required
              placeholder={`Enter your ${field}`}
              className="px-5 py-3 rounded-lg border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-sm transition"
            />
          </div>
        ))}

        {/* Password Field with Eye Toggle */}
        <div className="flex flex-col relative">
          <label htmlFor="password" className="mb-2 font-semibold text-indigo-800 tracking-wide">
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            className="px-5 py-3 rounded-lg border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-sm transition pr-12"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-11 text-indigo-700 cursor-pointer"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </span>
        </div>

        {error && (
          <p className="text-center text-red-600 font-semibold tracking-wide animate-pulse">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-xl shadow-lg transition transform hover:-translate-y-1"
        >
          Create Account
        </button>
      </form>

      <div className="my-8 flex items-center gap-3">
        <div className="flex-grow border-t border-indigo-300" />
        <span className="text-indigo-600 font-semibold">OR</span>
        <div className="flex-grow border-t border-indigo-300" />
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-4 border-2 border-indigo-700 text-indigo-700 hover:bg-indigo-100 py-3 rounded-xl font-semibold shadow-md transition"
      >
        <FcGoogle className="text-3xl" />
        Continue with Google
      </button>

      <p className="text-center text-indigo-900 mt-8 font-semibold tracking-wide">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-700 underline hover:text-indigo-900">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
