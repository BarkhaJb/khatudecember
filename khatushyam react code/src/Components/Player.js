import React, { useState } from "react";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Player = ({
  musicTracks,
  trackIndex,
  setTrackIndex,
  player,
  audiofunction,
  isPlaying,
  setIsPlaying,
  setIsPlay,
  selectStyle,
  setSelectStyle,
}) => {
  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) => {
      if (currentTrack === 0) {
        return musicTracks.length - 1;
      } else {
        setSelectStyle(currentTrack - 1);
        return currentTrack - 1;
      }
    });
  };

  const handleClickNext = async () => {
    setTrackIndex((currentTrack) => {
      if (currentTrack < musicTracks.length - 1) {
        setSelectStyle(currentTrack + 1);
        return currentTrack + 1;
      } else {
        setSelectStyle(0);
        return 0;
      }
    });
  };

  const SwitchPause = () => {
    setIsPlaying(true);
    setIsPlay(false);
  };

  const SwitchPlay = () => {
    setIsPlaying(false);
    setIsPlay(true);
  };
  return (
    <div className="playertwo">
      <AudioPlayer
        ref={player}
        autoPlay={false}
        src={musicTracks[trackIndex]?.src}
        onPlay={() => SwitchPlay()}
        onPause={() => SwitchPause()}
        showSkipControls={true}
        showJumpControls={true}
        header={`Now playing: ${musicTracks[trackIndex]?.name}`}
        onClickPrevious={() => handleClickPrevious()}
        onClickNext={() => handleClickNext()}
        onEnded={handleClickNext}
      />
    </div>
  );
};
export default Player;
