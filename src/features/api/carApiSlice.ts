// src/features/api/carApiSlice.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { FetchCarsWithSpecsResponse } from '../../types/Types';

export const carApi = createApi({
  reducerPath: 'carApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }), 
  refetchOnReconnect: true,
  tagTypes: ['fetchCarsWithSpecs'],
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
  }),
  
});
