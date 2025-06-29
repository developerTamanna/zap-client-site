import { Navigate } from 'react-router';
import UseAuth from '../hooks/UseAuth';
import Loading from '../pages/Loading';

const PrivateRouts = ({ children }) => {
  const { user, loading } = UseAuth();
  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRouts;
