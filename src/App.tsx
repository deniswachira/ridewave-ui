import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Register from './pages/Register.tsx'
import Contact from './pages/Contact.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Error from './pages/Error.tsx'
import Explore from './pages/Explore.tsx'
import Login from './pages/Login.tsx'
import UserBookings from './components/dashboard/UserBookings.tsx'
import UserTickets from './components/dashboard/UserTickets.tsx'
import UserProfiles from './components/adminDashboard/UserProfiles.tsx'
import AdminDashboard from './pages/AdminDashboard.tsx'
import Analytics from './components/adminDashboard/Analytics.tsx'
import MyProfile from './components/dashboard/MyProfile.tsx'
import CarDetailPage from './pages/CarDetailPage.tsx'
import AllBookings from './components/adminDashboard/AllBookings.tsx'
import NewBookings from './components/adminDashboard/NewBookings.tsx'
import AllPayments from './components/adminDashboard/AllPayments.tsx'
import AdminProfile from './components/adminDashboard/AdminProfile.tsx'
import BookingDetails from './components/adminDashboard/BookingDetails.tsx'
import AllTicket from './components/adminDashboard/AllTicket.tsx'
import VehiclesSpecs from './components/adminDashboard/VehiclesSpecs.tsx'
import AddSpecs from './components/adminDashboard/AddSpecs.tsx'
import Upload from './pages/Upload.tsx'
import Success from './pages/Success.tsx'
import Failed from './pages/Failed.tsx'
import Payment from './components/dashboard/Payment.tsx'

// const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
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
    element:  <Dashboard />,
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
    element: <AdminDashboard />,
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

  
])



function App() {

  return <RouterProvider router={router} />;

}

export default App
