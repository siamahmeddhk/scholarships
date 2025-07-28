// import { Link } from "react-router"; // Use react-router-dom
// import { useAuthContext } from "../../context/AuthContext";
// import useRole from "../../hook/useRole";

// const Sidebar = () => {
//   const { user } = useAuthContext();
//   const { role, isLoading } = useRole(user?.email);

//   if (isLoading)
//     return (
//       <div className="text-white p-4 text-center font-semibold">
//         Loading sidebar...
//       </div>
//     );

//   // Common link styles for better UI
//   const linkClasses =
//     "block px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300";

//   return (
//     <div className="w-64 bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-700 text-white p-6 min-h-screen shadow-lg">
//       <div className="text-center mb-8">
//         {user?.photoURL ? (
//           <img
//             src={user.photoURL}
//             alt="User"
//             className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-white shadow-md"
//           />
//         ) : (
//           <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-indigo-600 flex items-center justify-center text-3xl font-bold shadow-md">
//             {user?.displayName?.charAt(0) || "U"}
//           </div>
//         )}
//         <p className="text-lg font-semibold">{user?.displayName || "User"}</p>
//         <p className="text-sm truncate max-w-full">{user?.email}</p>
//       </div>

//       {/* User Menu */}
//       {role === "user" && (
//         <>
//           <h2 className="text-xl font-bold mb-4 border-b border-white pb-2">
//             User Menu
//           </h2>
//           <ul className="space-y-3">
//             <li>
//               <Link to="/dashboard/user-home" className={linkClasses}>
//                 🏠 Dashboard Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/dashboard/my-applications" className={linkClasses}>
//                 📋 My Applications
//               </Link>
//             </li>
//             <li>
//               <Link to="/dashboard/reviews" className={linkClasses}>
//                 ✍️ Add Review
//               </Link>
//             </li>
            
//           </ul>
//         </>
//       )}

//       {/* Moderator Menu */}
//       {role === "moderator" && (
//         <>
//           <h2 className="text-xl font-bold mb-4 border-b border-white pb-2">
//             Moderator Panel
//           </h2>
//           <ul className="space-y-3">
//             <li>
//               <Link to="/dashboard/moderator" className={linkClasses}>
//                 🛠️ Dashboard Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/dashboard/moderator-applications" className={linkClasses}>
//                 📄 All Applications
//               </Link>
//             </li>
//             <li>
//               <Link to="/dashboard/moderator-reviews" className={linkClasses}>
//                 📝 All Reviews
//               </Link>
//             </li>
//              <li>
//         <Link to="/dashboard/moderator-add-scholarship" className={linkClasses}>
//           ➕ Add Scholarship
//         </Link>
//       </li>
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default Sidebar;



import { Link } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import useRole from "../../hook/useRole";

const Sidebar = () => {
  const { user } = useAuthContext();
  const { role, isLoading } = useRole(user?.email);

  if (isLoading)
    return (
      <div className="text-white p-4 text-center font-semibold">
        Loading sidebar...
      </div>
    );

  const linkClasses =
    "block px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300";

  return (
    <div className="w-64 bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-700 text-white p-6 min-h-screen shadow-lg">
      <div className="text-center mb-8">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User"
            className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-white shadow-md"
          />
        ) : (
          <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-indigo-600 flex items-center justify-center text-3xl font-bold shadow-md">
            {user?.displayName?.charAt(0) || "U"}
          </div>
        )}
        <p className="text-lg font-semibold">{user?.displayName || "User"}</p>
        <p className="text-sm truncate max-w-full">{user?.email}</p>
      </div>

      {/* ✅ User Menu */}
      {role === "user" && (
        <>
          <h2 className="text-xl font-bold mb-4 border-b border-white pb-2">
            User Menu
          </h2>
          <ul className="space-y-3">
            <li>
              <Link to="/dashboard/user-home" className={linkClasses}>
                🏠 Dashboard Home
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

      {/* ✅ Moderator Menu */}
      {role === "moderator" && (
        <>
          <h2 className="text-xl font-bold mb-4 border-b border-white pb-2">
            Moderator Panel
          </h2>
          <ul className="space-y-3">
            <li>
              <Link to="/dashboard/moderator" className={linkClasses}>
                🛠️ Dashboard Home
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
          </ul>
        </>
      )}

      {/* ✅ Admin Menu */}
      {role === "admin" && (
        <>
          <h2 className="text-xl font-bold mb-4 border-b border-white pb-2">
            Admin Panel
          </h2>
          <ul className="space-y-3">
            <li>
              <Link to="/dashboard/admin" className={linkClasses}>
                🏢 Admin Home
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
