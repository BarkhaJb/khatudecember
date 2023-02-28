import React, { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate, Link } from "react-router-dom";

const DashAllsong = () => {
  const [dashallbhajan, setDashAllBhajan] = useState();
  const [isOpen, setIsOpen] = useState(false);
  //const [formvalue, setFormValue] = useState('');
  const [isAdd, setIsAdd] = useState(false);
  //const [formImg, setFormImg] = useState('');
  //const[formaudio,setFormAudio]=useState("")
  const [addformvalue, setAddFormValue] = useState({
    artist: "",
    track: "",
    duration: "",
    category: "",
    playlist: "",
    song: "",
    image: "",
  });
  const [addformimg, setaddformImg] = useState({
    files: "",
    audio: "",
  });
  // const [addformsong, setaddformSong] = useState({

  //  audio : '',
  // });

  const [suggestartist, setSuggestArtist] = useState();
  const [suggestplaylist, setSuggestPlaylist] = useState();
  const [suggestcategory, setSuggestCategory] = useState();

  const selectartist = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/artist`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setSuggestArtist(json))
      .catch((error) => console.log(error));
  };
  const selectPlaylist = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/playlist`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setSuggestPlaylist(json))
      .catch((error) => console.log(error));
  };
  const selectCategory = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/category`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setSuggestCategory(json))
      .catch((error) => console.log(error));
  };
  const submit = (song) => {
    const data = song._id;
    console.log(data);
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Delete",
          onClick: () =>
            axios
              .delete(`${process.env.REACT_APP_BASE_URL}/songs/${data}`)

              .then(() => {
                const del = dashallbhajan.filter((item) => song !== item._id);
                setDashAllBhajan(del);
                getAllSongs();
                console.log("thisisdelete", del);
              }),
        },
        {
          label: "Cancel",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };
  const editToggle = () => {
    setIsOpen(!isOpen);
  };

  const editAddToggle = () => {
    setIsAdd(!isAdd);
  };

  const editreToggle = (song) => {
    setIsOpen(!isOpen);
    setAddFormValue({
      track: song.track,
      artist: song.artist,
      id: song._id,
      duration: song.duration,
      song: song.song,
      image: song.image,
      playlist: song.playlist,
      category: song.category,
    });
  };

  const getAllSongs = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/songs`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setDashAllBhajan(json))
      .catch((error) => console.log(error));
  };

  const getAllSongsData = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/songs`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setDashAllBhajan(json))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAllSongs();
    selectartist();
    selectCategory();
    selectPlaylist();
  }, []);

  // edit
  const handleChangeData = async (event) => {
    setAddFormValue({
      ...addformvalue,

      [event.target.name]: event.target.value,
    });
    console.log(addformvalue);
  };
  const handleChangefile = (event) => {
    setaddformImg({
      ...addformimg,
      [event.target.name]: event.target.files,
    });
    //setaddformImg(event.target.files[0]);
    console.log(addformimg);
  };
  const editsubmit = async (event) => {
    event.preventDefault();
    const formDataChange = new FormData();

    formDataChange.append("files", addformimg.files[0]);
    formDataChange.append("audio", addformimg.audio[0]);

    formDataChange.append("data", JSON.stringify(addformvalue));
    console.log(formDataChange);

    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/songs/${addformvalue.id}`,
      formDataChange
    );

    editToggle();
    getAllSongs();
    editToggle();
    console.log("resresres", res);
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
      formData.append("files", addformimg.files[0]);
      formData.append("files", addformimg.audio[0]);
      formData.append("data", JSON.stringify(addformvalue));
      console.log(formData);

      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/songs`,
        formData
      );
      console.log("REsult: ", result);
    } catch (error) {
      console.error(error);
    }
    editAddToggle();
    getAllSongsData();
    editAddToggle();
  };

  const [search, setSearch] = useState();

  const getallbhajansearch = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/search/${search}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setDashAllBhajan(json))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="categorysec">
        <div className="dashsec">
          <div className="buttonsarea">
            <div className="addalbumarea">
              <button className="addalbum" onClick={editAddToggle}>
                add new bhajan
              </button>
            </div>
            <div className="addalbumarea">
              <input
                className="searchin"
                type="text"
                placeholder="Search Bhajans"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              ></input>
              <button className="addalbum" onClick={() => getallbhajansearch()}>
                search
              </button>
            </div>

            <div className="addbackarea">
              <button className="addback">
                <Link to="/dashboard" className="backlink">
                  {" "}
                  <i class="fa fa-angle-left" aria-hidden="true"></i>Back
                </Link>{" "}
              </button>
            </div>
          </div>
          <ul className="list-group list-group-flush albumul ">
            <li className="list-group-item d-flex justify-content-between align-items-center albumlist">
              <div className="albumnamearea ">
                <p className="albumname albumhead"> All bhajans</p>
              </div>
              <div className="albumnamearea ">
                <p className="albumname albumhead">Artist</p>
              </div>

              <div className="albumnamearea ">
                <p className="albumname albumhead">Image</p>
              </div>

              <div className="spanarea">
                <span className="albumicon">
                  <p className="albumhead">action</p>
                </span>
              </div>
            </li>
            {dashallbhajan?.map((song) => (
              <li className="list-group-item d-flex justify-content-between align-items-center albumlist">
                <div className="albumnamearea">
                  <p className="albumname">{song?.track}</p>
                </div>
                <div className="albumnamearea">
                  <p className="albumname">{song?.artist}</p>
                </div>

                <div className="albumnamearea">
                  <img className="albumname albumdashimg" src={song?.image} />
                </div>

                <div className="spanarea">
                  <span className="albumicon">
                    <button
                      className="edelbtn edit"
                      onClick={() => editreToggle(song)}
                    >
                      Edit
                    </button>
                    <button className="edelbtn" onClick={() => submit(song)}>
                      Delete
                    </button>
                  </span>
                  <span className="albumicon"></span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {isOpen && (
          <div className="box">
            <div className="popup-box">
              <span className="close-icon" onClick={editToggle}>
                x
              </span>
              <div className="editformarea">
                <form className="albumeditfm">
                  <div className="form-group">
                    <div className="lablearea">
                      <label>track </label>
                    </div>
                    <div className="inputarea">
                      {" "}
                      <input
                        type="text"
                        className="catename"
                        onChange={handleChangeData}
                        value={addformvalue?.track}
                        name="track"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="lablearea">
                      <label>category </label>
                    </div>
                    <div className="inputarea">
                      {" "}
                      <select
                        type="text"
                        className="catename"
                        onChange={handleChangeData}
                        value={addformvalue?.category}
                        name="category"
                      >
                        <option>Select</option>
                        {/* <option>{addformvalue?.category}</option> */}
                        {suggestcategory.map((artist) => (
                          <option> {artist.category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="lablearea">
                      {" "}
                      <label>artist</label>
                    </div>
                    <div className="inputarea">
                      {" "}
                      <select
                        className="catetitle"
                        type="text"
                        //value={formvalue?.artist}
                        onChange={handleChangeData}
                        name="artist"
                      >
                        <option>{addformvalue?.artist}</option>
                        {suggestartist.map((artist) => (
                          <option> {artist.artist}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="lablearea">
                      {" "}
                      <label>song</label>
                    </div>
                    <div className="inputarea">
                      {" "}
                      <input
                        className="catetitle"
                        type="file"
                        onChange={handleChangefile}
                        name="audio"
                        accept=".mp3"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="lablearea">
                      <label>playlist </label>
                    </div>
                    <div className="inputarea">
                      {" "}
                      <select
                        type="text"
                        className="catename"
                        onChange={handleChangeData}
                        value={addformvalue?.playlist}
                        name="playlist"
                      >
                        <option>Select</option>
                        {suggestplaylist.map((artist) => (
                          <option> {artist.playlist}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="lablearea">
                      {" "}
                      <label>duration</label>
                    </div>
                    <div className="inputarea">
                      {" "}
                      <input
                        className="catetitle"
                        type="text"
                        value={addformvalue?.duration}
                        onChange={handleChangeData}
                        name="duration"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="lablearea">
                      {" "}
                      <label> Image File</label>
                    </div>
                    <div className="inputarea">
                      {" "}
                      <input
                        onChange={handleChangefile}
                        type="file"
                        className="cateimg"
                        name="files"
                        accept=".png, .gif, .jpeg, .webp"
                      />
                    </div>
                  </div>
                  <button className="submitbtn" onClick={(e) => editsubmit(e)}>
                    submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        {isAdd && (
          <div className="box">
            <div className="popup-box">
              <span className="close-icon" onClick={editAddToggle}>
                x
              </span>
              <div className="editformarea">
                <form className="albumeditfm">
                  <div className="form-group">
                    <div className="lablearea">
                      <label>track </label>
                    </div>
                    <div className="inputarea">
                      {" "}
                      <input
                        type="text"
                        className="catename"
                        onChange={handleAddData}
                        name="track"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="lablearea">
                      {" "}
                      <label>category</label>
                    </div>
                    <div className="inputarea">
                      {" "}
                      <select
                        className="catetitle"
                        type="text"
                        onChange={handleAddData}
                        name="category"
                      >
                        <option>Select</option>
                        {suggestcategory.map((artist) => (
                          <option> {artist.category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="lablearea">
                      {" "}
                      <label>artist</label>
                    </div>
                    <div className="inputarea">
                      {" "}
                      <select
                        className="catetitle"
                        type="text"
                        onChange={handleAddData}
                        name="artist"
                      >
                        <option>Select</option>
                        {suggestartist.map((artist) => (
                          <option> {artist.artist}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="lablearea">
                      {" "}
                      <label>song</label>
                    </div>
                    <div className="inputarea">
                      {" "}
                      <input
                        className="catetitle"
                        type="file"
                        onChange={handleAddDatafile}
                        name="audio"
                        accept=".mp3 , .mpeg"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="lablearea">
                      {" "}
                      <label>playlist</label>
                    </div>
                    <div className="inputarea">
                      {" "}
                      <select
                        className="catetitle"
                        type="text"
                        onChange={handleAddData}
                        name="playlist"
                      >
                        <option>Select</option>
                        {suggestplaylist.map((artist) => (
                          <option> {artist.playlist}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="lablearea">
                      {" "}
                      <label>duration</label>
                    </div>
                    <div className="inputarea">
                      {" "}
                      <input
                        className="catetitle"
                        type="text"
                        onChange={handleAddData}
                        name="duration"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="lablearea">
                      {" "}
                      <label> Image File</label>
                    </div>
                    <div className="inputarea">
                      {" "}
                      <input
                        onChange={handleAddDatafile}
                        type="file"
                        className="cateimg"
                        name="files"
                        accept="image/png, image/gif, image/jpeg , image/jpg, image/webp"
                      />
                    </div>
                  </div>
                  <button
                    className="submitbtn"
                    onClick={(e) => AddAlbumName(e)}
                  >
                    submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashAllsong;
