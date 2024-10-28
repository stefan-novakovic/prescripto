import { useState } from 'react';
import { NavLink, useNavigate, NavigateFunction } from 'react-router-dom';
import { MdAccountCircle } from 'react-icons/md';
import { assets } from '../assets/assets';
import useAppContext from '../hooks/useAppContext';

const Navbar = () => {
   const navigate: NavigateFunction = useNavigate();

   const [showMenu, setShowMenu] = useState<boolean>(false);

   const { token, setToken, userData } = useAppContext();

   const logout = () => {
      setToken('');
      localStorage.removeItem('token');
      navigate('/');
   };

   return (
      <section className="h-[77px] flex items-center justify-between text-sm mb-4 border-b border-b-gray-400">
         <img onClick={() => navigate('/')} className="w-40 lg:w-44 py-4 cursor-pointer" src={assets.logo} alt="" />

         <ul id="navMenu" className="hidden c825:flex items-start gap-3 lg:gap-5 py-4 font-medium">
            <NavLink to="/">
               <li className="py-1 text-center">HOME</li>
               <hr className="border-none outline-none h-0.5 bg-transparent w-4/5 m-auto" />
            </NavLink>
            <NavLink to="/doctors">
               <li className="py-1 text-center">ALL DOCTORS</li>
               <hr className="border-none outline-none h-0.5 bg-transparent w-3/5 m-auto" />
            </NavLink>
            <NavLink to="/about">
               <li className="py-1 text-center">ABOUT</li>
               <hr className="border-none outline-none h-0.5 bg-transparent w-3/5 m-auto" />
            </NavLink>
            <NavLink to="/contact">
               <li className="py-1 text-center">CONTACT</li>
               <hr className="border-none outline-none h-0.5 bg-transparent w-3/5 m-auto" />
            </NavLink>
         </ul>

         <div className="flex item-center gap-4 c825:gap-0">
            <div className="w-auto c825:w-[135.38px] lg:w-[159.38px]">
               {token && userData ? (
                  <div className="float-end flex items-center gap-2 cursor-pointer group relative pb-6 mt-6">
                     <img className="w-8 rounded-full" src={userData.image} alt="" />
                     <img className="w-2.5" src={assets.dropdown_icon} alt="" />
                     <div
                        className={`absolute top-14 right-0 text-base font-medium text-gray-600 z-20 delay-200 invisible group-hover:delay-0 group-hover:visible`}
                     >
                        <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                           <p onClick={() => navigate('/my-profile')} className="hover:text-black hover:cursor-pointer">
                              My profile
                           </p>
                           <p
                              onClick={() => navigate('/my-appointments')}
                              className="hover:text-black hover:cursor-pointer"
                           >
                              My appointments
                           </p>
                           <p onClick={logout} className="hover:text-black hover:cursor-pointer">
                              Logout
                           </p>
                        </div>
                     </div>
                  </div>
               ) : (
                  <>
                     <button
                        onClick={() => navigate('/login')}
                        className="float-end bg-primary text-white px-5 lg:px-8 py-3 rounded-full font-light hidden c825:block"
                     >
                        Create account
                     </button>
                     <button
                        onClick={() => navigate('/login')}
                        className="text-[#000B6D] mr-[15px] rounded-full block c825:hidden"
                     >
                        <MdAccountCircle size={38} />
                     </button>
                  </>
               )}
            </div>
            <div className="flex items-center">
               <img
                  onClick={() => setShowMenu((prev) => !prev)}
                  className="w-6 c825:hidden h-min"
                  src={assets.menu_icon}
                  alt=""
               />
            </div>
            {/* ----- Mobile Menu ----- */}
            <div
               id="mobileNavMenu"
               className={`${showMenu ? 'translate-x-[0%]' : 'translate-x-[101%]'} fixed w-full c825:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-[650ms]`}
            >
               <div className="flex items-center justify-between pl-4 pr-[14px] py-[21.55px]">
                  <img
                     onClick={() => {
                        navigate('/');
                        setShowMenu(false);
                     }}
                     className="w-40 cursor-pointer"
                     src={assets.logo}
                     alt=""
                  />
                  <img className="w-7" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
               </div>
               <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg md:text-xl font-medium">
                  <NavLink
                     className="px-4 py-2 md:tracking-wider rounded inline-block"
                     onClick={() => setShowMenu(false)}
                     to="/"
                  >
                     HOME
                  </NavLink>
                  <NavLink
                     className="px-4 py-2 md:tracking-wider rounded inline-block"
                     onClick={() => setShowMenu(false)}
                     to="/doctors"
                  >
                     ALL DOCTORS
                  </NavLink>
                  <NavLink
                     className="px-4 py-2 md:tracking-wider rounded inline-block"
                     onClick={() => setShowMenu(false)}
                     to="/about"
                  >
                     ABOUT
                  </NavLink>
                  <NavLink
                     className="px-4 py-2 md:tracking-wider rounded inline-block"
                     onClick={() => setShowMenu(false)}
                     to="/contact"
                  >
                     CONTACT
                  </NavLink>
               </ul>
            </div>
         </div>
      </section>
   );
};
export default Navbar;
