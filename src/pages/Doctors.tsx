import { useEffect, useState } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import useAppContext from '../hooks/useAppContext';
import { Doctor } from '../assets/assets';

const Doctors = () => {
   const { speciality } = useParams<string>();
   const [filterDoc, setFilterDoc] = useState<Doctor[]>([]);
   const { doctors } = useAppContext();
   const navigate: NavigateFunction = useNavigate();

   const applyFilter = () => {
      if (speciality) {
         setFilterDoc(doctors.filter((doctor) => doctor.speciality === speciality));
      } else {
         setFilterDoc(doctors);
      }
   };

   useEffect(() => {
      applyFilter();
   }, [doctors, speciality]);
   return (
      <div className="flex flex-1 flex-col">
         <p className="text-gray-600">Browse through the doctors specialist.</p>
         <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
            <div className="flex flex-col gap-4 text-sm text-gray-600">
               <p
                  onClick={() =>
                     speciality === 'General physician' ? navigate(`/doctors`) : navigate(`/doctors/General physician`)
                  }
                  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General physician' ? 'bg-indigo-100 text-black' : ''}`}
               >
                  General physician
               </p>
               <p
                  onClick={() =>
                     speciality === 'Gynecologist' ? navigate(`/doctors`) : navigate(`/doctors/Gynecologist`)
                  }
                  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? 'bg-indigo-100 text-black' : ''}`}
               >
                  Gynecologist
               </p>
               <p
                  onClick={() =>
                     speciality === 'Dermatologist' ? navigate(`/doctors`) : navigate(`/doctors/Dermatologist`)
                  }
                  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? 'bg-indigo-100 text-black' : ''}`}
               >
                  Dermatologist
               </p>
               <p
                  onClick={() =>
                     speciality === 'Pediatricians' ? navigate(`/doctors`) : navigate(`/doctors/Pediatricians`)
                  }
                  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatricians' ? 'bg-indigo-100 text-black' : ''}`}
               >
                  Pediatricians
               </p>
               <p
                  onClick={() =>
                     speciality === 'Neurologist' ? navigate(`/doctors`) : navigate(`/doctors/Neurologist`)
                  }
                  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? 'bg-indigo-100 text-black' : ''}`}
               >
                  Neurologist
               </p>
               <p
                  onClick={() =>
                     speciality === 'Gastroenterologist'
                        ? navigate(`/doctors`)
                        : navigate(`/doctors/Gastroenterologist`)
                  }
                  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? 'bg-indigo-100 text-black' : ''}`}
               >
                  Gastroenterologist
               </p>
            </div>
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
                           <div className="flex items-center gap-2 text-sm text-center text-green-500">
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              <p>Available</p>
                           </div>
                           <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
                           <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                        </div>
                     </div>
                  ))}
            </div>
         </div>
      </div>
   );
};
export default Doctors;
