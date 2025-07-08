import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './UseAxiosSecure';
import UseAuth from './UseAuth';



const useUserRole = () => {
  const { user, loading: authLoading } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = 'user',
    isPending: isRoleLoading,
    isError,
  } = useQuery({
    enabled: !authLoading && !!user?.email,
    queryKey: ['user-role', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data.role;
    },
  });

  return {
    role,
    isRoleLoading,
    isError,
    isAdmin: role === 'admin',
    isRider: role === 'rider',
    isUser: role === 'user',
  };
};

export default useUserRole;
