import { useEffect, useState } from 'react';
import useDoctorContext from '../../hooks/useDoctorContext';
import useAppContext from '../../hooks/useAppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorProfile = () => {
   const { backendUrlDoctor, dToken, profileData, setProfileData, getProfileData } = useDoctorContext();
   const { currencySymbol } = useAppContext();

   const [isEdit, setIsEdit] = useState<boolean>(false);

   const updateProfile = async () => {
      try {
         if (profileData) {
            const updateData = {
               address: profileData.address,
               fees: profileData.fees,
               available: profileData.available
            };

            const { data } = await axios.post(backendUrlDoctor + '/api/doctor/update-profile', updateData, {
               headers: { dToken }
            });
            if (data.success) {
               toast.success(data.message);
               setIsEdit(false);
               getProfileData();
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

   useEffect(() => {
      if (dToken) {
         getProfileData();
      }
   }, [dToken]);
   return (
      profileData && (
         <div>
            <div className="flex flex-col gap-4 m-5">
               <div>
                  <img className="bg-primary/80 w-full sm:max-w-64 rounded-lg" src={profileData.image} alt="" />
               </div>

               <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
                  {/* ----- Doc Info: name, degree, experience ----- */}
                  <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">{profileData.name}</p>
                  <div className="flex items-center gap-2 mt-1 text-gray-600">
                     <p>
                        {profileData.degree} - {profileData.speciality}
                     </p>
                     <button className="py-0.5 px-2 border text-xs rounded-full cursor-auto">
                        {profileData.experience}
                     </button>
                  </div>

                  {/* ----- Doctor About ----- */}
                  <div>
                     <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">About:</p>
                     <p className="text-sm text-gray-600 max-w-[700px] mt-1">{profileData.about}</p>
                  </div>

                  <p className="text-gray-600 font-medium mt-4">
                     Appointment fee:{' '}
                     <span className="text-gray-800">
                        {currencySymbol}
                        {isEdit ? (
                           <input
                              type="number"
                              name="doctor_fee"
                              id="doctor_fee"
                              className="bg-gray-100 w-14 outline-none"
                              value={profileData.fees}
                              onChange={(e) =>
                                 setProfileData((prev) =>
                                    prev
                                       ? {
                                            ...prev,
                                            fees: Number(e.target.value)
                                         }
                                       : null
                                 )
                              }
                           />
                        ) : (
                           profileData.fees
                        )}
                     </span>
                  </p>

                  <div className="flex gap-2 py-2">
                     <p className="text-gray-600 font-medium">Address:</p>
                     <p className="text-sm py-1">
                        {isEdit ? (
                           <input
                              type="text"
                              name="doctor_address1"
                              id="doctor_address1"
                              className="bg-gray-100 max-w-[208px] w-full outline-none"
                              value={profileData.address.line1}
                              onChange={(e) =>
                                 setProfileData((prev) =>
                                    prev
                                       ? {
                                            ...prev,
                                            address: { ...prev.address, line1: e.target.value }
                                         }
                                       : null
                                 )
                              }
                           />
                        ) : (
                           profileData.address.line1
                        )}
                        <br />
                        {isEdit ? (
                           <input
                              type="text"
                              name="doctor_address2"
                              id="doctor_address2"
                              className="bg-gray-100 max-w-[208px] w-full outline-none"
                              value={profileData.address.line2}
                              onChange={(e) =>
                                 setProfileData((prev) =>
                                    prev
                                       ? {
                                            ...prev,
                                            address: { ...prev.address, line2: e.target.value }
                                         }
                                       : null
                                 )
                              }
                           />
                        ) : (
                           profileData.address.line2
                        )}
                     </p>
                  </div>

                  <div className="flex gap-1 pt-2">
                     <input
                        style={
                           isEdit
                              ? { pointerEvents: 'auto', cursor: 'pointer' }
                              : { pointerEvents: 'none', cursor: 'auto' }
                        }
                        checked={profileData.available}
                        onChange={() =>
                           isEdit && setProfileData((prev) => (prev ? { ...prev, available: !prev.available } : null))
                        }
                        type="checkbox"
                        name="available_doc"
                        id="available_doc"
                     />
                     <label
                        htmlFor="available_doc"
                        style={
                           isEdit
                              ? { pointerEvents: 'auto', cursor: 'pointer' }
                              : { pointerEvents: 'none', cursor: 'auto' }
                        }
                     >
                        Available
                     </label>
                  </div>
                  {isEdit ? (
                     <button
                        onClick={updateProfile}
                        className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
                     >
                        Save
                     </button>
                  ) : (
                     <button
                        onClick={() => setIsEdit(true)}
                        className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
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
export default DoctorProfile;
