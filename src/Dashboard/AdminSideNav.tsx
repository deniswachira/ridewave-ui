import { Users, SquareUserRound, LogOut, AreaChart, Tags } from "lucide-react"
import { Link } from "react-router-dom"

export default function AdminSideNav() {
    return (
        <ul className="menu bg-base-200  min-w-full gap-2 text-base-content min-h-full">
            <li>
                <li> <Link to=""> <AreaChart className="text-4xl text-green-600 mr-4" /> Analytics</Link></li>                  
            </li>
            <li>
                <details >
                    <summary><Users className="text-4xl text-green-600 mr-4" />User Profiles </summary>
                    <ul>
                        <li><Link to="all-users"> User</Link></li>
                        <li><Link to="all-user-profiles">UsersProfiles</Link></li>
                    </ul>
                </details>
            </li>
            <li>
                <details >
                    <summary><Tags className="text-4xl text-green-600 mr-4" />Bookings</summary>
                    <ul>
                        <li><Link to="all-bookings">All Bookings</Link></li>
                        <li><Link to="confirmed-bookings">Confirmed</Link></li>
                    </ul>
                </details>
            </li>
            <li>
                <details >
                    <summary><Tags className="text-4xl text-green-600 mr-4" />Payments</summary>
                    <ul>
                        <li><Link to="all-bookings">All Payments</Link></li>
                        <li><Link to="confirmed-bookings">Confirmed</Link></li>
                    </ul>
                </details>
            </li>
            <li>
                <details >
                    <summary><Tags className="text-4xl text-green-600 mr-4" />Tickets</summary>
                    <ul>
                        <li><Link to="all-bookings">All Tickets</Link></li>
                        <li><Link to="confirmed-bookings">Pending</Link></li>
                    </ul>
                </details>
            </li>
            <li>
                <Link to="me"><SquareUserRound className="text-4xl text-green-600 mr-4" />Me</Link>
            </li>
            <li>
                <Link to="#"><LogOut className="text-4xl text-green-600 mr-4" />Logout</Link>
            </li>
            <li>
                <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house text-4xl text-green-600 mr-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                    Home
                </Link>
            </li>
        </ul>
    )
}
