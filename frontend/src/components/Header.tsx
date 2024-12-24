import { assets } from '../assets/assets';

const Header = () => {
   return (
      <header className="flex flex-col lg:flex-row flex-wrap w-full mx-auto max-w-[650px] lg:mx-0 lg:max-w-none bg-primary rounded-lg px-6">
         {/* ----- Left side ----- */}
         <div className="lg:w-1/2 flex flex-col items-center justify-center gap-4 py-10 px-4">
            <p className="text-center lg:text-start text-3xl md:text-4xl xl:text-5xl text-white font-semibold leading-tight">
               Book Appointment <br /> With Trusted Doctors
            </p>
            <div className="flex flex-col lg:flex-row items-center gap-3 text-center lg:text-start text-white text-sm font-light">
               <div className="w-28 h-[48.23px]">
                  <img className="w-28" src={assets.group_profiles} alt="" />
               </div>
               <p>
                  Simply browse through our{' '}
                  <span className="md:whitespace-nowrap">extensive list of trusted doctors,</span>
                  <br className="hidden sm:block" /> schedule your appointment{' '}
                  <span className="whitespace-nowrap">hassle-free.</span>
               </p>
            </div>
            <a
               href="#speciality"
               className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto lg:m-0 hover:scale-105 transition-all duration-300"
            >
               Book appointment
               <div className="w-3 h-[9px]">
                  <img className="w-3" src={assets.arrow_icon} alt="" />
               </div>
            </a>
         </div>

         {/* ----- Right side ----- */}
         <div className="lg:w-1/2 pt-0 lg:pt-8 w-full aspect-[734/596] flex justify-center items-end">
            <div className="mx-auto w-full aspect-[734/596] max-w-[550px] lg:max-w-[734px]">
               <img
                  className="w-full mx-auto relative bottom-0 max-w-[550px] lg:max-w-[734px]"
                  src={assets.header_img}
                  alt=""
               />
            </div>
         </div>
      </header>
   );
};
export default Header;
