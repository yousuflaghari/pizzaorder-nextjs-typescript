import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const userName = useSelector((state) => state.user.name);

  return userName ? <Outlet /> : <Navigate href="/" />;
};

export default PrivateRoute;
