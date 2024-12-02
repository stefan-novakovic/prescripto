import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import useAdminContext from './hooks/useAdminContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import useDoctorContext from './hooks/useDoctorContext';

const App = () => {
   const { aToken } = useAdminContext();
   const { dToken } = useDoctorContext();

   return aToken || dToken ? (
      <div className="bg-[#F8F9FD]">
         <ToastContainer />
         <Navbar />
         <div className="flex items-start">
            <Sidebar />

            <Routes>
               <Route path="/" index />

               {/* Admin Route */}
               <Route path="/admin-dashboard" element={<Dashboard />} />
               <Route path="/all-appointments" element={<AllAppointments />} />
               <Route path="/add-doctor" element={<AddDoctor />} />
               <Route path="/doctor-list" element={<DoctorsList />} />

               {/* Doctor Route */}
               <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
               <Route path="/doctor-appointments" element={<DoctorAppointments />} />
               <Route path="/doctor-profile" element={<DoctorProfile />} />
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
