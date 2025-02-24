'use client';

import Login from "../../components/login";
import Regis from "../../components/registration";

const AuthPage = () => {
  return (
    <div>
      <Login />
      <p>Do you want to register?</p>
      <Regis />
    </div>
  );
};

export default AuthPage;
