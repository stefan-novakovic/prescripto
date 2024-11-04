import { useEffect, useState } from 'react';
import useAppContext from '../hooks/useAppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Doctor, UserData } from '../context/AppContext';

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

const MyAppointments = () => {
   const { backendUrl, token } = useAppContext();

   const [appointments, setAppointments] = useState<Appointment[]>([]);

   const months: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
   ];

   const slotDateFormat = (slotDate: string) => {
      const dateArray = slotDate.split('_');
      // Months shown in format 1, January, 2024
      // return dateArray[0] + ', ' + months[Number(dateArray[1]) - 1] + ', ' + dateArray[2];

      // Months shown in 1.1.2024
      return dateArray.join('.');
   };

   const getUserAppointments = async () => {
      try {
         const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });

         if (data.success) {
            setAppointments(data.appointments.reverse());
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
      if (token) {
         getUserAppointments();
      }
   }, [token]);

   return (
      <div className="flex flex-1 flex-col">
         <p className="pb-3  font-medium text-zinc-700 border-b">My appointments</p>
         {/* Displays doctors info instead of appointments (placeholder until backend is created) */}
         <div>
            {appointments.map((doctor, index) => (
               <div key={index} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b">
                  <div>
                     <img className="min-w-32 sm:w-32 bg-indigo-50" src={doctor.docData.image} alt="" />
                  </div>
                  <div className="flex-1 text-sm text-zinc-600">
                     <p className="text-neutral-800 font-semibold">{doctor.docData.name}</p>
                     <p>{doctor.docData.speciality}</p>
                     <p className="text-zinc-700 font-medium mt-1">Address:</p>
                     <p className="text-xs">{doctor.docData.address.line1}</p>
                     {doctor.docData.address.line2 && <p className="text-xs">{doctor.docData.address.line2}</p>}
                     <p className="text-xs mt-1">
                        <span className="text-sm text-neutral-700 font-medium whitespace-nowrap">Date & Time: </span>
                        <span className="block md:inline whitespace-nowrap">
                           {slotDateFormat(doctor.slotDate)}
                        </span>{' '}
                        <span className="hidden md:inline">|</span>{' '}
                        <span className="block md:inline whitespace-nowrap">{doctor.slotTime}</span>
                     </p>
                  </div>
                  {/* div added for responsiveness */}
                  <div />
                  <div className="flex flex-col gap-2 justify-end">
                     <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                        Pay Online
                     </button>
                     <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded  hover:bg-red-600 hover:text-white transition-all duration-300">
                        Cancel appointment
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};
export default MyAppointments;
