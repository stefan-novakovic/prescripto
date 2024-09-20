import useAppContext from '../hooks/useAppContext';

const MyAppointments = () => {
   const { doctors } = useAppContext();
   return (
      <div className="flex flex-1 flex-col">
         <p className="pb-3  font-medium text-zinc-700 border-b">My appointments</p>
         {/* Displays doctors info instead of appointments (placeholder until backend is created) */}
         <div>
            {doctors.slice(0, 3).map((doctor, index) => (
               <div key={index} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b">
                  <div>
                     <img className="min-w-32 sm:w-32 bg-indigo-50" src={doctor.image} alt="" />
                  </div>
                  <div className="flex-1 text-sm text-zinc-600">
                     <p className="text-neutral-800 font-semibold">{doctor.name}</p>
                     <p>{doctor.speciality}</p>
                     <p className="text-zinc-700 font-medium mt-1">Address:</p>
                     <p className="text-xs">{doctor.address.line1}</p>
                     {doctor.address.line2 && <p className="text-xs">{doctor.address.line2}</p>}
                     <p className="text-xs mt-1">
                        <span className="text-sm text-neutral-700 font-medium whitespace-nowrap">Date & Time: </span>
                        <span className="block md:inline whitespace-nowrap">25, July, 2024</span>{' '}
                        <span className="hidden md:inline">|</span>{' '}
                        <span className="block md:inline whitespace-nowrap">8:30 PM</span>
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
