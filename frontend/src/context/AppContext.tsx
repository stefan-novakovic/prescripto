import { createContext, ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Doctor } from '../assets/assets';

type AppContextType = {
   doctors: Doctor[];
   currencySymbol: string;
   token: string | null;
   setToken: React.Dispatch<React.SetStateAction<string | null>>;
   backendUrl: string;
};

export const AppContext = createContext<AppContextType>({
   doctors: [],
   currencySymbol: '',
   token: null,
   setToken: () => {},
   backendUrl: ''
});

const AppContextProvider = ({ children }: { children?: ReactNode | ReactNode[] }) => {
   const [doctors, setDoctors] = useState<Doctor[]>([]);
   const [token, setToken] = useState<string | null>(
      localStorage.getItem('token') ? localStorage.getItem('token') : null
   );

   const currencySymbol: string = '$';
   const backendUrl: string = import.meta.env.VITE_BACKEND_URL;

   const getDoctorsData = async () => {
      try {
         const { data } = await axios.get(backendUrl + '/api/doctor/list');
         if (data.success) {
            setDoctors(data.doctors);
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         if (error instanceof Error) {
            toast.error(error.message);
            console.log(error);
         } else {
            toast.error('An unknown error occurred');
            console.log('Unknown error:', error);
         }
      }
   };

   useEffect(() => {
      getDoctorsData();
   }, []);

   return (
      <AppContext.Provider value={{ doctors, currencySymbol, token, setToken, backendUrl }}>
         {children}
      </AppContext.Provider>
   );
};

export default AppContextProvider;
