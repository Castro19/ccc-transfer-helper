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
import {
  AuthProvider,
  LayoutProvider,
  CollegeProvider,
  ScheduleProvider,
} from "./contexts/index.ts";
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
import SplashPage from "./pages/splashPage/SplashPage.tsx";
// Loaders:
import { fetchColleges } from "./pages/home/getAssistData.ts";
import {
  fetchScheduleData,
  loadScheduleData,
} from "./pages/schedule/fetchScheduleData.ts";
import fetchSchedules from "./pages/savedSchedules/fetchSchedules.ts";

const router = createBrowserRouter([
  {
    path: "/home",
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
    path: "/schedules/:id",
    element: (
      <DndProvider backend={HTML5Backend}>
        <Layout>
          <SchedulePage />
        </Layout>
      </DndProvider>
    ),
    loader: loadScheduleData,
  },
  {
    path: "/schedule/:year/:ccc/:cccCode/:transferCollege/:major",
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
  {
    path: "/",
    element: <SplashPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <LayoutProvider>
        <CollegeProvider>
          <ScheduleProvider>
            <RouterProvider router={router} />
          </ScheduleProvider>
        </CollegeProvider>
      </LayoutProvider>
    </AuthProvider>
  </React.StrictMode>
);
