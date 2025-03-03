import { useNavigate, NavigateFunction } from 'react-router-dom';
import { ImBlocked } from 'react-icons/im';
import useAdminContext from '../hooks/useAdminContext';
import useDoctorContext from '../hooks/useDoctorContext';
import { useEffect } from 'react';

const Unauthorized = () => {
   const navigate: NavigateFunction = useNavigate();
   const { aToken } = useAdminContext();
   const { dToken } = useDoctorContext();

   useEffect(() => {
      if (!aToken && !dToken) {
         return navigate('/login');
      }
   }, [aToken, dToken]);

   return (
      (aToken || dToken) && (
         <section className="px-2.5 sm:px-5 py-4 w-full">
            <div className="flex items-center gap-[5px] mb-2">
               <h1 className="text-lg font-medium">Unauthorized Access</h1>
               <ImBlocked size={15} />
            </div>
            <p className="text-zinc-600">You do not have permission to access the requested page.</p>
            <p
               onClick={() => (aToken ? navigate('/admin-dashboard') : navigate('/doctor-dashboard'))}
               className="text-zinc-600 underline cursor-pointer w-fit"
            >
               Go to Dashboard
            </p>
         </section>
      )
   );
};
export default Unauthorized;
