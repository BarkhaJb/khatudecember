import React, { useCallback, useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Menu from './Components/Header';
import './Components/assets/css/style.css';
import Home from './pages/Home';
import Trend from './pages/Trending';
import Artist from './pages/Top-Artist';

import Player from './Components/Player';
import Latest from './pages/latest';
import Category from './pages/Category';
import TopPlaylist from './pages/topPlaylist';
import NewReleases from './pages/NewReleases';
import SearchContent from './pages/search';
import Radio from './pages/Radio';
import AllSongs from './pages/Allsong';
import Pagenotfound from './pages/Pagenotfound';
import Wrapper from './pages/wrapper';
import Login from './pages/login';
import ReactGA from 'react-ga';
import Dashboard from './pages/Dashboard';
import DashAlbumpage from './pages/DashAlbumpage';
import DashAlbumsongs from './pages/DashAlbumsongs';
import DashWrap from './pages/dashwrap';
import DashTopPlaylist from './pages/DashTopPlaylist';
import DashListSong from './pages/DashListSongs';
import Dashrecommend from './pages/DashRecommend';

import DashTopArtist from './pages/DashTopArtist';
import DashTopArtistSong from './pages/DashTopArtistSong';

import DashTrend from './pages/DashTrend';
import DashAllsong from './pages/DashAllsong';
import DashNewRelease from './pages/DashNewRelease';
import DashUpcomingEvent from './pages/DashUpcomingEvents';
import Requestpage from './pages/Requestpage';
import LoginAuth from './pages/LoginAuth';

const TRACKING_ID = 'UA-231789260-1';
ReactGA.initialize(TRACKING_ID);

const App = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const [musicTracks, setMusicTracks] = useState([
    {
      id: 1,
      name: ' Haare Ke Sahare Aaja',
      src: 'https://khatuwaleshyam.com:3100/songImg/Hare-Ka-Sahara-Aaja.mp3',
    },
    {
      id: 2,
      name: 'Najre Jara Mila Le',
      src: 'https://khatuwaleshyam.com:3100/songImg/Superhit_Offici_getmp3.pro_.mp3',
    },
    {
      id: 3,
      name: 'Mera Shyam Bada Albela',
      src: 'https://khatuwaleshyam.com:3100/songImg/getmp3.pro-25.mp3',
    },
  ]);
  const [releaseSong, setReleaseSong] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentArtist, setCurrentArtist] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectStyle, setSelectStyle] = useState();
  const [isPlay, setIsPlay] = useState(true);
  const [routetrue, setRouteTrue] = useState(false);

  const fetchSongs = () => {
    const url =
      'https://khatuwaleshyam.com:3100/playlist/songs/633c3487cca1438524d18e91';
    fetch(url)
      .then((response) => response.json())
      .then((json) => setReleaseSong(json))
      .catch((error) => console.log(error));
  };
  const setDefaultMusic = useCallback(() => {
    if (releaseSong && releaseSong?.length > 0) {
      const parsedData = releaseSong.map((item) => {
        return { src: item?.song, name: item?.track, id: item?._id };
      });

      setMusicTracks(parsedData);
    }
  }, [releaseSong]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const player = useRef();
  const audiofunction = () => {
    if (player.current.isPlaying()) {
      player.current.audio.current.pause();
      isPlay(false);
    } else {
      player.current.audio.current.play();
      isPlay(true);
    }
    return player.current.isPlaying();
  };

  return (
    <div className='App'>
      <Router>
        <div className='topMargin'>
          <Routes>
            <Route
              path='/'
              element={
                <Wrapper
                  setCurrentArtist={setCurrentArtist}
                  selectStyle={selectStyle}
                  setSelectStyle={setSelectStyle}
                  musicTracks={musicTracks}
                  trackIndex={trackIndex}
                  setTrackIndex={setTrackIndex}
                  player={player}
                  setIsPlaying={setIsPlaying}
                  isPlaying={isPlaying}
                  setIsPlay={setIsPlay}
                  releaseSong={releaseSong}
                  setMusicTracks={setMusicTracks}
                />
              }
            >
              <Route
                path='/'
                element={
                  <Home
                    setTrackIndex={setTrackIndex}
                    releaseSong={releaseSong}
                    fetchSongs={fetchSongs}
                    setReleaseSong={setReleaseSong}
                    setMusicTracks={setMusicTracks}
                    setCurrentArtist={setCurrentArtist}
                    audiofunction={audiofunction}
                    selectStyle={selectStyle}
                    setSelectStyle={setSelectStyle}
                    isPlay={isPlay}
                  />
                }
              />
              <Route
                path='/Trending'
                element={
                  <Trend
                    setMusicTracks={setMusicTracks}
                    fetchSongs={fetchSongs}
                    setTrackIndex={setTrackIndex}
                    audiofunction={audiofunction}
                    setIsPlaying={setIsPlaying}
                    isPlaying={isPlaying}
                    selectStyle={selectStyle}
                    setSelectStyle={setSelectStyle}
                    isPlay={isPlay}
                  />
                }
              />
              <Route
                path='/search'
                element={
                  <SearchContent
                    setTrackIndex={setTrackIndex}
                    setMusicTracks={setMusicTracks}
                  />
                }
              />
              <Route
                path='/Top-Artist'
                element={
                  <Artist
                    releaseSong={releaseSong}
                    currentArtist={currentArtist}
                    setMusicTracks={setMusicTracks}
                    audiofunction={audiofunction}
                    setDefaultMusic={setDefaultMusic}
                    setTrackIndex={setTrackIndex}
                    setIsPlaying={setIsPlaying}
                    isPlaying={isPlaying}
                    selectStyle={selectStyle}
                    setSelectStyle={setSelectStyle}
                    isPlay={isPlay}
                  />
                }
              />

              <Route
                path='/Category'
                element={
                  <Category
                    currentArtist={currentArtist}
                    setTrackIndex={setTrackIndex}
                    fetchSongs={fetchSongs}
                    setMusicTracks={setMusicTracks}
                    audiofunction={audiofunction}
                    setIsPlaying={setIsPlaying}
                    isPlaying={isPlaying}
                    isPlay={isPlay}
                    selectStyle={selectStyle}
                    setSelectStyle={setSelectStyle}
                  />
                }
              />
              <Route path='/latestsong' element={<Latest />} />
              <Route
                path='/newReleases'
                element={
                  <NewReleases
                    setMusicTracks={setMusicTracks}
                    fetchSongs={fetchSongs}
                    setTrackIndex={setTrackIndex}
                    audiofunction={audiofunction}
                    setIsPlaying={setIsPlaying}
                    isPlaying={isPlaying}
                    selectStyle={selectStyle}
                    setSelectStyle={setSelectStyle}
                    isPlay={isPlay}
                  />
                }
              />
              <Route
                path='/TopPlaylist'
                element={
                  <TopPlaylist
                    currentArtist={currentArtist}
                    setTrackIndex={setTrackIndex}
                    fetchSongs={fetchSongs}
                    setMusicTracks={setMusicTracks}
                    audiofunction={audiofunction}
                    setIsPlaying={setIsPlaying}
                    isPlaying={isPlaying}
                    isPlay={isPlay}
                    selectStyle={selectStyle}
                    setSelectStyle={setSelectStyle}
                  />
                }
              />

              <Route
                path='/radio'
                element={
                  <Radio
                    setMusicTracks={setMusicTracks}
                    audiofunction={audiofunction}
                    setIsPlaying={setIsPlaying}
                    isPlaying={isPlaying}
                    fetchSongs={fetchSongs}
                  />
                }
              />
              <Route path='/requestpage' element={<Requestpage />} />

              <Route
                path='/Allbhajan'
                element={
                  <AllSongs
                    fetchSongs={fetchSongs}
                    setTrackIndex={setTrackIndex}
                    setMusicTracks={setMusicTracks}
                    audiofunction={audiofunction}
                    setIsPlaying={setIsPlaying}
                    isPlaying={isPlaying}
                    isPlay={isPlay}
                    selectStyle={selectStyle}
                    setSelectStyle={setSelectStyle}
                  />
                }
              />
              <Route path='*' element={<Pagenotfound />} />
            </Route>
            <Route
              path='/admin'
              element={<Login setRouteTrue={setRouteTrue} />}
            ></Route>
            <Route element={<LoginAuth />}>
              <Route
                path='/'
                element={<DashWrap setRouteTrue={setRouteTrue} />}
              >
                <Route path='/dashboard' element={<Dashboard />}></Route>
                <Route path='/albums' element={<DashAlbumpage />}></Route>
                <Route path='/albumsongs' element={<DashAlbumsongs />}></Route>
                <Route
                  path='/dashrecommend'
                  element={<Dashrecommend />}
                ></Route>
                <Route
                  path='/dashtoplist'
                  element={<DashTopPlaylist />}
                ></Route>
                <Route path='/listsongs' element={<DashListSong />}></Route>

                <Route path='/dashartist' element={<DashTopArtist />}></Route>
                <Route
                  path='/dashtopartistsong'
                  element={<DashTopArtistSong />}
                ></Route>
                <Route
                  path='/dashnewrelease'
                  element={<DashNewRelease />}
                ></Route>
                <Route path='/dashtrend' element={<DashTrend />}></Route>
                <Route path='/dashallbhajan' element={<DashAllsong />}></Route>
                <Route
                  path='/dashupcoming'
                  element={<DashUpcomingEvent />}
                ></Route>
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
