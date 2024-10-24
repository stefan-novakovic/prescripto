import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAdminContext from './hooks/useAdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';

const App = () => {
   const { aToken } = useAdminContext();

   return aToken ? (
      <div className="bg-[#F8F9FD]">
         <ToastContainer />
         <Navbar />
         <div className="flex items-start">
            <Sidebar />

            <Routes>
               <Route path="/" index />
               <Route path="/admin-dashboard" element={<Dashboard />} />
               <Route path="/all-appointments" element={<AllAppointments />} />
               <Route path="/add-doctor" element={<AddDoctor />} />
               <Route path="/doctor-list" element={<DoctorsList />} />
            </Routes>
         </div>
      </div>
   ) : (
      <>
         <Login />
         <ToastContainer />
      </>
   );
};
export default App;
