import { useEffect } from 'react';
import useAdminContext from '../../hooks/useAdminContext';
import useAppContext from '../../hooks/useAppContext';
import { assets } from '../../assets/assets';

const AllAppointments = () => {
   const { aToken, appointments, getAllAppointments, cancelAppointment } = useAdminContext();
   const { currencySymbol, calculateAge, slotDateFormat } = useAppContext();

   useEffect(() => {
      if (aToken) {
         getAllAppointments();
      }
   }, [aToken]);
   return (
      <div className="mx-5 my-4 w-full max-w-6xl">
         <p className="mb-3 text-lg font-medium">All Appointments</p>

         <div className="bg-white border rounded text-sm min-h-[60vh] max-h-[calc(100vh-61px-32px-40px)] sm:max-h-[calc(100vh-62.86px-32px-40px)] overflow-y-scroll">
            <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
               <p>#</p>
               <p>Patient</p>
               <p>Age</p>
               <p>Date & Time</p>
               <p>Doctor</p>
               <p>Fees</p>
               <p>Actions</p>
            </div>
            {[...appointments].reverse().map((item, index) => (
               <div
                  className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
                  key={index}
               >
                  <p className="max-sm:hidden">{index + 1}</p>
                  <div className="flex items-center gap-2">
                     <img className="w-8 rounded-full" src={item.userData.image} alt="" />
                     <p>{item.userData.name}</p>
                  </div>
                  <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
                  <p>
                     {slotDateFormat(item.slotDate)}, {item.slotTime}
                  </p>

                  <div className="flex items-center gap-2">
                     <img className="w-8 rounded-full bg-gray-100" src={item.docData.image} alt="" />
                     <p>{item.docData.name}</p>
                  </div>
                  <p>
                     {currencySymbol}
                     {item.amount}
                  </p>

                  {item.cancelled ? (
                     <p className="text-red-400 min-h-10 flex items-center text-xs font-medium">Cancelled</p>
                  ) : item.isCompleted ? (
                     <p className="text-green-500 min-h-10 flex items-center text-xs font-medium">Completed</p>
                  ) : (
                     <img
                        onClick={() => cancelAppointment(item._id)}
                        className="w-10 cursor-pointer"
                        src={assets.cancel_icon}
                        alt=""
                     />
                  )}
               </div>
            ))}
         </div>
      </div>
   );
};
export default AllAppointments;
