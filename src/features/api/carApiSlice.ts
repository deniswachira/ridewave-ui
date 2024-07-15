import { apiDomain } from '../../proxxy/proxxy';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddSpecsFormValues, AddVehiclePayload } from '../../types/Types';
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
    updateCar: builder.mutation<void, { id: number, make: string, model: string, year: number }>({
      query: ({ id, make, model, year }) => ({
        url: `vehicles/${id}`,
        method: 'PUT',
        body: { make, model, year },
      }),
      invalidatesTags: ["fetchCarsWithSpecs"] 
    }),
    deleteVehicleSpec: builder.mutation({
      query: (vehicleSpec_id) => ({
        url: `vehicles-spec/${vehicleSpec_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["fetchCarsWithSpecs"] 
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
    }),
    getCarSpecs: builder.query({
      query: () => 'vehicles-spec',
      providesTags: ["fetchCarSpecs"]
    }),
    deleteCarSpec: builder.mutation<void, number>({
      query: (id) => ({
        url: `vehicles-spec/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["fetchCarSpecs"] 
    }),
  }),
  
});
