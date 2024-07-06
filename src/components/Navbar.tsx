import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { clearCredentials } from "../features/auth/authSlice";
import { FaBars, FaHome, FaPhone, FaUser, FaSignInAlt, FaSignOutAlt, FaCar } from "react-icons/fa";
import logo from "../assets/logo.svg";
import { ArrowBigDownDashIcon } from "lucide-react";
import { useToast } from "../components/ToastContext";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { showToast } = useToast();

    const handleLogout = () => {
        dispatch(clearCredentials());
        navigate('/login');
        showToast('Logout successful!', 'success');
    };

    // Show toast message for successful login if indicated by localStorage
    if (localStorage.getItem('login')) {
        showToast('Login successful!', 'success');
        localStorage.removeItem('login');
    }

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
                                <FaHome className="mr-2" />
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
                            <Link to="/contact" className="flex items-center text-white hover:text-gray-300">
                                <FaPhone className="mr-2" />
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link to="/" className="">
                    <img src={logo} alt="" width={70} />
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
                        <Link to="/contact" className="flex items-center text-white hover:text-gray-300">
                            <FaPhone className="text-2xl text-green-600 mr-2" />
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                {!isAuthenticated ? (
                    <Link to="/login" className="btn btn-ghost text-white flex items-center">
                        <FaSignInAlt className="mr-2" />
                        Login
                    </Link>
                ) : (
                    <div className="dropdown dropdown-end">
                        <button className="btn btn-ghost flex items-center text-white">
                            <span className="mr-2"><span className="text-green-400">Hey, </span>{user?.user.full_name}</span>
                            <ArrowBigDownDashIcon className="text-xl" />
                        </button>
                        <ul className="dropdown-content bg-gray-900 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/dashboard/me" className="flex items-center text-white hover:text-gray-300 mb-2">
                                    <FaUser className="mr-3 ext-xl text-green-600" />
                                    Profile
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
