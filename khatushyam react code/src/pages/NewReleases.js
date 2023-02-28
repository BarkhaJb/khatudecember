import React, { useEffect, useState } from "react";
import release1 from "../Components/assets/images/releasehead.png";
import bgimg from "../Components/assets/images/play-bg.gif";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const NewReleases = ({
  setMusicTracks,
  setTrackIndex,
  audiofunction,
  isPlaying,
  isPlay,
  setIsPlaying,
  selectStyle,
  setSelectStyle,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [release, setRelease] = React.useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_BASE_URL}/newreleases`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setRelease(json);
        // console.log('CONSOLE', json);
        const parsedDatasix = json.map((item) => {
          return { src: item.song, name: item.track, id: item._id };
        });
        // console.log('PARSED', parsedDatasix);

        setMusicTracks(parsedDatasix);
        setRelease(json);
      })

      .catch((error) => console.log(error));
  }, []);

  const ChangeCurrentSong = (index) => {
    setTrackIndex(index);
    setSelectStyle(index);
    // console.log('this is song index---->', index);
    setIsPlaying(false);
    audiofunction();
  };
  return (
    <div className="trend">
      <Helmet>
        <title>New Releases Of Baba Shyam: Sunne Wala Shyam Sunna Wala Shyam  </title>
        <meta data-react-helmet="true" name="description" content="khatuwaleshyam.com- Listen  latest MP3 Bhajans online.New Trending Bhajans , New Releases Top Search Artist Upcoming events Listen Live Radio "/>
        <link rel="canonical" href="https://khatuwaleshyam.com/newReleases" />
      </Helmet>
      <div className="trend-area">
        <div className="routes">
          <h6 className="rts-rts">
            <Link className="rts-rts" to={"/"}>
              Home
            </Link>{" "}
            -- <span className="rts-tag">New Releases</span>
          </h6>
        </div>
        <section className="sec-1">
          <div className="trendimg">
            <a href="" className="bigimg">
              <img src={release1} alt="latest khatu release" />
            </a>
          </div>
          <div className="Trending-song">
            <div className="trnd-img-about">
            <h1 className="newrhead">Latest Releases</h1>
              <p>Top Release hits</p>
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
            <ul className="song-about">
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
              <li className="songabt-img">
                {" "}
                <Link to="" className="anchor-foo">
                  <p className="imgsong">
                    <i className="fa fa-heart-o" aria-hidden="true"></i>
                  </p>
                </Link>
              </li>
              <li className="songabt-img">
                <p className="imgsong">
                  <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                </p>
              </li>
              <li className="songabt-dur">
                <p className="heading">Duration</p>
              </li>
            </ul>
            {release.map((user, index) => (
              <ul
                className="song-about"
                onClick={() => ChangeCurrentSong(index)}
              >
                <li className="songabt-img">
                  <div className="listimg">
                    <img
                      src={
                        selectStyle === index && isPlay === true
                          ? bgimg
                          : user.image
                      }
                      onClick={() => ChangeCurrentSong(index)}
                      alt="khayuwaleshyam latest"
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

                <li className="row-item">
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
export default NewReleases;
