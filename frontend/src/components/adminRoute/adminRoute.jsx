import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
