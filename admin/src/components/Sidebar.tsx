import { NavLink } from 'react-router-dom';
import useAdminContext from '../hooks/useAdminContext';
import useDoctorContext from '../hooks/useDoctorContext';
import { assets } from '../assets/assets';

const Sidebar = () => {
   const { aToken } = useAdminContext();
   const { dToken } = useDoctorContext();
   return (
      <div className="min-h-[calc(100vh-61px)] sm:min-h-[calc(100vh-62.86px)] bg-white border-r">
         {aToken && (
            <ul className="text-[#515151] mt-5">
               <NavLink
                  className={({ isActive }) =>
                     `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                        isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                     }`
                  }
                  to="/admin-dashboard"
               >
                  <img src={assets.home_icon} alt="" />
                  <p>Dashboard</p>
               </NavLink>
               <NavLink
                  className={({ isActive }) =>
                     `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                        isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                     }`
                  }
                  to="/all-appointments"
               >
                  <img src={assets.appointment_icon} alt="" />
                  <p>Appointments</p>
               </NavLink>
               <NavLink
                  className={({ isActive }) =>
                     `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                        isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                     }`
                  }
                  to="/add-doctor"
               >
                  <img src={assets.add_icon} alt="" />
                  <p>Add Doctor</p>
               </NavLink>
               <NavLink
                  className={({ isActive }) =>
                     `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                        isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                     }`
                  }
                  to="doctor-list"
               >
                  <img src={assets.people_icon} alt="" />
                  <p>Doctors List</p>
               </NavLink>
            </ul>
         )}

         {dToken && (
            <ul className="text-[#515151] mt-5">
               <NavLink
                  className={({ isActive }) =>
                     `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                        isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                     }`
                  }
                  to="/doctor-dashboard"
               >
                  <img src={assets.home_icon} alt="" />
                  <p>Dashboard</p>
               </NavLink>
               <NavLink
                  className={({ isActive }) =>
                     `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                        isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                     }`
                  }
                  to="/doctor-appointments"
               >
                  <img src={assets.appointment_icon} alt="" />
                  <p>Appointments</p>
               </NavLink>
               <NavLink
                  className={({ isActive }) =>
                     `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                        isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                     }`
                  }
                  to="doctor-profile"
               >
                  <img src={assets.people_icon} alt="" />
                  <p>Profile</p>
               </NavLink>
            </ul>
         )}
      </div>
   );
};
export default Sidebar;
