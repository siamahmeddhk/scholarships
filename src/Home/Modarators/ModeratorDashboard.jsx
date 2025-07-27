import React from "react";
import { Link } from "react-router";

const ModeratorDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Moderator Dashboard</h1>
      <ul className="space-y-4 text-lg">
        <li>
          <Link to="/dashboard/moderator/applications" className="text-blue-600 underline">
            Manage Applications
          </Link>
        </li>
        <li>
          <Link to="/dashboard/moderator/manage-users" className="text-blue-600 underline">
            Manage Users & Roles
          </Link>
        </li>
        {/* Add more moderator tasks here */}
      </ul>
    </div>
  );
};

export default ModeratorDashboard;
