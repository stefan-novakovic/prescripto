import { Link } from 'react-router-dom';
import { specialityData } from '../assets/assets';

const SpecialityMenu = () => {
   return (
      <section className="flex flex-col items-center gap-4 py-16 text-gray-800" id="speciality">
         <h1 className="text-3xl font-medium">Find by Speciality</h1>
         <p className="sm:w-1/3 text-center text-sm">
            Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
         </p>
         <div
            id="specialityMenu"
            className="flex c578:justify-center c640:justify-start c825:justify-center gap-4 pt-5 w-full overflow-x-scroll"
         >
            {specialityData.map((item, index) => (
               <Link
                  onClick={() => scrollTo(0, 0)}
                  className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
                  key={index}
                  to={`/doctors/${item.speciality}`}
               >
                  <img className="w-16 sm:w-24 mb-2" src={item.image} alt="" />
                  <p>{item.speciality}</p>
               </Link>
            ))}
         </div>
      </section>
   );
};
export default SpecialityMenu;
