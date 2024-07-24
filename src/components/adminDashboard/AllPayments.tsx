import { useEffect, useState } from "react";
import { paymentApi } from "../../features/api/paymentApiSlice";
import AnimatedLoader from "../AnimatedLoader";

// types.ts

export interface VehicleSpec {
    vehicle_name: string;
    vehicle_model: string;
}

export interface Vehicle {
    vehicle_id: number;
    vehicleSpec_id: number;
    vehicleSpec: VehicleSpec;
}

export interface Booking {
    booking_id: number;
    booking_date: string;
    returning_date: string;
    booking_status: string;
    vehicle_id: number;
    vehicle: Vehicle;
}

export interface User {
    user_id: number;
    full_name: string;
    email: string;
}

export interface Payment {
    payment_id: number;
    booking_id: number;
    user_id: number;
    payment_amount: string;
    payment_status: string;
    payment_mode: string;
    session_id: string;
    payment_date: string;
    updated_at: string;
    booking: Booking;
    user: User;
}

function AllPayments() {
    const { data: allPayments = [], isLoading, error } = paymentApi.useListPaymentsQuery({
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000,
    });

    const [payments, setPayments] = useState<Payment[]>([]);
    const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
    const [page, setPage] = useState(1);
    const paymentsPerPage = 5;
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (allPayments.length > 0) {
            setPayments(allPayments);
            setFilteredPayments(allPayments);
        }
    }, [allPayments]);

    useEffect(() => {
        setFilteredPayments(
            payments.filter(payment =>
                payment.user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                payment.payment_mode.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, payments]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const paginatedPayments = filteredPayments.slice((page - 1) * paymentsPerPage, page * paymentsPerPage);

    if (isLoading) {
        return <div className="text-center"> <AnimatedLoader /> Loading Payments...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error loading payments</div>;
    }

    return (
        <div className="container mx-auto py-2 px-4">
            <h1 className="text-4xl font-bold text-center mb-2">All Payments</h1>
            <div className="mb-4 flex justify-between">
                <input
                    type="text"
                    placeholder="Search by user or payment mode"
                    className="input input-bordered w-full max-w-xs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="text-white text-xl">
                            <th>Payment ID</th>
                            <th>Booking ID</th>
                            <th>User</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Mode</th>
                            <th>Payment Date</th>
                            <th>Vehicle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedPayments.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center">No Payments available 😒</td>
                            </tr>
                        ) : (
                            paginatedPayments.map(payment => (
                                <tr key={payment.payment_id} className="text-xl">
                                    <td>{payment.payment_id}</td>
                                    <td>{payment.booking_id}</td>
                                    <td>
                                        <div>{payment.user.full_name}</div>
                                        <div>{payment.user.email}</div>
                                    </td>
                                    <td>Ksh: {payment.payment_amount}</td>
                                    <td>
                                        <span className={`badge ${payment.payment_status === 'paid' ? 'badge-success' : 'badge-error'}`}>
                                            {payment.payment_status}
                                        </span>
                                    </td>
                                    <td>{payment.payment_mode}</td>
                                    <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                                    <td>
                                        <div>{payment.booking.vehicle.vehicleSpec.vehicle_name}</div>
                                        <div>{payment.booking.vehicle.vehicleSpec.vehicle_model}</div>
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
                        disabled={page === Math.ceil(filteredPayments.length / paymentsPerPage)}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AllPayments;
