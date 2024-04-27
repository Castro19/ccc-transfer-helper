import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/authContext/index.tsx";
import HomePage from "./pages/HomePage.tsx";
import SchedulePage from "./pages/SchedulePage.tsx";
import Register from "./pages/register/Register.tsx";
import { SignupFormDemo } from "./pages/register/signup/SignUpForm.tsx";
import { LoginFormDemo } from "./pages/register/login/LoginForm.tsx";
import Home from "./components/tests/Home.tsx";
import Layout from "./components/layouts/Layouts.tsx";
// import App from "./App.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
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
    path: "/schedule",
    element: (
      <Layout>
        <SchedulePage />
      </Layout>
    ),
  },
  {
    path: "/home",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
