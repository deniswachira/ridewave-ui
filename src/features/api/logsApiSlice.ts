import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiDomain } from '../../proxxy/proxxy';

export const logsApi = createApi({
    reducerPath: 'logsApi',
        baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
        tagTypes: ['logs'],
        endpoints: (builder) => ({
        getAllLogsByUserID: builder.query({
            query: (user_id) =>  `log/user/${user_id}`,
            providesTags: ['logs'],
        }),      
        addLog: builder.mutation({
            query: (logPayLoad) => ({
            url: 'log',
            method: 'POST',
                body: logPayLoad,
            }),
            invalidatesTags: ['logs'],
        }), 
        
        }),
    });