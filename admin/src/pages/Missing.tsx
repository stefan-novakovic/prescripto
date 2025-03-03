import { useNavigate, NavigateFunction } from 'react-router-dom';
import { LuSearchX } from 'react-icons/lu';
import useAdminContext from '../hooks/useAdminContext';
import useDoctorContext from '../hooks/useDoctorContext';
import { useEffect } from 'react';

const Missing = () => {
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
               <h1 className="font-semibold text-lg">Page Not Found</h1>
               <LuSearchX size={19} />
            </div>
            <p className="text-zinc-600">Oops, the page you are looking for does not exist.</p>
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
export default Missing;
