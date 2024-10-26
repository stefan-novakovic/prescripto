import { createContext, ReactNode } from 'react';

type AppContextType = {};

export const AppContext = createContext<AppContextType>({});

const AppContextProvider = ({ children }: { children?: ReactNode | ReactNode[] }) => {
   return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
