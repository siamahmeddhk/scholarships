import { createBrowserRouter } from "react-router";

import React from "react";
import Root from "../root/Root";
import Home from "../Home/Home";
import AllScholarships from "../pages/AllScholarships";
import ScholarshipDetails from "../component/ScholarshipDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";
import DashboardLayout from "../Home/Dash/DashboardLayout";
import UserHome from "../Home/Dash/UserHome";
import MyApplications from "../Home/Dash/MyApplications";

import Profileup from "../Home/Dash/Profileup";
import ApplyScholarship from "../component/ApplyScholarship";
import ScholarshipDetailsPage from "../Home/Dash/ScholarshipDetailsPage";
import UpdateApplicationForm from "../Home/Dash/UpdateApplicationForm";

// Moderator
import ModeratorApplications from "../Home/Modarators/ModeratorApplications";
import ModeratorRoute from "../Home/Modarators/ModeratorRoute";
import MyReviews from "../component/MyReviews";
import AddScholarship from "../Home/Modarators/AddScholarship";
import ManageUsers from "../Home/Admin/ManageUsers";


import AdminRoute from "../Home/Admin/AdminRoute"
import Addship from "../Home/Admin/Addship";
import AdminManageShip from "../Home/Admin/AdminManageShip";
import AdminManageApply from "../Home/Admin/AdminManageApply";
import AdminReview from "../Home/Admin/AdminReview";
import ErrorPage from "../component/Error";
import ModeratorReview from "../Home/Modarators/ModeratorReviews";
import ModaretorShip from "../Home/Modarators/ModaretorShip";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-scholarships", element: <AllScholarships /> },
      { path: "/scholarship/:id", element: <ScholarshipDetails /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/apply/:id", element: <ApplyScholarship /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "user-home", element: <UserHome /> },
      { path: "my-applications", element: <MyApplications /> },
      { path: "reviews", element: <MyReviews /> },
      { path: "update-profile", element: <Profileup /> },
      { path: "scholarship/:id", element: <ScholarshipDetailsPage /> },
      { path: "UpdateApplicationForm/:id", element: <UpdateApplicationForm /> },

      // 🔒 Moderator route (not nested)
      {
        path: "moderator-applications",
        element: (
          <ModeratorRoute>
            <ModeratorApplications />
          </ModeratorRoute>
        ),
      },
      {
        path: "moderator-reviews",
        element: (
          <ModeratorRoute>
            <ModeratorReview />
          </ModeratorRoute>
        ),
      },
      {
        path: "moderator-add-scholarship",
        element: (
          <ModeratorRoute>
            <AddScholarship />
          </ModeratorRoute>
        ),
      },
      {
        path: "moderator-edit-scholarship",
        element: (
          <ModeratorRoute>
            <ModaretorShip />
          </ModeratorRoute>
        ),
      },
      {
        path: "manage-users",
        element: ( <AdminRoute>
          <ManageUsers></ManageUsers>
        </AdminRoute>
        )
      },
      {
        path: "admin-add-ship",
        element: ( <AdminRoute>
          <Addship></Addship>
        </AdminRoute>
        )
      },
      {
        path: "admin-manage-ship",
        element: ( <AdminRoute>
          <AdminManageShip></AdminManageShip>
        </AdminRoute>
        )
      },
      {
        path: "admin-manage-apply",
        element: ( <AdminRoute>
          <AdminManageApply></AdminManageApply>
        </AdminRoute>
        )
      },
      {
        path: "admin-manage-reviews",
        element: ( <AdminRoute>
          <AdminReview></AdminReview>
        </AdminRoute>
        )
      }
    ],
  },
]);
