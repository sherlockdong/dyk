'use client';

import Login from "../../components/login";
import Regis from "../../components/registration";
import Goog from "../../components/googlesignin"

const AuthPage = () => {
  return (
    <div>
      <Login />
      <p>Or, first time? </p>
      <Regis />
      <Goog />
    </div>
  );
};

export default AuthPage;
