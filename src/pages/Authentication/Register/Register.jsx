import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';
import profast from '../../../assets/logo.png';
import UseAuth from '../../../hooks/UseAuth';
const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { createUser, googleSignin, updateUserProfile } = UseAuth();
  const [profilePic, setProfilePic] = useState('');
  const onSubmit = (data) => {
    console.log('Registration Data:', data);
    // console.log(createUser);
    createUser(data.email, data.password)
      .then((result) => {
        console.log('User Created:', result.user);
        //update userInfo in the database
        //update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUserProfile(userProfile)
          .then(() => {
          console.log('profile name pic updated')
          })
          .catch((error) => {
          console.log(error)
        })
      })
      .catch((error) => {
        console.error('User creation failed:', error);
      });
  };

  // Google Sign In Handler
  const handleGoogleSignIn = () => {
    googleSignin()
      .then((result) => {
        console.log('Google Sign In Successful:', result.user);
      })
      .catch((error) => {
        console.error('Google Sign In Failed:', error);
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    // console.log(image);
    const formData = new FormData();
    formData.append('image', image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imageUploadUrl, formData);
    setProfilePic(res.data.data.url);
  };
  return (
    <div className="bg-white p-10 rounded-lg shadow-lg">
      {/* Logo */}
      <div className="flex gap-2 text-xl font-bold">
        <img src={profast} alt="Profast Logo" className="h-8 mb-4" />
        <h2>Profast</h2>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">Create an Account</h2>
      <p className="mb-6 text-sm text-gray-500">Register with Profast</p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <input
          {...register('name')}
          type="text"
          name="name"
          placeholder="Name"
          className="w-full px-4 py-2 border rounded"
        />
        {/* Email */}
        <input
          {...register('email')}
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
        />
        {/* Password */}
        <input
          {...register('password', {
            required: true,
            minLength: 6,
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
              message:
                'Password must include uppercase, lowercase, and a special character',
            },
          })}
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
        />
        {/* Error Message for Password */}
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.type === 'minLength'
              ? 'Password must be at least 6 characters long'
              : errors.password.message}
          </span>
        )}

        {/* Photo URL */}
        <input
          {...register('photoURL')}
          onChange={handleImageUpload}
          type="file"
          // name="photoURL"
          placeholder="upload file"
          className="w-full px-4 py-2 border rounded"
        />

        {/* Register Button */}
        <button
          type="submit"
          className="w-full py-2 bg-lime-400 hover:bg-lime-500 rounded text-white font-semibold"
        >
          Register
        </button>
      </form>

      {/* Already have account */}
      <p className="text-sm mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-lime-600 hover:underline font-medium">
          Login
        </Link>
      </p>

      {/* OR Divider */}
      <div className="my-4 text-center text-gray-400">Or</div>

      {/* Google Register Button */}
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 py-2 border rounded bg-gray-100 hover:bg-gray-200"
      >
        <FcGoogle className="w-5 h-5" />
        Register with Google
      </button>
    </div>
  );
};

export default Register;
