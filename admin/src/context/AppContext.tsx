import { createContext, ReactNode } from 'react';

type AppContextType = {
   currencySymbol: string;
   calculateAge: (dob: string) => string;
   slotDateFormat: (slotDate: string) => string;
};

export const AppContext = createContext<AppContextType>({
   currencySymbol: '',
   calculateAge: () => '',
   slotDateFormat: () => ''
});

const AppContextProvider = ({ children }: { children?: ReactNode | ReactNode[] }) => {
   const currencySymbol: string = '$';

   const calculateAge = (dob: string) => {
      const today: Date = new Date();
      const birthDate: Date = new Date(dob);

      let age: string = (today.getFullYear() - birthDate.getFullYear()).toString();
      return age;
   };

   // const months: string[] = [
   //    'January',
   //    'February',
   //    'March',
   //    'April',
   //    'May',
   //    'June',
   //    'July',
   //    'August',
   //    'September',
   //    'October',
   //    'November',
   //    'December'
   // ];

   const slotDateFormat = (slotDate: string) => {
      const dateArray = slotDate.split('_');
      // Months shown in format 1, January, 2024
      // return dateArray[0] + ', ' + months[Number(dateArray[1]) - 1] + ', ' + dateArray[2];

      // Months shown in 1.1.2024
      return dateArray.join('.');
   };

   return (
      <AppContext.Provider value={{ currencySymbol, calculateAge, slotDateFormat }}>{children}</AppContext.Provider>
   );
};

export default AppContextProvider;
