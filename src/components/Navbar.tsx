import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { clearCredentials } from "../features/auth/authSlice";
import { FaBars, FaHome, FaSignInAlt, FaSignOutAlt, FaCar } from "react-icons/fa";
import logo from "../assets/logo.svg";
import {  GalleryHorizontal } from "lucide-react";
import { useToast } from "../components/ToastContext";
import { GrDashboard } from "react-icons/gr";
import { userApi } from "../features/api/userApiSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated, role } = useSelector((state: RootState) => state.auth);
    const { showToast } = useToast();
    const{data:userData} = userApi.useGetUserByIdQuery(user?.user.user_id);
    const profilePicture = user?.user.profile_picture || 'https://via.placeholder.com/150';

    const handleLogout = () => {
        dispatch(clearCredentials());
        navigate('/login');
        showToast('Logout successful!', 'success');
    };

    return (
        <div className="navbar bg-gray-800 text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <FaBars className="text-xl text-green-600" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-gray-900 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link to="/" className="flex items-center text-white hover:text-gray-300">
                                <FaHome className="mr-2 text-2xl text-green-600" />
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/explore" className="flex items-center text-white hover:text-gray-300">
                                <FaCar className="mr-2" />
                                Explore
                            </Link>
                        </li>
                        <li>
                            <Link to="/gallery" className="flex items-center text-white hover:text-gray-300">
                                <GalleryHorizontal className="mr-2 text-2xl text-green-600" />
                                Gallery
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link to="/" className="">
                    <img src={logo} alt="Logo" width={70} />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to="/" className="flex items-center text-white hover:text-gray-300">
                            <FaHome className="text-2xl text-green-600 mr-2" />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/explore" className="flex items-center text-white hover:text-gray-300">
                            <FaCar className="text-2xl text-green-600 mr-2" />
                            Explore
                        </Link>
                    </li>
                    <li>
                        <Link to="/how-it-works" className="flex items-center text-white hover:text-gray-300">
                            <GalleryHorizontal className="text-xl text-green-600 mr-2" />
                            HowIt Works
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                {!isAuthenticated ? (
                    <Link to="/login" className="btn btn-ghost text-white text-xl flex items-center">
                        <FaSignInAlt className="mr-2 mt-1 text-xl text-green-600" />
                        Login
                    </Link>
                ) : (
                    <div className="dropdown dropdown-end">
                        <button className="btn btn-ghost flex items-center text-white">
                            <span className="mr-2">
                                <span className="text-green-400">Hey, </span>
                                {userData?.full_name}
                            </span>
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="profile"
                                            src={userData?.profile_picture || profilePicture} />
                                    </div>
                                </div>

                        </button>
                        <ul className="dropdown-content bg-gray-900 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link
                                    to={role === 'admin' ? '/dashboard/admin' : '/dashboard/me'}
                                    className="flex items-center text-white hover:text-gray-300 mb-2"
                                >
                                    <GrDashboard className="mr-3 text-xl text-green-600" />
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="flex items-center text-white hover:text-gray-300">
                                    <FaSignOutAlt className="text-xl text-green-600 mr-3" />
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
