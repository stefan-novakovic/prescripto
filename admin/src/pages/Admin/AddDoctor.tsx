import { useState, FormEvent, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import useAdminContext from '../../hooks/useAdminContext';
import { assets } from '../../assets/assets';

const AddDoctor = () => {
   const [docImg, setDocImg] = useState<File | null>(null);
   const [name, setName] = useState<string>('');
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<{ show: boolean; value: string }>({
      show: false,
      value: ''
   });
   const [experience, setExperience] = useState<string>('1 Year');
   const [fees, setFees] = useState<string>('');
   const [about, setAbout] = useState<string>('');
   const [speciality, setSpeciality] = useState<string>('General physician');
   const [degree, setDegree] = useState<string>('');
   const [address1, setAddress1] = useState<string>('');
   const [address2, setAddress2] = useState<string>('');
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const { backendUrlAdmin, aToken } = useAdminContext();

   const scrollRefAddDoctor = useRef<HTMLElement>(null);

   const resetForm = () => {
      setDocImg(null);
      setName('');
      setEmail('');
      setPassword({ value: '', show: false });
      setExperience('1 Year');
      setFees('');
      setSpeciality('General physician');
      setDegree('');
      setAddress1('');
      setAddress2('');
      setAbout('');
   };

   const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);

      try {
         if (!docImg) {
            setIsLoading(false);
            return toast.error('Image Not Selected');
         }

         const formData = new FormData();
         formData.append('image', docImg);
         formData.append('name', name);
         formData.append('email', email);
         formData.append('password', password.value);
         formData.append('experience', experience);
         formData.append('fees', fees);
         formData.append('speciality', speciality);
         formData.append('degree', degree);
         formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));
         formData.append('about', about);

         const { data } = await axios.post(backendUrlAdmin + `/api/admin/add-doctor`, formData, {
            headers: {
               aToken
            }
         });

         if (data.success) {
            toast.success(data.message);
            resetForm();
            scrollRefAddDoctor?.current?.scrollTo({ top: 0, behavior: 'smooth' });
         } else {
            toast.error(data.message);
         }
         setIsLoading(false);
      } catch (error) {
         if (error instanceof Error) {
            toast.error(error.message);
            console.log(error);
         } else {
            toast.error('An unknown error occurred');
            console.log('Unknown error:', error);
         }
         setIsLoading(false);
      }
   };

   return (
      <section
         ref={scrollRefAddDoctor}
         className="h-[calc(100vh-61px-48px)] sm:h-[calc(100vh-62.85px)] overflow-y-scroll px-2.5 sm:px-5 py-4 w-full"
      >
         <p className="mb-3 text-lg font-medium">Add Doctor</p>

         <form onSubmit={onSubmitHandler} className="bg-white p-5 sm:p-8 border rounded w-full max-w-6xl">
            <div className="flex items-center gap-4 mb-8 text-gray-500">
               <label htmlFor="doc-img" className="block w-16 h-16">
                  <img
                     className="w-16 bg-gray-100 rounded-full cursor-pointer"
                     src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                     alt=""
                  />
               </label>
               <input
                  onChange={(e) => e.target.files && setDocImg(e.target.files[0])}
                  type="file"
                  name="doc-img"
                  id="doc-img"
                  hidden
               />
               <label className="block cursor-pointer" htmlFor="doc-img">
                  Upload doctor <br /> picture
               </label>
            </div>

            <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
               <div className="w-full lg:flex-1 flex flex-col gap-4">
                  <div className="flex-1 flex flex-col gap-1">
                     <label className="block" htmlFor="doc-name">
                        Doctor Name
                     </label>
                     <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="border rounded px-3 py-2"
                        type="text"
                        name="doc-name"
                        id="doc-name"
                        placeholder="Name"
                        required
                     />
                  </div>

                  <div className="flex-1 flex flex-col gap-1">
                     <label className="block" htmlFor="doc-email">
                        Doctor Email
                     </label>
                     <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="border rounded px-3 py-2"
                        type="email"
                        name="doc-email"
                        id="doc-email"
                        placeholder="Email"
                        required
                     />
                  </div>

                  <div className="flex-1 flex flex-col gap-1">
                     <label className="block" htmlFor="doc-password">
                        Doctor Password
                     </label>
                     <div className="relative">
                        <input
                           className="border rounded w-full px-3 py-2"
                           type={password.show ? 'text' : 'password'}
                           name="doc-password"
                           id="doc-password"
                           placeholder="Password"
                           value={password.value}
                           onChange={(e) => setPassword((prev) => ({ ...prev, value: e.target.value }))}
                           required
                        />
                        <button
                           type="button"
                           onClick={() => setPassword((prev) => ({ ...prev, show: !password.show }))}
                           className="absolute top-[50%] right-0 translate-x-[-14px] translate-y-[-50%]"
                        >
                           {password.show ? (
                              <MdVisibility size={18} className="text-zinc-400" />
                           ) : (
                              <MdVisibilityOff size={18} className="text-zinc-400" />
                           )}
                        </button>
                     </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-1">
                     <label className="block" htmlFor="doc-experience">
                        Experience
                     </label>
                     <select
                        onChange={(e) => setExperience(e.target.value)}
                        value={experience}
                        className="border rounded px-3 py-2"
                        name="doc-experience"
                        id="doc-experience"
                     >
                        <option value="1 Year">1 Year</option>
                        {Array.from({ length: 49 }, (_, index) => (
                           <option key={index + 2} value={`${index + 2} Years`}>
                              {index + 2} Years
                           </option>
                        ))}
                     </select>
                  </div>

                  <div className="flex-1 flex flex-col gap-1">
                     <label className="block" htmlFor="doc-fees">
                        Fees
                     </label>
                     <input
                        onChange={(e) => setFees(parseFloat(e.target.value) >= 0 ? e.target.value : '0')}
                        value={fees}
                        className="border rounded px-3 py-2"
                        type="number"
                        name="doc-fees"
                        id="doc-fees"
                        placeholder="Fees"
                        required
                        min={0}
                     />
                  </div>
               </div>

               <div className="w-full lg:flex-1 flex flex-col gap-4">
                  <div className="flex-1 flex flex-col gap-1">
                     <label className="block" htmlFor="doc-speciality">
                        Speciality
                     </label>
                     <select
                        onChange={(e) => setSpeciality(e.target.value)}
                        value={speciality}
                        className="border rounded px-3 py-2"
                        name="doc-speciality"
                        id="doc-speciality"
                     >
                        <option value="General physician">General physician</option>
                        <option value="Gynecologist">Gynecologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Pediatricians">Pediatricians</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Gastroenterologist">Gastroenterologist</option>
                     </select>
                  </div>

                  <div className="flex-1 flex flex-col gap-1">
                     <label className="block" htmlFor="doc-education">
                        Education
                     </label>
                     <input
                        onChange={(e) => setDegree(e.target.value)}
                        value={degree}
                        className="border rounded px-3 py-2"
                        type="text"
                        name="doc-education"
                        id="doc-education"
                        placeholder="Education"
                        required
                     />
                  </div>

                  <div className="flex-1 flex flex-col gap-1">
                     <p>Address</p>
                     <input
                        onChange={(e) => setAddress1(e.target.value)}
                        value={address1}
                        className="border rounded px-3 py-2 mb-1"
                        type="text"
                        name="doc-address1"
                        id="doc-address1"
                        placeholder="Address 1"
                        required
                     />
                     <input
                        onChange={(e) => setAddress2(e.target.value)}
                        value={address2}
                        className="border rounded px-3 py-2"
                        type="text"
                        name="doc-address2"
                        id="doc-address2"
                        placeholder="Address 2"
                     />
                  </div>
               </div>
            </div>
            <div>
               <label className="block mt-4 mb-2" htmlFor="doc-about">
                  About Doctor
               </label>
               <textarea
                  onChange={(e) => setAbout(e.target.value)}
                  value={about}
                  className="w-full px-4 pt-2 border rounded resize-none"
                  name="doc-about"
                  id="doc-about"
                  placeholder="Write about doctor"
                  rows={5}
                  required
               ></textarea>
            </div>

            <button
               type="submit"
               className="grid place-content-center h-12 min-w-40 bg-primary px-10 py-3 mt-4 text-white rounded-full"
            >
               {isLoading ? <ClipLoader color="white" size={24} /> : 'Add doctor'}
            </button>
         </form>
      </section>
   );
};
export default AddDoctor;
