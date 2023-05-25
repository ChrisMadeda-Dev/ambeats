import "../styles/musicplayer.css";
import { useState, useRef } from "react";

import {
  BiPlay,
  BiPause,
  BiSkipNext,
  BiSkipPrevious,
  BiMusic,
} from "react-icons/bi";
import { CgClose } from "react-icons/cg";

const MusicPlayerSec = ({
  audio,
  playingSong,
  handlePrevNext,
  handlePlayPause,
  toggleMPSec,
}) => {
  const btnStyle = { fontSize: "30px" };

  return (
    <div className="music-player-sec">
      <div className="mp-sec-top">
        <div></div>
        <section>{playingSong.name}</section>
      </div>
      <div className="mp-sec-center">
        <section className="mp-controls">
          <span>
            <BiSkipPrevious style={btnStyle} />
          </span>
          <span onClick={(e) => handlePlayPause(true)}>
            <BiPlay style={btnStyle} />
          </span>
          <span onClick={(e) => handlePlayPause(false)}>
            <BiPause style={btnStyle} />
          </span>
          <span>
            <BiSkipNext style={btnStyle} />
          </span>
        </section>
      </div>
      <div className="mp-sec-bottom">
        <span onClick={toggleMPSec}>
          <CgClose />
        </span>
      </div>
    </div>
  );
};

const MusicPlayer = ({ playingSong, src, handleEnded }) => {
  const [toggleMPSec, setToggleMPSec] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = (a) => {
    if (a) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevNext = (a) => {};

  return (
    <>
      <div className="music-player">
        <audio
          ref={audioRef}
          src={src}
          controls
          autoPlay={true}
          onEnded={handleEnded}
        />
        <span
          className="mini-player-btn"
          onClick={(e) => setToggleMPSec(!toggleMPSec)}
        >
          <BiMusic />
        </span>
      </div>
      {toggleMPSec && playingSong && (
        <MusicPlayerSec
          audio={audioRef.current}
          playingSong={playingSong}
          handlePrevNext={handlePrevNext}
          handlePlayPause={handlePlayPause}
          toggleMPSec={(e) => setToggleMPSec(!toggleMPSec)}
        />
      )}
    </>
  );
};

export default MusicPlayer;
