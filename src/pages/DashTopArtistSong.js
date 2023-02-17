import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const DashTopArtistSong = () => {
  const [alltopartistsong, setAllTopArtistSong] = useState();
  const location = useLocation();
  const topSong = location.state;

  useEffect(() => {
    const url = (`${process.env.REACT_APP_BASE_URL}/artist/songs/${topSong}`);
    fetch(url)
      .then((response) => response.json())
      .then((json) => setAllTopArtistSong(json))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className='dashsec'>
        <div className='buttonsarea'>
          <div className='addalbumarea'>
            <button className='addalbum'>add playlist</button>
          </div>
          <div className='addbackarea'>
            <button className='addback'>
              <Link to='/dashartist' className='backlink'>
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
              <p className='singername albumhead'>duration</p>
            </div>
            {/* <div className='spanarea'>
              <span className='albumicon'>
                <p className='albumhead'>action</p>
              </span>
            </div> */}
          </li>
          {alltopartistsong?.map((songs) => (
            <li className='list-group-item d-flex justify-content-between align-items-center albumlist'>
              <div className='albumnamearea'>
                <p className='albumname'>{songs?.track}</p>
              </div>
              <div className='singpara'>
                <p className='singername'>{songs?.duration}</p>
              </div>
              {/* <div className='spanarea'>
                <span className='albumicon'>
                  <button className='edelbtn edit'>edit</button>
                </span>
                <span className='albumicon'>
                  <button className='edelbtn'>delete</button>
                </span>
              </div> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashTopArtistSong;
