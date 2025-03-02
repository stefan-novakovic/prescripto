import { useEffect, useState } from 'react';
import useDoctorContext from '../../hooks/useDoctorContext';
import useAppContext from '../../hooks/useAppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

type UpdateDocData = {
   address: { line1: string; line2: string };
   fees: number;
   available: boolean;
};

const DoctorProfile = () => {
   const { backendUrlDoctor, dToken, profileData, getProfileData } = useDoctorContext();
   const { currencySymbol } = useAppContext();

   const [isEdit, setIsEdit] = useState<boolean>(false);
   const [isSubmittingDoctorData, setIsSubmittingDoctorData] = useState<boolean>(false);
   const [newFormData, setNewFormData] = useState<UpdateDocData | null>(null);

   useEffect(() => {
      setNewFormData(profileData);
   }, [profileData, isEdit]);

   const hasChanges = () => {
      return JSON.stringify(profileData) !== JSON.stringify(newFormData);
   };

   const updateProfile = async () => {
      if (!hasChanges()) return setIsEdit(false);

      setIsSubmittingDoctorData(true);
      try {
         if (newFormData) {
            const updateData = {
               address: newFormData.address,
               fees: newFormData.fees,
               available: newFormData.available
            };

            const { data } = await axios.post(backendUrlDoctor + '/api/doctor/update-profile', updateData, {
               headers: { dToken }
            });

            if (data.success) {
               toast.success(data.message);
               await getProfileData();
               setIsEdit(false);
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
         setIsSubmittingDoctorData(false);
      }
   };

   const cancelEdit = () => {
      setIsEdit(false);
   };

   useEffect(() => {
      if (dToken) {
         getProfileData();
      }
   }, [dToken]);
   return (
      profileData && (
         <section className="h-[calc(100vh-61px-48px)] sm:h-[calc(100vh-62.85px)] overflow-y-scroll px-2.5 sm:px-5 py-4 w-full">
            <div className="flex flex-col gap-4 max-w-[710px]">
               <div className="bg-primary/80 sm:max-w-64 aspect-square rounded-lg">
                  <img className="w-full sm:max-w-64 aspect-square" src={profileData.image} alt="" />
               </div>

               <div className="flex-1 border border-stone-100 rounded-lg p-4 md:p-6 bg-white">
                  {/* ----- Doc Info: name, degree, experience ----- */}
                  <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">{profileData.name}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-gray-600 min-h-6">
                     {profileData.degree && profileData.speciality && (
                        <p>
                           {profileData.degree} - {profileData.speciality}
                        </p>
                     )}
                     {profileData.experience && (
                        <button className="py-0.5 px-2 border text-xs rounded-full cursor-auto">
                           {profileData.experience}
                        </button>
                     )}
                  </div>

                  {/* ----- Doctor About ----- */}
                  {profileData.about && (
                     <div>
                        <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">About:</p>
                        <p className="text-sm text-gray-600 mt-1">{profileData.about}</p>
                     </div>
                  )}

                  {profileData.fees && (
                     <p className="text-gray-600 font-medium mt-4 min-h-6">
                        Appointment fee:{' '}
                        <span className="text-gray-800">
                           {currencySymbol}
                           {isEdit ? (
                              <input
                                 type="number"
                                 name="doctor_fee"
                                 id="doctor_fee"
                                 className="bg-gray-100 w-16 outline-none"
                                 value={newFormData?.fees || 0}
                                 onChange={(e) =>
                                    setNewFormData((prev) =>
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
                  )}

                  <div className="flex gap-2 py-2 min-h-16">
                     <p className="text-gray-600 font-medium">Address:</p>
                     <p className="text-sm py-1 flex-1">
                        {isEdit ? (
                           <input
                              type="text"
                              name="doctor_address1"
                              id="doctor_address1"
                              className="bg-gray-100 w-full max-w-60 outline-none"
                              value={newFormData?.address.line1 || ''}
                              onChange={(e) =>
                                 setNewFormData((prev) =>
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
                              className="bg-gray-100 w-full max-w-60 outline-none"
                              value={newFormData?.address.line2 || ''}
                              onChange={(e) =>
                                 setNewFormData((prev) =>
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

                  <div
                     className="flex gap-1 mt-2 w-min px-0.5 relative right-0.5"
                     style={isEdit ? { backgroundColor: 'rgb(243,244,246)' } : { backgroundColor: 'transparent' }}
                  >
                     <input
                        style={
                           isEdit
                              ? { pointerEvents: 'auto', cursor: 'pointer' }
                              : { pointerEvents: 'none', cursor: 'auto' }
                        }
                        checked={newFormData?.available ?? true}
                        onChange={() =>
                           isEdit &&
                           setNewFormData((prev) =>
                              prev
                                 ? {
                                      ...prev,
                                      available: !newFormData?.available
                                   }
                                 : null
                           )
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
                     <div className="flex gap-[6px]">
                        <button
                           className="px-5 py-[6px] min-w-[148.61px] min-h-[34px] border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all grid place-content-center"
                           style={isSubmittingDoctorData ? { backgroundColor: '#5f6fff' } : {}}
                           onClick={updateProfile}
                        >
                           {isSubmittingDoctorData ? <ClipLoader size={18} color="white" /> : 'Save information'}
                        </button>

                        {!isSubmittingDoctorData && (
                           <button
                              className="px-5 py-[6px] border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
                              onClick={cancelEdit}
                           >
                              Cancel
                           </button>
                        )}
                     </div>
                  ) : (
                     <button
                        className="px-5 py-[6px] min-w-[148.61px] min-h-[34px] border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all grid place-content-center"
                        onClick={() => setIsEdit(true)}
                     >
                        Edit
                     </button>
                  )}
               </div>
            </div>
         </section>
      )
   );
};
export default DoctorProfile;
