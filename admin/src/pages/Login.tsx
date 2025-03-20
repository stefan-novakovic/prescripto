import { FormEvent, useState } from 'react';
import axios from 'axios';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import useAdminContext from '../hooks/useAdminContext';
import useDoctorContext from '../hooks/useDoctorContext';

const Login = () => {
   const { aToken, setAToken, backendUrlAdmin } = useAdminContext();
   const { dToken, setDToken, backendUrlDoctor } = useDoctorContext();

   const [state, setState] = useState<string>(localStorage.getItem('login') || 'Admin');
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<{ show: boolean; value: string }>({
      show: false,
      value: ''
   });
   const [submitting, setSubmitting] = useState<boolean>(false);

   const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (submitting) return;

      setSubmitting(true);

      try {
         if (state === 'Admin') {
            const { data } = await axios.post(backendUrlAdmin + '/api/admin/login', {
               email,
               password: password.value
            });
            if (data.success) {
               localStorage.setItem('aToken', data.token);
               setAToken(data.token);
            } else {
               toast.error(data.message);
            }
         } else {
            const { data } = await axios.post(backendUrlDoctor + '/api/doctor/login', {
               email,
               password: password.value
            });
            if (data.success) {
               localStorage.setItem('dToken', data.token);
               setDToken(data.token);
            } else {
               toast.error(data.message);
            }
         }
      } catch (error) {
         if (error instanceof Error) {
            toast.error(error.message);
            console.log(error);
         } else {
            toast.error('An unknown error occurred');
            console.log('Unknown error:', error);
         }
      } finally {
         setSubmitting(false);
      }
   };

   const resetInputs = () => {
      setEmail('');
      setPassword({ value: '', show: false });
   };

   if (aToken) return null;
   if (dToken) return null;

   return (
      <section className="flex flex-1 justify-center w-full max-w-[304px] sm:max-w-96 ms mx-auto">
         <form
            className="w-full min-h-[calc(100vh-64px-64px)] my-16 flex items-center justify-center"
            onSubmit={onSubmitHandler}
         >
            <div className="w-full flex flex-col gap-3 items-start px-5 py-8 sm:p-8 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
               <p className="w-full text-2xl font-semibold text-center">
                  <span className="text-primary">{state}</span> Login
               </p>
               <div className="w-full">
                  <label className="block" htmlFor="email">
                     Email
                  </label>
                  <input
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="border border-[#DADADA] rounded w-full p-2 mt-1 outline-none"
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

                  <div className="relative">
                     <input
                        className="border border-[#DADADA] rounded w-full p-2 mt-1 outline-none"
                        type={password.show ? 'text' : 'password'}
                        name="password"
                        id="password"
                        value={password.value}
                        onChange={(e) => setPassword((prev) => ({ ...prev, value: e.target.value }))}
                        required
                     />
                     <button
                        type="button"
                        onClick={() => setPassword((prev) => ({ ...prev, show: !password.show }))}
                        className="absolute top-[50%] right-0 translate-x-[-14px] translate-y-[calc(-50%+2px)]"
                     >
                        {password.show ? (
                           <MdVisibility size={18} className="text-zinc-400" />
                        ) : (
                           <MdVisibilityOff size={18} className="text-zinc-400" />
                        )}
                     </button>
                  </div>
               </div>

               <button
                  type="submit"
                  className="bg-primary text-white w-full py-2 h-10 rounded-md text-base grid place-content-center active:bg-primary/90"
               >
                  {submitting ? <ClipLoader size={18} color="white" /> : 'Login'}
               </button>
               {state === 'Admin' ? (
                  <p>
                     Doctor Login?{' '}
                     <span
                        className="text-primary underline cursor-pointer"
                        onClick={() => {
                           setState('Doctor');
                           localStorage.setItem('login', 'Doctor');
                           resetInputs();
                        }}
                     >
                        Click Here
                     </span>
                  </p>
               ) : (
                  <p>
                     Admin Login?{' '}
                     <span
                        className="text-primary underline cursor-pointer"
                        onClick={() => {
                           setState('Admin');
                           localStorage.setItem('login', 'Admin');
                           resetInputs();
                        }}
                     >
                        Click Here
                     </span>
                  </p>
               )}
            </div>
         </form>
      </section>
   );
};
export default Login;
