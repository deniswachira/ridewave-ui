import AdminLayout from "../Dashboard/AdminLayout";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
    return (
        <div className="h-screen">
            <Navbar />
            <AdminLayout />
            <Footer />
        </div>

    );
}  