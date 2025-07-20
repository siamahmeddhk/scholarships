import { createBrowserRouter } from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import Root from "../root/Root";
import Home from "../Home/Home";
import AllScholarships from "../pages/AllScholarships";
import ScholarshipDetails from "../component/ScholarshipDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";
import DashboardLayout from "../Home/Dash/DashboardLayout";
import UserHome from "../Home/Dash/UserHome";
import MyApplications from "../Home/Dash/MyApplications";
import AddReview from "../Home/Dash/AddReview";
import Profileup from "../Home/Dash/Profileup";
import ApplyScholarship from "../component/ApplyScholarship";
import ScholarshipDetailsPage from "../Home/Dash/ScholarshipDetailsPage";
import UpdateApplicationForm from "../Home/Dash/UpdateApplicationForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/all-scholarships",
        Component: AllScholarships,
      },
      {
        path: "/scholarship/:id",
        Component: ScholarshipDetails,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/apply/:id", // ⬅️ Include this route
        element: <ApplyScholarship />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "user-home",
        Component: UserHome,
      },
      {
        path: "my-applications",
        Component: MyApplications,
      },
      {
        path: "reviews",
        Component: AddReview,
      },
      {
        path: "update-profile",
        Component: Profileup,
      },
      {
        path: "scholarship/:id",
        Component: ScholarshipDetailsPage
      },
      {
        path: "UpdateApplicationForm/:id",
        Component: UpdateApplicationForm
      }
    ],
  },
]);
