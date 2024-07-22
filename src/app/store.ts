import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { userApi } from '../features/api/userApiSlice';
import { carApi } from '../features/api/carApiSlice';
import {bookingApi}  from '../features/api/bookingApiSlice';
import { paymentApi } from '../features/api/paymentApiSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {ticketApi} from '../features/api/ticketApiSlice';

// Create a persist config for the auth slice
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'isAuthenticated','role'], // Specify which parts of the state to persist
};

// Create a persisted reducer for the auth slice
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Create a persist config for the bookingApi slice
const bookingPersistConfig = {
  key: 'booking',
  storage,
  whitelist: [bookingApi.reducerPath], // Only persist bookingApi
};

// Create a persisted reducer for the bookingApi slice
const persistedBookingReducer = persistReducer(bookingPersistConfig, bookingApi.reducer);

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [carApi.reducerPath]: carApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [ticketApi.reducerPath]: ticketApi.reducer,
    [bookingApi.reducerPath]: persistedBookingReducer, // Use the persisted reducer here
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // To avoid serialization errors with redux-persist
    }).concat(userApi.middleware, ticketApi.middleware, carApi.middleware, bookingApi.middleware,paymentApi.middleware), // Include the bookingApi middleware
});

// Export the persisted store
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
