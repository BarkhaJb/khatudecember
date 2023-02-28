import React from "react";
import Menu from "../Components/Header";
import Footer from "../Components/Footer";
import Player from "../Components/Player";
import { Outlet } from "react-router-dom";

const Wrapper = ({
  setCurrentArtist,
  selectStyle,
  setSelectStyle,
  releaseSong,
  setTrackIndex,
  setMusicTracks,
  musicTracks,
  trackIndex,
  player,
  setIsPlaying,
  isPlaying,
  setIsPlay,
}) => {
  return (
    <div>
      <>
        <Menu
          setCurrentArtist={setCurrentArtist}
          selectStyle={selectStyle}
          setSelectStyle={setSelectStyle}
          setTrackIndex={setTrackIndex}
          trackIndex={trackIndex}
        />

        <Player
          musicTracks={musicTracks}
          trackIndex={trackIndex}
          setTrackIndex={setTrackIndex}
          player={player}
          setIsPlaying={setIsPlaying}
          isPlaying={isPlaying}
          setIsPlay={setIsPlay}
          selectStyle={selectStyle}
          setSelectStyle={setSelectStyle}
        />

        <Outlet />

        <Footer
          releaseSong={releaseSong}
          setTrackIndex={setTrackIndex}
          setCurrentArtist={setCurrentArtist}
          setMusicTracks={setMusicTracks}
          setSelectStyle={setSelectStyle}
        />
      </>
    </div>
  );
};

export default Wrapper;
