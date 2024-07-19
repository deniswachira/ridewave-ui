import { apiDomain } from '../../proxxy/proxxy';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddSpecsFormValues, AddVehiclePayload, vehicleUpdatePayload } from '../../types/Types';
// import { FetchCarsWithSpecsResponse } from '../../types/Types';

export const carApi = createApi({
  reducerPath: 'carApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiDomain }), 
  refetchOnReconnect: true,
  tagTypes: ['fetchCarsWithSpecs', 'fetchCarSpecs'],
  endpoints: (builder) => ({
    fetchCarsWithSpecs: builder.query({
      query: () => 'vehicles-with-specs',
      providesTags: ["fetchCarsWithSpecs"] 
    }),
    fetchCarByIdWithSpecs: builder.query({
      query: (vehicle_id) => `vehicles-with-specs/${vehicle_id}`,
    }),
    addVehicle: builder.mutation<AddVehiclePayload, Partial<AddVehiclePayload>>({
      query: (addVehiclePayload: AddVehiclePayload) => ({
        url: 'vehicles',
        method: 'POST',
        body: addVehiclePayload,
      }),
      invalidatesTags: ["fetchCarsWithSpecs"] 
    }),
    updateVehicle: builder.mutation<vehicleUpdatePayload, Partial<vehicleUpdatePayload>>({
      query: ({ vehicle_id, ...patch}) => ({
        url: `vehicles/${vehicle_id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ["fetchCarsWithSpecs"] 
    }),
    deleteVehicleSpec: builder.mutation({
      query: (vehicleSpec_id) => ({
        url: `vehicles-spec/${vehicleSpec_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["fetchCarsWithSpecs", "fetchCarSpecs"] 
    }),
    deleteVehicle: builder.mutation({
      query: (vehicle_id) => ({
        url: `vehicles/${vehicle_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["fetchCarsWithSpecs"] 
    }),
    addCarSpec: builder.mutation<AddSpecsFormValues,Partial<AddSpecsFormValues>>({
      query: (addSpecsPayload:AddSpecsFormValues) => ({
        url: `vehicles-spec`,
        method: 'POST',
        body: addSpecsPayload,
      }),
      invalidatesTags: ["fetchCarSpecs"]
    }),
    getCarSpecs: builder.query({
      query: () => 'vehicles-spec',
      providesTags: ["fetchCarSpecs"]
    }),
    // deleteCarSpec: builder.mutation<void, number>({
    //   query: (id) => ({
    //     url: `vehicles-spec/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ["fetchCarSpecs"] 
    // }),
  }),
  
});
