import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAdminContext from '../hooks/useAdminContext';
import useDoctorContext from '../hooks/useDoctorContext';

const LoggedIn = () => {
   const { aToken } = useAdminContext();
   const { dToken } = useDoctorContext();
   const location = useLocation();
   const from = location.state?.from?.pathname || '/';

   return aToken || dToken ? <Navigate to={from} state={{ from: location }} replace /> : <Outlet />;
};

export default LoggedIn;
