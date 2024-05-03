import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, MenuItem, HoveredLink } from "@/components/ui/navbar-item";
import { useAuth } from "@/contexts/authContext";
import { doSignOut } from "@/firebase/auth";
import { Button } from "@/components/ui/button";

const UserMenu = () => {
  const { userLoggedIn } = useAuth();

  const [active, setActive] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignOut = () => {
    doSignOut().then(() => {
      navigate("/");
    });
  };

  return (
    <div>
      {userLoggedIn ? (
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="profile">
            <HoveredLink
              to="/signout"
              onClick={handleSignOut}
              className="hover:text-gray-300"
            >
              Sign out
            </HoveredLink>
          </MenuItem>
        </Menu>
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
  );
};

export default UserMenu;