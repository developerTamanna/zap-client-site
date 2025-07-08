import { Navigate, useLocation } from 'react-router';
import Loading from '../pages/Loading';
import useUserRole from '../hooks/useUserRole';
import UseAuth from '../hooks/UseAuth';

const AdminRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, isRoleLoading } = useUserRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return <Loading />;
  }

  if (!user || role !== 'admin') {
    return (
      <Navigate to="/forbidden" state={{ from: location.pathname }} replace />
    );
  }

  return children;
};

export default AdminRoute;
