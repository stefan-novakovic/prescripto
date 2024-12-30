import { useNavigate, NavigateFunction } from 'react-router-dom';
import { assets } from '../assets/assets';
import useAppContext from '../hooks/useAppContext';
import { toast, Zoom } from 'react-toastify';

const Banner = () => {
   const navigate: NavigateFunction = useNavigate();

   const { token } = useAppContext();

   return (
      <div className="flex bg-primary rounded-lg px-12 sm:px-20">
         {/* ----- Left side ----- */}
         <div className="flex flex-col items-center md:items-start flex-1 py-16 xl:py-[116px] 2xl:py-[120px]">
            <div className="text-center md:text-start text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
               <p>Book Appointment</p>
               <p className="sm:mt-2">With 100+ Trusted Doctors</p>
            </div>
            <button
               onClick={() => {
                  !token
                     ? (navigate('/login'),
                       scrollTo({
                          top: 0,
                          left: 0,
                          behavior: 'instant'
                       }))
                     : (scrollTo(0, 0),
                       toast.info('You must log out first', {
                          position: 'bottom-right',
                          style: { position: 'relative' },
                          autoClose: 3000,
                          transition: Zoom
                       }));
               }}
               className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
            >
               Create account
            </button>
         </div>

         {/* ----- Right side ----- */}
         <div className="hidden md:block md:w-1/2 relative ml-12">
            <img
               className="absolute -bottom-0 -right-4 lg:right-0 min-w-[270px] xl:max-w-md"
               src={assets.appointment_img}
               alt=""
               loading="lazy"
            />
         </div>
      </div>
   );
};
export default Banner;
