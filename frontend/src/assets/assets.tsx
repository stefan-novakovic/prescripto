import appointment_img from './images/appointment_img.png';
import header_img from './images/header_img.png';
import group_profiles from './images/group_profiles.png';
import profile_pic from './images/profile_pic.png';
import contact_image from './images/contact_image.png';
import about_image from './images/about_image.png';
import logo from './images/logo.svg';
import dropdown_icon from './images/dropdown_icon.svg';
import menu_icon from './images/menu_icon.svg';
import cross_icon from './images/cross_icon.png';
import chats_icon from './images/chats_icon.svg';
import verified_icon from './images/verified_icon.svg';
import arrow_icon from './images/arrow_icon.svg';
import info_icon from './images/info_icon.svg';
import upload_icon from './images/upload_icon.png';
import stripe_logo from './images/stripe_logo.png';
import razorpay_logo from './images/razorpay_logo.png';
import doc1 from './images/doc1.png';
import doc2 from './images/doc2.png';
import doc3 from './images/doc3.png';
import doc4 from './images/doc4.png';
import doc5 from './images/doc5.png';
import doc6 from './images/doc6.png';
import doc7 from './images/doc7.png';
import doc8 from './images/doc8.png';
import doc9 from './images/doc9.png';
import doc10 from './images/doc10.png';
import doc11 from './images/doc11.png';
import doc12 from './images/doc12.png';
import doc13 from './images/doc13.png';
import doc14 from './images/doc14.png';
import doc15 from './images/doc15.png';
import Dermatologist from './images/Dermatologist.svg';
import Gastroenterologist from './images/Gastroenterologist.svg';
import General_physician from './images/General_physician.svg';
import Gynecologist from './images/Gynecologist.svg';
import Neurologist from './images/Neurologist.svg';
import Pediatricians from './images/Pediatricians.svg';

type Assets = {
   [index: string]: string;
};

export const assets: Assets = {
   appointment_img,
   header_img,
   group_profiles,
   logo,
   chats_icon,
   verified_icon,
   info_icon,
   profile_pic,
   arrow_icon,
   contact_image,
   about_image,
   menu_icon,
   cross_icon,
   dropdown_icon,
   upload_icon,
   stripe_logo,
   razorpay_logo
};

type Speciality = {
   speciality: string;
   image: string;
};

export const specialityData: Speciality[] = [
   {
      speciality: 'General physician',
      image: General_physician
   },
   {
      speciality: 'Gynecologist',
      image: Gynecologist
   },
   {
      speciality: 'Dermatologist',
      image: Dermatologist
   },
   {
      speciality: 'Pediatricians',
      image: Pediatricians
   },
   {
      speciality: 'Neurologist',
      image: Neurologist
   },
   {
      speciality: 'Gastroenterologist',
      image: Gastroenterologist
   }
];

type Doctor = {
   _id: string;
   name: string;
   image: string;
   speciality: string;
   degree: string;
   experience: string;
   about: string;
   fees: number;
   address: {
      line1: string;
      line2: string;
   };
};

export const doctors: Doctor[] = [
   {
      _id: 'doc1',
      name: 'Dr. Richard James',
      image: doc1,
      speciality: 'General physician',
      degree: 'MBBS',
      experience: '4 Years',
      about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
      fees: 50,
      address: {
         line1: '17th Cross, Richmond',
         line2: 'Circle, Ring Road, London'
      }
   },
   {
      _id: 'doc2',
      name: 'Dr. Emily Larson',
      image: doc2,
      speciality: 'Gynecologist',
      degree: 'MBBS',
      experience: '3 Years',
      about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
      fees: 60,
      address: {
         line1: '27th Cross, Richmond',
         line2: 'Circle, Ring Road, London'
      }
   },
   {
      _id: 'doc3',
      name: 'Dr. Sarah Patel',
      image: doc3,
      speciality: 'Dermatologist',
      degree: 'MBBS',
      experience: '1 Years',
      about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
      fees: 30,
      address: {
         line1: '37th Cross, Richmond',
         line2: 'Circle, Ring Road, London'
      }
   },
   {
      _id: 'doc4',
      name: 'Dr. Christopher Lee',
      image: doc4,
      speciality: 'Pediatricians',
      degree: 'MBBS',
      experience: '2 Years',
      about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
      fees: 40,
      address: {
         line1: '47th Cross, Richmond',
         line2: 'Circle, Ring Road, London'
      }
   },
   {
      _id: 'doc5',
      name: 'Dr. Jennifer Garcia',
      image: doc5,
      speciality: 'Neurologist',
      degree: 'MBBS',
      experience: '4 Years',
      about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
      fees: 50,
      address: {
         line1: '57th Cross, Richmond',
         line2: 'Circle, Ring Road, London'
      }
   },
   {
      _id: 'doc6',
      name: 'Dr. Andrew Williams',
      image: doc6,
      speciality: 'Neurologist',
      degree: 'MBBS',
      experience: '4 Years',
      about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
      fees: 50,
      address: {
         line1: '57th Cross, Richmond',
         line2: 'Circle, Ring Road, London'
      }
   },
   {
      _id: 'doc7',
      name: 'Dr. Christopher Davis',
      image: doc7,
      speciality: 'General physician',
      degree: 'MBBS',
      experience: '4 Years',
      about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
      fees: 50,
      address: {
         line1: '17th Cross, Richmond',
         line2: 'Circle, Ring Road, London'
      }
   },
   {
      _id: 'doc8',
      name: 'Dr. Timothy White',
      image: doc8,
      speciality: 'Gynecologist',
      degree: 'MBBS',
      experience: '3 Years',
      about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
      fees: 60,
      address: {
         line1: '27th Cross, Richmond',
         line2: 'Circle, Ring Road, London'
      }
   },
   {
      _id: 'doc9',
      name: 'Dr. Ava Mitchell',
      image: doc9,
      speciality: 'Dermatologist',
      degree: 'MBBS',
      experience: '1 Years',
      about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
      fees: 30,
      address: {
         line1: '37th Cross, Richmond',
         line2: 'Circle, Ring Road, London'
      }
   },
   {
      _id: 'doc10',
      name: 'Dr. Jeffrey King',
      image: doc10,
      speciality: 'Pediatricians',
      degree: 'MBBS',
      experience: '2 Years',
      about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
      fees: 40,
      address: {
         line1: '47th Cross, Richmond',
         line2: 'Circle, Ring Road, London'
      }
   },
   {
      _id: 'doc11',
      name: 'Dr. Zoe Kelly',
      image: doc11,
      speciality: 'Neurologist',
      degree: 'MBBS',
      experience: '4 Years',
      about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
      fees: 50,
      address: {
         line1: '57th Cross, Richmond',
         line2: 'Circle, Ring Road, London'
      }
   },
   {
      _id: 'doc12',
      name: 'Dr. Patrick Harris',
      image: doc12,
      speciality: 'Neurologist',
      degree: 'MBBS',
      experience: '4 Years',
      about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
      fees: 50,
      address: {
         line1: '57th Cross, Richmond',
         line2: 'Circle, Ring Road, London'
      }
   },
   {
      _id: 'doc13',
      name: 'Dr. Chloe Evans',
      image: doc13,
      speciality: 'General physician',
      degree: 'MBBS',
      experience: '4 Years',
      about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
      fees: 50,
      address: {
         line1: '17th Cross, Richmond',
         line2: 'Circle, Ring Road, London'
      }
   },
   {
      _id: 'doc14',
      name: 'Dr. Ryan Martinez',
      image: doc14,
      speciality: 'Gynecologist',
      degree: 'MBBS',
      experience: '3 Years',
      about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
      fees: 60,
      address: {
         line1: '27th Cross, Richmond',
         line2: 'Circle, Ring Road, London'
      }
   },
   {
      _id: 'doc15',
      name: 'Dr. Amelia Hill',
      image: doc15,
      speciality: 'Dermatologist',
      degree: 'MBBS',
      experience: '1 Years',
      about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
      fees: 30,
      address: {
         line1: '37th Cross, Richmond',
         line2: 'Circle, Ring Road, London'
      }
   }
];
