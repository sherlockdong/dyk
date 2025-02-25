"use client";  // Ensure this runs on the client side

import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    // Basic client-side validation
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential.user);

      // Create a user document in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
        createdAt: serverTimestamp(),
      });

      // Send email verification
      await sendEmailVerification(userCredential.user);
      setMessage("Registration successful! A verification email has been sent to your email address.");
    } catch (error) {
      console.error("Error:", error.message);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="loginout">
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={register} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px- py-2.5 text-center me-2 mb-2">Register</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Registration;
