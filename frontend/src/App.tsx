import { Route, Routes } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import Missing from './pages/Missing';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
   return (
      <div className="flex flex-col min-h-[100vh] mx-4 sm:mx-[10%]">
         <ToastContainer
            position="top-right"
            transition={Bounce}
            autoClose={4000}
            pauseOnFocusLoss={false}
            stacked={true}
         />
         <Navbar />

         <Routes>
            <Route path="/">
               <Route index element={<Home />} />
               <Route path="doctors" element={<Doctors />} />
               <Route path="doctors/:speciality" element={<Doctors />} />
               <Route path="appointment/:docId" element={<Appointment />} />
               <Route path="about" element={<About />} />
               <Route path="contact" element={<Contact />} />
               <Route path="login" element={<Login />} />
               <Route path="my-profile" element={<MyProfile />} />
               <Route path="my-appointments" element={<MyAppointments />} />
               <Route path="*" element={<Missing pod={'page'} />} />
            </Route>
         </Routes>

         <Footer />
      </div>
   );
};

export default App;
