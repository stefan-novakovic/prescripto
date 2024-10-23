import { createContext, ReactNode } from 'react';
import { doctors, Doctor } from '../assets/assets';

type AppContextType = {
   doctors: Doctor[];
   currencySymbol: string;
};

export const AppContext = createContext<AppContextType>({ doctors: [], currencySymbol: '' });

const AppContextProvider = ({ children }: { children?: ReactNode | ReactNode[] }) => {
   const currencySymbol: string = '$';
   return <AppContext.Provider value={{ doctors, currencySymbol }}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
