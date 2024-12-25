import { useEffect, useState } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import useAppContext from '../hooks/useAppContext';
import RelatedDoctors from '../components/RelatedDoctors';
import { Doctor } from '../context/AppContext';
import Missing from './Missing';
import { assets } from '../assets/assets';

const Appointment = () => {
   type Slots = { datetime: Date; time: string };
   type DocSlots = Slots[][];
   type TimeSlots = Slots[];
   type ExpiredDate = {
      dayLetters: string | null;
      dayNumbers: number | null;
   };

   const [docInfo, setDocInfo] = useState<Doctor | undefined>(undefined);
   const [docSlots, setDocSlots] = useState<DocSlots>([]);
   const [slotIndex, setSlotIndex] = useState<number>(0);
   const [slotTime, setSlotTime] = useState<string>('');
   const [fetchingDoctor, setFetchingDoctor] = useState<boolean>(true);
   const [submittingAppointment, setSubmittingAppointment] = useState<boolean>(false);

   const { docId } = useParams();
   const { doctors, loadingDoctors, currencySymbol, backendUrl, token, getDoctorsData } = useAppContext();
   const daysOfWeek: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']; // Sunday-Saturday : 0-6 index when using getDay() method
   const navigate: NavigateFunction = useNavigate();

   let expiredDate: ExpiredDate = {
      dayLetters: null,
      dayNumbers: new Date().getDate()
   };

   const fetchDocInfo = () => {
      setFetchingDoctor(true);
      const docInfo: Doctor | undefined = doctors.find((doctor) => doctor._id === docId);
      if (docInfo) {
         setDocInfo(docInfo);
         console.log(docInfo);
      }
      setFetchingDoctor(false);
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

      setSubmittingAppointment(true);
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
      } finally {
         setSubmittingAppointment(false);
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
   return (
      <>
         <div className="flex flex-1 flex-col w-full 2xl:max-w-[1550px] 2xl:mx-auto mb-24 md:mb-40">
            {/* ----- Doctor Details ----- */}
            {!loadingDoctors && !fetchingDoctor && docInfo && (
               <div className="flex flex-col md:flex-row gap-4 max-w-[411px] min-h-[288px] mx-auto md:max-w-none md:mx-0">
                  <div className="flex justify-center w-full max-w-[411px] aspect-square md:aspect-auto md:w-72 md:h-72 bg-primary rounded-t-lg md:rounded-lg">
                     <img
                        className="w-full max-w-[411px] aspect-square md:w-72 md:h-72 md:aspect-auto"
                        src={docInfo.image}
                        alt=""
                     />
                  </div>

                  <div className="flex-1 min-h-72 max-w-[880px] border border-gray-400 rounded-b-lg md:rounded-lg p-7 bg-white -mt-5 md:mt-0">
                     {/* ----- Doctor Info: name, degree, experience ----- */}
                     <div className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                        {docInfo.name}
                        <div className="w-5 h-5">
                           <img className="w-5" src={assets.verified_icon} alt="" />
                        </div>
                     </div>
                     <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                        <p>
                           {docInfo.degree} - {docInfo.speciality}
                        </p>
                        <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
                     </div>

                     {/* ----- Doctor About ----- */}
                     <div>
                        <div className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                           About{' '}
                           <div className="w-[17px] h-[17px]">
                              <img className="w-[17px]" src={assets.info_icon} alt="" />
                           </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{docInfo.about}</p>
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
            )}

            {/* ----- Booking slots ----- */}
            {!loadingDoctors && !fetchingDoctor && docInfo && (
               <div
                  style={!docInfo.available ? { display: 'none' } : { display: 'block' }}
                  className="pl-0 lg:pl-[304px] mt-5 font-medium text-gray-700 w-full max-w-[1184px]"
               >
                  <p>Booking slots</p>
                  <div
                     id="bookingSlots"
                     className="flex gap-x-[10px] gap-y-3 items-center h-[90px] w-full overflow-x-scroll mt-5"
                  >
                     {docSlots.length > 0 &&
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
                                 className={`text-center py-5 min-w-16 rounded-full ${slotIndex === index && offlineDayBoolean ? 'bg-primary text-white' : !offlineDayBoolean ? 'border border-gray-100 bg-gray-100 text-gray-300 cursor-default' : 'border border-gray-200 hover:bg-primary/10 active:bg-primary/15'}`}
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

                  <div
                     id="bookingSlotsTimes"
                     className="flex items-center gap-x-2 gap-y-3 w-full h-[38px] lg:h-auto overflow-x-scroll lg:overflow-x-auto lg:flex-wrap mt-4"
                  >
                     {docSlots.length > 0 &&
                        docSlots[slotIndex].map((item, index) => (
                           <p
                              key={index}
                              onClick={() => setSlotTime(item.time)}
                              className={`text-sm font-light flex-shrink-0 px-4 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white border border-transparent' : 'text-gray-400 border border-gray-300 hover:bg-primary/10 active:bg-primary/15'}`}
                           >
                              {item.time.toLowerCase()}
                           </p>
                        ))}
                  </div>
                  <button
                     onClick={bookAppointment}
                     className="bg-primary text-white tex-sm font-light px-14 py-3 w-[264.27px] h-12 rounded-full mt-6 grid place-content-center"
                  >
                     {submittingAppointment ? <ClipLoader size={24} color="white" /> : 'Book an appointment'}
                  </button>
               </div>
            )}

            {/* ----- Listing Related Doctors ----- */}
            {!loadingDoctors && !fetchingDoctor && docInfo && (
               <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
            )}

            {!loadingDoctors && !fetchingDoctor && !docInfo && <Missing pod="doctor" />}
         </div>
      </>
   );
};
export default Appointment;
