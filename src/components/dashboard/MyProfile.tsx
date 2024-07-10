import  { useEffect, useState } from 'react';
import { FaEdit, FaTimes, FaTrophy, FaHistory, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from 'react-router-dom';


const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  let profilePicture = 'https://via.placeholder.com/150';  

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard/me');
    }else{
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-5">
      <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-5">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-700 pb-5 mb-5">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-green-500"
            />
            <div>
              <h2 className="text-3xl font-bold">{user?.user.full_name}</h2>
              <p className="text-gray-400">{user?.user.email}</p>
            </div>
          </div>
          <button
            className="btn btn-primary flex items-center gap-2"
            onClick={handleModalToggle}
          >
            <FaEdit /> Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-2xl font-bold mb-3">Personal Information</h3>
            <p className="mb-2">
              <span className="font-bold">Phone:</span> {user?.user.phone_number}
            </p>
            <p className="mb-2">
              <span className="font-bold">Address:</span> {user?.user.address}
            </p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-2xl font-bold mb-3">User Statistics</h3>
            <p className="mb-2">
              <FaTrophy className="inline-block mr-2" /> Membership Level: Gold
            </p>
            <p className="mb-2">
              <FaHistory className="inline-block mr-2" /> Total Bookings: 12
            </p>
            <p className="mb-2">
              <FaHeart className="inline-block mr-2" /> Favorite Cars: 3
            </p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 md:col-span-2">
            <h3 className="text-2xl font-bold mb-3">Booking History</h3>
            <ul className="list-disc list-inside text-gray-400">
              {/* {user.bookingHistory.map((booking, index) => (
                <li key={index}>
                  {booking.date} - {booking.car} ({booking.status})
                </li>
              ))} */}
              
              <li>2024-07-01 - Toyota Camry (Completed)</li>
              <li>2024-06-15 - Ford F-150 (Completed)</li>
             
            </ul>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Edit Profile</h2>
              <button onClick={handleModalToggle} className="text-white">
                <FaTimes />
              </button>
            </div>
            <form>
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  className="input input-bordered w-full bg-gray-900 border-gray-600 text-white"
                  defaultValue={user?.user.full_name}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  className="input input-bordered w-full bg-gray-900 border-gray-600 text-white"
                  defaultValue={user?.user.email}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone</label>
                <input
                  type="text"
                  id="phone"
                  className="input input-bordered w-full bg-gray-900 border-gray-600 text-white"
                  defaultValue={user?.user.contact_phone}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-300">Address</label>
                <input
                  type="text"
                  id="address"
                  className="input input-bordered w-full bg-gray-900 border-gray-600 text-white"
                  defaultValue={user?.user.address}
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
