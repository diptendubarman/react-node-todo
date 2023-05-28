import React from "react";
import { Navigate } from "react-router-dom";
import { checkCookie } from "./utils/index";

const AuthenticatedRoute = ({ children }) => {
  const isAuthenticated = checkCookie("todo-authenticated");

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default AuthenticatedRoute;
