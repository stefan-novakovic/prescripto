import { useEffect } from 'react';
import useDoctorContext from '../../hooks/useDoctorContext';
import useAppContext from '../../hooks/useAppContext';
import { assets } from '../../assets/assets';
import SkewLoader from 'react-spinners/SkewLoader';

const DoctorAppointments = () => {
   const { dToken, appointments, loadingDoctorAppointments, getAppointments, completeAppointment, cancelAppointment } =
      useDoctorContext();
   const { currencySymbol, calculateAge, slotDateFormat } = useAppContext();

   useEffect(() => {
      if (dToken) {
         getAppointments();
      }
   }, [dToken]);
   return (
      <section className="h-[calc(100vh-61px-48px)] sm:h-[calc(100vh-62.85px)] overflow-y-scroll px-2.5 sm:px-5 py-4 w-full">
         <p className="mb-3 text-lg font-medium">All Appointments</p>

         <div className="overflow-scroll lg:overflow-auto">
            <div className="bg-white border rounded text-sm w-[920px] lg:w-full lg:max-w-6xl">
               <div className="grid grid-cols-[0.3fr_0.2fr_0.125fr_0.325fr_0.125fr_0.2fr] sm:grid-cols-[0.4fr_2.55fr_1.05fr_0.625fr_1.875fr_0.825fr_1.25fr] grid-flow-col py-3 px-3 sm:px-6 border-b">
                  <p className="hidden sm:block pr-2">#</p>
                  <p className="px-2">Patient</p>
                  <p className="px-2">Payment</p>
                  <p className="px-2">Age</p>
                  <p className="px-2">Date & Time</p>
                  <p className="px-2">Fees</p>
                  <p className="px-2">Actions</p>
               </div>

               {loadingDoctorAppointments && appointments.length === 0 && (
                  <div className="flex py-[31.4px] px-[23px] sm:px-[19px]">
                     <SkewLoader size={8} color="rgb(107,114,128)" className="relative rotate-180" />
                  </div>
               )}
               {appointments.length > 0 &&
                  [...appointments].reverse().map((item, index) => (
                     <div
                        className="grid grid-cols-[0.3fr_0.2fr_0.125fr_0.325fr_0.125fr_0.2fr] sm:grid-cols-[0.4fr_2.55fr_1.05fr_0.625fr_1.875fr_0.825fr_1.25fr] items-center text-gray-500 py-3 px-3 sm:px-6 border-b hover:bg-gray-50"
                        key={index}
                     >
                        <p className="hidden sm:block pr-2 min-h-5">{index + 1}</p>
                        <div className="flex items-center gap-2 pr-2 pl-0.5">
                           <div className="min-w-8 aspect-square rounded-full">
                              <img className="w-8 h-8 rounded-full" src={item.userData.image} alt="" />
                           </div>
                           <p className="min-h-5">{item.userData.name}</p>
                        </div>
                        <div className="px-2 min-h-5 flex items-center">
                           <p className="text-xs min-w-16 h-[21.2px] text-center inline-block border border-gray-500 px-2 py-[1.6px] rounded-full">
                              {item.payment ? 'ONLINE' : 'CASH'}
                           </p>
                        </div>
                        <p className="px-2 min-h-5">{calculateAge(item.userData.dob)}</p>
                        <p className="px-2 min-h-5">
                           <span className="whitespace-nowrap">{slotDateFormat(item.slotDate)}</span>
                           <span>, </span>
                           <span className="whitespace-nowrap">{item.slotTime}</span>
                        </p>
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
                           <div className="flex relative left-1 pt-[6px]">
                              <div className="w-10 aspect-square rounded-full cursor-pointer">
                                 <img
                                    onClick={() => cancelAppointment(item._id)}
                                    className="w-10 h-10"
                                    src={assets.cancel_icon}
                                    alt=""
                                    title="Cancel appointment"
                                 />
                              </div>
                              <div className="w-10 aspect-square rounded-full cursor-pointer">
                                 <img
                                    onClick={() => completeAppointment(item._id)}
                                    className="w-10 h-10"
                                    src={assets.tick_icon}
                                    alt=""
                                    title="Complete appointment"
                                 />
                              </div>
                           </div>
                        )}
                     </div>
                  ))}
               {!loadingDoctorAppointments && appointments.length === 0 && (
                  <div className="px-[23px] sm:px-[19px] py-[23.4px] text-base">No appointments booked yet.</div>
               )}
            </div>
         </div>
      </section>
   );
};
export default DoctorAppointments;
