import { Outlet } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Added X icon for close button
import Sidebar from "./sidebar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Mobile Navbar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-indigo-900 text-white shadow-md sticky top-0 z-30">
        <h2 className="text-xl font-bold tracking-wide">Dashboard</h2>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-white focus:outline-none"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 bottom-0 w-64 bg-gray-100 shadow-2xl transform
          lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
          z-50
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button for mobile */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-700 hover:text-indigo-700 focus:outline-none"
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 min-h-screen overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
