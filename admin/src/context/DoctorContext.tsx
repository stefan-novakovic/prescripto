import { createContext, ReactNode, useState } from 'react';

type DoctorContextType = {
   backendUrlDoctor: string;
   dToken: string | null;
   setDToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const DoctorContext = createContext<DoctorContextType>({
   backendUrlDoctor: '',
   dToken: null,
   setDToken: () => {}
});

const DoctorContextProvider = ({ children }: { children?: ReactNode | ReactNode[] }) => {
   const backendUrlDoctor: string = import.meta.env.VITE_BACKEND_URL;
   const [dToken, setDToken] = useState<string | null>(
      localStorage.getItem('dToken') ? localStorage.getItem('dToken') : null
   );
   return <DoctorContext.Provider value={{ backendUrlDoctor, dToken, setDToken }}>{children}</DoctorContext.Provider>;
};

export default DoctorContextProvider;
