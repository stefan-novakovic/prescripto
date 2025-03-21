import { useEffect } from 'react';
import useAdminContext from '../../hooks/useAdminContext';
import useAppContext from '../../hooks/useAppContext';
import { assets } from '../../assets/assets';
import SkewLoader from 'react-spinners/SkewLoader';

const AllAppointments = () => {
   const { aToken, appointments, loadingAppointments, getAllAppointments, cancelAppointment } = useAdminContext();
   const { currencySymbol, calculateAge, slotDateFormat } = useAppContext();

   useEffect(() => {
      if (aToken) {
         getAllAppointments();
      }
   }, [aToken]);
   return (
      <section className="h-[calc(100vh-61px-48px)] sm:h-[calc(100vh-62.85px)] overflow-y-scroll px-2.5 sm:px-5 py-4 w-full">
         <p className="mb-3 text-lg font-medium">All Appointments</p>

         <div className="overflow-x-scroll lg:overflow-auto">
            <div className="bg-white border rounded text-sm w-[920px] lg:w-full lg:max-w-6xl">
               <div className="grid grid-cols-[2.285fr_0.625fr_1.825fr_2.75fr_0.825fr_1.15fr] sm:grid-cols-[0.45fr_2.55fr_0.625fr_1.825fr_3.425fr_0.825fr_1.15fr] grid-flow-col py-3 px-3 sm:px-6 border-b">
                  <p className="hidden sm:block pr-2">#</p>
                  <p className="px-2">Patient</p>
                  <p className="px-2">Age</p>
                  <p className="px-2">Date & Time</p>
                  <p className="px-2">Doctor</p>
                  <p className="px-2">Fees</p>
                  <p className="px-2">Actions</p>
               </div>

               {loadingAppointments && appointments.length === 0 && (
                  <div className="flex px-[23px] sm:px-[19px] py-[28.5px]">
                     <SkewLoader size={8} color="rgb(107,114,128)" className="relative rotate-180" />
                  </div>
               )}
               {appointments.length > 0 &&
                  [...appointments].reverse().map((item, index) => (
                     <div
                        className="grid grid-cols-[2.285fr_0.625fr_1.825fr_2.75fr_0.825fr_1.15fr] sm:grid-cols-[0.45fr_2.55fr_0.625fr_1.825fr_3.425fr_0.825fr_1.15fr] items-center text-gray-500 py-3 px-3 sm:px-6 border-b hover:bg-gray-50"
                        key={index}
                     >
                        <p className="hidden sm:block pr-2 min-h-5">{index + 1}</p>
                        <div className="flex items-center gap-2 pr-2 pl-0.5">
                           <div className="w-8 aspect-square rounded-full">
                              <img className="w-8 h-8 rounded-full" src={item.userData.image} alt="" />
                           </div>
                           <p className="min-h-5">{item.userData.name}</p>
                        </div>
                        <p className="px-2 min-h-5">{calculateAge(item.userData.dob)}</p>
                        <p className="px-2 min-h-5">
                           <span className="whitespace-nowrap">{slotDateFormat(item.slotDate)}</span>
                           <span>, </span>
                           <span className="whitespace-nowrap">{item.slotTime}</span>
                        </p>

                        <div className="flex items-center gap-2 px-2">
                           <div className="w-8 aspect-square rounded-full bg-gray-100">
                              <img className="w-8 h-8 rounded-full" src={item.docData.image} alt="" />
                           </div>
                           <p className="min-h-5">{item.docData.name}</p>
                        </div>
                        <p className="px-2 min-h-5">
                           {currencySymbol}
                           {item.amount}
                        </p>

                        {item.cancelled ? (
                           <p className="text-red-400 text-start min-h-10 flex items-center text-xs font-medium px-2">
                              Cancelled
                           </p>
                        ) : item.isCompleted ? (
                           <p className="text-green-500 text-start min-h-10 flex items-center text-xs font-medium px-2">
                              Completed
                           </p>
                        ) : (
                           <div className="px-1 w-12 h-10">
                              <img
                                 onClick={() => cancelAppointment(item._id)}
                                 className="w-10 h-10 cursor-pointer"
                                 src={assets.cancel_icon}
                                 alt=""
                              />
                           </div>
                        )}
                     </div>
                  ))}
               {!loadingAppointments && appointments.length === 0 && (
                  <div className="px-[23px] sm:px-[19px] py-[20.4px] text-base">No appointments booked yet.</div>
               )}
            </div>
         </div>
      </section>
   );
};
export default AllAppointments;
