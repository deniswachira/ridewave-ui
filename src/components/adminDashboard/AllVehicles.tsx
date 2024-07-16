import React, { useEffect, useState } from 'react';
import { carApi } from '../../features/api/carApiSlice';
import Swal from 'sweetalert2';
import { useToast } from '../ToastContext';
import { AddVehiclePayload } from '../../types/Types';
import { SquarePlus, Trash, X } from 'lucide-react';
import AnimatedLoader from '../AnimatedLoader';

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
export interface Vehicle {
    vehicle_id: number;
    vehicleSpec_id: number;
    rental_rate: number;
    availability: string; 
    vehicleSpec: VehicleSpecs;   
}

const AllVehicles: React.FC = () => {
   
    const {data: vehicles = [], isError,isLoading:vehicleIsloading} = carApi.useFetchCarsWithSpecsQuery({
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000,
    });
    const [addVehicle, { isLoading: isAddingVehicle }] = carApi.useAddVehicleMutation();
    const [deleteCarSpec, ] = carApi.useDeleteVehicleSpecMutation();
    const { showToast } = useToast();
    const [vehiclesData, setVehiclesData] = useState<Vehicle[]>([]);
    const [page, setPage] = useState<number>(1);
    const specsPerPage: number = 5;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state
    const [selectedVehicleSpecId, setSelectedVehicleSpecId] = useState<number | null>(null); // Selected vehicle spec ID
    const [rentalRate, setRentalRate] = useState<number | ''>(''); // Rental rate state
    const [availability, setAvailability] = useState<string>('Available');

    useEffect(() => {
        if (vehicles) {
            setVehiclesData(vehicles);
        }
    }, [vehicles]); 

    const handleDelete = async (vehicleSpec_id: number) => {
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
                await deleteCarSpec(vehicleSpec_id).unwrap();
                showToast("Deleted Successfully", 'success');
            } catch (error: any) {
               
                showToast('Specification not deleted successfully! Please try again.', 'warning');
            }
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleAddVehicle = async () => {
        if (!rentalRate) {
            showToast('Please enter the rental rate', 'warning');
            return;
        }

        try {
            const vehicleData: AddVehiclePayload = {
                vehicleSpec_id: selectedVehicleSpecId ?? 0,
                rental_rate: rentalRate.toString(),
                availability,
            };

            await addVehicle(vehicleData).unwrap();
            showToast('Vehicle added successfully!', 'success');
            setIsModalOpen(false); // Close the modal after adding
            setRentalRate(''); // Reset rental rate
        } catch (error: any) {
            console.error('Error adding vehicle:', error);
            showToast('Failed to add vehicle! Please try again.', 'error');
        }
    };

    const paginatedSpecs = vehiclesData.slice((page - 1) * specsPerPage, page * specsPerPage);

    if (vehicleIsloading) {
        return <div className="text-center"> <AnimatedLoader/> Loading Vehicles...</div>;
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
                        <tr>
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
                                <tr key={vehicle.vehicle_id}>
                                    <td>{vehicle.vehicle_id}</td>
                                    <td>{vehicle.vehicleSpec.vehicle_name}</td>
                                    <td>{vehicle.rental_rate}</td>
                                    <td>{vehicle.availability}</td>
                                    
                                    <td>
                                        <button
                                            className="btn btn-info btn-outline mr-2"
                                            onClick={() => {
                                                setSelectedVehicleSpecId(vehicle.vehicle_id);
                                                setIsModalOpen(true);
                                            }}
                                        >
                                            <SquarePlus /> Edit Vehicle
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

            {/* Daisy UI Modal */}
            <dialog id="my_modal_5" className={`modal modal-bottom sm:modal-middle ${isModalOpen ? 'modal-open' : ''}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Vehicle</h3>
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
                        <button className="btn btn-outline btn-info" onClick={handleAddVehicle} disabled={isAddingVehicle}>
                            {isAddingVehicle ? 'Adding...' : <SquarePlus /> } Add Vehicle
                        </button>
                        <button className="btn btn-outline" onClick={() => setIsModalOpen(false)}><X /></button>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default AllVehicles;
