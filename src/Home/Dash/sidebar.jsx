import { Link } from "react-router";
import { useAuthContext } from "../../context/AuthContext";


const Sidebar = () => {
  const { user } = useAuthContext(); // Get logged in user

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <div className="text-center mb-6">
        {user?.photoURL && (
          <img
            src={user.photoURL}
            alt="User"
            className="w-16 h-16 rounded-full mx-auto mb-2"
          />
        )}
        <p className="font-semibold">{user?.displayName}</p>
        <p className="text-sm">{user?.email}</p>
      </div>
      
      <h2 className="text-xl font-bold mb-4 border-b border-white pb-2">User Menu</h2>
      <ul className="space-y-4">
        <li><Link to="/dashboard/user-home">Dashboard Home</Link></li>
        <li><Link to="/dashboard/my-applications">My Applications</Link></li>
        <li><Link to="/dashboard/reviews">Add Review</Link></li>
        <li><Link to="/dashboard/update-profile">Update Profile</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
