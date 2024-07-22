import { SquareUserRound, LogOut, Tags, Ticket } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCredentials } from "../features/auth/authSlice";
import { useToast } from "../components/ToastContext";


function SideNav() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleLogout = () => {
        dispatch(clearCredentials());
        navigate('/login');
        showToast('Logout successful!', 'success');
    };
    return (
        <ul className="menu bg-base-200 min-w-full gap-2 text-base-content min-h-full">
            <li>
                <Link to="" className="flex items-center">
                    <SquareUserRound className="text-4xl text-yellow-600 mr-4" />
                    <span className="hidden lg:inline ml-2 font-bold text-yellow-600">Me</span>
                </Link>
            </li>
            <li>
                <Link to="my-bookings" className="flex items-center">
                    <Tags className="text-4xl text-yellow-600 mr-4" />
                    <span className="hidden lg:inline ml-2 font-bold text-yellow-600">Bookings</span>
                </Link>
            </li>
            <li>
                <Link to="my-payments" className="flex items-center">
                    <Ticket className="text-4xl text-yellow-600 mr-4" />
                    <span className="hidden lg:inline ml-2 font-bold text-yellow-600">Payments</span>
                </Link>
            </li>
           
            <li>
                <Link to="tickets" className="flex items-center">
                    <Ticket className="text-4xl text-yellow-600 mr-4" />
                    <span className="hidden lg:inline ml-2 font-bold text-yellow-600">Tickets</span>
                </Link>
            </li>
            <li>
                <button onClick={ handleLogout } className="flex items-center">
                    <LogOut className="text-4xl text-red-600 mr-4" />
                    <span className="hidden lg:inline ml-2 font-bold text-red-600">Logout</span>
                </button>
            </li>
            <li>
                <Link to="/" className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-house text-4xl text-green-600 mr-4"
                    >
                        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    </svg>
                    <span className="hidden lg:inline ml-2 font-bold text-green-600">Home</span>
                </Link>
            </li>
        </ul>
    );
}

export default SideNav;
