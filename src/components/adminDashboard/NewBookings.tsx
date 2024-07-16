import { useEffect, useState } from "react";
import axios from 'axios';
import { bookingApi } from "../../features/api/bookingApiSlice";

interface Booking {
  booking_id: number;
  user_id: string;
  vehicle_id: string;
  booking_date: string;
  returning_date: string;
  total_amount: number;
  location: string;  
  booking_status: 'approved' | 'pending' | 'rejected';
}



function NewBookings() {

  const { data: Allbookings = []} = bookingApi.useFetchBookingsQuery({});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [page, setPage] = useState(1);
  const bookingsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null); // State to track selected booking for popup
  const [paymentDetails, setPaymentDetails] = useState<any>(null); // State to store payment details
  const [loadingPayment, setLoadingPayment] = useState(false); // Loading state for payment details
   useEffect(() => {
    if (Allbookings.length > 0) {
      setBookings(Allbookings);
    }
  }, [Allbookings]);

  useEffect(() => {
    setFilteredBookings(
      bookings.filter(booking =>
        booking.booking_status === 'pending' &&
        (booking.location.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );
  }, [searchQuery, bookings]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const openPopup = async (booking: Booking) => {
    setSelectedBooking(booking);
    setLoadingPayment(true);
    try {
      // Replace with actual API endpoint to fetch payment details
      const response = await axios.get(`/api/payments/${booking.booking_id}`);
      setPaymentDetails(response.data);
    } catch (error) {
      console.error('Error fetching payment details:', error);
    } finally {
      setLoadingPayment(false);
    }
  };

  const closePopup = () => {
    setSelectedBooking(null);
    setPaymentDetails(null);
  };

  const approveBooking = async () => {
    try {
      // Replace with actual API endpoint and logic to approve booking
      await axios.put(`/api/bookings/${selectedBooking?.booking_id}/approve`);
      // Update booking status locally after approval
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.booking_id === selectedBooking?.booking_id ? { ...booking, booking_status: 'approved' } : booking
        )
      );
      closePopup();
    } catch (error) {
      console.error('Error approving booking:', error);
    }
  };

  const paginatedBookings = filteredBookings.slice((page - 1) * bookingsPerPage, page * bookingsPerPage);

  return (
    <div className="container mx-auto py-5 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Pending Bookings</h1>
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search by user or car name"
          className="input input-bordered w-full max-w-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Location</th>
              <th>Booking Date</th>
              <th>Returning Date</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">No pending bookings available 😒</td>
              </tr>
            ) : (
              paginatedBookings.map(booking => (
                <tr key={booking.booking_id}>
                  <td>{booking.booking_id}</td>
                  <td>{booking.location}</td>
                  <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
                  <td>{new Date(booking.returning_date).toLocaleDateString()}</td>
                  <td>Ksh: {booking.total_amount}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => openPopup(booking)}>View Details</button>
                  </td>
                  {/* <td>
                    <Link to={`bookings-details/${booking.booking_id}`}>
                      <button className="btn btn-secondary" disabled>View Details</button>
                    </Link>
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-8">
        <div className="btn-group">
          <button
            className="btn"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </button>
          <button
            className="btn"
            disabled={page === Math.ceil(filteredBookings.length / bookingsPerPage)}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Popup / Modal */}
      {selectedBooking && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Booking Details</h2>
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={closePopup}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <hr className="my-2" />
              <table className="table-auto w-full">
                <tbody>
                  <tr>
                    <td className="font-semibold">Booking ID:</td>
                    <td>{selectedBooking.booking_id}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Location:</td>
                    <td>{selectedBooking.location}</td>
                  </tr>                 
                  <tr>
                    <td className="font-semibold">Booking Date:</td>
                    <td>{new Date(selectedBooking.booking_date).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Returning Date:</td>
                    <td>{new Date(selectedBooking.returning_date).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Amount:</td>
                    <td>Ksh {selectedBooking.total_amount}</td>
                  </tr>
                </tbody>
              </table>
              <hr className="my-4" />
              <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
              {loadingPayment ? (
                <p>Loading payment details...</p>
              ) : paymentDetails ? (
                <table className="table-auto w-full">
                  <tbody>
                    <tr>
                      <td className="font-semibold">Payment ID:</td>
                      <td>{paymentDetails.payment_id}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Amount Paid:</td>
                        <td>Ksh {paymentDetails.payment_amount}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Payment Date:</td>
                      <td>{new Date(paymentDetails.payment_date).toLocaleDateString()}</td>
                    </tr>
                      <tr>
                        <td className="font-semibold">Payment Status:</td>
                        <td>{new Date(paymentDetails.payment_status).toLocaleDateString()}</td>
                      </tr>
                  </tbody>
                </table>
              ) : (
                <p>No payment details found.</p>
              )}
            </div>
            <div className="px-6 py-4 bg-gray-100 border-t border-gray-200 flex justify-end">
              <button className="btn btn-primary mr-2" onClick={approveBooking}>Approve Booking</button>
              <button className="btn btn-secondary" onClick={closePopup}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewBookings;
