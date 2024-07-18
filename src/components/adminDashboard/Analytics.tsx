import { bookingApi } from "../../features/api/bookingApiSlice";
import { userApi } from "../../features/api/userApiSlice";
import { carApi } from '../../features/api/carApiSlice';
import { paymentApi } from '../../features/api/paymentApiSlice';
import { FaUsers, FaCar, FaDollarSign, FaTicketAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AnimatedLoader from "../AnimatedLoader";

const cardVariants = {
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300 },
  },
  tap: { scale: 0.95 },
  loading: {
    opacity: 0.5,
    transition: { duration: 0.5 },
  },
};

function Analytics() {
  const { data: bookingsData = [], isLoading: bookingsLoading } = bookingApi.useFetchBookingsQuery(1, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const { data: usersProfile, isLoading: usersLoading } = userApi.useGetUsersProfilesQuery(1, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 120000,
  });

  const { data: vehiclesData = [], isLoading: vehiclesLoading } = carApi.useFetchCarsWithSpecsQuery(1, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 120000,
  });

  const { data: paymentsData = [], isLoading: paymentsLoading } = paymentApi.useGetPaymentsQuery(1, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 120000,
  });

  const confirmedBookings: number = bookingsData.filter((booking: { booking_status: string; }) => booking.booking_status === 'approved').length;
  const pendingBookings: number = bookingsData.filter((booking: { booking_status: string; }) => booking.booking_status === 'pending' || booking.booking_status === 'rejected').length;
  const confirmedPayments: number = paymentsData.filter((payment: { payment_status :string}) => payment.payment_status === 'paid').length;
  const pendingPayments: number = paymentsData.filter((payment: { payment_status: string }) => payment.payment_status === 'pending' || payment.payment_status === "failed").length;

  const usersCount:number = usersProfile?.length || 0;
  const vehiclesCount:number = vehiclesData.length;

  const availableVehicles: number = vehiclesData.filter((vehicle: { availability: string }) => vehicle.availability === 'Available').length;
  const notAvailableVehicles: number = vehiclesData.filter((vehicle: { availability: string }) => vehicle.availability === 'Not Available').length;

  const totalRevenue: number = paymentsData
    .filter((payment: { payment_status: string; }) => payment.payment_status === 'paid')
    .reduce((sum: number, payment: { payment_amount: string | number }) => sum + Number(payment.payment_amount), 0);
  return (
    <>
      <div className="container mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          className={`card bg-blue-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center ${bookingsLoading ? "opacity-50" : ""}`}
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {bookingsLoading ? (
            <AnimatedLoader />
          ) : (
            <>
              <FaUsers size={40} />
              <h2 className="text-2xl font-bold mt-4">Users</h2>
              <p className="text-lg mt-2">{usersCount}</p>
            </>
          )}
        </motion.div>

        <motion.div
          className={`card bg-green-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center ${usersLoading ? "opacity-50" : ""}`}
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {vehiclesLoading ? (
            <AnimatedLoader />
          ) : (
            <>
              <FaCar size={40} />
              <h2 className="text-2xl font-bold mt-4">Vehicles</h2>
              <p className="text-lg mt-2">{vehiclesCount}</p>
            </>
          )}
        </motion.div>

        <motion.div
          className={`card bg-yellow-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center ${paymentsLoading ? "opacity-50" : ""}`}
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {paymentsLoading ? (
            <AnimatedLoader />
          ) : (
            <>
              <FaDollarSign size={40} />
              <h2 className="text-2xl font-bold mt-4">Revenue</h2>
              <p className="text-lg mt-2">Ksh {totalRevenue.toLocaleString()}</p>
            </>
          )}
        </motion.div>

        <motion.div
          className={`card bg-red-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center ${bookingsLoading ? "opacity-50" : ""}`}
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {bookingsLoading ? (
            <AnimatedLoader />
          ) : (
            <>
              <FaTicketAlt size={40} />
              <h2 className="text-2xl font-bold mt-4">Bookings</h2>
              <p className="text-lg mt-2">{confirmedBookings + pendingBookings}</p>
            </>
          )}
        </motion.div>
      </div>

      <div className="container mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Bookings Overview</h2>
          <div className="flex items-center justify-between w-full">
            <div className="text-4xl font-bold text-green-600">{confirmedBookings}</div>
            <span className="text-gray-600">Confirmed</span>
          </div>
          <div className="flex items-center justify-between w-full mt-2">
            <div className="text-4xl font-bold text-yellow-600">{pendingBookings}</div>
            <span className="text-gray-600">Pending</span>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Payments Overview</h2>
          <div className="flex items-center justify-between w-full">
            <div className="text-4xl font-bold text-green-600">{confirmedPayments}</div>
            <span className="text-gray-600">Confirmed</span>
          </div>
          <div className="flex items-center justify-between w-full mt-2">
            <div className="text-4xl font-bold text-yellow-600">{pendingPayments}</div>
            <span className="text-gray-600">Pending</span>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Vehicles Status</h2>
          <div className="flex items-center justify-between w-full">
            <div className="text-4xl font-bold text-green-600">{availableVehicles}</div>
            <span className="text-gray-600">Available Vehicles</span>
          </div>
          <div className="flex items-center justify-between w-full mt-2">
            <div className="text-4xl font-bold text-red-600">{notAvailableVehicles}</div>
            <span className="text-gray-600">Not Available</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
