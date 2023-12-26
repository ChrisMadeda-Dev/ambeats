import { useEffect, useState } from "react";
import "../styles/playlistpage.css";
import MusicSec from "./MusicSec";
import { collection, getDoc, getDocs, getFirestore } from "firebase/firestore";
import app from "./Firebase";
import MusicPlayer from "./MusicPlayer";

const PlMusicPlayer = ({ src }) => {
  return (
    <div>
      <audio src={src} controls />
    </div>
  );
};

const PlMusicCont = ({ song, setSong }) => {
  return (
    <div className="pl-music-cont" onClick={(e) => setSong(song.src)}>
      <p>{song.src}</p>
    </div>
  );
};

const PlayListRoom = () => {
  const userId = parseFloat(localStorage.getItem("user-phone"));
  const playListId = parseFloat(localStorage.getItem("play-list-id"));
  const [plSongs, setPlSongs] = useState([]);
  const [songSrc, setSongSrc] = useState();

  function setSong(a) {
    setSongSrc(a);
  }

  //firestore
  const db = getFirestore(app);
  const plSongsRef = collection(
    db,
    `users/${userId}/playlist/${playListId}/songs`
  );

  useEffect(() => {
    function getPlSongs() {
      var array = [];
      getDocs(plSongsRef).then((docs) => {
        docs.forEach((doc) => {
          array.push(doc.data());
        });

        setPlSongs([...array]);
      });
    }

    getPlSongs();
  }, []);

  return (
    <div className="play-list-room">
      <div className="plr-cont">
        <div className="plr-top">
          <h1>PLAY ROOM</h1>
        </div>
        <div className="plr-center">
          <MusicSec playListId={playListId} />
        </div>
        <div className="plr-bottom">
        </div>
      </div>
    </div>
  );
};

export default PlayListRoom;

