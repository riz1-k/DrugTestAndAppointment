import React, { useState } from 'react';
import patient from '../images/patient.png';
import doctor from '../images/doctor.png';
import BackDrop from './BackDrop';
import PatientLogin from './Patient/Login';
import DoctorLogin from './Doctor/Login';

function Home() {
  const [patientlogin, setpatientlogin] = useState(false);
  const [doctorlogin, setdoctorlogin] = useState(false);

  return (
    <>
      {patientlogin && (
        <BackDrop loading={false}>
          <PatientLogin setlogin={setpatientlogin} />
        </BackDrop>
      )}
      {doctorlogin && (
        <BackDrop loading={false}>
          <DoctorLogin setlogin={setdoctorlogin} />
        </BackDrop>
      )}
      <div className='h-screen '>
        <div className=' flex justify-between h-5/6 items-center w-8/12 mx-auto my-auto'>
          <div className='h-96  flex w-96 rounded-md bg-gray-100 cursor-pointer '>
            <div
              onClick={() => setpatientlogin(true)}
              className='h-60 w-8/12 mx-auto mt-3 flex flex-col hover:scale-110 '
            >
              <img src={patient} alt='patient' />
              <p className='text-xl mt-5 mx-auto font-Montserrat font-bold mr-4 '>
                Patient
              </p>
            </div>
          </div>
          <div className='h-96 w-96 rounded-md bg-gray-100 cursor-pointer '>
            <div
              onClick={() => setdoctorlogin(true)}
              className='h-60 w-8/12 mx-auto mt-3 flex flex-col hover:scale-110'
            >
              <img src={doctor} alt='doctor' />
              <p className='text-xl mt-5 mx-auto font-Montserrat font-bold mr-4 '>
                Doctor
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
