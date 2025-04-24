import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function ForwardRoute({ element }) {
  const { user } = useContext(AuthContext);

  if (user) {
    const route =
      user?.authId?.role === "ADMIN"
        ? "/app/admin_dashboard"
        : "/app/user_dashboard";
    return <Navigate to={route} />;
  }

  return element;
}
