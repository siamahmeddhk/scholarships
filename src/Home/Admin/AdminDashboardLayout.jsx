import { Outlet, NavLink } from "react-router";

const AdminDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-xl font-bold mb-8">Admin Dashboard</h1>
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/admin/manage-users"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-gray-700" : ""}`
            }
          >
            Manage Users
          </NavLink>
          <NavLink
            to="/admin/manage-scholarships"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-gray-700" : ""}`
            }
          >
            Manage Scholarships
          </NavLink>
          <NavLink
            to="/admin/manage-applications"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-gray-700" : ""}`
            }
          >
            Manage Applications
          </NavLink>
          <NavLink
            to="/admin/manage-reviews"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-gray-700" : ""}`
            }
          >
            Manage Reviews
          </NavLink>
          <NavLink
            to="/admin/add-scholarship"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-gray-700" : ""}`
            }
          >
            Add Scholarship
          </NavLink>
          <NavLink
            to="/admin/analytics"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-gray-700" : ""}`
            }
          >
            Analytics
          </NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
