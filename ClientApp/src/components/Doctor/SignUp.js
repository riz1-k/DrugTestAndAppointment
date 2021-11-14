import React, { useState, useRef, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import doctor from '../../images/doctor.png';
import { useHistory } from 'react-router-dom';

function SignUp({ setsignup }) {
  const [userInfo, setuserInfo] = useState([]);
  const [Users, setUsers] = useState([]);
  const history = useHistory();

  function handleClick() {
    history.push('/test');
  }

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    fetch(process.env.REACT_APP_API + 'doctors')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        console.log(data);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    refreshList();
    const accExists = Users.filter(
      user => user.PatientEmail === userInfo.Email
    );
    console.log(accExists);
    if (accExists.length <= 0 && userInfo.DoctorCode === '12340') {
      fetch(process.env.REACT_APP_API + 'doctors', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          DoctorName: userInfo.UserName,
          DoctorEmail: userInfo.Email,
          DoctorPassword: userInfo.Password,
          DoctorCode: userInfo.DoctorCode,
        }),
      })
        .then(res => res.json())
        .then(
          result => {
            alert(result);
            localStorage.setItem('DoctorName', userInfo.UserName);
            localStorage.setItem('DoctorEmail', userInfo.Email);
            handleClick();
          },
          error => {
            alert('Failed while tring  to create an account');
          }
        );
    } else {
      alert('Email has already been registered or Code is not valid');
    }
  };

  const ref = useRef(null);

  const changeHandler = e => {
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value });
    console.log(userInfo);
  };

  return (
    <>
      <div className='py-12 px-12 bg-white rounded-2xl shadow-xl z-20 animate__animated animate__fadeInDown animate__faster'>
        <div
          onClick={() => setsignup(false)}
          className='flex justify-end h-12 '
        >
          <IoClose className='text-2xl text-gray-600  cursor-pointer' />
        </div>
        <div className='mx-auto flex justify-center '>
          <img src={doctor} height='150' width='150' alt='patient' />
        </div>
        <div>
          <h1 className='text-2xl font-bold text-center mb-4 cursor-pointer'>
            Doctor Registeration
          </h1>
        </div>
        <form onSubmit={handleSubmit} ref={ref}>
          <div className='space-y-4'>
            <input
              type='text'
              placeholder='Full name'
              required
              aria-required='true'
              name='UserName'
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
              onChange={changeHandler}
            />
            <input
              type='email'
              placeholder='Email'
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
              required
              aria-required='true'
              name='Email'
              onChange={changeHandler}
            />
            <input
              type='password'
              placeholder='Password'
              name='Password'
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
              required
              onChange={changeHandler}
              aria-required='true'
            />
            <input
              type='password'
              placeholder='Code'
              name='DoctorCode'
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
              required
              onChange={changeHandler}
              aria-required='true'
            />
          </div>
          <div className='text-center mt-6'>
            <button
              type='submit'
              className='block transition-all duration-300 ease-linear mx-auto shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white text-lg font-medium py-3 px-8 rounded-lg'
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
