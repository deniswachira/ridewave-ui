import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Navigate } from "react-router-dom";


import { ReactNode } from "react";

const ProtectedRoute = ({ children, allowedRoles }: { children: ReactNode, allowedRoles: any[] }) => {
    const { user } = useSelector((state: RootState) => state.auth);

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;