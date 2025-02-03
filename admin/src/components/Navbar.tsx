import { useNavigate, NavigateFunction } from 'react-router-dom';
import { assets } from '../assets/assets';
import useAdminContext from '../hooks/useAdminContext';
import useDoctorContext from '../hooks/useDoctorContext';

const Navbar = () => {
   const { aToken, setAToken } = useAdminContext();
   const { dToken, setDToken } = useDoctorContext();

   const navigate: NavigateFunction = useNavigate();

   const logout = () => {
      navigate('/');

      aToken && setAToken(null);
      aToken && localStorage.removeItem('aToken');

      dToken && setDToken(null);
      dToken && localStorage.removeItem('dToken');
   };

   return (
      <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
         <div className="flex items-center gap-2 text-xs">
            <div className="w-36 h-[34.078px] sm:w-[148px] sm:h-[37.859px]">
               <img
                  onClick={() => navigate('/')}
                  className="w-36 sm:w-40 cursor-pointer"
                  src={assets.admin_logo}
                  alt=""
               />
            </div>

            <p className="hidden c375:block border min-h-[22px] min-w-[60px] text-center px-2.5 py-0.5 mr-2 rounded-full border-gray-500 text-gray-600">
               {aToken ? 'Admin' : 'Doctor'}
            </p>
         </div>
         <button onClick={logout} className="bg-primary text-white text-sm px-9 sm:px-10 py-2 rounded-full">
            Logout
         </button>
      </div>
   );
};
export default Navbar;
