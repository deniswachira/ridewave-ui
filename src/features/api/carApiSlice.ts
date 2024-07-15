import { apiDomain } from '../../proxxy/proxxy';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddSpecsFormValues } from '../../types/Types';
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
    addCar: builder.mutation<void, { make: string, model: string, year: number }>({
      query: ({ make, model, year }) => ({
        url: 'vehicles',
        method: 'POST',
        body: { make, model, year },
      }),
      invalidatesTags: ["fetchCarsWithSpecs"] as const
    }),
    updateCar: builder.mutation<void, { id: number, make: string, model: string, year: number }>({
      query: ({ id, make, model, year }) => ({
        url: `vehicles/${id}`,
        method: 'PUT',
        body: { make, model, year },
      }),
      invalidatesTags: ["fetchCarsWithSpecs"] as const
    }),
    deleteCar: builder.mutation<void, number>({
      query: (id) => ({
        url: `vehicles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["fetchCarsWithSpecs"] as const
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
