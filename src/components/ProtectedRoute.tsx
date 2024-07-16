import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const ProtectedRoute = ({ children, requiredRoles }: { children: React.ReactNode, requiredRoles: string[] }) => {
    const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (requiredRoles && !requiredRoles.includes(role as string)) {
        return <Navigate to="/dashboard/me" />; // Redirect to user's dashboard if unauthorized
    }

    return children;
};

export default ProtectedRoute;
