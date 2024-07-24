import { bookingApi } from "../../features/api/bookingApiSlice";
import { userApi } from "../../features/api/userApiSlice";
import { carApi } from '../../features/api/carApiSlice';
import { paymentApi } from '../../features/api/paymentApiSlice';
import { FaUsers, FaCar, FaDollarSign, FaTicketAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AnimatedLoader from "../AnimatedLoader";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ticketApi } from "../../features/api/ticketApiSlice";

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

interface Ticket {
  ticket_id: number;
  user_id: number;
  subject: string;
  message: string;
  status: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

  const { data: ticketsData = [] } = ticketApi.useGetAllTicketsQuery(1, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 120000,
  });

  const confirmedBookings: number = bookingsData.filter((booking: { booking_status: string; }) => booking.booking_status === 'approved').length;
  const pendingBookings: number = bookingsData.filter((booking: { booking_status: string; }) => booking.booking_status === 'pending' || booking.booking_status === 'rejected').length;
  const confirmedPayments: number = paymentsData.filter((payment: { payment_status: string }) => payment.payment_status === 'paid').length;
  const pendingPayments: number = paymentsData.filter((payment: { payment_status: string }) => payment.payment_status === 'pending' || payment.payment_status === "failed").length;
  const pendingTickets: number = ticketsData.filter((ticket: Ticket) => ticket.status === 'open').length;
  const closedTickets: number = ticketsData.filter((ticket: Ticket) => ticket.status === 'closed').length;

  const usersCount: number = usersProfile?.length || 0;
  const vehiclesCount: number = vehiclesData.length;
  const ticketsCount: number = ticketsData.length;

  const availableVehicles: number = vehiclesData.filter((vehicle: { availability: string }) => vehicle.availability === 'Available').length;
  const notAvailableVehicles: number = vehiclesData.filter((vehicle: { availability: string }) => vehicle.availability === 'Not Available').length;

  const totalRevenue: number = paymentsData
    .filter((payment: { payment_status: string; }) => payment.payment_status === 'paid')
    .reduce((sum: number, payment: { payment_amount: string | number }) => sum + Number(payment.payment_amount), 0);

  const pieData = [
    { name: 'Confirmed Bookings', value: confirmedBookings },
    { name: 'Pending Bookings', value: pendingBookings },
    { name: 'Confirmed Payments', value: confirmedPayments },
    { name: 'Pending Payments', value: pendingPayments },
  ];

  // Grouping payments by day and summing the revenue
  const revenueByDay = paymentsData
    .filter((payment: { payment_status: string }) => payment.payment_status === 'paid')
    .reduce((acc: { [key: string]: number }, payment: { payment_date: string, payment_amount: string | number }) => {
      const date = new Date(payment.payment_date).toISOString().split('T')[0]; // Extracting the date part
      if (!acc[date]) acc[date] = 0;
      acc[date] += Number(payment.payment_amount);
      return acc;
    }, {});

  // Converting the revenueByDay object to an array suitable for recharts
  const lineData = Object.keys(revenueByDay).map(date => ({
    name: date,
    value: revenueByDay[date],
  }));

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

        <motion.div
          className={`card bg-purple-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center ${bookingsLoading ? "opacity-50" : ""}`}
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {bookingsLoading ? (
            <AnimatedLoader />
          ) : (
            <>
              <FaTicketAlt size={40} />
              <h2 className="text-2xl font-bold mt-4">Tickets</h2>
              <p className="text-lg mt-2">{ticketsCount}</p>
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
            <span className="text-gray-600">Paid</span>
          </div>
          <div className="flex items-center justify-between w-full mt-2">
            <div className="text-4xl font-bold text-yellow-600">{pendingPayments}</div>
            <span className="text-gray-600">Pending</span>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Vehicles Availability</h2>
          <div className="flex items-center justify-between w-full">
            <div className="text-4xl font-bold text-green-600">{availableVehicles}</div>
            <span className="text-gray-600">Available</span>
          </div>
          <div className="flex items-center justify-between w-full mt-2">
            <div className="text-4xl font-bold text-red-600">{notAvailableVehicles}</div>
            <span className="text-gray-600">Not Available</span>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Tickets Overview</h2>
          <div className="flex items-center justify-between w-full">
            <div className="text-4xl font-bold text-yellow-600">{pendingTickets}</div>
            <span className="text-gray-600">Open</span>
          </div>
          <div className="flex items-center justify-between w-full mt-2">
            <div className="text-4xl font-bold text-green-600">{closedTickets}</div>
            <span className="text-gray-600">Closed</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Revenue Statistics</h2>
        <div className="flex flex-col lg:flex-row items-center justify-around">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6 lg:mb-0">
            <h3 className="text-xl font-semibold mb-4">Pie Chart</h3>
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Line Chart</h3>
            <LineChart
              width={500}
              height={300}
              data={lineData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
