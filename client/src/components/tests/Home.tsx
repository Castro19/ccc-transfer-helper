import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/authContext";
import { doSignOut } from "@/firebase/auth";
import { Button } from "../ui/button";

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    doSignOut().then(() => {
      navigate("/");
    });
  };
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="space-y-4">
        <div className="text-2xl font-bold">
          Hello {currentUser?.displayName || currentUser?.email}
          , you are now logged in.
        </div>
        <div className="flex justify-center">
          <Button onClick={handleSignOut}> Sign Out</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
