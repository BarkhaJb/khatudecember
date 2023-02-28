import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const DashTopArtist = () => {
  const [dashartist, setDashArtist] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [formvalue, setFormValue] = useState('');
  const [isAdd, setIsAdd] = useState(false);
  const [formImg, setFormImg] = useState('');
  const [addformvalue, setAddFormValue] = useState({
    artist: '',
  });

  const [addformimg, setaddformImg] = useState({
    files: '',
  });

  const submit = (artist) => {
    const data = artist._id;
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Delete',
          onClick: () =>
            axios.delete(`${process.env.REACT_APP_BASE_URL}/artist/${data}`).then(() => {
              const del = dashartist.filter((item) => artist !== item._id);
              setDashArtist(del);
              getAllSongs();
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

  const navigate = useNavigate();

  const navtoallartist = (artist) => {
    const dashartist = artist._id;
    navigate('/dashtopartistsong', { state: dashartist });
  };

  const editToggle = () => {
    setIsOpen(!isOpen);
  };
  const editreToggle = (artist) => {
    setIsOpen(!isOpen);
    setFormValue(artist);
  };
  const editAddToggle = () => {
    setIsAdd(!isAdd);
  };

  const getAllSongs = () => {
    const url = (`${process.env.REACT_APP_BASE_URL}/artist`);
    fetch(url)
      .then((response) => response.json())
      .then((json) => setDashArtist(json))
      .catch((error) => console.log(error));
  };

  const getAllSongsData = () => {
    const url = (`${process.env.REACT_APP_BASE_URL}/artist`);
    fetch(url)
      .then((response) => response.json())
      .then((json) => setDashArtist(json))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllSongs();
  }, []);

  const handleChangeData = async (event) => {
    setFormValue({
      ...formvalue,
      [event.target.name]: event.target.value,
    });
    console.log(formvalue);
  };

  const handleChangefile = (event) => {
    setFormImg(event.target.files);
    console.log(formImg);
  };

  const editsubmit = async (event) => {
    event.preventDefault();
    const formDataChange = new FormData();

    formDataChange.append('files', formImg[0]);

    formDataChange.append('data', JSON.stringify(formvalue));

    const res = await axios.put(
      (`${process.env.REACT_APP_BASE_URL}/artist/${formvalue._id}`),
      formDataChange
    );

    getAllSongs();
    editToggle();

    console.log('resresres', res);
  };
  // add

  const handleAddData = async (event) => {
    setAddFormValue({
      ...addformvalue,
      [event.target.name]: event.target.value,
    });
    console.log(addformvalue);
  };

  const handleAddDatafile = (event) => {
    setaddformImg(event.target.files);
    console.log(addformimg);
  };

  const AddAlbumName = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      formData.append('files', addformimg[0]);

      formData.append('data', JSON.stringify(addformvalue));

      const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/artist`, formData);
      console.log('REsult: ', result);
    } catch (error) {
      console.error(error);
    }

    getAllSongsData();
    editAddToggle();
  };

  return (
    <div>
      <div className='categorysec'>
        <div className='dashsec'>
          <div className='buttonsarea'>
            <div className='addalbumarea'>
              <button className='addalbum' onClick={editAddToggle}>
                add artist
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
                <p className='albumname albumhead'> singers</p>
              </div>
              <div className='albumnamearea '>
                <p className='albumname albumhead'> singer image</p>
              </div>

              <div className='spanarea'>
                <span className='albumicon'>
                  <p className='albumhead'>action</p>
                </span>
              </div>
            </li>
            {dashartist?.map((artist) => (
              <li className='list-group-item d-flex justify-content-between align-items-center albumlist'>
                <div className='albumnamearea'>
                  <p className='albumname'>{artist?.artist}</p>
                </div>
                <div className='albumnamearea '>
                  <img className='albumname albumdashimg' src={artist?.image} />
                </div>
                <div className='spanarea'>
                  <span className='albumicon'>
                    {/* <button
                      className='viewbtn'
                      onClick={(user) => navtoallartist(artist)}
                    >
                      view all
                    </button> */}
                    <button
                      className='edelbtn edit'
                      onClick={() => editreToggle(artist)}
                    >
                      Edit
                    </button>
                    <button className='edelbtn' onClick={() => submit(artist)}>
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
                      <label>artist name </label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        type='text'
                        name='artist'
                        value={formvalue?.artist}
                        className='catename'
                        autoFocus
                        onChange={handleChangeData}
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
                        onChange={handleChangefile}
                        className='cateimg'
                        name='files'
                        accept='image/png, image/gif, image/jpeg, image/webp'
                      />
                    </div>
                  </div>
                  <button className='submitbtn' onClick={(e) => editsubmit(e)}>
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
                <form
                  className='albumeditfm'
                  onSubmit={(e) => AddAlbumName(e)}
                  method='post'
                >
                  <div className='form-group'>
                    <div className='lablearea'>
                      <label>album name </label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        type='text'
                        autoFocus
                        name='artist'
                        className='catename'
                        onChange={handleAddData}
                        required
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
                        onChange={handleAddDatafile}
                        className='cateimg'
                        // id='files'
                        name='files'
                        accept='.png, .gif, .jpeg, .webp'
                        required
                      />
                    </div>
                  </div>
                  <input
                    className='submitbtn'
                    value='submit'
                    type='submit'
                  ></input>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashTopArtist;
