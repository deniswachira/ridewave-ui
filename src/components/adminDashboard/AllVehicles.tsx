import React, { useEffect, useState } from 'react';
import { carApi } from '../../features/api/carApiSlice';
import Swal from 'sweetalert2';
import { useToast } from '../ToastContext';
import { AddVehiclePayload, Car } from '../../types/Types';
import { Edit, Trash, X } from 'lucide-react';
import AnimatedLoader from '../AnimatedLoader';

const AllVehicles: React.FC = () => {
    const { data: vehicles = [], isError, isLoading: vehicleIsLoading } = carApi.useFetchCarsWithSpecsQuery({
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000,
    });
    const [updateVehicle, { isLoading: isUpdatingVehicle }] = carApi.useUpdateVehicleMutation();
    const [deleteVehicle] = carApi.useDeleteVehicleMutation();
    const { showToast } = useToast();
    const [vehiclesData, setVehiclesData] = useState<Car[]>([]);
    const [page, setPage] = useState<number>(1);
    const specsPerPage: number = 5;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedVehicle, setSelectedVehicle] = useState<Car | null>(null);
    const [rentalRate, setRentalRate] = useState<number | ''>(0);
    const [availability, setAvailability] = useState<string>('Available');

    useEffect(() => {
        if (vehicles) {
            setVehiclesData(vehicles);
        }
    }, [vehicles]);

    const handleDelete = async (vehicle_id: number) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await deleteVehicle(vehicle_id).unwrap();
                showToast("Deleted Successfully", 'success');
            } catch (error: any) {
                showToast('Vehicle not deleted successfully! Please try again.', 'warning');
            }
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const openEditModal = (vehicle: Car) => {
        setSelectedVehicle(vehicle);
        setRentalRate(Number(vehicle.rental_rate));
        setAvailability(vehicle.availability);
        setIsModalOpen(true);
    };

    const handleEditVehicle = async () => {
        if (!rentalRate || !selectedVehicle) {
            showToast('Please enter the rental rate', 'warning');
            return;
        }

        try {
            const vehicleData: AddVehiclePayload = {
                vehicleSpec_id: selectedVehicle.vehicleSpec_id,
                rental_rate: rentalRate.toString(),
                availability,
            };

            await updateVehicle({ vehicle_id: selectedVehicle.vehicle_id, ...vehicleData }).unwrap();
            showToast('Vehicle updated successfully!', 'success');
            setIsModalOpen(false);
            setRentalRate('');
            setAvailability('Available');
        } catch (error: any) {
            console.error('Error updating vehicle:', error);
            showToast('Failed to update vehicle! Please try again.', 'error');
        }
    };

    const paginatedSpecs = vehiclesData.slice((page - 1) * specsPerPage, page * specsPerPage);

    if (vehicleIsLoading) {
        return <div className="text-center"> <AnimatedLoader /> Loading Vehicles...</div>;
    }

    if (isError) {
        return <div className="text-center text-red-500">Error loading vehicle</div>;
    }

    return (
        <div className="container mx-auto py-5 px-4">
            <h1 className="text-xl font-bold text-center">All Vehicles </h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="text-white text-xl">
                            <th>Vehicle ID</th>
                            <th>Vehicle Name</th>
                            <th>Rental rate</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedSpecs.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center">No Vehicle available 😒</td>
                            </tr>
                        ) : (
                            paginatedSpecs.map(vehicle => (
                                <tr key={vehicle.vehicle_id} className="text-xl">
                                    <td>{vehicle.vehicle_id}</td>
                                    <td>{vehicle.vehicleSpec.vehicle_name}</td>
                                    <td>{vehicle.rental_rate}</td>
                                    <td>{vehicle.availability}</td>
                                    <td>
                                        <button
                                            className="btn btn-info btn-outline mr-2"
                                            onClick={() => openEditModal(vehicle)}
                                        >
                                            <Edit /> Edit Vehicle
                                        </button>
                                        <button className="btn btn-error btn-outline" onClick={() => handleDelete(vehicle.vehicle_id)}> <Trash className="text-red-500" /> </button>
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
                        disabled={page === Math.ceil(vehiclesData.length / specsPerPage)}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>

            <dialog id="my_modal_5" className={`modal modal-bottom sm:modal-middle ${isModalOpen ? 'modal-open' : ''}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Vehicle</h3>
                    <div className="mt-4">
                        <label className="label">
                            <span className="label-text">Rental Rate</span>
                        </label>
                        <input
                            type="number"
                            value={rentalRate}
                            onChange={(e) => setRentalRate(Number(e.target.value))}
                            className="input input-bordered w-full"
                            placeholder="Enter rental rate"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="label">
                            <span className="label-text">Availability</span>
                        </label>
                        <select
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                            className="select select-bordered w-full"
                        >
                            <option value="Available">Available</option>
                            <option value="Not Available">Not Available</option>
                        </select>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-outline btn-info" onClick={handleEditVehicle} disabled={isUpdatingVehicle}>
                            {isUpdatingVehicle ? 'Updating...' : <Edit />} Update Vehicle
                        </button>
                        <button className="btn btn-outline" onClick={() => setIsModalOpen(false)}><X /></button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AllVehicles;
