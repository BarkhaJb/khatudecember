import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const DashTrend = () => {
  const [dashtrendsong, setDashTrendSong] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [addformvalue, setAddFormValue] = useState({
    artist: '',
    track: '',
    duration: '',
    song: '',
    image: '',
  });
  const [addformimg, setaddformImg] = useState({
    files: '',
    audio: '',
  });
  const [isAdd, setIsAdd] = useState(false);
  const [suggestartist, setSuggestArtist] = useState();

  const submit = (song) => {
    const data = song._id;
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Delete',
          onClick: () =>
            axios.delete(`http://localhost:3100/trending/${data}`).then(() => {
              const del = dashtrendsong.filter((item) => song !== item._id);
              setDashTrendSong(del);
              getAllSongs();
              console.log(del);
            }),
        },
        {
          label: 'Cancel',
          onClick: () => alert('Click No'),
        },
      ],
    });
  };

  const editAddToggle = () => {
    setIsAdd(!isAdd);
  };

  const editreToggle = (song) => {
    setAddFormValue({
      track: song.track,
      artist: song.artist,
      id: song._id,
      duration: song.duration,
      song: song.song,
      image: song.image,
    });

    setIsOpen(!isOpen);
  };

  const getAllSongs = () => {
    const url = 'http://localhost:3100/trending';
    fetch(url)
      .then((response) => response.json())
      .then((json) => setDashTrendSong(json))
      .catch((error) => console.log(error));
  };

  const selectartist = () => {
    const url = `http://localhost:3100/artist`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setSuggestArtist(json))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllSongs();
    selectartist();
  }, []);

  const handleAddData = async (event) => {
    setAddFormValue({
      ...addformvalue,
      [event.target.name]: event.target.value,
    });
    console.log(addformvalue);
  };
  const handleAddDatafile = (event) => {
    setaddformImg({
      ...addformimg,
      [event.target.name]: event.target.files,
    });
    //setaddformImg(event.target.files[0]);
    console.log(addformimg);
  };

  const AddAlbumName = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      //formData.append("audio", addformsong);
      formData.append('files', addformimg.files[0]);
      formData.append('files', addformimg.audio[0]);
      formData.append('data', JSON.stringify(addformvalue));
      console.log(formData);

      const result = await axios.post(
        'http://localhost:3100/trending',
        formData
      );
      console.log('REsult: ', result);
    } catch (error) {
      console.error(error);
    }
    getAllSongs();
    editAddToggle();
  };

  const editToggle = () => {
    setIsOpen(!isOpen);
  };

  const editToggleAdd = () => {
    setIsAdd(!isAdd);
  };

  const handleChangeData = async (event) => {
    setAddFormValue({
      ...addformvalue,

      [event.target.name]: event.target.value,
    });
    console.log(addformvalue);
  };
  const handleChangefile = async (event) => {
    setaddformImg({
      ...addformimg,

      [event.target.name]: event.target.files,
    });
    console.log(addformimg);
  };

  const editsubmit = async (event) => {
    event.preventDefault();
    const formDataChange = new FormData();

    formDataChange.append('files', addformimg.files[0]);
    formDataChange.append('files', addformimg.audio[0]);

    formDataChange.append('data', JSON.stringify(addformvalue));
    console.log(formDataChange);

    const res = await axios.put(
      `http://localhost:3100/trending/${addformvalue.id}`,
      formDataChange
    );

    getAllSongs();
    editToggle();
    console.log('resresres', res);
  };

  return (
    <div>
      <div className='categorysec'>
        <div className='dashsec'>
          <div className='buttonsarea'>
            <div className='addalbumarea'>
              <button className='addalbum' onClick={editToggleAdd}>
                add new bhajan
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
                <p className='albumname albumhead'> Trending Bhajans</p>
              </div>
              <div className='albumnamearea '>
                <p className='albumname albumhead'>Artist</p>
              </div>
              <div className='albumnamearea '>
                <p className='albumname albumhead'>Artist image</p>
              </div>
              <div className='albumnamearea '>
                <p className='albumname albumhead'>Song</p>
              </div>

              <div className='spanarea'>
                <span className='albumicon'>
                  <p className='albumhead'>action</p>
                </span>
              </div>
            </li>
            {dashtrendsong?.map((song) => (
              <li className='list-group-item d-flex justify-content-between align-items-center albumlist'>
                <div className='albumnamearea'>
                  <p className='albumname'>{song?.track}</p>
                </div>
                <div className='albumnamearea'>
                  <p className='albumname'>{song?.artist}</p>
                </div>
                <div className='albumnamearea '>
                  <img className='albumname albumdashimg' src={song?.image} />
                </div>

                <div className='albumnamearea'>
                  <p className='albumname'>{song?.song}</p>
                </div>

                <div className='spanarea'>
                  <span className='albumicon'>
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
                      <label>track </label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        type='text'
                        className='catename'
                        value={addformvalue.track}
                        onChange={handleChangeData}
                        name='track'
                      />
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='lablearea'>
                      {' '}
                      <label>artist </label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <select
                        className='catename'
                        onChange={handleChangeData}
                        //value={addformvalue?.artist}
                        name='artist'
                      >
                        <option>{addformvalue?.artist}</option>
                        {suggestartist.map((artist) => (
                          <option>{artist.artist}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='lablearea'>
                      {' '}
                      <label>duration</label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        className='catetitle'
                        type='text'
                        value={addformvalue?.duration}
                        onChange={handleChangeData}
                        name='duration'
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
                        accept='.png, .gif, .jpeg'
                        onChange={handleChangefile}
                      />
                    </div>
                  </div>

                  <div className='form-group'>
                    <div className='lablearea'>
                      {' '}
                      <label>song</label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        className='catetitle'
                        type='file'
                        onChange={handleChangefile}
                        name='audio'
                        accept='.mp3, .mpeb'
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
                  method='post'
                  onSubmit={(e) => AddAlbumName(e)}
                >
                  <div className='form-group'>
                    <div className='lablearea'>
                      <label>track </label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        type='text'
                        className='catename'
                        onChange={handleAddData}
                        name='track'
                        required
                      />
                    </div>
                  </div>

                  <div className='form-group'>
                    <div className='lablearea'>
                      {' '}
                      <label>artist</label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <select
                        className='catetitle'
                        type='text'
                        onChange={handleAddData}
                        name='artist'
                        required
                      >
                        <option>Select</option>
                        {suggestartist.map((artist) => (
                          <option> {artist.artist}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='lablearea'>
                      {' '}
                      <label>song</label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        className='catetitle'
                        type='file'
                        onChange={handleAddDatafile}
                        name='audio'
                        accept='.mp3 , .mpeg'
                        required
                      />
                    </div>
                  </div>

                  <div className='form-group'>
                    <div className='lablearea'>
                      {' '}
                      <label>duration</label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        className='catetitle'
                        type='text'
                        onChange={handleAddData}
                        name='duration'
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
                        onChange={handleAddDatafile}
                        type='file'
                        className='cateimg'
                        name='files'
                        accept='.png, .gif, .jpeg , .jpg, .webp'
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

export default DashTrend;
