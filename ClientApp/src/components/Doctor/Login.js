import React, { useState, useRef, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import doctor from '../../images/doctor.png';
import BackDrop from '../BackDrop';
import SignUp from './SignUp';
import { useHistory } from 'react-router-dom';

function Login({ setlogin }) {
  const [signup, setsignup] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  const [Users, setUsers] = useState([]);
  const ref = useRef(null);
  const history = useHistory();

  function handleClick() {
    history.push('/test');
  }

  const changeHandler = e => {
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const refreshList = () => {
    fetch(process.env.REACT_APP_API + 'doctors')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const findUser = Users.filter(
      user =>
        user.DoctorEmail === userInfo.PatientEmail &&
        user.DoctorPassword === userInfo.password
    );

    var doctorName = '';

    findUser.forEach(e => {
      doctorName = e.DoctorName;
    });

    if (findUser.length > 0) {
      alert('Successfully logged in');
      handleClick();
      localStorage.setItem('DoctorName', doctorName);
      localStorage.setItem('DoctorEmail', userInfo.PatientEmail);
    } else {
      console.log('login failed');
    }
  };

  useEffect(() => {
    refreshList();
  }, []);
  return (
    <>
      {signup && (
        <BackDrop loading={false}>
          <SignUp setsignup={setsignup} />
        </BackDrop>
      )}
      <div className='py-12 px-12 bg-white rounded-2xl shadow-xl z-20 animate__animated animate__fadeInDown animate__faster '>
        <div
          onClick={() => setlogin(false)}
          className='flex justify-end h-12  '
        >
          <IoClose className='text-2xl text-gray-600  cursor-pointer' />
        </div>
        <div>
          <div className='mx-auto flex justify-center '>
            <img src={doctor} height='150' width='150' alt='patient' />
          </div>
          <h1 className='text-2xl font-bold mt-2 text-center mb-4 cursor-pointer'>
            Doctor login
          </h1>
        </div>
        <form onSubmit={handleSubmit} ref={ref}>
          <div className='space-y-4'>
            <input
              type='email'
              placeholder='Email'
              name='PatientEmail'
              onChange={changeHandler}
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={changeHandler}
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            />
          </div>
          <div className='text-center mt-6'>
            <button
              type='submit'
              className='block transition-all duration-300 ease-linear mx-auto shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white text-lg font-medium py-3 px-8 rounded-full'
            >
              Log In
            </button>
            <div className='flex items-center justify-center text-gray-500 mt-3'>
              <p>
                New Patient?{' '}
                <span
                  onClick={() => setsignup(true)}
                  className='underline cursor-pointer'
                >
                  Register here
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
