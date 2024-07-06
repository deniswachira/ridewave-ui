import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserRegisterFormValues } from '../../types/Types';



export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    registerUser: builder.mutation({
      query: (userRegisterPayload: UserRegisterFormValues) => ({
        url: 'auth/register',
        method: 'POST',
        body: userRegisterPayload,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = userApi;

// Export the auto-generated hooks for each endpoint
export default userApi;

