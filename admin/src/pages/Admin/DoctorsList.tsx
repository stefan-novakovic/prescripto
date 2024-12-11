import { useEffect } from 'react';
import useAdminContext from '../../hooks/useAdminContext';

const DoctorsList = () => {
   const { doctors, aToken, getAllDoctors, changeAvailability } = useAdminContext();

   useEffect(() => {
      if (aToken) {
         getAllDoctors();
      }
   }, [aToken]);

   return (
      <div className="px-5 my-4 w-full max-h-[calc(100vh-61px-32px)] sm:max-h-[calc(100vh-62.86px-32px)] overflow-y-scroll">
         <h1 className="text-lg font-medium">All Doctors</h1>
         <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
            {doctors.map((item, index) => (
               <div
                  className="border border-indigo-200 rounded-xl w-full max-w-56 overflow-hidden cursor-pointer group"
                  key={index}
               >
                  <div className="aspect-[1/1] bg-indigo-50">
                     <img className="group-hover:bg-primary transition-all duration-500" src={item.image} alt="" />
                  </div>
                  <div className="p-4">
                     <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
                     <p className="text-zinc-600 text-sm">{item.speciality}</p>
                     <div className="mt-2 flex items-center gap-1 text-sm">
                        <input
                           onChange={() => changeAvailability(item._id)}
                           type="checkbox"
                           name={`doc-available-${index + 1}`}
                           id={`doc-available-${index + 1}`}
                           checked={item.available}
                        />
                        <label className="block" htmlFor={`doc-available-${index + 1}`}>
                           Available
                        </label>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};
export default DoctorsList;
