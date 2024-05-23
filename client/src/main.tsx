import React from "react";
import "./index.css";
// React router
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
// Context Providers
import { AuthProvider } from "./contexts/authContext/index.tsx";
import { CollegeProvider } from "./contexts/collegeContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// Pages
import HomePage from "./pages/home/HomePage.tsx";
import SchedulePage from "./pages/schedule/SchedulePage.tsx";
import Register from "./pages/register/Register.tsx";
import { SignupFormDemo } from "./pages/register/SignUpForm.tsx";
import { LoginFormDemo } from "./pages/register/LoginForm.tsx";
import ErrorPage from "./pages/error/ErrorPage.tsx";
import SavedSchedulesPage from "./pages/savedSchedules/SavedSchedulesPage.tsx";
import Layout from "./components/layouts/Layouts.tsx";
// Loaders:
import { fetchColleges } from "./pages/home/getAssistData.ts";
import fetchScheduleData from "./pages/schedule/fetchScheduleData.ts";
import fetchSchedules from "./pages/savedSchedules/fetchSchedules.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
    loader: fetchColleges,
    errorElement: (
      <Layout>
        <ErrorPage />
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
    children: [
      { index: true, element: <Navigate to="signup" replace /> },
      { path: "signup", element: <SignupFormDemo /> },
      { path: "login", element: <LoginFormDemo /> },
    ],
  },
  {
    path: "/schedule/:year/:ccc/:cccCode/:college/:major",
    element: (
      <DndProvider backend={HTML5Backend}>
        <Layout>
          <SchedulePage />
        </Layout>
      </DndProvider>
    ),
    loader: fetchScheduleData,
  },
  {
    path: "/savedSchedules/:userId",
    element: (
      <Layout>
        <SavedSchedulesPage />
      </Layout>
    ),
    loader: fetchSchedules,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CollegeProvider>
        <RouterProvider router={router} />
      </CollegeProvider>
    </AuthProvider>
  </React.StrictMode>
);
