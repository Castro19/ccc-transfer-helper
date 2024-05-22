import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar(): JSX.Element {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUserPhoto(user.photoURL);
      } else {
        // User is signed out
        setUserPhoto(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Avatar>
      <AvatarImage src={userPhoto || "../../../static/imgs/test.png"} />
    </Avatar>
  );
}

export default UserAvatar;
