import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const DashListSong = () => {
  const [alldashlistsong, setAllDashListSong] = useState();
  const location = useLocation();
  const listSong = location.state;

  console.log('this is state', location.state);
  useEffect(() => {
    const url = (`${process.env.REACT_APP_BASE_URL}/playlist/songs/${listSong}`);
    fetch(url)
      .then((response) => response.json())
      .then((json) => setAllDashListSong(json))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className='dashsec'>
        <div className='buttonsarea'>
          {/* <div className='addalbumarea'>
            <button className='addalbum'>add playlist</button>
          </div> */}
          <div className='addbackarea'>
            <button className='backlinkalbum'>
              <Link to='/dashtoplist' className='backlink'>
                <i class='fa fa-angle-left' aria-hidden='true'></i>Back
              </Link>
            </button>
          </div>
        </div>
        <ul className='list-group list-group-flush albumul '>
          <li className='list-group-item d-flex justify-content-between align-items-center albumlist'>
            <div className='albumnamearea '>
              <p className='albumname albumhead'> Playlist</p>
            </div>
            <div className='singpara'>
              <p className='singername albumhead'>singer</p>
            </div>
             <div className='singpara'>
              <p className='singername albumhead'>song image</p>
            </div>
            <div className='spanarea'>
              {/* <span className='albumicon'>
                <p className='albumhead'>action</p>
              </span> */}
            </div>
          </li>
          {alldashlistsong?.map((songs) => (
            <li className='list-group-item d-flex justify-content-between align-items-center albumlist'>
              <div className='albumnamearea'>
                <p className='albumname'>{songs?.track}</p>
              </div>
              <div className='singpara'>
                <p className='singername'>{songs?.artist}</p>
              </div>
              <div className='singpara'>
                <img className='singername albumdashimg' src={songs?.image} />
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
          {/* {alldashlistsong?.map((songs) => (
            <li className='list-group-item d-flex justify-content-between align-items-center albumlist'>
              <div className='albumnamearea'>
                <p className='albumname'>{songs?.track}</p>
              </div>
              <div className='singpara'>
                <p className='singername'>{songs?.artist}</p>
              </div>
              <div className='singpara'>
                <img className='singername albumdashimg' src={songs?.image} />
              </div>
              
              {/* <div className='spanarea'>
                <span className='albumicon'>
                  <button className='edelbtn edit'>edit</button>
                </span>
                <span className='albumicon'>
                  <button className='edelbtn'>delete</button>
                </span>
              </div> */}
            {/* </li> */}
          {/* ))} */} 
        </ul>
      </div>
    </div>
  );
};

export default DashListSong;
