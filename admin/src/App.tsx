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
import LoggedIn from './components/LoggedIn';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './pages/Unauthorized';
import Missing from './pages/Missing';

const App = () => {
   const { aToken } = useAdminContext();
   const { dToken } = useDoctorContext();

   return (
      <div className="bg-[#F8F9FD] min-h-screen">
         {(aToken || dToken) && <Navbar />}
         <div className="flex flex-col sm:flex-row items-start">
            {(aToken || dToken) && <Sidebar />}

            <Routes>
               {/* Default path when admin/doctor logs in (blank page)*/}
               {(aToken || dToken) && <Route index path="/" element={<></>} />}

               <Route element={<LoggedIn />}>
                  <Route path="/login" element={<Login />} />
               </Route>

               <Route element={<RequireAuth role={'Admin'} />}>
                  {/* Admin Routes */}
                  <Route path="/admin-dashboard" element={<Dashboard />} />
                  <Route path="/all-appointments" element={<AllAppointments />} />
                  <Route path="/add-doctor" element={<AddDoctor />} />
                  <Route path="/doctor-list" element={<DoctorsList />} />
               </Route>

               <Route element={<RequireAuth role={'Doctor'} />}>
                  {/* Doctor Routes */}
                  <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                  <Route path="/doctor-appointments" element={<DoctorAppointments />} />
                  <Route path="/doctor-profile" element={<DoctorProfile />} />
               </Route>

               <Route path="/unauthorized" element={<Unauthorized />} />
               <Route path="/*" element={<Missing />} />
            </Routes>
         </div>

         <ToastContainer />
      </div>
   );
};
export default App;
