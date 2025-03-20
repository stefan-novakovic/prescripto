import { useEffect, useState } from 'react';
import PuffLoader from 'react-spinners/PuffLoader';
import useAdminContext from '../../hooks/useAdminContext';

const DoctorsList = () => {
   const { doctors, loadingAllDoctors, aToken, getAllDoctors, getUpdatedDoctor, changeAvailability } =
      useAdminContext();
   const [loadingDoctorId, setLoadingDoctorId] = useState<string | null>(null);

   useEffect(() => {
      if (aToken) {
         getAllDoctors();
      }
   }, [aToken]);

   const handleAvailabilityChange = async (doctorId: string) => {
      setLoadingDoctorId(doctorId);
      await changeAvailability(doctorId);
   };

   useEffect(() => {
      setLoadingDoctorId(null);
   }, [getUpdatedDoctor]);

   return (
      <section className="h-[calc(100vh-61px-48px)] sm:h-[calc(100vh-62.85px)] overflow-y-scroll px-2.5 sm:px-5 py-4 w-full">
         <h1 className="text-lg font-medium">All Doctors</h1>

         {loadingAllDoctors && doctors.length === 0 && (
            <div className="w-full h-[calc(100vh-61px-48px-28px-32px)] sm:h-[calc(100vh-62.85px-28px-32px)] grid place-content-center">
               <PuffLoader size={58} />
            </div>
         )}

         {doctors.length > 0 && (
            <div className="w-full flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-5 pt-5">
               {doctors.map((item, index) => (
                  <div
                     className="border border-indigo-200 rounded-xl w-full max-w-[340px] md:max-w-64 overflow-hidden group"
                     key={item._id}
                  >
                     <div className="aspect-square bg-indigo-50">
                        <img
                           className="w-full max-w-[410px] aspect-square group-hover:bg-primary transition-all duration-500"
                           src={item.image}
                           alt=""
                        />
                     </div>
                     <div className="p-4">
                        <p className="text-neutral-800 min-h-7 text-lg font-medium">{item.name}</p>
                        <p className="text-zinc-600 min-h-5 text-sm">{item.speciality}</p>
                        <div className="mt-2 flex items-center gap-1 text-sm">
                           {loadingDoctorId === item._id ? (
                              <PuffLoader size={13} />
                           ) : (
                              <div className="flex w-[13px] aspect-square">
                                 <input
                                    className="cursor-pointer"
                                    onChange={() => handleAvailabilityChange(item._id)}
                                    type="checkbox"
                                    name={`doc-available-${index + 1}`}
                                    id={`doc-available-${index + 1}`}
                                    checked={item.available}
                                    disabled={loadingDoctorId === item._id}
                                 />
                              </div>
                           )}
                           <label className="block cursor-pointer" htmlFor={`doc-available-${index + 1}`}>
                              Available
                           </label>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         )}
         {!loadingAllDoctors && doctors.length === 0 && <div className="text-base pt-5">No doctors added yet.</div>}
      </section>
   );
};
export default DoctorsList;
