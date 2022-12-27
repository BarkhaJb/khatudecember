import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useLocation, Link } from 'react-router-dom';

const DashAlbumsongs = () => {
  const [allsongs, setAllSongs] = useState();
  // const [data, setData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [dontchange, setDontChange] = useState();
  const [formvalue, setFormValue] = useState('');
  const [addformvalue, setAddFormValue] = useState({
    track: '',
    image: '',
    category: '',
  });

  const location = useLocation();
  const data = location.state;

  // const dontchange = async () => {

  //   setData(pathpath);
  //   console.log('lalala', data);
  // };

  // useEffect(() => {
  //   const url = ``;
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((json) => setAllSongs(json))
  //     .catch((error) => console.log(error));
  // }, []);

  const editreToggle = async (song) => {
    setIsOpen(!isOpen);
    setFormValue(song);
  };

  useEffect(() => {
    // dontchange();
    getAllSongs();
  });

  const editsubmit = async (formvalue) => {
    debugger;
    console.log('this is formvalue', formvalue._id);

    const res = await axios.put(
      `http://localhost:3100/songs/${formvalue._id}`,
      {
        track: formvalue.track,
        image: formvalue.image,
        method: 'PUT',
        body: JSON.stringify(),
        headers: { 'content-type': 'multipart/form-data' },
      }
    );

    getAllSongs();
  };

  const handleChangeData = async (event) => {
    setFormValue({
      ...formvalue,
      [event.target.name]: event.target.value,
    });
  };

  const getAllSongs = async () => {
    const url = `http://localhost:3100/category/songs/${data}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setAllSongs(json))
      .catch((error) => console.log(error));
  };
  const editToggle = () => {
    setIsOpen(!isOpen);
  };

  const editAddToggle = () => {
    setIsAdd(!isAdd);
  };

  const handleAddData = async (event) => {
    setAddFormValue({
      ...addformvalue,
      [event.target.name]: event.target.value,
    });
    console.log(addformvalue);
  };

  const submit = (song) => {
    const data = song._id;
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Delete',
          onClick: () =>
            axios
              .delete(`http://localhost:3100/songs/${data}`)

              .then(() => {
                const del = allsongs.filter((item) => song !== item._id);
                setAllSongs(del);
                // getAllSongs();
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

  return (
    <div>
      <div className='dashsec'>
        <div className='buttonsarea'>
          <div className='addalbumarea'>
            {/* <button className='addalbum'>add song</button> */}
          </div>
          <div className='addbackarea'>
            <button className='addback'>
              <Link to='/albums' className='backlink'>
                <i class='fa fa-angle-left' aria-hidden='true'></i>Back
              </Link>
            </button>
          </div>
        </div>
        <ul className='list-group list-group-flush albumul '>
          <li className='list-group-item d-flex justify-content-between align-items-center albumlist'>
            <div className='albumnamearea '>
              <p className='albumname albumhead'> album songs</p>
            </div>
            <div className='singpara'>
              <p className='singername albumhead'>singer</p>
            </div>
            <div className='singpara'>
              <p className='singername albumhead'>song image</p>
            </div>
            <div className='spanarea'>
              <span className='albumicon'>
                {/* <p className='albumhead'>action</p> */}
              </span>
            </div>
          </li>
          {allsongs?.map((song) => (
            <li className='list-group-item d-flex justify-content-between align-items-center albumlist'>
              <div className='albumnamearea'>
                <p className='albumname'>{song?.track}</p>
              </div>
              <div className='singpara'>
                <p className='singername'>{song?.artist}</p>
              </div>
              <div className='singpara'>
                <img className='singername albumdashimg' src={song?.image} />
              </div>
              <div className='spanarea'>
                <span className='albumicon'>
                  {/* <button
                    className='edelbtn edit'
                    onClick={() => editreToggle(song)}
                  >
                    edit
                  </button> */}
                </span>
                <span className='albumicon'>
                  {/* <button className='edelbtn' onClick={() => submit(song)}>
                    delete
                  </button> */}
                </span>
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
                    <label>album name </label>
                  </div>
                  <div className='inputarea'>
                    {' '}
                    <input
                      type='text'
                      name='track'
                      onChange={handleChangeData}
                      value={formvalue?.track}
                      className='catename'
                      autoFocus
                    />
                  </div>
                </div>

                <div className='form-group'>
                  <div className='lablearea'>
                    {' '}
                    <label> Image File</label>
                  </div>
                  <div className='inputarea'>
                    {' '}
                    <input
                      type='file'
                      onChange={handleChangeData}
                      className='cateimg'
                      name='image'
                      accept='image/png, image/gif, image/jpeg'
                    />
                  </div>
                </div>
                <button
                  className='submitbtn'
                  onClick={() => editsubmit(formvalue)}
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
                    <label>album name </label>
                  </div>
                  <div className='inputarea'>
                    {' '}
                    <input
                      type='text'
                      name='track'
                      className='catename'
                      autoFocus
                      onChange={handleAddData}
                    />
                  </div>
                </div>

                <div className='form-group'>
                  <div className='lablearea'>
                    {' '}
                    <label> Image File</label>
                  </div>
                  <div className='inputarea'>
                    {' '}
                    <input
                      type='file'
                      onChange={handleAddData}
                      className='cateimg'
                      name='image'
                      accept='image/png, image/gif, image/jpeg'
                    />
                    <label> Category</label>
                    <input
                      type='text'
                      onChange={handleAddData}
                      className='cateimg'
                      name='category'
                    />
                  </div>
                </div>
                <button type='submit' className='submitbtn'>
                  submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashAlbumsongs;
