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

type DashData = {
   doctors: number;
   appointments: number;
   patients: number;
   latestAppointments: Appointment[];
};

type AdminContextType = {
   aToken: string | null;
   setAToken: React.Dispatch<React.SetStateAction<string | null>>;
   backendUrlAdmin: string;
   doctors: Doctor[];
   getAllDoctors: () => Promise<void>;
   loadingAllDoctors: boolean;
   changeAvailability: (docId: string) => Promise<void>;
   appointments: Appointment[];
   setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
   loadingAppointments: boolean;
   getAllAppointments: () => Promise<void>;
   cancelAppointment: (appointmentId: string) => Promise<void>;
   dashData: DashData | null;
   getDashData: () => Promise<void>;
   getUpdatedDoctor: (docId: string, changeAvailabilitySuccessMsg: string) => Promise<void>;
};

export const AdminContext = createContext<AdminContextType>({
   aToken: null,
   setAToken: () => {},
   backendUrlAdmin: '',
   doctors: [],
   getAllDoctors: async () => {},
   loadingAllDoctors: true,
   changeAvailability: async () => {},
   appointments: [],
   setAppointments: () => {},
   loadingAppointments: true,
   getAllAppointments: async () => {},
   cancelAppointment: async () => {},
   dashData: null,
   getDashData: async () => {},
   getUpdatedDoctor: async () => {}
});

const AdminContextProvider = ({ children }: { children?: ReactNode | ReactNode[] }) => {
   const [aToken, setAToken] = useState<string | null>(
      localStorage.getItem('aToken') ? localStorage.getItem('aToken') : null
   );
   const [doctors, setDoctors] = useState<Doctor[]>([]);
   const [loadingAllDoctors, setLoadingAllDoctors] = useState<boolean>(true);
   const [appointments, setAppointments] = useState<Appointment[]>([]);
   const [loadingAppointments, setLoadingAppointments] = useState<boolean>(true);
   const [dashData, setDashData] = useState<DashData | null>(null);

   const backendUrlAdmin = import.meta.env.VITE_BACKEND_URL;

   const getAllDoctors = async (changeAvailabilitySuccessMsg?: string) => {
      setLoadingAllDoctors(true);

      try {
         const { data } = await axios.post(backendUrlAdmin + '/api/admin/all-doctors', {}, { headers: { aToken } });
         if (data.success) {
            setDoctors(data.doctors);
            toast.success(changeAvailabilitySuccessMsg);
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
         setLoadingAllDoctors(false);
      }
   };

   const getUpdatedDoctor = async (docId: string, changeAvailabilitySuccessMsg: string) => {
      try {
         const { data } = await axios.post(
            backendUrlAdmin + '/api/admin/updated-doctor',
            { docId },
            { headers: { aToken } }
         );
         if (data.success) {
            const updatedDoctor: Doctor = data.doctor;
            setDoctors((prev) => prev.map((doctor) => (doctor._id === updatedDoctor?._id ? updatedDoctor : doctor)));
            toast.success(changeAvailabilitySuccessMsg);
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
            backendUrlAdmin + '/api/admin/change-availability',
            { docId },
            { headers: { aToken } }
         );

         if (data.success) {
            getUpdatedDoctor(docId, data.message);
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
      setLoadingAppointments(true);

      try {
         const { data } = await axios.get(backendUrlAdmin + '/api/admin/appointments', { headers: { aToken } });

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
      } finally {
         setLoadingAppointments(false);
      }
   };

   const cancelAppointment = async (appointmentId: string) => {
      try {
         const { data } = await axios.post(
            backendUrlAdmin + '/api/admin/cancel-appointment',
            { appointmentId },
            { headers: { aToken } }
         );
         if (data.success) {
            toast.success(data.message);
         } else {
            toast.error(data.message);
         }
         getAllAppointments();
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

   const getDashData = async () => {
      try {
         const { data } = await axios.get(backendUrlAdmin + '/api/admin/dashboard', { headers: { aToken } });

         if (data.success) {
            setDashData(data.dashData);
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
            backendUrlAdmin,
            doctors,
            getAllDoctors,
            loadingAllDoctors,
            changeAvailability,
            appointments,
            setAppointments,
            loadingAppointments,
            getAllAppointments,
            cancelAppointment,
            dashData,
            getDashData,
            getUpdatedDoctor
         }}
      >
         {children}
      </AdminContext.Provider>
   );
};

export default AdminContextProvider;
