import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/common/Loader";
import { useAuth } from "../context/AuthContext";

const AdminRoute: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) return <Loader />;

    // Only allow access if role is admin (2)
    return user ? <Outlet /> : <Navigate to="/signin" />;

};

export default AdminRoute;
