import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAdminContext from '../hooks/useAdminContext';
import useDoctorContext from '../hooks/useDoctorContext';

const RequireAuth = ({ role }: { role: string }) => {
   const { aToken } = useAdminContext();
   const { dToken } = useDoctorContext();
   const location = useLocation();

   const loggedIn = Boolean(aToken || dToken);
   const loggedAs = dToken ? 'Doctor' : aToken ? 'Admin' : null;

   return loggedAs === role ? (
      <Outlet />
   ) : loggedIn ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
   ) : (
      <Navigate to="/login" state={{ from: location }} replace />
   );
};

export default RequireAuth;
