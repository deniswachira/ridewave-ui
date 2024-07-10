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
import Users from './components/adminDashboard/Users.tsx'
import MyProfile from './components/dashboard/MyProfile.tsx'
import CarDetailPage from './pages/CarDetailPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
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
    element: <Dashboard />,
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
        path: "me",
        element: <MyProfile />,
      },
      {
        path: "all-users",
        element: <Users />,
      },
      {
        path: "all-user-profiles",
        element: <UserProfiles />,
      },
      {
        path: "all-bookings",
        element: <Users />,
      },
      {
        path: "confirmed-bookings",
        element: <UserProfiles />,
      },
      {
        path: "pending-bookings",
        element: <UserProfiles />,
      }
    ]

  },
])



function App() {

  return <RouterProvider router={router} />;

}

export default App
