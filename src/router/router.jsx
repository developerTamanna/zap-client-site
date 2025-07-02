import { createBrowserRouter } from 'react-router';
import AuthLayout from '../layout/AuthLayout';
import RootLayout from '../layout/RootLayout';
import ForgotPassword from '../pages/Authentication/ForgotPassword/ForgotPassword';
import Login from '../pages/Authentication/Login/Login';
import Register from '../pages/Authentication/Register/Register';
import Home from '../pages/Home/Home/Home';
import VerifyCode from '../pages/Authentication/VerifyCode/VerifyCode';
import Coverage from '../pages/Coverage/Coverage';
import RiderForm from '../pages/RiderForm/RiderForm';
import TrackOrder from '../pages/TrackOrder/TrackOrder';
import Pricing from '../pages/Pricing/Pricing';
import Contact from '../pages/Contact/Contact';
import AboutUs from '../pages/AboutUs/AboutUs';
import Services from '../pages/Services/Services';
import AddParcel from '../pages/AddParcel/AddParcel';
import PrivateRoutes from '../routes/PrivateRouts'
import DashboardLayout from '../layout/DashboardLayout';
import MyParcels from '../pages/Dashboard/MyParcels/MyParcels';
import Payment from '../pages/Dashboard/Payment/Payment';
import PaymentHistory from '../pages/Dashboard/PaymentHistory';
import TrackPackage from '../pages/Dashboard/TrackPackage/TrackPackage';
import UpdateProfile from '../pages/Dashboard/UpdateProfile/UpdateProfile';
export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'coverage',
        Component: Coverage,
        loader: () => fetch('./serviceCenter.json'),
      },
      {
        path: 'rider-form',
        Component: RiderForm,
      },
      {
        path: 'track-order',
        Component: TrackOrder,
      },
      {
        path: 'pricing',
        Component: Pricing,
      },
      {
        path: 'contact',
        Component: Contact,
      },
      {
        path: 'about',
        Component: AboutUs,
      },
      {
        path: 'services',
        Component: Services,
      },
      {
        path: 'add-parcel',
        // Component: AddParcel,
        element: (
          <PrivateRoutes>
            <AddParcel />
          </PrivateRoutes>
        ),
        loader: () => fetch('./serviceCenter.json'),
      },
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'forgot-password',
        Component: ForgotPassword,
      },
      {
        path: 'verify-code',
        Component: VerifyCode,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      { path: 'myParcels', element: <MyParcels /> },
      // { path: 'item1', element: <Item1 /> }, // চাইলে আলাদা পেজ

      // { path: 'item2', element: <Item2 /> },
      // { index: true, element: <MyParcels /> }, // default route
      {
        path: 'payment/:parcelId',
        Component: Payment,
      },
      {
        path: 'paymentHistory',
        Component: PaymentHistory,
      },
      {
        path: 'track',
        Component: TrackPackage,
      },
      {
        path: 'update-profile',
        Component: UpdateProfile,
      },
    ],
  },
]);
