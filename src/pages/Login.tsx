import { FormEvent, useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

const Login = () => {
   const [state, setState] = useState<string>('Sign up');
   const [name, setName] = useState<string>('');
   const [password, setPassword] = useState({
      value: '',
      showPassword: false
   });
   const [email, setEmail] = useState<string>('');

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
   };

   const resetInputs = () => {
      setName('');
      setEmail('');
      setPassword({ value: '', showPassword: false });
   };
   return (
      <section className="flex flex-1 flex-col justify-center">
         <form className="flex items-center min-h-[80vh] mt-5 mb-10" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[288px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
               <p className="text-2xl font-semibold">{state === 'Sign up' ? 'Create Account' : 'Login'}</p>
               <p>Please {state === 'Sign up' ? 'sign up' : 'log in'} to book appointment</p>
               {state === 'Sign up' && (
                  <div className="w-full">
                     <label className="block" htmlFor="name">
                        Full Name
                     </label>
                     <input
                        className="border border-zinc-300 rounded w-full p-2 mt-1 outline-none"
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete="off"
                     />
                  </div>
               )}
               <div className="w-full">
                  <label className="block" htmlFor="email">
                     Email
                  </label>
                  <input
                     className="border border-zinc-300 rounded w-full p-2 mt-1 outline-none"
                     type="email"
                     name="email"
                     id="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                     autoComplete="off"
                  />
               </div>
               <div className="w-full">
                  <label className="block" htmlFor="password">
                     Password
                  </label>
                  <div className="relative">
                     <input
                        className="border border-zinc-300 rounded w-full p-2 pr-10 mt-1 outline-none"
                        type={password.showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        value={password.value}
                        onChange={(e) => setPassword((prev) => ({ ...prev, value: e.target.value }))}
                        required
                     />
                     <button
                        type="button"
                        onClick={() => setPassword((prev) => ({ ...prev, showPassword: !password.showPassword }))}
                        className="absolute top-[50%] right-0 translate-x-[-14px] translate-y-[calc(-50%+2px)]"
                     >
                        {password.showPassword ? (
                           <MdVisibility size={18} className="text-zinc-400" />
                        ) : (
                           <MdVisibilityOff size={18} className="text-zinc-400" />
                        )}
                     </button>
                  </div>
               </div>

               <button className="bg-primary text-white w-full py-2 rounded-md text-base" type="submit">
                  {state === 'Sign up' ? 'Create Account' : 'Login'}
               </button>

               {state === 'Sign up' ? (
                  <p>
                     Already have an account?{' '}
                     <span
                        onClick={() => {
                           setState('Login');
                           resetInputs();
                        }}
                        className="text-primary underline cursor-pointer"
                     >
                        Login here
                     </span>
                  </p>
               ) : (
                  <p>
                     Create a new account?{' '}
                     <span
                        onClick={() => {
                           setState('Sign up');
                           resetInputs();
                        }}
                        className="text-primary underline cursor-pointer"
                     >
                        Click here
                     </span>
                  </p>
               )}
            </div>
         </form>
      </section>
   );
};
export default Login;
