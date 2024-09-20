import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { parseISO, format } from 'date-fns';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaRegCalendarAlt } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import { assets } from '../assets/assets';

type UserData = {
   name: string;
   image: string;
   email: string;
   phone: string;
   address: { line1: string; line2?: string };
   gender: string;
   dob: string;
};

const MyProfile = () => {
   const [userData, setUserData] = useState<UserData>({
      name: 'Edward Vincent',
      image: assets.profile_pic,
      email: 'richardjameswap@gmail.com',
      phone: '+1 123 456 7890',
      address: { line1: '57th Cross, Richmond', line2: 'Circle, Church Road, London' },
      gender: 'Male',
      dob: '2000-01-20'
   });
   const [isEdit, setIsEdit] = useState<boolean>(false);

   // Convert ISO string to Date object for the DatePicker
   const dobDate = parseISO(userData.dob);
   const handleDatepickerChange = (date: Date) =>
      date &&
      setUserData((prev) => ({
         ...prev,
         dob: format(date, 'yyyy-MM-dd') // Store in ISO format
      }));
   return (
      <div className="flex flex-1 flex-col">
         <div className="max-w-lg flex flex-col gap-2 text-sm">
            <img className="w-36 rounded" src={userData.image} alt="" />
            {isEdit ? (
               <input
                  className="bg-gray-100 text-3xl font-medium max-w-[336px] mt-4 outline-none"
                  type="text"
                  name="myProfileName"
                  id="myProfileName"
                  value={userData.name}
                  onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
               />
            ) : (
               <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
            )}

            <hr className="bg-zinc-400 h-[1px] border-none" />

            <div>
               <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
               <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                  <p className="font-medium">Email id:</p>
                  <p className="text-blue-500 px-1">{userData.email}</p>
                  <p className="font-medium">Phone:</p>
                  {isEdit ? (
                     <input
                        className="bg-gray-100 px-1 max-w-[208px] w-full outline-none"
                        type="text"
                        name="myProfilePhone"
                        id="myProfilePhone"
                        value={userData.phone}
                        onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                     />
                  ) : (
                     <p className="text-blue-400 px-1">{userData.phone}</p>
                  )}
                  <p className="font-medium">Address:</p>
                  {isEdit ? (
                     <p>
                        <input
                           className="bg-gray-100 px-1 max-w-[208px] w-full outline-none"
                           type="text"
                           name="myProfileAddressLine1"
                           id="myProfileAddressLine1"
                           value={userData.address.line1}
                           onChange={(e) =>
                              setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))
                           }
                        />
                        <br />
                        {userData.address.line2 && (
                           <input
                              className="bg-gray-100 px-1 max-w-[208px] w-full outline-none"
                              type="text"
                              name="myProfileAddressLine2"
                              id="myProfileAddressLine2"
                              value={userData.address.line2}
                              onChange={(e) =>
                                 setUserData((prev) => ({
                                    ...prev,
                                    address: { ...prev.address, line2: e.target.value }
                                 }))
                              }
                           />
                        )}
                     </p>
                  ) : (
                     <p className="text-gray-500 px-1">
                        {userData.address.line1} <br /> {userData.address.line2}
                     </p>
                  )}
               </div>
            </div>
            <div>
               <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
               <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                  <p className="font-medium">Gender:</p>
                  {isEdit ? (
                     <div className="relative max-w-[115px]">
                        <select
                           className="w-full bg-gray-100 pl-1 appearance-none cursor-pointer outline-none"
                           name="myProfileGender"
                           id="myProfileGender"
                           value={userData.gender}
                           onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                        >
                           <option value="Male">Male</option>
                           <option value="Female">Female</option>
                        </select>
                        <IoMdArrowDropdown className="absolute bottom-[50%] right-1 translate-y-[50%] pointer-events-none cursor-pointer" />
                     </div>
                  ) : (
                     <p className="text-gray-400 px-1">{userData.gender}</p>
                  )}
                  <p className="font-medium">Birthday:</p>
                  {isEdit ? (
                     <div className="relative w-min">
                        <DatePicker
                           showYearDropdown
                           className="max-w-[115px] pl-1 bg-gray-100 flex justify-center outline-none"
                           name="myProfileDOB"
                           id="myProfileDOB"
                           selected={dobDate}
                           onChange={(date) => date && handleDatepickerChange(date)}
                           onYearChange={(date) => date && handleDatepickerChange(date)}
                           onMonthChange={(date) => date && handleDatepickerChange(date)}
                           dateFormat="dd/MM/yyyy" // Set desired format here
                           portalId="root-portal" // Prevents layout shift when datepicker is opened
                           minDate={new Date(1910, 0, 1)}
                           maxDate={new Date()}
                        />
                        <FaRegCalendarAlt
                           size={12}
                           className="absolute bottom-[50%] right-[5px] translate-y-[50%] pointer-events-none "
                        />
                     </div>
                  ) : (
                     <p className="text-gray-400 px-1">{format(dobDate, 'dd/MM/yyyy')}</p>
                  )}
               </div>
            </div>

            <div className="mt-10">
               {isEdit ? (
                  <button
                     className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
                     onClick={() => setIsEdit(false)}
                  >
                     Save information
                  </button>
               ) : (
                  <button
                     className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
                     onClick={() => setIsEdit(true)}
                  >
                     Edit
                  </button>
               )}
            </div>
         </div>
      </div>
   );
};
export default MyProfile;
