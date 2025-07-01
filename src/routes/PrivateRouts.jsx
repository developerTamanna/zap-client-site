import { Navigate, useLocation } from 'react-router';
import UseAuth from '../hooks/UseAuth';
import Loading from '../pages/Loading';

const PrivateRouts = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();
  // console.log(location)
  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <Navigate state={{from:location.pathname}} to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRouts;
