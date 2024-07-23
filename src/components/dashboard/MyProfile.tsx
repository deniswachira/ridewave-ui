import { useEffect, useState } from 'react';
import { FaCamera, FaEdit, FaTimes } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { userApi } from '../../features/api/userApiSlice';
import { useToast } from '../../components/ToastContext';
import { logsApi } from '../../features/api/logsApiSlice';
import axios from 'axios';

interface FormValues {
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  password?: string;
}

interface UserLogs {
  log_id: number;
  user_id: number;
  action: string;
  created_at: string;
}

const MyProfile = () => {
  const preset_key = "orcuzpnl";
  const cloud_name = "dosid37ll";
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user, isAuthenticated, role } = useSelector((state: RootState) => state.auth);
  const [updateProfile, { isLoading }] = userApi.useUpdateUserProfileMutation();
  const [updateProfilePicture] = userApi.useUpdateUserProfileImageMutation();
  const [imageProfile, setImageProfile] = useState<string>("");
  const { data: userData } = userApi.useGetUserByIdQuery(user?.user.user_id);
  const { data: userLogs } = logsApi.useGetAllLogsByUserIDQuery(user?.user.user_id);
  const [addLog] = logsApi.useAddLogMutation();
  const profilePicture = user?.user.profile_picture || 'https://via.placeholder.com/150';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (role !== 'admin') {
      navigate('/dashboard/me');
    }
  }, [isAuthenticated, role, navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Data to update", data);
    try {
      await updateProfile({ ...data, user_id: user?.user.user_id }).unwrap();
      await addLog({ user_id: user?.user.user_id, action: 'Updated profile' }).unwrap();
      showToast('Profile updated successfully!', 'success');
      handleModalToggle();
    } catch (error) {
      showToast('Failed to update profile. Please try again.', 'error');
      console.log(error);
    }
  };

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    try {
      const res = await axios(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: "POST",
        data: formData
      });
      const data = await res.data;
      setImageProfile(data.secure_url);
      console.log(data.secure_url);
    } catch (err: any) {
      console.log(err);
    }
  }

  useEffect(() => {
    const updateProfilePic = async () => {
      if (imageProfile) {
        try {
          await updateProfilePicture({ user_id: user?.user.user_id, profile_picture: imageProfile }).unwrap();
          
          showToast('Profile picture updated successfully!', 'success');
        } catch (error) {
          showToast('Failed to update profile picture. Please try again.', 'error');
        }
      }
    };

    updateProfilePic();
  }, [imageProfile, updateProfilePicture, showToast, user]);

  return (
    <div className="min-h-screen text-white py-10 px-5">
      <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-5">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-700 pb-5 mb-5">
          <div className="relative flex items-center gap-4 mb-4 md:mb-0">
            <img
              src={userData?.profile_picture || profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-green-500"
            />
            <label className="absolute bottom-0 bg-green-500 p-2 rounded-full cursor-pointer">
              <FaCamera />
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
            <div>
              <h2 className="text-3xl font-bold">{userData?.full_name}</h2>
              <p className="text-gray-400">{userData?.email}</p>
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
              <span className="font-bold">Phone:</span> {userData?.phone_number}
            </p>
            <p className="mb-2">
              <span className="font-bold">Address:</span> {userData?.address}
            </p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-2xl font-bold mb-3">Security Settings</h3>
            <p className="mb-2">
              <span className="font-bold">Password:</span> ********
            </p>
            <button className="btn btn-secondary">Change Password</button>
          </div>

        </div>
          <div className="bg-gray-700 rounded-lg p-4 mt-10 w-full">
            <h3 className="text-2xl font-bold mb-3">Recent Activities</h3>
            {userLogs?.length ? (
              <div className="space-y-2">
              {//get reverse order and slice it to show the latest log first
                userLogs.slice().reverse().slice(0, 5).map((log: UserLogs) => (
                  <div key={log.log_id} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                    <p>{log.action}</p>
                    <p className="text-gray-400">{new Date(log.created_at).toLocaleString()}</p>
                  </div>

            
              
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No recent activities found.</p>
            )}
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  className="input input-bordered w-full bg-gray-900 border-gray-600 text-white"
                  defaultValue={userData?.full_name}
                  {...register('full_name', { required: 'Full Name is required' })}
                />
                {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  className="input input-bordered w-full bg-gray-900 border-gray-600 text-white"
                  defaultValue={userData?.email}
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  className="input input-bordered w-full bg-gray-900 border-gray-600 text-white"
                  defaultValue={userData?.phone_number}
                  {...register('phone_number', { required: 'Phone Number is required' })}
                />
                {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-300">Address</label>
                <input
                  type="text"
                  id="address"
                  className="input input-bordered w-full bg-gray-900 border-gray-600 text-white"
                  defaultValue={userData?.address}
                  {...register('address', { required: 'Address is required' })}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
              </div>            
              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
