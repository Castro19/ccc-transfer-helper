import React from "react";
import { NavLink } from "react-router-dom";
import UserMenu from "../userProfile/UserMenu";

const CombinedNavbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <NavLink to="/" className="text-3xl hover:text-gray-300">
            California Community College Transfer Helper
          </NavLink>
        </div>
        <UserMenu />
      </div>
    </nav>
  );
};

export default CombinedNavbar;
