import { useEffect } from 'react';
import useDoctorContext from '../../hooks/useDoctorContext';
import { assets } from '../../assets/assets';
import useAppContext from '../../hooks/useAppContext';

const DoctorDashboard = () => {
   const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useDoctorContext();
   const { currencySymbol, slotDateFormat } = useAppContext();
   useEffect(() => {
      if (dToken) {
         getDashData();
      }
   }, [dToken]);
   return (
      dashData && (
         <div className="mx-5 my-4 w-full">
            <div className="flex flex-wrap gap-3">
               <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 hover:scale-105 transition-all">
                  <img className="w-14" src={assets.earning_icon} alt="" />
                  <div>
                     <p className="text-xl font-semibold text-gray-600">
                        {currencySymbol} {dashData.earnings}
                     </p>
                     <p className="text-gray-400">Earnings</p>
                  </div>
               </div>

               <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 hover:scale-105 transition-all">
                  <img className="w-14" src={assets.appointments_icon} alt="" />
                  <div>
                     <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
                     <p className="text-gray-400">Appointments</p>
                  </div>
               </div>

               <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 hover:scale-105 transition-all">
                  <img className="w-14" src={assets.patients_icon} alt="" />
                  <div>
                     <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
                     <p className="text-gray-400">Patients</p>
                  </div>
               </div>
            </div>

            <div className="bg-white">
               <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
                  <img src={assets.list_icon} alt="" />
                  <p className="font-semibold">Latest Bookings</p>
               </div>

               <div className="pt-2 border border-t-0">
                  {dashData.latestAppointments.map((item, index) => (
                     <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={index}>
                        <img className="rounded-full w-10" src={item.userData.image} alt="" />
                        <div className="flex-1 text-sm">
                           <p className="text-gray-800 font-medium">{item.userData.name}</p>
                           <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                        </div>

                        {item.cancelled ? (
                           <p className="text-red-400 text-xs font-medium">Cancelled</p>
                        ) : item.isCompleted ? (
                           <p className="text-green-500 text-xs font-medium">Completed</p>
                        ) : (
                           <div className="flex">
                              <img
                                 onClick={() => cancelAppointment(item._id)}
                                 className="w-10 cursor-pointer"
                                 src={assets.cancel_icon}
                                 alt=""
                              />
                              <img
                                 onClick={() => completeAppointment(item._id)}
                                 className="w-10 cursor-pointer"
                                 src={assets.tick_icon}
                                 alt=""
                              />
                           </div>
                        )}
                     </div>
                  ))}
               </div>
            </div>
         </div>
      )
   );
};
export default DoctorDashboard;
