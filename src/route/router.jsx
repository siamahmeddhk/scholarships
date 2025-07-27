// import { createBrowserRouter } from "react-router";

// import React from "react";
// import Root from "../root/Root";
// import Home from "../Home/Home";
// import AllScholarships from "../pages/AllScholarships";
// import ScholarshipDetails from "../component/ScholarshipDetails";
// import Register from "../pages/Register";
// import Login from "../pages/Login";
// import DashboardLayout from "../Home/Dash/DashboardLayout";
// import UserHome from "../Home/Dash/UserHome";
// import MyApplications from "../Home/Dash/MyApplications";
// import AddReview from "../Home/Dash/AddReview";
// import Profileup from "../Home/Dash/Profileup";
// import ApplyScholarship from "../component/ApplyScholarship";
// import ScholarshipDetailsPage from "../Home/Dash/ScholarshipDetailsPage";
// import UpdateApplicationForm from "../Home/Dash/UpdateApplicationForm";
// import ModeratorApplications from "../Home/Modarators/ModeratorApplications";
// import ModeratorRoute from "../Home/Modarators/ModeratorRoute";
// import ModeratorDashboard from "../Home/Modarators/ModeratorDashboard";

// // Import ModeratorRoute and moderator components


// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/all-scholarships",
//         element: <AllScholarships />,
//       },
//       {
//         path: "/scholarship/:id",
//         element: <ScholarshipDetails />,
//       },
//       {
//         path: "/register",
//         element: <Register />,
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },
//       {
//         path: "/apply/:id",
//         element: <ApplyScholarship />,
//       },
//     ],
//   },
//   {
//     path: "/dashboard",
//     element: <DashboardLayout />,
//     children: [
//       {
//         path: "user-home",
//         element: <UserHome />,
//       },
//       {
//         path: "my-applications",
//         element: <MyApplications />,
//       },
//       {
//         path: "reviews",
//         element: <AddReview />,
//       },
//       {
//         path: "update-profile",
//         element: <Profileup />,
//       },
//       {
//         path: "scholarship/:id",
//         element: <ScholarshipDetailsPage />,
//       },
//       {
//         path: "UpdateApplicationForm/:id",
//         element: <UpdateApplicationForm />,
//       },

//       // Moderator nested routes
//       {
//         path: "moderator",
//         element: (
//           <ModeratorRoute>
//             <ModeratorDashboard />
//           </ModeratorRoute>
//         ),
//         children: [
//           {
//             path: "applications",
//             element: (
//               <ModeratorRoute>
//                 <ModeratorApplications />
//               </ModeratorRoute>
//             ),
//           },
//           // Add more moderator-specific routes here if needed
//         ],
//       },
//     ],
//   },
// ]);




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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
      <MyReviews />
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
    ],
  },
]);
