import React from "react";
import { useAuthContext } from "../../context/AuthContext";

const Modpro = () => {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        You must be logged in as a Moderator to view this profile.
      </div>
    );
  }

  // For demo, assuming role is passed as user.role or fallback to 'moderator'
  const role = user.role || "moderator";

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:text-white">
      <div className="flex flex-col items-center">
        <img
          src={user.photoURL || "https://via.placeholder.com/150"}
          alt="Moderator Profile"
          className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-md"
        />

        <h2 className="mt-4 text-2xl font-bold">{user.displayName || "Moderator Name"}</h2>
        <p className="text-indigo-400 mb-1 capitalize">{role}</p>
        <p className="text-gray-600 dark:text-gray-300">{user.email}</p>

        <button className="mt-6 btn btn-indigo w-full hover:bg-indigo-600 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Modpro;
