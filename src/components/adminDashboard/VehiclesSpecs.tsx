import React, { useEffect, useState } from 'react';
import { carApi } from '../../features/api/carApiSlice';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useToast } from '../ToastContext';

export interface VehicleSpecs {
    vehicleSpec_id: number;
    vehicle_name: string;
    vehicle_model: string;
    vehicle_year: string;
    fuel_type: string;
    seating_capacity: number;
    color: string;
    engine_type: string;
    vehicle_description: string;
    features: string;
    image1_url: string;
    image2_url: string;
    image3_url: string;
}

const VehiclesSpecs: React.FC = () => {
    const { data: vehicleSpecs = [], isLoading, error } = carApi.useGetCarSpecsQuery({
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000
    });
    const [deleteCarSpec, { isLoading: deleteIsLoading }] = carApi.useDeleteCarSpecMutation();
    const { showToast } = useToast();
    const [specs, setSpecs] = useState<VehicleSpecs[]>([]);
    const [filteredSpecs, setFilteredSpecs] = useState<VehicleSpecs[]>([]);
    const [page, setPage] = useState<number>(1);
    const specsPerPage: number = 5;
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        if (vehicleSpecs) {
            setSpecs(vehicleSpecs);
            setFilteredSpecs(vehicleSpecs);
        }
    }, [vehicleSpecs]);

    useEffect(() => {
        setFilteredSpecs(
            specs.filter(spec =>
                spec.vehicle_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                spec.vehicle_model.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, specs]);

    const handleDelete = async (vehicleSpec_id: number) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                console.log('Delete vehicleSpec_id:', vehicleSpec_id);
                const response = await deleteCarSpec(vehicleSpec_id).unwrap();
                showToast(response.msg, 'success');

            } catch (error: any) {
                console.error('Error deleting vehicle Specification:', error.data.msg);
                showToast('Specification not delated successful! Please try again.', 'warning');
            }
        }
    };


    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const paginatedSpecs = filteredSpecs.slice((page - 1) * specsPerPage, page * specsPerPage);

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error loading vehicle specs</div>;
    }

    return (
        <div className="container mx-auto py-5 px-4">
            <h1 className="text-xl font-bold text-center ">All Vehicle Specifications</h1>            
            <div className="mb-4 flex justify-between">
                <Link to="add-vehicle-spec">
                    <button type="button" className="btn btn-info">Add Vehicle Specifications</button>
                </Link>    
                
                <input
                    type="text"
                    placeholder="Search by model or car name to filter specs"
                    className="input input-bordered w-full max-w-xs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                    <button type="button" className="btn btn-primary">Add New Vehicle</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Vehicle Name</th>
                            <th>Vehicle Model</th>
                            <th>Engine Type</th>
                            <th>Seating Capacity</th>
                            <th>Vehicle Year</th>
                            <th>Color</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedSpecs.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center">No specs available 😒</td>
                            </tr>
                        ) : (
                            paginatedSpecs.map(spec => (
                                <tr key={spec.vehicleSpec_id}>
                                    <td>{spec.vehicleSpec_id}</td>
                                    <td>{spec.vehicle_name}</td>
                                    <td>{spec.vehicle_model}</td>
                                    <td>{spec.engine_type}</td>
                                    <td>{spec.seating_capacity}</td>
                                    <td>{spec.vehicle_year}</td>
                                    <td>{spec.color}</td>
                                    <td>
                                        {/* <button className="btn btn-sm btn-warning" onClick={() => openPopup(booking)}>View</button> */}
                                        <button className="btn btn-sm btn-error" onClick={() => handleDelete(spec.vehicleSpec_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-8">
                <div className="btn-group">
                    <button
                        className="btn"
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                    >
                        Previous
                    </button>
                    <button
                        className="btn"
                        disabled={page === Math.ceil(filteredSpecs.length / specsPerPage)}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VehiclesSpecs;
