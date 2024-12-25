import { assets } from '../assets/assets';

const Contact = () => {
   return (
      <div className="flex flex-1 flex-col w-full 2xl:max-w-[1650px] 2xl:mx-auto mb-24 md:mb-40">
         <div className="text-start text-2xl pt-4 md:pt-7 text-gray-500">
            <p>
               CONTACT <span className="text-gray-700 font-semibold">US</span>
            </p>
         </div>

         <div className="my-10 flex flex-col justify-center items-start md:flex-row gap-8 md:gap-12 mb-0 text-sm">
            {/* ----- Left Side ----- */}
            <div className="w-full md:w-[378px] aspect-square">
               <img className="w-full md:w-[378px]" src={assets.contact_image} alt="" />
            </div>
            {/* ----- Right Side ----- */}
            <div className="flex flex-col justify-center items-start gap-6">
               <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
               <p className="text-gray-500">
                  54709 Willms Station <br /> Suite 350, Washington, USA
               </p>
               <p className="text-gray-500">
                  Tel: (415) 555-0132 <br /> Email: greatstackdev@gmail.com
               </p>
               <p className="font-semibold text-lg text-gray-600">Careers at PRESCRIPTO</p>
               <p className="text-gray-500">Learn more about our teams and job openings.</p>
               <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-[350ms]">
                  Explore Jobs
               </button>
            </div>
         </div>
      </div>
   );
};
export default Contact;
