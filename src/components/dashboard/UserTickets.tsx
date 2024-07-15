import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useToast } from '../../components/ToastContext';

const dummyTickets = [
  {
    ticket_id: 1,
    date: new Date().toISOString(),
    subject: "Issue with booking",
    status: 'open',
    message: "I am facing an issue with my recent booking. Please assist."
  },
  {
    ticket_id: 2,
    date: new Date().toISOString(),
    subject: "Payment failed",
    status: 'closed',
    message: "My payment failed during the booking process."
  },
  {
    ticket_id: 3,
    date: new Date().toISOString(),
    subject: "Inquiry about vehicle availability",
    status: 'pending',
    message: "Is the vehicle with ID 123 available for the next weekend?"
  },
  // Add more dummy tickets as needed
];

function UserTickets() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { showToast } = useToast();

  const [page, setPage] = useState(1);
  const [displayedTickets, setDisplayedTickets] = useState(dummyTickets);
  const [newTicket, setNewTicket] = useState({ subject: '', message: '' });
  const ticketsPerPage = 8;

  useEffect(() => {
    setDisplayedTickets(dummyTickets);
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTicket(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTicketData = {
      ticket_id: displayedTickets.length + 1,
      date: new Date().toISOString(),
      subject: newTicket.subject,
      status: 'open',
      message: newTicket.message
    };
    setDisplayedTickets(prevTickets => [newTicketData, ...prevTickets]);
    setNewTicket({ subject: '', message: '' });
    showToast('New ticket created successfully!', 'success');
  };

  return (
    <div className="container mx-auto py-3 px-4">
      <h1 className="text-3xl font-bold text-center mb-4">My Support Tickets</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Create New Ticket</h2>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Subject</label>
          <input
            type="text"
            name="subject"
            value={newTicket.subject}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Message</label>
          <textarea
            name="message"
            value={newTicket.message}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full"
            rows={4}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedTickets.length === 0 && (
          <p className="text-center">No support tickets available 😒</p>
        )}
        {displayedTickets.slice((page - 1) * ticketsPerPage, page * ticketsPerPage).map(ticket => (
          <div key={ticket.ticket_id} className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Ticket ID: {ticket.ticket_id}</h3>
              <p>Date: {new Date(ticket.date).toLocaleDateString()}</p>
              <p>Subject: {ticket.subject}</p>
              <p>Status: <span className={`badge ${ticket.status === 'open' ? 'badge-success' : ticket.status === 'pending' ? 'badge-warning' : 'badge-error'}`}>{ticket.status}</span></p>
              <p>Message: {ticket.message}</p>
            </div>
          </div>
        ))}
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
            disabled={page === Math.ceil(displayedTickets.length / ticketsPerPage)}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserTickets;
