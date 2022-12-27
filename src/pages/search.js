import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import resultnotfnd from '../Components/assets/images/searchnot.png';
import {Link} from "react-router-dom";

const SearchContent = ({ setMusicTracks, setTrackIndex }) => {
  const [search, setSearch] = useState([]);
  const[superData, setSuperData]= useState();
  const[emptyData, setEmptyData]= useState(false)


  const location = useLocation();
  // console.log(location.state);


  useEffect(() => {
    if (location && location.state) {
      const searchValue = location.state;
      const url = `https://khatuwaleshyam.com:3100/search/${searchValue}`;
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          const parsedData = json.map((item) => {
            return { src: item.song, name: item.track, id: item._id };
          });
          // console.log('PARSED', parsedData);
          setSuperData(parsedData);
          setSearch(json);
          setEmptyData(false)
        }).catch(() => {
          setEmptyData(true)
        })

    }
  }, [location, location.state, setMusicTracks]);
  // console.log('this is search', search);

  const ChangeCurrentSong = (index) => {
    setTrackIndex(index);
    setMusicTracks(superData);
    // console.log('this is song index---->', index);
  };
 

  return (
    <div className="seacharea">
      <div className="Search-result"><h2> Searched Result</h2></div>
      {!emptyData ? (
    <div className='ul-song'>
      <ul className='card-area'>
        {search?.map((user, index) => (
          <li className='card trnd-hv'>
            <img src={user.image} onClick={() => ChangeCurrentSong(index)}/>
            <div className='song-name'>
              <p>{user.track}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
      ) : (  <div className="searchntfnd">
        <img src={resultnotfnd} className="searchntfndsize" />
        <Link to="/" className="searchback"> <button className="backhome">Go to home</button></Link>
              </div>)}
    </div>
  );
};

export default SearchContent;