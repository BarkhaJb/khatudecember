import React, { useEffect,useState } from 'react';
import release1 from '../Components/assets/images/All bhajans.png';
import bgimg from '../Components/assets/images/play-bg.gif'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'


const AllSongs = ({ setMusicTracks, setTrackIndex ,audiofunction, isPlaying, setIsPlaying, isPlay, selectStyle, setSelectStyle}) => {
    const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

 
  const [songs, setSongs] = React.useState([]);
  const [superData , setSuperData] = useState();

 


  useEffect(() => {
    const url = `https://khatuwaleshyam.com:3100/songs`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
       
        // console.log('CONSOLE', json);
        const parsedDataThree = json.map((item) => {
          return { src: item.song, name: item.track, id: item._id };
        });
        // console.log('PARSED', parsedDataThree);
        setSuperData(parsedDataThree)
        setSongs(json);
      })

      .catch((error) => console.log(error));
  }, []);

  const ChangeCurrentSong = (index) => {
    setMusicTracks(superData);
    setSelectStyle(index)
    setTrackIndex(index);
    // console.log('this is song index---->', index);
    setIsPlaying(false);
    audiofunction();
  };
  
  return (
    <div className='trend'>
      <div className='trend-area'>
      <div className='routes' ><h6 className='rts-rts'><Link className='rts-rts' to={'/'}>Home</Link> -- <Link className='rts-rts'>All Bhajans</Link></h6></div>
        <section className='sec-1'>
          <div className='trendimg'>
            <a href='' className='bigimg'>
              <img src={release1} />
            </a>
          </div>
          <div className='Trending-song'>
            <div className='trnd-img-about'>
             
                
                    <h2>All Bhajans</h2>
                  <p>All Bhajan's of khatushyam</p>
            </div>
            <div className='trndbtn'>
              <button className='footer-btn'  onClick={() => {
                  setMusicTracks(superData);
                  setTrackIndex(0);
                  setSelectStyle(0);
                }}>
               Play
              </button>
            </div>
          </div>
        </section>
        <section className='sec-2'>
          <div className='trend-song'>
            <ul className='song-about'>
              <li className='songabt-img'>
                <p className='imgsong'>#</p>
              </li>
              <li className='songabt'>
                <div className='heading-row'>
                  <div className='track'>
                    <p className='heading'>Track</p>
                  </div>
                  <div className='artist'>
                    <p className='heading artist-head'>Artist</p>
                  </div>
                </div>
              </li>
              <li className='songabt-img'>
                {' '}
                <Link to='' className='anchor-foo'>
                  <p className='imgsong'>
                    <i className='fa fa-heart-o' aria-hidden='true'></i>
                  </p>
                </Link>
              </li>
              <li className='songabt-img'>
                <p className='imgsong'>
                  <i class='fa fa-ellipsis-v' aria-hidden='true'></i>
                </p>
              </li>
              <li className='songabt-dur'>
                <p className='heading'>Duration</p>
              </li>
            </ul>
            {songs.map((user, index) => (
              <ul className='song-about'  onClick={() => ChangeCurrentSong(index)}>
                <li className='songabt-img'>
                  <div className='listimg'>
                    <img
                      src={selectStyle=== index && isPlay === true ? bgimg: user.image}
                      // onClick={() => ChangeCurrentSong(index)}
                    />

                    <div className='playyicon'>
                      <i class='fa fa-play-circle-o' aria-hidden='true'></i>{' '}
                    </div>
                  </div>
                </li>
                <li className='songabt'>
                  <div className='heading-row'>
                    <div className='track'>
                      <p>{user.track}</p>
                    </div>
                    <div className='artist'>
                      <p>{user.artist}</p>
                    </div>
                  </div>
                </li>
              
                <li className='row-item'>
                  <p>{user.duration}</p>
                </li>
              </ul>
            ))}
           
          </div>
        </section>
      </div>
    </div>
  );
};
export default AllSongs;