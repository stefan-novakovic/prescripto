import { assets } from '../assets/assets';

const About = () => {
   return (
      <section className="flex flex-1 flex-col w-full 2xl:max-w-[1550px] 2xl:mx-auto mb-24 md:mb-32">
         <div className="text-start text-2xl pt-4 text-gray-500">
            <p>
               ABOUT <span className="text-gray-700 font-medium">US</span>
            </p>
         </div>

         <div className="my-10 flex flex-col justify-center md:flex-row gap-8 md:gap-12">
            {/* ----- Left Side ----- */}
            <div className="w-full md:w-[378px] aspect-[378/384.33] h-min">
               <img className="w-full md:w-[378px]" src={assets.about_image} alt="" />
            </div>
            {/* ----- Right Side ----- */}
            <div className="flex flex-col justify-center gap-6 md:w-2/5 text-sm text-gray-600">
               <p>
                  Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and
                  efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling
                  doctor appointments and managing their health records.
               </p>
               <p>
                  Prescripto is committed to excellence in healthcare technology. We continuosly strive to enhance our
                  platform, integrating the latest advancements to improve user experience and deliver superior service.
                  Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support
                  you every step of the way.
               </p>
               <b className="text-gray-800">Our Vision</b>
               <p>
                  Our vision At Prescripto is to create a seamless healthcare experience for every user. We aim to
                  bridge the gap between patients and healthcare providers, making it easier for you to access the care
                  you need, when you need it.
               </p>
            </div>
         </div>

         <div className="text-xl my-4">
            <p>
               WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
            </p>
         </div>

         <div className="flex flex-col md:flex-row">
            <div className="border px-10 lg:px-16 py-8 lg:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
               <b>Efficiency:</b>
               <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
            </div>
            <div className="border px-10 lg:px-16 py-8 lg:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
               <b>Convenience:</b>
               <p>Access to a network of trusted healthcare professionals in your area.</p>
            </div>
            <div className="border px-10 lg:px-16 py-8 lg:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
               <b>Personalization:</b>
               <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
            </div>
         </div>
      </section>
   );
};
export default About;
