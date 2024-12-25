import { assets } from '../assets/assets';

const Footer = () => {
   const currentYear: number = new Date().getFullYear();
   return (
      <div className="w-full 2xl:max-w-[1650px] 2xl:mx-auto">
         <div className="flex flex-col md:grid md:grid-cols-[1.5fr_1fr_1fr] lg:grid-cols-[3fr_0.85fr_0.85fr] gap-8 md:gap-14 lg:px-10 mb-10 text-sm">
            {/* ----- Left section ----- */}
            <div>
               <div className="w-40 h-[33.91px] mb-3">
                  <img className="w-40" src={assets.logo} alt="" loading="lazy" />
               </div>
               <p className="w-full lg:w-9/12 text-gray-600 leading-6">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book.
               </p>
            </div>

            {/* ----- Center section ----- */}
            <div>
               <p className="text-xl font-medium mb-5">COMPANY</p>
               <ul className="flex flex-col gap-2 text-gray-600">
                  <li>Home</li>
                  <li>About us</li>
                  <li>Contact us</li>
                  <li>Privacy policy</li>
               </ul>
            </div>

            {/* ----- Right section ----- */}
            <div>
               <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
               <ul className="flex flex-col gap-2 text-gray-600">
                  <li>+1-212-456-7890</li>
                  <li>greatstackdev@gmail.com</li>
               </ul>
            </div>
         </div>

         {/* ----- Copyright text ----- */}
         <div>
            <hr />
            <p className="py-5 text-sm text-center">
               Copyright &copy; {currentYear} Prescripto
               <br className="block xs:hidden" />
               <span className="hidden xs:inline"> - </span>
               <span className="whitespace-nowrap">
                  All Rights Reserved<span className="hidden xs:inline">.</span>
               </span>
            </p>
         </div>
      </div>
   );
};
export default Footer;
