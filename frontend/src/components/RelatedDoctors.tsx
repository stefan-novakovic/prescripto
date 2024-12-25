import { useEffect, useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import useAppContext from '../hooks/useAppContext';
import { Doctor } from '../context/AppContext';

type RelatedDoctorsProps = {
   docId: string | undefined;
   speciality: string;
};

const RelatedDoctors = ({ docId, speciality }: RelatedDoctorsProps) => {
   const [relDocs, setRelDocs] = useState<Doctor[]>([]);
   const { doctors } = useAppContext();
   const navigate: NavigateFunction = useNavigate();

   useEffect(() => {
      if (doctors.length > 0 && speciality) {
         const doctorsData = doctors.filter((doctor) => doctor.speciality === speciality && doctor._id !== docId);
         setRelDocs(doctorsData);
      }
   }, [doctors, speciality, docId]);
   return (
      <section className="flex flex-col items-center gap-4 mt-20 text-gray-900 md:mx-10">
         <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
         <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list of trusted doctors.</p>
         {relDocs.length > 0 && (
            <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
               {relDocs
                  .sort((a, b) => (a.experience.split(' ')[0] > b.experience.split(' ')[0] ? -1 : 1))
                  .slice(0, 5)
                  .map((doctor, index) => (
                     <div
                        key={index}
                        onClick={() => {
                           navigate(`/appointment/${doctor._id}`);
                           scrollTo(0, 0);
                        }}
                        style={!doctor.available ? { opacity: 0.65 } : { opacity: 1 }}
                        className="min-h-[300px] border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                     >
                        <div className="bg-blue-50 w-full aspect-square flex justify-center items-end">
                           <img src={doctor.image} alt="" loading="lazy" />
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
         <button
            onClick={() => {
               navigate('/doctors');
               scrollTo(0, 0);
            }}
            className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-slate-200 transition-all duration-300"
         >
            More
         </button>
      </section>
   );
};
export default RelatedDoctors;
