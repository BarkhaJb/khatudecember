import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const DashTopPlaylist = () => {
  const [dashplay, setDashPlay] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [formImg, setFormImg] = useState('');
  const [formvalue, setFormValue] = useState('');
  const [addformvalue, setAddFormValue] = useState({
    title: '',
    playlist: '',
  });
  const [addformimg, setaddformImg] = useState({
    files: '',
  });

  const submit = (song) => {
    const data = song._id;
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Delete',
          onClick: () =>
            axios.delete(`${process.env.REACT_APP_BASE_URL}/playlist/${data}`).then(() => {
              const del = dashplay.filter((item) => song !== item._id);
              setDashPlay(del);
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

  const editToggle = () => {
    setIsOpen(!isOpen);
  };
  const editaddToggle = () => {
    setIsAdd(!isAdd);
  };

  const editreToggle = (song) => {
    setFormValue(song);
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const navtolistsongs = (song) => {
    const listSong = song._id;
    navigate('/listsongs', { state: listSong });
  };

  const newid = '6371f02af8f0e2b12a2aa226';
  const getAllSongs = () => {
    const url = (`${process.env.REACT_APP_BASE_URL}/playlist`);
    fetch(url)
      .then((response) => response.json())
      .then((json) => json.filter((item) => item.playlist !== 'new release'))
      .then((json) => {
        setDashPlay(json);
      })
      .catch((error) => console.log(error));
  };
  // const getAllSongsData = () => {
  //   const url = `http://localhost:3100/playlist`;
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((json) => setDashPlay(json))

  //     .catch((error) => console.log(error));
  // };

  useEffect(() => {
    getAllSongs();
  }, []);

  //  edit
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
      (`${process.env.REACT_APP_BASE_URL}/playlist/${formvalue._id}`),
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

      const result = await axios.post(
        (`${process.env.REACT_APP_BASE_URL}/playlist/`,
        formData
      ));
      console.log('REsult: ', result);
    } catch (error) {
      console.error(error);
    }

    getAllSongs();
    editaddToggle();
  };

  return (
    <div>
      <div className='categorysec'>
        <div className='dashsec'>
          <div className='buttonsarea'>
            <div className='addalbumarea'>
              <button className='addalbum' onClick={editaddToggle}>
                add Playlist
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
                <p className='albumname albumhead'> Playlist</p>
              </div>
              <div className='albumnamearea '>
                <p className='albumname albumhead'> Playlist Image</p>
              </div>

              <div className='spanarea'>
                <span className='albumicon'>
                  <p className='albumhead'>action</p>
                </span>
              </div>
            </li>
            {dashplay?.map((song) => (
              <li className='list-group-item d-flex justify-content-between align-items-center albumlist'>
                <div className='albumnamearea'>
                  <p className='albumname'>{song?.playlist}</p>
                </div>
                <div className='albumnamearea '>
                  <img className='albumname albumdashimg' src={song?.image} />
                </div>

                <div className='spanarea'>
                  <span className='albumicon'>
                    <button
                      className='viewbtn'
                      onClick={(user) => navtolistsongs(song)}
                    >
                      view all
                    </button>
                    <button
                      className='edelbtn edit'
                      onClick={() => editreToggle(song)}
                    >
                      Edit
                    </button>
                    <button className='edelbtn' onClick={() => submit(song)}>
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
                      <label>playlist name </label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        name='playlist'
                        type='text'
                        className='catename'
                        value={formvalue?.playlist}
                        onChange={handleChangeData}
                      />
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='lablearea'>
                      {' '}
                      <label>title </label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        name='title'
                        className='catetitle'
                        type='text'
                        value={formvalue?.title}
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
                        className='cateimg'
                        name='files'
                        onChange={handleChangefile}
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
              <span className='close-icon' onClick={editaddToggle}>
                x
              </span>
              <div className='editformarea'>
                <form
                  className='albumeditfm'
                  method='post'
                  onSubmit={(e) => AddAlbumName(e)}
                >
                  <div className='form-group'>
                    <div className='lablearea'>
                      <label>playlist name </label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        type='text'
                        autoFocus
                        name='playlist'
                        className='catename'
                        onChange={handleAddData}
                        required
                      />
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='lablearea'>
                      {' '}
                      <label>title </label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        type='text'
                        name='title'
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
                        //id='files'
                        name='files'
                        accept='.png, .gif, .jpeg, .webp'
                        required
                      />
                    </div>
                  </div>
                  <input
                    className='submitbtn'
                    type='submit'
                    value='submit'
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

export default DashTopPlaylist;
