import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';

const useAdminContext = () => {
   return useContext(AdminContext);
};

export default useAdminContext;
