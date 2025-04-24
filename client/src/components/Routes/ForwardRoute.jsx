import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function ForwardRoute({ element }) {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/app" /> : element;
}
