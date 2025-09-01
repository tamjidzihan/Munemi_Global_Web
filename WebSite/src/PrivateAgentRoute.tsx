import React from "react";
import { Navigate, Outlet } from "react-router-dom";


const AgentRoute: React.FC = () => {
    const agent = true
    return agent ? <Outlet /> : <Navigate to='/agentlogin' />
};

export default AgentRoute