import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, NavigateFunction } from 'react-router-dom';
import { MdAccountCircle } from 'react-icons/md';
import { assets } from '../assets/assets';
import useAppContext from '../hooks/useAppContext';

const Navbar = () => {
   const navigate: NavigateFunction = useNavigate();

   const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
   const [showDropdownMenu, setShowDropdownMenu] = useState<boolean>(false);
   const [showDropdownMenuHover, setShowDropdownMenuHover] = useState<boolean>(false);
   const [intervalId, setIntervalId] = useState<number | null>(null);

   const loggedUserIconDivRef = useRef<HTMLDivElement>(null);

   const { token, setToken, userData } = useAppContext();

   const logout = () => {
      setToken('');
      localStorage.removeItem('token');
      navigate('/');
   };

   const handleMouseEnter = () => {
      if (intervalId) {
         clearInterval(intervalId);
         setIntervalId(null);
      }
      setShowDropdownMenuHover(true);
   };

   const handleMouseLeave = () => {
      if (!showDropdownMenu && !intervalId) {
         const id = setInterval(() => {
            setShowDropdownMenuHover(false);
         }, 350);
         setIntervalId(id);
      } else {
         setShowDropdownMenuHover(false);
      }
   };

   useEffect(() => {
      return () => {
         if (intervalId) {
            clearInterval(intervalId);
         }
      };
   }, [intervalId]);

   useEffect(() => {
      const handler = (e: MouseEvent) => {
         if (loggedUserIconDivRef.current && !loggedUserIconDivRef.current.contains(e.target as Node)) {
            setShowDropdownMenu(false);
         }
      };

      document.addEventListener('mousedown', handler);
      return () => {
         document.removeEventListener('mousedown', handler);
      };
   });

   return (
      <section className="w-full 2xl:max-w-[1650px] 2xl:mx-auto h-[77px] flex items-center justify-between text-sm mb-4 border-b border-b-gray-400 3xl:px-10">
         <div className="w-36 h-[62.52px] sm:w-[148px] sm:h-[63.36px] lg:w-44 lg:h-[69.3px]">
            <img
               onClick={() => navigate('/')}
               className="w-36 sm:w-[148px] lg:w-44 py-4 cursor-pointer"
               src={assets.logo}
               alt=""
            />
         </div>

         <ul id="navMenu" className="hidden md:flex items-start gap-2 lg:gap-5 py-4 font-medium">
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

         <div className="flex item-center gap-4 md:gap-0">
            <div className="md:w-[148px] lg:w-44">
               {token && userData ? (
                  <div
                     ref={loggedUserIconDivRef}
                     onClick={() => {
                        setShowDropdownMenu((prev) => !prev);
                        if (showDropdownMenu) {
                           setShowDropdownMenuHover(false);
                        } else {
                           setShowDropdownMenuHover(true);
                        }
                     }}
                     onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}
                     className="float-end flex items-center gap-2 cursor-pointer group relative pb-6 mt-6"
                  >
                     <div className="w-8 h-8 rounded-full">
                        <img className="w-8 h-8 rounded-full" src={userData.image} alt="" />
                     </div>
                     <div className="w-3 h-[8.56px]">
                        <img className="w-3" src={assets.dropdown_icon} alt="" />
                     </div>

                     <div
                        onClick={(e) => e.stopPropagation()}
                        className={`absolute top-14 right-0 text-base font-medium text-gray-600 z-20 ${!showDropdownMenu && !showDropdownMenuHover ? 'invisible' : !showDropdownMenu && showDropdownMenuHover ? 'sm:group-hover:visible' : 'visible'}`}
                     >
                        <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                           <p
                              onClick={() => {
                                 setShowDropdownMenu(false);
                                 setShowDropdownMenuHover(false);
                                 navigate('/my-profile');
                              }}
                              className="hover:text-black hover:cursor-pointer"
                           >
                              My profile
                           </p>
                           <p
                              onClick={() => {
                                 setShowDropdownMenu(false);
                                 setShowDropdownMenuHover(false);
                                 navigate('/my-appointments');
                              }}
                              className="hover:text-black hover:cursor-pointer"
                           >
                              My appointments
                           </p>
                           <p
                              onClick={() => {
                                 setShowDropdownMenu(false);
                                 setShowDropdownMenuHover(false);
                                 logout();
                              }}
                              className="hover:text-black hover:cursor-pointer"
                           >
                              Logout
                           </p>
                        </div>
                     </div>
                  </div>
               ) : (
                  <>
                     <button
                        onClick={() => navigate('/login')}
                        className="float-end bg-primary text-white px-5 lg:px-8 py-3 rounded-full font-light hidden md:block active:bg-primary/90"
                     >
                        Create account
                     </button>
                     <button
                        onClick={() => navigate('/login')}
                        className="text-[#000B6D] mr-[17px] rounded-full block md:hidden"
                     >
                        <MdAccountCircle size={37} />
                     </button>
                  </>
               )}
            </div>
            <div className="flex items-center md:hidden">
               <div onClick={() => setShowMobileMenu((prev) => !prev)} className="w-6 h-[17.5px]">
                  <img className="w-6 h-min" src={assets.menu_icon} alt="" />
               </div>
            </div>
            {/* ----- Mobile Menu ----- */}
            <div
               id="mobileNavMenu"
               className={`${showMobileMenu ? 'translate-x-[0%]' : 'translate-x-[101%]'} fixed w-full sm:max-w-[400px] md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-[650ms]`}
            >
               <div className="flex items-center justify-between pl-4 pr-[14px] py-[21.55px]">
                  <div className="w-36 h-[30.52px] sm:w-[148px] sm:h-[31.36px]">
                     <img
                        onClick={() => {
                           navigate('/');
                           setShowMobileMenu(false);
                        }}
                        className="w-36 sm:w-[148px] cursor-pointer"
                        src={assets.logo}
                        alt=""
                     />
                  </div>
                  <div className="w-7 h-7">
                     <img className="w-7" onClick={() => setShowMobileMenu(false)} src={assets.cross_icon} alt="" />
                  </div>
               </div>
               <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg md:text-xl font-medium">
                  <NavLink
                     className="px-4 py-2 md:tracking-wider rounded inline-block"
                     onClick={() => setShowMobileMenu(false)}
                     to="/"
                  >
                     HOME
                  </NavLink>
                  <NavLink
                     className="px-4 py-2 md:tracking-wider rounded inline-block"
                     onClick={() => setShowMobileMenu(false)}
                     to="/doctors"
                  >
                     ALL DOCTORS
                  </NavLink>
                  <NavLink
                     className="px-4 py-2 md:tracking-wider rounded inline-block"
                     onClick={() => setShowMobileMenu(false)}
                     to="/about"
                  >
                     ABOUT
                  </NavLink>
                  <NavLink
                     className="px-4 py-2 md:tracking-wider rounded inline-block"
                     onClick={() => setShowMobileMenu(false)}
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
