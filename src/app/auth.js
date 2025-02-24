"use client";  // Ensures this runs on the client-side

import React from "react";
import Login from "../../components/login";
import Registration from "../../components/registration";

const AuthPage = () => {
  return (
    <div>
      <h2>Do you want to Login?</h2>
      <Login />
      <h2>Do you want to Register?</h2>
      <Registration />
    </div>
  );
};

export default AuthPage;
