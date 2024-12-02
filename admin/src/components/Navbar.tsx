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
            <img onClick={() => navigate('/')} className="w-36 sm:w-40 cursor-pointer" src={assets.admin_logo} alt="" />
            <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
               {aToken ? 'Admin' : 'Doctor'}
            </p>
         </div>
         <button onClick={logout} className="bg-primary text-white text-sm px-10 py-2 rounded-full">
            Logout
         </button>
      </div>
   );
};
export default Navbar;
