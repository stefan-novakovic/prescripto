import { useState, FormEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAdminContext from '../hooks/useAdminContext';
import useDoctorContext from '../hooks/useDoctorContext';

const Login = () => {
   const [state, setState] = useState<string>('Admin');
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');

   const { setAToken, backendUrlAdmin } = useAdminContext();
   const { setDToken, backendUrlDoctor } = useDoctorContext();

   const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
         if (state === 'Admin') {
            const { data } = await axios.post(backendUrlAdmin + '/api/admin/login', { email, password });
            if (data.success) {
               localStorage.setItem('aToken', data.token);
               setAToken(data.token);
            } else {
               toast.error(data.message);
            }
         } else {
            const { data } = await axios.post(backendUrlDoctor + '/api/doctor/login', { email, password });
            if (data.success) {
               localStorage.setItem('dToken', data.token);
               setDToken(data.token);
            } else {
               toast.error(data.message);
            }
         }
      } catch (error) {}
   };

   return (
      <form onSubmit={onSubmitHandler} className="min-h-[95vh] flex items-center">
         <div className="flex flex-col gap-3 m-auto my-2 items-start p-8 min-w-[310px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
            <p className="text-2xl font-semibold m-auto">
               <span className="text-primary">{state}</span> Login
            </p>
            <div className="w-full">
               <label className="block" htmlFor="email">
                  Email
               </label>
               <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-[#DADADA] rounded w-full p-2 mt-1"
                  type="email"
                  name="email"
                  id="email"
                  required
               />
            </div>
            <div className="w-full">
               <label className="block" htmlFor="password">
                  Password
               </label>
               <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-[#DADADA] rounded w-full p-2 mt-1"
                  type="password"
                  name="password"
                  id="password"
                  required
               />
            </div>
            <button className="bg-primary text-white w-full py-2 rounded-md text-base">Login</button>
            {state === 'Admin' ? (
               <p>
                  Doctor Login?{' '}
                  <span className="text-primary underline cursor-pointer" onClick={() => setState('Doctor')}>
                     Click Here
                  </span>
               </p>
            ) : (
               <p>
                  Admin Login?{' '}
                  <span className="text-primary underline cursor-pointer" onClick={() => setState('Admin')}>
                     Click Here
                  </span>
               </p>
            )}
         </div>
      </form>
   );
};
export default Login;
