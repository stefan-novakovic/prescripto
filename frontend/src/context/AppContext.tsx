import { createContext, ReactNode } from 'react';
import { doctors, Doctor } from '../assets/assets';

type AppContextType = {
   doctors: Doctor[];
};

export const AppContext = createContext<AppContextType>({ doctors: [] });

const AppContextProvider = ({ children }: { children?: ReactNode | ReactNode[] }) => {
   return <AppContext.Provider value={{ doctors }}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
