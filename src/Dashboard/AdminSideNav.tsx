import { Users, SquareUserRound, LogOut, AreaChart, Tags, Car } from "lucide-react"
import { Link } from "react-router-dom"

export default function AdminSideNav() {
    return (
        <ul className="menu bg-base-300 min-w-fit gap-2 min-h-full">
            <li>
                <Link to="">
                    <AreaChart className="text-4xl text-yellow-600 mr-4" />
                    <span className="text-yellow-600 font-bold">Reports</span>
                </Link>
            </li>
            <li>
                <details>
                    <summary>
                        <Users className="text-4xl text-blue-600 mr-4" />
                        <span className="text-blue-600 font-bold">Users</span>
                    </summary>
                    <ul>
                        <li><Link to="all-user-profiles">Users Profiles</Link></li>
                    </ul>
                </details>
            </li>
            <li>
                <details>
                    <summary>
                        <Tags className="text-4xl text-yellow-600 mr-4" />
                        <span className="text-yellow-600 font-bold">Bookings</span>
                    </summary>
                    <ul>
                        <li><Link to="new-bookings" className="text-yellow-600">New Bookings</Link></li>
                        <li><Link to="all-bookings">All Bookings</Link></li>
                    </ul>
                </details>
            </li>
            <li>
                <details>
                    <summary>
                        <Tags className="text-4xl text-blue-600 mr-4" />
                        <span className="text-blue-600 font-bold">Payments</span>
                    </summary>
                    <ul>
                        <li><Link to="payments">All Payments</Link></li>
                    </ul>
                </details>
            </li>
            <li>
                <details>
                    <summary>
                        <Car className="text-4xl text-yellow-600 mr-4" />
                        <span className="text-yellow-600 font-bold">Vehicles</span>
                    </summary>
                    <ul>
                        <li><Link to="vehicle-specs">Vehicle Specs</Link></li>
                        <li><Link to="vehicles">Vehicles</Link></li>
                    </ul>
                </details>
            </li>
            <li>
                <details>
                    <summary>
                        <Tags className="text-4xl text-blue-600 mr-4" />
                        <span className="text-blue-600 font-bold">Tickets</span>
                    </summary>                    
                    <ul>
                        <li><Link to="tickets">All Tickets</Link></li>
                    </ul>
                </details>
            </li>
            <li>
                <Link to="admin-profile">
                    <SquareUserRound className="text-4xl text-yellow-600 mr-4" />
                    <span className="text-yellow-600 font-bold">Me</span>
                </Link>
            </li>
            <li>
                <Link to="#">
                    <LogOut className="text-4xl text-red-600 mr-4" />
                    <span className="text-red-600 font-bold">Logout</span>
                </Link>
            </li>
            <li>
                <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house text-4xl text-yellow-600 mr-4">
                        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    </svg>
                    <span className="text-green-600 font-bold">Home</span>
                </Link>
            </li>
            
        </ul>
    )
}
