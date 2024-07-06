import React, { createContext, useContext, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { ToastContextProps } from '../types/Types';


const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<'success' | 'error' | 'info' | 'warning'>('info');

    const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
        setToastMessage(message);
        setToastType(type);
        toast(message, { type });
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            <Toaster />
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
