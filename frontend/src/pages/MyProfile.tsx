import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { parseISO, format } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaRegCalendarAlt } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import useAppContext from '../hooks/useAppContext';
import { assets } from '../assets/assets';

const MyProfile = () => {
   const { userData, setUserData, token, backendUrl, loadUserProfileData } = useAppContext();
   const [userImg, setUserImg] = useState<File | null>(null);
   const [isEdit, setIsEdit] = useState<boolean>(false);

   const updateUserProfileData = async () => {
      try {
         if (userData) {
            const formData = new FormData();
            formData.append('name', userData?.name || '');
            formData.append('phone', userData?.phone || '000000000');
            formData.append('address', JSON.stringify(userData?.address) || JSON.stringify({ line1: '', line2: '' }));
            formData.append('gender', userData?.gender || 'Not Selected');
            formData.append('dob', userData?.dob || 'Not Selected');

            userImg && formData.append('image', userImg);

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, {
               headers: { token }
            });

            if (data.success) {
               toast.success(data.message);
               await loadUserProfileData();
               setIsEdit(false);
               setUserImg(null);
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
      }
   };

   // Convert ISO string to Date object for the DatePicker
   const dobDate = userData?.dob && userData?.dob !== 'Not Selected' ? parseISO(userData?.dob) : undefined;
   const handleDatepickerChange = (date: Date) =>
      date &&
      setUserData((prev) =>
         prev
            ? {
                 ...prev,
                 dob: format(date, 'yyyy-MM-dd') // Store in ISO format
              }
            : null
      );
   return (
      userData && (
         <div className="flex flex-1 flex-col">
            <div className="max-w-lg flex flex-col gap-2 text-sm">
               {isEdit ? (
                  <label className="block w-fit" htmlFor="user-img">
                     <div className="relative w-36 aspect-square cursor-pointer">
                        <img
                           className="block w-36 rounded opacity-75"
                           src={userImg ? URL.createObjectURL(userImg) : userData.image}
                           alt=""
                        />
                        <img
                           className="block w-10 absolute bottom-12 right-12"
                           src={userImg ? '' : assets.upload_icon}
                           alt=""
                        />
                     </div>
                     <input
                        onChange={(e) => e.target.files && setUserImg(e.target.files[0])}
                        type="file"
                        name="user-img"
                        id="user-img"
                        hidden
                     />
                  </label>
               ) : (
                  <div className="w-36 aspect-square">
                     <img className="w-36 rounded" src={userData.image} alt="" />
                  </div>
               )}
               {isEdit ? (
                  <input
                     className="bg-gray-100 text-3xl font-medium max-w-[336px] mt-4 outline-none"
                     type="text"
                     name="myProfileName"
                     id="myProfileName"
                     value={userData.name}
                     onChange={(e) => setUserData((prev) => (prev ? { ...prev, name: e.target.value } : null))}
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
                           onChange={(e) => setUserData((prev) => (prev ? { ...prev, phone: e.target.value } : null))}
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
                                 setUserData((prev) =>
                                    prev
                                       ? {
                                            ...prev,
                                            address: { ...prev.address, line1: e.target.value }
                                         }
                                       : null
                                 )
                              }
                           />
                           <br />
                           <input
                              className="bg-gray-100 px-1 max-w-[208px] w-full outline-none"
                              type="text"
                              name="myProfileAddressLine2"
                              id="myProfileAddressLine2"
                              value={userData.address.line2}
                              onChange={(e) =>
                                 setUserData((prev) =>
                                    prev
                                       ? {
                                            ...prev,
                                            address: { ...prev.address, line2: e.target.value }
                                         }
                                       : null
                                 )
                              }
                           />
                        </p>
                     ) : (
                        <div className="flex flex-col">
                           <p className="w-full min-h-5 max-w-[208px] text-gray-500 px-1">{userData.address.line1}</p>
                           <p className="w-full min-h-5 max-w-[208px] text-gray-500 px-1">{userData.address.line2}</p>
                        </div>
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
                              value={userData.gender === 'Not Selected' ? '' : userData.gender}
                              onChange={(e) =>
                                 setUserData((prev) => (prev ? { ...prev, gender: e.target.value } : null))
                              }
                           >
                              <option hidden disabled value=""></option>
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
                              showMonthDropdown
                              scrollableYearDropdown
                              yearDropdownItemNumber={150}
                              className="max-w-[115px] pl-1 bg-gray-100 flex justify-center outline-none"
                              name="myProfileDOB"
                              id="myProfileDOB"
                              selected={dobDate}
                              onChange={(date) => date && handleDatepickerChange(date)}
                              onYearChange={(date) => date && handleDatepickerChange(date)}
                              onMonthChange={(date) => date && handleDatepickerChange(date)}
                              dateFormat="dd/MM/yyyy" // Set desired format here
                              // portalId="root-portal" // Prevents layout shift when datepicker is opened
                              minDate={new Date(1910, 0, 1)}
                              maxDate={new Date()}
                           />
                           <FaRegCalendarAlt
                              size={12}
                              className="absolute bottom-[50%] right-[5px] translate-y-[50%] pointer-events-none "
                           />
                        </div>
                     ) : (
                        <p className="text-gray-400 px-1">{dobDate ? format(dobDate, 'dd/MM/yyyy') : 'Not Selected'}</p>
                     )}
                  </div>
               </div>

               <div className="mt-10">
                  {isEdit ? (
                     <button
                        className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
                        onClick={updateUserProfileData}
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
      )
   );
};
export default MyProfile;
