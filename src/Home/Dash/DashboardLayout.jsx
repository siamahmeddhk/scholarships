import { Outlet } from "react-router";
import { useState } from "react";
import { Menu } from "lucide-react"; // or use your preferred icon library
import Sidebar from "./sidebar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Mobile Navbar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-gray-800 text-white">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          ${isSidebarOpen ? "block" : "hidden"} 
          lg:block 
          w-full lg:w-64 bg-gray-100 shadow-lg
        `}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
