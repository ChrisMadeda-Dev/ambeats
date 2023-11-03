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
  isPlaying,
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
          {!isPlaying && (
            <span
              onClick={(e) => {
                handlePlayPause(true);
                setTogPlayPause(!togPlayPause);
              }}
            >
              <BiPlay style={btnStyle} />
            </span>
          )}
          {isPlaying && (
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
  const [initialPlayState, setInitialPlayState] = useState(false);
  const iconStyle = {
    fontSize: "30px",
    margin: "0px",
    padding: "0px",
    margin: "0px 10px",
  };

  //Changes the default play button to pause when music is selected
  if (playingSong && isPlaying === false && initialPlayState === false) {
    setIsPlaying(true);
    setInitialPlayState(true);
  }

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
          autoPlay={playingSong ? true : false}
          onEnded={(e) => handleEnded(true)}
        />
        <section className="mp-song-name" onClick={(e) => setToggleMPSec(true)}>
          <p>{playingSong ? playingSong.name : <span>Song Title</span>}</p>
        </section>

        <section className="mini-player-controls">
          <span>
            {" "}
            <BiSkipPrevious
              style={iconStyle}
              onClick={(e) => handlePrevNext(false)}
            />
          </span>
          <span>
            {" "}
            {isPlaying ? (
              <BiPause
                style={iconStyle}
                onClick={(e) => {
                  audioRef.current.pause();
                  setIsPlaying(false);
                }}
              />
            ) : (
              <BiPlay
                style={iconStyle}
                onClick={(e) => {
                  audioRef.current.play();
                  setIsPlaying(true);
                }}
              />
            )}
          </span>

          <span>
            {" "}
            <BiSkipNext
              style={iconStyle}
              onClick={(e) => handlePrevNext(true)}
            />
          </span>
        </section>
      </div>
      {toggleMPSec && playingSong && (
        <MusicPlayerSec
          audio={audioRef.current}
          playingSong={playingSong}
          isPlaying={isPlaying}
          handlePrevNext={handlePrevNext}
          handlePlayPause={handlePlayPause}
          toggleMPSec={(e) => setToggleMPSec(!toggleMPSec)}
        />
      )}
    </>
  );
};

/* 
 <span className="mini-player-btn"
          onClick={(e) => setToggleMPSec(!toggleMPSec)}
        >
          {!toggleMPSec ? <BiMusic /> : <CgClose />}
        </span>

*/

export default MusicPlayer;
