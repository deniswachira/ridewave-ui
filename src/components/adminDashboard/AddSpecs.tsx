import { carApi } from "../../features/api/carApiSlice";
import { useForm } from 'react-hook-form';
import { useToast } from '../../components/ToastContext';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


type VehicleSpecs = {
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
interface AddSpecsFormValues extends VehicleSpecs {
    msg: string;
}

const AddSpecs = () => {

    const preset_key = "orcuzpnl";
    const cloud_name = "dosid37ll";
    const [image1, setImage1] = useState<string>("");
    const [image2, setImage2] = useState<string>("");
    const [image3, setImage3] = useState<string>("");

    const { showToast } = useToast();    
    const { register, handleSubmit, formState: { errors } } = useForm<AddSpecsFormValues>();
    const [addSpecs, { isLoading }] = carApi.useAddCarSpecMutation();

    const handleFile1 = async (e: any) => {
       const file = e.target.files[0];
         const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", preset_key);
            try {
                const res = await axios(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                    method: "POST",
                    data: formData
                });
                const data = res.data;
                setImage1(data.secure_url);
                console.log(data.secure_url);
            } catch (err: any) {
                console.log(err);
            }
    };
    const handleFile2 = async (e: any) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset_key);
        try {
            const res = await axios(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: "POST",
                data: formData
            });
            const data = res.data;
            setImage2(data.secure_url);
            console.log(data.secure_url);
        } catch (err: any) {
            console.log(err);
        }
    };
    const handleFile3 = async (e: any) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset_key);
        try {
            const res = await axios(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: "POST",
                data: formData
            });
            const data = res.data;
            setImage3(data.secure_url);
        } catch (err: any) {
            console.log(err);
        }
    };

    const onSubmit = async (data: VehicleSpecs) => {
        data.seating_capacity = parseInt(data.seating_capacity.toString());  
        data.image1_url = image1;
        data.image2_url = image2;
        data.image3_url = image3;

        try {
             await addSpecs(data);        
            showToast('Vehicle Spec added 🎉!', 'success');
        } catch (err: any) {
            console.log(err);
        }
    };
    return (
        <div className="container mx-auto py-8 px-4"> 
            <Link to="/dashboard/admin/vehicle-specs">
                <button type="button" className="btn btn-secondary">Go Back</button>
            </Link>           
            <h1 className="text-2xl font-bold mb-4">Add Vehicle Specifications</h1>
            <form onSubmit={handleSubmit(onSubmit)}  className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Vehicle Name</label>
                        <select className="select select-bordered w-full "{...register("vehicle_name", { required: true })}>
                            <option value="">Select vehicle name</option>
                            <option value="Toyota">Toyota</option>
                            <option value="Mazida">Mazda</option>
                            <option value="Honda">Honda</option>
                        </select>
                        {errors.vehicle_name && <span className="text-red-600"> vehicle_name is required</span>}
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-white-700">Vehicle Model</label>
                        <select className="select select-bordered w-full" {...register("vehicle_model", { required: true })}>
                            <option value="">Select vehicle model</option>
                            <option value="Corolla">Toyota(Corolla)</option>
                            <option value="Camry">Toyota(Camry)</option>
                            <option value="Rav4">Toyota(Rav4)</option>
                            <option value="CX-3">Mazda(CX-3)</option>
                            <option value="CX-30">Mazda(CX-30)</option>
                            <option value="Mazda3">Mazda(Mazda3)</option>
                            <option value="Accord">Honda(Accord)</option>
                            <option value="Civic">Honda(Civic)</option>
                            <option value="CR-V">Honda(CR-V)</option>
                        </select>
                            {errors.vehicle_model && <span className="text-red-600"> vehicle_model is required</span>}
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Vehicle Year</label>
                        <select className="select select-bordered w-full" {...register("vehicle_year", { required: true })}>
                            <option value="">Select vehicle year</option>
                            <option value="2022">2024</option>
                            <option value="2022">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                        </select>
                        {errors.vehicle_year && <span className="text-red-600"> vehicle_year is required</span>}
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
                        <select className="select select-bordered w-full" {...register("fuel_type", { required: true })}>
                            <option value="">Select fuel type</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                        {errors.fuel_type && <span className="text-red-600"> fuel_type is required</span>}
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Seating Capacity</label>
                        <select className="select select-bordered w-full" {...register("seating_capacity", { required: true })}>
                            <option value="">Select seating capacity</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                        {errors.seating_capacity && <span className="text-red-600"> seating_capacity is required</span>}
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Color</label>
                        <select className="select select-bordered w-full" {...register("color", { required: true })}>
                            <option value="">Select color</option>
                            <option value="Black">Black</option>
                            <option value="White">White</option>
                            <option value="Red">Red</option>
                            <option value="Blue">Blue</option>
                        </select>
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Engine Type</label>
                        <select className="select select-bordered w-full" {...register("engine_type", { required: true })}>
                            <option value="">Select engine type</option>
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                            <option value="Dual-Clutch">Dual-Clutch</option>
                            <option value="CVT">CVT (Continuously Variable Transmission)</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Vehicle Description</label>
                        <textarea className="textarea textarea-bordered w-full" placeholder="Enter vehicle description" {...register("vehicle_description", { required: true })}></textarea>
                        {errors.vehicle_description && <span className="text-red-600"> vehicle_description is required</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                        <input type="text" className="input input-bordered w-full" placeholder="Features comma separated"{...register("features")} />
                        {errors.features && <span className="text-red-600"> features is required</span>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image 1 URL</label>
                        <input type="file" onChange={handleFile1} className="input input-bordered w-full" placeholder="Enter image 1 URL" required />
                        <br />
                        <img src={image1} alt="image1" width="75" height="75" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image 2 URL</label>
                        <input type="file" onChange={handleFile2} className="input input-bordered w-full" placeholder="Enter image 2 URL" required />
                        <br />
                        <img src={image2} alt="image2" width="75" height="75" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image 3 URL</label>
                        <input type="file" onChange={handleFile3} className="input input-bordered w-full" placeholder="Enter image 3 URL" required />
                        <br />
                        {errors.image3_url && <span className="text-red-500">This field is required</span>  }
                        {/* //show image after upload_preset */}
                        <img src={image3} alt="image3" width="75" height="75" />
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <button type="submit" className="btn btn-primary">
                        {isLoading ? <span className="loading loading-spinner text-info"></span> : 'Add Vehicle Spec'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddSpecs;
