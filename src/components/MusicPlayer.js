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
  const [togPlayPause, setTogPlayPause] = useState(true);

  return (
    <div className="music-player-sec">
      <div className="mp-sec-top">
        <div>
          <BiMusic style={{ fontSize: "40px" }} />
        </div>
        <section>{playingSong.name}</section>
      </div>
      <div className="mp-sec-center">
        <section className="mp-controls">
          <span onClick={(e) => handlePrevNext(false)}>
            <BiSkipPrevious style={btnStyle} />
          </span>
          {togPlayPause && (
            <span
              onClick={(e) => {
                handlePlayPause(true);
                setTogPlayPause(!togPlayPause);
              }}
            >
              <BiPlay style={btnStyle} />
            </span>
          )}
          {!togPlayPause && (
            <span
              onClick={(e) => {
                handlePlayPause(false);
                setTogPlayPause(!togPlayPause);
              }}
            >
              <BiPause style={btnStyle} />
            </span>
          )}
          <span onClick={(e) => handlePrevNext(true)}>
            <BiSkipNext style={btnStyle} />
          </span>
        </section>
      </div>
      <div className="mp-sec-bottom">
       
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

  function handlePrevNext(state) {
    if (state) {
      handleEnded(state);
    } else {
      handleEnded(state);
    }
  }

  return (
    <>
      <div className="music-player">
        <audio
          ref={audioRef}
          src={src}
          controls
          autoPlay={false}
          onEnded={(e) => handleEnded(true)}
        />
        <span
          className="mini-player-btn"
          onClick={(e) => setToggleMPSec(!toggleMPSec)}
        >
          {!toggleMPSec ? <BiMusic /> : <CgClose />}
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
