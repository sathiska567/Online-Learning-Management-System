import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
const [authToken, setAuthToken] = useState(null);
      
const token = localStorage.getItem("token");
      
useEffect(() => {
    setAuthToken(token); 
}, [token]);

  if (token != null) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}