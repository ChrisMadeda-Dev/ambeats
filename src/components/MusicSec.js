import "../styles/musicsec.css";
import MusicCont from "./MusicCont";
import MusicPlayer from "./MusicPlayer";
import song from "../audios/1.mp3";
import { useEffect, useState } from "react";
import app from "./Firebase";

import { getFirestore, collection, getDocs } from "firebase/firestore";

const MusicSec = () => {
  const userId = parseFloat(localStorage.getItem("user-phone"));
  const [currentSong, setCurrentSong] = useState(
    "https://firebasestorage.googleapis.com/v0/b/ambeats21-2f1be.appspot.com/o/Minister%20GUC%20-%20Yours%20(LIVE).mp3?alt=media&token=9bb6d7dd-7cc9-447d-b768-ba8d951303df"
  );
  const [songs, setSongs] = useState([]);

  //Firestore
  const db = getFirestore(app);
  const songsRef = collection(db, `users/${userId}/songs`);

  function setSong(src) {
    setCurrentSong(src);
  }

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
      <MusicPlayer src={currentSong} />
    </>
  );
};

export default MusicSec;
