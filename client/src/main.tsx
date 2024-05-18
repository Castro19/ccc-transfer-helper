import React from "react";
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

import HomePage from "./pages/HomePage.tsx";
import SchedulePage from "./pages/schedule/SchedulePage.tsx";
import Register from "./pages/register/Register.tsx";
import { SignupFormDemo } from "./pages/register/signup/SignUpForm.tsx";
import { LoginFormDemo } from "./pages/register/login/LoginForm.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import Home from "./components/tests/Home.tsx";
import SavedSchedulesPage from "./pages/savedSchedules/SavedSchedulesPage.tsx";
import Layout from "./components/layouts/Layouts.tsx";

// Loaders:
import { fetchColleges } from "./components/homePage/utils/getAssistData.ts";
import fetchScheduleData from "./components/schedulePage/utils/fetchScheduleData.ts";
import "./index.css";
import fetchSchedules from "./components/schedulePage/crudSchedules/scheduleList/fetchSchedules.ts";

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
    path: "/home",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
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
  {
    path: "/404",
    element: (
      <Layout>
        <ErrorPage />
      </Layout>
    ),
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
