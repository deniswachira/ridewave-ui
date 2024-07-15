import { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Booking, Revenue, BookingStatus } from "../../types/Types";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
import 'chart.js/auto';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const dummyBookingData: Booking[] = [
  { date: '2024-01-01', count: 5 },
  { date: '2024-02-01', count: 10 },
  { date: '2024-03-01', count: 15 },
  // Add more data as needed
];

const dummyRevenueData: Revenue[] = [
  { month: 'January', amount: 1000 },
  { month: 'February', amount: 1500 },
  { month: 'March', amount: 2000 },
  // Add more data as needed
];

const dummyBookingStatusData: BookingStatus[] = [
  { status: 'approved', count: 60 },
  { status: 'pending', count: 30 },
  { status: 'rejected', count: 10 },
  // Add more data as needed
];

function Analytics() {
  const [bookingData, setBookingData] = useState<Booking[]>([]);
  const [revenueData, setRevenueData] = useState<Revenue[]>([]);
  const [bookingStatusData, setBookingStatusData] = useState<BookingStatus[]>([]);

  useEffect(() => {
    setBookingData(dummyBookingData);
    setRevenueData(dummyRevenueData);
    setBookingStatusData(dummyBookingStatusData);
  }, []);

  const lineChartData = {
    labels: bookingData.map(data => data.date),
    datasets: [
      {
        label: 'Bookings Over Time',
        data: bookingData.map(data => data.count),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const barChartData = {
    labels: revenueData.map(data => data.month),
    datasets: [
      {
        label: 'Revenue Per Month',
        data: revenueData.map(data => data.amount),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: bookingStatusData.map(data => data.status),
    datasets: [
      {
        label: 'Booking Status Distribution',
        data: bookingStatusData.map(data => data.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto py-12 px-4">
      {/* <h1 className="text-4xl font-bold text-center mb-8">Analytics 😊😊😊</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card w-full bg-gray-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Bookings Over Time</h2>
            <Line data={lineChartData} />
          </div>
        </div>
        <div className="card w-full bg-gray-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Revenue Per Month</h2>
            <Bar data={barChartData} />
          </div>
        </div>
        <div className="card w-full bg-gray-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Booking Status Distribution</h2>
            <Pie data={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;