import { useEffect } from 'react';
import useAdminContext from '../../hooks/useAdminContext';
import { assets } from '../../assets/assets';
import useAppContext from '../../hooks/useAppContext';

const Dashboard = () => {
   const { aToken, dashData, getDashData, cancelAppointment } = useAdminContext();
   const { slotDateFormat } = useAppContext();

   useEffect(() => {
      if (aToken) {
         getDashData();
      }
   }, [aToken]);

   return (
      dashData && (
         <section className="h-[calc(100vh-61px-48px)] sm:h-[calc(100vh-62.85px)] overflow-y-scroll px-2.5 sm:px-5 py-4 w-full">
            <div className="flex flex-wrap gap-3 max-w-6xl">
               <div className="w-full c375:w-auto flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 hoverable:hover:scale-105 transition-all">
                  <div className="w-14 aspect-square">
                     <img className="w-14 h-14" src={assets.doctor_icon} alt="" />
                  </div>
                  <div>
                     <p className="text-xl font-semibold min-h-7 text-gray-600">{dashData.doctors}</p>
                     <p className="text-gray-400">Doctors</p>
                  </div>
               </div>

               <div className="w-full c375:w-auto flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 hoverable:hover:scale-105 transition-all">
                  <div className="w-14 aspect-square">
                     <img className="w-14 h-14" src={assets.appointments_icon} alt="" />
                  </div>
                  <div>
                     <p className="text-xl font-semibold min-h-7 text-gray-600">{dashData.appointments}</p>
                     <p className="text-gray-400">Appointments</p>
                  </div>
               </div>

               <div className="w-full c375:w-auto flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 hoverable:hover:scale-105 transition-all">
                  <div className="w-14 aspect-square">
                     <img className="w-14 h-14" src={assets.patients_icon} alt="" />
                  </div>
                  <div>
                     <p className="text-xl font-semibold min-h-7 text-gray-600">{dashData.patients}</p>
                     <p className="text-gray-400">Patients</p>
                  </div>
               </div>
            </div>

            <div className="bg-white max-w-6xl">
               <div className="flex items-center gap-2.5 px-4 py-4 mt-4 sm:mt-8 rounded-t border">
                  <div className="w-[22px] aspect-square">
                     <img src={assets.list_icon} className="w-[22px] h-[22px]" alt="" />
                  </div>
                  <p className="font-semibold">Latest Bookings</p>
               </div>

               <div className="pt-4 border border-t-0">
                  {dashData.latestAppointments.map((item, index) => (
                     <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={index}>
                        <div className="w-10 aspect-square">
                           <img className="rounded-full w-10 h-10" src={item.docData.image} alt="" />
                        </div>
                        <div className="flex-1 text-sm">
                           <p className="text-gray-800 min-h-5 font-medium">{item.docData.name}</p>
                           <p className="text-gray-600 min-h-5">{slotDateFormat(item.slotDate)}</p>
                        </div>

                        {item.cancelled ? (
                           <p className="text-red-400 min-h-10 flex items-center text-xs font-medium">Cancelled</p>
                        ) : item.isCompleted ? (
                           <p className="text-green-500 min-h-10 flex items-center text-xs font-medium">Completed</p>
                        ) : (
                           <div className="w-10 h-[33px] overflow-hidden aspect-square rounded-full cursor-pointer relative left-1 cursor-pointer">
                              <img
                                 onClick={() => cancelAppointment(item._id)}
                                 className="w-10 h-10"
                                 src={assets.cancel_icon}
                                 alt=""
                              />
                           </div>
                        )}
                     </div>
                  ))}
               </div>
            </div>
         </section>
      )
   );
};
export default Dashboard;
