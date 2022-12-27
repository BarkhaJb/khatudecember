import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from 'axios';

const DashUpcomingEvent = () => {
  const [events, setEvents] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [formvalue, setFormValue] = useState({
    place: '',
    address: '',
    date: '',
    time: '',
  });

  const submit = (event) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {     
          label: 'Delete',
          onClick: () =>
            axios
              .delete(`http://localhost:3100/event/${event._id}`)

              .then(() => {
                const del = events.filter((item) => event !== item._id);
                setEvents(del);
                getAllSongsData();
                console.log('thisisdelete', del);
              }),
        },
        {
          label: 'Cancel',
          onClick: () => alert('Click No'),
        },
      ],
    });
  };

  const submitevent = async () => {
    const result = await axios
      .post('http://localhost:3100/event', {
        place: formvalue.place,
        address: formvalue.address,
        date: formvalue.date,
        time: formvalue.time,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    getAllSongsData();
  };

  const getAllSongsData = () => {
    const url = 'http://localhost:3100/event';
    fetch(url)
      .then((response) => response.json())
      .then((json) => setEvents(json))
      .catch((error) => console.log(error));
  };

  const editreToggle = async (event) => {
    setIsOpen(!isOpen);
    setFormValue(event);
  };

  const editToggle = () => {
    setIsOpen(!isOpen);
  };

  const editAddToggle = () => {
    setIsAdd(!isAdd);
  };

  useEffect(() => {
    getAllSongsData();
  }, []);

  const eventhandle = (event) => {
    setFormValue({
      ...formvalue,
      [event.target.name]: event.target.value,
    });
    console.log('this is event', events);
  };

  const editevent = async (formvalue) => {
    const res = await axios({
      method: 'put',
      url: `http://localhost:3100/event/${formvalue._id}`,
      data: {
        place: formvalue.place,
        address: formvalue.address,
        date: formvalue.date,
        time: formvalue.time,
      },
    });
    getAllSongsData();
  };

  return (
    <div>
      <div>
        <div className='categorysec'>
          <div className='dashsec'>
            <div className='buttonsarea'>
              <div className='addalbumarea'>
                <button className='addalbum' onClick={editAddToggle}>
                  add event
                </button>
              </div>
              <div className='addbackarea'>
                <button className='addback'>
                  <Link to='/dashboard' className='backlink'>
                    {' '}
                    <i class='fa fa-angle-left' aria-hidden='true'></i>Back
                  </Link>{' '}
                </button>
              </div>
            </div>
            <ul className='list-group list-group-flush albumul '>
              <li className='list-group-item d-flex justify-content-between align-items-center albumlist'>
                <div className='albumnamearea '>
                  <p className='albumname albumhead'>City</p>
                </div>

                <div className='albumnamearea '>
                  <p className='albumname albumhead'> Address</p>
                </div>

                <div className='albumnamearea '>
                  <p className='albumname albumhead'> Date </p>
                </div>
                <div className='albumnamearea '>
                  <p className='albumname albumhead'> Time</p>
                </div>

                <div className='spanarea'>
                  <span className='albumicon'>
                    <p className='albumhead'>action</p>
                  </span>
                </div>
              </li>

              {events?.map((event) => (
                <li className='list-group-item d-flex justify-content-between align-items-center albumlist'>
                  <div className='albumnamearea'>
                    <p className='albumname'>{event?.place}</p>
                  </div>

                  <div className='albumnamearea'>
                    <p className='albumname'>{event?.address} </p>
                  </div>

                  <div className='albumnamearea'>
                    <p className='albumname'>{event?.date}</p>
                  </div>

                  <div className='albumnamearea'>
                    <p className='albumname'>{event?.time}</p>
                  </div>

                  <div className='spanarea'>
                    <span className='albumicon'>
                      <button
                        className='edelbtn edit'
                        onClick={() => editreToggle(event)}
                      >
                        Edit
                      </button>
                      <button className='edelbtn' onClick={() => submit(event)}>
                        Delete
                      </button>
                    </span>
                    <span className='albumicon'></span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {isOpen && (
            <div className='box'>
              <div className='popup-box'>
                <span className='close-icon' onClick={editToggle}>
                  x
                </span>
                <div className='editformarea'>
                  <form className='albumeditfm'>
                    <div className='form-group'>
                      <div className='lablearea'>
                        <label>Event City</label>
                      </div>
                      <div className='inputarea'>
                        {' '}
                        <input
                          type='text'
                          name='place'
                          value={formvalue?.place}
                          className='catename'
                          autoFocus
                          onChange={eventhandle}
                        />
                      </div>
                    </div>

                    <div className='form-group'>
                      <div className='lablearea'>
                        <label>Place</label>
                      </div>
                      <div className='inputarea'>
                        {' '}
                        <input
                          type='text'
                          name='address'
                          value={formvalue?.address}
                          className='catename'
                          onChange={eventhandle}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='lablearea'>
                        <label>Date</label>
                      </div>
                      <div className='inputarea'>
                        {' '}
                        <input
                          type='text'
                          name='date'
                          value={formvalue?.date}
                          className='catename'
                          onChange={eventhandle}
                        />
                      </div>
                    </div>

                    <div className='form-group'>
                      <div className='lablearea'>
                        <label>Time</label>
                      </div>
                      <div className='inputarea'>
                        {' '}
                        <input
                          type='text'
                          name='time'
                          value={formvalue?.time}
                          className='catename'
                          onChange={eventhandle}
                        />
                      </div>
                    </div>

                    <button
                      className='submitbtn'
                      onClick={() => editevent(formvalue)}
                    >
                      submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {isAdd && (
            <div className='box'>
              <div className='popup-box'>
                <span className='close-icon' onClick={editAddToggle}>
                  x
                </span>
                <div className='editformarea'>
                  <form className='albumeditfm'>
                    <div className='form-group'>
                      <div className='lablearea'>
                        <label>Event City</label>
                      </div>
                      <div className='inputarea'>
                        {' '}
                        <input
                          type='text'
                          autoFocus
                          name='place'
                          className='catename'
                          onChange={eventhandle}
                        />
                      </div>

                      <label>Event Location </label>

                      <div className='inputarea'>
                        {' '}
                        <input
                          type='text'
                          autoFocus
                          name='address'
                          className='catename'
                          onChange={eventhandle}
                        />
                      </div>
                      <label>Event Date </label>
                      <div className='inputarea'>
                        {' '}
                        <input
                          type='text'
                          autoFocus
                          name='date'
                          className='catename'
                          onChange={eventhandle}
                        />
                      </div>
                      <label>Event Time </label>
                      <div className='inputarea'>
                        {' '}
                        <input
                          type='text'
                          autoFocus
                          name='time'
                          className='catename'
                          onChange={eventhandle}
                        />
                      </div>
                    </div>

                    <button className='submitbtn' onClick={() => submitevent()}>
                      submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashUpcomingEvent;
