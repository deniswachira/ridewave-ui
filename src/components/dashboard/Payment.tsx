import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { bookingApi } from "../../features/api/bookingApiSlice";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { Trash, Check, Calendar, DollarSign } from 'lucide-react';

const stripePromise = loadStripe('your_publishable_key_here'); // Replace with your Stripe publishable key

const Payment = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const user_id = user?.user.user_id;
  const { data: fetchedPayments = [], isLoading } = bookingApi.useGetPaymentsByUserIdQuery(user_id);

  const handleCheckout = async (payment) => {
    try {
      const stripe = await stripePromise;
      const response = await axios.post('http://localhost:8000/create-checkout-session', {
        amount: parseFloat(payment.payment_amount),
      });

      const sessionId = response.data.id;
      await stripe.redirectToCheckout({ sessionId });

    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  const handleDelete = (paymentId) => {
    // Implement delete functionality here
    console.log('Delete payment with ID:', paymentId);
  };

  return (
    <div className="min-h-screen  text-white py-2 px-5">
      <h2 className="text-2xl font-bold mb-4">Pending Payments</h2>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="loader border-t-4 border-b-4 border-white rounded-full w-12 h-12"></div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 mb-6">
          {fetchedPayments
            .filter(payment => payment.payment_status === 'pending')
            .map(payment => (
              <div key={payment.payment_id} className="bg-gray-700 p-4 rounded-lg flex-1 min-w-[300px] max-w-[400px] flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{payment.booking.vehicle.vehicleSpec.vehicle_name} ({payment.booking.vehicle.vehicleSpec.vehicle_model})</h3>
                  <span className={`badge ${payment.payment_status === 'pending' ? 'badge-warning' : 'badge-success'}`}>
                    {payment.payment_status}
                  </span>
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <div className="mb-4 text-center">
                    <p className="text-green-400 flex items-center justify-center"><DollarSign className="mr-2" /> <span className="font-bold">Amount:</span> Ksh {payment.payment_amount}</p>
                    <p className="text-green-400 flex items-center justify-center"><Calendar className="mr-2" /> <span className="font-bold">Booking Date:</span> {new Date(payment.booking.booking_date).toLocaleDateString()}</p>
                    <p className="text-green-400 flex items-center justify-center"><Calendar className="mr-2" /> <span className="font-bold">Return Date:</span> {new Date(payment.booking.returning_date).toLocaleDateString()}</p> {/* Update this line based on the return date property */}
                  </div>
                  <div className="flex gap-2 mt-4 justify-center">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
                      onClick={() => handleDelete(payment.payment_id)}
                    >
                      <Trash /> Delete
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
                      onClick={() => handleCheckout(payment)}
                    >
                      <Check /> Checkout
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Payments Table */}
      <div className="max-w-4xl mx-auto mt-10 bg-gray-800 p-5 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Payment History</h2>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="loader border-t-4 border-b-4 border-white rounded-full w-12 h-12"></div>
          </div>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Vehicle Name</th>
                <th>Amount (Ksh)</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {fetchedPayments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">No payments recorded.</td>
                </tr>
              ) : (
                fetchedPayments.map(payment => (
                  <tr key={payment.payment_id}>
                    <td>{payment.payment_id}</td>
                    <td>{payment.booking.vehicle.vehicleSpec.vehicle_name}</td>
                    <td>{payment.payment_amount}</td>
                    <td>{new Date(payment.payment_date).toLocaleString()}</td>
                    <td>
                      <span className={`badge ${payment.payment_status === 'pending' ? 'badge-warning' : 'badge-success'}`}>
                        {payment.payment_status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Payment;
