import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiDomain } from '../../proxxy/proxxy';
export const paymentApi = createApi({
  reducerPath: 'paymentApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
  tagTypes: ['payments'],
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: () => 'payments',
      providesTags: ['payments'],
    }),
    getPaymentByBookingId: builder.query({
        query: (booking_id) => `payment-by-booking-id/${booking_id}`,
        providesTags: ['payments'],
        }),   
    updatePayment: builder.mutation({
      query: ({ paymentId, ...payment }) => ({
        url: `payments/${paymentId}`,
        method: 'PUT',
        body: payment,
      }),
      invalidatesTags: ['payments'],
    }),
    }),
});