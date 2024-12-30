import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import useAppContext from '../hooks/useAppContext';
import { Doctor, UserData } from '../context/AppContext';
import { useNavigate, useLocation, NavigateFunction, Location } from 'react-router-dom';

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
   const { backendUrl, token, getDoctorsData } = useAppContext();

   const navigate: NavigateFunction = useNavigate();
   const location: Location = useLocation();

   const [appointments, setAppointments] = useState<Appointment[]>([]);
   const [loadingUserAppointments, setLoadingUserAppoinments] = useState<boolean>(true);

   // const months: string[] = [
   //    'January',
   //    'February',
   //    'March',
   //    'April',
   //    'May',
   //    'June',
   //    'July',
   //    'August',
   //    'September',
   //    'October',
   //    'November',
   //    'December'
   // ];

   const slotDateFormat = (slotDate: string) => {
      const dateArray = slotDate.split('_');
      // Months shown in format 1, January, 2024
      // return dateArray[0] + ', ' + months[Number(dateArray[1]) - 1] + ', ' + dateArray[2];

      // Months shown in 1.1.2024
      return dateArray.join('.');
   };

   const getUserAppointments = async () => {
      setLoadingUserAppoinments(true);
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
      } finally {
         setLoadingUserAppoinments(false);
      }
   };

   const cancelAppointment = async (appointmentId: string) => {
      try {
         const { data } = await axios.post(
            backendUrl + '/api/user/cancel-appointment',
            { appointmentId },
            { headers: { token } }
         );
         if (data.success) {
            toast.success(data.message);
            getDoctorsData();
         } else {
            toast.error(data.message);
         }
         getUserAppointments();
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
      } else {
         toast.warn('Log in to see this page');
         return navigate('/login', { state: { from: location }, replace: true });
      }
   }, [token]);
   return (
      <section className="flex flex-1 flex-col w-full 2xl:max-w-[1550px] 2xl:mx-auto mb-24 md:mb-40">
         <p className="pb-3  font-medium text-zinc-700 border-b">My appointments</p>

         {loadingUserAppointments && (
            <div className="flex min-h-[calc(100vh-77px-16px-37px-96px)] md:min-h-[calc(100vh-77px-16px-37px-160px)] justify-center items-center p-4">
               <ClipLoader color="black" size={32} className="relative top-12" />
            </div>
         )}
         {!loadingUserAppointments && appointments.length > 0 ? (
            <div className="min-h-[calc(100vh-77px-16px-37px-96px)] md:min-h-[calc(100vh-77px-16px-37px-160px)]">
               {appointments.map((appointment, index) => (
                  <div key={index} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b">
                     <div className="min-w-32 sm:w-32 h-min aspect-square bg-indigo-50">
                        <img className="min-w-32 sm:w-32 aspect-square" src={appointment.docData.image} alt="" />
                     </div>
                     <div className="flex-1 text-sm text-zinc-600">
                        <p className="text-neutral-800 font-semibold">{appointment.docData.name}</p>
                        <p>{appointment.docData.speciality}</p>
                        <p className="text-zinc-700 font-medium mt-1">Address:</p>
                        <p className="text-xs">{appointment.docData.address.line1}</p>
                        {appointment.docData.address.line2 && (
                           <p className="text-xs">{appointment.docData.address.line2}</p>
                        )}
                        <p className="text-xs mt-1">
                           <span className="text-sm text-neutral-700 font-medium whitespace-nowrap">Date & Time: </span>
                           <span className="block md:inline whitespace-nowrap">
                              {slotDateFormat(appointment.slotDate)}
                           </span>{' '}
                           <span className="hidden md:inline">|</span>{' '}
                           <span className="block md:inline whitespace-nowrap">{appointment.slotTime}</span>
                        </p>
                     </div>
                     {/* div added for responsiveness */}
                     <div />
                     <div className="flex flex-col gap-2 justify-end">
                        {/* {!appointment.cancelled && (
                        <button className="text-sm text-stone-500 text-center sm:min-w-48 p-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                           Pay Online
                        </button>
                     )} */}
                        {appointment.cancelled ? (
                           <div className="text-sm sm:min-w-48 p-2 text-center border border-red-500 rounded text-red-500">
                              Appointment cancelled
                           </div>
                        ) : appointment.isCompleted ? (
                           <div className="text-sm sm:min-w-48 p-2 text-center border border-green-400 rounded text-green-400">
                              Appointment completed
                           </div>
                        ) : (
                           <button
                              onClick={() => cancelAppointment(appointment._id)}
                              className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded  hover:bg-red-600 hover:text-white transition-all duration-300"
                           >
                              Cancel appointment
                           </button>
                        )}
                     </div>
                  </div>
               ))}
            </div>
         ) : (
            !loadingUserAppointments && (
               <div className="min-h-[calc(100vh-77px-16px-37px-96px)] md:min-h-[calc(100vh-77px-16px-37px-160px)] py-5 text-lg font-medium">
                  No appointments have been booked yet.
               </div>
            )
         )}
      </section>
   );
};
export default MyAppointments;
