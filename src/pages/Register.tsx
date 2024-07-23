import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import loginPic from '../assets/register.svg';
import { userApi } from '../features/api/userApiSlice';
import { UserRegisterFormValues } from '../types/Types';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useToast } from '../components/ToastContext';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<UserRegisterFormValues>();
    const navigate = useNavigate();
    const [registerUser, { isLoading }] = userApi.useRegisterUserMutation();
    const { isAuthenticated, role} = useSelector((state: RootState) => state.auth);
    const { showToast } = useToast();

    useEffect(() => {
        if (isAuthenticated) {
            if (role === 'admin') {
                navigate('/dashboard/admin');
            } else
            navigate('/dashboard/me');
        }
    }, [isAuthenticated, navigate,role]);

    const onSubmit = async (data: UserRegisterFormValues) => {
        try {
            await registerUser(data).unwrap();
            showToast('Registration successful! Please log in.', 'success');
            navigate('/login');
        } catch (err: any) {
            showToast('Failed to register: ' + (err.data?.msg || err.msg || err.error || err),'error');
        }
    };



    return (
        <>
            <Navbar />
            <div className="flex flex-col min-h-screen">
                <div className="flex-grow grid sm:grid-cols-2">
                    <div className="flex items-center justify-center sm:order-first p-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="card gap-6 p-8 shadow-xl rounded-lg w-full max-w-lg ">
                            <h1 className="text-4xl text-white text-center mb-6">Register</h1>
                            <div className="grid grid-cols-1 gap-4 place-items-center rounded-box w-full">
                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    <input {...register("full_name", { required: true })} type="text" className="grow text-white py-3 px-4 rounded-md" placeholder="Full Name" />
                                </label>
                                {errors.full_name && <span className="text-red-600">Full Name is required</span>}
                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    <input {...register("phone_number", { required: true })} type="number" className="grow text-white py-3 px-4 rounded-md" placeholder="Phone" />
                                </label>
                                {errors.phone_number && <span className="text-red-600">Phone Number is required</span>}
                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    <input {...register("address", { required: true })} type="text" className="grow text-white py-3 px-4 rounded-md" placeholder="Address" />
                                </label>
                                {errors.address && <span className="text-red-600">Address is required</span>}
                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    <input {...register("email", { required: true })} type="email" className="grow text-white py-3 px-4 rounded-md" placeholder="Email" />
                                </label>
                                {errors.email && <span className="text-red-600">Email is required</span>}
                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    <input {...register("password", { required: true })} type="password" className="grow text-white py-3 px-4 rounded-md" placeholder="Password" />
                                </label>
                                {errors.password && <span className="text-red-600">Password is required</span>}
                            </div>
                            <div className="w-full flex justify-center mt-4">
                                <button type="submit" className="btn bg-green-500 text-white py-3 pb-10 px-10 rounded-lg text-lg transform transition-transform duration-300 hover:scale-105 hover:bg-green-600">
                                    {isLoading ? <span className="loading loading-spinner text-error"></span> : 'Register'}
                                </button>
                            </div>
                               
                            <NavLink to="/" className="text-white mt-4 text-center block">
                                🏡 Go to HomePage
                            </NavLink>
                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-400">
                                    Already have an account?{' '}
                                    <NavLink to="/login" className="text-blue-500 hover:underline">
                                        Login here
                                    </NavLink>.
                                </p>
                            </div>
                        </form>
                       
                    </div>
                    <div className="flex items-center justify-center p-6">
                        <img src={loginPic} alt="Register Illustration" className="max-h-[80vh]" />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
