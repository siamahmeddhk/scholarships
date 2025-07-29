import React from 'react';
import { useAuthContext } from '../../context/AuthContext';

const Adminpro = () => {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        🚫 You must be logged in as admin to view this page.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <img
          src={user.photoURL || 'https://via.placeholder.com/150'}
          alt="Admin Profile"
          className="mx-auto rounded-full w-32 h-32 border-4 border-indigo-600"
        />
        <h1 className="mt-6 text-3xl font-bold text-gray-900">{user.displayName || 'Admin Name'}</h1>
        <p className="text-gray-700 mt-1">{user.email || 'admin@example.com'}</p>
        <p className="mt-2 inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
          Role: Admin
        </p>
      </div>
    </div>
  );
};

export default Adminpro;
