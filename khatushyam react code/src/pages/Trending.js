import React, { useState, useEffect } from "react";
import tr_img1 from "../Components/assets/images/trending1.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import bgimg from "../Components/assets/images/play-bg.gif";
import {Helmet} from "react-helmet";

const Trend = ({
  setMusicTracks,
  setTrackIndex,
  audiofunction,
  isPlaying,
  setIsPlaying,
  selectStyle,
  setSelectStyle,
  isPlay,
}) => {
  const [trending, setTrending] = React.useState([]);

  const { pathname } = useLocation();

  //const[superData, setSuperData]= useState()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_BASE_URL}/trending`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const parsedData = json.map((item) => {
          return { src: item.song, name: item.track, id: item._id };
        });
        // console.log('PARSED', parsedData);
        setMusicTracks(parsedData);
        setTrending(json);
      })
      .catch((error) => console.log(error));
  }, []);
  const ChangeCurrentSong = (index) => {
    setSelectStyle(index);
    setTrackIndex(index);
    // console.log('this is song index---->', index);
    setIsPlaying(false);
    audiofunction();
  };

  return (
    <div className="trend">
       <Helmet>
        <title>Trending mp3 online bhajans | Baba shyam bhajans</title>
        <meta data-react-helmet="true" name="description" content="khatuwaleshyam audio mp3 bhajan websites, Khatushyam ji ke bhajans, Free online mp3 bhajan kanhiyamittal,sanjaymittal baba shyam bhajans."/>
        <link rel="canonical" href="https://khatuwaleshyam.com/Trending" />
      </Helmet>
      <div className="trend-area">
        <div className="routes">
          <h6 className="rts-rts">
            <Link className="rts-rts" to={"/"}>
              Home
            </Link>{" "}
            -- <span className="rts-tag">Trending</span>
          </h6>
        </div>
        <section className="sec-1">
          <div className="trendimg">
            <img  alt="trending bhnajan" src={tr_img1} />
          </div>
          <div className="Trending-song">
            <div className="trnd-img-about">
              <h1 className="trnedpghead">Trending Bhajans</h1>
              <p className="trendingpara">Top trending hits</p>
            </div>

            <div className="trndbtn">
              <button
                className="footer-btn"
                onClick={() => {
                  const play = audiofunction();
                  if (play) {
                    setIsPlaying(false);
                  } else {
                    setIsPlaying(true);
                  }
                }}
              >
                {isPlaying === true ? "Play" : "Pause"}
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
            {trending.map((user, index) => (
              <ul
                className="song-about"
                onClick={() => ChangeCurrentSong(index)}
              >
                <li className="songabt-img">
                  <div className="listimg">
                    <img
                    alt="All trending Bhajan"
                      src={
                        selectStyle === index && isPlay === true
                          ? bgimg
                          : user.image
                      }
                      onClick={() => ChangeCurrentSong(index)}
                    />
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
export default Trend;
