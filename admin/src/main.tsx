import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import AdminContextProvider from './context/AdminContext.tsx';
import DoctorContextProvider from './context/DoctorContext.tsx';
import AppContextProvider from './context/AppContext.tsx';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <Router>
         <AdminContextProvider>
            <DoctorContextProvider>
               <AppContextProvider>
                  <App />
               </AppContextProvider>
            </DoctorContextProvider>
         </AdminContextProvider>
      </Router>
   </StrictMode>
);
