import { createBrowserRouter } from 'react-router';
import AuthLayout from '../layout/AuthLayout';
import DashboardLayout from '../layout/DashboardLayout';
import RootLayout from '../layout/RootLayout';
import AboutUs from '../pages/AboutUs/AboutUs';
import AddParcel from '../pages/AddParcel/AddParcel';
import ForgotPassword from '../pages/Authentication/ForgotPassword/ForgotPassword';
import Login from '../pages/Authentication/Login/Login';
import Register from '../pages/Authentication/Register/Register';
import VerifyCode from '../pages/Authentication/VerifyCode/VerifyCode';
import Contact from '../pages/Contact/Contact';
import Coverage from '../pages/Coverage/Coverage';
import ActiveRiders from '../pages/Dashboard/ActiveRiders/ActiveRiders';
import AssignRider from '../pages/Dashboard/AssignRider/AssignRider';
import MakeAdmin from '../pages/Dashboard/MakeAdmin/MakeAdmin';
import MyParcels from '../pages/Dashboard/MyParcels/MyParcels';
import Payment from '../pages/Dashboard/Payment/Payment';
import PaymentHistory from '../pages/Dashboard/PaymentHistory';
import PendingRiders from '../pages/Dashboard/PendingRiders/PendingRiders';
import TrackPackage from '../pages/Dashboard/TrackPackage/TrackPackage';
import UpdateProfile from '../pages/Dashboard/UpdateProfile/UpdateProfile';
import Forbidden from '../pages/Forbidden/Forbidden';
import Home from '../pages/Home/Home/Home';
import Pricing from '../pages/Pricing/Pricing';
import RiderForm from '../pages/RiderForm/RiderForm';
import Services from '../pages/Services/Services';
import TrackOrder from '../pages/TrackOrder/TrackOrder';
import AdminRoute from '../routes/AdminRoute';
import PrivateRoutes from '../routes/PrivateRouts';
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
        path: 'forbidden',
        Component: Forbidden,
      },
      {
        path: 'rider-form',
        // Component: RiderForm,
        element: (
          <PrivateRoutes>
            <RiderForm />
          </PrivateRoutes>
        ),
        loader: () => fetch('/serviceCenter.json'),
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
      {
        path: 'pending-riders',
        // Component: PendingRiders,
        element: (
          <AdminRoute>
            <PendingRiders></PendingRiders>
          </AdminRoute>
        ),
      },
      {
        path: 'assign-rider',
        element: (
          <AdminRoute>
            <AssignRider></AssignRider>
          </AdminRoute>
        ),
      },
      {
        path: 'active-riders',
        // Component: ActiveRiders,
        element: (
          <AdminRoute>
            <ActiveRiders></ActiveRiders>
          </AdminRoute>
        ),
      },
      {
        path: 'make-admin',
        // Component: MakeAdmin,
        element: (
          <AdminRoute>
            <MakeAdmin></MakeAdmin>
          </AdminRoute>
        ),
      },
    ],
  },
]);
