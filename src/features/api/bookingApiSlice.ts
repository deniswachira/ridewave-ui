import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createBookingResponse} from '../../types/Types';
import {BookingFormValues} from '../../types/Types';
import { apiDomain } from '../../proxxy/proxxy';


export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
  tagTypes: ['bookings', 'payments'],
  endpoints: (builder) => ({
    fetchBookings: builder.query({
      query: () => 'bookings',
      providesTags: ["bookings"]
    }),
    fetchBookingsWithUserDetails: builder.query({
      query: () => 'bookings-user-with-userdetails',
      providesTags: ["bookings"]
    }),
    fetchBookingById: builder.query({
      query: (booking_id) => `bookings/${booking_id}`,
    }),
    fetchBookingsByUserId: builder.query({
      query: (user_id) => `users/${user_id}/bookings`,
      providesTags: ["bookings"]
    }),
    addBooking: builder.mutation<createBookingResponse,Partial<createBookingResponse>>({
      query: (bookingPayload:BookingFormValues ) => ({
        url: 'bookings',
        method: 'POST',
        body: bookingPayload,
      }),
      invalidatesTags: ["bookings"] 
    }),
    updateBooking: builder.mutation<void, { id: number, car_id: number, start_date: string, end_date: string }>({
      query: ({ id, car_id, start_date, end_date }) => ({
        url: `bookings/${id}`,
        method: 'PUT',
        body: { car_id, start_date, end_date },
      }),
      invalidatesTags: ["bookings"] 
    }),
    deleteBooking: builder.mutation({
      query: (booking_id) => ({
        url: `users/${booking_id}/bookings`,
        method: 'DELETE',
      }),
      invalidatesTags: ["bookings"] 
    }),
    getPayments: builder.query({
      query: () => 'payments',
      providesTags: ["payments"]
    }),
    deletePayment: builder.mutation({
      query: (payment_id) => ({
        url: `payments/${payment_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["payments"] 
    }),
    getPaymentsByUserId: builder.query({
      query: (user_id) => `payments-with-user-id/${user_id}`,
      providesTags: ["payments"]
    }),
  }),
});