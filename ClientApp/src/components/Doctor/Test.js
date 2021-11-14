import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { AiFillDelete } from 'react-icons/ai';
import Backdrop from '../BackDrop';
import Salt from './Salt';
import Diabetes from './Diabetes';

function Test() {
  const [tests, setTests] = useState([]);
  const [salt, setsalt] = useState(false);
  const [dia, setdia] = useState(false);

  const refreshList = () => {
    fetch(process.env.REACT_APP_API + 'appointments')
      .then(response => response.json())
      .then(data => {
        setTests(data);
        console.log(tests);
      });
  };

  useEffect(() => {
    refreshList();
  }, []);

  return (
    <div>
      {salt && (
        <Backdrop loading={false}>
          <Salt setsalt={setsalt} />
        </Backdrop>
      )}
      {dia && (
        <Backdrop loading={false}>
          <Diabetes setdia={setdia} />
        </Backdrop>
      )}
      <table className='w-11/12 mx-auto'>
        <thead>
          <tr className='text-md  font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600 '>
            <th className='px-4 py-3 '>Id</th>
            <th className='px-4 py-3 '>Patient Name</th>
            <th className='px-4 py-3 '>Patient Email</th>
            <th className='px-4 py-3 '>Doctor</th>
            <th className='px-1 py-3 '>Test</th>
            <th className='px-1 py-3 '>Appointment Date</th>
            <th className='px-1 py-3 '>Appointment Time</th>
            <th className='px-1 py-3 '>Delete</th>
          </tr>
        </thead>

        <tbody className='bg-white'>
          {tests.map(mov => (
            <tr
              className='text-gray-700 hover:bg-gray-100 text-center '
              key={mov.MovieId}
            >
              <td className='px-4 py-3 text-ms font-semibold border'>
                {mov.ApId}
              </td>
              <td className='px-4 py-3 text-ms font-semibold border'>
                {mov.UserName}
              </td>
              <td className='px-4 py-3 text-ms font-semibold border'>
                {mov.UserEmail}
              </td>
              <td className='px-4 py-3 text-ms font-semibold border'>
                {mov.Doctor}
              </td>
              <td className='px-4 py-3 text-ms font-semibold border'>
                {mov.Test}
              </td>
              <td className='px-4 py-3 text-ms font-semibold border'>
                {moment(mov.ApDate).format('L')}
              </td>
              <td className='px-4 py-3 text-ms font-semibold border'>
                {mov.ApTime}
              </td>
              <td className='px-4 py-3 text-ms font-semibold border'>
                <button className='py-1 text-white text-lg px-2 bg-red-500 mx-1 rounded-full  '>
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='w-4/12 mx-auto flex items-center justify-between mt-3'>
        <button
          onClick={() => setsalt(true)}
          className='px-4 py-2 text-yellow-700 rounded-md bg-yellow-200'
        >
          Salt Test
        </button>
        <button
          onClick={() => setdia(true)}
          className='px-4 py-2 text-green-700 rounded-md bg-green-200'
        >
          Diabetes Test
        </button>
      </div>
    </div>
  );
}

export default Test;
