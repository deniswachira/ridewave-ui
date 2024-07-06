
import { Outlet } from 'react-router-dom'
import Card from './Card'
import AdminSideNav from './AdminSideNav'

function AdminLayout() {
    return (
        <div className='flex max-h-fit min-h-full bg-base-100 text-green-400'>
            <div className='min-w-[12%]  '>
                <AdminSideNav />
            </div>
            <div className='flex flex-col min-w-[90%] '>
                {/* <Nav /> */}
                <div className="h-fit">
                    <Card>
                        <Outlet />
                    </Card>
                </div>

            </div>
        </div>
    )
}

export default AdminLayout