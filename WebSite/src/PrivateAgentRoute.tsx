import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAgentAuth } from "./context/AgentAuthProvider";


const AgentRoute: React.FC = () => {
    const { agent } = useAgentAuth()
    return agent ? <Outlet /> : <Navigate to='/agentlogin' />
};

export default AgentRoute