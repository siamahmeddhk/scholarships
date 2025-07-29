import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

const UserHome = () => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) {
      setUserData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`https://s-server-two.vercel.app/users/${user.email}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return (
      <div className="p-6 text-red-600 font-semibold text-center text-lg">
        🚫 You must be logged in to view your dashboard.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading your profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600 font-semibold text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <h2 className="text-3xl font-bold text-center text-primary mb-8 animate-fade-in">
        Welcome back,{" "}
        <span className="text-accent">{userData?.name || "User"}!</span>
      </h2>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 max-w-md w-full text-center transition-all duration-300 hover:scale-[1.02]">
        <img
          src={userData?.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-28 h-28 mx-auto rounded-full border-4 border-primary shadow-md object-cover"
        />

        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {userData?.name || "No Name Provided"}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-1">{userData?.email}</p>
          <p className="text-gray-500 dark:text-gray-400 mt-1 capitalize">
            Role: {userData?.role || "user"}
          </p>
        </div>

        <div className="mt-6 space-y-2">
          <button className="btn btn-accent w-full">View Applications</button>
          <button className="btn btn-outline btn-secondary w-full">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
