import { useEffect, useState } from "react";
import { ticketApi } from "../../features/api/ticketApiSlice";
import { useToast } from '../../components/ToastContext';
import AnimatedLoader from "../AnimatedLoader";

interface Ticket {
    ticket_id: number;
    user_id: number;
    subject: string;
    message: string;
    status: string;
    user: {
        full_name: string;
        email: string;
    }
}

const AllTicket = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const { data: allUserTickets, isError, isLoading } = ticketApi.useGetAllTicketsQuery(1, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000,
    });
    const [updateTicket] = ticketApi.useUpdateTicketMutation();
    const { showToast } = useToast();

    useEffect(() => {
        if (allUserTickets) {
            setTickets(allUserTickets);
        }
    }, [allUserTickets]);

    const handleUpdateStatus = async (ticket_id: number, status: string) => {
        try {
            await updateTicket({ ticket_id: ticket_id, status }).unwrap();
            showToast('Ticket status updated successfully', 'success');
        } catch (err) {
            showToast('Failed to update ticket status', 'error');
        }
    };

    const pendingTickets = tickets.filter((ticket) => ticket.status === 'open');
    const closedTickets = tickets.filter((ticket) => ticket.status === 'closed');

    if (isLoading) {
        return <div className="text-center"> <AnimatedLoader /> Loading Vehicles...</div>;
    }

    if (isError) {
        return <div className="text-center">Failed to load tickets</div>;
    }

    return (
        <div className="container mx-auto py-3 px-4">
            <h1 className="text-3xl font-bold text-center mb-4">All Support Tickets</h1>

            <h2 className="text-2xl font-bold mb-4">Pending Tickets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {pendingTickets.map((ticket) => (
                    <div key={ticket.ticket_id} className="card shadow-lg p-5 bg-base-200">
                        <h3 className="text-xl font-bold"> <span className="text-white">Ticket ID: </span>{ticket.ticket_id}</h3>
                        <h3 className="text-xl font-bold"> <span className="text-white">Title: </span>{ticket.subject}</h3>
                        <p><span className="text-white">Message: </span> {ticket.message}</p>
                        <p className="text-sm text-white-600"><span className="text-white">User: </span> {ticket.user.full_name} ({ticket.user.email})</p>
                        <div className="mt-4">
                            <button
                                className="btn btn-outline btn-info mr-2"
                                onClick={() => handleUpdateStatus(ticket.ticket_id, 'closed')}
                            >
                                Close Ticket
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Closed Tickets</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>User</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {closedTickets.map((ticket) => (
                            <tr key={ticket.ticket_id}>
                                <th>{ticket.ticket_id}</th>
                                <td>{ticket.subject}</td>
                                <td>{ticket.message}</td>
                                <td>{ticket.user.full_name} ({ticket.user.email})</td>
                                <td>
                                    <span className={`badge ${ticket.status === 'closed' ? 'badge-success' : 'badge-error'}`}>
                                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllTicket;
