import  { useState, useEffect } from 'react';

import { bookingApi } from "../../features/api/bookingApiSlice";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import AnimatedLoader from '../AnimatedLoader';

interface createPaymentResponse {
  payment_id: number;
  payment_amount: number;
  user_id: number;
  payment_status: string;
  payment_date: string;
  booking: {
    booking_id: number;
    vehicle: {
      vehicleSpec: {
        vehicle_name: string;
        vehicle_model: string;
      };
    };
    booking_date: string;
    returning_date: string;
  };
}


const Payment = () => {
 
  const { user } = useSelector((state: RootState) => state.auth);
  const user_id = user?.user.user_id;

  const [displayedPayments, setDisplayedPayments] = useState<createPaymentResponse[]>([]);
  const { data: fetchedPayments = [], isLoading } = bookingApi.useGetPaymentsByUserIdQuery(user_id);
  

  useEffect(() => {
    setDisplayedPayments(fetchedPayments);
  }, [fetchedPayments, user]);






  return (
    <div className="min-h-screen bg-gray-900 text-white  ">

      <h2 className="text-xl font-bold mb-4 flex justify-center items-center text-green-400">Payment History</h2>
      <div className="mx-auto mt-2 p-5 ">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <AnimatedLoader />
          </div>
        ) : (
          <table className="table w-full">
            <thead>
                <tr className=" text-xl">
                <th>Payment ID</th>
                <th>Vehicle Name</th>
                <th>Amount (Ksh)</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedPayments.length === 0 ? (
                <tr>
                  <td  className="text-center">No payments recorded.</td>
                </tr>
              ) : (
                displayedPayments.map(payment => (
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
