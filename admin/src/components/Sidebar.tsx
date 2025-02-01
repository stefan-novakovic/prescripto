import { NavLink } from 'react-router-dom';
import useAdminContext from '../hooks/useAdminContext';
import useDoctorContext from '../hooks/useDoctorContext';
import { assets } from '../assets/assets';

const Sidebar = () => {
   const { aToken } = useAdminContext();
   const { dToken } = useDoctorContext();
   return (
      <div className="w-full sm:max-w-44 lg:min-w-64 sm:min-h-[calc(100vh-62.85px)] bg-white border-b sm:border-r">
         {aToken && (
            <ul className="flex justify-around sm:justify-normal sm:flex-col text-[#515151] sm:mt-5">
               <NavLink
                  className={({ isActive }) =>
                     `flex flex-1 justify-center items-center sm:justify-start gap-2 lg:gap-3 py-3 sm:py-3.5 px-4 lg:px-9 cursor-pointer border-b-[3px] sm:border-b-0 border-r-0 sm:border-r-4 ${
                        isActive ? 'bg-[#F2F3FF] border-primary' : 'border-transparent'
                     }`
                  }
                  to="/admin-dashboard"
               >
                  <div className="w-5 aspect-square sm:w-6">
                     <img className="block w-5 sm:w-6 h-auto" src={assets.home_icon} alt="" />
                  </div>
                  <p className="hidden sm:block lg:text-[17px] leading-[26px]">Dashboard</p>
               </NavLink>
               <NavLink
                  className={({ isActive }) =>
                     `flex flex-1 justify-center items-center sm:justify-start gap-2 lg:gap-3 py-3 sm:py-3.5 px-4 lg:px-9 cursor-pointer border-b-[3px] sm:border-b-0 border-r-0 sm:border-r-4 ${
                        isActive ? 'bg-[#F2F3FF] border-primary' : 'border-transparent'
                     }`
                  }
                  to="/all-appointments"
               >
                  <div className="w-5 aspect-square sm:w-6">
                     <img className="block w-5 sm:w-6 h-auto" src={assets.appointment_icon} alt="" />
                  </div>
                  <p className="hidden sm:block lg:text-[17px] leading-[26px]">Appointments</p>
               </NavLink>
               <NavLink
                  className={({ isActive }) =>
                     `flex flex-1 justify-center items-center sm:justify-start gap-2 lg:gap-3 py-3 sm:py-3.5 px-4 lg:px-9 cursor-pointer border-b-[3px] sm:border-b-0 border-r-0 sm:border-r-4 ${
                        isActive ? 'bg-[#F2F3FF] border-primary' : 'border-transparent'
                     }`
                  }
                  to="/add-doctor"
               >
                  <div className="w-5 aspect-square sm:w-6">
                     <img className="block w-5 sm:w-6 h-auto" src={assets.add_icon} alt="" />
                  </div>
                  <p className="hidden sm:block lg:text-[17px] leading-[26px]">Add Doctor</p>
               </NavLink>
               <NavLink
                  className={({ isActive }) =>
                     `flex flex-1 justify-center items-center sm:justify-start gap-2 lg:gap-3 py-3 sm:py-3.5 px-4 lg:px-9 cursor-pointer border-b-[3px] sm:border-b-0 border-r-0 sm:border-r-4 ${
                        isActive ? 'bg-[#F2F3FF] border-primary' : 'border-transparent'
                     }`
                  }
                  to="doctor-list"
               >
                  <div className="w-5 aspect-square sm:w-6">
                     <img className="block w-5 sm:w-6 h-auto" src={assets.people_icon} alt="" />
                  </div>
                  <p className="hidden sm:block lg:text-[17px] leading-[26px]">Doctors List</p>
               </NavLink>
            </ul>
         )}

         {dToken && (
            <ul className="flex justify-around sm:justify-normal sm:flex-col text-[#515151] sm:mt-5">
               <NavLink
                  className={({ isActive }) =>
                     `flex flex-1 justify-center items-center sm:justify-start gap-2 lg:gap-3 py-3 sm:py-3.5 px-4 lg:px-9 cursor-pointer border-b-[3px] sm:border-b-0 border-r-0 sm:border-r-4 ${
                        isActive ? 'bg-[#F2F3FF] border-primary' : 'border-transparent'
                     }`
                  }
                  to="/doctor-dashboard"
               >
                  <div className="w-5 aspect-square sm:w-6">
                     <img className="block w-5 sm:w-6 h-auto" src={assets.home_icon} alt="" />
                  </div>
                  <p className="hidden sm:block lg:text-[17px] leading-[26px]">Dashboard</p>
               </NavLink>
               <NavLink
                  className={({ isActive }) =>
                     `flex flex-1 justify-center items-center sm:justify-start gap-2 lg:gap-3 py-3 sm:py-3.5 px-4 lg:px-9 cursor-pointer border-b-[3px] sm:border-b-0 border-r-0 sm:border-r-4 ${
                        isActive ? 'bg-[#F2F3FF] border-primary' : 'border-transparent'
                     }`
                  }
                  to="/doctor-appointments"
               >
                  <div className="w-5 aspect-square sm:w-6">
                     <img className="block w-5 sm:w-6 h-auto" src={assets.appointment_icon} alt="" />
                  </div>
                  <p className="hidden sm:block lg:text-[17px] leading-[26px]">Appointments</p>
               </NavLink>
               <NavLink
                  className={({ isActive }) =>
                     `flex flex-1 justify-center items-center sm:justify-start gap-2 lg:gap-3 py-3 sm:py-3.5 px-4 lg:px-9 cursor-pointer border-b-[3px] sm:border-b-0 border-r-0 sm:border-r-4 ${
                        isActive ? 'bg-[#F2F3FF] border-primary' : 'border-transparent'
                     }`
                  }
                  to="doctor-profile"
               >
                  <div className="w-5 aspect-square sm:w-6">
                     <img className="block w-5 sm:w-6 h-auto" src={assets.people_icon} alt="" />
                  </div>
                  <p className="hidden sm:block lg:text-[17px] leading-[26px]">Profile</p>
               </NavLink>
            </ul>
         )}
      </div>
   );
};
export default Sidebar;
