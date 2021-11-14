import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Backdrop from '../BackDrop';
import Payment from './Payment';

function HomePage() {
  const history = useHistory();

  function handleClick() {
    history.push('/');
  }
  const ref = useRef();
  const [userInfo, setuserInfo] = useState([]);
  const [doc, setdocs] = useState([]);
  const [dia, setdia] = useState([]);
  const [salt, setsalt] = useState([]);
  const [viewdia, setViewDia] = useState(false);
  const [viewSalt, setViewSalt] = useState(false);
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_API + 'doctors')
      .then(response => response.json())
      .then(data => {
        setdocs(data);
      });
    fetch(process.env.REACT_APP_API + 'diabetesreport')
      .then(response => response.json())
      .then(data => {
        setdia(
          data.filter(d => d.UserName === localStorage.getItem('patientName'))
        );
      });
    fetch(process.env.REACT_APP_API + 'saltreport')
      .then(response => response.json())
      .then(data => {
        setsalt(
          data.filter(d => d.UserName === localStorage.getItem('patientName'))
        );
      });
  }, []);

  const changeHandler = e => {
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (localStorage.getItem('payed')) {
      fetch(process.env.REACT_APP_API + 'appointments', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserName: event.target.PatientName.value,
          UserEmail: event.target.PatientEmail.value,
          Doctor: event.target.DoctorName.value,
          ApDate: event.target.ApDate.value,
          ApTime: event.target.ApTime.value,
          Test: event.target.Test.value,
          Fee: event.target.Fee.value,
        }),
      })
        .then(res => res.json())
        .then(
          result => {
            console.log(result);
            alert('Your appointment has been scheduled!');
            localStorage.removeItem('patientName');
            localStorage.removeItem('patientEmail');
            localStorage.removeItem('payed');
            handleClick();
          },
          error => {
            alert('Failed');
          }
        );
    } else {
      alert('Payment is required for booking an appointment');
    }
  };

  return (
    <div>
      {drop && (
        <Backdrop loading={false}>
          <Payment setDrop={setDrop} />
        </Backdrop>
      )}
      <h1 className='text-4xl font-medium mt-3 flex justify-center text-black '>
        Make an Appointment
      </h1>
      <div className='py-12 px-12 bg-white rounded-2xl shadow-xl z-20 animate__animated animate__fadeInDown animate__faster w-3/6 mx-auto '>
        <form onSubmit={handleSubmit} ref={ref}>
          <div className='space-y-4'>
            <input
              type='text'
              placeholder='Name'
              name='PatientName'
              onChange={changeHandler}
              value={localStorage.getItem('patientName')}
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            />
            <input
              type='email'
              placeholder='Email'
              name='PatientEmail'
              onChange={changeHandler}
              value={localStorage.getItem('patientEmail')}
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            />
            <div class='relative inline-flex'>
              <svg
                class='w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 412 232'
              >
                <path
                  d='M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z'
                  fill='#648299'
                  fillRule='nonzero'
                />
              </svg>
              <p className='mt-1 mr-3'>Doctor :</p>
              <select
                name='DoctorName'
                class='border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none'
              >
                {doc.map(d => (
                  <option value={d.DoctorName}>{d.DoctorName}</option>
                ))}
              </select>
            </div>
            <br />
            <div class='relative inline-flex'>
              <svg
                class='w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 412 232'
              >
                <path
                  d='M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z'
                  fill='#648299'
                  fillRule='nonzero'
                />
              </svg>
              <p className='mt-1 mr-3'>Test :</p>
              <select
                name='Test'
                class='border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none'
              >
                <option value='Diabetes Test'>Diabetes Test</option>
                <option value='Salt Test'>Salt Test</option>
              </select>
            </div>
            <input
              type='date'
              name='ApDate'
              onChange={changeHandler}
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            />
            <input
              type='time'
              name='ApTime'
              onChange={changeHandler}
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            />
            <input
              type='text'
              name='Fee'
              onChange={changeHandler}
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none cursor-not-allowed  '
              value='500'
            />
          </div>
          <div className='text-center mt-6'>
            <button
              type='button'
              onClick={() => setDrop(true)}
              className='block transition-all duration-300 ease-linear  shadow bg-green-500 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white text-lg font-medium py-2 px-8 rounded-md'
            >
              {localStorage.getItem('payed') ? 'Payed' : 'Pay'}
            </button>
          </div>
          <div className='text-center mt-6'>
            <button
              type='submit'
              className='block transition-all duration-300 ease-linear mx-auto shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white text-lg font-medium py-3 px-8 rounded-full'
            >
              Create an Appointment
            </button>
          </div>
        </form>
      </div>

      <div className='w-7/12 mx-auto flex items-center justify-between mt-5 mb-3'>
        <button
          onClick={() => (viewSalt ? setViewSalt(false) : setViewSalt(true))}
          className='px-4 py-2 text-yellow-700 rounded-md bg-yellow-200'
        >
          View Salt Report
        </button>
        <button
          onClick={() => (viewdia ? setViewDia(false) : setViewDia(true))}
          className='px-4 py-2 text-green-700 rounded-md bg-green-200'
        >
          View Diabetes Report
        </button>
      </div>

      <div
        className={`w-11/12 flex justify-center mb-8 mt-10 ${
          viewSalt ? `block` : `hidden`
        } `}
      >
        <table>
          <thead>
            <th className='text-md  font-semibold  tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600 '>
              <th className='px-4 py-3 '>Salt Report</th>
            </th>
            <tr className='text-md  font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600 '>
              <th className='px-4 py-3 '>Id</th>
              <th className='px-4 py-3 '>Name</th>
              <th className='px-4 py-3 '>Doctor</th>
              <th className='px-4 py-3 '>Glucose</th>
              <th className='px-4 py-3 '>Potassium</th>
              <th className='px-4 py-3 '>Urea</th>
              <th className='px-4 py-3 '>Calcium</th>
              <th className='px-4 py-3 '>Report Time</th>
            </tr>
          </thead>

          <tbody className='bg-white'>
            {salt.map(mov => (
              <tr
                className='text-gray-700 hover:bg-gray-100 text-center '
                key={mov.RepId}
              >
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.RepId}
                </td>
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.UserName}
                </td>
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.Doctor}
                </td>
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.Glucose}
                </td>
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.Potassium}
                </td>
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.Urea}
                </td>
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.Calcium}
                </td>
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.RepTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className={`w-11/12 flex justify-center mb-8 mt-10 ${
          viewdia ? `block` : `hidden`
        } `}
      >
        <table>
          <thead>
            <th className='text-md  font-semibold  tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600 '>
              <th className='px-4 py-3 '>Diabetes Report</th>
            </th>
            <tr className='text-md  font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600 '>
              <th className='px-4 py-3 '>Id</th>
              <th className='px-4 py-3 '>Name</th>
              <th className='px-4 py-3 '>Doctor</th>
              <th className='px-4 py-3 '>Glucose</th>
              <th className='px-4 py-3 '>Report Time</th>
            </tr>
          </thead>

          <tbody className='bg-white'>
            {dia.map(mov => (
              <tr
                className='text-gray-700 hover:bg-gray-100 text-center '
                key={mov.RepId}
              >
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.RepId}
                </td>
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.UserName}
                </td>
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.Doctor}
                </td>
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.Glucose}
                </td>
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {mov.RepTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;
