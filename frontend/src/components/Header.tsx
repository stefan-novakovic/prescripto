import { assets } from '../assets/assets';

const Header = () => {
   return (
      <header className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
         {/* ----- Left side ----- */}
         <div className="md:w-1/2 flex flex-col items-center md:items-start justify-center gap-4 py-10 m-auto md:py-[5vw] lg:py-[7vw] xl:py-[10vw] md:mb[-30px]">
            <p className="text-center md:text-start text-3xl lg:text-4xl xl:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
               Book Appointment <br /> With Trusted Doctors
            </p>
            <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-start text-white text-sm font-light">
               <img className="w-28" src={assets.group_profiles} alt="" />
               <p>
                  Simply browse through our extensive list of trusted doctors, <br className="hidden sm:block" />
                  schedule your appointment hassle-free.
               </p>
            </div>
            <a
               href="#speciality"
               className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
            >
               Book appointment <img className="w-3" src={assets.arrow_icon} alt="" />
            </a>
         </div>

         {/* ----- Right side ----- */}
         <div className="md:w-1/2 relative">
            <img
               className="w-full max-w-[1080px] md:absolute bottom-0 h-auto rounded-lg"
               src={assets.header_img}
               alt=""
            />
         </div>
      </header>
   );
};
export default Header;
