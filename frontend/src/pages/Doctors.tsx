import { useEffect, useState } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import useAppContext from '../hooks/useAppContext';
import { Doctor } from '../context/AppContext';

const Doctors = () => {
   const { speciality } = useParams<string>();
   const [filterDoc, setFilterDoc] = useState<Doctor[]>([]);
   const [showFilter, setShowFilter] = useState<boolean>(false);
   const [filtering, setFiltering] = useState<boolean>(true);
   const { doctors, loadingDoctors } = useAppContext();
   const navigate: NavigateFunction = useNavigate();

   const applyFilter = () => {
      setFiltering(true);
      if (speciality) {
         setFilterDoc(doctors.filter((doctor) => doctor.speciality === speciality));
      } else {
         setFilterDoc(doctors);
      }
      setFiltering(false);
   };

   useEffect(() => {
      applyFilter();
   }, [doctors, speciality]);
   return (
      <div className="flex flex-1 flex-col w-full 2xl:max-w-[1550px] 2xl:mx-auto mb-24 md:mb-40">
         <p className="text-gray-600">Browse through the doctors specialist.</p>
         <div className="flex flex-col sm:flex-row items-stretch gap-5 mt-5">
            <button
               className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}
               onClick={() => setShowFilter((prev) => !prev)}
            >
               Filters
            </button>
            <div
               className={`w-full sm:w-auto flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}
            >
               <p
                  onClick={() =>
                     speciality === 'General physician' ? navigate(`/doctors`) : navigate(`/doctors/General physician`)
                  }
                  className={`w-full sm:w-auto pl-3 pr-3 sm:pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General physician' ? 'bg-indigo-100 text-black' : 'hover:bg-indigo-50/25'}`}
               >
                  General physician
               </p>
               <p
                  onClick={() =>
                     speciality === 'Gynecologist' ? navigate(`/doctors`) : navigate(`/doctors/Gynecologist`)
                  }
                  className={`w-full sm:w-auto pl-3 pr-3 sm:pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? 'bg-indigo-100 text-black' : 'hover:bg-indigo-50/25'}`}
               >
                  Gynecologist
               </p>
               <p
                  onClick={() =>
                     speciality === 'Dermatologist' ? navigate(`/doctors`) : navigate(`/doctors/Dermatologist`)
                  }
                  className={`w-full sm:w-auto pl-3 pr-3 sm:pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? 'bg-indigo-100 text-black' : 'hover:bg-indigo-50/25'}`}
               >
                  Dermatologist
               </p>
               <p
                  onClick={() =>
                     speciality === 'Pediatricians' ? navigate(`/doctors`) : navigate(`/doctors/Pediatricians`)
                  }
                  className={`w-full sm:w-auto pl-3 pr-3 sm:pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatricians' ? 'bg-indigo-100 text-black' : 'hover:bg-indigo-50/25'}`}
               >
                  Pediatricians
               </p>
               <p
                  onClick={() =>
                     speciality === 'Neurologist' ? navigate(`/doctors`) : navigate(`/doctors/Neurologist`)
                  }
                  className={`w-full sm:w-auto pl-3 pr-3 sm:pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? 'bg-indigo-100 text-black' : 'hover:bg-indigo-50/25'}`}
               >
                  Neurologist
               </p>
               <p
                  onClick={() =>
                     speciality === 'Gastroenterologist'
                        ? navigate(`/doctors`)
                        : navigate(`/doctors/Gastroenterologist`)
                  }
                  className={`w-full sm:w-auto pl-3 pr-3 sm:pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? 'bg-indigo-100 text-black' : 'hover:bg-indigo-50/25'}`}
               >
                  Gastroenterologist
               </p>
            </div>

            {!loadingDoctors && !filtering && filterDoc.length > 0 && (
               <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
                  {filterDoc
                     .sort((a, b) => (a.name > b.name ? 1 : -1))
                     .map((doctor, index) => (
                        <div
                           key={index}
                           onClick={() => navigate(`/appointment/${doctor._id}`)}
                           style={!doctor.available ? { opacity: 0.7 } : { opacity: 1 }}
                           className="min-h-[300px] border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] no-hover:translate-y-0 transition-all duration-500"
                        >
                           <div className="bg-blue-50 w-full aspect-square flex justify-center items-end">
                              <img src={doctor.image} alt="" className="w-full aspect-square" loading="lazy" />
                           </div>
                           <div className="p-4">
                              <div
                                 className={`flex items-center gap-2 text-sm text-center ${doctor.available ? 'text-green-500' : 'text-gray-600'}`}
                              >
                                 <div
                                    className={`w-2 h-2 ${doctor.available ? 'bg-green-500' : 'bg-gray-600'}  rounded-full`}
                                 />
                                 <p>{doctor.available ? 'Available' : 'Not Available'}</p>
                              </div>
                              <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
                              <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                           </div>
                        </div>
                     ))}
               </div>
            )}

            {!loadingDoctors && !filtering && filterDoc.length === 0 && (
               <div className="flex justify-center items-center w-full min-h-[72px] mt-[9.375rem] sm:mt-0 px-8 text-center font-semibold text-red-600 tracking-wide">
                  The doctor speciality provided in the URL does not exist.
               </div>
            )}
         </div>
      </div>
   );
};

export default Doctors;
