import { createContext, ReactNode, useState } from 'react';

type AdminContextType = {
   aToken: string | null;
   setAToken: React.Dispatch<React.SetStateAction<string | null>>;
   backendUrl: string;
};

export const AdminContext = createContext<AdminContextType>({ aToken: null, setAToken: () => {}, backendUrl: '' });

const AdminContextProvider = ({ children }: { children?: ReactNode | ReactNode[] }) => {
   const [aToken, setAToken] = useState<string | null>(
      localStorage.getItem('aToken') ? localStorage.getItem('aToken') : null
   );
   const backendUrl = import.meta.env.VITE_BACKEND_URL;

   return <AdminContext.Provider value={{ aToken, setAToken, backendUrl }}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
