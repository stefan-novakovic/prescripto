import { useEffect, useState } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import useAppContext from '../hooks/useAppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Doctor } from '../context/AppContext';

const Appointment = () => {
   type Slots = { datetime: Date; time: string };
   type DocSlots = Slots[][];
   type TimeSlots = Slots[];
   type ExpiredDate = {
      dayLetters: string | null;
      dayNumbers: number | null;
   };

   const [docInfo, setDocInfo] = useState<Doctor | null>(null);
   const [docSlots, setDocSlots] = useState<DocSlots>([]);
   const [slotIndex, setSlotIndex] = useState<number>(0);
   const [slotTime, setSlotTime] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(true);

   const { docId } = useParams();
   const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useAppContext();
   const daysOfWeek: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']; // Sunday-Saturday : 0-6 index when using getDay() method
   const navigate: NavigateFunction = useNavigate();

   let expiredDate: ExpiredDate = {
      dayLetters: null,
      dayNumbers: new Date().getDate()
   };

   const fetchDocInfo = async () => {
      setLoading(true);
      const docInfo: Doctor | undefined = doctors.find((doctor) => doctor._id === docId);
      if (docInfo) {
         setDocInfo(docInfo);
      }
      setLoading(false);
   };

   const getAvailableSlots = async () => {
      if (!docInfo) return;
      setDocSlots([]);

      // getting current date
      let today: Date = new Date();

      for (let i: number = 0; i < 7; i++) {
         // creating Date objects for next 7 days with index
         let currentDate: Date = new Date();
         currentDate.setDate(today.getDate() + i); // setting day for each Date object with index

         // setting end time for each Date object with index (setting end time for each day)
         let endDateTime: Date = new Date();
         endDateTime.setDate(today.getDate() + i); // setting day for each Date object with index (creating Date objects for next 7 days)
         endDateTime.setHours(21, 0, 0, 0); // setting end time for each Date object (21:00 or 9pm)

         // setting hours
         if (today.getDate() === currentDate.getDate()) {
            // if it's current day, if hours are greater than 10 (10am - working hours started) increment by 1, if not set hours to 10
            currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
            currentDate.setMinutes(
               currentDate.getHours() > 10 && currentDate.getMinutes() > 30
                  ? 30
                  : currentDate.getHours() < 10 && currentDate.getMinutes() > 30
                    ? 0
                    : 0
            );
         } else {
            // if it's not current day, set time to 10:00am (working hours are from 10am-9pm)
            currentDate.setHours(10);
            currentDate.setMinutes(0);
         }

         let timeSlots: TimeSlots = [];
         while (currentDate < endDateTime) {
            let formattedTime: string = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            let day: number = currentDate.getDate();
            let month: number = currentDate.getMonth() + 1;
            let year: number = currentDate.getFullYear();

            const slotDate: string = day + '_' + month + '_' + year;
            const slotTime: string = formattedTime;

            const isSlotAvailable =
               docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

            if (isSlotAvailable) {
               // add slot to array
               timeSlots.push({
                  datetime: new Date(currentDate),
                  time: formattedTime
               });
            }

            // After adding slot to array, increment currentDate time by 30 minutes (next time slot)
            currentDate.setMinutes(currentDate.getMinutes() + 30);
         }
         setDocSlots((prev) => [...prev, timeSlots]);
      }
   };

   const bookAppointment = async () => {
      if (!token) {
         toast.warn('Login to book appointment');
         return navigate('/login');
      }

      try {
         const date: Date = docSlots[slotIndex][0].datetime;
         let day: number = date.getDate();
         let month: number = date.getMonth() + 1;
         let year: number = date.getFullYear();
         const slotDate: string = day + '_' + month + '_' + year;

         const { data } = await axios.post(
            backendUrl + '/api/user/book-appointment',
            { docId, slotDate, slotTime },
            { headers: { token } }
         );

         if (data.success) {
            toast.success(data.message);
            getDoctorsData();
            navigate('/my-appointments');
         } else {
            toast.error(data.message);
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
      fetchDocInfo();
   }, [doctors, docId]);

   useEffect(() => {
      getAvailableSlots();
   }, [docInfo]);

   useEffect(() => {
      if (docSlots.length > 0) {
         if (docSlots[0].length === 0) {
            setSlotIndex(1);
         }
      }
   }, [docSlots]);
   return loading ? (
      <div className="flex flex-1 justify-center items-center w-full min-h-[48px] mt-36 px-8 text-center font-semibold tracking-wide">
         Loading doctor...
      </div>
   ) : docInfo ? (
      <div className="flex flex-1 flex-col">
         {/* ----- Doctor Details ----- */}
         <div className="flex flex-col md:flex-row gap-4">
            <div className="flex justify-center w-full h-min md:w-auto bg-primary rounded-lg">
               <img className="w-full max-w-[411px] md:max-w-72" src={docInfo.image} alt="" />
            </div>

            <div className="flex-1 max-w-[780px] border border-gray-400 rounded-b-lg md:rounded-lg p-8 py-7 bg-white mt-[-24px] md:mt-0">
               {/* ----- Doctor Info: name, degree, experience ----- */}
               <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                  {docInfo.name}
                  <img className="w-5" src={assets.verified_icon} alt="" />
               </p>
               <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                  <p>
                     {docInfo.degree} - {docInfo.speciality}
                  </p>
                  <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
               </div>

               {/* ----- Doctor About ----- */}
               <div>
                  <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                     About <img src={assets.info_icon} alt="" />
                  </p>
                  <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
               </div>
               <p className="text-gray-500 font-medium mt-4">
                  Appointment fee:{' '}
                  <span className="text-gray-900">
                     {currencySymbol}
                     {docInfo.fees}
                  </span>
               </p>
            </div>
         </div>

         {/* ----- Booking slots ----- */}
         <div
            style={!docInfo.available ? { display: 'none' } : { display: 'block' }}
            className="md:ml-72 md:pl-4 mt-4 font-medium text-gray-700"
         >
            <p>Booking slots</p>
            <div id="bookingSlots" className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
               {docSlots.length &&
                  docSlots.map((item, index) => {
                     let offlineDayBoolean = Boolean(daysOfWeek[item[0]?.datetime.getDay()]);
                     if (!offlineDayBoolean) {
                        expiredDate.dayLetters = daysOfWeek[index + 1];
                     }

                     return (
                        <button
                           disabled={offlineDayBoolean ? false : true}
                           key={index}
                           onClick={() => {
                              setSlotIndex(index);
                              setSlotTime('');
                           }}
                           className={`text-center py-6 min-w-16 rounded-full ${slotIndex === index && offlineDayBoolean ? 'bg-primary text-white' : !offlineDayBoolean ? 'border border-gray-100 bg-gray-100 text-gray-300 cursor-default' : 'border border-gray-200'}`}
                        >
                           <p>
                              {item[0] && daysOfWeek[item[0].datetime.getDay()]
                                 ? daysOfWeek[item[0].datetime.getDay()]
                                 : expiredDate.dayLetters}
                           </p>
                           <p>
                              {item[0] && item[0].datetime.getDate()
                                 ? item[0].datetime.getDate()
                                 : expiredDate.dayNumbers}
                           </p>
                        </button>
                     );
                  })}
            </div>

            <div id="bookingSlotsTimes" className="flex items-center gap-3 w-full min-h-[38px] overflow-x-scroll mt-4">
               {docSlots.length &&
                  docSlots[slotIndex].map((item, index) => (
                     <p
                        key={index}
                        onClick={() => setSlotTime(item.time)}
                        className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white border border-transparent' : 'text-gray-400 border border-gray-300'}`}
                     >
                        {item.time.toLowerCase()}
                     </p>
                  ))}
            </div>
            <button
               onClick={bookAppointment}
               className="bg-primary text-white tex-sm font-light px-14 py-3 rounded-full my-6"
            >
               Book an appointment
            </button>
         </div>

         {/* ----- Listing Related Doctors ----- */}
         <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
   ) : (
      <div className="flex flex-1 justify-center items-center w-full min-h-[48px] mt-36 px-8 text-center font-semibold text-red-600 tracking-wide">
         The doctor with the ID provided in the URL does not exist.
      </div>
   );
};
export default Appointment;
