import "../styles/musicsec.css";
import MusicCont from "./MusicCont";
import MusicPlayer from "./MusicPlayer";
import song from "../audios/1.mp3";
import { useEffect, useRef, useState } from "react";
import app from "./Firebase";

import { getFirestore, collection, getDocs } from "firebase/firestore";

const MusicSec = ({ musicID }) => {
  const userId = musicID;
  const playingSong = useRef();
  const [currentSong, setCurrentSong] = useState(
    "https://firebasestorage.googleapis.com/v0/b/ambeats21-2f1be.appspot.com/o/Minister%20GUC%20-%20Yours%20(LIVE).mp3?alt=media&token=9bb6d7dd-7cc9-447d-b768-ba8d951303df"
  );
  const [songs, setSongs] = useState([]);

  //Firestore
  const db = getFirestore(app);
  const songsRef = collection(db, `users/${userId}/songs`);

  //Sets the details of the current song and its src
  function setSong(src) {
    setCurrentSong(src);
    songs.filter((a) => {
      if (a.src === src) {
        playingSong.current = a;
      }
    });
  }

  // Handles what happen when a song ends
  // Handles previous and next

  function handleEnded(state) {
    var array = [];
    songs.map((song) => array.push(song.src));

    if (array.length >= 1) {
      const songNum = array.indexOf(currentSong);

      if (songNum < array.length) {
        if (songNum >= 0) {
          var songRef;
          state && setCurrentSong(array[songNum + 1]);
          !state && setCurrentSong(array[songNum - 1]);

          state && setSong(array[songNum + 1]);
          !state && setSong(array[songNum - 1]);
        } else {
          setCurrentSong(array[0]);
        }
      } else {
        setCurrentSong(array[0]);
      }
    }
  }

  // gets songs from the datbase
  useEffect(() => {
    function getSongs() {
      var array = [];
      getDocs(songsRef).then((docs) => {
        docs.forEach((doc) => {
          array.push(doc.data());
        });
        setSongs([...array]);
      });
    }

    getSongs();
  }, []);

  return (
    <>
      <div className="music-sec">
        {songs.map((song) => (
          <MusicCont key={Math.random()} song={song} setSong={setSong} />
        ))}
      </div>
      <MusicPlayer
        playingSong={playingSong.current}
        src={currentSong}
        handleEnded={handleEnded}
      />
    </>
  );
};

export default MusicSec;
