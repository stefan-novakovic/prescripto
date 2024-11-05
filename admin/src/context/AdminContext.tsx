import axios from 'axios';
import { createContext, ReactNode, useState } from 'react';
import { toast } from 'react-toastify';

type Doctor = {
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
   slots_booked: object;
   __v: number;
};

type UserData = {
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

type Appointment = {
   _id: string;
   amount: number;
   cancelled: false;
   date: number;
   docData: Doctor;
   docId: string;
   isCompleted: boolean;
   payment: boolean;
   slotDate: string;
   slotTime: string;
   userData: UserData;
   userId: string;
   __v: number;
};

type AdminContextType = {
   aToken: string | null;
   setAToken: React.Dispatch<React.SetStateAction<string | null>>;
   backendUrl: string;
   doctors: Doctor[];
   getAllDoctors: () => Promise<void>;
   changeAvailability: (docId: string) => Promise<void>;
   appointments: Appointment[];
   setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
   getAllAppointments: () => Promise<void>;
   cancelAppointment: (appointmentId: string) => Promise<void>;
};

export const AdminContext = createContext<AdminContextType>({
   aToken: null,
   setAToken: () => {},
   backendUrl: '',
   doctors: [],
   getAllDoctors: async () => {},
   changeAvailability: async () => {},
   appointments: [],
   setAppointments: () => {},
   getAllAppointments: async () => {},
   cancelAppointment: async () => {}
});

const AdminContextProvider = ({ children }: { children?: ReactNode | ReactNode[] }) => {
   const [aToken, setAToken] = useState<string | null>(
      localStorage.getItem('aToken') ? localStorage.getItem('aToken') : null
   );
   const [doctors, setDoctors] = useState<Doctor[]>([]);
   const [appointments, setAppointments] = useState<Appointment[]>([]);

   const backendUrl = import.meta.env.VITE_BACKEND_URL;

   const getAllDoctors = async () => {
      try {
         const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } });
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

   const changeAvailability = async (docId: string) => {
      try {
         const { data } = await axios.post(
            backendUrl + '/api/admin/change-availability',
            { docId },
            { headers: { aToken } }
         );

         if (data.success) {
            toast.success(data.message);
            getAllDoctors();
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

   const getAllAppointments = async () => {
      try {
         const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } });

         if (data.success) {
            setAppointments(data.appointments);
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

   const cancelAppointment = async (appointmentId: string) => {
      try {
         const { data } = await axios.post(
            backendUrl + '/api/admin/cancel-appointment',
            { appointmentId },
            { headers: { aToken } }
         );

         if (data.success) {
            toast.success(data.message);
            getAllAppointments();
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

   return (
      <AdminContext.Provider
         value={{
            aToken,
            setAToken,
            backendUrl,
            doctors,
            getAllDoctors,
            changeAvailability,
            appointments,
            setAppointments,
            getAllAppointments,
            cancelAppointment
         }}
      >
         {children}
      </AdminContext.Provider>
   );
};

export default AdminContextProvider;
