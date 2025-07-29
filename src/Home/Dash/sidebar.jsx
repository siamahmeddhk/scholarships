import { Link } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import useRole from "../../hook/useRole";
import { FiUser, FiShield, FiStar } from "react-icons/fi";

const roleColors = {
  user: "bg-blue-500 text-white",
  moderator: "bg-yellow-400 text-black",
  admin: "bg-red-600 text-white",
};

const Sidebar = () => {
  const { user } = useAuthContext();
  const { role, isLoading } = useRole(user?.email);

  if (isLoading)
    return (
      <div className="text-white p-6 text-center font-semibold animate-pulse">
        Loading sidebar...
      </div>
    );

  const linkClasses =
    "block px-4 py-3 rounded-lg hover:bg-indigo-600 hover:shadow-lg transition duration-300 ease-in-out";

  return (
    <div className="w-64 bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-700 text-white p-6 min-h-screen shadow-2xl flex flex-col items-center">
      {/* User Profile Image */}
      <div className="mb-4">
        <img
          src={user?.photoURL || "https://i.ibb.co/zS7xWzF/user.png"}
          alt={`${user?.displayName || "User"} profile`}
          className="w-20 h-20 rounded-full border-4 border-indigo-500 shadow-md object-cover"
        />
      </div>

      {/* User Email */}
      <div className="text-center mb-8 w-full">
        <p className="text-sm truncate max-w-full opacity-80">{user?.email}</p>
      </div>

      {/* Home Link */}
      <div className="mb-6 w-full">
        <Link
          to="/"
          className="block text-center px-4 py-3 rounded-lg bg-indigo-700 hover:bg-indigo-600 shadow-md font-semibold transition duration-300"
          aria-label="Go to homepage"
        >
          🏠 Home
        </Link>
      </div>

      {/* Role-based Menu */}
      {role === "user" && (
        <>
          <h2 className="flex items-center justify-between text-lg font-bold mb-5 border-b border-white pb-2 tracking-wide w-full">
            <span className="flex items-center gap-2">
              <FiUser className="text-blue-400" />
              User Menu
            </span>
            <span
              className={`px-2 py-0.5 rounded text-xs font-semibold ${roleColors.user} select-none`}
              aria-label="User role badge"
            >
              USER
            </span>
          </h2>
          <ul className="space-y-3 flex-grow w-full">
            <li>
              <Link to="/dashboard/user-home" className={linkClasses}>
                🏠 Profile
              </Link>
            </li>
            <li>
              <Link to="/dashboard/my-applications" className={linkClasses}>
                📋 My Applications
              </Link>
            </li>
            <li>
              <Link to="/dashboard/reviews" className={linkClasses}>
                ✍️ Add Review
              </Link>
            </li>
          </ul>
        </>
      )}

      {role === "moderator" && (
        <>
          <h2 className="flex items-center justify-between text-lg font-bold mb-5 border-b border-white pb-2 tracking-wide w-full">
            <span className="flex items-center gap-2">
              <FiShield className="text-yellow-400" />
              Moderator Panel
            </span>
            <span
              className={`px-2 py-0.5 rounded text-xs font-semibold ${roleColors.moderator} select-none`}
              aria-label="Moderator role badge"
            >
              MODERATOR
            </span>
          </h2>
          <ul className="space-y-3 flex-grow w-full">
            <li>
              <Link to="/dashboard/moderator-profile" className={linkClasses}>
                Moderator-profile
              </Link>
            </li>
            <li>
              <Link to="/dashboard/moderator-applications" className={linkClasses}>
                📄 Manage Applications
              </Link>
            </li>
            <li>
              <Link to="/dashboard/moderator-reviews" className={linkClasses}>
                📝 Manage Reviews
              </Link>
            </li>
            <li>
              <Link to="/dashboard/moderator-add-scholarship" className={linkClasses}>
                ➕ Add Scholarship
              </Link>
            </li>
            <li>
              <Link to="/dashboard/moderator-edit-scholarship" className={linkClasses}>
                🎓 Manage Scholarships
              </Link>
            </li>
          </ul>
        </>
      )}

      {role === "admin" && (
        <>
          <h2 className="flex items-center justify-between text-lg font-bold mb-5 border-b border-white pb-2 tracking-wide w-full">
            <span className="flex items-center gap-2">
              <FiStar className="text-red-400" />
              Admin Panel
            </span>
            <span
              className={`px-2 py-0.5 rounded text-xs font-semibold ${roleColors.admin} select-none`}
              aria-label="Admin role badge"
            >
              ADMIN
            </span>
          </h2>
          <ul className="space-y-3 flex-grow w-full">
            <li>
              <Link to="/dashboard/admin-file" className={linkClasses}>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/dashboard/admin-home" className={linkClasses}>
                📊 Data/Statistics
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manage-users" className={linkClasses}>
                👥 Manage Users
              </Link>
            </li>
            <li>
              <Link to="/dashboard/admin-manage-ship" className={linkClasses}>
                🎓 Manage Scholarships
              </Link>
            </li>
            <li>
              <Link to="/dashboard/admin-manage-reviews" className={linkClasses}>
                📝 Manage Reviews
              </Link>
            </li>
            <li>
              <Link to="/dashboard/admin-manage-apply" className={linkClasses}>
                📄 Manage Applications
              </Link>
            </li>
            <li>
              <Link to="/dashboard/admin-add-ship" className={linkClasses}>
                ➕ Add Scholarship
              </Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;
