import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/authContext";
import { doSignOut } from "@/firebase/auth";
import { User } from "firebase/auth"; // This import assumes you're using Firebase. Adjust if using a different auth system.

import { Button } from "../ui/button";

// Define the structure of the Auth Context if not already defined
interface AuthContextType {
  currentUser: User | null;
}

// Update the useAuth hook return type if necessary
// function useAuth(): AuthContextType {
//   // Implementation or import here
//   // This is just a placeholder to show where the type would be used.
// }

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  let navigate = useNavigate();

  const handleSignOut = () => {
    doSignOut().then(() => {
      navigate("/");
    });
  };
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="space-y-4">
        <div className="text-2xl font-bold">
          Hello {currentUser?.displayName || currentUser?.email}, you are now
          logged in.
        </div>
        <div className="flex justify-center">
          <Button onClick={handleSignOut}> Sign Out</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
