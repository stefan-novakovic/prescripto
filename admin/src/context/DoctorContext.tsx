import { createContext, ReactNode } from 'react';

type DoctorContextType = {};

export const DoctorContext = createContext<DoctorContextType>({});

const DoctorContextProvider = ({ children }: { children?: ReactNode | ReactNode[] }) => {
   return <DoctorContext.Provider value={{}}>{children}</DoctorContext.Provider>;
};

export default DoctorContextProvider;
