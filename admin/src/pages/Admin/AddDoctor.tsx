import { assets } from '../../assets/assets';

const AddDoctor = () => {
   return (
      <form className="m-5 w-full">
         <p className="mb-3 text-lg font-medium">Add Doctor</p>

         <div className="bg-white p-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
            <div className="flex items-center gap-4 mb-8 text-gray-500">
               <label htmlFor="doc-img">
                  <img className="w-16 bg-gray-100 rounded-full cursor-pointer" src={assets.upload_area} alt="" />
               </label>
               <input type="file" name="doc-img" id="doc-img" hidden />
               <p>
                  Upload doctor <br /> picture
               </p>
            </div>

            <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
               <div className="w-full lg:flex-1 flex flex-col gap-4">
                  <div className="flex-1 flex flex-col gap-1">
                     <label className="block" htmlFor="doc-name">
                        Doctor Name
                     </label>
                     <input
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
                     <input
                        className="border rounded px-3 py-2"
                        type="password"
                        name="doc-password"
                        id="doc-password"
                        placeholder="Password"
                        required
                     />
                  </div>

                  <div className="flex-1 flex flex-col gap-1">
                     <label className="block" htmlFor="doc-experience">
                        Experience
                     </label>
                     <select className="border rounded px-3 py-2" name="doc-experience" id="doc-experience">
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
                     <select className="border rounded px-3 py-2" name="doc-speciality" id="doc-speciality">
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
                        className="border rounded px-3 py-2 mb-1"
                        type="text"
                        name="doc-address1"
                        id="doc-address1"
                        placeholder="Address 1"
                        required
                     />
                     <input
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
                  className="w-full px-4 pt-2 border rounded"
                  name="doc-about"
                  id="doc-about"
                  placeholder="Write about doctor"
                  rows={5}
               ></textarea>
            </div>

            <button className="bg-primary px-10 py-3 mt-4 text-white rounded-full">Add doctor</button>
         </div>
      </form>
   );
};
export default AddDoctor;
