import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiDomain } from '../../proxxy/proxxy';

export const ticketApi = createApi({
  reducerPath: 'ticketApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
    tagTypes: ['tickets'],
    endpoints: (builder) => ({
      getAllTickets: builder.query({
        query: () => 'ticket',
        providesTags: ['tickets'],
      }),
      getAllTicketsByUserId: builder.query({
          query: (user_id) => `ticket/user/${user_id}`,
        providesTags: ['tickets'],
      }),
      addTicket: builder.mutation({
        query: (ticket) => ({
          url: 'ticket',
          method: 'POST',
          body: ticket,
        }),
        invalidatesTags: ['tickets'],
      }),   
      updateTicket: builder.mutation({
        query: ({ ticket_id, ...ticket }) => ({
              url: `ticket/${ticket_id}`,
          method: 'PUT',
          body: ticket,
        }),
        invalidatesTags: ['tickets'],
      }),
      deleteTicket: builder.mutation({
        query: (ticket_id) => ({
          url: `ticket/${ticket_id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['tickets'],

      }),
    }),
});