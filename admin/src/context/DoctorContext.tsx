import { createContext, ReactNode, useState } from 'react';
import axios from 'axios';
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

type DoctorContextType = {
   backendUrlDoctor: string;
   dToken: string | null;
   setDToken: React.Dispatch<React.SetStateAction<string | null>>;
   appointments: Appointment[];
   setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
   getAppointments: () => Promise<void>;
   completeAppointment: (appointmentId: string) => Promise<void>;
   cancelAppointment: (appointmentId: string) => Promise<void>;
};

export const DoctorContext = createContext<DoctorContextType>({
   backendUrlDoctor: '',
   dToken: null,
   setDToken: () => {},
   appointments: [],
   setAppointments: () => {},
   getAppointments: async () => {},
   cancelAppointment: async () => {},
   completeAppointment: async () => {}
});

const DoctorContextProvider = ({ children }: { children?: ReactNode | ReactNode[] }) => {
   const backendUrlDoctor: string = import.meta.env.VITE_BACKEND_URL;
   const [dToken, setDToken] = useState<string | null>(
      localStorage.getItem('dToken') ? localStorage.getItem('dToken') : null
   );
   const [appointments, setAppointments] = useState<Appointment[]>([]);

   const getAppointments = async () => {
      try {
         const { data } = await axios.get(backendUrlDoctor + '/api/doctor/appointments', { headers: { dToken } });
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

   const completeAppointment = async (appointmentId: string) => {
      try {
         const { data } = await axios.post(
            backendUrlDoctor + '/api/doctor/complete-appointment',
            { appointmentId },
            { headers: { dToken } }
         );
         if (data.success) {
            toast.success(data.message);
         } else {
            toast.error(data.message);
         }
         getAppointments();
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
            backendUrlDoctor + '/api/doctor/cancel-appointment',
            { appointmentId },
            { headers: { dToken } }
         );
         if (data.success) {
            toast.success(data.message);
         } else {
            toast.error(data.message);
         }
         getAppointments();
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
      <DoctorContext.Provider
         value={{
            backendUrlDoctor,
            dToken,
            setDToken,
            appointments,
            setAppointments,
            getAppointments,
            completeAppointment,
            cancelAppointment
         }}
      >
         {children}
      </DoctorContext.Provider>
   );
};

export default DoctorContextProvider;
