import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import profast from '../../../assets/logo.png';
import UseAuth from '../../../hooks/UseAuth';

const Login = () => {

  const location = useLocation();
  // const navigate = location.state?.from || '/'
  const navigate = useNavigate();
  const from = location.state?.from || '/';
  const { googleSignin, signin } = UseAuth();
  const handleGoogleSignIn = () => {
    googleSignin()
      .then((result) => {
        console.log('Google Sign In Successful:', result.user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error('Google Sign In Failed:', error);
      });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // Handle login logic here
    signin(data.email, data.password).then(result => {
      console.log('Login Successful:', result.user);
      navigate(from, { replace: true });
    }).catch(error => {
      console.error('Login Failed:', error);
      // Handle login error (e.g., show a toast notification)
    })
    console.log('Login Data:', data);
  };
  return (
    <div className="w-full max-w-sm bg-white p-10 rounded-lg shadow-lg">
      {/* Logo + Brand text */}
      <div className="flex items-center gap-2 text-xl font-bold mb-6">
        <img src={profast} alt="Profast Logo" className="h-8" />
        <h2>Profast</h2>
      </div>

      {/* Title + subtitle */}
      <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
      <p className="mb-6 text-sm text-gray-500">Login with Profast</p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="email"
          name="email"
          {...register('email')}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
          {...register('password', { required: true, minLength: 6 })}
        />

        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.type === 'minLength'
              ? 'Password must be at least 6 characters long'
              : 'Password is required'}
          </span>
        )}

        {/* Forgot‑password link */}
        <div className="text-right">
          <span className="text-sm text-lime-600 cursor-pointer hover:underline">
            Forgot password?
          </span>
        </div>

        {/* Login button */}
        <button
          type="submit"
          className="w-full py-2 bg-lime-400 hover:bg-lime-500 rounded text-white font-semibold"
        >
          Login
        </button>
      </form>

      {/* Register link */}
      <p className="text-sm mt-4">
        Don&rsquo;t have an account?{' '}
        <Link
          to="/register"
          className="text-lime-600 cursor-pointer font-medium hover:underline"
        >
          Register
        </Link>
      </p>

      {/* Divider */}
      <div className="my-4 text-center text-gray-400">Or</div>

      {/* Google login */}
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 py-2 border rounded bg-gray-100 hover:bg-gray-200"
      >
        <FcGoogle className="w-5 h-5" />
        Login with Google
      </button>
    </div>
  );
};

export default Login;
