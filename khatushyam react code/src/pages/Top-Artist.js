import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import bgimg from "../Components/assets/images/play-bg.gif";
import {Helmet} from "react-helmet";


const Artist = ({
  releaseSong,
  currentArtist,
  setMusicTracks,
  setTrackIndex,
  audiofunction,
  isPlaying,
  setIsPlaying,
  selectStyle,
  setSelectStyle,
  isPlay,
}) => {
  const [superData, setSuperData] = useState();

  const [displaySongs, setDisplaySongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentArtist]);

  const responsive1111 = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 10,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  const filterSongsOnArtist = (songs, selectedArtist) => {
    const filteredSongs = songs.filter((element) => {
      return element.artist === selectedArtist.artist;
    });
    return filteredSongs;
  };
  useEffect(() => {
    if (currentArtist === null || undefined) {
      navigate("/");
    }
    const url = `${process.env.REACT_APP_BASE_URL}/artist/songs/${currentArtist?._id}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setDisplaySongs(json);
        // console.log('CONSOLE', json);
        const parsedDataTwo = json.map((item) => {
          return { src: item.song, name: item.track, id: item._id };
        });
        // console.log('PARSED', parsedDataTwo);
        setSuperData(parsedDataTwo);
        setDisplaySongs(json);
      })

      .catch((error) => console.log(error));
  }, [currentArtist, navigate, setMusicTracks]);

  const ChangeCurrentSong = (index) => {
    setMusicTracks(superData);
    setSelectStyle(index);
    setTrackIndex(index);
    audiofunction();
  };

  return (
    <div className="trend">
      <Helmet>
        <title>Best khatuwaleshyam mp3 Bhajans by</title>
        <link rel="canonical" href="https://khatuwaleshyam.com/Top-Artist" />
        
      </Helmet>
      <div className="trend-area">
        <div className="routes">
          <h6 className="rts-rts">
            <Link className="rts-rts" to={"/"}>
              Home
            </Link>{" "}
            -- <Link className="rts-rts">Top Artist</Link>--{" "}
            <span className="rts-tag">{displaySongs[0]?.artist}</span>
          </h6>
        </div>
        <section className="sec-1">
          <div className="trendimg">
            <img src={displaySongs[0]?.image} />
          </div>
          <div className="Trending-song">
            <div className="trnd-img-about">
              <h1 className="newrhead">khatuwaleshyam Bhajans by </h1>

              <h2 className='taname'>{displaySongs[0]?.artist}</h2>
              <p>Top Artist hits</p>
            </div>

            <div className="trndbtn">
              <button
                className="footer-btn"
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
        <section className="sec-2">
          <div className="trend-song">
            <ul className="song-about firstul">
              <li className="songabt-img">
                <p className="imgsong">#</p>
              </li>
              <li className="songabt">
                <div className="heading-row">
                  <div className="track">
                    <p className="heading">Track</p>
                  </div>
                  <div className="artist">
                    <p className="heading artist-head">Artist</p>
                  </div>
                </div>
              </li>
              <li className="songabt-dur">
                <p className="heading">Duration</p>
              </li>
            </ul>
            {displaySongs?.map((user, index) => (
              <ul
                className="song-about"
                onClick={() => ChangeCurrentSong(index)}
              >
                <li className="songabt-img">
                  <div className="listimg">
                    <Link to="" className="topart-img">
                      <img
                        src={
                          selectStyle === index && isPlay === true
                            ? bgimg
                            : user.image
                        }
                        onClick={() => ChangeCurrentSong(index)}
                      />
                    </Link>
                    <div className="playyicon">
                      <i class="fa fa-play-circle-o" aria-hidden="true"></i>{" "}
                    </div>
                  </div>
                </li>
                <li className="songabt">
                  <div className="heading-row">
                    <div className="track">
                      <p>{user.track}</p>
                    </div>
                    <div className="artist">
                      <p>{user.artist}</p>
                    </div>
                  </div>
                </li>

                <li className="songabt-dur">
                  <p className="heading">
                    <p>{user.duration}</p>
                  </p>
                </li>
              </ul>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
export default Artist;
