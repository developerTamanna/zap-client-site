// src/routes/RiderRoute.jsx
import { Navigate, useLocation } from 'react-router';

import UseAuth from '../hooks/UseAuth';
import useUserRole from '../hooks/useUserRole';
import Loading from '../pages/Loading';


const RiderRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, isRoleLoading } = useUserRole();
  const location = useLocation();

  // ⏳ কেউ যদি এখনও লোড হচ্ছে…
  if (loading || isRoleLoading) {
    return <Loading />;
  }


  if (!user || (role !== 'rider' )) {
    return (
      <Navigate to="/forbidden" state={{ from: location.pathname }} replace />
    );
  }

  return children;
};

export default RiderRoute;
