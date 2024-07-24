import { useEffect, useState } from "react";
import { bookingApi } from '../../features/api/bookingApiSlice';
import AnimatedLoader from "../AnimatedLoader";
// import Swal from 'sweetalert2';

interface Booking {
    booking_id: number;
    user_id: number;
    location: string;
    booking_date: string;
    returning_date: string;
    total_amount: number;
    user: {
        full_name: string;
        email: string;
        phone_number: string;
    };
    booking_status: 'approved' | 'pending' | 'rejected';
}

function AllBookings() {
    const pagee = 1;
    const { data: allBookings = [], isLoading, error } = bookingApi.useFetchBookingsWithUserDetailsQuery(pagee, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000,
    });
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
    const [page, setPage] = useState(1);
    const bookingsPerPage = 5;
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (allBookings.length > 0) {
            setBookings(allBookings);
            setFilteredBookings(allBookings);
        }
    }, [allBookings]);

    useEffect(() => {
        setFilteredBookings(
            bookings.filter(booking =>
                booking.user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                booking.location.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, bookings]);   
    

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const paginatedBookings = filteredBookings.slice((page - 1) * bookingsPerPage, page * bookingsPerPage);

    if (isLoading) {
        return <div className="text-center"> <AnimatedLoader/> Loading Booking...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error loading bookings</div>;
    }

    return (
        <div className="container mx-auto py-2 px-4">
            <h1 className="text-4xl font-bold text-center mb-2">All Bookings</h1>
            <div className="mb-4 flex justify-between">
                <input
                    type="text"
                    placeholder="Search by user or location"
                    className="input input-bordered w-full max-w-xs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="text-white text-xl">
                            <th>Booking ID</th>
                            <th>User Booked</th>
                            <th>Location</th>
                            <th>Booking Date</th>
                            <th>Returning Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedBookings.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center">No bookings available 😒</td>
                            </tr>
                        ) : (
                            paginatedBookings.map(booking => (
                                <tr key={booking.booking_id} className=" text-xl">
                                    <td>{booking.booking_id}</td>
                                    <td>{booking.user.full_name}</td>
                                    <td>{booking.location}</td>
                                    <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
                                    <td>{new Date(booking.returning_date).toLocaleDateString()}</td>
                                    <td>Ksh: {booking.total_amount}</td>
                                    <td>
                                        <span className={`badge ${booking.booking_status === 'approved' ? 'badge-success' : booking.booking_status === 'pending' ? 'badge-warning' : 'badge-error'}`}>
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
                        disabled={page === Math.ceil(filteredBookings.length / bookingsPerPage)}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AllBookings;
