export type UserRegisterFormValues = {
    full_name: string;
    phone_number: string;
    address: string;
    email: string;
    password: string;
};

export type UserLoginFormValues = {    
    email: string;
    password: string;
};

export type UserState ={
    user: {
        user_id: string;
        full_name: string;
        email: string;
        address: string;
        phone_numbere: string;
    } | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}
export interface ToastContextProps {
     showToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

export interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    image: string;
    description: string;
    price: number;
}