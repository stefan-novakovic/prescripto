import { createContext, ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export type UserData = {
   _id: string;
   name: string;
   image: string;
   email: string;
   phone: string;
   address: { line1: string; line2: string };
   gender: string;
   dob: string;
   __v: number;
};

export type Doctor = {
   _id: string;
   name: string;
   image: string;
   speciality: string;
   degree: string;
   experience: string;
   about: string;
   available: boolean;
   fees: number;
   address: {
      line1: string;
      line2: string;
   };
   date: number;
   slots_booked: { [key: string]: string[] };
   __v: number;
};

type AppContextType = {
   doctors: Doctor[];
   loadingDoctors: boolean;
   getDoctorsData: () => Promise<void>;
   currencySymbol: string;
   token: string | null;
   setToken: React.Dispatch<React.SetStateAction<string | null>>;
   backendUrl: string;
   userData: UserData | null;
   setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
   loadUserProfileData: () => Promise<void>;
};

export const AppContext = createContext<AppContextType>({
   doctors: [],
   loadingDoctors: true,
   getDoctorsData: async () => {},
   currencySymbol: '',
   token: null,
   setToken: () => {},
   backendUrl: '',
   userData: null,
   setUserData: () => {},
   loadUserProfileData: async () => {}
});

const AppContextProvider = ({ children }: { children?: ReactNode | ReactNode[] }) => {
   const [doctors, setDoctors] = useState<Doctor[]>([]);
   const [loadingDoctors, setLoadingDoctors] = useState<boolean>(true);
   const [token, setToken] = useState<string | null>(
      localStorage.getItem('token') ? localStorage.getItem('token') : null
   );
   const [userData, setUserData] = useState<UserData | null>(null);

   const currencySymbol: string = '$';
   const backendUrl: string = import.meta.env.VITE_BACKEND_URL;

   const getDoctorsData = async () => {
      setLoadingDoctors(true);
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
      } finally {
         setLoadingDoctors(false);
      }
   };

   const loadUserProfileData = async () => {
      try {
         const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } });
         if (data.success) {
            setUserData(data.userData);
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

   useEffect(() => {
      if (token) {
         loadUserProfileData();
      } else {
         setUserData(null);
      }
   }, [token]);

   return (
      <AppContext.Provider
         value={{
            doctors,
            loadingDoctors,
            getDoctorsData,
            currencySymbol,
            token,
            setToken,
            backendUrl,
            userData,
            setUserData,
            loadUserProfileData
         }}
      >
         {children}
      </AppContext.Provider>
   );
};

export default AppContextProvider;
