import { NavLink } from 'react-router-dom';
import useAdminContext from '../hooks/useAdminContext';
import useDoctorContext from '../hooks/useDoctorContext';
import { assets } from '../assets/assets';

const Sidebar = () => {
   const { aToken } = useAdminContext();
   const { dToken } = useDoctorContext();
   return (
      <div className="min-w-14 md:min-w-44 lg:min-w-72 min-h-[calc(100vh-61px)] sm:min-h-[calc(100vh-62.86px)] bg-white border-r">
         {aToken && (
            <ul className="text-[#515151] mt-5">
               <NavLink
                  className={({ isActive }) =>
                     `flex items-center min-h-[52px] gap-2 lg:gap-3 py-3.5 px-3 md:px-4 lg:px-9 cursor-pointer ${
                        isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                     }`
                  }
                  to="/admin-dashboard"
               >
                  <img className="block w-6 h-auto" src={assets.home_icon} alt="" />
                  <p className="hidden md:block">Dashboard</p>
               </NavLink>
               <NavLink
                  className={({ isActive }) =>
                     `flex items-center min-h-[52px] gap-2 lg:gap-3 py-3.5 px-3 md:px-4 lg:px-9 cursor-pointer ${
                        isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                     }`
                  }
                  to="/all-appointments"
               >
                  <img className="block w-6 h-auto" src={assets.appointment_icon} alt="" />
                  <p className="hidden md:block">Appointments</p>
               </NavLink>
               <NavLink
                  className={({ isActive }) =>
                     `flex items-center min-h-[52px] gap-2 lg:gap-3 py-3.5 px-3 md:px-4 lg:px-9 cursor-pointer ${
                        isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                     }`
                  }
                  to="/add-doctor"
               >
                  <img className="block w-6 h-auto" src={assets.add_icon} alt="" />
                  <p className="hidden md:block">Add Doctor</p>
               </NavLink>
               <NavLink
                  className={({ isActive }) =>
                     `flex items-center min-h-[52px] gap-2 lg:gap-3 py-3.5 px-3 md:px-4 lg:px-9 cursor-pointer ${
                        isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                     }`
                  }
                  to="doctor-list"
               >
                  <img className="block w-6 h-auto" src={assets.people_icon} alt="" />
                  <p className="hidden md:block">Doctors List</p>
               </NavLink>
            </ul>
         )}

         {dToken && (
            <ul className="text-[#515151] mt-5">
               <NavLink
                  className={({ isActive }) =>
                     `flex items-center min-h-[52px] gap-2 lg:gap-3 py-3.5 px-3 md:px-4 lg:px-9 cursor-pointer ${
                        isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                     }`
                  }
                  to="/doctor-dashboard"
               >
                  <img className="block w-6 h-auto" src={assets.home_icon} alt="" />
                  <p className="hidden md:block">Dashboard</p>
               </NavLink>
               <NavLink
                  className={({ isActive }) =>
                     `flex items-center min-h-[52px] gap-2 lg:gap-3 py-3.5 px-3 md:px-4 lg:px-9 cursor-pointer ${
                        isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                     }`
                  }
                  to="/doctor-appointments"
               >
                  <img className="block w-6 h-auto" src={assets.appointment_icon} alt="" />
                  <p className="hidden md:block">Appointments</p>
               </NavLink>
               <NavLink
                  className={({ isActive }) =>
                     `flex items-center min-h-[52px] gap-2 lg:gap-3 py-3.5 px-3 md:px-4 lg:px-9 cursor-pointer ${
                        isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                     }`
                  }
                  to="doctor-profile"
               >
                  <img className="block w-6 h-auto" src={assets.people_icon} alt="" />
                  <p className="hidden md:block">Profile</p>
               </NavLink>
            </ul>
         )}
      </div>
   );
};
export default Sidebar;
