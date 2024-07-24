import { useEffect, useState } from "react";
import { userApi } from "../../features/api/userApiSlice";
import Swal from 'sweetalert2';
import { useToast } from "../ToastContext";
import AnimatedLoader from "../AnimatedLoader";

interface User {
  user_id: number;
  full_name: string;
  phone_number: string;
  email: string;
  address: string;
  role: 'user' | 'admin' | 'disabled';
}

const UserProfiles = () => {
  const { data: usersProfile, isLoading, isError } = userApi.useGetUsersProfilesQuery(1, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000
  });
  const [updateUserRole] = userApi.useUpdateUserProfileMutation();

  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const usersPerPage = 10;
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    if (usersProfile) {
      setUsers(usersProfile);
      setFilteredUsers(usersProfile);
    }
  }, [usersProfile]);

  useEffect(() => {
    setFilteredUsers(
      users.filter(user =>
        user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  const handleRoleChange = async (user_id: number, newRole: 'user' | 'admin' | 'disabled') => {
    try {
      const confirmed = await Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to change the user's role?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, change it!',
        cancelButtonText: 'No, cancel!',
      });

      if (confirmed.isConfirmed) {
        //update user role
        const response = await updateUserRole({ user_id, role: newRole }).unwrap();
        // console.log(response);
        const res = response.msg;
        showToast(res,'success');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      Swal.fire('Error', 'Unable to update role', 'error');
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const paginatedUsers = filteredUsers.slice((page - 1) * usersPerPage, page * usersPerPage);

  return (
    <div className="container mx-auto py-2 px-4">
      <div className="breadcrumbs text-sm my-6 text-yellow-300">
        <ul>
          <li>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-4 w-4 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
              </svg>
              Dashboard
            </a>
          </li>
          <li>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-4 w-4 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
              </svg>
              Admin
            </a>
          </li>
          <li>
            <span className="inline-flex items-center gap-2">              
              All user profiles
            </span>
          </li>
        </ul>
      </div>
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered w-full max-w-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        {isLoading ? (
          <p className="text-center"><AnimatedLoader/>  Loading...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Error fetching user profiles.</p>
        ) : (
          <table className="table w-full">
            <thead>
              <tr className="text-white text-xl">
                <th>Full Name</th>
                <th>Contact Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center">No users found.</td>
                </tr>
              ) : (
                paginatedUsers.map(user => (
                  <tr key={user.user_id} className="text-xl">
                    <td>{user.full_name}</td>
                    <td>{user.phone_number}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>
                      <span className={`badge ${user.role === 'admin' ? 'badge-success' : user.role === 'disabled' ? 'badge-error' : 'badge-info'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <select
                        className="select select-bordered"
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.user_id, e.target.value as 'user' | 'admin' | 'disabled')}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="disabled">Disabled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex justify-center mt-8">
        <div className="btn-group">
          <button
            className="btn btn-outline mr-2"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </button>
          <button
            className="btn btn-outline "
            disabled={page === Math.ceil(filteredUsers.length / usersPerPage)}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfiles;
