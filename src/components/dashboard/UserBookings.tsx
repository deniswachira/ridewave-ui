import { useEffect, useState } from "react";
import { bookingApi } from "../../features/api/bookingApiSlice";
import { createBookingResponse } from "../../types/Types";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Swal from 'sweetalert2';
import { loadStripe } from '@stripe/stripe-js';
import { useToast } from '../../components/ToastContext';
import axios from "axios";
const stripePromise = loadStripe('pk_test_51PYWkuRsls6dWz1RBvlMFpPhiI1J9szlUjGxpgAvIXsx2kiC9OWDvnWD6PsEwbUU6CTdw0FJ2O3b0Y6rSXAZ0hc200wJCewxdF'); 

function UserBookings() {
  const { user } = useSelector((state: RootState) => state.auth);
  const user_id = user?.user.user_id;
  const { showToast } = useToast();

  const [page, setPage] = useState(1);
  const { data: bookings = [], isLoading, isError } = bookingApi.useFetchBookingsByUserIdQuery(user_id);
  const [deleteBooking, { isLoading: deleteIsLoading }] = bookingApi.useDeleteBookingMutation();
  const [updateBooking] = bookingApi.useUpdateBookingMutation();
  const [displayedBookings, setDisplayedBookings] = useState<createBookingResponse[]>([]);
  const bookingsPerPage = 8;

  useEffect(() => {
    if (bookings.length > 0) {
      setDisplayedBookings(bookings);
    }
  }, [bookings]);

  const handleDelete = async (booking_id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteBooking(booking_id).unwrap();
        showToast(response.msg, 'success');
      } catch (error: any) {
        console.error('Error deleting booking:', error.data.msg);
        showToast('Booking not deleted successfully! Please try again.', 'warning');
      }
    }
  };

  const handleCheckout = async (booking_id: number) => {
    try {
      setDisplayedBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.booking_id === booking_id ? { ...booking, checkout_status: 'Awaiting Admin Approval' } : booking
        )
      );
      const response = await updateBooking({ booking_id, checkout_status: 'Awaiting Admin Approval' }).unwrap();
      showToast(response.msg, 'success');

      // Your existing checkout logic here...
      const stripe = await stripePromise;
      const booking = displayedBookings.find(booking => booking.booking_id === booking_id);
      
      const header = { 'Content-Type': 'application/json' };

      const checkoutResponse = await axios.post(`http://localhost:8000/create-checkout-session/${booking_id}`, JSON.stringify(booking), {
        headers: header,
      });

      const session = checkoutResponse.data;
      await stripe?.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error('Error checking out booking:', error);
      setDisplayedBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.booking_id === booking_id ? { ...booking, checkout_status: 'Checkout' } : booking
        )
      );
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const pendingBookings = displayedBookings.filter(booking => booking.booking_status === 'pending');
  const confirmedBookings = displayedBookings.filter(booking => booking.booking_status === 'approved' || booking.booking_status === 'rejected');

  return (
    <div className="container mx-auto py-3 px-4">
      <h1 className="text-3xl font-bold text-center mb-4">My Bookings</h1>
      <div>
        <h2 className="text-3xl font-semibold mb-4">Pending Bookings</h2>
        {isLoading && <span className="loading loading-dots loading-lg"></span>}
        {!isLoading && isError && <p className="text-red-500 text-center">Error: {isError.toString()}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingBookings.length === 0 && (
            <p className="text-center">No pending bookings available 😒</p>
          )}
          {pendingBookings.map(booking => (
            <div key={booking.booking_id} className="card w-full bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Booking ID: {booking.booking_id}</h3>
                <p>Booking Date: {new Date(booking.booking_date).toLocaleDateString()}</p>
                <p>Total Amount: Ksh {booking.total_amount}</p> {/* Added total_amount here */}
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleDelete(booking.booking_id)}
                    disabled={deleteIsLoading}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => handleCheckout(booking.booking_id)}
                    disabled={booking.checkout_status === 'Awaiting Admin Approval'}
                  >
                    {booking.checkout_status === 'Awaiting Admin Approval' ? "Awaiting Admin Approval" : "Checkout"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-3xl font-semibold mb-4">Confirmed Bookings</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Booking Date</th>
                <th>Returning Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {confirmedBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center">No confirmed bookings available 😒</td>
                </tr>
              ) : (
                confirmedBookings.slice((page - 1) * bookingsPerPage, page * bookingsPerPage).map(booking => (
                  <tr key={booking.booking_id}>
                    <td>{booking.booking_id}</td>
                    <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
                    <td>{new Date(booking.returning_date).toLocaleDateString()}</td>
                    <td>Ksh: {booking.total_amount}</td>
                    <td>
                      <span className={`badge ${booking.booking_status === 'approved' ? 'badge-success' : 'badge-error'}`}>
                        {booking.booking_status}
                      </span>
                    </td>
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
              disabled={page === Math.ceil(confirmedBookings.length / bookingsPerPage)}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBookings;
