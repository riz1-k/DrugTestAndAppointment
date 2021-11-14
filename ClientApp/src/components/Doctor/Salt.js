import React, { useState, useRef, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import salt from '../../images/sodium.png';

function Salt({ setsalt }) {
  const [report, setReport] = useState([]);
  const [Users, setUsers] = useState([]);
  const ref = useRef();

  const refreshList = () => {
    fetch(process.env.REACT_APP_API + 'appointments')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      });
  };

  useEffect(() => {
    refreshList();
  }, []);

  const changeHandler = e => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch(process.env.REACT_APP_API + 'saltreport', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UserName: event.target.UserName.value,
        Doctor: event.target.Doctor.value,
        Glucose: event.target.Glucose.value,
        Potassium: event.target.Potassium.value,
        Urea: event.target.Urea.value,
        Calcium: event.target.Calcium.value,
        RepTime: event.target.RepTime.value,
      }),
    })
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          alert('The Report has been successfully generated');
        },
        error => {
          alert('Failed');
        }
      );
  };

  return (
    <>
      <div className='py-12 px-16 bg-white rounded-2xl shadow-xl z-20 animate__animated animate__fadeInDown animate__faster '>
        <div onClick={() => setsalt(false)} className='flex justify-end   '>
          <IoClose className='text-2xl text-gray-600  cursor-pointer' />
        </div>
        <div>
          <div className='mx-auto flex justify-center '>
            <img src={salt} height='100' width='100' alt='patient' />
          </div>
          <h1 className='text-2xl font-bold mt-2 text-center mb-4 cursor-pointer'>
            Salt Test Report
          </h1>
        </div>
        <form onSubmit={handleSubmit} ref={ref}>
          <div className='space-y-4'>
            <select
              name='UserName'
              class='border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none'
            >
              {Users.map(d => (
                <option value={d.UserName}>{d.UserName}</option>
              ))}
            </select>
            <input
              type='text'
              placeholder='Doctor'
              name='Doctor'
              defaultValue={localStorage.getItem('DoctorName')}
              onChange={changeHandler}
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            />
            <input
              type='number'
              placeholder='Glucose'
              name='Glucose'
              onChange={changeHandler}
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            />
            <input
              type='number'
              placeholder='Potassium'
              name='Potassium'
              onChange={changeHandler}
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            />
            <input
              type='number'
              placeholder='Urea'
              name='Urea'
              onChange={changeHandler}
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            />
            <input
              type='number'
              placeholder='Calcium'
              name='Calcium'
              onChange={changeHandler}
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            />
            <input
              type='time'
              placeholder='RepTime'
              name='RepTime'
              onChange={changeHandler}
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            />

            <div className='text-center mt-6'>
              <button
                type='submit'
                className='block transition-all duration-300 ease-linear mx-auto shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white text-lg font-medium py-3 px-8 rounded-full'
              >
                Submit Report
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Salt;
