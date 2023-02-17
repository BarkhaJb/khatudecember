import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import bgimg from '../Components/assets/images/play-bg.gif';

const Category = ({
  setMusicTracks,
  setTrackIndex,
  user,
  currentArtist,
  fetchSongs,
  audiofunction,
  isPlaying,
  setIsPlaying,
  player,
  isPlay,
  selectStyle, setSelectStyle
}) => {
  const { pathname } = useLocation();
 
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentArtist]);
  const [category, setCategory] = useState([]);
  const [superData, setSuperData] = useState();

  useEffect(() => {
    if (currentArtist === null) {
      navigate('/');
    }
    const url = `${process.env.REACT_APP_BASE_URL}/category/songs/${currentArtist?._id}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setCategory(json);
        // console.log('CONSOLE', json);
        const parsedDataTwo = json.map((item) => {
          return { src: item.song, name: item.track, id: item._id };
        });
        // console.log('PARSED', parsedDataTwo);
        setSuperData(parsedDataTwo);
      })

      .catch((error) => console.log(error));
  }, [currentArtist]);

  const ChangeCurrentSong = (index) => {
    setTrackIndex(index);
    setMusicTracks(superData);
    setSelectStyle(index);
    // console.log('this is song index---->', index);
    setIsPlaying(false);
    audiofunction()
  };

  return (
    <div className='trend'>
      <div className='trend-area'>
        <div className='routes'>
          <h6 className='rts-rts'>
            <Link className='rts-rts' to={'/'}>
              Home
            </Link>{' '}
            -- <Link className='rts-rts'>Albums</Link>--{' '}
            <span className='rts-tag'>{currentArtist?.title}</span>
          </h6>
        </div>
        <section className='sec-1'>
          <div className='trendimg'>
            <img src={currentArtist?.image} className='art-img' />
          </div>
          <div className='Trending-song'>
            <div className='trnd-img-about'>
              <h2>{currentArtist?.title}</h2>
              {/* <p></p> */}
            </div>
            <div className='trndbtn'>
              <button
                className='footer-btn'
                onClick={() => {
                 setMusicTracks(superData);
                 setTrackIndex(0);
                 setSelectStyle(0);
                }}
              >
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
            {category.map((user, index) => (
              <ul
                className='song-about'
                onClick={() => ChangeCurrentSong(index)}
              >
                <li className='songabt-img'>
                  <div className='listimg'>
                    <img
                      src={selectStyle === index && isPlay=== true ? bgimg : user.image}

                      // onClick={() => ChangeCurrentSong(index)}
                    />

                    <div className='playyicon'>
                      <i className='fa fa-play-circle-o' aria-hidden='true'></i>{' '}
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
                <li className='songabt-img'>
                  <Link to='' className='anchor-foo'>
                    <p className='hearticon'>
                      {/* <i class='fa fa-heart-o' aria-hidden='true'></i> */}
                    </p>
                  </Link>
                </li>
                <li className='songabt-img'>
                  <Link to='' className='anchor-foo'>
                    <p className='moreoption'>
                      {/* <i class='fa fa-ellipsis-v' aria-hidden='true'></i> */}
                    </p>
                  </Link>
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
export default Category;
