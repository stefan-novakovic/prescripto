import { useContext } from 'react';
import { DoctorContext } from '../context/DoctorContext';

const useDoctorContext = () => {
   return useContext(DoctorContext);
};

export default useDoctorContext;
