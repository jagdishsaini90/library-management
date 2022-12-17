import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../dashboard/header";
import { useAuthContext } from "./authProvider";

const PrivateRoute = () => {
  const { user } = useAuthContext();
  return user ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
