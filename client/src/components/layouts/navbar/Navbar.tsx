import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { doSignOut } from "@/firebase/auth";

import { User } from "@/components/firebase/auth"; // This import assumes you're using Firebase. Adjust if using a different auth system.
import { useAuth } from "@/contexts/authContext";
// import NavbarTitle from "./NavbarTitle";

const Navbar = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    doSignOut().then(() => {
      navigate("/");
    });
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <NavLink to="/" className="text-xl hover:text-gray-300">
            California Community College Transfer Helper
          </NavLink>
        </div>
        {userLoggedIn ? (
          <Button onClick={handleSignOut}> Sign Out</Button>
        ) : (
          <div className="flex gap-2">
            <Button className=" text-white font-bold py-2 px-4 rounded">
              <NavLink to="/register/login">Login</NavLink>
            </Button>
            <Button className="">
              <NavLink to="/register/signup">Sign Up</NavLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
