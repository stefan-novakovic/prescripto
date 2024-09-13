import { useNavigate, NavigateFunction } from 'react-router-dom';
import useAppContext from '../hooks/useAppContext';

const TopDoctors = () => {
   const navigate: NavigateFunction = useNavigate();
   const { doctors } = useAppContext();

   return (
      <section className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
         <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
         <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list of trusted doctors.</p>
         <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
            {doctors
               .sort((a, b) => (a.experience.split(' ')[0] > b.experience.split(' ')[0] ? -1 : 1))
               .slice(0, 10)
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
         <button
            onClick={() => {
               navigate('/doctors');
               scrollTo(0, 0);
            }}
            className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
         >
            More
         </button>
      </section>
   );
};
export default TopDoctors;
