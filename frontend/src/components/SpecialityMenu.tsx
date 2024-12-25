import { Link } from 'react-router-dom';
import { specialityData } from '../assets/assets';

const SpecialityMenu = () => {
   return (
      <section className="flex flex-col items-center gap-4 py-16 text-gray-800" id="speciality">
         <h1 className="text-3xl font-medium">Find by Speciality</h1>
         <p className="sm:w-2/3 lg:w-2/5 text-center text-sm">
            Simply browse through our extensive list of trusted doctors, schedule your appointment{' '}
            <span className="whitespace-nowrap">hassle-free.</span>
         </p>
         <div
            id="specialityMenu"
            className="flex justify-start c588:flex-wrap c588:justify-center gap-4 pt-5 w-full overflow-x-scroll"
         >
            {specialityData.map((item, index) => (
               <Link
                  onClick={() => scrollTo(0, 0)}
                  className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] no-hover:translate-y-0 transition-all duration-500"
                  key={index}
                  to={`/doctors/${item.speciality}`}
               >
                  <div className="w-16 h-16 sm:w-24 sm:h-24 mb-2">
                     <img className="w-16 sm:w-24" src={item.image} alt="" />
                  </div>
                  <p>{item.speciality}</p>
               </Link>
            ))}
         </div>
      </section>
   );
};
export default SpecialityMenu;
