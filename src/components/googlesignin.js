
import { auth } from "../firebase"; // Adjusted path to reach project-root/firebase.js

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const GoogleSignIn = () => {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Signed-in user info:
      const user = result.user;
      console.log("User info:", user);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return (
    <button onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
};

export default GoogleSignIn;