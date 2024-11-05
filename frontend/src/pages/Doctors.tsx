import { useEffect, useState } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import useAppContext from '../hooks/useAppContext';
import { Doctor } from '../context/AppContext';

const Doctors = () => {
   const { speciality } = useParams<string>();
   const [filterDoc, setFilterDoc] = useState<Doctor[]>([]);
   const [showFilter, setShowFilter] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(true);
   const { doctors } = useAppContext();
   const navigate: NavigateFunction = useNavigate();

   const applyFilter = () => {
      setLoading(true);
      if (speciality) {
         setFilterDoc(doctors.filter((doctor) => doctor.speciality === speciality));
      } else {
         setFilterDoc(doctors);
      }
      setLoading(false);
   };

   useEffect(() => {
      applyFilter();
   }, [doctors, speciality]);
   return (
      <div className="flex flex-1 flex-col">
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
                  className={`w-full sm:w-auto pl-3 pr-3 sm:pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General physician' ? 'bg-indigo-100 text-black' : ''}`}
               >
                  General physician
               </p>
               <p
                  onClick={() =>
                     speciality === 'Gynecologist' ? navigate(`/doctors`) : navigate(`/doctors/Gynecologist`)
                  }
                  className={`w-full sm:w-auto pl-3 pr-3 sm:pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? 'bg-indigo-100 text-black' : ''}`}
               >
                  Gynecologist
               </p>
               <p
                  onClick={() =>
                     speciality === 'Dermatologist' ? navigate(`/doctors`) : navigate(`/doctors/Dermatologist`)
                  }
                  className={`w-full sm:w-auto pl-3 pr-3 sm:pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? 'bg-indigo-100 text-black' : ''}`}
               >
                  Dermatologist
               </p>
               <p
                  onClick={() =>
                     speciality === 'Pediatricians' ? navigate(`/doctors`) : navigate(`/doctors/Pediatricians`)
                  }
                  className={`w-full sm:w-auto pl-3 pr-3 sm:pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatricians' ? 'bg-indigo-100 text-black' : ''}`}
               >
                  Pediatricians
               </p>
               <p
                  onClick={() =>
                     speciality === 'Neurologist' ? navigate(`/doctors`) : navigate(`/doctors/Neurologist`)
                  }
                  className={`w-full sm:w-auto pl-3 pr-3 sm:pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? 'bg-indigo-100 text-black' : ''}`}
               >
                  Neurologist
               </p>
               <p
                  onClick={() =>
                     speciality === 'Gastroenterologist'
                        ? navigate(`/doctors`)
                        : navigate(`/doctors/Gastroenterologist`)
                  }
                  className={`w-full sm:w-auto pl-3 pr-3 sm:pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? 'bg-indigo-100 text-black' : ''}`}
               >
                  Gastroenterologist
               </p>
            </div>
            {loading ? (
               <div className="flex justify-center items-center w-full min-h-[72px] mt-[9.375rem] sm:mt-0 px-8 text-center font-semibold tracking-wide">
                  Loading doctors...
               </div>
            ) : filterDoc.length > 0 ? (
               <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
                  {filterDoc
                     .sort((a, b) => (a.name > b.name ? 1 : -1))
                     .map((doctor, index) => (
                        <div
                           key={index}
                           onClick={() => navigate(`/appointment/${doctor._id}`)}
                           className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                        >
                           <img className="bg-blue-50" src={doctor.image} alt="" />
                           <div className="p-4">
                              <div
                                 className={`flex items-center gap-2 text-sm text-center ${doctor.available ? 'text-green-500' : 'text-red-500'}`}
                              >
                                 <div
                                    className={`w-2 h-2 ${doctor.available ? 'bg-green-500' : 'bg-red-500'}  rounded-full`}
                                 />
                                 <p>{doctor.available ? 'Available' : 'Not Available'}</p>
                              </div>
                              <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
                              <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                           </div>
                        </div>
                     ))}
               </div>
            ) : (
               <div className="flex justify-center items-center w-full min-h-[72px] mt-[9.375rem] sm:mt-0 px-8 text-center font-semibold text-red-600 tracking-wide">
                  The doctor speciality provided in the URL does not exist.
               </div>
            )}
         </div>
      </div>
   );
};

export default Doctors;
