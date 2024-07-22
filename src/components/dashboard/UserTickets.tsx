import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from '../../components/ToastContext';
import { ticketApi } from "../../features/api/ticketApiSlice";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { SquarePlus, Trash } from "lucide-react";
import Swal from "sweetalert2";

interface Ticket {
  ticket_id: number;
  user_id: number;
  subject: string;
  message: string;
  status: string;
}

function UserTickets() {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useSelector((state: RootState) => state.auth);
  const user_id = user?.user.user_id;
  const { showToast } = useToast();
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editForm, setEditForm] = useState({ subject: '', message: '' });

  const { data: UserTickets, isError, isLoading } = ticketApi.useGetAllTicketsByUserIdQuery(user_id);
  const [addTicket] = ticketApi.useAddTicketMutation();
  const [updateTicket] = ticketApi.useUpdateTicketMutation();
  const [deleteTicket] = ticketApi.useDeleteTicketMutation();

  useEffect(() => {
    if (isError) {
      showToast('Failed to load tickets', 'error');
    }
  }, [isError, showToast]);

  useEffect(() => {
    if (selectedTicketId !== null && UserTickets) {
      const ticket = UserTickets.find((ticket: Ticket) => ticket.ticket_id === selectedTicketId);
      if (ticket) {
        setEditForm({ subject: ticket.subject, message: ticket.message });
      }
    }
  }, [selectedTicketId, UserTickets]);

  useEffect(() => {
    if (isCreateModalOpen) {
      reset();
    }
  }, [isCreateModalOpen, reset]);

  const handleEditTicket = async (event: any) => {
    event.preventDefault();
    if (selectedTicketId === null) return;
    const ticket = {
      ...editForm,
      ticket_id: selectedTicketId,
      user_id: user_id
    };
    try {
      await updateTicket(ticket).unwrap();
      showToast('Ticket updated successfully', 'success');
      setIsEditModalOpen(false);
    } catch (err) {
      showToast('Failed to update ticket', 'error');
    }
  };

  const handleDelete = async (ticket_id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteTicket(ticket_id).unwrap();
        showToast("Deleted Successfully", 'success');
      } catch (error: any) {
        showToast('Vehicle not deleted successfully! Please try again.', 'warning');
      }
    }
  }

  const onSubmit = async (data: any) => {
    const ticket = {
      ...data,
      user_id: user_id
    };
    try {
      await addTicket(ticket).unwrap();
      showToast('Ticket submitted successfully', 'success');
      reset();
      setIsCreateModalOpen(false);
    } catch (err) {
      showToast('Failed to submit ticket', 'error');
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }
  if (isError) {
    return <div className="text-center">Failed to load tickets</div>;
  }

  return (
    <div className="container mx-auto py-3 px-4">
      <h1 className="text-3xl font-bold text-center mb-4">My Support Tickets</h1>

      <button
        className="btn btn-outline btn-info"
        onClick={() => setIsCreateModalOpen(true)}
      >
        Create Ticket
      </button>

      {/* Create Ticket Modal */}
      <dialog id="create_modal" className={`modal modal-bottom sm:modal-middle ${isCreateModalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create a New Ticket</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control mb-4">
              <label className="label" htmlFor="subject">Subject</label>
              <input
                className="input input-bordered"
                id="subject"
                type="text"
                {...register('subject', { required: true })}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label" htmlFor="message">Message</label>
              <textarea
                className="textarea textarea-bordered"
                id="message"
                {...register('message', { required: true })}
              ></textarea>
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-outline">Submit</button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Edit Ticket Modal */}
      <dialog id="edit_modal" className={`modal modal-bottom sm:modal-middle ${isEditModalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Ticket</h3>
          <form onSubmit={handleEditTicket}>
            <div className="form-control mb-4">
              <label className="label" htmlFor="edit-subject">Subject</label>
              <input
                className="input input-bordered"
                id="edit-subject"
                type="text"
                value={editForm.subject}
                onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label" htmlFor="edit-message">Message</label>
              <textarea
                className="textarea textarea-bordered"
                id="edit-message"
                value={editForm.message}
                onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                required
              ></textarea>
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-outline">Save</button>
            </div>
          </form>
        </div>
      </dialog>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {UserTickets && UserTickets.length > 0 ? (
              UserTickets.map((ticket: Ticket) => (
                <tr key={ticket.ticket_id}>
                  <th>{ticket.ticket_id}</th>
                  <td>{ticket.subject}</td>
                  <td>{ticket.message}</td>
                  <td>
                    <span className={`badge ${ticket.status === 'open' ? 'badge-success' : 'badge-error'}`}>
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    {ticket.status === 'open' && (
                      <>
                        <button
                          className="btn btn-info btn-outline mr-2"
                          onClick={() => {
                            setSelectedTicketId(ticket.ticket_id);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <SquarePlus /> Edit
                        </button>
                        <button className="btn btn-error btn-outline" onClick={() => handleDelete(ticket.ticket_id)}> <Trash className="text-red-500" /> </button>

                       </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center" colSpan={5}>No tickets found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTickets;
