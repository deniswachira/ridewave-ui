import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import Explore from './pages/Explore';
import Login from './pages/Login';
import UserBookings from './components/dashboard/UserBookings';
import UserTickets from './components/dashboard/UserTickets';
import UserProfiles from './components/adminDashboard/UserProfiles';
import AdminDashboard from './pages/AdminDashboard';
import Analytics from './components/adminDashboard/Analytics';
import MyProfile from './components/dashboard/MyProfile';
import CarDetailPage from './pages/CarDetailPage';
import AllBookings from './components/adminDashboard/AllBookings';
import NewBookings from './components/adminDashboard/NewBookings';
import AllPayments from './components/adminDashboard/AllPayments';
import AdminProfile from './components/adminDashboard/AdminProfile';
import BookingDetails from './components/adminDashboard/BookingDetails';
import AllTicket from './components/adminDashboard/AllTicket';
import VehiclesSpecs from './components/adminDashboard/VehiclesSpecs';
import AddSpecs from './components/adminDashboard/AddSpecs';
import Upload from './pages/Upload';
import Success from './pages/Success';
import Failed from './pages/Failed';
import Payment from './components/dashboard/Payment';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "upload",
    element: <Upload />,
  },
  {
    path: 'explore',
    element: <Explore />,
    errorElement: <Error />,
  },
  {
    path: 'register',
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: 'login',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: 'success',
    element: <Success />,
    errorElement: <Error />,
  },
  {
    path: 'failed',
    element: <Failed />,
    errorElement: <Error />,
  },
  {
    path: 'contact',
    element: <Contact />,
    errorElement: <Error />,
  },
  {
    path: 'vehicle/:id',
    element: <CarDetailPage />,
    errorElement: <Error />,
  },
  {
    path: 'dashboard/me',
    element: (
      <ProtectedRoute requiredRoles={['user']}>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <MyProfile />,
      },
      {
        path: "my-bookings",
        element: <UserBookings />,
      },
      {
        path: "my-payments",
        element: <Payment />,
      },
      {
        path: "tickets",
        element: <UserTickets />,
      }
    ]
  },
  {
    path: 'dashboard/admin',
    element: (
      <ProtectedRoute requiredRoles={['admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Analytics />,
      },
      {
        path: "admin-profile",
        element: <AdminProfile />,
      },
      {
        path: "all-user-profiles",
        element: <UserProfiles />,
      },
      {
        path: "new-bookings",
        element: <NewBookings />,
      },
      {
        path: "new-bookings/bookings-details/:booking_id",
        element: <BookingDetails />,
      },
      {
        path: "all-bookings",
        element: <AllBookings />,
      },
      {
        path: "vehicle-specs",
        element: <VehiclesSpecs />,
      },
      {
        path: "vehicle-specs/add-vehicle-spec",
        element: <AddSpecs />,
      },
      {
        path: "payments",
        element: <AllPayments />,
      },
      {
        path: "tickets",
        element: <AllTicket />,
      },
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
